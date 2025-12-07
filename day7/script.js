const fs = require('fs')
const path = require('path')

const input = fs
  .readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
  .trim()
  .split('\n')
  .map(l => l.split(''))


let startRow = 0, startCol = 0
for (let r = 0; r < input.length; r++) {
  for (let c = 0; c < input[r].length; c++) {
    if (input[r][c] === 'S') {
      startRow = r
      startCol = c
    }
  }
}

let splits = 0
let activeBeams = new Map([[startCol, 1]])

for (let r = startRow + 1; r < input.length; r++) {
  let arrivals = new Map(activeBeams)
  activeBeams = new Map()

  while (arrivals.size) {
    let nextBeams = new Map()

    for (let [c, count] of arrivals) {
      if (c < 0 || c >= input[0].length) continue

      if (input[r][c] === '^') {
        splits += count
        if (c - 1 >= 0) nextBeams.set(c - 1, (nextBeams.get(c - 1) || 0) + count)
        if (c + 1 < input[0].length) nextBeams.set(c + 1, (nextBeams.get(c + 1) || 0) + count)
      } else {
        activeBeams.set(c, (activeBeams.get(c) || 0) + count)
      }
    }

    if (!nextBeams.size) break
    arrivals = nextBeams
  }
}

console.log(splits)
