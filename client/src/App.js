import Error from './components/Error';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Register />} />
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
     

    </>
  );
}

export default App;
