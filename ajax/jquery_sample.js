
$('#load').on('click', clickHandler);


function clickHandler (event){

    $.ajax({
        url : 'products.json' , // 通信先URL
        type : 'GET' ,          // HTTPメソッド
        dataType : 'json'       // レスポンスのデータタイプ
    })
    .done(function(data, textStatus, jqXHR){
        updateScreen(data)
    })
    .fail(function(jqXHR, textStatus, errorThrown){
        console.log('通信失敗')
    });
}


function updateScreen(products)
{
        
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