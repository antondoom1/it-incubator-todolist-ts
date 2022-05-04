import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react'

type PropsType = {
  callBack: (newTitle: string) => void
}

export const FullInput = (props: PropsType) => {

  let myRef = useRef<HTMLInputElement>(null)

  // let [title, setTitle] = useState('')

  let [error, setError] = useState<string | null>(null)

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.currentTarget.value)
  // }

  const addTask = () => {
    if (myRef.current) {
      props.callBack(myRef.current?.value)
      myRef.current.value = ''
    }
  }

  // const addTask = () => {
  //   // let newTitle = title.trim()
  //   // if (newTitle !== '') {
  //     props.callBack(myRef.current?.value)
  //     // setTitle('')
  //   } else {
  //     setError('Title is required')
  //   }
  // }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask()
    }
  }

  return (
    <div>
      <input
        // value={title}
        // onChange={onChangeHandler}
             ref={myRef}
             onKeyPress={onKeyPressHandler}
             className={error ? 'error' : ''}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

