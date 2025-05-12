import { useState, useEffect } from "react";
import Header from "../Header/Header";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import styles from "./App.module.css";

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [imageData, setImageData] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				// fetches 12 results, using a empty query returns a random selection, makes sure its public domain and has the field id, title and image_id
				const response = await fetch(
					"https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=12&fields=id,title,artist_title,image_id"
				);

				const data = await response.json();

				if (!response) {
					throw new Error("Failed to fetch data.");
				} else {
					setImageData(
						data.data.map((artWork) => {
							({
								id: artWork.id,
								title: artWork.title,
								artist: artWork.artist_title,
								imageUrl: `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`,
							});
						})
					);
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	return (
		<div className={styles.container}>
			<Header heading={"Memory Card Game"} />
			<ScoreBoard currentScore={currentScore} highScore={highScore} />
		</div>
	);
}

export default App;
