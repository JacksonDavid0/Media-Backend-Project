require("dotenv").config();
const expiredPasswordLink = (username) => {
  const link = process.env.Web_Link;
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset Link Expired - Sphere Mesh</title>
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
        color: #d9534f; /* Changed color to indicate an issue */
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
        padding: 12px 25px;
        text-decoration: none;
        border-radius: 5px;
        font-weight: bold;
        transition: background-color 0.3s ease;
      }
       .button:hover {
           background-color: #0056b3;
       }
      .footer {
        text-align: center;
        margin-top: 20px;
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
      .expiry-note { /* Re-purposed for general alert */
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 0.9em;
        color: #d9534f; /* Red color for alert */
        font-weight: normal;
      }

      @media (max-width: 400px) {
        .container {
              padding: 20px 15px;
          }
          .header h1 {
              font-size: 20px;
          }
          .content p {
              font-size: 13px;
          }
          .button {
              padding: 10px 20px;
              font-size: 14px;
          }
      }
    </style>
  </head>
  <body>
    <div class="container-holder">
      <div class="container">
        <div class="header">
          <h1>Password Reset Link Expired</h1>
        </div>
        <div class="content">
          <p>Hi ${username},</p>
          <p class="expiry-note">
            The password reset link you used has expired or is no longer valid.
            For security reasons, password reset links are only active for a
            limited time (typically 15 minutes).
          </p>

          <p>
            Don't worry! You can easily request a new password reset link.
            Please visit our "Forgot Password" page and enter your email
            address to receive a new link.
          </p>

          <p style="text-align: center; margin: 30px 0; color: white">
            <a href="http://${link}/forget-Password" class="button"
              >Request New Password Reset Link</a
            >
          </p>

          <p>
            If you continue to experience issues, please contact our support
            team.
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

module.exports = expiredPasswordLink;
