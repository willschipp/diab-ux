var router = require('express').Router();

var templates = {
  'nodejs':['Dockerfile_node','node-workspace-project.json'],
  'springboot':['Dockerfile_java','java-workspace-project.json']
}

router.get('/:type',function(req,res) {
  res.json(templates[req.params.type]);//send the collection back
});

router.get('/file/:name',function(req,res) {
  //stream back the content of the template
  res.status(404);//TODO -- not found
});

module.exports = router;
