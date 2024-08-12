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