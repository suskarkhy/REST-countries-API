import React, { useState } from 'react'
import './components.css'

import { BsSearch } from 'react-icons/bs'
import Form from 'react-bootstrap/Form'

const Search = ({ findCountry }) => {
	const [text, setText] = useState('')

	// handle the text input
	const onChange = (e) => {
		e.preventDefault()

		findCountry(text)
	}

	return (
		<div className='search-icon'>
			<div className='icon'>
				<BsSearch />
			</div>
			<Form onChange={onChange}>
				<Form.Control
					type='text'
					placeholder='Search for a country'
					value={text}
					onChange={(e) => {
						setText(e.target.value)
					}}
				/>
			</Form>
		</div>
	)
}

export default Search
