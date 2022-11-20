import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

function SelectField(props) {
	const { field, form, options, label, placeholder, disabled } = props;

	const { name, value } = field;

	const { errors, touched } = form;
	const showError = errors[name] && touched[name];

	const SelectedOption = options.find((option) => option.value === value);

	const handleSelectedOptionChange = (SelectedOption) => {
		const selectedValue = SelectedOption
			? SelectedOption.value
			: SelectedOption;

		const changeEvent = {
			target: {
				name: name,
				value: selectedValue,
			},
		};

		field.onChange(changeEvent);
	};

	return (
		<FormGroup>
			{label && <Label for={name}>{label}</Label>}

			<Select
				id='name'
				{...field}
				value={SelectedOption}
				onChange={handleSelectedOptionChange}
				placeholder={placeholder}
				isDisabled={disabled}
				options={options}
				className={showError ? 'is-invalid' : ''}
			/>
			<ErrorMessage name={name} component={FormFeedback} />

			{/* {showError && <FormFeedback>{errors[name]}</FormFeedback>} */}
		</FormGroup>
	);
}

SelectField.propTypes = {
	field: PropTypes.object.isRequired,
	form: PropTypes.object.isRequired,

	label: PropTypes.string,
	placeholder: PropTypes.string,
	options: PropTypes.array,
	disabled: PropTypes.bool,
};

SelectField.defaultProps = {
	label: '',
	placeholder: '',
	options: [],
	disabled: false,
};

export default SelectField;
