/* eslint-disable react/prop-types */
import cn from 'classnames'
import styles from './List.module.css'
import { v4 as uuid } from 'uuid'
import React, { useState } from "react";
import deleteData from '../../utils/deleteData.mjs'
import patchData from '../../utils/patchData.mjs';

const List = ({ title, bgColor, listItems}) => {
	const [imageURL, setImageURL] = useState();
	const [itemImages, setItemImages] = useState({});
	const fileReader = new FileReader();
	fileReader.onloadend = () => {
		setImageURL(fileReader.result);
	};
	const handleOnChange = (event, itemId) => {
		if (event.target.files && event.target.files.length) {
		  const file = event.target.files[0];
		  const reader = new FileReader();
		  reader.onloadend = async () => {
			const base64Image = reader.result.split(',')[1]; // Получаем base64-кодированную часть строки
			const globalImageUrl = `data:image/${file.type};base64,${base64Image}`; // Создаем глобальную ссылку на изображение
	  
			setItemImages((prevImages) => ({
			  ...prevImages,
			  [itemId]: globalImageUrl,
			}));
			await patchData('http://localhost:3002/patch', itemId, { image: globalImageUrl });
		  }
		  reader.readAsDataURL(file);
		}
	  }

	return (
		<div className={cn(styles['container'], styles[bgColor])}>
			<h2>{title}</h2>
			<ul>
				{listItems.map((el, index) => {
					const itemId = el._id;
					return (
						<li
							className={cn(styles['item'])}
							key={uuid()}
						>
							<div className={cn(styles['leftBlock'])} >
								<form className={cn(styles['form'])}>
									<img
										src={ itemImages[imageURL] || el.image}
										className="file-uploader__preview"
										alt="preview"
									/>
									<input
										id="file-loader-button"
										type="file"
										className="file-uploader__upload-button"
										onChange={(event) => handleOnChange(event, itemId)}
									/>
								</form>
							</div>
							<div className={cn(styles['rightBlock'])} onClick={async() => {
								await deleteData('http://localhost:3002', el._id)
							}}>
								<p>ID: {el._id}</p>
								<p>Name: {el.name} {el.surname}</p>
								<p>Gender: {el.gender}</p>
								<p>Email: {el.email}</p>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default List