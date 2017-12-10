#!/usr/local/bin/python3
import unittest
from itertools import islice


class Ring:

    def __init__(self, size):
        self._ring = list(range(size))
        self.size = size

    def __getitem__(self, index):
        if isinstance(index, slice):
            return [self[x] for x in range(index.start or 0, index.stop, index.step or 1)]
        else:
            return self._ring[index % self.size]

    def __setitem__(self, index, value):
        if isinstance(index, slice):
            for x, v in zip(range(index.start or 0, index.stop, index.step or 1), value):
                self[x] = v
        else:
            self._ring[index % self.size] = value


class TestRing(unittest.TestCase):

    def test_get_item(self):
        ring = Ring(5)

        self.assertEqual(2, ring[2])
        self.assertEqual(2, ring[7])

    def test_set_item(self):
        ring = Ring(5)
        ring[7] = 'foo'

        self.assertEqual('foo', ring[2])

    def test_get_slice(self):
        ring = Ring(5)

        self.assertEqual([1, 2, 3], ring[1:4])
        self.assertEqual([1, 2, 3], ring[6:9])
        self.assertEqual([0, 1, 2], ring[:3])
        self.assertEqual([0, 1, 2, 3, 4, 0], ring[:6])

    def test_set_slice(self):
        ring = Ring(5)

        ring[1:3] = ['x', 'y']
        self.assertEqual([0, 'x', 'y', 3, 4], ring[0:5])

        ring = Ring(5)

        ring[3:7] = ['a', 'b', 'c', 'd']
        self.assertEqual(['c', 'd', 2, 'a', 'b'], ring[0:5])


if __name__ == '__main__':
    unittest.main()
