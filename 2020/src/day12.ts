import { Input } from "./input";

enum Dir {
  E = 0,
  S = 1,
  W = 2,
  N = 3,
}

type State = {
  dir: Dir;
  x: number;
  y: number;
};

type State2 = {
  shipX: number;
  shipY: number;
  waypointX: number;
  waypointY: number;
};

export const part1 = (input: Input) => {
  const insts = input.asLines();

  const state: State = {
    dir: Dir.E,
    x: 0,
    y: 0,
  };

  const endState = insts.reduce((state, inst) => {
    const op = inst[0];
    const val = parseInt(inst.slice(1));

    const move = (state: State, op: string, val: number) => {
      switch (op) {
        case "F":
          return move(state, ["E", "S", "W", "N"][state.dir], val);
        case "N":
          return { ...state, y: state.y - val };
        case "S":
          return { ...state, y: state.y + val };
        case "E":
          return { ...state, x: state.x + val };
        case "W":
          return { ...state, x: state.x - val };
        case "L":
          return { ...state, dir: (state.dir - val / 90 + 4) % 4 };
        case "R":
          return { ...state, dir: (state.dir + val / 90 + 4) % 4 };
      }
    };
    return move(state, op, val);
  }, state);

  return Math.abs(endState.x) + Math.abs(endState.y);
};

export const part2 = (input: Input) => {
  const insts = input.asLines();

  const state: State2 = {
    shipX: 0,
    shipY: 0,
    waypointX: 10,
    waypointY: -1,
  };

  const endState = insts.reduce((state, inst) => {
    const op = inst[0];
    const val = parseInt(inst.slice(1));

    const rotate = (state: State2, val: number): State2 => {
      switch (val) {
        case 0:
          return state;
        case 1:
          return {
            ...state,
            waypointX: -state.waypointY,
            waypointY: state.waypointX,
          };
        case 2:
          return {
            ...state,
            waypointX: -state.waypointX,
            waypointY: -state.waypointY,
          };
        case 3:
          return {
            ...state,
            waypointX: state.waypointY,
            waypointY: -state.waypointX,
          };
      }
    };

    const move = (state: State2, op: string, val: number) => {
      switch (op) {
        case "F":
          return {
            ...state,
            shipX: state.shipX + state.waypointX * val,
            shipY: state.shipY + state.waypointY * val,
          };
        case "L":
          return rotate(state, 4 - val / 90);
        case "R":
          return rotate(state, val / 90);
        case "N":
          return {
            ...state,
            waypointY: state.waypointY - val,
          };
        case "S":
          return {
            ...state,
            waypointY: state.waypointY + val,
          };
        case "W":
          return {
            ...state,
            waypointX: state.waypointX - val,
          };
        case "E":
          return {
            ...state,
            waypointX: state.waypointX + val,
          };
      }
    };
    return move(state, op, val);
  }, state);

  return Math.abs(endState.shipX) + Math.abs(endState.shipY);
};
