import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from './login';

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/articles' element={<App/>}/>
        </Routes>
    </BrowserRouter>
  )
}

