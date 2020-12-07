## SFC（単一ファイルコンポーネントとは）

* コンポーネントのHTMLとCSSとJavaSriptを1つのファイルに記述して「.vue」という独自の拡張子を付けたモジュールのこと。

* `Single File Components`の頭文字をとって「SFC」と呼ばれている。

* SFCは開発環境でのみ使える特殊なフォーマットのため、ブラウザでそのまま実行することはできない。

* SFCは`Vue CLI`をインストールして実行可能な形式に変換する必用がある。

## SFCの例(App.vue)

```
<template>
    <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    </app>
</template>

<script>
    export default {
        name : 'app' ,
        data () {
            return {
                msg : 'Welcome to Your Vue.js App'
            }

        }
    }
</script>

<style scoped>
#app {
    text-align:center;
    color : #2c3e50;
    margin-top : 60px;
}
</style>
```

  * 「export default」について
    *  ES2015をサポートするブラウザでは、`import`で別のモジュールから関数やオブジェクトを読み込むことができる。`export default`はそのモジュールが別のモジュールから呼び出された時に返すデフォルトの内容を定義する。

  * importの使用例
    ```
    ファイル名：main.js

    ※Productには連想配列オブジェクトが含まれているものとする。

    import Product from './product.js';

    // 商品名と価格をコンソールに出力
    console.log('商品名：' + Product.name + '  ' + '価格：' + Product.price);
    ```
    ```
    import文を使用した「main.js」をhtmlで読み込む場合、「type=module」をつける。

    <script src="./main.js" type="module"><script>
    ```