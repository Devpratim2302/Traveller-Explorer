"use client"

import { motion } from "framer-motion"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <motion.div
        className="relative z-10 text-center px-4 md:px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base font-medium text-primary mb-6 uppercase tracking-widest"
        >
          Discover Your Next Adventure
        </motion.p>
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-balance leading-tight"
        >
          Travel Explore
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance"
        >
          Embark on unforgettable journeys to the world's most captivating destinations. Experience breathtaking
          landscapes and vibrant cultures.
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-4 justify-center flex-wrap">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:shadow-lg transition-all hover:scale-105">
            Start Exploring
          </button>
          <button className="px-8 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-all">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
