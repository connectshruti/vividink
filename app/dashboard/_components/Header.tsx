import { UserButton } from "@clerk/nextjs";
import { Search, Sun, Moon } from "lucide-react";
import React, { useState, useEffect } from "react";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="bg-background backdrop-blur border-b border-border px-4 py-4 sm:px-6 md:px-10 shadow-md sticky top-0 z-50 transition-all">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Search Bar */}
        <div className="w-full lg:max-w-md flex items-center rounded-full border border-input bg-card px-4 py-2 shadow-inner transition focus-within:ring-2 focus-within:ring-ring">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="ml-3 w-full bg-transparent text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        {/* Right Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-end w-full">
          
          {/* Membership Promo */}
          <span className="text-xs sm:text-sm font-semibold text-center px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white shadow animate-pulse">
            🔥 Join Membership – ₹99/month
          </span>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center gap-2 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground px-4 py-2 rounded-lg transition-all shadow"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="hidden sm:inline">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>

          {/* User Auth */}
          <div className="flex justify-end">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
