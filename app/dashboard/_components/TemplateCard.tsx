"use client";

import React from "react";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";

interface TEMPLATE {
  name: string;
  desc: string;
  category: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  slug: string;
  aiPrompt?: string;
  form?: any[];
}

type TemplateCardProps = {
  item: TEMPLATE;
};

function TemplateCard({ item }: TemplateCardProps) {
  const Icon = item.icon;

  return (
    <Link
      href={`/dashboard/content/${item.slug}`}
      className="group block h-full"
      aria-label={`View template ${item.name}`}
      passHref
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{
          scale: 1.04,
          rotateX: 4,
          rotateY: 4,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
          transition: { type: "spring", stiffness: 200, damping: 14 },
        }}
        className={`
          relative flex flex-col justify-between gap-4 p-6 h-full rounded-xl
          border border-border shadow-sm hover:shadow-md
          transition-all duration-300 ease-in-out overflow-hidden
          bg-gradient-to-br from-white via-zinc-50 to-zinc-100
          dark:from-[#1a1a1a] dark:via-[#111] dark:to-[#222]
          text-foreground
        `}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.1 }}
          whileHover={{
            rotate: 10,
            scale: 1.2,
            transition: { type: "spring", stiffness: 300, damping: 12 },
          }}
          className={`
            w-12 h-12 flex items-center justify-center rounded-lg
            bg-gradient-to-tr from-primary/30 to-primary/10
            dark:from-primary/20 dark:to-primary/5
            text-primary dark:text-primary-foreground shadow-inner
          `}
        >
          <Icon className="w-6 h-6" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{
            textShadow: "0 2px 12px rgba(255,255,255,0.3)",
            transition: { duration: 0.2 },
          }}
          className="relative text-base font-semibold text-foreground
            group-hover:text-primary transition-all duration-300
            after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0
            after:bg-primary after:transition-all group-hover:after:w-full"
        >
          {item.name}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{
            y: -1,
            opacity: 0.95,
            transition: { duration: 0.2 },
          }}
          className="text-sm text-muted-foreground line-clamp-3
            transition-colors duration-300 group-hover:text-foreground"
        >
          {item.desc}
        </motion.p>
      </motion.div>
    </Link>
  );
}

export default TemplateCard;
