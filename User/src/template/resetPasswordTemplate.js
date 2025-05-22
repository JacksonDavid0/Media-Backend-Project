require("dotenv").config();
const resetPasswordLink = () => {
  const link = process.env.Remote_Link;
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Set New Password - Sphere Mesh</title>
    <style>
      /* Basic Reset and Body Styles */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Inter', sans-serif; /* Using Inter for consistency */
        line-height: 1.6;
        color: #333;
        padding: 10px;
        background-color: #f0f2f5; /* Light background for the page */
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh; /* Full viewport height */
      }

      /* Container Styling */
      .container-holder {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%; /* Ensure it takes full width of its parent */
      }
      .container {
        width: 95%; /* Fluid width for responsiveness */
        max-width: 500px; /* Limits width on larger screens */
        font-weight: 600;
        font-size: 14px;
        margin: 0 auto;
        padding: 30px 20px;
        border: 1px solid #ddd;
        border-radius: 12px; /* More rounded corners */
        background-color: #ffffff; /* White background for the form */
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Enhanced shadow */
      }

      /* Header Styling */
      .header {
        text-align: center;
        margin-bottom: 25px;
      }
      .header h1 {
        color: #333;
        font-size: 28px; /* Slightly larger header */
        font-weight: 700;
      }

      /* Content and Form Styling */
      .content {
        margin-bottom: 20px;
      }
      .content p {
        color: #555;
        margin-bottom: 15px;
        font-weight: 400; /* Normal font weight for paragraphs */
      }
      .form-group {
        margin-bottom: 20px;
        position: relative; /* Needed for absolute positioning of toggle button */
      }
      .form-group label {
        display: block;
        margin-bottom: 8px;
        color: #333;
        font-weight: 600;
      }
      .form-group input[type="password"],
      .form-group input[type="text"] { /* Added text type for visibility toggle */
        width: 100%; /* Ensures input fills available width */
        padding: 12px;
        padding-right: 40px; /* Make space for the toggle button */
        border: 1px solid #ccc;
        border-radius: 8px; /* Rounded input fields */
        font-size: 16px;
        color: #333;
        outline: none;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .form-group input[type="password"]:focus,
      .form-group input[type="text"]:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      }

      /* Password Toggle Button Styling */
      .toggle-password {
        position: absolute;
        right: 10px;
        top: 60%; /* Adjust vertical alignment */
        transform: translateY(-50%); /* Center vertically */
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px; /* Icon size */
        color: #777;
        padding: 5px;
        transition: color 0.2s ease;
      }
      .toggle-password:hover {
        color: #333;
      }

      /* Button Styling */
      .button {
        display: block; /* Make button full width */
        width: 100%; /* Ensures button fills available width */
        background-color: #007bff;
        color: white;
        padding: 15px 25px; /* Generous padding */
        text-decoration: none;
        border-radius: 6px; /* Less rounded for a more mature look */
        font-weight: bold;
        font-size: 18px; /* Larger font size for button */
        transition: background-color 0.3s ease, transform 0.2s ease;
        border: none; /* Remove default button border */
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Softer, less pronounced shadow */
      }
      .button:hover {
        background-color: #0056b3;
        transform: translateY(-2px); /* Slight lift on hover */
      }
      .button:active {
        transform: translateY(0); /* Press effect */
      }

      /* Error Message Styling */
      .error-message {
        color: #d9534f; /* Red for errors */
        font-size: 13px;
        margin-top: 5px; /* Adjusted margin-top for better spacing */
        margin-bottom: 0; /* No bottom margin, as it's within form-group */
        font-weight: normal;
        text-align: left;
        display: none; /* Hidden by default */
      }
      .error-message.active {
        display: block; /* Show when active */
      }

      /* Footer Styling */
      .footer {
        text-align: center;
        margin-top: 30px; /* More space above footer */
        font-size: 0.9em;
        color: #777;
        padding-top: 15px;
        border-top: 1px solid #eee;
      }
      .footer p {
        margin-bottom: 5px;
      }
      .footer a {
        color: #777;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }

      /* Responsive Adjustments */
      @media (max-width: 400px) {
        .container {
          padding: 25px 15px;
        }
        .header h1 {
          font-size: 24px;
        }
        .content p {
          font-size: 13px;
        }
        .button {
          padding: 12px 20px;
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container-holder">
      <div class="container">
        <div class="header">
          <h1>Set Your New Password</h1>
        </div>
        <div class="content">
          <p>
            Please enter your new password below. Make sure it's strong and
            unique.
          </p>

          <form id="passwordResetForm">
            <div class="form-group">
              <label for="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                minlength="8"
                placeholder="Enter your new password"
                onkeyup="validatePasswords()"
              />
              <button
                type="button"
                class="toggle-password"
                onclick="togglePasswordVisibility('newPassword', this)"
              >
                😐 </button>
              <span id="newPasswordError" class="error-message"></span>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minlength="8"
                placeholder="Confirm your new password"
                onkeyup="validatePasswords()"
              />
              <button
                type="button"
                class="toggle-password"
                onclick="togglePasswordVisibility('confirmPassword', this)"
              >
                😐 </button>
              <span id="confirmPasswordError" class="error-message"></span>
            </div>

            <button type="submit" class="button">Set New Password</button>
          </form>
        </div>

        <div class="footer">
          <p>Thank you,<br />The Sphere Mesh Team</p>
          <p>
            <a href="#" target="_blank">Visit Sphere Mesh</a>
          </p>
        </div>
      </div>
    </div>

    <script>
      // Get references to the form elements
      const passwordResetForm = document.getElementById('passwordResetForm');
      const newPasswordInput = document.getElementById('newPassword');
      const confirmPasswordInput = document.getElementById('confirmPassword');
      const newPasswordError = document.getElementById('newPasswordError');
      const confirmPasswordError = document.getElementById('confirmPasswordError');

      /**
       * Validates the new password and confirm password fields.
       * Displays error messages in real-time.
       * @returns {boolean} True if passwords are valid, false otherwise.
       */
      function validatePasswords() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        let isValid = true;

        // Regular expression: at least one letter (uppercase or lowercase), one number, and one underscore
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*_).*$/;

        // Clear previous error messages for both fields
        newPasswordError.textContent = '';
        newPasswordError.classList.remove('active');
        confirmPasswordError.textContent = '';
        confirmPasswordError.classList.remove('active');

        // Validate new password length
        if (newPassword.length > 0 && newPassword.length < 8) {
          newPasswordError.textContent = 'Password must be at least 8 characters long.';
          newPasswordError.classList.add('active');
          isValid = false;
        } else if (newPassword.length > 0 && !passwordRegex.test(newPassword)) {
          // Validate new password against regex
          newPasswordError.textContent = 'Password must contain at least one letter, one number, and one underscore.';
          newPasswordError.classList.add('active');
          isValid = false;
        }


        // Validate confirm password match only if both fields have content
        if (confirmPassword.length > 0 && newPassword !== confirmPassword) {
          confirmPasswordError.textContent = 'Passwords do not match.';
          confirmPasswordError.classList.add('active');
          isValid = false;
        } else if (newPassword.length > 0 && confirmPassword.length === 0) {
            // If new password has content but confirm is empty, prompt user to confirm
            confirmPasswordError.textContent = 'Please confirm your password.';
            confirmPasswordError.classList.add('active');
            isValid = false;
        }

        return isValid;
      }

      /**
       * Toggles the visibility of a password input field.
       * @param {string} inputId The ID of the password input field.
       * @param {HTMLElement} buttonElement The button element that triggered the toggle.
       */
      function togglePasswordVisibility(inputId, buttonElement) {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
          input.type = 'text';
          buttonElement.textContent = '😑'; // Change to hide icon
        } else {
          input.type = 'password';
          buttonElement.textContent = '😐'; // Change to show icon
        }
      }

      // Add an event listener for form submission
      passwordResetForm.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Perform final validation before submission
        const isFormValid = validatePasswords();

        if (!isFormValid) {
          // If validation fails, stop the submission and ensure errors are visible
          return;
        }

        // If validation passes, you would typically send the password to your server
        console.log('New Password:', newPasswordInput.value);
        // In a real application, you would make an API call here, e.g.:
        
        fetch('http://${link}/api/corfirmPasswordToken/signature=${userId}&${token}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPasswordInput.value }) // Assuming a token is available from the URL
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.open();
                document.write(data);
                document.close();

            } else {
                // Display server-side error message
                newPasswordError.textContent = data.message || 'Failed to reset password. Please try again.';
                newPasswordError.classList.add('active');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            newPasswordError.textContent = 'An error occurred. Please try again later.';
            newPasswordError.classList.add('active');
        });
      });
    </script>
  </body>
</html>`;
};

module.exports = resetPasswordLink;
