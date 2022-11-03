// this file is for the dropdown filter for the regions

import React from 'react'
import '../components.css'

import { BsFillFilterCircleFill } from 'react-icons/bs'
import Form from 'react-bootstrap/Form'

const Filter = ({ filterByRegion }) => {
	const onChange = (e) => {
		const region = e.target.value

		filterByRegion(region)
	}

	return (
		<div className='filter-icon'>
			<div className='icon'>
				<BsFillFilterCircleFill />
			</div>
			<Form.Select onChange={onChange}>
				<option>Filter by Region</option>
				<option value='africa'>Africa</option>
				<option value='america'>America</option>
				<option value='asia'>Asia</option>
				<option value='europe'>Europe</option>
				<option value='oceania'>Oceania</option>
			</Form.Select>
		</div>
	)
}

export default Filter
