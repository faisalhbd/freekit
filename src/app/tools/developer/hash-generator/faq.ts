import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is a cryptographic hash and how does it work?",
    answer: "A cryptographic hash is a fixed-length string produced by a one-way mathematical function that takes input of any size and maps it to a deterministic output. The same input always produces the same hash, but even a tiny change (like adding a single character) produces a completely different hash. This property, called the avalanche effect, makes hashes ideal for verifying data integrity. Popular algorithms include MD5 (128-bit), SHA-1 (160-bit), SHA-256 (256-bit), and SHA-512 (512-bit), with longer bit lengths providing stronger collision resistance."
  },
  {
    question: "What is the difference between MD5, SHA-1, SHA-256, and SHA-512?",
    answer: "These algorithms differ in output length and security strength. MD5 produces a 32-character hex string (128 bits) and is considered cryptographically broken — collisions can be intentionally created. SHA-1 produces a 40-character hex string (160 bits) and is also considered insecure since 2017 when practical collision attacks were demonstrated. SHA-256 produces a 64-character hex string (256 bits) and is currently the industry standard, widely used in TLS certificates, blockchain, and digital signatures. SHA-512 produces a 128-character hex string (512 bits) and offers even stronger security, preferred for high-security applications. For most modern use cases, SHA-256 is the recommended default."
  },
  {
    question: "Can a hash be reversed to recover the original text?",
    answer: "No, cryptographic hash functions are designed to be one-way operations. It is computationally infeasible to derive the original input from its hash value. However, attackers can use techniques like rainbow tables (precomputed lookup tables of common passwords and their hashes) or brute-force attacks to find inputs that produce a given hash. This is why password hashing should use specialized algorithms like bcrypt, scrypt, or Argon2 that include a salt and a work factor to slow down guessing attacks. Our tool computes raw hashes which are useful for checksums and integrity verification, not for secure password storage."
  },
  {
    question: "What is a hash collision and should I be concerned?",
    answer: "A hash collision occurs when two different inputs produce the same hash output. All hash algorithms have collisions in theory due to the pigeonhole principle (infinite possible inputs mapped to a finite number of outputs), but the question is how practical they are to find. MD5 collisions can be created in seconds on a regular computer, making it unsuitable for security purposes. SHA-1 collisions were demonstrated in 2017 by Google and CWI Amsterdam (the SHAttered attack), taking roughly 9,000 CPU-years. SHA-256 and SHA-512 have no known practical collision attacks and are considered secure for all current applications."
  },
  {
    question: "What is salting and why is it important for password hashing?",
    answer: "A salt is a random string added to the input before hashing, making each hash unique even for identical passwords. Without salting, two users with the same password would have identical hashes, and attackers could use precomputed rainbow tables to crack them instantly. Salting defeats rainbow tables because the attacker would need a separate table for every possible salt. For proper password security, use a dedicated password hashing function like bcrypt, scrypt, or Argon2 that automatically handles salting and applies key stretching (repeated hashing) to slow down brute-force attacks. Raw hashing algorithms like SHA-256 are too fast for password security."
  },
  {
    question: "When should I use SHA-256 versus SHA-512?",
    answer: "SHA-256 is the default choice for most applications: TLS/SSL certificates, digital signatures, blockchain (Bitcoin, Ethereum), code signing, and API authentication. SHA-512 is preferred when you need maximum security or are working on 64-bit systems where it can be faster. Use SHA-512 for high-security applications like government documents, long-term archival signatures, or systems with extended security requirements. Both are considered secure against all known practical attacks. The performance difference is usually negligible for typical text inputs, so the choice often comes down to convention and compatibility requirements of the systems you are integrating with."
  },
  {
    question: "Is it safe to use this tool for hashing sensitive data?",
    answer: "Yes — all hashing is performed entirely in your browser using the Web Crypto API and a local MD5 implementation. No data is sent to any server, stored, or transmitted anywhere. Your text never leaves your device. The Web Crypto API is the same cryptographic library used by browsers for TLS connections and is built on well-audited native code. However, note that this tool computes raw hashes for verification and comparison purposes. For secure password storage in production systems, use server-side libraries that implement bcrypt, scrypt, or Argon2 with proper salting and work factors."
  },
  {
    question: "What are common use cases for hash generation?",
    answer: "Common use cases include: verifying file integrity by comparing a downloaded file's hash against a published checksum, creating digital signatures and certificates, generating unique identifiers from data, implementing content-addressable storage systems, checking for data corruption during transfers, computing API request signatures for authentication (like AWS HMAC), storing password verification hashes, deduplicating data blocks in backup systems, and creating blockchain transaction identifiers. Developers also use hashes for caching keys, version fingerprinting of assets, and ensuring build reproducibility."
  },
  {
    question: "Why does MD5 still exist if it is considered broken?",
    answer: "MD5 persists in non-security applications because it is fast, widely supported, and produces a compact 32-character output. It is still commonly used for: non-cryptographic checksums (like verifying a file downloaded without tampering), deduplication of files or data blocks, cache key generation, and ETag headers in HTTP. The key distinction is that MD5 is only broken for collision resistance — an attacker can create two files with the same MD5 hash. It is still preimage-resistant, meaning you cannot take an MD5 hash and easily find any input that produces it. However, for any security-critical application, always use SHA-256 or stronger."
  },
  {
    question: "What does uppercase versus lowercase hash output mean?",
    answer: "The mathematical hash value is a sequence of bytes, which is then represented as a hexadecimal string for human readability. The case of the hex letters (a-f vs A-F) does not change the underlying value — e0b6... and E0B6... represent the exact same hash. However, some systems expect a specific case. For example, Git uses lowercase SHA-1 hashes, while some API documentation shows uppercase. When comparing hashes, always normalize the case first. Our tool lets you toggle between uppercase and lowercase output to match your requirements. By default, most standards use lowercase, but uppercase is also widely seen in documentation and certain systems."
  },
]
