"use client";
import React from "react";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "../../redux";
import { setIsSidebarCollapsed } from "../../../state";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type SideBarLinksProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};
const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SideBarLinksProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 gap-3 transition-colors ${
          isActive ? "bg-blue-200 dark:bg-blue-800 text-white" : ""
        }
      `}
      >
        <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 dark:text-gray-300`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white dark:bg-gray-900 transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      {/* {TOP LOGO} */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>logo</div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl text-gray-900 dark:text-gray-100`}
        >
          EDSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={Archive}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/sales"
          icon={CircleDollarSign}
          label="Sales"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/reports"
          icon={Clipboard}
          label="Reports"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>
      <div className="flex-grow mt-8">{/* links */}</div>
      {/* Footer */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 Edstock</p>
      </div>
    </div>
  );
};

export default Sidebar;
