import styles from "./ImageContainer.module.css";

export default function ImageContainer({ imageData }) {
   

	const imageButtons = imageData.map((image) => (
		<button key={image.id} className={styles.gameButton}>
			<img className={styles.gameImage} src={image.imageUrl} />
		</button>
	));

	return <div className={styles.imageContainer}>{imageButtons}</div>;
}
