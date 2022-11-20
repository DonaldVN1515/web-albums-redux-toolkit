import firebase from 'firebase/compat/app';

const userApi = {
	getMe: () => {
		return new Promise((res, rej) => {
			// Wait 500ms  --> return result
			setTimeout(() => {
				const currUser = firebase.auth().currentUser;

				res({
					id: currUser.uid,
					name: currUser.displayName,
					email: currUser.email,
					photoUrl: currUser.photoURL,
				});
			}, 500);
		});
	},
};

export default userApi;
