import { Request, Response, NextFunction } from 'express';
import { Estudante } from '../models/Estudante';
import { Pessoa } from '../models/Pessoa';

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const createEstudante = asyncHandler(async (req: Request, res: Response) => {
  const { ra, media, pessoa } = req.body;

  // Busque a Pessoa pelo nome
  const pessoaDoc = await Pessoa.findOne({ nome: pessoa });
  if (!pessoaDoc) {
    return res.status(400).json({ error: `Pessoa '${pessoa}' não encontrada` });
  }

  // Crie o Estudante com o ObjectId da Pessoa
  const estudante = await Estudante.create({
    ra,
    media,
    pessoa: pessoaDoc._id // Usar o ObjectId da pessoa
  });

  return res.status(201).json(estudante);
});

export const listEstudantes = asyncHandler(async (req: Request, res: Response) => {
  const estudantes = await Estudante.find().populate('pessoa').sort('nome');
  return res.json(estudantes);
});

export const updateEstudante = asyncHandler(async (req: Request, res: Response) => {
  const estudante = await Estudante.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!estudante) {
    return res.status(404).json({ error: 'Estudante não encontrado' });
  }
  return res.json(estudante);
});

export const deleteEstudante = asyncHandler(async (req: Request, res: Response) => {
  const estudante = await Estudante.findByIdAndDelete(req.params.id);
  if (!estudante) {
    return res.status(404).json({ error: 'Estudante não encontrado' });
  }
  return res.status(204).send();
});

// Função para deletar todos os estudantes
export const deleteAllEstudantes = asyncHandler(async (req: Request, res: Response) => {
  await Estudante.deleteMany({});
  return res.status(204).send();
});
