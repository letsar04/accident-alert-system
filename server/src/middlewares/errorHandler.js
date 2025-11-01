// Middleware global pour capter toutes les erreurs non gérées
export const errorHandler = (err, req, res, next) => {
  console.error("❌ Erreur interne :", err);

  res.status(err.status || 500).json({
    message: err.message || "Une erreur interne s'est produite",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};
