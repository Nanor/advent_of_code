package day19

import (
	"fmt"
	"strconv"
)

type elf struct {
	id   int
	next *elf
}

func makeList(count, startId int) *elf {
	head := &elf{1, nil}
	start := head

	curr := head
	for i := 2; i <= count; i++ {
		next := elf{i, nil}
		curr.next = &next
		curr = &next

		if curr.id == startId {
			start = curr
		}
	}
	curr.next = head

	return start
}

func Part1(count int) int {
	curr := makeList(count, 1)

	for curr.next != curr {
		curr.next = curr.next.next
		curr = curr.next
	}

	return curr.id
}

func Part2(count int) int {
	curr := makeList(count, count/2)

	if count%2 == 1 {
		curr.next = curr.next.next
		curr = curr.next
	}

	for curr.next != curr {
		curr.next = curr.next.next
		curr.next = curr.next.next
		curr = curr.next
	}

	return curr.id
}

func Main(file string) {
	elves, _ := strconv.Atoi(file)
	fmt.Println(Part1(elves))
	fmt.Println(Part2(elves))
}
