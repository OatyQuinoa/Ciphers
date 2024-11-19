
/*
There are numerous issues with the current versions of my transposition-subsititution hybrid cipher.
1. Inefficient handling of whitespace and unsupported characters (validCharArray only contains 62 characters) may lead to function failing to encrypt/decrypt
2. The use of a question mark to substituted whitespaces and unsupported characters is a clear weakness
*/