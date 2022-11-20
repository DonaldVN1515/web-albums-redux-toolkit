import React from 'react';
// import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PhotoList from '../../components/PhotoList';
import { remoPhoto } from '../../photoSlice';

function MainPhoto(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const photos = useSelector((state) => state.photos);

	console.log('list photo: ', photos);

	const handlePhotoEditClick = (photo) => {
		navigate(`/photo/${photo.id}`);
	};

	const handlePhotoRemoveClick = (photo) => {
		console.log('photo', photo);

		const removePhotoId = photo.id;

		const action = remoPhoto(removePhotoId);

		dispatch(action);
	};

	return (
		<Container>
			<Row style={{ padding: '20px 0px' }}>
				<Col>
					<h3>ALBUMS | DONALDVN</h3>
				</Col>
				<Col>
					<Link to='add'>ADD NEW PHOTO</Link>
				</Col>
			</Row>

			<PhotoList
				photoList={photos}
				onPhotoEditClick={handlePhotoEditClick}
				onPhotoRemoveClick={handlePhotoRemoveClick}
			/>
		</Container>
	);
}

MainPhoto.propTypes = {};

export default MainPhoto;
