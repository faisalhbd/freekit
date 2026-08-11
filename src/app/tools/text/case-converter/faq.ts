import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the difference between camelCase and PascalCase?",
    answer: "In camelCase, the first word starts with a lowercase letter and each subsequent word starts with an uppercase letter with no spaces (e.g., myVariableName). PascalCase (also called UpperCamelCase) capitalizes the first letter of every word (e.g., MyVariableName). PascalCase is used for class names in many languages, while camelCase is used for variable and function names."
  },
  {
    question: "When should I use snake_case vs kebab-case?",
    answer: "snake_case uses underscores between words (e.g., my_variable_name) and is the standard convention in Python, Ruby, and database column naming. kebab-case uses hyphens between words (e.g., my-variable-name) and is the standard for URLs, CSS class names, HTML IDs, and file names in web development. Use snake_case for backend code and kebab-case for frontend and web URLs."
  },
  {
    question: "What are the rules for Title Case?",
    answer: "Title Case capitalizes the first letter of every major word while keeping minor words (articles, conjunctions, and short prepositions) in lowercase. Minor words like a, an, the, in, on, at, to, for, of, and, or, but, is, are, was, and were stay lowercase unless they are the first or last word of the title. This is the standard format for book titles, headings, and headlines."
  },
  {
    question: "How does Sentence case differ from Title Case?",
    answer: "Sentence case only capitalizes the first letter of the first word in each sentence and keeps everything else lowercase (unless it is a proper noun). Title Case capitalizes the first letter of every major word. Sentence case is commonly used in regular prose, email subject lines, and some style guides for academic writing, while Title Case is used for headings and titles."
  },
  {
    question: "What is CONSTANT_CASE and when is it used?",
    answer: "CONSTANT_CASE (also called SCREAMING_SNAKE_CASE or UPPER_SNAKE_CASE) writes all letters in uppercase with words separated by underscores (e.g., MAX_FILE_SIZE). It is the standard naming convention for constants and environment variables in languages like JavaScript, Python, Java, and C++. It makes constants visually distinct from regular variables in your code."
  },
  {
    question: "What is dot.case and where is it used?",
    answer: "dot.case writes all words in lowercase separated by dots (e.g., config.database.host). It is commonly used in configuration files, package naming in some ecosystems, and hierarchical data keys. You will also see dot notation in LDAP distinguished names and some logging formats. It provides a clear visual hierarchy for nested or grouped identifiers."
  },
  {
    question: "Does the Case Converter handle text with existing special characters?",
    answer: "Yes, the converter handles text with numbers, punctuation, and special characters. For programmer-oriented formats like camelCase, PascalCase, snake_case, and kebab-case, non-alphanumeric characters are removed or replaced with the appropriate delimiter. For text-oriented formats like UPPERCASE, lowercase, Title Case, and Sentence case, all characters are preserved with only the case of letters being changed."
  },
  {
    question: "Is my text sent to a server when using this tool?",
    answer: "No, all case conversions happen entirely in your browser using client-side JavaScript. Your text is never sent to any server, stored in a database, or shared with third parties. This makes it safe to convert sensitive text like API keys, configuration values, and private content without any privacy concerns."
  },
  {
    question: "Can I convert multi-line text at once?",
    answer: "Yes, the Case Converter handles multi-line text seamlessly. Each line is processed independently, so you can convert entire paragraphs, lists, or code blocks in a single operation. Line breaks are preserved in the output for text-based conversions. Programmer formats like camelCase and snake_case work on a per-line basis, converting each line separately."
  },
  {
    question: "What is Alternating Case and Inverse Case?",
    answer: "Alternating Case (also called SpongeBob case or Mock case) alternates between uppercase and lowercase letters character by character (e.g., hElLo WoRlD). Inverse Case simply flips the case of every letter — uppercase becomes lowercase and vice versa (e.g., HELLO world becomes hello WORLD). Both are mainly used for fun, memes, or testing how case-sensitive systems handle different letter cases."
  },
]
