import { Request, Response, NextFunction } from 'express';
import { Disciplina } from '../models/Disciplina';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const createDisciplina = asyncHandler(async (req: Request, res: Response) => {
  const disciplinas = await Disciplina.insertMany(req.body);
  return res.status(201).json(disciplinas);
});

export const listDisciplinas = asyncHandler(async (req: Request, res: Response) => {
  const disciplinas = await Disciplina.find().sort('nome');
  return res.json(disciplinas);
});

export const updateDisciplina = asyncHandler(async (req: Request, res: Response) => {
  const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!disciplina) {
    return res.status(404).json({ error: 'Disciplina não encontrada' });
  }
  return res.json(disciplina);
});

export const deleteDisciplina = asyncHandler(async (req: Request, res: Response) => {
  const disciplina = await Disciplina.findByIdAndDelete(req.params.id);
  if (!disciplina) {
    return res.status(404).json({ error: 'Disciplina não encontrada' });
  }
  return res.status(204).send();
});

// Função para deletar todas as disciplinas
export const deleteAllDisciplinas = asyncHandler(async (req: Request, res: Response) => {
  await Disciplina.deleteMany({});
  return res.status(204).send();
});
