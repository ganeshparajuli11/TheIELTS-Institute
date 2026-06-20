"use client";

import { motion, useReducedMotion } from "motion/react";

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: reduceMotion ? {} : { opacity: 0, y: 10 },
        show: reduceMotion
          ? {}
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.28, ease: "easeOut" },
            },
      }}
    >
      {children}
    </motion.div>
  );
}
