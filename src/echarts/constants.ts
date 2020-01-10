import * as Joi from '@hapi/joi';

export const DEFAULT_IMAGE_WIDTH = 600;

export const DEFAULT_IMAGE_HEIGHT = 250;

export const imageBodyValidationSchema = Joi.object({
  echartOptions: Joi.object().required(),
});
