import express from 'express';
import { GetByID, Save, ValidateByName } from '../domain/services/promotion_codes.js';

const router = express.Router();

router.put('/promotion_codes/validate', ValidateByName);
router.post('/promotion_codes/', Save);
router.get('/promotion_codes/:id', GetByID);

export default router;