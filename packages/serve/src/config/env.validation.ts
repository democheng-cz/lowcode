import Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().port().default(8080),
  MYSQL_HOST: Joi.string().hostname().default('127.0.0.1'),
  MYSQL_PORT: Joi.number().port().default(3306),
  MYSQL_USER: Joi.string().min(1).required(),
  MYSQL_PASSWORD: Joi.string().allow('').required(),
  MYSQL_DATABASE: Joi.string().min(1).required(),
  MYSQL_SYNCHRONIZE: Joi.boolean().default(false),
  REDIS_HOST: Joi.string().hostname().default('127.0.0.1'),
  REDIS_PORT: Joi.number().port().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
  REDIS_DB: Joi.number().integer().min(0).default(0),
  REDIS_KEY_PREFIX: Joi.string().default('lowcode:'),
});
