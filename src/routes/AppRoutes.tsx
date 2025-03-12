import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from '../features/auth/Register'
import Login from '../features/auth/Login'
import ArticlesList from '../features/articles/ArticlesList'
import CreateArticle from '../features/articles/CreateArticle'
import EditArticle from '../features/articles/EditArticle'
import Navbar from '../components/Navbar'
import PrivateRoute from '../features/auth/PrivateRoute'

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/create" element={<CreateArticle />} />
          <Route path="/articles/:id/edit" element={<EditArticle />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutes
