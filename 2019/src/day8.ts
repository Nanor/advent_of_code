import { Input } from "./types";

export class Image {
  data: String;
  width: number;
  height: number;

  constructor(data: String, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }

  get depth() {
    return this.data.length / (this.width * this.height);
  }

  get(x: any, y: any, z: any) {
    return parseInt(
      this.data[x + y * this.width + z * this.width * this.height],
      10
    );
  }

  pixel(x: number, y: number) {
    for (let z = 0; z < this.depth; z++) {
      const val = this.get(x, y, z);
      if (val < 2) {
        return val;
      }
    }
  }

  get image() {
    let out = "";

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        out += this.pixel(x, y) ? "#" : " ";
      }
      out += "\n";
    }
    return out;
  }
}

export const part1 = (input: Input) => {
  const data = input.asString();
  const image = new Image(data, 25, 6);

  let min = Number.MAX_VALUE;
  let value = 0;

  for (let z = 0; z < image.depth; z++) {
    let counts = [0, 0, 0];
    for (let x = 0; x < image.width; x++) {
      for (let y = 0; y < image.height; y++) {
        counts[image.get(x, y, z)] += 1;
      }
    }

    if (counts[0] < min) {
      min = counts[0];
      value = counts[1] * counts[2];
    }
  }

  return value;
};

export const part2 = (input: Input) => {
  const data = input.asString();
  const image = new Image(data, 25, 6);

  return image.image;
};
