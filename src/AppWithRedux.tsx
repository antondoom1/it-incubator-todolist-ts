import React from 'react'
import './App.css'
import {AddItemForm} from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {addTodolistAC} from './state/todolists-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './state/store'
import {TodolistType} from './App'
import {TodolistWithTasks} from './TodolistWithTasks'

function AppWithRedux() {

  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

  let dispatch = useDispatch()

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title))
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              return <Grid key={tl.id} item>
                <Paper style={{padding: '10px'}}>
                  <TodolistWithTasks todoList={tl}/>
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  )
}

export default AppWithRedux
