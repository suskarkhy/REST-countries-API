// the country file is for fetching a specific country and
// displaying it's information

import React, { useState, useEffect } from 'react'
import './components.css'
import { Link, useParams } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Country = () => {
	const [country, setCountry] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	const { name } = useParams()

	// fetch data from the API
	const getCountry = async () => {
		try {
			const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
			// if the response is not ok, throw an error
			if (!res.ok) {
				throw Error('Could not fetch the data for that resource')
			}

			const data = await res.json()

			setCountry(data)
			setIsLoading(false)
		} catch (error) {
			// catch any errors
			setIsLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		getCountry()
	}, [name])

	return (
		<div className='country-wrapper'>
			<div className='back'>
				<Link to='/'>
					<Button>Back</Button>
				</Link>
			</div>
			{isLoading && (
				<div className='spinner'>
					<Spinner animation='grow' role='status'>
						<span className='visually-hidden'>Loading...</span>
					</Spinner>
				</div>
			)}
			{error && <div>{error}</div>}
			{country.map((country, i) => {
				// destructuring the data
				const { name, flags, altSpellings, population, region, subregion, capital, currencies, languages, borders } = country

				return (
					<div className='country-info' key={country.cca3}>
						<Container>
							<Row>
								<Col>
									<Card
										style={{
											width: '18rem',
											margin: '0 auto',
											marginTop: '2rem',
											marginBottom: '2rem',
											border: 'none',
											borderRadius: '10px',
											boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
										}}
									>
										<Card.Img
											style={{
												borderRadius: '10px 10px 0 0',
												width: '100%',
												height: 'auto',
											}}
											variant='top'
											src={flags.png}
										/>
									</Card>
								</Col>
								<Col>
									<h3>{name.common}</h3>
									<Row>
										<Col>
											<p>
												{' '}
												<strong>Native Name:</strong> {altSpellings[1]}
											</p>
											<p>
												{' '}
												<strong>Population: </strong>
												{population}
											</p>
											<p>
												{' '}
												<strong>Region: </strong>
												{region}
											</p>
											<p>
												{' '}
												<strong>Sub Region:</strong> {subregion}
											</p>
											<p>
												{' '}
												<strong>Capital: </strong>
												{capital}
											</p>
										</Col>
										<Col>
											<p>
												{' '}
												<strong> Top Level Domain: </strong> {country.tld}
											</p>
											<p>
												{' '}
												<strong>Currencies: </strong>
												<li> {Object.values(currencies).map((currency) => currency.name)} </li>
											</p>
											<p>
												{' '}
												<strong>Languages: </strong>
												{Object.values(languages).map((language) => {
													return <li key={language}> {language}, </li>
												})}
											</p>
											<p>
												{' '}
												<strong>Border Countries: </strong>
												{borders.map((border) => {
													return <li key={border}> {border}, </li>
												})}
											</p>
										</Col>
									</Row>
								</Col>
							</Row>
						</Container>
					</div>
				)
			})}
		</div>
	)
}

export default Country
