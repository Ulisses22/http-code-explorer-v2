"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lightbulb } from "lucide-react"
import { devTips } from "@/lib/dev-tips"

export function TipsModal() {
  const [currentTip, setCurrentTip] = useState("")

  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * devTips.length)
    setCurrentTip(devTips[randomIndex])
  }

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          getRandomTip()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Lightbulb className="h-4 w-4" />
          <span className="sr-only">Developer Tips</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>💡 Developer Tip</DialogTitle>
          <DialogDescription>Here's a quick tip to help you on your coding journey!</DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center text-lg font-medium">{currentTip || "Click 'Get New Tip' to see a tip!"}</div>
        <Button onClick={getRandomTip}>Get New Tip</Button>
      </DialogContent>
    </Dialog>
  )
}
