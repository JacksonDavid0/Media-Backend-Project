// require("dotenv").config();

const verifiedEmail = (username) => {
  const link = process.env.link;
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Activated - Sphere Mesh</title>
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

    <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Account Activated Successfully!</h1>

        <p class="text-gray-600 mb-2">
            Hi <span class="font-semibold text-blue-600">${username}</span>,
        </p>
        <p class="text-gray-600 mb-6">
            welcome to Sphere Mesh! Your account is now active and ready to go.
            Start connecting with people from around the globe and share your experiences.
        </p>

        <a href="http://${link}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Go to Sphere Mesh
        </a>
    </div>

</body>
</html>
`;
};

module.exports = verifiedEmail;
