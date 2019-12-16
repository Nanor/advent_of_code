import { Input } from "./input";

const pattern = (x: number, y: number) => {
  const loop = [0, 1, 0, -1];
  const out = loop[Math.floor((y + 1) / (x + 1)) % 4];

  return out;
};

const fft1 = (signal: number[], offset = 0) => {
  for (let n = 0; n < 100; n++) {
    signal = signal.map((_, i) => {
      const x =
        signal
          .map((s, j) => pattern(i + offset, j) * s)
          .reduce((a, x) => a + x, 0) % 10;

      return x < 0 ? -x : x;
    });
  }

  return signal.slice(0, 8).join("");
};

export const part1 = (input: Input) => {
  let signal = input.asDigits();

  return fft1(signal);
};

const fft2 = (signal: number[]) => {
  for (let n = 0; n < 100; n++) {
    let count = 0;
    for (let i = signal.length - 1; i >= 0; i--) {
      count += signal[i];
      count %= 10;
      signal[i] = count;
    }
  }

  return signal.slice(0, 8).join("");
};

export const part2 = (input: Input) => {
  const data = input.asDigits();
  const skip = parseInt(data.slice(0, 7).join(""), 10);

  const startLoop = Math.floor(skip / data.length);

  let signal = data.slice(skip % data.length);
  for (let n = startLoop + 1; n < 10000; n++) {
    signal = signal.concat(data);
  }

  return fft2(signal);
};
