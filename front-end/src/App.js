import { Routes, Route, Navigate, Link } from 'react-router-dom'
import { useState, useContext } from 'react'; // Import useState here
import './App.css'
import AuthContext from './store/authContext'
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'
import FavoritesList from './components/FavoritesList'  

// import YelpSearch from './components/YelpSearch' 

function App() {
  const [favorites, setFavorites] = useState([]);
  
  const addToFavorites = (restaurant) => {
    setFavorites([...favorites, restaurant]);
  };

const removeFromFavorites = (restaurant) => {
  const updatedFavorites = favorites.filter((r) => r.id !== restaurant.id); 
  setFavorites(updatedFavorites);
}; 

const { state } = useContext(AuthContext);

return (
  <div className='app'>
    <Header />
     {/* Add a link to the FavoritesList */}
      {/* <ul>
        <button>
          <Link to="/favorite">Favorite Restaurants List</Link>
        </button>
      </ul> */}
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!state.token ? <Auth/> : <Navigate to="/" />}/>
        <Route path='/form' element={state.token ? <Form/> : <Navigate to="/auth" />}/>
        <Route path='/profile' element={state.token ? <Profile/> : <Navigate to="/" />}/>
        <Route path='/favorite' element={!state.token ? <FavoritesList/> : <Navigate to="/auth" />}/> 
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App

