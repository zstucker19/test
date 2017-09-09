import express from 'express';
import db from '../models';

let router = express.Router();

router.post('/:id', (req, res) => {

  // const title = req.body.title;
  // const category = req.body.category;
  const {title, category, Description} = req.body;


  db.projects.create({
    
    projectName:title,
    category:category,
    userId:req.params.id,
    description: Description

  }).then(res.status(201).json({ success: true }))
});

export default router;
