"use client"

import { motion } from "framer-motion"
import DestinationCard from "./destination-card"

interface Destination {
  id: number
  name: string
  image: string
  category: string
  description: string
  rating: number
  price: string
  highlights: string[]
}

interface DestinationCardsProps {
  destinations: Destination[]
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  onSelectDestination: (destination: Destination) => void
  loading: boolean
}

export default function DestinationCards({
  destinations,
  categories,
  selectedCategory,
  onCategoryChange,
  onSelectDestination,
  loading,
}: DestinationCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section className="py-20 px-4 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">Explore Destinations</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Filter by category and discover amazing places around the world
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center gap-3 flex-wrap"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Destination Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-muted rounded-lg mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} onSelect={onSelectDestination} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
