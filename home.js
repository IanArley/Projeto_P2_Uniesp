function cadastrar() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (email === '' || senha === '') {
        alert("Por favor, preencha ambos os campos de email e senha.");
    } else {
        var cadastrosAntigos = JSON.parse(localStorage.getItem("cadastros")) || [];
        var cadastroExistente = cadastrosAntigos.find(cadastro => cadastro.email === email);

        if (cadastroExistente) {
            alert("Este email já foi cadastrado.");
        } else {
            var novoCadastro = { email: email, senha: senha };
            cadastrosAntigos.push(novoCadastro);

            localStorage.setItem("cadastros", JSON.stringify(cadastrosAntigos));

            alert("Cadastro realizado com sucesso!");
        }
    }
}

function realizarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    if (email === '' || senha === '') {
        alert("Por favor, preencha ambos os campos de email e senha.");
    } else {
        realizarAutenticacao(email, senha)
            .then(usuarioAutenticado => {
                if (usuarioAutenticado) {
                    localStorage.setItem("userEmail", email);

                    alert("Login bem-sucedido!");
                    window.location.href = "contato.html";
                } else {
                    alert("Email ou senha incorretos. Tente novamente.");
                    exibirAviso("Email ou senha incorretos. Se não tiver cadastro, clique <a href='index.html'>aqui</a> para se cadastrar.");
                }
            })
            .catch(error => {
                console.error("Erro ao realizar a autenticação:", error);
            });
    }
}

function verificarLogin() {
    var userEmailElement = document.getElementById("userEmail");
    var userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        userEmailElement.textContent = "Usuário logado: " + userEmail;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    verificarLogin();
    exibirMensagensRecebidas();

    var userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
        var userEmailElement = document.getElementById("userEmail");
        userEmailElement.textContent = "Email logado: " + userEmail;
    }
});

function exibirAviso(mensagem) {
    var avisoElement = document.getElementById("aviso");
    avisoElement.innerHTML = mensagem;
    avisoElement.style.display = "block";
}

function realizarAutenticacao(email, senha) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros")) || [];
            var usuarioAutenticado = usuariosCadastrados.find(usuario => usuario.email === email && usuario.senha === senha);
            resolve(usuarioAutenticado !== undefined);
        }, 1000);
    });
}

function enviarMensagem() {
    var remetente = document.getElementById("nome").value;
    var destinatario = document.getElementById("destinatario").value;
    var mensagem = document.getElementById("mensagem").value;

    if (remetente === '' || destinatario === '' || mensagem === '') {
        alert("Por favor, preencha todos os campos.");
    } else {
        var usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros")) || [];
        var destinatarioExistente = usuariosCadastrados.find(usuario => usuario.email === destinatario);

        if (destinatarioExistente) {
            var mensagensAntigas = JSON.parse(localStorage.getItem("mensagens")) || [];

            var novaMensagem = { remetente: remetente, destinatario: destinatario, mensagem: mensagem };
            mensagensAntigas.push(novaMensagem);
e
            localStorage.setItem("mensagens", JSON.stringify(mensagensAntigas));

            alert("Mensagem enviada com sucesso!");
        } else {
            alert("O destinatário não está cadastrado. Por favor, verifique o email.");
        }
    }
}

function exibirMensagensRecebidas() {
    var mensagensList = document.getElementById('mensagensList');
    var mensagensArmazenadas = JSON.parse(localStorage.getItem('mensagens')) || [];
    exibirMensagens(mensagensArmazenadas, mensagensList);
}

function verMensagens() {
    var userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        var mensagensList = document.getElementById('mensagensList');
        var mensagensArmazenadas = JSON.parse(localStorage.getItem('mensagens')) || [];
        var mensagensDoUsuario = mensagensArmazenadas.filter(mensagem => mensagem.destinatario === userEmail);
        exibirMensagens(mensagensDoUsuario, mensagensList);
    }
}

// Função auxiliar para exibir mensagens na lista
function exibirMensagens(mensagens, element) {
    if (mensagens.length > 0) {
        element.innerHTML = '<ul>';
        mensagens.forEach(function (mensagem) {
            element.innerHTML += `<li><strong>Remetente:</strong> ${mensagem.remetente}<br><strong>Mensagem:</strong> ${mensagem.mensagem}</li>`;
        });
        element.innerHTML += '</ul>';
    } else {
        element.innerHTML = '<p>Nenhuma mensagem recebida.</p>';
    }
}
