const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');
const som_morte = new Audio();
som_morte.src = './som/punch.wav';

let animation_frame = 0;


function fazcolisaoobstaculo(par){
    if(flappyBird.x >= par.x){
        const alturacabeçafpb = flappyBird.y;
        const alturapefpb = flappyBird.y + flappyBird.altura;
        const bocacanoceuy = par.y + canos.altura;
        const bocacanochaoy = par.y + canos.altura + canos.espacocanos;
        if (alturacabeçafpb <= bocacanoceuy){
            return true;
        }
        if(alturapefpb >= bocacanochaoy){
            return true;
        }
    
    }
    return false;
}


const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 35,
    altura: 25,
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
        flappyBird.atualizaframe();
    },
    frameatual:0,
    atualizaframe(){
        if((animation_frame % 10) === 0){
        flappyBird.frameatual = flappyBird.frameatual + 1;
        flappyBird.frameatual = flappyBird.frameatual % flappyBird.movimentos.length;
        flappyBird.spriteX = flappyBird.movimentos[flappyBird.frameatual].spriteX;
        flappyBird.spriteY = flappyBird.movimentos[flappyBird.frameatual].spriteY;
    }},
    movimentos: [
        {spriteX: 0, spriteY: 0,},
        {spriteX: 0, spriteY: 26,},
        {spriteX: 0, spriteY: 52,},
        {spriteX: 0, spriteY: 26,},
    ]
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
        contexto.drawImage(
            sprites,
            planodefundo.spriteX, planodefundo.spriteY,
            planodefundo.largura, planodefundo.altura,
            planodefundo.x + planodefundo.largura * 2, planodefundo.y,
            planodefundo.largura, planodefundo.altura,
        );
    },
    atualiza(){
        planodefundo.x = planodefundo.x - 0.5;
        if(planodefundo.x == -planodefundo.largura){
            planodefundo.x = 0
        }

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
    },
    atualiza(){
        chao.x = chao.x - 1;
        chao.x = chao.x % (chao.largura / 2);
    },
}
const canos = {
    largura: 52,
    altura: 400,
    ceu: {
        spriteX: 52,
        spriteY: 169,
        x: 120,
        y: -150,
    },
    chao: {
        spriteX: 0,
        spriteY: 169,
    },
    pares: [],
    espacocanos: 120,
    desenha(){
        for (i=0;i<canos.pares.length;i++){
            canos.ceu.x = canos.pares[i].x;
            canos.ceu.y = canos.pares[i].y;
        
        // Canos do Céu
        contexto.drawImage(
            sprites,
            canos.ceu.spriteX, canos.ceu.spriteY,
            canos.largura, canos.altura,
            canos.ceu.x, canos.ceu.y,
            canos.largura, canos.altura,
        );

        // Canos do chão
        const canochaox = canos.ceu.x;
        const canochaoy = canos.altura + canos.espacocanos + canos.ceu.y; 
        contexto.drawImage(
            sprites,
            canos.chao.spriteX, canos.chao.spriteY,
            canos.largura, canos.altura,
            canochaox, canochaoy,
            canos.largura, canos.altura
        )
    }},
    atualiza() {
        console.log("Número de obstáculos: " + canos.pares.length)
        
        for(i=0;i<canos.pares.length;i++){
            const par = canos.pares[i];
            par.x = par.x - 2;

            if(par.x +canos.largura <= 0){
                canos.pares.shift();
            }
            if(fazcolisaoobstaculo(par)){
                som_morte.play();
                telaativa = telainicio;
                return;
            }
        }
        
        const passou100frames = (animation_frame % 100 === 0);
        if(passou100frames){
            const novopar = {
                x: canvas.width,
                y: -150 * (Math.random() + 1),

            }
            canos.pares.push(novopar);
            
        }
        

        
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
        planodefundo.atualiza();
        canos.desenha();
        canos.atualiza();
        chao.desenha();
        chao.atualiza();
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
    telaativa.desenha();
    requestAnimationFrame(loop);
    animation_frame = animation_frame + 1;
}


loop();
