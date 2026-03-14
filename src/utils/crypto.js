// Generate a key from a password
export async function getKey(password) {
  const enc = new TextEncoder()

  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  )

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("password-manager-salt"),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  )
}

export async function encrypt(text, password) {
  const key = await getKey(password)

  const iv = window.crypto.getRandomValues(new Uint8Array(12))

  const encoded = new TextEncoder().encode(text)

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  )

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted))
  }
}

export async function decrypt(encryptedData, iv, password) {
  const key = await getKey(password)

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(iv) },
    key,
    new Uint8Array(encryptedData)
  )

  return new TextDecoder().decode(decrypted)
}