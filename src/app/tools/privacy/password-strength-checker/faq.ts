import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "How does the password strength checker work?",
    answer:
      "The checker analyzes your password across six criteria: length, uppercase letters, lowercase letters, numbers, special characters, and absence of common patterns. Each criterion contributes up to a maximum number of points, for a total score of 0–100. The score maps to five strength levels: Very Weak (0–20), Weak (21–40), Fair (41–60), Strong (61–80), and Very Strong (81–100). All analysis happens in your browser — your password is never transmitted.",
  },
  {
    question: "Is my password sent to a server?",
    answer:
      "Absolutely not. The entire analysis runs in your browser using JavaScript. Your password never leaves your device, is never stored, and is never logged. This is the safest way to check password strength. We intentionally avoid any server-side processing to guarantee your privacy. Close the tab and your password is gone forever from memory.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "A strong password has: at least 12 characters (16+ is ideal), a mix of uppercase and lowercase letters, numbers, and special characters, no common words or patterns, no sequential characters (abc, 123), no repeated characters (aaa, 111), and is not found in common password lists. Length is the single most important factor — each additional character exponentially increases the number of possible combinations. For best results, use our <a href=\"/tools/utility/password-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Password Generator</a> to create a strong random password.",
  },
  {
    question: "How accurate is the crack time estimate?",
    answer:
      "The crack time is a simplified estimate based on the character set size and password length. It assumes an attacker making 10 billion guesses per second (a realistic rate for modern GPU-based attacks). Real-world crack times can vary based on the attacker's resources, hashing algorithm used by the service, and whether the password appears in dictionaries or leaked databases. The estimate is meant to give you a general sense of relative security, not an exact prediction.",
  },
  {
    question: "What are common password patterns to avoid?",
    answer:
      "Avoid these common weak patterns: sequential characters (abc, 123, qwerty), repeated characters (aaa, 111, !!!), common passwords (password, 123456, admin, letmein), personal information (birthdays, names, pet names), dictionary words without modification, and simple substitutions (p@ssw0rd). The checker detects these patterns and reduces your score accordingly. A truly strong password looks random and doesn't follow any predictable pattern.",
  },
  {
    question: "How long should my password be?",
    answer:
      "Minimum 12 characters, ideally 16 or more. A 12-character password with a mixed character set has about 5.4 × 10^23 possible combinations. Adding 4 more characters (16 total) increases this to about 3.4 × 10^30 — over 6 million times harder to crack. For critical accounts (banking, email), use 20+ characters. Passphrases (random words combined) are an excellent way to achieve long, memorable passwords.",
  },
  {
    question: "Should I use a password manager?",
    answer:
      "Yes. Password managers are the most practical way to use strong, unique passwords for every account. They generate random passwords, store them encrypted, and auto-fill login forms. You only need to remember one strong master password. Popular options include Bitwarden (free and open-source), 1Password, and KeePass (offline). The combination of a password manager and our <a href=\"/tools/utility/password-generator\" class=\"font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors\">Password Generator</a> gives you maximum security with minimal effort.",
  },
  {
    question: "What does the score breakdown mean?",
    answer:
      "The score breaks down into six components: Length (0–25 pts) rewards longer passwords, Uppercase (0–15 pts) checks for capital letters, Lowercase (0–15 pts) checks for lowercase letters, Numbers (0–15 pts) checks for digits, Special Characters (0–15 pts) checks for symbols like !@#$%, and No Common Patterns (0–15 pts) rewards passwords that avoid sequences, repeats, and common passwords. Each category's contribution is shown in the checklist so you can see exactly where to improve.",
  },
  {
    question: "Can this tool guarantee my password is safe?",
    answer:
      "No tool can guarantee absolute safety. This checker evaluates the mathematical strength of your password based on its composition. However, security also depends on factors outside the password itself: whether the service uses proper hashing (bcrypt, Argon2), whether you reuse passwords across sites, whether the service has experienced a data breach, and whether you use two-factor authentication. Use this checker as one part of your overall security strategy.",
  },
  {
    question: "How often should I change my passwords?",
    answer:
      "Modern security guidance has shifted away from mandatory periodic changes. Instead, change your password only when there's a reason: if a service is breached, if you suspect your password is compromised, or if you used the same password on a site that was hacked. Focus on using unique, strong passwords for each account rather than frequently changing the same weak password. Enable two-factor authentication wherever possible for an extra layer of protection beyond the password itself.",
  },
]
