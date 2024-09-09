document.getElementById('formEndereco').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;

    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    
    try {
        if (!cepRegex.test(cpf)) {
            alert('Formato de CPF errado, deve ser XXXXX-XXX');
        } else {
            const response = await fetch(`https://viacep.com.br/ws/${cpf}/json/`);
            const data = await response.json();
            if (data.erro) {
                alert('CPF não encontrado');
            } else {
                logradouro = data.logradouro;
                localidade = data.localidade;
                estado = data.uf;
            }
        }
    } catch (error) {
        alert('Erro ao consultar o CPF');
    }
  
    const pessoa = {
        nome,
        cpf,
        telefone,
       
    };
  
    try {
        const response = await fetch('http://localhost:3000/pessoa/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pessoa)
        });
        const result = await response.json();
        if (response.ok) {
            alert("Pessoa criada com sucesso");
        } else {
        }
    } catch (error) {
        console.log(error);
        alert('Erro ao criar a pessoa');
    }
  });
  
  window.onload = listarPessoas;
  
  async function listarPessoas() {
    try {
        const response = await fetch('http://localhost:3000/pessoa/listar');
        if (!response.ok) {
          alert("Algum erro ao buscar as pessoas");
        }
        const pessoas = await response.json();
        const listElement = document.getElementById('pessoaList');
        listElement.innerHTML = ''; 
  
        pessoas.forEach(pessoa => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<br>
            Nome: ${pessoa.nome}<br>
            CPF: ${pessoa.cpf}<br>
            Telefone: ${pessoa.telefone}<br>`;
           
            listElement.appendChild(listItem);
        });
    } catch (error) {
        console.error(error);
        alert('Erro ao carregar a lista de pessoas');
    }
  }