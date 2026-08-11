import type { FAQItem } from "@/types"

export const faqs: FAQItem[] = [
  {
    question: "What is the structure of a JWT token?",
    answer: "A JSON Web Token consists of three parts separated by dots: Header, Payload, and Signature. The format is header.payload.signature. The header and payload are Base64URL-encoded JSON objects, while the signature is a cryptographic hash that ensures the token has not been tampered with. For example: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c — the first part is the header, the second is the payload, and the third is the signature."
  },
  {
    question: "What encoding does JWT use and how is it different from standard Base64?",
    answer: "JWT uses Base64URL encoding, which is a variant of standard Base64. It replaces the + character with -, and / with _, and omits the = padding characters. This makes the token safe to use in URLs and HTTP headers without additional escaping. Our decoder handles this conversion automatically — it adds back the padding if needed and maps the URL-safe characters back to standard Base64 before decoding."
  },
  {
    question: "What is the exp claim and how does JWT expiration work?",
    answer: "The exp (expiration time) claim is a reserved JWT claim that specifies the time after which the token should no longer be accepted. Its value is a numeric Unix timestamp (seconds since January 1, 1970, UTC). Our decoder checks this claim and displays whether the token is expired or still valid, along with the exact expiration date and time. If the current time is past the exp value, the token is considered expired. The iat (issued at) claim records when the token was created, and nbf (not before) specifies when the token starts being valid."
  },
  {
    question: "Can this tool verify JWT signatures?",
    answer: "No — this tool decodes and displays the header, payload, and signature of a JWT, but it does not verify the cryptographic signature. Signature verification requires the secret key (for HMAC algorithms) or the public key (for RSA/ECDSA algorithms) that was used to sign the token. Our tool shows you the signature and the algorithm used, so you know what type of key you would need. For actual signature verification, you would need to use a library like jsonwebtoken in Node.js or a similar tool that has access to your signing keys."
  },
  {
    question: "Is it safe to paste JWT tokens into this tool?",
    answer: "Yes. All decoding happens entirely in your browser using client-side JavaScript. No data is sent to any server. The token never leaves your device. This is one of the key advantages of our tool — you can safely inspect tokens containing sensitive claims without worrying about data leakage. However, be aware that anyone who intercepts a JWT can also decode its header and payload (since they are just Base64URL-encoded), which is why you should never store sensitive user data in JWT payloads."
  },
  {
    question: "What are the standard reserved JWT claims?",
    answer: "The JWT specification (RFC 7519) defines several reserved claims: iss (issuer) identifies the principal that issued the token, sub (subject) identifies the subject of the token (usually the user ID), aud (audience) identifies the recipients, exp (expiration time) is the Unix timestamp after which the token is no longer valid, nbf (not before) is the earliest time the token can be accepted, iat (issued at) is the time the token was created, and jti (JWT ID) is a unique identifier for the token. Our decoder highlights all of these claims with badges."
  },
  {
    question: "What does the alg field in the JWT header mean?",
    answer: "The alg (algorithm) field in the JWT header specifies the cryptographic algorithm used to sign the token. Common values include HS256 (HMAC using SHA-256), HS384 (HMAC using SHA-384), HS512 (HMAC using SHA-512), RS256 (RSA SSA PKCS1 v1.5 using SHA-256), RS512 (RSA using SHA-512), ES256 (ECDSA using P-256 curve and SHA-256), and none (no signature — insecure and should never be used in production). Our decoder displays the algorithm prominently in the header card so you can immediately see what signing method was used."
  },
  {
    question: "Why can I read JWT payload data without a secret key?",
    answer: "This is by design. JWT payloads are encoded with Base64URL, which is an encoding scheme (not encryption). Anyone who possesses the token can decode and read its contents. The security of JWT comes from the signature, not from hiding the payload. The signature ensures that the payload has not been modified after it was signed by the server. If an attacker changes even one character in the payload, the signature verification will fail. This is why you should never store passwords, credit card numbers, or other truly sensitive data in a JWT payload."
  },
  {
    question: "What is the difference between opaque tokens and JWTs?",
    answer: "An opaque token is a random string with no inherent meaning — the server must look it up in a database or session store to determine what it represents. A JWT, on the other hand, is self-contained: all the claims and metadata are encoded directly in the token. JWTs are stateless (the server does not need to store session data), while opaque tokens require server-side storage. Opaque tokens can be easily revoked by deleting the stored session, but JWTs are harder to revoke since they carry their own data. Many systems use a hybrid approach: JWTs for access tokens (short-lived) and opaque tokens for refresh tokens (revocable)."
  },
  {
    question: "How do I know if my JWT is being used correctly in my application?",
    answer: "When inspecting your JWT, check these common issues: (1) The alg should be a strong algorithm — 'none' means no signature at all, which is insecure. (2) The exp claim should be set and reasonably short (typically 15 minutes to 1 hour for access tokens). (3) The iss and aud claims should match your application's expected values. (4) The payload should not contain sensitive data like passwords or Social Security numbers. (5) If using RS256 or other asymmetric algorithms, ensure the public key is properly configured on the verifying server. Our decoder helps with all of these checks by clearly displaying every claim and flagging special ones."
  },
]
