import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCwVpv4pjINpzYQRyu21D11OI2obV4OyEk",
	authDomain: "crwn-db-15cbc.firebaseapp.com",
	databaseURL: "https://crwn-db-15cbc.firebaseio.com",
	projectId: "crwn-db-15cbc",
	storageBucket: "crwn-db-15cbc.appspot.com",
	messagingSenderId: "691932300854",
	appId: "1:691932300854:web:2a9e1bb57602b6ea543a97",
	measurementId: "G-97RPZ2X8ME"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapshot = await userRef.get();

	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
