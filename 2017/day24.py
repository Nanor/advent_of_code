#!/usr/local/bin/python3


def part1(components):
    def build(components, port=0):
        bridges = []
        for i, component in enumerate(components):
            if port in component:
                other_port = component[0] if component[
                    1] == port else component[1]
                other_components = components[:i] + components[i + 1:]

                recur = build(other_components, other_port)
                if recur:
                    bridges.append([component] + recur)
                bridges.append([component])

        if bridges:
            return max(bridges, key=lambda bridge: sum(port for component in bridge for port in component))
        else:
            return None

    return sum(port for component in build(components) for port in component)


def part2(components):
    def build(components, port=0):
        bridges = []
        for i, component in enumerate(components):
            if port in component:
                other_port = component[0] if component[
                    1] == port else component[1]
                other_components = components[:i] + components[i + 1:]

                recur = build(other_components, other_port)
                if recur:
                    bridges += [[component] + rest for rest in recur]
                bridges.append([component])

        if bridges:
            max_len = max(len(bridge) for bridge in bridges)
            return [b for b in bridges if len(b) == max_len]

    return max(sum(port for component in bridge for port in component) for bridge in build(components))


def main():
    with open('day24.txt') as f:
        components = [(int(l[0]), int(l[1]))
                      for l in [l.split('/') for l in f]]

    print(part1(components))
    print(part2(components))

if __name__ == '__main__':
    main()
