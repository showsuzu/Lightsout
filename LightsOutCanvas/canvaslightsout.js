onload = function() {
  LightsOutStart();
};

/* 以下はglobal変数としてしまう */
var  size;    /* blockのサイズ(px) */
var  border;  /* blockの枠線のサイズ(px) */
var  columns; /* 列数 */
var  rows;    /* 行数 */
var  clickcount = [];  /* 各Blockの状態 */
var  lit = [];         /* 各Blockに対応した枠線の状態 */
var ctx;      /* Canvasオブジェクト */

function LightsOutStart() {
  /* 変数の初期化 */
  size = 110;
  border = 5;
  columns = 5;
  rows = 5;

  /* canvas要素のノードオブジェクト */
  canvas = document.getElementById('loarea');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  /* 2Dコンテキスト */
  ctx = canvas.getContext('2d');

  /* 四角を描く */
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(550, 0);
  ctx.lineTo(550, 550);
  ctx.lineTo(0, 550);

  ctx.closePath();
  ctx.stroke();

  /* 各BOXを描く */
/*  ctx.lineWidth = border;
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(0, 0, 110, 110);
  ctx.strokeStyle = "rgb(0, 0, 0)";
  ctx.strokeRect(0, 0, 110, 110);
*/
  for(var y = 0; y < rows; y++) {
    clickcount[y] = [];
    lit[y] = [];
    for(var x = 0; x < columns; x++){
      clickcount[y][x] = 0;    /* 各ブロックの状態をゼロに初期化 */
      lit[y][x] = 0;           /* 各枠線の状態をゼロに初期化 */
      ctx.fillStyle = '#63ffe5';
      ctx.fillRect(x*size, y*size, size, size);
      ctx.strokeStyle = '#ffffdd';
      ctx.strokeRect(x*size, y*size, size, size);
    }
  }
  canvas.addEventListener('click', clickfunc, true);
}

/* Click Evnet in Canvas area */
function clickfunc(event){
  var x = y = posx = posy = 0;
  x = event.clientX - canvas.offsetLeft;
  y = event.clientY - canvas.offsetTop;
  posx = Math.floor(x / size);
  posy = Math.floor(y / size);
  blockdisp(posx, posy);
/*
  console.log(event.clientX);
  console.log(canvas.offsetLeft);
  console.log(posx);
  console.log(x);
  console.log(event.clientY);
  console.log(canvas.offsetTop);
  console.log(posy);
  console.log(y);
*/
}

function blockdisp(x, y) {
  toggle_block(x,y);
  toggle_block(x+1,y);
  toggle_block(x,y+1);
  toggle_block(x-1,y);
  toggle_block(x,y-1);

  lit[y][x] = (lit[y][x] + 1) % 2;                  /* 枠線の状態を反転 */
  write_lit();
}

function toggle_block(x, y) {
  if(x >= 0 && x < columns && y >= 0 && y < rows) {
    clickcount[y][x] = (clickcount[y][x] + 1) % 2;    /* ブロックの状態を反転 */
    if(clickcount[y][x] == 0) {
      ctx.fillStyle = '#63ffe5';
    } else {
      ctx.fillStyle = '#ffff80';
    }
    ctx.fillRect(x*size, y*size, size, size);
  }
}

function write_lit() {
  for(var y = 0; y < rows; y++) {
    for(var x = 0; x < columns; x++){
      if(lit[y][x] == 0) {
        ctx.strokeStyle = '#ffffdd';
      } else {
        ctx.strokeStyle = '#ffccff';
      }
      ctx.strokeRect(x*size, y*size, size, size);
    }
  }
}
