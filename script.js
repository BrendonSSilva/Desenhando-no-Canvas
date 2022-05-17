//initial data
let currentColor = 'black'
let canDraw = false
let mouseX = 0
let mouseY = 0

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

//marcar cor selecionada
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

// passo a passo para desenhar no canvas:
// - quando clicar com o mouse, ativar o modo desenho.
// - quando o mouse se mover, se o modo desenho estiver ativado, desenhe.
// - quando soltar o clique do mouse, desativar o modo desenho.
screen.addEventListener('mousedown', mouseDownEvent);
        //enquanto estiver com o clique do mouse ativo
screen.addEventListener('mousemove', mouseMoveEvent);
        //enquanto estiver movendo o mouse com o clique ativo 
screen.addEventListener('mouseup', mouseUpEvent);
        //soltar o clique do mouse
document.querySelector('.clear').addEventListener('click', clearScreen)


//functions
//cor selecionada
function colorClickEvent(e) {
    //defino as cores pelos atributos definidos no HTML
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

//click do mouse ativo
function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

//clique do mouse ativo
function mouseMoveEvent(e) {
    if (canDraw) {
        //em quais direções irá executar o evento
        draw(e.pageX, e.pageY);
    }
}

//clique do mouse foi solto
function mouseUpEvent() {
    canDraw = false;
}

//função desenhar 
function draw(x, y) {
    //pega a posição do mouse na tela 
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    //começar o desenho    
    ctx.beginPath();
    //defino a grossura da linha
    ctx.lineWidth = 9;
    //defino se o formato da linha vai ser quadrado, circular...
    ctx.lineJoin = 'round';
    //mover o cursor
    ctx.moveTo(mouseX, mouseY);
    //fazer uma linha até os pontos x e y
    ctx.lineTo(pointX, pointY);
    //já foi desenhada toda a linha, agora fecha o desenho
    ctx.closePath();
    //finaliza o desenho, escolhendo a cor da linha
    ctx.strokeStyle = currentColor;
    //finaliza todo o processo
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    //seta a posição geral, zerando o cursor e o processo de desenho
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    //função que limpa tudo. começa na posição 0 até a posição 0.
    //vai limpar desde a posição zero até o fim da largura e da altura
    //os 2 primeiros valores define para quanto irá mudar. os 2 últimos valores definem onde vão ser aplicados os 2 primeiros
    ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height)
}
