import { input } from './input.ts'

type Instruction = 'addx' | 'noop'

let cycle = 1
let X = 1

const targetCycles = [20, 60, 100, 140, 180, 220]
let targetIdx = 0

const results: number[] = []
let visualizer = ''

const checkForTargetCycle = (cycle: number) => {
  if (targetCycles[targetIdx] === cycle) {
    results.push(X * cycle)
    targetIdx++
  }
}

const checkForPixel = (cycle: number) => {
  const sprite = [X - 1, X, X + 1]

  if ((cycle - 1) % 40 === 0) {
    visualizer += '\n'
  }

  if (sprite.includes((cycle - 1) % 40)) {
    visualizer += '#'
  } else {
    visualizer += '.'
  }
}

input.forEach((line) => {
  const [instruction, value] = line.split(' ') as [Instruction, number]

  if (instruction === 'noop') {
    checkForTargetCycle(cycle)
    checkForPixel(cycle)
    cycle++
    return
  }

  for (let i = 0; i < 2; i++) {
    checkForTargetCycle(cycle)
    checkForPixel(cycle)

    if (i > 0) {
      X += Number(value)
      cycle++
    } else {
      cycle++
    }
  }
})

/* Part 1 */
const result = results.reduce((a, b) => a + b, 0)
console.log(result)

/* Part 2 */
console.log(visualizer)
