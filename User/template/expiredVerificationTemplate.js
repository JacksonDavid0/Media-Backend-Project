// require("dotenv").config();
const expiredVerification = () => {
  const link = process.env.Link;
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activation Link Expired - Sphere Mesh</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Ensure it takes at least full viewport height */
            margin: 0;
        }
    </style>
</head>
<body class="p-4">

    <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 class="text-2xl font-bold text-red-600 mb-4">Activation Link Expired</h1>

        <p class="text-gray-600 mb-6">
            It looks like your account activation link has expired. Activation links are only valid for 24 hours for security reasons.
        </p>
        <p class="text-gray-600 mb-6">
            Please register again to receive a new activation link. We apologize for any inconvenience.
        </p>

        <a href="http://${link}/register" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Go to Registration
        </a>
    </div>

</body>
</html>
`;
};

module.exports = expiredVerification;
