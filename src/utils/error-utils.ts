import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer'
import {Dispatch} from 'redux'
import {TasksReducerActionsType} from '../features/TodolistsList/tasks-reducer'
import {ResponseType} from '../api/todolists-api'
import {TodolistReducerActionsType} from '../features/TodolistsList/todolists-reducer'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<TasksReducerActionsType & TodolistReducerActionsType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<TasksReducerActionsType & TodolistReducerActionsType>) => {
  dispatch(setAppErrorAC(message))
  dispatch(setAppStatusAC('failed'))
}