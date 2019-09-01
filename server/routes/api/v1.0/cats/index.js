const express = require('express');
const router = express.Router();
const {db, models} = require('../../../../models/db')
// const db = require('../../../../models/db');
// const paginate = require('../../../../lib/paginate');
// const config = require('../../../../config/config.json');

// const prefixURI =
//   process.env.APP_RUN === 'production'
//     ? config.locationProd
//     : config.locationDEV;

// const passport = require('passport');
// const auth = passport.authenticate('jwt', { session: false });


router.get('/', async (req, res) => {
  const data = await db.findAll(models.Cat)
  res.send(data)
})

router.get('/:id', async (req, res) => {
  const {params: {id}} = req
  data = await db.findById(models.Cat, id)
  res.send(data)
})

router.post('/', async (req, res) => {
  let data 
  if(req.body){
    data = await db.create(models.Cat, req.body)
  }
  res.send(data)
})

router.patch('/:id', async (req, res) => {
  const {params: {id}, body} = req
  let data 
  if(id && body){
    await db.update(models.Cat, id, body)
  }
  data = await db.findById(models.Cat, id)
  res.send(data)
})

router.delete('/:id', async (req, res) => {
  const {params: {id}} = req
  const data = await db.delete(models.Cat, id)
  res.send(data)
})



// router.get('/', function(req, res) {
//   db.gets()
//     .then(results => {
//       const len = results.length;
//       // pagination
//       if (req.query.offset) {
//         const pageNum = parseInt(req.query.offset || 0);
//         const perPage = parseInt(req.query.limit || 1);

//         if (!len) {
//           throw new Error('cats is zero size');
//         }

//         const page = paginate(results, pageNum, perPage);
//         if (page.nextPage) {
//           res.header(
//             'Link',
//             `${prefixURI}/api/v1.0/cats?offset=${
//               page.nextPage
//             }&limit=${perPage}`
//           );
//         }
//         res.header('X-Total-Count', len);
//         res.json(page.pageData);
//       } else {
//         res.json(results);
//       }
//     })
//     .catch(err => {
//       res.status(400).json({ err: err.message });
//     });
// });

// router.get('/:id', function(req, res) {
//   db.getById(req.params.id)
//     .then(results => {
//       if (results) {
//         res.json(results[0]);
//       } else {
//         res.status(404).json({ err: 'Cat not found' });
//       }
//     })
//     .catch(err => {
//       res.status(400).json({ err: err.message });
//     });
// });

// router.post('/', auth, function(req, res) {
//   db.add(req.body)
//     .then(results => {
//       res.header('Location', `${prefixURI}/api/v1.0/cats/${results._id}`);
//       res.status(201).json(results);
//     })
//     .catch(err => {
//       res.status(400).json({ err: err.message });
//     });
// });

// router.put('/:id', auth, function(req, res) {
//   db.update(req.body, req.params.id)
//     .then(results => {
//       if (results) {
//         res.json(results);
//       } else {
//         res.status(404).json({ err: 'Cat not found' });
//       }
//     })
//     .catch(err => {
//       res.status(400).json({ err: err.message });
//     });
// });

// router.delete('/:id', auth, function(req, res) {
//   db.delete(req.params.id)
//     .then(results => {
//       if (results) {
//         res.json(results);
//       } else {
//         res.status(404).json({ err: 'Cat not found' });
//       }
//     })
//     .catch(err => {
//       res.status(400).json({ err: err.message });
//     });
// });

module.exports = router;
