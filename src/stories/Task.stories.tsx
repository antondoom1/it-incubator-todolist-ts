import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {action} from '@storybook/addon-actions'
import {Task} from '../Task'

export default {
  title: 'TODOLISTS/Task',
  component: Task,
  args: {
    changeTaskStatus: action('changeTaskStatus'),
    changeTaskTitle: action('changeTaskTitle'),
    removeTask: action('removeTask'),
    todolistId: 'ljlkdjklsdjf'
  }
} as ComponentMeta<typeof Task>

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneStories = Template.bind({})

TaskIsDoneStories.args = {
  task: {id: 'asdsdff', isDone: true, title: 'JS'}
}

export const TaskIsNotDoneStories = Template.bind({})

TaskIsNotDoneStories.args = {
  task: {id: 'asdsdff1', isDone: false, title: 'React'}
}