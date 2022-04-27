import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './Components/login';
import Profile from './Components/profile';
import Landing from './Components/landing';
import Register from './Components/register'
import Home from './Components/home';
import Footer from './Components/footer';
import CreateMovement from './Components/CreateMovement';

function App() {
  return (
    <div className="App">  

    <Routes>
      <Route index element = { <Landing />}/>
      <Route path='/register' element = { <Register />} />
      <Route path='/login' element = { <Login /> } />
      <Route path='/home' element = { <Home /> } />
      <Route path='/:id' element = { <Profile />} />
      <Route path='/:id/movementCreate' element = { <CreateMovement /> } />

    </Routes>
    <Footer />
   
    </div>
  );
}

export default App;
