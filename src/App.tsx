import React, {useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksType = {
  [todoListId: string]: TaskType[]
}

function App() {
  let todoListId1 = v1()
  let todoListId2 = v1()

  let [todoLists, setTodoLists] = useState<TodoListsType[]>([
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todoListId1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
      {id: v1(), title: 'Redux', isDone: false}
    ]
  })

  function removeTask(todoListId: string, taskId: string) {
    setTasks({
      ...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
    })
  }

  function addTask(todoListId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false}
    setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
  }

  function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
    setTasks({
      ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone} : t)
    })
  }

  return (
    <div className="App">

      {todoLists.map(tdl => {
        return (
          <Todolist
            key={tdl.id}
            todoListId={tdl.id}
            title={tdl.title}
            todoLists={todoLists}
            tasks={tasks[tdl.id]}
            removeTask={removeTask}
            setTodoLists={setTodoLists}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tdl.filter}
          />
        )
      })}
    </div>
  )
}

export default App
