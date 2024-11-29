import { Request, Response, NextFunction } from 'express';
import { Pessoa } from '../models/Pessoa';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const createPessoa = asyncHandler(async (req: Request, res: Response) => {
  const pessoa = await Pessoa.create(req.body);
  return res.status(201).json(pessoa);
});

export const listPessoas = asyncHandler(async (req: Request, res: Response) => {
  const pessoas = await Pessoa.find().sort('nome');
  return res.json(pessoas);
});

export const updatePessoa = asyncHandler(async (req: Request, res: Response) => {
  const pessoa = await Pessoa.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!pessoa) {
    return res.status(404).json({ error: 'Pessoa não encontrada' });
  }
  return res.json(pessoa);
});

export const deletePessoa = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const pessoa = await Pessoa.findByIdAndDelete(_id);
  if (!pessoa) {
    return res.status(404).json({ error: 'Pessoa não encontrada' });
  }
  return res.status(204).send();
});

// Função para deletar todas as pessoas
export const deleteAllPessoas = asyncHandler(async (req: Request, res: Response) => {
  await Pessoa.deleteMany({});
  return res.status(204).send();
});
