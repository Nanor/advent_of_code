export interface Input {
  asString(): String;
  asLines(): String[];
  asNumbers(): number[];
  asNumberArray(): number[];
  asGrid(): String[][];
}
