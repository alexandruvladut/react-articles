import React, { useState } from 'react'
import { useLoginUserMutation } from './authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box } from '@mui/material'

const Login = () => {
  const [loginUser] = useLoginUserMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({ username: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const loginResponse = await loginUser(form).unwrap()
      dispatch(setCredentials({ user: form.username, token: loginResponse.token })); // ✅ Store token
      navigate('/articles') // Redirect to articles after login
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          fullWidth
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default Login
