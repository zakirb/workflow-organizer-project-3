var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');


router.put('/project', (req, res, next) => {
  console.log("in the project edit path",req.body)
  Project.findOneAndUpdate(
    { "_id": req.body._id },
    { "$set": {
      "title": req.body.title,
      "description": req.body.description,
      "target_date": req.body.target_date
    }},
    {new:true},
    (err, project) => {
      if (err) {
        console.log('ERROR' + err)
      } else {
        console.log('SUCCESS EDITING PROJECT', project)
        res.json(project)
      }
    })
})

router.put('/taskstatus', (req, res, next) => {
  console.log(req.body)
  console.log('THIS IS THE DROPDOWN VALUE IN TEXT: ' + req.body.task_status)
  Project.findOneAndUpdate(
    { "tasks._id": req.body.task._id }, { "$set": {"tasks.$.task_status": req.body.task_status}}, {new:true},
    (err, project) => {
      if (err) {
        console.log('ERROR' + err)
      } else {
        console.log('SUCCESS UPDATING TASK STATUS', project)
        res.json(project)
      }
    })
});






module.exports = router
