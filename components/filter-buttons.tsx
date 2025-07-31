"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FilterButtonsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  const categories = ["All", "1XX", "2XX", "3XX", "4XX", "5XX"]

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeFilter === category.toLowerCase() ? "default" : "outline"}
          onClick={() => onFilterChange(category.toLowerCase())}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            activeFilter === category.toLowerCase()
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
