#!/usr/local/bin/python3
import re

class Particle:
    def __init__(self, index, pos, vel, acc):
        self.index = index
        self.pos = pos
        self.vel = vel
        self.acc = acc

    @classmethod
    def from_string(cls, index, string):
        values = re.findall(r'(-?\d+)', string)
        values = [int(v) for v in values]
        return Particle(index, values[0:3], values[3:6], values[6:9])

    def simulate(self):
        self.vel = [v + a for v, a in zip(self.vel, self.acc)]
        self.pos = [p + v for p, v in zip(self.pos, self.vel)]

    def distance(self):
        return sum(abs(n) for n in self.pos)

    def colliding(self, others):
        return any(self.pos == other.pos for other in others if self != other)

def part1(particles):
    for _ in range(1000):
        for p in particles:
            p.simulate()

    return min(particles, key=lambda p: p.distance()).index

def part2(particles):
    for _ in range(100):
        for p in particles:
            p.simulate()

        particles = [p for p in particles if not p.colliding(particles)]

    return len(particles)

def main():
    with open('day20.txt') as f:
        particles = [Particle.from_string(i, line) for i, line in enumerate(f)]

    print(part1(particles))

    with open('day20.txt') as f:
        particles = [Particle.from_string(i, line) for i, line in enumerate(f)]

    print(part2(particles))

if __name__ == '__main__':
    main()
