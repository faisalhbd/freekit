"use client"

import { useState, useMemo } from "react"
import { Receipt, Plus, X, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LineItem {
  id: string
  description: string
  quantity: string
  unitPrice: string
}

function uid() {
  return crypto.randomUUID()
}

function fmt(v: number) {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function parseNum(v: string): number {
  return parseFloat(v) || 0
}

export function InvoiceGeneratorTool() {
  const [activeTab, setActiveTab] = useState("business")

  // Business info
  const [bizName, setBizName] = useState("")
  const [bizAddress, setBizAddress] = useState("")
  const [bizEmail, setBizEmail] = useState("")
  const [bizPhone, setBizPhone] = useState("")

  // Client info
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [clientEmail, setClientEmail] = useState("")

  // Invoice details
  const [invoiceNumber, setInvoiceNumber] = useState(() => `INV-${String(Date.now()).slice(-4)}`)
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [dueDate, setDueDate] = useState("")

  // Line items
  const [items, setItems] = useState<LineItem[]>([
    { id: uid(), description: "", quantity: "1", unitPrice: "" },
  ])

  // Tax & discount
  const [taxRate, setTaxRate] = useState("")
  const [discountType, setDiscountType] = useState<"flat" | "percent">("flat")
  const [discountValue, setDiscountValue] = useState("")

  // Notes
  const [notes, setNotes] = useState("")

  const addItem = () => {
    setItems((prev) => [...prev, { id: uid(), description: "", quantity: "1", unitPrice: "" }])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof LineItem, value: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + parseNum(item.quantity) * parseNum(item.unitPrice)
    }, 0)
  }, [items])

  const taxAmount = useMemo(() => {
    return (subtotal * parseNum(taxRate)) / 100
  }, [subtotal, taxRate])

  const discountAmount = useMemo(() => {
    const val = parseNum(discountValue)
    if (discountType === "percent") {
      return (subtotal * val) / 100
    }
    return val
  }, [subtotal, discountType, discountValue])

  const total = useMemo(() => {
    return Math.max(0, subtotal + taxAmount - discountAmount)
  }, [subtotal, taxAmount, discountAmount])

  const handlePrint = () => {
    window.print()
  }

  const n = (v: string) => v || ""

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left — Editor */}
      <div className="print:hidden space-y-4">
        <div className="flex items-center gap-2">
          <Receipt className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Invoice Editor</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="business" className="text-xs flex-1">Business</TabsTrigger>
            <TabsTrigger value="client" className="text-xs flex-1">Client</TabsTrigger>
            <TabsTrigger value="details" className="text-xs flex-1">Details</TabsTrigger>
            <TabsTrigger value="items" className="text-xs flex-1">Items</TabsTrigger>
            <TabsTrigger value="extras" className="text-xs flex-1">Extras</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Company Name</Label>
              <Input placeholder="Acme Inc." value={bizName} onChange={(e) => setBizName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Textarea placeholder="123 Business St, Suite 100\nNew York, NY 10001" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)} rows={2} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" placeholder="billing@acme.com" value={bizEmail} onChange={(e) => setBizEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Phone</Label>
                <Input placeholder="(555) 123-4567" value={bizPhone} onChange={(e) => setBizPhone(e.target.value)} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="client" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Client Name</Label>
              <Input placeholder="Client Corp." value={clientName} onChange={(e) => setClientName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Client Address</Label>
              <Textarea placeholder="456 Client Ave\nLos Angeles, CA 90001" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} rows={2} />
            </div>
            <div className="space-y-1.5">
              <Label>Client Email</Label>
              <Input type="email" placeholder="contact@clientcorp.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
            </div>
          </TabsContent>

          <TabsContent value="details" className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Invoice Number</Label>
                <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Issue Date</Label>
                <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Due Date</Label>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="items" className="mt-4 space-y-3">
            <div className="space-y-2">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_80px_100px_32px] gap-2 text-xs font-medium text-muted-foreground px-1">
                <span>Description</span>
                <span>Qty</span>
                <span>Unit Price</span>
                <span></span>
              </div>
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[1fr_80px_100px_32px] gap-2 items-center">
                  <Input
                    placeholder="Web development services"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  />
                  <Input
                    placeholder="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                  />
                  <Input
                    placeholder="0.00"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                  />
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => removeItem(item.id)} disabled={items.length <= 1}>
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addItem} className="w-full">
                <Plus className="size-4 mr-1" /> Add Line Item
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="extras" className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Tax Rate (%)</Label>
                <Input placeholder="10" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Discount Type</Label>
                <Select value={discountType} onValueChange={(v) => setDiscountType(v as "flat" | "percent")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Amount ($)</SelectItem>
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Discount Value</Label>
                <Input placeholder={discountType === "percent" ? "10" : "50"} value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Notes</Label>
              <Textarea
                placeholder="Payment is due within 30 days. Thank you for your business!"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button onClick={handlePrint} className="w-full">
          <Printer className="size-4 mr-2" /> Print Invoice
        </Button>
      </div>

      {/* Right — Live Preview */}
      <div className="print:m-0 print:p-0 print:max-w-none">
        <div className="flex items-center gap-2 mb-4 print:hidden">
          <Receipt className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Live Preview</h2>
        </div>
        <div className="bg-white text-gray-900 rounded-lg border shadow-sm p-6 sm:p-8 print:shadow-none print:border-none print:rounded-none">
          <div className="space-y-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                {(bizName || "") && <h1 className="text-2xl font-bold text-gray-900">{n(bizName)}</h1>}
                {(bizAddress || "") && <p className="text-sm text-gray-500 mt-1 whitespace-pre-line">{n(bizAddress)}</p>}
                <div className="text-sm text-gray-500 mt-1">
                  {(bizEmail || "") && <span>{n(bizEmail)}</span>}
                  {(bizEmail || "") && (bizPhone || "") && <span className="mx-2">|</span>}
                  {(bizPhone || "") && <span>{n(bizPhone)}</span>}
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                <div className="text-sm text-gray-600 mt-2 space-y-0.5">
                  <p><span className="text-gray-400">No:</span> <span className="font-medium">{n(invoiceNumber)}</span></p>
                  <p><span className="text-gray-400">Date:</span> <span className="font-medium">{n(issueDate)}</span></p>
                  {(dueDate || "") && <p><span className="text-gray-400">Due:</span> <span className="font-medium">{n(dueDate)}</span></p>}
                </div>
              </div>
            </div>

            {/* Bill To */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Bill To</p>
              {(clientName || "") && <p className="font-semibold text-gray-900">{n(clientName)}</p>}
              {(clientAddress || "") && <p className="text-sm text-gray-600 mt-0.5 whitespace-pre-line">{n(clientAddress)}</p>}
              {(clientEmail || "") && <p className="text-sm text-gray-600">{n(clientEmail)}</p>}
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 text-gray-500 font-medium">Description</th>
                    <th className="text-right py-2 text-gray-500 font-medium w-16">Qty</th>
                    <th className="text-right py-2 text-gray-500 font-medium w-24">Unit Price</th>
                    <th className="text-right py-2 text-gray-500 font-medium w-24">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const lineTotal = parseNum(item.quantity) * parseNum(item.unitPrice)
                    return (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="py-2 text-gray-800">{n(item.description) || "—"}</td>
                        <td className="py-2 text-right text-gray-600">{n(item.quantity) || "0"}</td>
                        <td className="py-2 text-right text-gray-600">${fmt(parseNum(item.unitPrice))}</td>
                        <td className="py-2 text-right font-medium text-gray-900">${fmt(lineTotal)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-1 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${fmt(subtotal)}</span>
                </div>
                {parseNum(taxRate) > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Tax ({n(taxRate)}%)</span>
                    <span>${fmt(taxAmount)}</span>
                  </div>
                )}
                {parseNum(discountValue) > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Discount{discountType === "percent" ? ` (${n(discountValue)}%)` : ""}</span>
                    <span>-${fmt(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>${fmt(total)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {(notes || "") && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Notes</p>
                <p className="text-sm text-gray-600 whitespace-pre-line">{n(notes)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
