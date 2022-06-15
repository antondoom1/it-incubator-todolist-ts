import React, {useState} from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {action} from '@storybook/addon-actions'
import {Task} from '../Task'
import {TaskType} from '../Todolist'

export default {
  title: 'TODOLISTS/TaskWithLocalState',
  component: Task,
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
    todolistId: 'ljlkdjklsdjf'
  }
} as ComponentMeta<typeof Task>

const TaskWithLocalState = () => {
  let [task, setTask] = useState<TaskType>({
    id: 'qwesdf', title: 'JS', isDone: false
  })

  const changeTaskStatus = () => setTask({...task, isDone: !task.isDone})
  const removeTask = () => action('task deleted')
  const changeTaskTitle = (taskId: string, title: string) => setTask({...task, title})

  return <Task changeTaskStatus={changeTaskStatus}
               changeTaskTitle={changeTaskTitle}
               removeTask={removeTask}
               task={task}
               todolistId={'ljlkdjklsdjf'}
  />
}

const Template: ComponentStory<typeof TaskWithLocalState> = (args) => <TaskWithLocalState/>

export const TaskIsDoneStories = Template.bind({})

TaskIsDoneStories.args = {}
