export const sum = (a: number, b: number): number => a + b;
export const product = (a: number, b: number): number => a * b;

export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
