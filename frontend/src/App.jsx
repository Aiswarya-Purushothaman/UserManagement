import { useState } from 'react'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <>
    <Header/>
    <ToastContainer/>
    <Container className='my-2'>
    <Outlet/>
    </Container>
   
    
    </>
  )
}

export default App
