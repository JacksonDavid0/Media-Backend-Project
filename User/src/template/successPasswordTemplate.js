require("dotenv").config();
const successPasswordLink = (username) => {
  const link = process.env.Web_Link;
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Successfully Reset - Sphere Mesh</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: sans-serif;
        line-height: 1.6;
        color: #333;
        padding: 10px;
      }
      .container-holder {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
      }
      .container {
        width: 95%; /* Makes the container fluid, taking 95% of available width */
        max-width: 600px; /* Prevents the container from becoming too wide on large screens */
        font-weight: 600;
        font-size: 14px;
        margin: 0 auto;
        padding: 30px 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        color: #28a745; /* Green color for success */
        font-size: 24px;
      }
      .content {
        margin-bottom: 20px;
      }
      .content p {
        color: black;
        margin-bottom: 15px;
      }
      .button {
        display: inline-block;
        background-color: #007bff; /* Example button color */
        color: white;
        padding: 12px 25px; /* Slightly larger padding for button */
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
       .button:hover {
           background-color: #0056b3;
       }
      ul {
        padding-left: 30px;
        margin-bottom: 15px;
      }
      ul li {
          margin-bottom: 8px;
      }
      .footer {
        text-align: center;
        margin-top: 20px;
        font-size: 0.9em;
        color: #777;
        padding-top: 15px; /* Add padding above footer content */
        border-top: 1px solid #eee; /* Add a separator line */
      }
       .footer p {
           margin-bottom: 5px; /* Less margin for footer paragraphs */
       }
      .footer a {
          color: #777;
          text-decoration: none;
      }
       .footer a:hover {
           text-decoration: underline;
       }
      /* Removed .expiry-note as it's not relevant for success */

      /* Media query for smaller screens */
      @media (max-width: 400px) {
        .container {
              padding: 20px 15px; /* Reduce padding further on very small screens */
          }
          .header h1 {
              font-size: 20px; /* Reduce header size on very small screens */
          }
          .content p, ul {
              font-size: 13px; /* Slightly smaller text on very small screens */
          }
          .button {
              padding: 10px 20px; /* Adjust button padding */
              font-size: 14px;
          }
      }
    </style>
  </head>
  <body>
    <div class="container-holder">
      <div class="container">
        <div class="header">
          <h1>Password Successfully Reset!</h1>
        </div>
        <div class="content">
          <p>Hi ${username},</p>
          <p>
            Your password for Sphere Mesh has been successfully reset.
            You can now log in with your new password.
          </p>

          <p style="text-align: center; margin: 30px 0; color: white">
            <a href="http://${link}/login" class="button"
              >Log In Now</a
            >
          </p>

          <p>
            If you did not initiate this password change, please contact our
            support team immediately.
          </p>
        </div>

        <div class="footer">
          <p>Thank you,<br />The Sphere Mesh Team</p>
          <p>
            <a href="#" target="_blank">Visit Sphere Mesh</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

module.exports = successPasswordLink;
