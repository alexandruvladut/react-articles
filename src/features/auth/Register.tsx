import React, { useState } from 'react'
import { useRegisterUserMutation } from './authApi'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerUser(form).unwrap()
    navigate('/login')
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Register</Typography>
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
          name="email"
          label="Email"
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
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </form>
    </Container>
  )
}

export default Register
