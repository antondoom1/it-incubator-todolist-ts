import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AppWithRedux from '../AppWithRedux'
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator'

export default {
  title: 'TODOLISTS/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>

const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxStories = Template.bind({})

AppWithReduxStories.args = {
  addItem: action('button clicked inside form')
}

