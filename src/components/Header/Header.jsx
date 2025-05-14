import styles from "./Header.module.css";

export default function Header({ heading }) {
	return (
		<header>
			<h1>{heading}</h1>
			<p className={styles.headerText}>
				Pick an artwork, don’t pick the same one twice, or it's game over!
			</p>
		</header>
	);
}
