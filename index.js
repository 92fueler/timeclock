'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/hello',

    handler: (request, h) => {

      return 'Hello World frrom timeclock'
    }
  })

  server.route({
    method: 'POST',
    path: '/shift',
    handler: function (request, h) {
      const payload = request.payload;

      return payload;
    },
    options: {
      auth: false,
      validate: {
        payload: Joi.object({
          start: Joi.date().iso().max('now').required(),
          end: Joi.date().iso().min(Joi.ref('start')).max('now').required()
        }),
      }
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
