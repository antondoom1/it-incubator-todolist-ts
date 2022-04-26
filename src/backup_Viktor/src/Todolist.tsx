import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from './App'

type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
  const [error, setError] = useState(false)
  const [title, setTitle] = useState('')

  const addTask = () => {
    if (title.trim()) {
      props.addTask(title)
    } else {
      setError(true)
    }
    setTitle('')
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    if(error) setError(false)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  const onAllClickHandler = () => props.changeFilter('all')
  const onActiveClickHandler = () => props.changeFilter('active')
  const onCompletedClickHandler = () => props.changeFilter('completed')

  const getTasksForRender = (tasks: Array<TaskType>, filter: FilterValuesType) => {
    let tasksForRender
    switch (filter) {
      case 'completed':
        tasksForRender = tasks.filter(t => t.isDone)
        break
      case 'active':
        tasksForRender = tasks.filter(t => !t.isDone)
        break
      default:
        tasksForRender = tasks
    }
    return tasksForRender
  }

  const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)

  const tasksListItems = tasksForRender.length
    ? tasksForRender.map(t => {
      const onClickRemoveTask = () => props.removeTask(t.id)
      const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(t.id, e.currentTarget.checked)
      }
      const taskClasses = t.isDone ? 'is-done' : ''
      return (
        <li key={t.id}>
          <input
            type="checkbox"
            checked={t.isDone}
            onChange={onChangeStatus}/>
          <span className={taskClasses}>{t.title}</span>
          <button onClick={onClickRemoveTask}>x</button>
        </li>
      )
    })
    : <span>Нет задач в списке</span>

  const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
  const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
  const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
  const inputClasses = error ? 'error' : ''

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={title}
             onChange={onChangeHandler}
             onKeyDown={onKeyPressHandler}
             className={inputClasses}
      />
      <button onClick={addTask}>+</button>
      {error && <div className={'error-message'}>Title is required</div>}
    </div>
    <ul>
      {tasksListItems}
    </ul>
    <div>
      <button
        className={allBtnClasses}
        onClick={onAllClickHandler}>All
      </button>
      <button
        className={activeBtnClasses}
        onClick={onActiveClickHandler}>Active
      </button>
      <button
        className={completedBtnClasses}
        onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>
}
