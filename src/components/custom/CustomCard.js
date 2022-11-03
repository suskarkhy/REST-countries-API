// this file is for the card that displays the summed country information
// in the home page

import React from 'react'
import '../components.css'
import Card from 'react-bootstrap/Card'

const { Text, Title, Img, Body } = Card

const styles = {
	justifyContent: 'center',
	alignItems: 'center',
	display: 'flex',
	padding: '1.5rem',
	width: '250px',
	padding: '20px',
}
const card = { cursor: 'pointer', backgroundcolor: 'hsl(209, 23%, 22%)' }
const img = {
	width: '100%',
	maxHeight: '130px',
}

const CustomCard = ({ name, flags, region, capital, population }) => {
	return (
		<div style={styles}>
			<Card style={card}>
				<Img style={img} variant='top' src={flags.png} />
				<Body style={{ height: '200px', width: '100%', maxHeight: '190px' }}>
					<Title style={{ fontWeight: '800', marginTop: '5px', marginBottom: '10px' }}>{name?.common}</Title>
					<Text style={{ opacity: '80%' }}>
						<strong>Region:</strong> {region ? region : ''}
					</Text>
					<Text>
						<strong>Capital:</strong> {capital ? capital : ''}
					</Text>
					<Text>
						<strong>Population:</strong> {population ? population : ''}
					</Text>
				</Body>
			</Card>
		</div>
	)
}

export default CustomCard
