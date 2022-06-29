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

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  const [todolistId, setTodolistId] = useState<string>('')

  const getTask = () => {
    todolistAPI.getTasks(todolistId)
      .then(res => setState(res.data))
  }

  return <div> {JSON.stringify(state)}

    <div>

      <input placeholder={'todolistId'} value={todolistId} onChange={e => {
        setTodolistId(e.currentTarget.value)
      }}/>

      <button onClick={getTask}>get task</button>

    </div>

  </div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskId, setTaskId] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const deleteTask = () => {
    todolistAPI.deleteTask(todolistId, taskId)
      .then(res => setState(res.data))
  }

  return <div> {JSON.stringify(state)}

    <div>

      <input placeholder={'todolistId'} value={todolistId} onChange={e => {
        setTodolistId(e.currentTarget.value)
      }}/>

      <input placeholder={'taskId'} value={taskId} onChange={e => {
        setTaskId(e.currentTarget.value)
      }}/>


      <button onClick={deleteTask}>get task</button>

    </div>

  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [todolistId, setTodolistId] = useState<string>('')

  const createTask = () => {
    todolistAPI.createTask(todolistId, taskTitle)
      .then(res => setState(res.data))
  }

  return <div> {JSON.stringify(state)}

    <div>

      <input placeholder={'todolistId'} value={todolistId} onChange={e => {
        setTodolistId(e.currentTarget.value)
      }}/>

      <input placeholder={'taskTitle'} value={taskTitle} onChange={e => {
        setTaskTitle(e.currentTarget.value)
      }}/>

      <button onClick={createTask}>create task</button>

    </div>


  </div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [status, setStatus] = useState<number>(0)
  const [priority, setPriority] = useState<number>(0)
  const [startDate, setStartDate] = useState<string>('')
  const [deadline, setDeadline] = useState<string>('')

  const [todolistId, setTodolistId] = useState<string>('')
  const [taskId, setTaskId] = useState<string>('')

  const updateTask = () => {
    todolistAPI.updateTask(todolistId, taskId, {
      deadline: '',
      startDate: '',
      description, priority, status, title
    })
      .then(res => setState(res.data))
  }

  return <div> {JSON.stringify(state)}

    <div>

      <input placeholder={'taskId'} value={taskId} onChange={e => {
        setTaskId(e.currentTarget.value)
      }}/>
      <input placeholder={'todolistId'} value={todolistId} onChange={e => {
        setTodolistId(e.currentTarget.value)
      }}/>
      <input placeholder={'task title'} value={title} onChange={e => {
        setTitle(e.currentTarget.value)
      }}/>
      <input placeholder={'description'} value={description} onChange={e => {
        setDescription(e.currentTarget.value)
      }}/>
      <input placeholder={'status'} value={status} onChange={e => {
        setStatus(+e.currentTarget.value)
      }}/>
      <input placeholder={'priority'} value={priority} onChange={e => {
        setPriority(+e.currentTarget.value)
      }}/>
      <input placeholder={'start date'} value={startDate} onChange={e => {
        setStartDate(e.currentTarget.value)
      }}/>

      <button onClick={updateTask}>create task</button>

    </div>


  </div>
}