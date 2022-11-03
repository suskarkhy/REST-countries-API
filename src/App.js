import './App.css'
import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import NavBar from './components/NavBar'
import Country from './components/Country'

function App() {
	return (
		<div className='app'>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/country/:name' element={<Country />} />
			</Routes>
		</div>
	)
}

export default App
