import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useState, useContext } from 'react'; // Import useState here
import './App.css'
import AuthContext from './store/authContext'
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import FavoritesList from './components/FavoritesList'  

// import YelpSearch from './components/YelpSearch' 

function App() {
  const { state } = useContext(AuthContext);

  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!state.token ? <Auth/> : <Navigate to="/" />}/>
        <Route path='/form' element={state.token ? <Form/> : <Navigate to="/auth" />}/>
        <Route path='/favorite' element={state.token ? <FavoritesList/> : <Navigate to="/auth" />}/> 
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
};

export default App;
