import { input } from './input.ts'

type Point = { x: number; y: number }
type Direction = 'U' | 'R' | 'D' | 'L'

const calculateDistance = (a: Point, b: Point) => {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2)
}

const getDirections = (a: Point, b: Point): Direction[] => {
  const directions: Direction[] = []

  if (a.y > b.y) directions.push('U')
  if (a.x > b.x) directions.push('R')
  if (a.y < b.y) directions.push('D')
  if (a.x < b.x) directions.push('L')

  return directions
}

const move = (position: Point, direction: Direction) => {
  if (direction === 'U') position.y++
  if (direction === 'R') position.x++
  if (direction === 'D') position.y--
  if (direction === 'L') position.x--
}

const getVisitedPlaces = (input: string[], ropeLength: number) => {
  const rope: Point[] = Array.from(Array(ropeLength), () => ({ x: 0, y: 0 }))
  const visited = [{ x: 0, y: 0 }]

  input.forEach((line) => {
    const [direction, moves] = line.split(' ') as [Direction, number]

    for (let j = 0; j < Number(moves); j++) {
      move(rope[0], direction)

      for (let k = 1; k < rope.length; k++) {
        const distance = calculateDistance(rope[k - 1], rope[k])

        // points are adjacent
        if (distance < 2) continue

        // points are too far apart
        const directions = getDirections(rope[k - 1], rope[k])
        move(rope[k], directions[0])
        directions[1] && move(rope[k], directions[1])

        if (k === rope.length - 1) {
          visited.push({ x: rope[k].x, y: rope[k].y })
        }
      }
    }
  })

  return new Set(visited.map((coords) => JSON.stringify(coords))).size
}

/* Part 1 */
const firstResult = getVisitedPlaces(input, 2)
console.log(firstResult)

/* Part 2 */
const secondResult = getVisitedPlaces(input, 10)
console.log(secondResult)
