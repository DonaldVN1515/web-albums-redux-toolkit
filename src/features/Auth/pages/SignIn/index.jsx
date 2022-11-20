import firebase from 'firebase/compat/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import React from 'react';
import { Container } from 'reactstrap';
// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'redirect',
	signInSuccessUrl: '/photo',
	// We will display Google and Facebook as auth providers.
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn(props) {
	return (
		<Container>
			<h3>SignIn</h3>

			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</Container>
	);
}

SignIn.propTypes = {};

export default SignIn;
