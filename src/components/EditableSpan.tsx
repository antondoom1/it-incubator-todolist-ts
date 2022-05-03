import React from 'react'
import {useState, ChangeEvent} from 'react'

type EditableSpanPropsType = {
  title: string
  callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNewTitle] = useState(props.title)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onDoubleClickHandler = () => {
    setEdit(!edit)
    props.callBack(newTitle)
  }

  return (
    edit
      ? <input value={newTitle} onChange={onChangeHandler} onBlur={onDoubleClickHandler} autoFocus/>
      : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
  )
}

