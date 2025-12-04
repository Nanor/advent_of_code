#!/usr/local/bin/python3

letters = "abcdefghjkmnpqrstuvwxyz"


def password_generator(first):
    first_int = sum(letters.index(l) * 23**i for i, l in enumerate(reversed(first)))

    for current in range(first_int, 23**8):
        numbers = [current // (23**i) % 23 for i in range(7, -1, -1)]

        password = "".join([letters[i] for i in numbers])

        yield password


def valid(password):
    for i in range(21):
        run = letters[i : i + 3]
        if run in password:
            break
    else:
        return False

    for pair, rest in [(password[i : i + 2], password[i + 2 :]) for i in range(len(password) - 1)]:
        if pair[0] == pair[1]:
            for pair_2 in [rest[i : i + 2] for i in range(len(rest) - 1)]:
                if pair_2[0] == pair_2[1]:
                    return True

    return False


def main():
    with open("../files/2015_11_input.txt") as f:
        input = f.read().strip()
    gen = (password for password in password_generator(input) if valid(password))

    print(next(gen))
    print(next(gen))


if __name__ == "__main__":
    main()
