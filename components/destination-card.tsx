"use client"

import { motion } from "framer-motion"
import { useState } from "react"

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

interface DestinationCardProps {
  destination: Destination
  onSelect: (destination: Destination) => void
}

export default function DestinationCard({ destination, onSelect }: DestinationCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer"
      onClick={() => onSelect(destination)}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-shadow group-hover:shadow-2xl mb-4">
        <motion.div className="relative h-64 overflow-hidden" style={{ perspective: 1200 }}>
          <motion.img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>

        {/* Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {destination.category}
        </motion.div>

        {/* Rating */}
        <motion.div
          className="absolute bottom-4 left-4 bg-white/90 text-foreground px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
          animate={{
            y: isHovered ? 4 : 0,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          ★ {destination.rating}
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {destination.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{destination.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">{destination.price}</span>
          <button className="text-primary hover:text-accent transition-colors font-medium text-sm">Learn More →</button>
        </div>
      </div>
    </motion.div>
  )
}
