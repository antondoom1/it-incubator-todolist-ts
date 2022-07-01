import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from 'redux'

export type RemoveTodolistActionType = {
  type: 'REMOVE-TODOLIST',
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST',
  newTodolist: TodolistType
  title: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE',
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER',
  id: string
  filter: FilterValuesType
}

export type setTodolistsType = ReturnType<typeof setTodolistsAC>

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | setTodolistsType

const initialState: Array<TodolistDomainType> = [
  /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'SET-TODOLISTS': {
      return action.todolists.map(el => ({...el, filter: 'all'}))
    }
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{...action.newTodolist, filter: 'all'}, ...state]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      const todolist = state.find(tl => tl.id === action.id)
      if (todolist) {
        // если нашёлся - изменим ему заголовок
        todolist.filter = action.filter
      }
      return [...state]
    }
    default:
      return state
  }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (newTodolist: TodolistType, title: string): AddTodolistActionType => {
  return {type: 'ADD-TODOLIST', newTodolist, title}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
  return {type: 'SET-TODOLISTS', todolists} as const
}

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  todolistsAPI.getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
    })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then(() => dispatch(removeTodolistAC(todolistId)))
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
  todolistsAPI.createTodolist(title)
    .then((res) => dispatch(addTodolistAC(res.data.data.item, title)))
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  todolistsAPI.updateTodolist(todolistId, title)
    .then(() => dispatch(changeTodolistTitleAC(todolistId, title)))
}