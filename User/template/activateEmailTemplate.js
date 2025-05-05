// require("dotenv").config();

const activateEmail = (username, userId, token) => {
  const link = process.env.Link;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Sphere Mesh</title>
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
        width: 95%;
        max-width: 600px;
        font-weight: 600;
        font-size: 14px;
        margin: 0 auto;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        color: #333;
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
      .expiry-note {
        margin-top: 15px;
        margin-bottom: 15px; /* Add bottom margin as well */
        font-size: 0.9em; 
        color: #d9534f;
        font-weight: normal;
      }


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
      .container {
        padding: 30px 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      }

    </style>
  </head>
  <body>
    <div class="container-holder">
      <div class="container">
        <div class="header">
          <h1>Welcome to Sphere Mesh!</h1>
        </div>
        <div class="content">
          <p>Hi ${username},</p>
          <p>
            Thank you for registering on Sphere Mesh! We're excited to have you
            join our community.
          </p>

          <p>
            Before you can start connecting with friends, sharing updates, and
            exploring content, we need you to verify your email address.
          </p>

          <p style="text-align: center; margin: 30px 0; color: white">
            <a href="http://${link}/verifyUser/signature=${userId}&${token}" class="button"
              >Verify Email Address</a
            >
          </p>

          <p>
            Sphere Mesh is a social platform designed to connect diverse
            individuals from around the world and provide a space for sharing
            ideas, experiences, and building community.
          </p>
          <p class="expiry-note">
            Please note: This verification link will expire in 24 hours for
            security reasons.
          </p>

          <p>Once verified, you can:</p>
          <ul>
            <li>Complete your profile</li>
            <li>Find and connect with friends</li>
            <li>Share your first post</li>
            <li>Discover interesting communities and topics</li>
          </ul>

          <p>
            If you didn't create an account on Sphere Mesh, please ignore this
            email.
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
</html>
`;
};

module.exports = activateEmail;
