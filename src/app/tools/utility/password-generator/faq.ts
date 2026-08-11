import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "Is this password generator safe to use?",
    answer:
      "Yes, absolutely. All password generation happens entirely in your browser using the Web Crypto API (crypto.getRandomValues), which provides cryptographically secure random numbers. Your generated passwords are never sent to any server, stored anywhere, or logged. Once you close the tab, all traces are gone from memory.",
  },
  {
    question: "How long should my password be?",
    answer:
      "For most accounts, a password of at least 12–16 characters is recommended. For high-security accounts like banking, email, and password managers, 20+ characters is ideal. The longer your password, the harder it is to crack — every additional character exponentially increases the number of possible combinations. Our tool defaults to 16 characters as a good balance of security and usability.",
  },
  {
    question: "What makes a password strong?",
    answer:
      "A strong password is long (16+ characters), uses a mix of character types (uppercase, lowercase, numbers, and symbols), avoids common words or patterns, and is unique for each account. The strongest passwords are completely random with no dictionary words, no sequential patterns (like 1234 or qwerty), and no personal information like names or birthdays.",
  },
  {
    question: "What are ambiguous characters?",
    answer:
      "Ambiguous characters are characters that look very similar and can be confused when reading or typing a password. These include: uppercase 'I' and lowercase 'l', uppercase 'O' and the number '0', the number '1' and lowercase 'l' and uppercase 'I'. Enabling the 'Exclude ambiguous characters' option removes these from the pool to make passwords easier to read and type accurately.",
  },
  {
    question: "How does the password strength meter work?",
    answer:
      "Our strength meter evaluates your password configuration based on the total number of possible character combinations (entropy). It considers the password length and which character types are enabled. Very Weak = low entropy (short with limited characters), Weak = moderate entropy, Fair = decent entropy, Strong = good entropy (12+ chars, mixed types), Very Strong = excellent entropy (20+ chars, all types). The meter updates in real-time as you adjust settings.",
  },
  {
    question: "Can I generate multiple passwords at once?",
    answer:
      "Yes! Use the 'Number of passwords' slider to generate up to 20 passwords at once. Each password is independently generated with the same settings. This is useful when you need passwords for multiple accounts or want to compare options before choosing one. You can copy individual passwords or copy all of them at once.",
  },
  {
    question: "Should I use special characters in my password?",
    answer:
      "Yes, including special characters (symbols) significantly increases password strength. When all four character types are enabled (uppercase, lowercase, numbers, and symbols), the character pool is much larger, making brute-force attacks exponentially harder. Special characters like !@#$%^&* add an important layer of complexity that most password cracking tools struggle with.",
  },
  {
    question: "What is character entropy and why does it matter?",
    answer:
      "Entropy measures the randomness and unpredictability of a password, typically expressed in bits. Higher entropy means a password is harder to crack. Entropy is calculated as: log2(pool_size ^ password_length). For example, a 16-character password using 95 possible characters has about 105 bits of entropy, which would take billions of years to crack with modern computing power. Our strength meter is based on this entropy calculation.",
  },
  {
    question: "How should I store my generated passwords?",
    answer:
      "Never store passwords in plain text files, notes apps, or browser autofill alone. Use a dedicated password manager like Bitwarden, 1Password, or KeePass — these encrypt your passwords with a master password. Write down your master password on paper and store it securely. For critical accounts, consider using a hardware security key for two-factor authentication in addition to a strong password.",
  },
  {
    question: "Is this password generator free to use?",
    answer:
      "Yes, this password generator is 100% free with no limits on usage, no subscriptions, no sign-up required, and no hidden fees. You can generate as many passwords as you need, as often as you want. There are no ads on the tool page and your data is never collected or tracked.",
  },
]
