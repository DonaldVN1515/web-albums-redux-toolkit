import React from 'react';
// import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { addPhoto, updatePhoto } from '../../photoSlice';
import PhotoForm from '../../components/PhotoForm';
import { Container, Row } from 'reactstrap';

function AddEditPhoto(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { photoId } = useParams();
	const isAddMode = !photoId;

	// REDUX TOOLKIT
	const handleSubmit = (values) => {
		return new Promise((resolve) => {
			console.log('submit: ', values);

			// setTimeout(() => {
			if (isAddMode) {
				const action = addPhoto(values);
				console.log(action);

				dispatch(action);
			} else {
				const action = updatePhoto(values);
				dispatch(action);
			}

			navigate('/photo');
			resolve(true);
			// }, 2000);
		});
	};

	const editedPhoto = useSelector((state) =>
		state.photos.find((photo) => photo.id === +photoId)
	);

	// initialValues
	const initialValues = isAddMode
		? {
				title: '',
				categoryId: null,
				photo: '',
		  }
		: editedPhoto;

	return (
		<Container>
			<Row>
				<h3 style={{ padding: '20px 0px' }}>ADD NEW PHOTO</h3>
			</Row>
			<PhotoForm
				initialValues={initialValues}
				onSubmit={handleSubmit}
				isAddMode={isAddMode}
			/>
		</Container>
	);
}

AddEditPhoto.propTypes = {};

export default AddEditPhoto;
