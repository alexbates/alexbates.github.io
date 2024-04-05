const express = require('express');
const app = express();
// Import path module into script, 
const path = require('path');
// Import the nodemailer module into script, install with npm install nodemailer
const nodemailer = require('nodemailer');
// The port the node app runs on
const port = 3000;

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// The public directory includes files the client has access to
app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-form', (req, res) => {
    // Access form data from HTML form, including name, email, subject, and message
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.text;
    // A regular expression is used to validate email address
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Form has already been validated client side
    // Validate form again server side. If it validates, proceeed with sending of email with contact message
    if(name !== '' && email !== '' && subject !== '' && message !== '' && regex.test(email)) {
        // Create a transporter object using SMTP transport
        let transporter = nodemailer.createTransport({
            // Outgoing server for email account
            host: 'mail.REDACTED.com',
            // Custom port
            port: 2525,
            // Do not use SSL
            secure: false,
            auth: {
                // Email account username
                user: 'portfolioform@REDACTED.com',
                // Email account password
                pass: 'REDACTEDPASSWORD'
            }
        });

        // Define email options
        let options = {
            // Sender for email
            from: 'portfoliocontact@bates.gg',
            // Recipient for email
            to: 'alex@bates.gg',
            // Subject for email
            subject: subject,
            // Body of email
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };
    
        // Send email using nodemailer
        transporter.sendMail(options, (error, info) => {
            if (error) {
                // Send the contact form back to client, but with an error message at top of the form
                res.sendFile(__dirname + '/public/contact/contact-error-email.html');
            } else {
                // Send the contact form back to client, but with a success message at top of the form
                res.sendFile(__dirname + '/public/contact/contact-success.html');
            }
        });
    }
    else {
        // Send the contact form back to client, but with an error message at top of the form
        res.sendFile(__dirname + '/public/contact/contact-error-validate.html');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});