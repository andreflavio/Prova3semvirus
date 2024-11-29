import express from 'express';
import { createDisciplina, listDisciplinas, updateDisciplina, deleteDisciplina, deleteAllDisciplinas } from '../controllers/DisciplinaController';

const router = express.Router();

router.post('/', createDisciplina);
router.get('/', listDisciplinas);
router.put('/:id', updateDisciplina);
router.delete('/:id', deleteDisciplina);
router.delete('/deleteAll', deleteAllDisciplinas);

export default router;
