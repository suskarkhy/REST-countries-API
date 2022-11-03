// the home page fetches the data from the API and displays it in a card
// it also has a search bar that allows the user to search for a country
// and it will display the country's information

import React, { useState, useEffect } from 'react'
import './components.css'
import { Link } from 'react-router-dom'

import CustomeCard from './custom/CustomCard'
import Filter from './filter/Filter'
import Search from './Search'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

const Home = () => {
	const [countries, setCountries] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)

	// fetch data from the API
	const getAllCountries = async () => {
		try {
			const res = await fetch('https://restcountries.com/v3.1/all')

			// if the response is not ok, throw an error
			if (!res.ok) {
				throw Error('Could not fetch the data for that resource')
			}

			const data = await res.json()

			setCountries(data)
			setIsLoading(false)
		} catch (error) {
			// catch any errors
			setIsLoading(false)
			setError(error.message)
		}
	}

	// get the info from the search component
	const getCountryInfo = async (country) => {
		try {
			if (country !== '' || country !== null) {
				const res = await fetch(`https://restcountries.com/v3.1/name/${country}`)
				const data = await res.json()

				setCountries(data)
				setIsLoading(false)
				if (country === '') {
					// getAllCountries()
					throw Error('search field is empty')
				}
				if (!res.ok || country === null) {
					throw Error('Could not fetch the data for that resource')
				}
			}
			// if the response is not ok, throw an error
		} catch (error) {
			// catch any errors
			setIsLoading(false)
			setError(error.message)
		}
	}

	// get the info from the filter component
	const getCountryByRegion = async (region) => {
		try {
			if (region !== '' || region !== null) {
				const res = await fetch(`https://restcountries.com/v3.1/region/${region}`)
				const data = await res.json()

				setCountries(data)
				setIsLoading(false)
				if (!res.ok || region === null) {
					throw Error('Could not fetch the data for that resource')
				}
			}
			// if the response is not ok, throw an error
		} catch (error) {
			// catch any errors
			setIsLoading(false)
			setError(error.message)
		}
	}

	useEffect(() => {
		getAllCountries()
		// set timer for  how long the error message should be displayed
		const timer = setTimeout(() => {
			setError(null)
		}, 5000)
		return () => clearTimeout(timer)
	}, [])

	return (
		<div>
			<div className='search'>
				{isLoading && !error && (
					<div className='spinner'>
						<Spinner animation='grow' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				)}
				{/* pass the getCountryInfo function to the search component */}
				<Search findCountry={getCountryInfo} />
				<div className='filter'>
					{/* pass the getAllCountries function to the filter component */}
					<Filter filterByRegion={getCountryByRegion} />
				</div>
			</div>
			{error && (
				<div>
					<h4>{error}</h4>
				</div>
			)}
			<div>
				{/* show the loading annimation */}
				{isLoading && !error && (
					<div className='spinner'>
						<Spinner animation='grow' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</Spinner>
					</div>
				)}
				{/* show countries if there is no error */}
				{countries.length > 0 && (
					// map over the countries array and display the data
					<Container>
						<div className='row'>
							{countries?.map((country, i) => {
								const { name, flags, region, capital, population } = country

								return (
									<div className='col-md-3' key={i}>
										<Link to={`/country/${name.common}`}>
											<CustomeCard name={name} flags={flags} region={region} capital={capital} population={population} />
										</Link>
									</div>
								)
							})}
						</div>
					</Container>
				)}
			</div>
		</div>
	)
}

export default Home
