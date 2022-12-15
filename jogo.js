// Aqui teremos a programação do Flappy Bird :D
const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('#game-canvas');
const contexto = canvas.getContext('2d');



const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 64,
    altura: 21,
    x: 10,
    y: 50,
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY,
                flappyBird.largura, flappyBird.altura,
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
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

function loop(){
    contexto.fillStyle = '#00FFFF';
    contexto.fillRect(0,0, canvas.width, canvas.height)
    flappyBird.desenha();
    planodefundo.desenha();
    requestAnimationFrame(loop);
}

loop();