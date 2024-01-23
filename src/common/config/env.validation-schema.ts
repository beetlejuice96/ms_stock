import * as Joi from 'joi';

export const validationSchema = Joi.object({
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  PORT: Joi.number().required(),
  EMAIL_TOKEN: Joi.string().required(),
  PASSWORD_TOKEN: Joi.string().required(),
  AUTH_SERVICE_BASE_URL: Joi.string().required(),
  SETTING_NEST_SERVICE_BASE_URL: Joi.string().required(),
  USER_SERVICE_BASE_URL: Joi.string().required(),
});
