import express from 'express';
import { createEstudante, listEstudantes, updateEstudante, deleteEstudante } from '../controllers/EstudanteController';

const router = express.Router();

router.post('/', createEstudante);
router.get('/', listEstudantes);
router.put('/:id', updateEstudante);
router.delete('/:id', deleteEstudante);

export default router;
