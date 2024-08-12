import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, addDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


const firebaseConfig = {
	apiKey: "AIzaSyDF7dufa5a2c5CEwWpKu4Pv3522puajXfM",
	authDomain: "scholarhub-ba462.firebaseapp.com",
	projectId: "scholarhub-ba462",
	storageBucket: "scholarhub-ba462.appspot.com",
	messagingSenderId: "858961732292",
	appId: "1:858961732292:web:5b9168b711e2f893f21f91"
};

const app = initializeApp(firebaseConfig);


const form = document.getElementById('newCourseForm');
form.addEventListener("submit", (event) => {
	event.preventDefault();

	const courseName = document.getElementById('courseName').value;
	const courseURL = document.getElementById('websiteUrl').value;
	const certificateTrack = document.getElementById('certificateTrack').value;
	const courseDetails = document.getElementById('courseDetails').value;
	const currentlyEnrolled = document.getElementById('currentlyEnrolled').checked;
	const completedCourse = document.getElementById('completed').checked;
	const dateCompleted = document.getElementById('completedDate').value;

	console.log(courseName, courseURL, certificateTrack, courseDetails, currentlyEnrolled, completedCourse, dateCompleted);
	form.reset();
}) 