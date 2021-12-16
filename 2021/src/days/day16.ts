import { Input } from "../input";

const toBinary = (input: Input): string =>
  input
    .asString()
    .split("")
    .map((d) => parseInt(d, 16).toString(2).padStart(4, "0"))
    .join("");

type Packet = {
  version: number;
  id: number;
  value?: number;
  subPackets?: Packet[];
};

const parse = (message: string): { packet: Packet; rest: string } => {
  const version = parseInt(message.slice(0, 3), 2);
  const id = parseInt(message.slice(3, 6), 2);

  if (id === 4) {
    let str = "";
    let r = message.slice(6);

    while (r[0] === "1") {
      str += r.slice(1, 5);
      r = r.slice(5);
    }
    str += r.slice(1, 5);
    r = r.slice(5);

    return { packet: { version, id, value: parseInt(str, 2) }, rest: r };
  }

  const lengthType = message.slice(6, 7);

  if (lengthType === "0") {
    const length = parseInt(message.slice(7, 22), 2);

    const subPackets = [];
    let r = message.slice(22, 22 + length);
    while (r.length > 0) {
      const resp = parse(r);
      subPackets.push(resp.packet);
      r = resp.rest;
    }

    return {
      packet: { version, id, subPackets },
      rest: message.slice(22 + length),
    };
  }

  const packetCount = parseInt(message.slice(7, 18), 2);
  const subPackets = [];
  let r = message.slice(18);

  for (let i = 0; i < packetCount; i++) {
    const resp = parse(r);
    subPackets.push(resp.packet);
    r = resp.rest;
  }

  return { packet: { version, id, subPackets }, rest: r };
};

const sumVersion = (packet: Packet): number => {
  if (packet.id === 4) {
    return packet.version;
  }

  return packet.subPackets?.reduce(
    (acc, p) => acc + sumVersion(p),
    packet.version
  );
};

export const part1 = (input: Input) => {
  const root = parse(toBinary(input)).packet;

  return sumVersion(root);
};

const evaluate = (packet: Packet): number => {
  const values = packet.subPackets?.map((p) => evaluate(p));

  switch (packet.id) {
    case 0:
      return values.reduce((x, y) => x + y, 0);
    case 1:
      return values.reduce((x, y) => x * y, 1);
    case 2:
      return Math.min(...values);
    case 3:
      return Math.max(...values);
    case 4:
      return packet.value;
    case 5:
      return values[0] > values[1] ? 1 : 0;
    case 6:
      return values[0] < values[1] ? 1 : 0;
    case 7:
      return values[0] === values[1] ? 1 : 0;
  }
};

export const part2 = (input: Input) => {
  const root = parse(toBinary(input)).packet;

  return evaluate(root);
};
