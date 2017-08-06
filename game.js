var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var posicaoY = 6;
var posicaoX = 6;
var py = 1;
var px = 0;
var maca = 0;
var cobra = [];
var scl = 20;


canvas.style.background = '#000';

setInterval(function(){ game(); }, 110);
window.addEventListener('keydown', keyPress, false);

function game(){

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0,canvas.width, canvas.height);


  if ( py == 1 && px == 0 && posicaoY <= scl && posicaoY >= -1 ){
    posicaoY++;
    if( posicaoY == scl){
      posicaoY = 0;
    }
  }

  if ( py == -1 && px == 0 && posicaoY <= scl && posicaoY >= -1  ){
    posicaoY--;
    if( posicaoY == -1 ){
      posicaoY = scl;
    }
  }

  if ( px == 1 && py == 0 && posicaoX <= scl && posicaoX >= -1 ){
    posicaoX++;
    if( posicaoX == scl){
      posicaoX = 0;
    }
  }

  if ( px == -1 && py == 0 && posicaoX <= scl && posicaoX >= -1 ){
    posicaoX--;
    if( posicaoX == -1 ){
      posicaoX = scl;
    }
  }


  console.log({
      altura: (posicaoY*canvas.width)/scl,
      comprimento:(posicaoX*canvas.width)/scl,
      x: posicaoX,
      y: posicaoY,
      py: py,
      px: px,
      c: cobra
    });
  ctx.fillStyle = 'red';
  //x / y / w / h
  ctx.fillRect((posicaoX*canvas.width)/scl, (posicaoY*canvas.height)/scl, scl, scl);

  if( maca == 0 ){
    var rand = Math.floor( Math.random() * scl );
    maca = rand;
  }

  ctx.fillStyle = 'green';
  //x / y / w / h
  ctx.fillRect((maca*canvas.width)/scl, (maca*canvas.height)/scl, scl, scl);
  if( (posicaoX*canvas.width)/scl == (maca*canvas.width)/scl && (posicaoY*canvas.height)/scl == (maca*canvas.height)/scl ){
    console.log("Apanhaste a maca");
    console.log(cobra);
    cobra[cobra.length] = {x: posicaoX, y: posicaoY};
    maca = 0;
  }

  for (var i = 0; i < cobra.length; i++) {
    cobra[i] = cobra[i+1];
  }

  cobra[cobra.length-1] = {x: posicaoX, y: posicaoY};

  for (var i = 0; i < cobra.length; i++) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(( cobra[i].x*canvas.width)/scl, (cobra[i].y*canvas.height)/scl, scl, scl);
  }



};

function keyPress(event){
  console.log(event.keyCode);

  switch (event.keyCode) {
    case 37 :
      py = 0;
      px = -1;
      break;
    case 38:
      py = -1;
      px = 0;
      break;
    case 39 :
      py = 0;
      px = 1;
      break;
    case 40:
      py = 1;
      px = 0;
      break;
  }
};
