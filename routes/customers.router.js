const express = require('express');

const CustomerService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = require('../services/customers.service');

router.get('/',  async (req, res, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async  (req, res, next) => {

  try {
      const { id } = req.params;
      const { email, lastName, phone, userId } = req.body;

  // Validar que todos los campos necesarios estén presentes
      if (!email|| !lastName || !phone || !userId) {
          return res.status(400).json({
          message: 'Missing fields. Email, lastname, phone and UserId are required.',
        });
      }
        const updatedCustomer =  await service.update(id, { email, lastName, phone, userId });

        res.json({
          message: 'Customer updated successfully',
          data: updatedCustomer,
        });
    } catch (error) {
      next(error);
    }

});

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
