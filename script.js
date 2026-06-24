// 1. Capturando os elementos da tela
const campoSenha = document.getElementById('senha');
const botaoMenos = document.getElementById('botao-menos');
const botaoMais = document.getElementById('botao-mais');
const tamanhoTexto = document.getElementById('tamanho-texto');

// Capturando os checkboxes
const chkMaiusculas = document.getElementById('maiusculas');
const chkMinusculas = document.getElementById('minusculas');
const chkNumeros = document.getElementById('numeros');
const chkSimbolos = document.getElementById('simbolos');

// Capturando os elementos da Barra de Força
const barraBloco = document.querySelector('.barra-forca__bloco');
const legendas = document.querySelectorAll('.barra-forca__legendas .legenda');

// 2. Bancos de caracteres para a senha
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

let tamanhoSenha = 12;

// 3. Função para atualizar o visual da barra de força
function atualizarBarraForca() {
    // Conta quantos tipos de caracteres foram marcados
    let tiposMarcados = 0;
    if (chkMaiusculas.checked) tiposMarcados++;
    if (chkMinusculas.checked) tiposMarcados++;
    if (chkNumeros.checked) tiposMarcados++;
    if (chkSimbolos.checked) tiposMarcados++;

    // Remove as cores antigas da barra
    barraBloco.classList.remove('fraca', 'media', 'forte');
    
    // Apaga o destaque de todas as legendas de texto
    legendas.forEach(legenda => legenda.classList.remove('status-ativa'));

    // Regra para definir a força baseado no tamanho e nos tipos de caracteres
    if (tamanhoSenha >= 12 && tiposMarcados >= 3) {
        // FORTE (Verde)
        barraBloco.classList.add('forte');
        legendas[2].classList.add('status-ativa'); // Ativa o texto "Forte"
    } else if (tamanhoSenha >= 8 && tiposMarcados >= 2) {
        // MÉDIA (Amarela)
        barraBloco.classList.add('media');
        legendas[1].classList.add('status-ativa'); // Ativa o texto "Média"
    } else {
        // FRACA (Vermelha)
        barraBloco.classList.add('fraca');
        legendas[0].classList.add('status-ativa'); // Ativa o texto "Fraca"
    }
}

// 4. Função principal que gera a senha aleatória
function gerarSenha() {
    let caracteresDisponiveis = "";
    let senhaGerada = "";

    if (chkMaiusculas.checked) caracteresDisponiveis += letrasMaiusculas;
    if (chkMinusculas.checked) caracteresDisponiveis += letrasMinusculas;
    if (chkNumeros.checked) caracteresDisponiveis += numeros;
    if (chkSimbolos.checked) caracteresDisponiveis += simbolos;

    if (caracteresDisponiveis === "") {
        campoSenha.value = "";
        barraBloco.classList.remove('fraca', 'media', 'forte');
        legendas.forEach(legenda => legenda.classList.remove('status-ativa'));
        return;
    }

    for (let i = 0; i < tamanhoSenha; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresDisponiveis.length);
        senhaGerada += caracteresDisponiveis[indiceAleatorio];
    }

    campoSenha.value = senhaGerada;
    
    // Chama a função para mudar a cor da barra
    atualizarBarraForca();
}

// 5. Eventos dos botões
botaoMenos.addEventListener('click', () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

botaoMais.addEventListener('click', () => {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        tamanhoTexto.textContent = tamanhoSenha;
        gerarSenha();
    }
});

// 6. Ouvintes para os Checkboxes
chkMaiusculas.addEventListener('change', gerarSenha);
chkMinusculas.addEventListener('change', gerarSenha);
chkNumeros.addEventListener('change', gerarSenha);
chkSimbolos.addEventListener('change', gerarSenha);

// 7. Gera a senha inicial
gerarSenha();
