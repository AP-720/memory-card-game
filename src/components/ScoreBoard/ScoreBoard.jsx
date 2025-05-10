import styles from "./ScoreBoard.module.css";

export default function ScoreBoard({ currentScore, highScore }) {
	return (
		<div className={styles.container}>
			<h2>Scores</h2>
			<div className={styles.scoresContainer}>
				<p>
					<span className={styles.bold}>Current:</span> {currentScore}
				</p>
				<p>
					<span className={styles.bold}>Highest:</span> {highScore}
				</p>
			</div>
		</div>
	);
}
