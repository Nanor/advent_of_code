import { asInput } from "./input";

export {};

declare global {
  type Input = ReturnType<typeof asInput>;

  type Vec2 = {
    x: number;
    y: number;
  };

  type Vec3 = {
    x: number;
    y: number;
    z: number;
  };
}
