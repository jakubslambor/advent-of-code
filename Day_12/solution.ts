import { input } from './input.ts'

const [gridRows, gridCols] = [input.length, input[0].length]

let rq: number[] = [] // row queue
let cq: number[] = [] // col queue

let moves = 0
let nodesLeftInLayer = 0
let nodesInNextLayer = 0

let endReached = false
let visited: boolean[][] = Array.from(Array(gridRows), () =>
  Array.from(Array(gridCols), () => false)
)

const exploreNeighbours = (row: number, col: number) => {
  const offsets = [
    [-1, 1, 0, 0],
    [0, 0, 1, -1],
  ]

  for (let i = 0; i < 4; i++) {
    const neighbourRow = row + offsets[0][i]
    const neighbourCol = col + offsets[1][i]

    // Skip out-of-bounds locations
    if (neighbourRow < 0 || neighbourCol < 0) continue
    if (neighbourRow >= gridRows || neighbourCol >= gridCols) continue

    // Skip already visited and inaccessible cells
    if (visited[neighbourRow][neighbourCol]) continue
    if (
      input[row][col].charCodeAt(0) <
      input[neighbourRow][neighbourCol].charCodeAt(0) - 1
    )
      continue

    rq.push(neighbourRow)
    cq.push(neighbourCol)
    visited[neighbourRow][neighbourCol] = true
    nodesInNextLayer++
  }
}

const reset = () => {
  rq = []
  cq = []

  moves = 0
  nodesLeftInLayer = 0
  nodesInNextLayer = 0

  endReached = false
  visited = Array.from(Array(gridRows), () =>
    Array.from(Array(gridCols), () => false)
  )
}

// BFS
function solve(start: number[][]) {
  start.forEach(([startRow, startCol]) => {
    rq.push(startRow)
    cq.push(startCol)
    visited[startRow][startCol] = true
  })
  nodesLeftInLayer = start.length

  while (rq.length > 0) {
    const row: number = rq.shift()!
    const col: number = cq.shift()!

    if (input[row][col] === 'z') {
      endReached = true
      break
    }

    exploreNeighbours(row, col)

    nodesLeftInLayer--
    if (nodesLeftInLayer === 0) {
      nodesLeftInLayer = nodesInNextLayer
      nodesInNextLayer = 0
      moves++
    }
  }

  return endReached ? moves : 'No solution found'
}

/* Part 1 */
const result1 = solve([[20, 0]])
console.log(result1)

/* Part 2 */
reset()
const result2 = solve(
  input
    .flatMap((line, i) =>
      [...line].map((char, j) => (char === 'a' ? [i, j] : null))
    )
    .filter((item) => item) as number[][]
)
console.log(result2)
