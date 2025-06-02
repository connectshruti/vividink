"use client";

import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const MenuList = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "History", icon: FileClock, path: "/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/dashboard/billing" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const path = usePathname();

  return (
    <aside className="h-screen w-full md:max-w-[260px] px-4 py-6 bg-background dark:bg-card border-r border-border flex flex-col justify-between shadow-sm">
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-2xl font-bold text-primary tracking-wide uppercase">
            Vivid<span className="text-muted-foreground">Ink</span>
          </h1>
        </div>

        {/* Nav Menu */}
        <nav className="space-y-1">
          {MenuList.map((menu, index) => {
            const isActive = path === menu.path;
            return (
              <Link key={index} href={menu.path} aria-current={isActive ? "page" : undefined}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <menu.icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isActive ? "scale-110 text-primary-foreground" : "group-hover:scale-105 text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  <span className="truncate">{menu.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Usage Tracker */}
      <div className="mt-10 pt-6 border-t border-border">
        <UsageTrack />
      </div>
    </aside>
  );
}

export default SideNav;
