import mongoose, { Schema, Document } from "mongoose";

// Interface para o documento Disciplina
export interface IDisciplina extends Document {
  nome: string;
  curso: string;
  semestre: number;
  descricao: string;
}

const DisciplinaSchema = new Schema<IDisciplina>({
  nome: { type: String, required: [true, "Nome é obrigatório"] },
  curso: { type: String, required: [true, "Curso é obrigatório"] },
  semestre: {
    type: Number,
    min: [1, "Semestre mínimo é 1"],
    max: [10, "Semestre máximo é 10"],
    required: [true, "Semestre é obrigatório"]
  },
  descricao: { type: String, required: [true, "Descrição é obrigatória"] }
});

export const Disciplina = mongoose.model<IDisciplina>("Disciplina", DisciplinaSchema);
