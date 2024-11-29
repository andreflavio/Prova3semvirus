import mongoose, { Schema, Document } from "mongoose";

// Array com os DDDs válidos no Brasil
const ddds = [
  11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
  37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64,
  65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
  89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
];

// Interface para o documento Pessoa
export interface IPessoa extends Document {
  nome: string;
  idade: number;
  email: string;
  fone: string;
}

const PessoaSchema = new Schema<IPessoa>({
  nome: { type: String, required: [true, "Nome é obrigatório"] },
  idade: {
    type: Number,
    required: [true, "Idade é obrigatória"],
    min: [14, "Idade mínima é 14"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true,
    validate: {
      validator: (v: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) &&
        /@(etec|fatec|cps)\.sp\.gov\.br$/.test(v),
      message: (props) =>
        `${props.value} não é um e-mail válido. Deve conter @etec, @fatec ou @cps e sufixo .sp.gov.br`,
    },
  },
  fone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    validate: {
      validator: (v: string) =>
        /^[0-9]{10,11}$/.test(v) && ddds.includes(parseInt(v.substring(0, 2))),
      message: (props) =>
        `${props.value} não é um número de telefone válido. Deve conter DDD válido`,
    },
  },
});

export const Pessoa = mongoose.model<IPessoa>("Pessoa", PessoaSchema);
