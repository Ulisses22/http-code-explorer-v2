"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Github } from "lucide-react"
import { StatusCard } from "@/components/status-card"
import { DownloadButton } from "@/components/download-button"
import { TipsModal } from "@/components/tips-modal"
import { FilterButtons } from "@/components/filter-buttons"
import { StatusDetailsModal } from "@/components/status-details-modal"
import { statusCodes } from "@/lib/status-codes"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all") // 'all', '1XX', '2XX', etc.
  const [filteredCodes, setFilteredCodes] = useState(statusCodes)
  const [selectedStatusCode, setSelectedStatusCode] = useState<(typeof statusCodes)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const query = searchQuery.toLowerCase()
    const newFilteredCodes = statusCodes.filter((codeItem) => {
      const matchesSearch =
        codeItem.code.toString().includes(query) ||
        codeItem.type.toLowerCase().includes(query) ||
        codeItem.description.toLowerCase().includes(query) ||
        codeItem.message.toLowerCase().includes(query)

      const matchesCategory =
        filterCategory === "all" || codeItem.type.toLowerCase().startsWith(filterCategory.toLowerCase())

      return matchesSearch && matchesCategory
    })
    setFilteredCodes(newFilteredCodes)
  }, [searchQuery, filterCategory])

  const handleCardClick = (statusCode: (typeof statusCodes)[0]) => {
    setSelectedStatusCode(statusCode)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedStatusCode(null)
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-4 sm:p-6 lg:p-8">
      {/* Header Section with Title and Controls */}
      <header className="w-full max-w-7xl flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">http-code-explorer</h1>
        <div className="flex gap-2">
          <DownloadButton data={statusCodes} filename="http-status-codes.json" />
          <TipsModal />
        </div>
      </header>

      <main className="flex flex-col items-center w-full max-w-7xl">
        <div className="w-full mb-6">
          <FilterButtons activeFilter={filterCategory} onFilterChange={setFilterCategory} />
          <p className="text-center text-sm text-muted-foreground mt-2">
            Explore detailed information by clicking on each HTTP status code card.
          </p>
        </div>
        <div className="search-container w-full mb-8">
          <Input
            type="text"
            id="search"
            placeholder="Search by code (2XX) or key words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 text-lg rounded-lg shadow-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="status-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
          {filteredCodes.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <h1 className="text-6xl font-bold text-gray-400">404</h1>
              <p className="text-xl text-gray-500">Not Found</p>
            </div>
          ) : (
            filteredCodes.map((statusCode) => (
              <StatusCard key={statusCode.code} {...statusCode} onCardClick={handleCardClick} />
            ))
          )}
        </div>
      </main>

      <footer className="mt-auto py-6 text-center text-muted-foreground">
        <p className="mb-2">
          Crafted by{" "}
          <a
            href="https://ulissesalves.nexgate.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Ulisses Alves
          </a>
        </p>
        <a
          href="https://github.com/Ulisses22/http-code-explorer"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          <Github className="h-6 w-6 mx-auto" />
        </a>
      </footer>

      {selectedStatusCode && (
        <StatusDetailsModal statusCode={selectedStatusCode} isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  )
}
