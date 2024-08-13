// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, addDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


// Your web app's Firebase configuration
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

// Display alert message
function showMessage(message, divId) {
	var messsageDiv = document.getElementById(divId);
	messsageDiv.style.display = "block";
	messsageDiv.innerHTML = message;
	messsageDiv.style.opacity = 1;
	setTimeout(function() {
		messsageDiv.style.opacity = 0;
	}, 5000);
}

// Create New Account
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('rEmail').value;
	const password = document.getElementById('rPassword').value;
	const firstName = document.getElementById('fName').value;
	const lastName = document.getElementById('lName').value;

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const userData = {
				email: email,
				firstName: firstName,
				lastName: lastName
			};
			showMessage('Account Created Successfully', 'signUpMessage');
			const docRef = doc(db, "users", user.uid);
			setDoc(docRef, userData)
				.then(() => {
					window.location.href = 'index.html';
				})
				.catch((error) => {
					console.error("Error writing document", error);
				});
		})
		.catch((error) => {
			const errorCode = error.code;
			if(errorCode=='auth/email-already-in-use') {
				showMessage('Email address already exists!', 'signUpMessage');
			}
			else {
				showMessage('unable to create User', 'signUpMessage');
			}
		})
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	
	setPersistence(auth, browserSessionPersistence) 
		.then(() => {
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					showMessage('login successful', 'signInMessage');
					const user = userCredential.user;
					localStorage.setItem('loggedInUserId', user.uid);  // tracks user log in state
					window.location.href='AddNewCourse.html';
				})
				.catch((error) => {
					const errorCode = error.code;
					if(errorCode == 'auth/invalid-credential') {
						showMessage('Incorrect email or password', 'signInMessage');
					}
					else {
						showMessage('Account does not exist', 'signInMessage');
					}
				});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			showMessage('Unable to set persistence', 'signInMessage');
		});
});

// Add a new course - FUNCTION DOES NOT WORK! I am still not sure why. (Eden)
const addCourse = document.getElementById('newCourseForm');
document.addEventListener('submit', (event) => {
	event.preventDefault();
	const courseName = document.getElementById('courseName').value;
	const courseURL = document.getElementById('websiteUrl').value;
	const certificateTrack = document.getElementById('certificateTrack').value;
	const courseDetails = document.getElementById('courseDetails').value;
	const currentlyEnrolled = document.getElementById('currentlyEnrolled').checked;
	const completedCourse = document.getElementById('completed').checked;
	const dateCompleted = document.getElementById('completedDate').value;

	const user = auth.currentUser;
	const userEmail = user.email;

	const courseData = {
		email: userEmail,
		name: courseName,
		link: courseURL,
		track: certificateTrack,
		details: courseDetails,
		enrolled: currentlyEnrolled,
		completed: completedCourse,
		dateCompleted: dateCompleted
	};

	const docRef = doc(db, "courses", user.uid)
		setDoc(docRef, courseData)
			.then(() => {
				window.location.href = 'homepage.html';
			})
			.catch((error) => {
				const errorCode = error.code;
				showMessage('Unable to save course data', "createCourseMessage");
			}) 
}); 







