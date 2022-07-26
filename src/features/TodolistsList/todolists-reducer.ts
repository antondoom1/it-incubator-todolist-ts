import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer'
import {fetchTasksTC} from './tasks-reducer'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) {
        state.splice(index, 1)
      }
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].title = action.payload.title
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.status
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
    },
    clearTodosDataAC(state) {
      state = []
    }
  }
})

export const todolistsReducer = slice.reducer
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC,
  clearTodosDataAC
} = slice.actions

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTodolists()
      .then((res) => {
        dispatch(setTodolistsAC({todolists: res.data}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return res.data
      })
      .then((todos) => {
        todos.forEach((tl) => {
          // @ts-ignore
          dispatch(fetchTasksTC(tl.id))
        })
      })
  }
}
export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(setAppStatusAC({status: 'loading'}))
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    todolistsAPI.deleteTodolist(todolistId)
      .then((res) => {
        dispatch(removeTodolistAC({id: todolistId}))
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(setAppStatusAC({status: 'succeeded'}))
      })
  }
}
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTodolist(title)
      .then((res) => {
        dispatch(addTodolistAC({todolist: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
      })
  }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
      .then((res) => {
        dispatch(changeTodolistTitleAC({id, title}))
      })
  }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
