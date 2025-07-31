"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface DownloadButtonProps {
  data: any[]
  filename: string
}

export function DownloadButton({ data, filename }: DownloadButtonProps) {
  const { toast } = useToast()

  const handleDownload = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2)
      const blob = new Blob([jsonString], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Download Started",
        description: `Downloading ${filename}...`,
      })
    } catch (error) {
      console.error("Failed to download JSON:", error)
      toast({
        title: "Download Failed",
        description: "Could not download the JSON file.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2 bg-transparent">
      <Download className="h-4 w-4" />
      Download JSON
    </Button>
  )
}
