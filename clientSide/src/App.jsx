

import { Outlet } from 'react-router-dom'
import './App.css'
import Register from './components/Register'


function App() {
     

     return  <>
     <Register/>
      <Outlet></Outlet>
      </>
     
}

export default App
