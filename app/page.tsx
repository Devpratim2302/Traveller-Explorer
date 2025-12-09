"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import DestinationCards from "@/components/destination-cards"
import DetailView from "@/components/detail-view"

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

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("/api/destinations")
        const data = await response.json()
        setDestinations(data)
      } catch (error) {
        console.error("Failed to fetch destinations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  const filteredDestinations =
    selectedCategory === "all" ? destinations : destinations.filter((d) => d.category === selectedCategory)

  const categories = ["all", ...new Set(destinations.map((d) => d.category))]

  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <DestinationCards
        destinations={filteredDestinations}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onSelectDestination={setSelectedDestination}
        loading={loading}
      />
      {selectedDestination && (
        <DetailView destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
      )}
    </main>
  )
}
