import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import db from '../models';

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);


    return db.users.findOne({
        where: {
            $or: [
              {
                username: {
                  $eq: data.username
                }
              },
              {
                email: {
                  $eq: data.email
                }
              }
            ]
        }
    }).then(user => {
      if (user) {
        if (user.dataValues.username === data.username) {
          errors.username = 'There is user with such username';
        }
        if (user.dataValues.email === data.email) {
          errors.email = 'There is user with such email';
        }
      }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  })

}

router.get('/:identifier', (req, res) => {

    db.users.findOne({
        where: {
            $or: [
              {
                username: {
                  $eq: req.params.identifier
                }
              },
              {
                email: {
                  $eq: req.params.identifier
                }
              }
            ]
        }
    }).then(user => {
      res.json({ user });
      });

});


router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, email, address, occupation } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);



        db.users.create({
            username: username,
            email: email,
            password_digest: password_digest,
            location: address,
            servicesList: occupation
        }).then(user => res.json({ success: true }))
          .catch(err => res.status(500).json({ error: err }));


    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
