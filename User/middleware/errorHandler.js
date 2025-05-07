function handleError(req, res, error) {
  console.error(`Error in ${req.originalUrl} route:`, error);

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

    res.status(status).json(errorResponse);
  }
}

module.exports = handleError;
