"use client"

import { useState, useMemo } from "react"
import { FileCheck, Plus, X, Printer, RotateCcw, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

interface LineEntry {
  id: string
  name: string
  amount: string
}

function uid() {
  return crypto.randomUUID()
}

function parseNum(v: string): number {
  return parseFloat((v || "").replace(/[^0-9.\-]/g, "")) || 0
}

function fmt(v: number): string {
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function PayslipGeneratorTool() {
  // Employer
  const [companyName, setCompanyName] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")

  // Employee
  const [empName, setEmpName] = useState("")
  const [empId, setEmpId] = useState("")
  const [empDept, setEmpDept] = useState("")
  const [empPosition, setEmpPosition] = useState("")

  // Pay Period
  const [periodStart, setPeriodStart] = useState(() => new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10))
  const [periodEnd, setPeriodEnd] = useState(() => new Date().toISOString().slice(0, 10))
  const [payDate, setPayDate] = useState(() => new Date().toISOString().slice(0, 10))

  // Earnings
  const [basicSalary, setBasicSalary] = useState("")
  const [extraEarnings, setExtraEarnings] = useState<LineEntry[]>([])

  // Deductions
  const [taxRate, setTaxRate] = useState("")
  const [extraDeductions, setExtraDeductions] = useState<LineEntry[]>([])

  const addEarning = () => setExtraEarnings((p) => [...p, { id: uid(), name: "", amount: "" }])
  const removeEarning = (id: string) => setExtraEarnings((p) => p.filter((e) => e.id !== id))
  const updateEarning = (id: string, field: keyof LineEntry, val: string) =>
    setExtraEarnings((p) => p.map((e) => (e.id === id ? { ...e, [field]: val } : e)))

  const addDeduction = () => setExtraDeductions((p) => [...p, { id: uid(), name: "", amount: "" }])
  const removeDeduction = (id: string) => setExtraDeductions((p) => p.filter((e) => e.id !== id))
  const updateDeduction = (id: string, field: keyof LineEntry, val: string) =>
    setExtraDeductions((p) => p.map((e) => (e.id === id ? { ...e, [field]: val } : e)))

  const calculations = useMemo(() => {
    const basic = parseNum(basicSalary)
    const additionalEarnings = extraEarnings.reduce((sum, e) => sum + parseNum(e.amount), 0)
    const grossPay = basic + additionalEarnings

    const taxPct = parseNum(taxRate)
    const taxAmount = (grossPay * taxPct) / 100
    const additionalDeductions = extraDeductions.reduce((sum, d) => sum + parseNum(d.amount), 0)
    const totalDeductions = taxAmount + additionalDeductions
    const netPay = grossPay - totalDeductions

    return { basic, additionalEarnings, grossPay, taxPct, taxAmount, additionalDeductions, totalDeductions, netPay }
  }, [basicSalary, extraEarnings, taxRate, extraDeductions])

  const handlePrint = () => window.print()
  const resetAll = () => {
    setCompanyName(""); setCompanyAddress("")
    setEmpName(""); setEmpId(""); setEmpDept(""); setEmpPosition("")
    setBasicSalary(""); setTaxRate("")
    setExtraEarnings([]); setExtraDeductions([])
  }

  const n = (v: string) => v || ""

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <div className="print:hidden space-y-4">
        <div className="flex items-center gap-2">
          <FileCheck className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Payslip Editor</h2>
        </div>

        <Tabs defaultValue="employer">
          <TabsList className="w-full flex h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="employer" className="text-xs flex-1">Employer</TabsTrigger>
            <TabsTrigger value="employee" className="text-xs flex-1">Employee</TabsTrigger>
            <TabsTrigger value="period" className="text-xs flex-1">Period</TabsTrigger>
            <TabsTrigger value="money" className="text-xs flex-1">Money</TabsTrigger>
          </TabsList>

          <TabsContent value="employer" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2"><Building2 className="size-3.5" /> Company Name</Label>
              <Input placeholder="Acme Corporation" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Input placeholder="123 Business St, City, State" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
            </div>
          </TabsContent>

          <TabsContent value="employee" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label className="flex items-center gap-2"><User className="size-3.5" /> Full Name</Label>
              <Input placeholder="Jane Smith" value={empName} onChange={(e) => setEmpName(e.target.value)} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Employee ID</Label>
                <Input placeholder="EMP-001" value={empId} onChange={(e) => setEmpId(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Input placeholder="Engineering" value={empDept} onChange={(e) => setEmpDept(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Position</Label>
              <Input placeholder="Senior Developer" value={empPosition} onChange={(e) => setEmpPosition(e.target.value)} />
            </div>
          </TabsContent>

          <TabsContent value="period" className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Period Start</Label>
                <Input type="date" value={periodStart} onChange={(e) => setPeriodStart(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Period End</Label>
                <Input type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Pay Date</Label>
                <Input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="money" className="mt-4 space-y-4">
            {/* Earnings */}
            <div className="space-y-2">
              <Label className="font-semibold">Earnings</Label>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Basic Salary ($)</Label>
                <Input placeholder="5000.00" value={basicSalary} onChange={(e) => setBasicSalary(e.target.value)} className="font-mono" />
              </div>
              {extraEarnings.map((entry) => (
                <div key={entry.id} className="grid grid-cols-[1fr_100px_32px] gap-2 items-end">
                  <div className="space-y-1">
                    <Input placeholder="Overtime" value={entry.name} onChange={(e) => updateEarning(entry.id, "name", e.target.value)} />
                  </div>
                  <Input placeholder="0.00" value={entry.amount} onChange={(e) => updateEarning(entry.id, "amount", e.target.value)} className="font-mono" />
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => removeEarning(entry.id)}>
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addEarning} className="w-full">
                <Plus className="size-4 mr-1" /> Add Earning
              </Button>
            </div>

            <Separator />

            {/* Deductions */}
            <div className="space-y-2">
              <Label className="font-semibold">Deductions</Label>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Tax Rate (%)</Label>
                <Input placeholder="20" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="font-mono" />
              </div>
              {extraDeductions.map((entry) => (
                <div key={entry.id} className="grid grid-cols-[1fr_100px_32px] gap-2 items-end">
                  <div className="space-y-1">
                    <Input placeholder="Insurance" value={entry.name} onChange={(e) => updateDeduction(entry.id, "name", e.target.value)} />
                  </div>
                  <Input placeholder="0.00" value={entry.amount} onChange={(e) => updateDeduction(entry.id, "amount", e.target.value)} className="font-mono" />
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => removeDeduction(entry.id)}>
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addDeduction} className="w-full">
                <Plus className="size-4 mr-1" /> Add Deduction
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="size-4 mr-2" /> Print Payslip
          </Button>
          <Button variant="outline" onClick={resetAll}>
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="print:m-0 print:p-0 print:max-w-none">
        <div className="flex items-center gap-2 mb-4 print:hidden">
          <FileCheck className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Live Preview</h2>
        </div>
        <div className="bg-white text-gray-900 rounded-lg border shadow-sm p-6 sm:p-8 print:shadow-none print:border-none print:rounded-none">
          {/* Header */}
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{n(companyName) || "Company Name"}</h1>
              {(companyAddress || "") && <p className="text-sm text-gray-500 mt-0.5">{n(companyAddress)}</p>}
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider">Payslip</h2>
            </div>
          </div>

          <div className="my-4 border-t-2 border-gray-200" />

          {/* Pay Period */}
          <div className="grid grid-cols-3 gap-2 text-sm mb-4">
            <div><span className="text-gray-400">Period Start:</span> <span className="font-medium">{n(periodStart)}</span></div>
            <div><span className="text-gray-400">Period End:</span> <span className="font-medium">{n(periodEnd)}</span></div>
            <div><span className="text-gray-400">Pay Date:</span> <span className="font-medium">{n(payDate)}</span></div>
          </div>

          {/* Employee Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Employee Information</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div><span className="text-gray-400">Name:</span> <span className="font-medium">{n(empName) || "—"}</span></div>
              <div><span className="text-gray-400">Employee ID:</span> <span className="font-medium">{n(empId) || "—"}</span></div>
              <div><span className="text-gray-400">Department:</span> <span className="font-medium">{n(empDept) || "—"}</span></div>
              <div><span className="text-gray-400">Position:</span> <span className="font-medium">{n(empPosition) || "—"}</span></div>
            </div>
          </div>

          {/* Earnings & Deductions side by side */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Earnings */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Earnings</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2 px-3 text-gray-500 font-medium text-xs">Description</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="py-1.5 px-3">Basic Salary</td>
                      <td className="py-1.5 px-3 text-right font-mono">${fmt(calculations.basic)}</td>
                    </tr>
                    {extraEarnings.map((e) => (
                      <tr key={e.id} className="border-t border-gray-100">
                        <td className="py-1.5 px-3">{n(e.name) || "—"}</td>
                        <td className="py-1.5 px-3 text-right font-mono">${fmt(parseNum(e.amount))}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td className="py-2 px-3 font-bold">Gross Pay</td>
                      <td className="py-2 px-3 text-right font-mono font-bold">${fmt(calculations.grossPay)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Deductions</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left py-2 px-3 text-gray-500 font-medium text-xs">Description</th>
                      <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.taxPct > 0 && (
                      <tr>
                        <td className="py-1.5 px-3">Tax ({n(taxRate)}%)</td>
                        <td className="py-1.5 px-3 text-right font-mono">${fmt(calculations.taxAmount)}</td>
                      </tr>
                    )}
                    {extraDeductions.map((d) => (
                      <tr key={d.id} className="border-t border-gray-100">
                        <td className="py-1.5 px-3">{n(d.name) || "—"}</td>
                        <td className="py-1.5 px-3 text-right font-mono">${fmt(parseNum(d.amount))}</td>
                      </tr>
                    ))}
                    {calculations.totalDeductions === 0 && !extraDeductions.length && calculations.taxPct === 0 && (
                      <tr><td className="py-1.5 px-3 text-gray-400" colSpan={2}>No deductions</td></tr>
                    )}
                    <tr className="border-t-2 border-gray-300 bg-gray-50">
                      <td className="py-2 px-3 font-bold">Total Deductions</td>
                      <td className="py-2 px-3 text-right font-mono font-bold">${fmt(calculations.totalDeductions)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Net Pay */}
          <div className="mt-4 bg-gray-900 text-white rounded-lg p-4 flex justify-between items-center">
            <span className="font-bold text-lg">Net Pay</span>
            <span className="text-2xl font-bold font-mono">${fmt(calculations.netPay)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}