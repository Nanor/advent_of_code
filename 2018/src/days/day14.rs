struct State {
    recipes: Vec<usize>,
    a: usize,
    b: usize,
}
impl State {
    fn new() -> State {
        State {
            recipes: vec![3, 7],
            a: 0,
            b: 1,
        }
    }
    fn evolve(self) -> State {
        let mut recipes = self.recipes;
        let res = recipes[self.a] + recipes[self.b];
        let mut res: Vec<usize> = res
            .to_string()
            .chars()
            .map(|x| x.to_digit(10).unwrap() as usize)
            .collect();
        recipes.append(&mut res);

        State {
            a: (self.a + recipes[self.a] + 1) % recipes.len(),
            b: (self.b + recipes[self.b] + 1) % recipes.len(),
            recipes: recipes,
        }
    }
}

fn part1(input: usize) -> String {
    let mut state = State::new();
    while state.recipes.len() < 10 + input {
        state = state.evolve();
    }

    state.recipes[input..input + 10]
        .iter()
        .map(|x| x.to_string())
        .collect()
}

fn part2(input: &str) -> usize {
    let input: Vec<usize> = input
        .chars()
        .map(|x| x.to_digit(10).unwrap() as usize)
        .collect();

    let mut state = State::new();
    loop {
        let a = state.recipes.len();
        let b = input.len();
        if a >= b && state.recipes[(a - b)..a] == input[..] {
            return state.recipes.len() - input.len();
        }
        if a >= b + 1 && state.recipes[(a - b - 1)..(a - 1)] == input[..] {
            return state.recipes.len() - input.len() - 1;
        }

        state = state.evolve();
    }
}

pub(crate) fn main() {
    // println!("{}", part1(9)); // 5158916779
    // println!("{}", part1(5)); // 0124515891
    // println!("{}", part1(18)); // 9251071085
    // println!("{}", part1(2018)); // 5941429882
    println!("{}", part1(509671));

    // println!("{}", part2("51589")); // 9
    // println!("{}", part2("01245")); // 5
    // println!("{}", part2("92510")); // 18
    // println!("{}", part2("59414")); // 2018
    // println!("{}", part2("15891")); // 10
    println!("{}", part2("509671"));
}
