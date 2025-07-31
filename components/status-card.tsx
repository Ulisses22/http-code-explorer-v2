"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatusCodeProps {
  code: number
  type: string
  message: string
  description: string
  onCardClick: (statusCode: StatusCodeProps) => void // New prop
}

export function StatusCard({ code, type, message, description, onCardClick }: StatusCodeProps) {
  const handleClick = () => {
    onCardClick({ code, type, message, description }) // Call the prop function
  }

  const getBgColorClass = (type: string) => {
    if (type.includes("1XX informational")) return "bg-[rgba(3,169,244,0.9)]"
    if (type.includes("2XX success")) return "bg-[rgba(56,189,128,0.9)]"
    if (type.includes("3XX redirection")) return "bg-[rgba(255,193,7,0.9)]"
    if (type.includes("4XX client-error")) return "bg-[rgba(244,67,54,0.9)]"
    if (type.includes("5XX server-error")) return "bg-[rgba(233,30,99,0.9)]"
    return "bg-gray-700" // Fallback for unknown types
  }

  const cardBgColor = getBgColorClass(type)

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col justify-between text-white", // text-white applied here
        cardBgColor, // Apply background color to the card
      )}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <CardDescription className="font-semibold text-white/80">{type.replace("-", " ")}</CardDescription>
        <CardTitle className="text-4xl font-bold">{code}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-medium mb-2">{message}</p>
        <p className="text-sm text-white/70">{description}</p>
      </CardContent>
    </Card>
  )
}
