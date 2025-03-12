import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { RootState } from '../app/store'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link
            to="/articles"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Articles
          </Link>
        </Typography>
        {token ? (
          <>
            <Button
              color="inherit"
              onClick={() => navigate('/articles/create')}
            >
              Create Article
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
