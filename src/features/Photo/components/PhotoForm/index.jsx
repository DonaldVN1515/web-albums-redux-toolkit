import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, FastField } from 'formik';
import { Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';

import InputField from '../../../../custom-field/InputField';
import SelectField from '../../../../custom-field/SelectField';
import { PHOTO_CATEGORY_OPTIONS } from '../../../../constants/global';
import RandomPhotoField from '../../../../custom-field/RandomPhotoField';

function PhotoForm(props) {
	const { initialValues, onSubmit, isAddMode } = props;

	// FORMIK

	const validationSchame = Yup.object().shape({
		title: Yup.string().required('This field is required'),

		categoryId: Yup.number().required('This field is required').nullable(),

		// photo: Yup.string().required('This field is required'),

		photo: Yup.string().when('categoryId', {
			is: 1,
			then: Yup.string().required('This field is required'),
			otherwise: Yup.string(),
		}),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchame}
			onSubmit={onSubmit}
		>
			{(formikProps) => {
				const { values, errors, touched, isSubmitting } = formikProps;

				console.log({ values, errors, touched });

				return (
					<>
						<Form>
							<FastField
								name='title'
								component={InputField}
								label='Title'
								placeholder='Eg: Wow nature ...'
							/>

							<FastField
								name='categoryId'
								component={SelectField}
								label='Category'
								placeholder="What's your photo category"
								options={PHOTO_CATEGORY_OPTIONS}
							/>

							<FastField
								name='photo'
								component={RandomPhotoField}
								label='Photo'
							/>

							<Button type='submit' color={isAddMode ? 'primary' : 'success'}>
								{isSubmitting && <Spinner size='sm' />}
								{isAddMode ? 'Add to album' : 'Update your Photo'}
							</Button>
						</Form>
					</>
				);
			}}
		</Formik>
	);
}

PhotoForm.propTypes = {
	onSubmit: PropTypes.func,
};
PhotoForm.defaultProps = {
	onSubmit: null,
};
export default PhotoForm;
