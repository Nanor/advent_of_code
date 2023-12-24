export type Coord = { x: number; y: number };
export type Coord3 = { x: number; y: number; z: number };
export type Dir = "L" | "R" | "U" | "D";

export const sum = (a: number, b: number): number => a + b;
export const product = (a: number, b: number): number => a * b;

export const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const isDefined = <T>(x: T | undefined): x is T => x !== undefined;
