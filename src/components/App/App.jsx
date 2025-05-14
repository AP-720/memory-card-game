import { useState, useEffect } from "react";
import Header from "../Header/Header";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import ImageContainer from "../ImageContainer/ImageContainer";
import { shuffleArray } from "../../utilities";
import styles from "./App.module.css";

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [imageData, setImageData] = useState([]);
	const [clickedImages, setClickedImages] = useState(new Set([]));
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				// fetches 12 results, makes sure its public domain and has the field id, title and image_id
				const response = await fetch(
					"https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=12&fields=id,title,artist_title,image_id"
				);

				const data = await response.json();

				if (!response) {
					throw new Error("Failed to fetch data.");
				} else {
					setImageData(
						data.data.map((artWork) => {
							return {
								id: artWork.id,
								title: artWork.title,
								artist: artWork.artist_title,
								imageUrl: `https://www.artic.edu/iiif/2/${artWork.image_id}/full/843,/0/default.jpg`,
							};
						})
					);
					setLoading(false);
				}
			} catch (error) {
				console.log(error);
			}
		}

		fetchData();
	}, []);

	const onSelectImage = (id) => {
		if (clickedImages.has(id)) {
			setCurrentScore(0);
			setClickedImages(new Set([]));
		} else {
			// Need to make sure to create a new set and copy the previous data to it, then add the new id.
			setClickedImages(new Set([...clickedImages]).add(id));

			// Need to calculate the new value and then use for the comparison and setting the new value, otherwise was getting stale state when using the currentScore.
			const newScore = currentScore + 1;

			setCurrentScore(newScore);

			if (newScore > highScore) {
				setHighScore(newScore);
			}
		}
		shuffleArray(imageData);
	};

	return (
		<div className={styles.container}>
			<Header heading={"Memory Card Game"} />
			<ScoreBoard currentScore={currentScore} highScore={highScore} />
			{loading ? (
				<p className={styles.loading}>Loading...</p>
			) : (
				<ImageContainer imageData={imageData} onSelectImage={onSelectImage} />
			)}
		</div>
	);
}

export default App;
