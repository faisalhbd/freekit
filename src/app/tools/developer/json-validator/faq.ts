import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What does a JSON validator do?",
    answer:
      "A JSON validator checks whether your JSON data follows the correct syntax defined by the JSON standard (RFC 8259). It parses your input and reports any syntax errors with precise locations, including line and column numbers. Unlike a simple syntax check, our validator also analyzes the structure and provides useful statistics like key count, nesting depth, array count, object count, and byte size.",
  },
  {
    question: "How do I fix the 'Unexpected token' error in JSON?",
    answer:
      "'Unexpected token' is the most common JSON error. It usually means there is a character where the parser expected something else. Typical causes include trailing commas (e.g., `{\"a\": 1,}`), single quotes instead of double quotes, unquoted property keys, comments in JSON (which are not allowed in standard JSON), or missing commas between items. Our validator shows the exact line and column so you can locate and fix the issue quickly.",
  },
  {
    question: "What is the difference between JSON validation and JSON linting?",
    answer:
      "JSON validation checks whether your data conforms to the JSON syntax specification — it ensures the data can be parsed correctly. JSON linting goes a step further by also checking for style issues and common mistakes like trailing commas, inconsistent quoting, or potential structural problems. Our validator performs both: it validates syntax and highlights the exact location of errors, making it function as both a validator and a linter.",
  },
  {
    question: "Why does my valid JavaScript object fail JSON validation?",
    answer:
      "JavaScript objects and JSON are not the same format. JSON requires all property keys to be double-quoted, only supports double quotes for strings (not single quotes), does not allow trailing commas, does not support comments, and cannot contain values like undefined, functions, Date objects, or regex literals. If you paste a JavaScript object literal into the validator, it will fail unless you convert it to proper JSON format first.",
  },
  {
    question: "Can I validate large JSON files with this tool?",
    answer:
      "Yes, our JSON validator runs entirely in your browser and can handle large JSON structures. Performance depends on your device's memory and processing power, but it comfortably processes JSON with hundreds of keys and deeply nested objects. Since all processing is client-side, your data never leaves your browser, making it safe to validate even sensitive JSON data like API responses or configuration files.",
  },
  {
    question: "What are the most common JSON syntax errors?",
    answer:
      "The most frequent JSON errors include: (1) Trailing commas after the last element in objects or arrays, (2) Single quotes instead of double quotes around strings and keys, (3) Unquoted property keys, (4) Missing closing braces `}` or brackets `]`, (5) Using `undefined` or `NaN` as values (not valid in JSON), (6) Comments inside JSON (not supported in standard JSON), and (7) Unescaped control characters or newlines inside strings.",
  },
  {
    question: "How does the auto-validate feature work?",
    answer:
      "When you enable the auto-validate toggle, the tool automatically validates your JSON every time you type or paste content into the textarea. You don't need to click the Validate button — results update in real time as you edit. This is useful when you are actively fixing errors and want immediate feedback. If you prefer to validate manually, simply turn off the auto-validate toggle.",
  },
  {
    question: "Is my JSON data secure when using this tool?",
    answer:
      "Absolutely. All validation and analysis happen entirely within your browser using client-side JavaScript. Your data is never sent to any server, stored in a database, or transmitted over the network. You can safely validate sensitive JSON containing API keys, authentication tokens, configuration secrets, personal data, or any other confidential information without any privacy concerns.",
  },
  {
    question: "What do the validation stats (keys, depth, arrays, objects) tell me?",
    answer:
      "The stats provide a quick structural overview of your JSON. 'Keys' shows the total number of key-value pairs across all nesting levels. 'Depth' indicates how deeply nested your JSON is (useful for detecting overly complex structures). 'Arrays' and 'Objects' count the total number of each type. 'Size' shows the byte length of your JSON string. These stats help you verify that your data has the expected structure before sending it to an API.",
  },
  {
    question: "Can I copy the formatted version after validation?",
    answer:
      "Yes. When your JSON is valid, the Copy Formatted JSON button automatically formats your JSON with 2-space indentation before copying it to your clipboard. This means even if you pasted minified JSON, the copied version will be properly indented and ready to use in your code, configuration files, or documentation. You get both validation and formatting in one step.",
  },
]
