"use client"

import { useState, useMemo } from "react"
import { FileUser, Plus, X, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  isPresent: boolean
  description: string
}

interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startYear: string
  endYear: string
}

function uid() {
  return crypto.randomUUID()
}

export function ResumeBuilderTool() {
  const [activeTab, setActiveTab] = useState("personal")

  const [name, setName] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")
  const [linkedin, setLinkedin] = useState("")

  const [summary, setSummary] = useState("")

  const [experience, setExperience] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      { id: uid(), company: "", position: "", startDate: "", endDate: "", isPresent: false, description: "" },
    ])
  }

  const removeExperience = (id: string) => {
    setExperience((prev) => prev.filter((e) => e.id !== id))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | boolean) => {
    setExperience((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      { id: uid(), institution: "", degree: "", field: "", startYear: "", endYear: "" },
    ])
  }

  const removeEducation = (id: string) => {
    setEducation((prev) => prev.filter((e) => e.id !== id))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)))
  }

  const addSkill = () => {
    const trimmed = (skillInput || "").trim()
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed])
    }
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadText = () => {
    const lines: string[] = []
    const n = (v: string) => v || ""

    if (n(name)) lines.push(n(name).toUpperCase())
    if (n(jobTitle)) lines.push(n(jobTitle))
    lines.push("")

    const contact: string[] = []
    if (n(email)) contact.push(n(email))
    if (n(phone)) contact.push(n(phone))
    if (n(location)) contact.push(n(location))
    if (n(linkedin)) contact.push(n(linkedin))
    if (contact.length) lines.push(contact.join(" | "))
    lines.push("")

    if (n(summary)) {
      lines.push("PROFESSIONAL SUMMARY")
      lines.push(n(summary))
      lines.push("")
    }

    if (experience.length > 0 && experience.some((e) => n(e.company) || n(e.position))) {
      lines.push("WORK EXPERIENCE")
      for (const exp of experience) {
        if (!n(exp.company) && !n(exp.position)) continue
        lines.push(`${n(exp.position)}${n(exp.position) && n(exp.company) ? " at " : ""}${n(exp.company)}`)
        const end = exp.isPresent ? "Present" : n(exp.endDate)
        lines.push(`${n(exp.startDate)} – ${end}`)
        if (n(exp.description)) lines.push(n(exp.description))
        lines.push("")
      }
    }

    if (education.length > 0 && education.some((e) => n(e.institution))) {
      lines.push("EDUCATION")
      for (const edu of education) {
        if (!n(edu.institution)) continue
        lines.push(`${n(edu.degree)}${n(edu.degree) && n(edu.field) ? " in " : ""}${n(edu.field)}`)
        lines.push(n(edu.institution))
        lines.push(`${n(edu.startYear)} – ${n(edu.endYear)}`)
        lines.push("")
      }
    }

    if (skills.length > 0) {
      lines.push("SKILLS")
      lines.push(skills.join(", "))
    }

    const blob = new Blob([lines.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${(name || "resume").replace(/\s+/g, "_").toLowerCase()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const hasAnyData = useMemo(
    () => name || jobTitle || email || phone || summary || experience.length > 0 || education.length > 0 || skills.length > 0,
    [name, jobTitle, email, phone, summary, experience, education, skills]
  )

  const inputClass = "w-full"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left — Editor */}
      <div className="print:hidden space-y-4">
        <div className="flex items-center gap-2">
          <FileUser className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Resume Editor</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted p-1">
            <TabsTrigger value="personal" className="text-xs">Personal Info</TabsTrigger>
            <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4 space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="r-name">Full Name</Label>
                <Input id="r-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="r-title">Job Title</Label>
                <Input id="r-title" placeholder="Senior Software Engineer" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-email">Email</Label>
                <Input id="r-email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-phone">Phone</Label>
                <Input id="r-phone" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-location">Location</Label>
                <Input id="r-location" placeholder="New York, NY" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="r-linkedin">LinkedIn URL</Label>
                <Input id="r-linkedin" placeholder="linkedin.com/in/johndoe" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className={inputClass} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="r-summary">Professional Summary</Label>
              <Textarea
                id="r-summary"
                placeholder="Results-driven software engineer with 8+ years of experience building scalable web applications..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={inputClass}
                rows={6}
              />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-4 space-y-4">
            {experience.map((exp) => (
              <Card key={exp.id} className="relative">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Experience Entry</span>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => removeExperience(exp.id)}>
                      <X className="size-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Company</Label>
                      <Input placeholder="Google" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Position</Label>
                      <Input placeholder="Senior Engineer" value={exp.position} onChange={(e) => updateExperience(exp.id, "position", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Start Date</Label>
                      <Input placeholder="Jan 2020" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>End Date</Label>
                      <Input
                        placeholder="Mar 2023"
                        value={exp.isPresent ? "" : exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                        disabled={exp.isPresent}
                      />
                      <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={exp.isPresent}
                          onChange={(e) => updateExperience(exp.id, "isPresent", e.target.checked)}
                        />
                        Present
                      </label>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Description</Label>
                    <Textarea placeholder="Led a team of 5 engineers to deliver a new microservices architecture..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={3} />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={addExperience} className="w-full">
              <Plus className="size-4 mr-1" /> Add Experience
            </Button>
          </TabsContent>

          <TabsContent value="education" className="mt-4 space-y-4">
            {education.map((edu) => (
              <Card key={edu.id} className="relative">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Education Entry</span>
                    <Button variant="ghost" size="icon" className="size-7" onClick={() => removeEducation(edu.id)}>
                      <X className="size-4" />
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label>Institution</Label>
                      <Input placeholder="MIT" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Degree</Label>
                      <Input placeholder="Bachelor of Science" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Field of Study</Label>
                      <Input placeholder="Computer Science" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Start Year</Label>
                      <Input placeholder="2016" value={edu.startYear} onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>End Year</Label>
                      <Input placeholder="2020" value={edu.endYear} onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" size="sm" onClick={addEducation} className="w-full">
              <Plus className="size-4 mr-1" /> Add Education
            </Button>
          </TabsContent>

          <TabsContent value="skills" className="mt-4 space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Type a skill and press Add"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addSkill()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={addSkill} variant="outline">
                <Plus className="size-4 mr-1" /> Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1 text-sm">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive" aria-label={`Remove ${skill}`}>
                      <X className="size-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {skills.length === 0 && (
              <p className="text-sm text-muted-foreground">No skills added yet. Type a skill above and click Add.</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-2">
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="size-4 mr-2" /> Print Resume
          </Button>
          <Button variant="outline" onClick={handleDownloadText}>
            <Download className="size-4 mr-2" /> Download .txt
          </Button>
        </div>
      </div>

      {/* Right — Live Preview */}
      <div className="print:m-0 print:p-0 print:max-w-none">
        <div className="flex items-center gap-2 mb-4 print:hidden">
          <FileUser className="size-5 text-primary" />
          <h2 className="text-lg font-semibold">Live Preview</h2>
        </div>
        <div className="bg-white text-gray-900 rounded-lg border shadow-sm p-6 sm:p-8 min-h-[600px] print:shadow-none print:border-none print:rounded-none">
          {!hasAnyData ? (
            <div className="flex items-center justify-center h-96 text-gray-400 text-sm">
              Start filling in your details to see a live preview of your resume.
            </div>
          ) : (
            <div className="space-y-5">
              {/* Header */}
              <div className="text-center border-b border-gray-200 pb-4">
                {(name || "") && <h1 className="text-2xl font-bold tracking-tight text-gray-900">{(name || "").toUpperCase()}</h1>}
                {(jobTitle || "") && <p className="text-base text-gray-600 mt-1">{jobTitle || ""}</p>}
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                  {(email || "") && <span>{email || ""}</span>}
                  {(phone || "") && <span>{phone || ""}</span>}
                  {(location || "") && <span>{location || ""}</span>}
                  {(linkedin || "") && <span>{linkedin || ""}</span>}
                </div>
              </div>

              {/* Summary */}
              {(summary || "") && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">Professional Summary</h2>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed whitespace-pre-line">{summary || ""}</p>
                </div>
              )}

              {/* Experience */}
              {experience.filter((e) => (e.company || "") || (e.position || "")).length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">Work Experience</h2>
                  <div className="mt-3 space-y-4">
                    {experience
                      .filter((e) => (e.company || "") || (e.position || ""))
                      .map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start flex-wrap gap-1">
                            <div>
                              <span className="font-semibold text-gray-900">{exp.position || ""}</span>
                              {(exp.position || "") && (exp.company || "") && <span className="text-gray-500"> at </span>}
                              <span className="text-gray-700 font-medium">{exp.company || ""}</span>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {(exp.startDate || "")}{(exp.startDate || "") && " – "}{exp.isPresent ? "Present" : (exp.endDate || "")}
                            </span>
                          </div>
                          {(exp.description || "") && (
                            <p className="mt-1 text-sm text-gray-600 leading-relaxed whitespace-pre-line">{exp.description || ""}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {education.filter((e) => (e.institution || "")).length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">Education</h2>
                  <div className="mt-3 space-y-3">
                    {education
                      .filter((e) => (e.institution || ""))
                      .map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start flex-wrap gap-1">
                            <div>
                              <span className="font-semibold text-gray-900">
                                {edu.degree || ""}{(edu.degree || "") && (edu.field || "") ? " in " : ""}{edu.field || ""}
                              </span>
                              <p className="text-sm text-gray-700">{edu.institution || ""}</p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {(edu.startYear || "")}{(edu.startYear || "") && " – "}{edu.endYear || ""}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-gray-800 border-b border-gray-200 pb-1">Skills</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
