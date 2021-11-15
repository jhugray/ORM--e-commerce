const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    include: [ // its associated Product data
      {
        model: Product
      }
    ]
  })
    .then(tags => {
    res.json(tags);
  });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [ //its associated Product data
      {
        model: Product
      }
    ]
  })
    .then(tags => {
    res.json(tags);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tags => res.json(tags))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});



router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(tags => {
      if (!tags[0]) {
        res.status(404).json({message: 'No tag found with that ID'});
        return;
      }
      res.json(tags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tags => {
      if (!tags) {
        res.status(404).json({message: 'No tag found with that ID'});
        return;
      }
      res.json(tags);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;