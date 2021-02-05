import { Router } from 'express';

import auth from '../middleware/auth';
import noteCtrl from '../controllers/noteCtrl';

const router = Router();

// get all notes and post all notes
router.route('/').get(auth, noteCtrl.getNotes).post(auth, noteCtrl.createNote);

router
  .route('/:id')
  .get(auth, noteCtrl.getNote)
  .put(auth, noteCtrl.updateNote)
  .delete(auth, noteCtrl.deleteNote);

export default router;
