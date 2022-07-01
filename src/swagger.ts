import swaggerJSDoc, { Options } from 'swagger-jsdoc';
const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ren API',
      version: '1.0.0',
      description: 'Ren API',
    },
  },
  apis: ['**/*.ts'],
};
export const openapiSpecification = swaggerJSDoc(options);
