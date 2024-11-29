import mongoose, { Schema, Document } from "mongoose";
import { Pessoa } from "./Pessoa";

// Interface para o documento Estudante
export interface IEstudante extends Document {
  ra: string;
  media: number;
  pessoa: mongoose.Types.ObjectId; // Referência para o modelo Pessoa
}

const EstudanteSchema = new Schema<IEstudante>({
  ra: {
    type: String,
    unique: true,
    required: [true, "RA é obrigatório"],
    validate: {
      validator: (v: string) => /^[0-9]{6}$/.test(v), // Validação do RA (apenas números)
      message: (props) => `${props.value} não é um RA válido`,
    },
  },
  media: {
    type: Number,
    min: [0, "A média mínima é 0"],
    max: [10, "A média máxima é 10"],
    required: [true, "Média é obrigatória"],
  },
  pessoa: {
    type: Schema.Types.ObjectId,
    ref: "Pessoa",
    required: [true, "A referência à pessoa é obrigatória"],
    validate: {
      validator: async (v: mongoose.Types.ObjectId) => {
        const pessoa = await Pessoa.findById(v);
        return !!pessoa;
      },
      message: "A pessoa referenciada não existe no banco",
    },
  },
});

export const Estudante = mongoose.model<IEstudante>(
  "Estudante",
  EstudanteSchema
);
