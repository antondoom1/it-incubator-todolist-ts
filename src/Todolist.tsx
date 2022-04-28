import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType, TodoListsType} from './App'
import {MapComponent} from './MapComponent'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoListId: string
  title: string
  todoLists: TodoListsType[]
  tasks: TaskType[]
  removeTask: (todoListId: string, taskId: string) => void
  setTodoLists: (todoLists: TodoListsType[]) => void
  addTask: (todoListId: string, title: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  let [title, setTitle] = useState('')
  let [error, setError] = useState<string | null>(null)

  let tasksForTodolist = props.tasks

  if (props.filter === 'active') {
    tasksForTodolist = props.tasks.filter(t => !t.isDone)
  }
  if (props.filter === 'completed') {
    tasksForTodolist = props.tasks.filter(t => t.isDone)
  }

  function changeFilter(todoListId: string, value: FilterValuesType) {
    props.setTodoLists(props.todoLists.map(tdl => tdl.id === todoListId ? {...tdl, filter: value} : tdl))
  }

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
    if (e.charCode === 13) {
      addTask()
    }
  }

  const onAllClickHandler = () => changeFilter(props.todoListId, 'all')
  const onActiveClickHandler = () => changeFilter(props.todoListId, 'active')
  const onCompletedClickHandler = () => changeFilter(props.todoListId, 'completed')

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <MapComponent
      todoListId={props.todoListId}
      tasksForTodolist={tasksForTodolist}
      removeTask={props.removeTask}
      changeTaskStatus={props.changeTaskStatus}
    />
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
