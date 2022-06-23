import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api'

export default {
  title: 'API'
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI
      .getTodolist()
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)} </div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI
      .createTodolist('newTodolist')
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)} </div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5d344400-3d37-4115-bdc0-07eaaf9e55aa'
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)} </div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '5d344400-3d37-4115-bdc0-07eaaf9e55aa'
    todolistAPI.updateTodolist(todolistId, 'SOME NEW TITLE')
      .then((res) => {
        setState(res.data)
      })
  }, [])

  return <div> {JSON.stringify(state)} </div>
}