import { Search } from "lucide-react";
import React from "react";

interface SearchSectionProps {
  onSearchInput: (value: string) => void;
}

function SearchSection({ onSearchInput }: SearchSectionProps) {
  return (
    <section className="bg-gradient-to-b from-primary/80 via-secondary/70 to-background text-foreground py-24 px-6 sm:px-10 md:px-20 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white drop-shadow-md">
          Discover Your Perfect Template
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Kickstart your next project with templates designed to inspire and speed up your workflow.
        </p>

        {/* Search Box */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              aria-label="Search Templates"
              placeholder="Search templates by keyword..."
              onChange={(e) => onSearchInput(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-card text-foreground shadow-lg placeholder:text-muted-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none transition duration-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchSection;
