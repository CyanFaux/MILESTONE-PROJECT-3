// WIP

import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function MovieIndex(data) {

	const history = useHistory()
	
	const [places, setPlaces] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/movies`)
			const resData = await response.json()
			setPlaces(resData)
		}
		fetchData()
	}, [])

	let moviesFormatted = places.map((place) => {
		return (
			<div className="col-sm-6" key={place.placeId}>
				<h2>
					<a href="#" onClick={() => history.push(`/movies/${place.placeId}`)} >
						{place.name}
					</a>
				</h2>
				<p className="text-center">
					{place.cuisines}
				</p>
				<img style={{ maxWidth: 200 }} src={place.pic} alt={place.name} />
				<p className="text-center">
					Located in {place.city}, {place.state}
				</p>
			</div>
		)
	})
	return (
		<main>
			<h1>Places to Rant or Rave About</h1>
			<div className="row">
				{placesFormatted}
			</div>
		</main>
	)
}

export default PlaceIndex;