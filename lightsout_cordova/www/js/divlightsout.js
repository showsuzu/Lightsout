onload = function() {
  /* from HTML */
  /*  <div id="loarea"></div> */
  LightsOutStart();
};

/* 以下はglobal変数としてしまう */
var  size;    /* blockのサイズ(px) */
var  border;  /* blockの枠線のサイズ(px) */
var  columns; /* 列数 */
var  rows;    /* 行数 */
var  blclick = [];  /* 各Blockのクリック状態 */
var  lit = [];         /* 各Blockの背景色の状態 */

function LightsOutStart() {
  border = 5;
  columns = 5;
  rows = 5;
  /* 変数の初期化 */
  window_size_s = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;   //表示領域の短い方を選択
  var h1_obj = document.getElementById('gametitl');
  var h1_size = h1_obj.clientHeight + (h1_obj.offsetTop *2) + 50;     /* h1のサイズとマージン */
//  size = Math.floor((window.innerWidth <= window.innerHeight) ? window_size_s/5 : (window_size_s-h1_size)/5); /* Windowサイズに短い方を5(5x5のマトリクスを作りたいから)で割って、小数点以下を切り捨てた値を一つのブロックサイズとする */
  size = Math.floor((window_size_s <= h1_size) ? ((window_size_s - (border*2*5))/5) : (window_size_s-h1_size)/5); /* Windowサイズに短い方を5(5x5のマトリクスを作りたいから)で割って、小数点以下を切り捨てた値を一つのブロックサイズとする */
  console.log("WindowSize = %d , BlockSize = %d h1_hight = %d", window_size_s, size, h1_size);

  /* div要素のノードオブジェクト */
  var parent_el = document.getElementById('loarea');
  for(var y = 0; y < rows; y++) {
    blclick[y] = [];
    lit[y] = [];
//    var row_div = document.createElement('div');
//    row_div.addclass('loblock');                           /* cssのため、classを定義 */
    for(var x = 0; x < columns; x++){
      blclick[y][x] = 0;                           /* 各ブロックの状態をゼロに初期化 */
      lit[y][x] = 0;                                  /* 各枠線の状態をゼロに初期化 */
      var div = document.createElement('div');
      div.id = parent_el.id + String(y) + String(x);  /* idを loarea(y)(x) のようにする */
      div.style.width = size+"px";                        /* cssで共通化できるか？ */
      div.style.height = size+"px";
      div.style.border = 'solid';
      div.style.borderWidth = border;
      div.style.cssFloat = 'left';
      div.style.styleFloat = 'left';
      div.parent_el = parent_el;                   /* clickfunc内で他のdiv要素を操作するために、親エレメントを保持しておく *//* 結構苦労したけど、一般的なのかな？ */
      div.onmousedown = function(event){ clickfunc(event); }; /* クリックイベントを定義 */
      parent_el.appendChild(div);               /* ブロックを元のdiv要素の子要素として追加 */
      /* for DEBUG */
//      console.log(div.id);
    }
    var br = document.createElement('br');            /* x要素（横列）を作り終わったら、改行する */
    br.clear = 'all';
    parent_el.appendChild(br);
  }
  /* 全部色設定して表示する */
  for(var y = 0; y < rows; y++) {
    for(var x = 0; x < columns; x++){
      var e = document.getElementById(parent_el.id+String(y)+String(x));
      e.style.backgroundColor = (lit[y][x] == 1 ? '#ffff80' : '#63ffe5');
      e.style.borderColor = (blclick[y][x] == 1 ? '#ffccff' : '#ffffdd');
    }
  }
}

/* Click Evnet */
function clickfunc(event){
  var x = y = 0;
  var ev;
  if(event){
    ev = event.target;
  }
  if(!ev){
    ev = event.srcElement;  /* IE対策 */
  }
  if(!ev){
    return;
  }
  ev.id.match(/(.)(.)$/);       /* 正規表現を使用して、予約変数$1,$2にyとxを取り出す */
  x = Number(RegExp.$2);
  y = Number(RegExp.$1);
  /* for DEBUG */
//  console.log(x);
//  console.log(y);
  blockdisp(x, y, ev);
  chkcomp();
}

function blockdisp(x, y, ev) {
  toggle_block(x,   y,   ev);
  toggle_block(x+1, y,   ev);
  toggle_block(x,   y+1, ev);
  toggle_block(x-1, y,   ev);
  toggle_block(x,   y-1, ev);

  blclick[y][x] = (blclick[y][x] + 1) % 2;                  /* 枠線の状態を反転 */
  ev.style.borderColor = (blclick[y][x] == 1 ? '#ffccff' : '#ffffdd');
}

function chkcomp(){
  var sum = 0;
  for(var y = 0; y < rows; y++) {
    for(var x = 0; x < columns; x++){
      sum = sum + lit[y][x];
    }
  }
  if(sum == (rows * columns)){
    alert("Congrats!!\n!!Completed!!");
  }
}

function toggle_block(x, y, ev) {
  if(x >= 0 && x < columns && y >= 0 && y < rows) {
    lit[y][x] = (lit[y][x] + 1) % 2;    /* ブロックの状態を反転 */
    var parent_el = ev.parent_el;
    block = document.getElementById(parent_el.id+String(y)+String(x));      /* ここで操作するdiv要素を取得 */
    block.style.backgroundColor = (lit[y][x] == 1 ? '#ffff80' : '#63ffe5');
  }
}
