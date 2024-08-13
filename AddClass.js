import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyDF7dufa5a2c5CEwWpKu4Pv3522puajXfM",
	authDomain: "scholarhub-ba462.firebaseapp.com",
	projectId: "scholarhub-ba462",
	storageBucket: "scholarhub-ba462.appspot.com",
	messagingSenderId: "858961732292",
	appId: "1:858961732292:web:5b9168b711e2f893f21f91"
};

// Initialize Firebase, auth, and the firestore database
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
	const loggedInUserId = localStorage.getItem('loggedInUserId');
	if(loggedInUserId) {
		const docRef = doc(db, "users", loggedInUserId);
		getDoc(docRef)
		.then((docSnap) => {
			if(docSnap.exists()) {
				const userData = docSnap.data();
				document.getElementById('loggedUserFirstName').innerText=userData.firstName;
				document.getElementById('loggedUserLastName').innerText=userData.lastName;
				document.getElementById('loggedUserEmail').innerText=userData.email;
			}
			else {
				console.log('no document found matching id')
			}
		})
		.catch ((error) => {
			console.log("Error getting document");
		})
	}
	else {
		console.log("User ID not found in local storage");
	}
})

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener('click', () => {
	localStorage.removeItem('loggedInUserId');
	signOut(auth)
	.then(() => {
		window.location.href="index.html";
	})
	.catch((error) => {
		console.error("Error signing out:", error);
	})
})

/*
const addCourse = document.getElementById('submitNewCourse');
addCourse.addEventListener('click', (event) => { 
	event.preventDefault();
	const courseName = document.getElementById('courseName').value;
	const courseURL = document.getElementById('websiteUrl').value;
	const certificateTrack = document.getElementById('certificateTrack').value;
	const courseDetails = document.getElementById('courseDetails').value;
	const currentlyEnrolled = document.getElementById('currentlyEnrolled').checked;
	const completedCourse = document.getElementById('completed').checked;
	const dateCompleted = document.getElementById('completedDate').value;
	const loggedInUserId = localStorage.getItem('loggedInUserId');
	
	const courseData = {
		email: userEmail,
		name: courseName,
		website: courseURL,
		track: certificateTrack,
		details: courseDetails,
		enrolled: currentlyEnrolled,
		complete: completedCourse,
		dateCompleted: dateCompleted
	};

	const docRef = doc(db, "courses", loggedInUserId);
	setDoc(docRef, courseData)
	.then(() => {
		window.location.href = 'AddNewCourse.html';
	})
	.catch((error) => {
		console.error("Error writing document", error);
	}) 
}) */

