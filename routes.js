const express = require('express');
const pessoaController = require('./controllers/PessoaController');
const router = express.Router();

router.post('/pessoa', pessoaController.createPessoa);
router.post('/pessoas/cpf/:cpf', pessoaController.createPessoaCpf);
router.get('/pessoas', pessoaController.getAllPessoas);
router.get('/pessoas', pessoaController.getPessoaByCpf);
router.put('/pessoas', pessoaController.updatePessoa);
router.delete('/pessoas', pessoaController.deletePessoa);

module.exports = router;