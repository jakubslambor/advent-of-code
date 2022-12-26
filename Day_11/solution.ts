import { input } from './input.ts'

type Monkey = {
  starting_items: number[]
  operation: string
  test: number[]
  inspects: number
}

function getMonkeyBusiness(
  monkeys: Monkey[],
  rounds: number,
  divide?: boolean
) {
  const MOD = monkeys.map((monkey) => monkey.test[0]).reduce((a, b) => a * b, 1)

  for (let idx = 0; idx < rounds; idx++) {
    monkeys.forEach((monkey) => {
      const [condition, ifTrue, ifFalse] = monkey.test
      monkey.inspects += monkey.starting_items.length

      monkey.starting_items.forEach((item) => {
        let worryLevel = eval(item + monkey.operation)

        if (divide) {
          worryLevel = Math.floor(worryLevel / 3)
        } else {
          worryLevel = Math.floor(worryLevel % MOD)
        }

        worryLevel % condition === 0
          ? monkeys[ifTrue].starting_items.push(worryLevel)
          : monkeys[ifFalse].starting_items.push(worryLevel)
      })

      monkey.starting_items = []
    })
  }

  return twoHighest(monkeys.map((item) => item.inspects)).reduce(
    (a, b) => a * b,
    1
  )
}

const twoHighest = (arr: number[]) => {
  return arr.reduce(
    (acc, rec) =>
      rec > acc[1] ? [acc[1], rec] : rec > acc[0] ? [rec, acc[1]] : acc,
    [0, 0]
  )
}

const inputCopy = JSON.parse(JSON.stringify(input))

/* Part 1 */
const result = getMonkeyBusiness(input, 20, true)
console.log(result)

/* Part 2 */
const result2 = getMonkeyBusiness(inputCopy, 10000)
console.log(result2)
