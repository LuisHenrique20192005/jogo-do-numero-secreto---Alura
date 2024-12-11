let listaDeNumerosSorteados = []; //A função dela é não repetir números já sorteados
let numeroLimite = 10; //Limite de números na lista
let numeroSecreto = gerarNumeroAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
        if(chute == numeroSecreto){
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        }else{ 
        
        if(chute < numeroSecreto){
            exibirTextoNaTela('h1', 'Resposta errada!');
            exibirTextoNaTela('p', `O número é maior que ${chute}`);
        }else{
            exibirTextoNaTela('h1', 'Resposta errada!');
            exibirTextoNaTela('p', `O número é menor que ${chute}`);
        } tentativas++
        limpaCampo();
    }
    
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length
    if(quantidadeDeElementosDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio()
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido)
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido
    }
}



function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limpaCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function limpaCampo(){
    chute = document.querySelector('input')
    chute.value = '';
}


