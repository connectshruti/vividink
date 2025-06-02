"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { templates } from "../lib/Templates";
import { Fragment } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const groupedTemplates = templates.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof templates>);

  return (
    <div className="bg-gradient-to-br from-zinc-50 to-gray-100 dark:from-neutral-950 dark:to-black text-gray-900 dark:text-white min-h-screen transition-all">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 dark:bg-black/30 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-blue-700 dark:text-blue-400 uppercase">
            Vivid<span className="text-gray-500 dark:text-gray-300">Ink</span>
          </h1>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M2 13s1-4 6-4 6 4 6 4-1 1-6 1-6-1-6-1z" />
            </svg>
            Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-20 min-h-[80vh]">
        <div className="absolute inset-0 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-[6px] z-0 rounded-none sm:rounded-3xl"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create. Optimize. Publish.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Craft compelling, SEO-optimized content in seconds. Translate effortlessly. No writing blocks. Just results.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-3 px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-700 font-semibold rounded-full shadow-xl transition-all duration-300"
          >
            Try It Now
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent"
          >
            What You Can Do with VividInk
          </motion.h2>
          {Object.entries(groupedTemplates).map(([category, tools]) => (
            <Fragment key={category}>
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-6 mt-12 border-b border-blue-200 dark:border-blue-800 pb-1">
                {category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.slug}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl p-5 shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        <h4 className="text-lg font-semibold text-foreground">{tool.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {tool.desc}
                      </p>
                      <Link
                        href={`/dashboard/content/${tool.slug}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-white transition"
                      >
                        Try Now →
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
