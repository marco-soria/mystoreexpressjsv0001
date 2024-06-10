const express = require('express');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = require('../services/product.service');

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => { //se agrega el next
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error); //se agrega el next para atrapar de forma explicita el error con el middleware
    }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req,res, next)=>{
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id,body);
    res.json(product);
    // res.json({
    //   message: 'updated',
    //   data: body,
    //   id
    // });
  } catch (error) {
    next(error);
  }

});

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async  (req, res, next) => {

  try {
      const { id } = req.params;
      const { name, price, image, description, categoryId } = req.body;

  // Validar que todos los campos necesarios estén presentes
      if (!name || !price || !image) {
          return res.status(400).json({
          message: 'Missing fields. Name, price, image, description and categoryID are required.',
        });
      }

        // Aquí iría la lógica para actualizar el recurso en la base de datos.
        // Por simplicidad, se simula la actualización y se devuelve el "nuevo" recurso.
        // const updatedProduct = {
        //   id,
        //   name,
        //   price,
        //   description,
        // };

        // res.json({
        //   message: 'Product updated successfully',
        //   data: updatedProduct,
        // });
        const updatedProduct =  await service.update(id, { name, price, image, description, categoryId });

        res.json({
          message: 'Product updated successfully',
          data: updatedProduct,
        });
    } catch (error) {
      next(error);
    }

});

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
