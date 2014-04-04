#!/bin/bash

git add .; git commit -am "psh"; git push
ssh strzel_a@steelsecurity.co "cd /home/strzel_a/vitrine && git pull"
