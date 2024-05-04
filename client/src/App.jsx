import cn from 'classnames'
import { useState } from 'react'
import styles from './App.module.css'
import Button from './components/Button/Button'
import List from './components/List/List'
import getData from './utils/getData'
import postData from './utils/postData.mjs'

function App() {
	const [l3, setL3] = useState([])

	const getDataFromDB = async () => {
		try {
			const data = await getData('http://localhost:3002/')
			setL3(data.map(el => {
				return el
			})
		)
		} catch (err) {
			console.error(err)
		}
	}
	const [registrationStyle, setRegistrationStyle] = useState({ top: '-480px' })
	const [loginInput1, setloginInput1] = useState('')
	const [loginInput2, setloginInput2] = useState('')
	const [loginInput3, setloginInput3] = useState('')
	const [loginInput4, setloginInput4] = useState('')
	const [loginInput5, setloginInput5] = useState('')

	const upRegister = () => {
		setRegistrationStyle({ top: 0 })
	}
	const downRegister = (e) => {
		e.preventDefault()
		setRegistrationStyle({ top: '-480px' })
	}


	return (
		<div className={styles['container']} onDoubleClick={getDataFromDB}>
			<div style={registrationStyle} className={styles['registaration']} >
				<h1>Регистрация</h1>
				<form className={styles['form']}>
					<label>Имя:</label>
					<input type="text" placeholder="Введите имя" value={loginInput1} onChange={e => setloginInput1(e.target.value)}/>
					<label>Фамилия:</label>
					<input type="text" placeholder="Введите фамилию" value={loginInput2} onChange={e => setloginInput2(e.target.value)}/>
					<label>Пол:</label>
					<input type="text" placeholder="Введите ваш пол" value={loginInput3} onChange={e => setloginInput3(e.target.value)}/>
					<label>e-mail:</label>
					<input type="text" placeholder="Введите email" value={loginInput4} onChange={e => setloginInput4(e.target.value)}/>
					<label>image-url:</label>
					<input type="text" placeholder="Введите url" value={loginInput5} onChange={e => setloginInput5(e.target.value)}/>
					<button className={styles['button']} type="submit" onClick={async() => {
						await postData('http://localhost:3002/post', {
							name: loginInput1,
							surname: loginInput2,
							gender: loginInput3,
							email: loginInput4,
							image: loginInput5
						})
					}}>Отправить</button>
					<button className={styles['button']} onClick={downRegister}>Выйти</button>
				</form>
			</div>
			<List title='Список' bgColor='notnone' listItems={l3} />
			<Button title='Добавить пользователя' onClick={upRegister} />
		</div>
	)
}

export default App