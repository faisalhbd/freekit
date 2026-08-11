import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert YAML to JSON?",
    answer: "Paste your YAML content into the input textarea and the JSON output is generated instantly. The converter uses a custom-built recursive parser that runs in your browser. Copy the result or use it directly — no server upload required."
  },
  {
    question: "What YAML features does the parser support?",
    answer: "The parser handles key-value pairs (key: value), nested objects using indentation, lists with the - prefix, and basic types including strings, numbers (integers and floats), booleans (true/false/yes/no), and null values. It uses 2-space indentation to determine nesting levels."
  },
  {
    question: "Does this tool use an external YAML library?",
    answer: "No, the converter includes a built-in YAML parser written from scratch. There are no external dependencies like js-yaml or yaml.js. This keeps the tool lightweight and fast. The parser handles the most common YAML patterns used in configuration files, Kubernetes manifests, and application settings."
  },
  {
    question: "Can it handle YAML anchors and aliases?",
    answer: "The built-in parser focuses on the most commonly used YAML features. Advanced features like anchors (&), aliases (*), and merge keys (<<) are not supported. For documents using these features, consider using a dedicated YAML library in your code. The parser handles the vast majority of real-world configuration files."
  },
  {
    question: "What is the difference between YAML and JSON?",
    answer: "YAML (YAML Ain't Markup Language) is a human-friendly data serialization format that uses indentation for nesting and supports comments. JSON is more strict with its syntax (double quotes required, no comments, no trailing commas) but is the standard for web APIs. YAML is often preferred for configuration files due to its readability, while JSON is preferred for data interchange."
  },
  {
    question: "Is my YAML data safe when using this converter?",
    answer: "Yes, all parsing and conversion happens entirely in your browser. Your YAML data is never sent to any server, stored, or tracked. You can safely convert sensitive configuration files, API keys, or any other confidential YAML data."
  },
  {
    question: "Can I convert Kubernetes or Docker Compose YAML to JSON?",
    answer: "Yes, as long as the YAML uses standard features supported by our parser. Most Kubernetes manifests and Docker Compose files use basic key-value pairs, nested objects, and lists — all of which are fully supported. For files using advanced YAML features like anchors, consider pre-processing the YAML first."
  },
  {
    question: "Does the parser handle multi-line strings?",
    answer: "The parser handles simple multi-line strings defined with the > (folded) and | (literal) block scalar indicators. Folded scalars join lines with spaces, while literal scalars preserve newlines. Quoted strings with multiple lines are also handled correctly."
  },
  {
    question: "How are YAML types mapped to JSON types?",
    answer: "The parser automatically detects types: YAML true/false/yes/no become JSON booleans, numbers (integers and floats) become JSON numbers, null/~ become JSON null, and everything else becomes JSON strings. Lists become JSON arrays and mappings become JSON objects."
  },
  {
    question: "Can I convert the JSON back to YAML?",
    answer: "Yes, use our JSON to YAML Converter to reverse the process. The Swap button in both tools lets you quickly pipe output from one converter into the input of the other for format chaining."
  },
]
