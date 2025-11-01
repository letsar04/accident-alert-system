import Joi from "joi";

// === Schéma de validation pour un rapport d'accident ===
const reportSchema = Joi.object({
  user_id: Joi.number().integer().required().messages({
    "any.required": "L'identifiant utilisateur est requis",
    "number.base": "user_id doit être un nombre"
  }),
  gps_lat: Joi.number().required().messages({
    "any.required": "La latitude GPS est requise",
    "number.base": "gps_lat doit être un nombre"
  }),
  gps_long: Joi.number().required().messages({
    "any.required": "La longitude GPS est requise",
    "number.base": "gps_long doit être un nombre"
  }),
  severity: Joi.string()
    .valid("faible", "modérée", "sévère", "critique")
    .required()
    .messages({
      "any.only": "La gravité doit être faible, modérée, sévère ou critique",
      "any.required": "La gravité est requise"
    }),
  description: Joi.string().allow("", null)
});

export const validateReport = (req, res, next) => {
  const { error } = reportSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Erreur de validation",
      details: error.details.map((d) => d.message)
    });
  }
  next();
};
