#!/bin/bash

go build .
echo > actual.log

i=1
while [ $i -le 25 ]
do
    if test -f ./inputs/day$i.txt; then
        echo "Day $i" >> actual.log
        ./2016 $i >> actual.log
        echo "" >> actual.log
    fi
    
    i=$(($i+1))
done

diff answers.log actual.log

if [ $? -eq 0 ]; then
    echo "PASS"
else
    echo "FAIL"
fi
