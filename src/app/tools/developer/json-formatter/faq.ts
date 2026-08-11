import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is JSON formatting and why do I need it?",
    answer: "JSON formatting (also called JSON beautification or pretty-printing) takes minified or compact JSON and adds proper indentation and line breaks to make it human-readable. You need it when working with API responses, configuration files, or data dumps that are stored in a single compressed line. Formatted JSON is far easier to read, debug, and share with your team."
  },
  {
    question: "How do I fix 'Unexpected token' errors in my JSON?",
    answer: "'Unexpected token' errors typically mean your JSON has invalid syntax. Common causes include trailing commas after the last item in an object or array, unquoted property keys, single quotes instead of double quotes, or comments inside the JSON (which are not allowed in standard JSON). Paste your JSON into this formatter and click the Validate button \u2014 it will pinpoint the exact error location and message so you can fix it quickly."
  },
  {
    question: "What is the difference between JSON minification and formatting?",
    answer: "JSON minification removes all unnecessary whitespace (spaces, newlines, tabs) from your JSON to produce the smallest possible file size. This is ideal for production APIs and storage where bandwidth matters. JSON formatting (beautification) does the opposite \u2014 it adds indentation and line breaks to make the JSON readable. You can switch between both modes instantly with our Format and Minify buttons."
  },
  {
    question: "Can this tool validate large JSON files?",
    answer: "Yes, our JSON formatter runs entirely in your browser and can handle large JSON structures. The validation performance depends on your device's memory and processing power, but it comfortably processes JSON files with hundreds of keys and deeply nested objects. Since processing is client-side, your data never leaves your browser, making it safe to validate even sensitive JSON data."
  },
  {
    question: "What are the most common JSON syntax errors?",
    answer: "The most common JSON syntax errors include: trailing commas after the last item in an object or array, single quotes around strings or keys (JSON requires double quotes), unquoted property keys, missing closing braces or brackets, using undefined or functions as values (not valid in JSON), and having comments in the JSON (standard JSON does not support comments). Our validator detects all of these and shows you exactly where the error is."
  },
  {
    question: "Is JSON better than XML?",
    answer: "JSON and XML serve similar purposes but have different strengths. JSON is more compact, easier to read, natively supported by JavaScript, and is the standard for web APIs. XML supports attributes, namespaces, schemas (XSD), and is better suited for document markup. For most modern web development and API design, JSON is preferred due to its lighter weight and simpler syntax. You can convert between formats using our related conversion tools."
  },
  {
    question: "What indentation options are available?",
    answer: "Our JSON formatter offers three indentation options: 2 spaces (the default in many style guides and popular with projects like Prettier), 4 spaces (the default in Python and many legacy codebases), and tabs (preferred by some developers and configurable in most editors). You can switch between these options instantly and the formatted output updates in real time."
  },
  {
    question: "Does the formatter preserve the order of JSON keys?",
    answer: "Yes, our formatter preserves the exact order of keys as they appear in your input JSON. Modern JavaScript engines maintain insertion order for object properties, and our tool respects this behavior. This is important because some APIs and systems rely on specific key ordering. Note that the JSON specification itself does not require any particular key ordering, but preserving it makes diffs and version control much cleaner."
  },
  {
    question: "Is my JSON data secure when using this tool?",
    answer: "Absolutely. All JSON formatting, validation, and minification happen entirely within your browser using client-side JavaScript. Your data is never sent to any server, stored in a database, or transmitted over the network. You can safely format sensitive JSON containing API keys, configuration secrets, personal data, or any other confidential information without any privacy concerns."
  },
  {
    question: "Can I use the formatted JSON output directly in my code?",
    answer: "Yes, the formatted JSON output is valid, standards-compliant JSON that you can copy and use directly in your code, configuration files, or API requests. The output uses proper double quotes, correct escaping, and valid syntax. Simply click the Copy Output button to copy the formatted JSON to your clipboard, then paste it wherever you need it \u2014 in a source file, a .json config file, a database seed script, or an API testing tool."
  },
]