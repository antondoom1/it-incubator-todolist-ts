import {TasksStateType} from '../App'
import {v1} from 'uuid'
import {AddTodolistACType, RemoveTodolistACType} from './todolists-reducer'

export const tasksReducer = (state: TasksStateType, action: ReducerACType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {
        ...state,
        [action.todolistId]: [newTask, ...state[action.todolistId]]
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
      }
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.payload.todolistId]: []
      }
    case 'REMOVE-TODOLIST':
      const copyState = {...state}
      delete copyState[action.payload.todolistId]
      return copyState
    default:
      return state
  }
}

type ReducerACType = RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistACType
  | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: 'REMOVE-TASK',
    taskId, todolistId
  } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TASK',
    title, todolistId
  } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskId, isDone, todolistId
  } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskId, title, todolistId
  } as const
}
