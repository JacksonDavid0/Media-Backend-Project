function handleError(req, res, error) {
  // console.error(`Error in ${req.originalUrl} route:`, error);

  const status = error.status || 500;

  if (error) {
    const errorResponse = {
      error: {
        status: status,
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unexpected error occurred.",
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    };
    if (
      typeof errorResponse.error.details === "string" &&
      errorResponse.error.details.split(":")[0] === "ValidationError"
    ) {
      errorResponse.error.details =
        errorResponse.error.details.split(":")[2] ||
        errorResponse.error.details;
    }

    return res.status(status).json(errorResponse);
  }
}

function dateNow() {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { handleError, dateNow };
