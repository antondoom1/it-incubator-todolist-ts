import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppActionsType, RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {AxiosError} from 'axios'
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils'

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistReducerActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET-TODOLISTS':
      return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
    default:
      return state
  }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id,
  title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id,
  filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
  type: 'CHANGE-TODOLIST-ENTITY-STATUS',
  id,
  entityStatus
} as const)

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<TodolistReducerActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err.message, dispatch)
      })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<TodolistReducerActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTodolistAC(todolistId))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err.message, dispatch)
        dispatch(changeTodolistEntityStatusAC(todolistId, 'idle'))
      })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch<TodolistReducerActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(addTodolistAC(res.data.data.item))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err.message, dispatch)
      })

  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch<TodolistReducerActionsType>) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitleAC(id, title))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err: AxiosError) => {
        handleServerNetworkError(err.message, dispatch)
      })
  }
}

// types
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type TodolistReducerActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | SetTodolistsActionType
  | AppActionsType
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
