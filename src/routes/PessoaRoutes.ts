import express from "express";
import { createPessoa, listPessoas, updatePessoa, deletePessoa, deleteAllPessoas } from "../controllers/PessoaController";

const router = express.Router();

router.post("/", createPessoa);
router.get("/", listPessoas);
router.put("/:id", updatePessoa);
router.delete("/", deletePessoa); // Atualizado para aceitar corpo da requisição
router.delete("/deleteAll", deleteAllPessoas);

export default router;
