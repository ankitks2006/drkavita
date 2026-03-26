import express from 'express';
import {
  createContact,
  getAllContacts,
  markContactAsRead,
  deleteContact
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createContact);

router.route('/all')
  .get(protect, admin, getAllContacts);

router.route('/:id/read')
  .put(protect, admin, markContactAsRead);

router.route('/:id')
  .delete(protect, admin, deleteContact);

export default router;
