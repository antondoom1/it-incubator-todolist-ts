import {FilterValuesType, TodolistType} from '../App'

export const todolistsReducer = (state: Array<TodolistType>, action: todolistsReducerACType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(s => s.id !== action.payload.todolistId)
    case 'ADD-TODOLIST':
      let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: 'all'}
      return [...state, newTodolist]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(s => s.id === action.payload.todolistId ? {...s, title: action.payload.title} : s)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(s => s.id === action.payload.id ? {...s, filter: action.payload.filter} : s)
    default:
      return state
  }
}

type todolistsReducerACType = removeTodolistACType | addtodolistACType | changeTodolistTitleACType | changeFilterType

type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  } as const
}

type addtodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (id: string, title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {id, title}
  } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {todolistId, title}
  } as const
}

type changeFilterType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (id: string, filter: FilterValuesType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {id, filter}
  } as const
}