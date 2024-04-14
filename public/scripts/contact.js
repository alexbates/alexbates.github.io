// Assign all form elements to constants
const form = document.getElementById('form');
const fname = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

form.addEventListener('submit', e => {
    // Call function to validate form
    // Condition that is true when validateForm does not return true
    if (!validateForm()) {
        // Stop the default browser behavior of submit button event
        e.preventDefault();
    }
});

const setError = (element, errorDisplay, fieldNum) => {
    // Declare variable that will reference HTML span element
    let errorSpan;
    if(fieldNum == 1) {errorSpan = document.getElementById('errorname');}
    else if(fieldNum == 2) {errorSpan = document.getElementById('erroremail');}
    else if(fieldNum == 3) {errorSpan = document.getElementById('errorsubject');}
    else {errorSpan = document.getElementById('errormessage');}
    // Span content is set to error message passed to the function
    errorSpan.innerText = errorDisplay;
    // Error class is added to input or textarea, will change border color to red
    element.classList.add('error');
}

const isValidEmail = email => {
    // A regular expression is used to validate email address
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Function converts email address to lowercase and returns boolean value
    return regex.test(String(email).toLowerCase());
}

const validateForm = () => {
    // Remove whitespace on both sides of string, this enables conditional statements to function
    const nameTrimmed = fname.value.trim();
    const emailTrimmed = email.value.trim();
    const subjectTrimmed = subject.value.trim();
    const messageTrimmed = message.value.trim();

    // Variable to determine whether form validates
    var isValid = true;

    // Validate Name and set error message if needed
    if(nameTrimmed === '') {setError(fname, '(This field is required)', 1); isValid = false;}

    // Validate Email and set error message if needed
    if(emailTrimmed === '') {setError(email, '(This field is required)', 2);} 
    else if (!isValidEmail(emailTrimmed)) {setError(email, '(Invalid email provided)', 2); isValid = false;}

    // Validate Subject and set error message if needed
    if(subjectTrimmed === '') {setError(subject, '(This field is required)', 3); isValid = false;} 
    else if (subjectTrimmed.length < 5 ) {setError(subject, '(Must be 5 characters)', 3); isValid = false;}

    // Validate Message and set error message if needed
    if(messageTrimmed === '') {setError(message, '(This field is required)', 4); isValid = false;}
    else if (messageTrimmed.length < 30 ) {setError(message, '(Must be 30 characters)', 4); isValid = false;}

    if(isValid) {
        return true;
    }
    else {
        return false;
    }
};
