import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import AdminScreen from './screens/AdminScreen.jsx'
import AdminEdit from './screens/AdminEdit.jsx'
// import { ToastContainer } from 'react-toastify'
import ErrorBoundary from './screens/ErrorBoundary.jsx'

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route  path='/login' element={<LoginScreen/>}/>
      <Route  path='/register' element={<RegisterScreen/>}/>
      {/* private routes  */}
      <Route  path='' element={<PrivateRoute/>}>
      <Route  path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route  path='/admin' element={<AdminScreen/>}/>
      <Route  path='/editUser' element={<AdminEdit/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router}/>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);