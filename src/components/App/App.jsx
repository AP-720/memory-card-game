import { useState } from "react";
import styles from "./App.module.css";
import Header from "../Header/Header";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

function App() {
	const [currentScore, setCurrentScore] = useState(0);
	const [highScore, setHighScore] = useState(0);

	return (
		<div className={styles.container}>
			<Header heading={"Memory Card Game"} />
			<ScoreBoard currentScore={currentScore} highScore={highScore} />
		</div>
	);
}

export default App;
