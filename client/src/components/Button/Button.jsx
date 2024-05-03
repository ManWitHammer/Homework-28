/* eslint-disable react/prop-types */
import styles from './Button.module.css'

function Button({ onClick, title }) {
	return (
		<button className={styles['button']} onClick={onClick}>
			{title}
		</button>
	)
}

export default Button