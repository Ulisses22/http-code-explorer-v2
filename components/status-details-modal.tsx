"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy } from "lucide-react"
import Swal from "sweetalert2"
import { statusCodes } from "@/lib/status-codes"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatusCodeProps {
  code: number
  type: string
  message: string
  description: string
}

interface StatusDetailsModalProps {
  statusCode: StatusCodeProps | null
  isOpen: boolean
  onClose: () => void
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
})

export function StatusDetailsModal({ statusCode, isOpen, onClose }: StatusDetailsModalProps) {
  if (!statusCode) return null

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Toast.fire({
          icon: "success",
          title: `${type} copied to clipboard!`,
        })
      })
      .catch(() => {
        Toast.fire({
          icon: "error",
          title: `Failed to copy ${type}:`,
        })
      })
  }

  const getRelatedCodes = (currentCode: StatusCodeProps) => {
    return statusCodes.filter(
      (codeItem) =>
        codeItem.type === currentCode.type && // Same category
        codeItem.code !== currentCode.code, // Not the current code itself
    )
  }

  const relatedCodes = getRelatedCodes(statusCode)

  const getBgColorClass = (type: string) => {
    if (type.includes("1XX informational")) return "bg-[rgba(3,169,244,0.9)]"
    if (type.includes("2XX success")) return "bg-[rgba(56,189,128,0.9)]"
    if (type.includes("3XX redirection")) return "bg-[rgba(255,193,7,0.9)]"
    if (type.includes("4XX client-error")) return "bg-[rgba(244,67,54,0.9)]"
    if (type.includes("5XX server-error")) return "bg-[rgba(233,30,99,0.9)]"
    return "bg-gray-700" // Fallback for unknown types
  }

  const cardBgColor = getBgColorClass(statusCode.type)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            {statusCode.code} - {statusCode.message}
          </DialogTitle>
          <DialogDescription className="text-lg">{statusCode.description}</DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 my-4">
          <Button onClick={() => handleCopy(JSON.stringify(statusCode, null, 2), "JSON")} variant="outline">
            <Copy className="mr-2 h-4 w-4" /> Copy JSON
          </Button>
        </div>

        <Tabs defaultValue="snippets" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3">
            <TabsTrigger value="snippets">Code Snippets</TabsTrigger>
            <TabsTrigger value="related">Related Codes</TabsTrigger>
            <TabsTrigger value="more-info">More Info</TabsTrigger>
          </TabsList>
          <TabsContent value="snippets" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">How to use/handle {statusCode.code}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">JavaScript (Fetch API)</h4>
                <pre className="bg-white p-3 rounded-md text-sm overflow-x-auto">
                  <code className="text-black">
                    {`fetch('/api/data')
.then(response => {
if (response.status === ${statusCode.code}) {
  // Handle ${statusCode.message}
  console.log('Success:', response.status);
  return response.json();
} else {
  console.error('Error:', response.status);
  throw new Error('Unexpected status code');
}
})
.catch(error => console.error('Fetch error:', error));`}
                  </code>
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-1">Node.js (Express)</h4>
                <pre className="bg-white p-3 rounded-md text-sm overflow-x-auto">
                  <code className="text-black">
                    {`app.get('/api/resource', (req, res) => {
// ... logic ...
res.status(${statusCode.code}).send('${statusCode.message}');
});`}
                  </code>
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-1">cURL</h4>
                <pre className="bg-white p-3 rounded-md text-sm overflow-x-auto">
                  <code className="text-black">
                    {`curl -i -X GET http://example.com/resource`}
                    {statusCode.code >= 400 && ` # This might return a ${statusCode.code}`}
                  </code>
                </pre>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="related" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Related Codes ({statusCode.type.replace("-", " ")})</h3>
            {relatedCodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedCodes.map((code) => (
                  <Card key={code.code} className={cn("p-3 text-white", getBgColorClass(code.type))}>
                    <CardTitle className="text-2xl">{code.code}</CardTitle>
                    <CardDescription className="text-white/80">{code.message}</CardDescription>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No other related codes found in this category.</p>
            )}
          </TabsContent>
          <TabsContent value="more-info" className="mt-4">
            <h3 className="text-xl font-semibold mb-2">More Information</h3>
            <p className="text-muted-foreground">For more in-depth details, refer to the official documentation:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <a
                  href={`https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${statusCode.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  MDN Web Docs: {statusCode.code} {statusCode.message}
                </a>
              </li>
              <li>
                <a
                  href={`https://www.rfc-editor.org/rfc/rfc${Math.floor(statusCode.code / 100) * 100}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  RFC Documentation (General Category)
                </a>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
