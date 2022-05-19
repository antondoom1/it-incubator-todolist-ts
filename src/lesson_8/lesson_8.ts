// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
  return nums.reduce((acc, num) => acc + num)
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): string {
  let result: string = ''
  if (a + b <= c || a + c <= b || b + c <= a) {
    result = '00'
  } else if (a === b && a === c && b === a && b === c) {
    result = '10'
  } else if (a === b || a === c || b === c) {
    result = '01'
  } else if (a !== b && a !== c && b !== a && b !== c) {
    result = '11'
  }
  return result
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
  return ('' + number)
    .split('')
    .map(Number)
    .reduce((acc, num) => acc + num)
}

// 4. Функция isEvenIndexSumGreater принимает параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
  let evenSum: number = 0
  let oddSum: number = 0
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 === 0) {
      evenSum += arr[i]
    } else {
      oddSum += arr[i]
    }
  }
  return evenSum > oddSum
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, которые являются элементами исходного массива.
// Исходный массив не мутирует.

export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
  return array.filter(num => num > 0 && Number.isInteger(num)).map(num => num ** 2)
}

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
  let result: number = 0
  for (let i = 1; i <= N; i++) {
    result += i
  }
  return result
}

// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export function getBanknoteList(amountOfMoney: number): Array<number> {
  const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
  const sum = []

  for (let i = 0; i < banknotes.length; i++) {
    if (amountOfMoney >= banknotes[i]) {
      sum.push(banknotes[i])
      amountOfMoney -= banknotes[i]
      i = i - 1
    } else if (!amountOfMoney) {
      break
    }
  }
  return sum
}