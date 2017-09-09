import express from 'express';
import db from '../models';

let router = express.Router();

router.post('/:id', (req, res) => {

    const category = req.body.category;

    db.projects.findAll({
        where: {
            $and: [
                 
                {
                    category: {
                      $eq: category
                    }
                  },
                  {
                    completed: {
                      $eq: false
                    }
                  }
            ]
                
        }
    }).then(projects => {
      res.json({ projects });
      console.log(projects);
      }).catch(err => res.status(500).json({ error: err }));


});


export default router;