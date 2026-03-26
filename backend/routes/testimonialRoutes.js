import express from 'express';
import {
  createTestimonial,
  getTestimonials,
  getAllTestimonials,
  updateTestimonialStatus,
  deleteTestimonial
} from '../controllers/testimonialController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createTestimonial)
  .get(getTestimonials);

router.route('/all')
  .get(protect, admin, getAllTestimonials);

router.route('/:id/approve')
  .put(protect, admin, updateTestimonialStatus);

router.route('/:id')
  .delete(protect, admin, deleteTestimonial);

export default router;
