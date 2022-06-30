import {TasksStateType} from '../App'
import {v1} from 'uuid'
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosACType} from './todolists-reducer'
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from './store'

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK',
  todolistId: string
  taskId: string
}

export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS',
  todolistId: string
  taskId: string
  status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE',
  todolistId: string
  taskId: string
  title: string
}

type SetTasksType = ReturnType<typeof setTasksAC>
type AddTaskType = ReturnType<typeof addTaskAC>

type ActionsType = RemoveTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodosACType
  | SetTasksType
  | AddTaskType

const initialState: TasksStateType = {
  /*"todolistId1": [
      { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ],
  "todolistId2": [
      { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
      { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
          startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
  ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'SET-TASKS': {
      const stateCopy = {...state}
      stateCopy[action.todolistId] = action.tasks
      return stateCopy
    }
    case 'SET-TODOS': {
      const stateCopy = {...state}
      action.payload.todos.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'REMOVE-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.todolistId]
      const newTasks = tasks.filter(t => t.id !== action.taskId)
      stateCopy[action.todolistId] = newTasks
      return stateCopy
    }
    case 'ADD-TASK': {
      const stateCopy = {...state}
      const tasks = stateCopy[action.task.todoListId]
      const newTasks = [action.task, ...tasks]
      stateCopy[action.task.todoListId] = newTasks
      return stateCopy
    }
    case 'CHANGE-TASK-STATUS': {
      let todolistTasks = state[action.todolistId]
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, status: action.status} : t)

      state[action.todolistId] = newTasksArray
      return ({...state})
    }
    case 'CHANGE-TASK-TITLE': {
      let todolistTasks = state[action.todolistId]
      // найдём нужную таску:
      let newTasksArray = todolistTasks
        .map(t => t.id === action.taskId ? {...t, title: action.title} : t)

      state[action.todolistId] = newTasksArray
      return ({...state})
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    }
    default:
      return state
  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return {type: 'SET-TASKS', tasks, todolistId} as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.getTasks(todolistId)
      .then((res) => {
        const tasks = res.data.items
        const action = setTasksAC(tasks, todolistId)
        dispatch(action)
      })
  }
}
export const addTaskTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId, title)
      .then((res) => {
        const action = addTaskAC(res.data.data.item)
        dispatch(action)
      })
  }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(removeTaskAC(taskId, todolistId))
        }
      })
  }
}

export const updateTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const allTasksFromState = getState().tasks
    const tasksForCurrentTodolist = allTasksFromState[todolistId]
    const task = tasksForCurrentTodolist.find(t => {
      return t.id === taskId
    })

    if (task) {
      todolistsAPI.updateTask(todolistId, taskId, {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: status
      }).then(() => {
        const action = changeTaskStatusAC(taskId, status, todolistId)
        dispatch(action)
      })
    }
  }
}
