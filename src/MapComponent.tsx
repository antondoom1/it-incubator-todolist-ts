import React from 'react'
import {TaskType} from './Todolist'

type MapComponentType = {
  todoListId: string
  tasksForTodolist: TaskType[]
  removeTask: (todoListId: string, taskId: string) => void
  changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
}

export const MapComponent: React.FC<MapComponentType> = ({todoListId, tasksForTodolist, removeTask, changeTaskStatus}) => {
  return (
    <ul>
      {
        tasksForTodolist.map(t => {
          const onClickHandler = () => removeTask(todoListId, t.id)
          const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todoListId, t.id, e.currentTarget.checked)
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
  )
}

