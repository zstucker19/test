import express from 'express';
import db from '../models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

    db.users.findOne({
        where: {
            $or: [
              {
                username: {
                  $eq: identifier
                }
              },
              {
                email: {
                  $eq: identifier
                }
              }
            ]
        }
    }).then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.dataValues.password_digest.toString())) {
        const token = jwt.sign({
          id: user.dataValues.id,
          username: user.dataValues.username
        }, config.jwtSecret);
        res.json({ token });
        
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

export default router;
