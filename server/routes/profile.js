import express from 'express';
import db from '../models';

let router = express.Router();

//GET USER PROFILE

router.get('/:id', (req, res) => {

  db.users.findById(req.params.id).then(user => {
    console.log("sjhjfkhsf",user);
      res.json(user.dataValues);
     
    });
});


router.post('/:id', (req, res) => {
  console.log(req.params.id);

  const { about, photo, location } = req.body;

  db.users.update({
    about: about,
    photo: photo,
    location: location
  },
    {
      where: {
        id: {
          $eq: req.params.id
        }
      }


    }).then(user => {
      res.end();
    });

});

export default router;