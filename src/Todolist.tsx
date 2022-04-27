import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from './App'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoListId: string, taskId: string) => void
  changeFilter: (todoListId: string, value: FilterValuesType) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  const addTask = () => {
    if (title.trim() !== '') {
      props.addTask(props.todoListId, title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onAllClickHandler = () => props.changeFilter(props.todoListId, 'all')
  const onActiveClickHandler = () => props.changeFilter(props.todoListId, 'active')
  const onCompletedClickHandler = () => props.changeFilter(props.todoListId, 'completed')

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId)
  }

  return <div>
    <h3>
      {props.title}
      <button onClick={removeTodoList}>x</button>
    </h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyDown={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map(t => {
          const onClickHandler = () => props.removeTask(props.todoListId, t.id)
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todoListId, t.id, e.currentTarget.checked)
          }

          return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? 'active-filter' : ''}
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? 'active-filter' : ''}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? 'active-filter' : ''}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}
