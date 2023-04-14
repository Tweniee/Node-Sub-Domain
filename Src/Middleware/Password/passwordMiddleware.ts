import argon2 from "argon2";

//* Hashes a plaintext password and returns the resulting hash
export async function hashPassword(plaintext: string): Promise<string> {
  const hash = await argon2.hash(plaintext);
  return hash;
}

//* Compares a plaintext password to a hash and returns true if they match
export async function comparePassword(
  plaintext: string,
  hash: string
): Promise<boolean> {
  const match = await argon2.verify(hash, plaintext);
  return match;
}
