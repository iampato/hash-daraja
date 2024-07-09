import 'dotenv/config';
import * as Joi from '@hapi/joi';

export const environmentValidationSchema = Joi.object({
  ENV: Joi.string().valid('development', 'staging', 'production', 'test'),
  // Mongo
  MONGO_DB_URL: Joi.string().required(),
});
