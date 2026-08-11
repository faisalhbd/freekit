import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a ZIP file?",
    answer:
      "A ZIP file is a compressed archive format that bundles multiple files and folders into a single file. ZIP files use lossless compression to reduce file sizes, making them easier to store and share. Common software, firmware updates, source code packages, and document bundles are often distributed as ZIP archives.",
  },
  {
    question: "How does this ZIP extractor work?",
    answer:
      "Our tool uses the JSZip library to parse ZIP files entirely in your browser. When you upload a ZIP file, JSZip reads the compressed data and decompresses each entry. The tool then builds an interactive file tree from the archive's internal directory structure, calculates file sizes, detects file types, and enables you to preview text files and images without extracting to disk.",
  },
  {
    question: "Is my ZIP data kept private?",
    answer:
      "Yes, completely. Your ZIP file is processed entirely in your browser using JavaScript. The file is never uploaded to any server. All decompression, file tree building, and previews happen on your device. When you close the browser tab, all extracted data is cleared from memory. This makes the tool safe for password-protected internal documents, proprietary source code, and sensitive archives.",
  },
  {
    question: "Can I extract password-protected ZIP files?",
    answer:
      "This tool currently supports standard, non-encrypted ZIP archives. Password-protected or AES-encrypted ZIP files cannot be processed because browser-based decryption of these formats is not reliably supported. If you have a password-protected ZIP, you will need to use a desktop application like 7-Zip, WinZip, or the macOS Archive Utility to extract it first.",
  },
  {
    question: "What file types can I preview?",
    answer:
      "The tool provides inline preview for text-based files (including .txt, .csv, .json, .xml, .html, .css, .js, .ts, .md, .py, .java, .c, .cpp, .yml, .yaml, .toml, .ini, .cfg, .log, .sh, .bat, .env, .gitignore, and other text files) and common image formats (.png, .jpg, .jpeg, .gif, .bmp, .webp, .svg). For other file types like .pdf, .docx, or .xlsx, you can download the individual file and open it with the appropriate application.",
  },
  {
    question: "Can I download individual files from the ZIP?",
    answer:
      "Yes. Each file in the archive has a download button. Click it to download that specific file without extracting the entire archive. This is useful when you only need one or two files from a large ZIP. You can also click 'Download All' to save every file, though this downloads them individually rather than as a re-compressed archive.",
  },
  {
    question: "Is there a file size limit for ZIP files?",
    answer:
      "There are no artificial limits. Since processing happens in your browser, the practical limit depends on your device's available memory. Most modern devices can handle ZIP files up to several hundred megabytes. Very large archives (multiple gigabytes) may cause the browser to run out of memory. For those, a desktop extraction tool is recommended.",
  },
  {
    question: "How are folder structures displayed?",
    answer:
      "The tool automatically builds a hierarchical file tree from the ZIP archive's internal paths. Folders are displayed with a folder icon and can be expanded or collapsed. Files are shown with type-specific icons (text, image, code, etc.) and their compressed and uncompressed sizes. Clicking on a file shows its preview in a side panel.",
  },
  {
    question: "Can I search within the extracted files?",
    answer:
      "The tool displays all files in a scrollable file tree. While there is no built-in search function, the file tree is organized by folder structure making it easy to navigate. For text files, you can use your browser's built-in find function (Ctrl+F or Cmd+F) when viewing a file preview to search within its content.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Yes, the ZIP Extractor is completely free with no limitations. There are no file size caps, no number of extractions limit, no sign-up requirements, and no watermarks. Use it as often as you need for personal or professional purposes.",
  },
]
