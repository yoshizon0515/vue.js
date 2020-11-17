var btnLoad = document.querySelector('#load');

btnLoad.addEventListener('click', function(event){

    //Json 読み込み処理

    // 【手順1】XMLHttpRequestオブジェクトのインスタンス作成処理
    var xmlHttpRequest = new XMLHttpRequest();

    // 【手順2】 通信状態の変化を監視するイベントハンドラを設定
    xmlHttpRequest.onreadystatechange = function() {

        //レスポンスの受信が正常に完了したとき
        if(this.readyState == 4 && this.status == 200) {

            //受信したデータをコンソールに出力
            var products = this.response;

            //商品リストの子ノードを全て削除する。
            var result = document.querySelector('#result');
            result.textContent = '';

            //商品の子ノードをDOMに挿入する
            for(var row of products)
            {
                var text = '商品ID:' + row.id + ' ';
                text += '商品名:' + row.name + ' ';
                text += '料金:' + row.price + ' ';
                text += '画像パス:' + row.image + ' ';
                text += '送料:' + row.delv + ' ';
                text += 'セール対象:' + row.isSale + ' ';

                var div = document.createElement('div');
                div.textContent = text;

                result.appendChild(div);
            }
        }

        // jsonのよくある間違い
        // ・JSONファイルがUTF-8以外で保存されている。
        // ・JSONデータの[キー]がダブルクォーテーションで囲まれていない
        // ・JSONデータの[文字列データ]がダブルクォオーテーションで囲まれていない。
        // ・JSONデータの最後の配列要素に余分な","がついている。
        // ブラウザにクロスドメイン制約の適応を回避する設定ができていない。
    }

    //【手順3】レスポンスの形式を指定する。
    xmlHttpRequest.responseType = 'json';

    //【手順4】リクエストメソッドと読み込むファイルのパスを指定する。
    xmlHttpRequest.open('GET', 'products.json');

    // 【手順5】リクエストを送信する（非同期通信を開始する）
    xmlHttpRequest.send();
});