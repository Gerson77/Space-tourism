import { Routes, Route } from 'react-router-dom'

import Homepage from './pages/Homepage'
import Destination from './pages/Destination'
import Technology from './pages/Technology'
import Crew from './pages/Crew'
import Header from './components/Header'

export default function App() {
  return (
    <div className='bg-black'>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>
    </div>
  );
}
