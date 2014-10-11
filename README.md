Lightsout
=========

This repository is the source code of Lightsout, that have created for my training of Javascript.


Javascriptでライツアウトを作成
=========================

canvasを使用したケースと、div要素で使用したケースの2通りを作成。
一般的な５ｘ５のケースのみを作成した。


##Javascriptで、div要素を使用したケース

* LightsOutDivフォルダ
 * ソースは、以下のHTMLとJavascriptの２ファイルのみ
 * index.html
 * divlightsout.js

* 特に工夫したポイントはないが、ロード時に使用できるWindowサイズに応じて、各ブロックのサイズを決定した。

##Javascriptで、canvasを操作して作成したケース

* LightsOutCanvasフォルダ
 * ソースは、同様に以下のHTMLとJavascriptの２ファイルのみ
 * index.html
 * canvaslightsout.js

* divを使用したケースに比べて、画面をスクロールした場合にクリックしたブロックの位置計算が困難。おそらく、自分の力量不足だが、divに比べて、作りにくいと感じた。

##Cordova を用いてハイブリッドアプリを作成したケース(Javascriptで、div要素を使用)

* lightsout_cordovaフォルダ
 * ソースは、LightOutDivを元に、Cordova用に変更
 * cordova createで作成された、index.html、index.cssに若干の修正を行う
 * index.html
 * js/divlightsout.js

* 画面サイズの合わせ込みがNexus5の現物合わせになってしまった。

