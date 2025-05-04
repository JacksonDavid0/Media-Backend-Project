function handleError(req, res, error) {
  console.error("Error in /api/users route:", error);

  const status = error.status || 500;

  const errorResponse = {
    error: {
      status: status,
      code: error.code || "INTERNAL_SERVER_ERROR",
      message: error.message || "An unexpected error occurred.",
      details: error.details || undefined,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  };

  res.status(status).json(errorResponse);
}

module.exports = handleError;
