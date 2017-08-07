///////////////////////////////////
//  @autor: juliogomes26297
//  @versao: 1.0
//  @06-08-2017
//////////////////////////////////


//vai buscar o object html 'Canvas'
var canvas  = null;
//vai buscar context 2d do canvas
var ctx     = null;
//Teclas de Controle
var keys    = {
  y: -1, x: 0
};
//Posicao da cobra
var snake   = {
  y: 5,
  x: 9,
  tail: [],
  eat: 0
}
//Posicao aleatoria da maca
var randomLocation = 0;

var options = {
  cvW: 400,
  cvH: 400,
  scl: 20,
  time: 80
}

function setup(){

  //vai buscar o object html 'Canvas'
  canvas = document.getElementById(options.canvasID);
  //vai buscar context 2d do canvas
  ctx = canvas.getContext('2d');
  //muda a cor de fundo do canvas
  canvas.style.background = '#000';

  canvas.width = options.cvW;
  canvas.height = options.cvH;

  window.addEventListener('keydown', keyPress, false);


}

function start( opt = {} ){


  if( opt.hasOwnProperty('canvasID') && document.getElementById(opt.canvasID) ){

    gameOptions(opt);
    //chama a funcao setup
    setup();
    //chama a funcao drawLoop a cada o tempo inserido neste caso e de 1s
    setInterval(function(){
      drawLoop();
    }, options.time);
  }else{
    alert('Necesita do ID do Canvas!');
  }

}

function drawLoop(){

  //limpa o cavas para nao se ver os outro 'FillRects'
  ctx.fillStyle = canvas.style.background;
  ctx.fillRect( 0, 0, canvas.width, canvas.height);

  positionSnake(keys.y, keys.x);
  createSnake();
  createApple();

  //otherFunny();

}

function positionSnake(keyY, keyX){
  //caso apertar seta para cima
  if( keyY == 1 && keyX == 0 ){
    snake.y--;
    //caso a cobra for menor ou maior que o tamanho do canvas
    if( snake.y == -1){
      snake.y = (canvas.height/options.scl) - 1;
    }
  }
  //caso apertar seta para baixo
  if( keyY == -1 && keyX == 0 ){
    snake.y++;
    //caso a cobra for menor ou maior que o tamanho do canvas
    if( snake.y == (canvas.height/options.scl) ){
      snake.y = 0;
    }
  }
  //caso apertar seta para esquerda
  if( keyY == 0 && keyX == -1 ){
    snake.x--;
    //caso a cobra for menor ou maior que o tamanho do canvas
    if( snake.x == -1 ){
      snake.x = (canvas.width/options.scl) - 1;
    }
  }
  //caso apertar seta para direita
  if( keyY == 0 && keyX == 1 ){
    snake.x++;
    //caso a cobra for menor ou maior que o tamanho do canvas
    if( snake.x == (canvas.width/options.scl) ){
      snake.x = 0;
    }
  }
}

function createSnake(){
  //criar a 'cabeca' da cobra
  ctx.fillStyle = 'green';
  ctx.fillRect( (snake.x*canvas.width)/(canvas.width/options.scl), (snake.y*canvas.height)/(canvas.height/options.scl), options.scl, options.scl );

  //caso ele passe por cima da maca
  if( (snake.x*canvas.width)/(canvas.width/options.scl) == (randomLocation*canvas.width)/(canvas.width/options.scl) && (snake.y*canvas.height)/(canvas.height/options.scl) == (randomLocation*canvas.height)/(canvas.height/options.scl) ){
    snake.eat = 1;
    snake.tail[ snake.tail.length ] = {y: snake.y, x: snake.x};
  }

  //Muda a posicao de cada tail[]
  for (var i = 0; i < snake.tail.length; i++) {
    snake.tail[i] = snake.tail[i+1];
  }

  //cria um index vazio no tail
  snake.tail[snake.tail.length-1] = {y: snake.y, x: snake.x};

  //Cria o comprimento da cobra
  for (var i = 0; i < snake.tail.length; i++) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(( snake.tail[i].x*canvas.width)/(canvas.width/options.scl), (snake.tail[i].y*canvas.height)/(canvas.height/options.scl), options.scl, options.scl );
  }

}


function createApple(){
  //caso cobra comer ele criar outra maca como uma posicao aleatoria
  if( snake.eat ){
    randomLocation = Math.floor( Math.random() * (canvas.width/options.scl)  );
    snake.eat = 0;
  }

  ctx.fillStyle = 'red';
  ctx.fillRect( (randomLocation*canvas.width)/(canvas.width/options.scl), (randomLocation*canvas.height)/(canvas.height/options.scl), options.scl, options.scl );

}


function gameOptions(opt){

  if( opt.hasOwnProperty('time') ){
    options.time = opt.time;
  }

  if( opt.hasOwnProperty('scl') ){
    options.scl = opt.scl;
  }

  if( opt.hasOwnProperty('canvasW') && !opt.hasOwnProperty('canvasH') ){
    options.cvW = opt.canvasW;
    options.cvH = opt.canvasW;
  }

  if( !opt.hasOwnProperty('canvasW') && opt.hasOwnProperty('canvasH') ){
    options.cvW = opt.canvasH;
    options.cvH = opt.canvasH;
  }

  if( opt.hasOwnProperty('canvasW') && opt.hasOwnProperty('canvasH') ){
    options.cvW = opt.canvasW;
    options.cvH = opt.canvasH;
  }

  options.canvasID = opt.canvasID;


}

function keyPress(event){

  //Controle de teclas
  switch (event.keyCode) {
    //seta para esquerda
    case 37 :
      keys.y = 0;
      keys.x = -1;
      break;
    //seta para cima
    case 38:
      keys.y = 1;
      keys.x = 0;
      break;
    //seta para direita
    case 39 :
      keys.y = 0;
      keys.x = 1;
      break;
    //seta para baixo
    case 40:
      keys.y = -1;
      keys.x = 0;
      break;
  }
}



function otherFunny(){
  canvas.style.background = 'rgb('+ (snake.y*15) +', ' + (snake.x*15) + ', ' + (snake.y*snake.x) + ')';
}
