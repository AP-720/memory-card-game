import styles from "./ImageContainer.module.css";

export default function ImageContainer({ imageData, onSelectImage }) {
	const imageButtons = imageData.map((image) => (
		<button
			key={image.id}
			id={image.id}
			className={styles.gameButton}
			onClick={(e) => onSelectImage(e.currentTarget.id)}
		>
			<img className={styles.gameImage} src={image.imageUrl} />
		</button>
	));

	return <div className={styles.imageContainer}>{imageButtons}</div>;
}
