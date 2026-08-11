"use client"

import { useState, useMemo, useCallback } from "react"
import {
  GraduationCap,
  Plus,
  Trash2,
  Calculator,
  Award,
  BookOpen,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ─── Types ──────────────────────────────────────────────────────────────────

type GPAScale = "4.0" | "4.3"

interface Course {
  id: string
  name: string
  grade: string
  credits: string
}

interface GPAResult {
  gpa: number
  totalCredits: number
  totalQualityPoints: number
  letterGrade: string
  classification: string
}

// ─── Grade Maps ──────────────────────────────────────────────────────────────

const GRADES_4_0: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

const GRADES_4_3: Record<string, number> = {
  "A+": 4.3,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
}

const GRADE_OPTIONS = [
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
]

// ─── Helpers ────────────────────────────────────────────────────────────────

function getGradeMap(scale: GPAScale): Record<string, number> {
  return scale === "4.3" ? GRADES_4_3 : GRADES_4_0
}

function getLetterGrade(gpa: number): string {
  if (gpa >= 4.0) return "A"
  if (gpa >= 3.7) return "A-"
  if (gpa >= 3.3) return "B+"
  if (gpa >= 3.0) return "B"
  if (gpa >= 2.7) return "B-"
  if (gpa >= 2.3) return "C+"
  if (gpa >= 2.0) return "C"
  if (gpa >= 1.7) return "C-"
  if (gpa >= 1.3) return "D+"
  if (gpa >= 1.0) return "D"
  if (gpa >= 0.7) return "D-"
  return "F"
}

function getClassification(gpa: number): string {
  if (gpa >= 3.9) return "Summa Cum Laude"
  if (gpa >= 3.7) return "Magna Cum Laude"
  if (gpa >= 3.5) return "Cum Laude"
  if (gpa >= 3.25) return "Dean's List"
  if (gpa >= 3.0) return "Good Standing"
  if (gpa >= 2.0) return "Satisfactory"
  return "Academic Warning"
}

function getClassificationColor(gpa: number): string {
  if (gpa >= 3.9) return "text-amber-600 dark:text-amber-400"
  if (gpa >= 3.7) return "text-purple-600 dark:text-purple-400"
  if (gpa >= 3.5) return "text-emerald-600 dark:text-emerald-400"
  if (gpa >= 3.25) return "text-blue-600 dark:text-blue-400"
  if (gpa >= 3.0) return "text-foreground"
  return "text-destructive"
}

function createCourse(): Course {
  return {
    id: crypto.randomUUID(),
    name: "",
    grade: "",
    credits: "",
  }
}

function parseCredits(v: string): number {
  const n = parseFloat((v || ""))
  return isNaN(n) ? 0 : Math.min(Math.max(n, 0), 12)
}

// ─── GPA Gauge Component ────────────────────────────────────────────────────

function GPAGauge({ gpa, scale }: { gpa: number; scale: GPAScale }) {
  const maxScale = scale === "4.3" ? 4.3 : 4.0
  const percentage = Math.min((gpa / maxScale) * 100, 100)
  const rotation = (percentage / 100) * 180

  // Color based on GPA
  let gaugeColor = "stroke-destructive"
  if (gpa >= 3.7) gaugeColor = "stroke-emerald-500"
  else if (gpa >= 3.0) gaugeColor = "stroke-amber-500"
  else if (gpa >= 2.0) gaugeColor = "stroke-orange-500"

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        viewBox="0 0 200 115"
        className="w-full max-w-[220px]"
        aria-label={`GPA gauge showing ${gpa.toFixed(2)} out of ${maxScale}`}
        role="img"
      >
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          className="text-muted/30"
        />
        {/* Filled arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className={gaugeColor}
          strokeDasharray={`${(percentage / 100) * 251.2} 251.2`}
        />
        {/* Center text */}
        <text
          x="100"
          y="90"
          textAnchor="middle"
          className="fill-foreground text-3xl font-bold"
          style={{ fontSize: "28px" }}
        >
          {gpa.toFixed(2)}
        </text>
        <text
          x="100"
          y="108"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontSize: "11px" }}
        >
          out of {maxScale}
        </text>
      </svg>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function GPACalculatorTool() {
  const [scale, setScale] = useState<GPAScale>("4.0")
  const [courses, setCourses] = useState<Course[]>([
    createCourse(),
    createCourse(),
    createCourse(),
    createCourse(),
  ])

  // ── Course management ──

  const addCourse = useCallback(() => {
    setCourses((prev) => [...prev, createCourse()])
  }, [])

  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((c) => c.id !== id)
    })
  }, [])

  const updateCourse = useCallback((
    id: string,
    field: keyof Course,
    value: string
  ) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }, [])

  const handleReset = useCallback(() => {
    setScale("4.0")
    setCourses([createCourse(), createCourse(), createCourse(), createCourse()])
  }, [])

  // ── GPA calculation (real-time) ──

  const result: GPAResult | null = useMemo(() => {
    const gradeMap = getGradeMap(scale)
    let totalCredits = 0
    let totalQualityPoints = 0

    for (const course of courses) {
      const credits = parseCredits(course.credits)
      if (credits <= 0 || !course.grade) continue

      const points = gradeMap[course.grade]
      if (points === undefined) continue

      totalCredits += credits
      totalQualityPoints += points * credits
    }

    if (totalCredits === 0) return null

    const gpa = totalQualityPoints / totalCredits

    return {
      gpa,
      totalCredits,
      totalQualityPoints,
      letterGrade: getLetterGrade(gpa),
      classification: getClassification(gpa),
    }
  }, [courses, scale])

  // Count valid (filled) courses
  const validCourses = useMemo(() => {
    return courses.filter(
      (c) => (c.name || "") !== "" && c.grade && parseCredits(c.credits) > 0
    ).length
  }, [courses])

  return (
    <div className="space-y-6">
      {/* ── Input Card ── */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-2.5">
              <GraduationCap className="size-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">GPA Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Enter your courses, grades, and credit hours
              </p>
            </div>
          </div>

          {/* Scale Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <Label className="text-sm font-medium shrink-0">
              GPA Scale
            </Label>
            <div className="flex gap-2">
              <Button
                variant={scale === "4.0" ? "default" : "outline"}
                size="sm"
                onClick={() => setScale("4.0")}
                className="gap-1.5"
              >
                <Calculator className="size-3.5" />
                4.0 Scale
              </Button>
              <Button
                variant={scale === "4.3" ? "default" : "outline"}
                size="sm"
                onClick={() => setScale("4.3")}
                className="gap-1.5"
              >
                <Calculator className="size-3.5" />
                4.3 Scale
              </Button>
            </div>
            <p className="text-xs text-muted-foreground sm:ml-auto">
              {scale === "4.3"
                ? "A+ = 4.3 points (used by some Canadian & US schools)"
                : "A+ = 4.0 points (most common US scale)"}
            </p>
          </div>

          <Separator className="my-5" />

          {/* Course Table — Desktop */}
          <div className="hidden md:block rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-[40px] text-center text-xs font-medium">#</TableHead>
                  <TableHead className="text-xs font-medium">Course Name</TableHead>
                  <TableHead className="w-[160px] text-xs font-medium">Grade</TableHead>
                  <TableHead className="w-[130px] text-xs font-medium">Credits</TableHead>
                  <TableHead className="w-[60px] text-xs font-medium">Quality Pts</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, idx) => {
                  const gradeMap = getGradeMap(scale)
                  const credits = parseCredits(course.credits)
                  const points =
                    course.grade && credits > 0
                      ? (gradeMap[course.grade] ?? 0) * credits
                      : null

                  return (
                    <TableRow key={course.id}>
                      <TableCell className="text-center text-sm text-muted-foreground font-mono">
                        {idx + 1}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="text"
                          value={course.name}
                          onChange={(e) =>
                            updateCourse(course.id, "name", e.target.value)
                          }
                          placeholder="e.g. Introduction to Biology"
                          className="h-9 text-sm"
                          aria-label={`Course ${idx + 1} name`}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={course.grade}
                          onValueChange={(v) =>
                            updateCourse(course.id, "grade", v)
                          }
                        >
                          <SelectTrigger className="h-9 text-sm" aria-label={`Course ${idx + 1} grade`}>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map((g) => (
                              <SelectItem key={g} value={g}>
                                <span className="font-mono">{g}</span>
                                <span className="ml-2 text-muted-foreground text-xs">
                                  ({getGradeMap(scale)[g]})
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={1}
                          max={6}
                          step={1}
                          value={course.credits}
                          onChange={(e) =>
                            updateCourse(course.id, "credits", e.target.value)
                          }
                          placeholder="3"
                          className="h-9 text-sm font-mono text-center"
                          aria-label={`Course ${idx + 1} credit hours`}
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        {points !== null ? (
                          <span className="font-mono text-sm font-medium tabular-nums">
                            {points.toFixed(1)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeCourse(course.id)}
                          disabled={courses.length <= 1}
                          aria-label={`Remove course ${idx + 1}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>

          {/* Course List — Mobile (stacked cards) */}
          <div className="md:hidden space-y-3 max-h-[500px] overflow-y-auto">
            {courses.map((course, idx) => {
              const gradeMap = getGradeMap(scale)
              const credits = parseCredits(course.credits)
              const points =
                course.grade && credits > 0
                  ? (gradeMap[course.grade] ?? 0) * credits
                  : null

              return (
                <div
                  key={course.id}
                  className="rounded-lg border border-border bg-card p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      Course #{idx + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length <= 1}
                      aria-label={`Remove course ${idx + 1}`}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Course Name</Label>
                    <Input
                      type="text"
                      value={course.name}
                      onChange={(e) =>
                        updateCourse(course.id, "name", e.target.value)
                      }
                      placeholder="e.g. Introduction to Biology"
                      className="h-9 text-sm"
                      aria-label={`Course ${idx + 1} name`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Grade</Label>
                      <Select
                        value={course.grade}
                        onValueChange={(v) =>
                          updateCourse(course.id, "grade", v)
                        }
                      >
                        <SelectTrigger className="h-9 text-sm" aria-label={`Course ${idx + 1} grade`}>
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADE_OPTIONS.map((g) => (
                            <SelectItem key={g} value={g}>
                              <span className="font-mono">{g}</span>{" "}
                              <span className="text-muted-foreground text-xs">
                                ({getGradeMap(scale)[g]})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Credits</Label>
                      <Input
                        type="number"
                        min={1}
                        max={6}
                        step={1}
                        value={course.credits}
                        onChange={(e) =>
                          updateCourse(course.id, "credits", e.target.value)
                        }
                        placeholder="3"
                        className="h-9 text-sm font-mono text-center"
                        aria-label={`Course ${idx + 1} credit hours`}
                      />
                    </div>
                  </div>
                  {points !== null && (
                    <div className="flex items-center justify-between text-sm pt-1 border-t border-border">
                      <span className="text-muted-foreground">Quality Points</span>
                      <span className="font-mono font-medium tabular-nums">
                        {points.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-5">
            <Button variant="outline" size="sm" onClick={addCourse} className="gap-2">
              <Plus className="size-4" />
              Add Course
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2 text-muted-foreground">
              <Calculator className="size-3.5" />
              Reset All
            </Button>
            {validCourses > 0 && (
              <p className="text-xs text-muted-foreground sm:ml-auto">
                {validCourses} course{validCourses !== 1 ? "s" : ""} entered · Results update in real time
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* ── Results Card ── */}
      {result && (
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-background p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2.5">
                <Award className="size-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Your GPA Results</h3>
                <p className="text-sm text-muted-foreground">
                  Based on {result.totalCredits} credit hour{result.totalCredits !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* GPA Gauge + Classification */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <GPAGauge gpa={result.gpa} scale={scale} />
              <div className="text-center space-y-1">
                <p
                  className={`text-lg font-semibold ${getClassificationColor(result.gpa)}`}
                >
                  {result.classification}
                </p>
                <p className="text-sm text-muted-foreground">
                  {result.letterGrade} equivalent
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* GPA */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wide flex items-center gap-1.5">
                  <GraduationCap className="size-3.5" />
                  GPA
                </p>
                <p className="text-2xl font-bold tabular-nums text-primary">
                  {result.gpa.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  on {scale} scale
                </p>
              </div>

              {/* Letter Grade */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Award className="size-3.5" />
                  Letter Grade
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {result.letterGrade}
                </p>
              </div>

              {/* Total Credits */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <BookOpen className="size-3.5" />
                  Total Credits
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {result.totalCredits}
                </p>
              </div>

              {/* Total Quality Points */}
              <div className="rounded-lg border border-border bg-card p-4 space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                  <Calculator className="size-3.5" />
                  Quality Points
                </p>
                <p className="text-2xl font-bold tabular-nums">
                  {result.totalQualityPoints.toFixed(1)}
                </p>
              </div>
            </div>

            <Separator className="my-5" />

            {/* GPA Classification Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">GPA Classification Scale</h4>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: "Summa Cum Laude", min: 3.9, color: "bg-amber-500" },
                  { label: "Magna Cum Laude", min: 3.7, color: "bg-purple-500" },
                  { label: "Cum Laude", min: 3.5, color: "bg-emerald-500" },
                  { label: "Dean's List", min: 3.25, color: "bg-blue-500" },
                  { label: "Good Standing", min: 3.0, color: "bg-foreground/30" },
                  { label: "Academic Warning", min: 0, color: "bg-destructive" },
                ].map((item) => {
                  const isActive =
                    item.min >= 3.9
                      ? result.gpa >= item.min
                      : item.min >= 3.7
                        ? result.gpa >= item.min && result.gpa < 3.9
                        : item.min >= 3.5
                          ? result.gpa >= item.min && result.gpa < 3.7
                          : item.min >= 3.25
                            ? result.gpa >= item.min && result.gpa < 3.5
                            : item.min >= 3.0
                              ? result.gpa >= item.min && result.gpa < 3.25
                              : result.gpa < 2.0

                  return (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-muted font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`size-2.5 rounded-full shrink-0 ${
                          isActive ? item.color : "bg-muted-foreground/30"
                        }`}
                      />
                      <span>{item.label}</span>
                      {item.min > 0 && (
                        <span className="ml-auto font-mono text-xs">
                          {item.min}+
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ── Privacy Notice ── */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center rounded-full bg-emerald-500/10 p-2 shrink-0">
            <GraduationCap className="size-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">100% Private — Runs in Your Browser</p>
            <p className="text-sm text-muted-foreground">
              All GPA calculations happen locally using JavaScript. Your course
              information is never sent to any server, stored, or shared. Close
              the tab and your data is gone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
