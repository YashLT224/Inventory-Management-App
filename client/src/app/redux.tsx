import {useRef} from 'react'
import {configureStore,combineReducers} from '@reduxjs/toolkit'
import {useSelector, useDispatch,Provider,TypedUseSelectorHook} from 'react-redux'
import {persistStore, persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST, PURGE,REGISTER} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {setupListeners} from '@reduxjs/toolkit/query'
import globalReducer from '../state'
import {api} from '../state/api'

/* REDUX PERSISTENCE  for server side rendering */
//The createNoopStorage function is a fallback for server-side rendering where localStorage isn't available
const createNoopStorage = () => {
  return {  
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    }
  };
};

const storage = typeof window === 'undefined' 
  ? createNoopStorage() 
  : createWebStorage('local');

  const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    // blacklist: ['auth'],
    whitelist: ["global"], //The whitelist includes only the "global" reducer, meaning only that part of the state will be persisted
  }
  const rootReducer = combineReducers({
    global: globalReducer,
    [api.reducerPath]:api.reducer
  })
  
  const persistedReducer=persistReducer(persistConfig,rootReducer);



//   REDUX Store
export const makeStore=()=>{
    return configureStore({
        reducer:persistedReducer,
         middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
              },
         }).concat(api.middleware) as any
    })
}


/* REDUX TYPES */

export type AppStore=ReturnType<typeof makeStore>;
export type RootState=ReturnType<AppStore['getState']> & { _persist: { version: number; rehydrated: boolean } };
export type AppDispatch=AppStore['dispatch'];
export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


/* REDUX PROVIDER */
export default function StoreProvider({children}:{children:React.ReactNode}){
    const storeRef=useRef<AppStore | null>(null);
    if(!storeRef.current){
        storeRef.current=makeStore();
        setupListeners(storeRef.current.dispatch);
    }
    const persistor=persistStore(storeRef.current);
    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}

