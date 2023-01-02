const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');
const som_morte = new Audio();
som_morte.src = './som/wasted.mp3';


const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 64,
    altura: 21,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
        flappyBird.velocidade = -flappyBird.pulo;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        );
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        if (fazcolisao()) {
            som_morte.play();
            telaativa = telainicio;
            return;
        }
        flappyBird.y = flappyBird.y + 1
        flappyBird.velocidade += flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    }
}

function fazcolisao() {
    if(flappyBird.y + flappyBird.altura > chao.y){
        return true;
    }
}

const planodefundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 205,
    x: 0,
    y: canvas.height - 205,
    desenha() {
        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY,
            planodefundo.largura, planodefundo.altura,
            planodefundo.x, planodefundo.y,
            planodefundo.largura, planodefundo.altura,
        );
        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY,
            planodefundo.largura, planodefundo.altura,
            planodefundo.x + planodefundo.largura, planodefundo.y,
            planodefundo.largura, planodefundo.altura,
        );
    }
}
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 111,
    x: 0,
    y: canvas.height - 100,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.x + chao.largura, chao.y,
            chao.largura, chao.altura,
        );
    }
}
const inicio = {
    spriteX: 130,
    spriteY: 0,
    largura: 180,
    altura: 152,
    x: 70,
    y: 70,
    desenha() {
        contexto.drawImage(
            sprites,
            inicio.spriteX, inicio.spriteY,
            inicio.largura, inicio.altura,
            inicio.x, inicio.y,
            inicio.largura, inicio.altura,
        );
    }
}
const telainicio = {
    desenha() {
        planodefundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        inicio.desenha();
    },
    click() {
        telaativa = telajogo;
    }
}

const telajogo = {
    desenha() {
        planodefundo.desenha();
        chao.desenha();
        flappyBird.desenha();
        flappyBird.atualiza();
    },
    click() {
        flappyBird.pula();
    }
}

var telaativa = telainicio;

function mudatelaativa() {
    telaativa.click();
}

window.addEventListener('click', mudatelaativa);

function loop() {
    contexto.fillStyle = '#00FFFF';
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    flappyBird.desenha();
    planodefundo.desenha();
    chao.desenha();
    telaativa.desenha();
    requestAnimationFrame(loop);
}


loop();