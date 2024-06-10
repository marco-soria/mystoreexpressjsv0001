const boom = require('@hapi/boom'); //importar boom para manejar errores

function validatorHandler(schema, property) { //así no se utilice next en el código se debe poner aqui, ya que un middleware de error tiene los cuatro parámetros
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false  });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler
