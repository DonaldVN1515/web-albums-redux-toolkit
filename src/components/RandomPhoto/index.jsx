import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import './RandomPhoto.scss';

const getRandomImageUrl = () => {
	const randId = Math.trunc(Math.random() * 2000);

	return `https://picsum.photos/id/${randId}/300/300`;
};

function RandomPhoto(props) {
	const { name, imageUrl, onImageUrlChange, onRandomPhotoBlur } = props;

	const hanldeRandomPhotoClick = () => {
		if (onImageUrlChange) {
			const randomImageUrl = getRandomImageUrl();

			onImageUrlChange(randomImageUrl);
		}
	};
	return (
		<div className='random-photo'>
			<div className='random-photo__btn'>
				<Button
					outline
					name={name}
					color='primary'
					onBlur={onRandomPhotoBlur}
					onClick={hanldeRandomPhotoClick}
				>
					Random Photo
				</Button>
			</div>

			<div className='random-photo__image'>
				{imageUrl && (
					<img
						src={imageUrl}
						alt='On no. Please click random again!'
						onError={hanldeRandomPhotoClick}
					/>
				)}
			</div>
		</div>
	);
}

RandomPhoto.propTypes = {
	name: PropTypes.string,
	imageUrl: PropTypes.string,
	onImageUrlChange: PropTypes.func,
	onRandomButtonBlur: PropTypes.func,
};
RandomPhoto.defaultProps = {
	name: '',
	imageUrl: '',
	onImageUrlChange: null,
	onRandomButtonBlur: null,
};
export default RandomPhoto;
