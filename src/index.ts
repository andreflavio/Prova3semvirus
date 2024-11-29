import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pessoaRoutes from "./routes/PessoaRoutes";
import estudanteRoutes from "./routes/EstudanteRoutes";
import disciplinaRoutes from "./routes/DisciplinaRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Verifica se MONGO_URI está definido
if (!process.env.MONGO_URI) {
  console.error("A variável de ambiente MONGO_URI não está configurada.");
  process.exit(1);
}

app.use(express.json());

// Função para máscara de telefone
function phoneMask(v: string | undefined): string | undefined {
  if (v == undefined) {
    return;
  }
  let r = v.replace(/\D/g, "");
  r = r.replace(/^0/, "");
  if (r.length >= 11) {
    r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (r.length > 7) {
    r = r.replace(/^(\d\d)(\d{5})(\d{0,5}).*/, "($1) $2-$3");
  } else if (r.length > 2) {
    r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
  } else if (v.trim() !== "") {
    r = r.replace(/^(\d*)/, "($1)");
  }
  return r;
}

// Conexão ao MongoDB
console.log("Tentando conectar ao MongoDB...");
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/p3tp2escola")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1); // Encerra o processo em caso de erro
  });

// Rotas
app.use("/pessoas", pessoaRoutes);
app.use("/estudantes", estudanteRoutes);
app.use("/disciplinas", disciplinaRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
