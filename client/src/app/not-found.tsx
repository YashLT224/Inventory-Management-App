// app/not-found.tsx
import { redirect } from 'next/navigation';

export default function NotFound() {
  // Redirect to home page
  redirect('/');
  
  // This won't be shown, but is needed as a fallback
  return null;
}