"use client"

import { motion, AnimatePresence } from "framer-motion"
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

interface DetailViewProps {
  destination: Destination
  onClose: () => void
}

export default function DetailView({ destination, onClose }: DetailViewProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center md:justify-center"
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-card rounded-t-3xl md:rounded-2xl w-full md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="relative">
            {/* Header Image */}
            <motion.div
              className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl md:rounded-t-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
            >
              <img
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/80" />
            </motion.div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-foreground p-2 rounded-full transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <motion.div
              className="p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-3">
                    {destination.category}
                  </span>
                  <h2 className="text-4xl font-bold text-foreground mb-2">{destination.name}</h2>
                  <div className="flex items-center gap-4">
                    <span className="text-lg">
                      ★ {destination.rating} <span className="text-muted-foreground">(1,240 reviews)</span>
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">{destination.description}</p>

              {/* Highlights */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-foreground mb-4">Highlights</h3>
                <div className="grid grid-cols-2 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex items-center gap-2 text-foreground"
                    >
                      <span className="text-primary">✓</span>
                      <span>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Price and CTA */}
              <motion.div
                className="flex items-center justify-between pt-6 border-t border-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-primary">{destination.price}</p>
                </div>
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all">
                  Book Now
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
