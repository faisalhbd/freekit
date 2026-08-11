import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How do I convert JSON to YAML?",
    answer: "Paste your JSON data into the input textarea and the YAML output is generated instantly. The converter uses a custom-built recursive serializer with no external dependencies. Copy the result with one click — no server upload required."
  },
  {
    question: "What JSON types are supported?",
    answer: "The converter handles all standard JSON types: objects (converted to YAML mappings), arrays (converted to YAML lists with - prefix), strings (with automatic quoting when needed), numbers (integers and floats), booleans (true/false), and null values. Nested structures at any depth are fully supported."
  },
  {
    question: "Does this tool use an external YAML library?",
    answer: "No, the converter includes a built-in JSON to YAML serializer written from scratch. There are no external dependencies like js-yaml or yaml.js. This keeps the tool lightweight and self-contained while correctly handling the most common data structures."
  },
  {
    question: "How are strings quoted in the YAML output?",
    answer: "The converter automatically adds quotes around strings that contain special characters like colons, hashes, brackets, or newlines. Simple strings without special characters are left unquoted for maximum readability. This follows YAML best practices for clean, human-readable output."
  },
  {
    question: "What is the indentation used in the output?",
    answer: "The YAML output uses 2-space indentation, which is the most common convention for YAML files (used by Kubernetes, GitHub Actions, Docker Compose, and most other tools). This is not configurable in the current version to keep the output consistent with ecosystem standards."
  },
  {
    question: "Is my JSON data safe when using this converter?",
    answer: "Yes, all conversion happens entirely in your browser. Your JSON data is never sent to any server, stored, or tracked. You can safely convert sensitive data including API responses, configuration secrets, or any other confidential JSON content."
  },
  {
    question: "Can I convert the YAML back to JSON?",
    answer: "Yes, use our YAML to JSON Converter to reverse the process. The Swap button in both tools lets you quickly pipe output from one converter into the input of the other for round-trip testing and verification."
  },
  {
    question: "How are arrays handled in the conversion?",
    answer: "JSON arrays are converted to YAML lists using the - prefix notation. Each array element is placed on its own line with proper indentation. Nested arrays within objects are also handled correctly with appropriate nesting levels."
  },
  {
    question: "What is the difference between YAML and JSON?",
    answer: "YAML is a superset of JSON with a more human-friendly syntax. It uses indentation instead of braces and brackets, supports comments, and is more forgiving about quoting. YAML is ideal for configuration files that humans read and edit, while JSON is the standard for machine-to-machine data interchange like web APIs."
  },
  {
    question: "Can I use this for Kubernetes or Docker Compose configuration?",
    answer: "Yes, converting JSON to YAML is commonly used when creating or modifying Kubernetes manifests, Docker Compose files, or CI/CD pipeline configurations. The 2-space indentation matches the standard used by these tools, so the output is ready to use directly."
  },
]
