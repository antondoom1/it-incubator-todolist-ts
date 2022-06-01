import React, {ChangeEvent} from 'react'
import {TodolistType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Button, Checkbox, IconButton} from '@material-ui/core'
import {Delete} from '@material-ui/icons'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer'
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  todoList: TodolistType
}

export function TodolistWithTasks({todoList}: PropsType) {
  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todoList.id])

  if (todoList.filter === 'active') {
    tasks = tasks.filter(t => !t.isDone)
  }
  if (todoList.filter === 'completed') {
    tasks = tasks.filter(t => t.isDone)
  }

  const dispatch = useDispatch()

  const addTask = (title: string) => {
    dispatch(addTaskAC(title, todoList.id))
  }

  const removeTodolist = () => {
    dispatch(removeTodolistAC(todoList.id))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC(todoList.id, title))
  }

  const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todoList.id, 'all'))
  const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todoList.id, 'active'))
  const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todoList.id, 'completed'))

  return <div>
    <h3>
      <EditableSpan value={todoList.title} onChange={changeTodolistTitle}/>
      <IconButton onClick={removeTodolist}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}/>
    <div>
      {
        tasks.map(t => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, todoList.id))
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked
            dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todoList.id))
          }
          const onTitleChangeHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, todoList.id))
          }


          return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
            <Checkbox
              checked={t.isDone}
              color="primary"
              onChange={onChangeHandler}
            />

            <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={todoList.filter === 'all' ? 'outlined' : 'text'}
              onClick={onAllClickHandler}
              color={'default'}
      >All
      </Button>
      <Button variant={todoList.filter === 'active' ? 'outlined' : 'text'}
              onClick={onActiveClickHandler}
              color={'primary'}>Active
      </Button>
      <Button variant={todoList.filter === 'completed' ? 'outlined' : 'text'}
              onClick={onCompletedClickHandler}
              color={'secondary'}>Completed
      </Button>
    </div>
  </div>
}


