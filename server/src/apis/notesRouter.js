import { Router } from 'express';

const router = Router();

// get all notes and post all notes
router
  .route('/')
  .get((req, res) => {
    res.json({
      msg: 'Get All notes notes',
    });
  })
  .post();

router.route('/:id').get().put().delete();

export default router;
