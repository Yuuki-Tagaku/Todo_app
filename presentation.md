# Vue3 + Express でTypeScriptに入門（TODOアプリの作成）

## 参考教材
https://zenn.dev/is_ryo/books/10ef5a30196e16110bc1/viewer/321ac6

## 実施したこと
* 環境構築
  * Nodejs、npmのインストール
  * DB(PostgreSQL)の構築
* バックエンド(Express)の実装
  * TypeScriptをトランスパイルしてJavaScriptに変換するためにWebpackを使用
  * Routeの設計と作成(CRUD処理)
  * DBアクセスClass実装

  * バックエンドの型定義を敢えてしてみる

* フロントエンド(Vue3)の実装
  * Routeの作成
  * 作成、取得、編集、削除の処理を作成(axios)

## 実装してみての所感
* VueのほうがReactに比べて決まっていることが多いので書きやすさはある
  * Vue3.2まではHTML、処理、スタイルの順番で記載をしてコンポーネント作成をしているが、Vue3.2からはReactライクな書き方に変わっている
* ジェネリクスというものが難しい
  * 型の決定を遅延できるもの
* ReactとVueの所作の違い

***
* v-model：
  * Vue.jsのデータとHTML上のデータを連動させることができる
  * Vue.js→HTMLだけでなく、HTML→Vue.jsの双方向でデータが連動しているため、v-modelのことを「双方向データバインディング」と呼ぶ
* Vue.jsで欠かせない超便利機能「v-for」「v-bind(単方向)」についても次週使い方を学んでいきたい
  * 呼び出されたときにどの型を想定する必要があるかをコンポーネントに指示できる
  * 型を使用する場合の柔軟性が向上し、コードの再利用性が高まる