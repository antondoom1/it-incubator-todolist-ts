import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed';
export type toDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [todoListId: string]: Array<TaskType>
}

function App() {
  const todoListId1 = v1()
  const todoListId2 = v1()

  let [toDoLists, setToDoList] = useState<toDoListType[]>([
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to learn in future', filter: 'active'}
  ])

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'React', isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'Redux', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false}
    ]
  })

  function removeTask(todoListId: string, taskId: string) {
    setTasks({
      ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
    })
  }

  function addTask(todoListId: string, title: string) {
    let newTask: TaskType = {id: v1(), title: title, isDone: false}

    setTasks({
      ...tasks, [todoListId]: [newTask, ...tasks[todoListId]]
    })
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)
    })
  }

  function changeFilter(todoListId: string, value: FilterValuesType) {
    setToDoList(toDoLists.map(tdl => tdl.id === todoListId ? {...tdl, filter: value} : tdl))
  }

  function removeTodoList(todoListId: string) {
    setToDoList(toDoLists.filter(tdl => tdl.id !== todoListId))
    delete tasks[todoListId]
  }

  return (
    <div className="App">
      {
        toDoLists.map(tl => {
          let tasksForTodolist = tasks[tl.id]

          if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
          }
          if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
          }

          return (
            <Todolist
              key={tl.id}
              todoListId={tl.id}
              title={tl.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeStatus}
              filter={tl.filter}
              removeTodoList={removeTodoList}
            />
          )
        })
      }
    </div>
  )
}

export default App

// commit test