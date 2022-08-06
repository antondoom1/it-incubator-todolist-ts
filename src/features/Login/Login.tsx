import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {loginTC} from './auth-reducer'
import {AppRootStateType, useAppDispatch} from '../../app/store'
import {Navigate} from 'react-router-dom'
import {LoginParamsType} from '../../api/todolists-api'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Invalid password length'
      }
      return errors
    },
    onSubmit: async (values: LoginParamsType, formikHelpers: FormikHelpers<LoginParamsType>) => {
      const action = await dispatch(loginTC(values))
      if (loginTC.rejected.match(action)) {
        if (action.payload?.fieldsErrors?.length) {
          const error = action.payload?.fieldsErrors[0]
          formikHelpers.setFieldError(error.field, error.error)
        }
      }
      formik.resetForm()
    }
  })

  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }

  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <FormControl>
        <FormLabel>
          <p>To log in get registered
            <a href={'https://social-network.samuraijs.com/'}
               target={'_blank'}> here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>

        <form onSubmit={formik.handleSubmit}>
          <FormGroup>

            <TextField
              label="Email"
              margin="normal"
              {...formik.getFieldProps('email')}
            />

            {
              formik.touched.email &&
              formik.errors.email &&
              <div style={{color: 'red'}}>{formik.errors.email}</div>
            }

            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...formik.getFieldProps('password')}
            />

            {
              formik.touched.password &&
              formik.errors.password &&
              <div style={{color: 'red'}}>{formik.errors.password}</div>
            }

            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps('rememberMe')}
              />}/>

            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>

          </FormGroup>
        </form>

      </FormControl>
    </Grid>
  </Grid>
}