#!/usr/local/bin/python3
from string import ascii_lowercase


def password_generator(first):
    first_int = sum(ascii_lowercase.index(l) * 26 **
                    i for i, l in enumerate(reversed(first)))

    for current in range(first_int, 26 ** 8):
        numbers = [current // (26 ** i) % 26 for i in range(7, -1, -1)]

        yield ''.join([ascii_lowercase[i] for i in numbers])


def valid(password):
    if 'i' in password or 'o' in password or 'l' in password:
        return False

    for i in range(24):
        run = ascii_lowercase[i:i + 3]
        if run in password:
            break
    else:
        return False

    for pair, rest in [(password[i:i + 2], password[i + 2:]) for i in range(len(password) - 1)]:
        if pair[0] == pair[1]:
            for pair_2 in [rest[i:i + 2] for i in range(len(rest) - 1)]:
                if pair_2[0] == pair_2[1]:
                    return True

    return False


def main():
    input = 'hepxcrrq'
    gen = (password for password in password_generator(input) if valid(password))

    print(next(gen))
    print(next(gen))


if __name__ == '__main__':
    main()
