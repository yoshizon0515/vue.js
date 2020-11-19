//数値を通貨書式「#,###,###」に変換するフィルター
Vue.filter('number_format', function(val){
    return val.toLocaleString();
});


var app = new Vue({
    el: '#app' ,
    data: {
        //「セール対象」のチェック状態(true:チェック, false:未チェック)
        showSaleItem : false ,
        //「送料無料」のチェック状態(true:チェック, false:未チェック)
        showDelvFree : false ,
        //「並び替え」の選択肢（1:標準, 2:価格が安い純）
        sortOrder : 1,
        // 商品リスト
        products : []
    } ,
     created : function(){
        // JSONPのURL
        var url = 'products.json';
        //var url = 'products.js'; jsonp用


        $.ajax({
            url : url ,
            type : 'GET' ,
            dataType : 'json' //'jsonp'
            //jsonp : 'callback' ,
           // jsonpCallback : 'products'
        })
        .done(function(data, textStatus, jqXHR){
            this.products = data;
        }.bind(this))
        .fail(function(jqXHR, textStatus, errorThrown){
            console.log('通信に失敗しました。:' + textStatus);
        })
    } , 
    watch : {
        //「セール対象」チェックボックスの状態を監視するウォッチャ
        showSaleItem : function(newVal, oldVal){
            // ここでproducts の配列を書き換える
            console.log('showSaleItemウォッチャが呼び出されました')
        } ,
        showDelvFree : function(newVal, oldVal){
            //ここでproductsの配列を書き換える
            console.log('showDelvFreeウォッチャが呼び出されました')
        }
    } ,
    computed :{
        //絞り込み後の商品リストを返す算出プロパティ
        filteredList : function(){ 
            //絞り込み後の商品リストを格納する新しい配列
            var newList = [];

            for(var i=0; i < this.products.length; i++) {
                //表示対象かどうかを判定するフラグ
                var isShow = true;
                //i番目の商品が表示対象化どうかを判定する。
                if(this.showSaleItem && !this.products[i].isSale)
                {
                    //「セール対象」チェックありで、セール対象標品ではない場合
                    isShow = false; // この商品は表示しない。
                }
                if(this.showDelvFree && this.products[i].delv > 0)
                {
                    //「セール対象」チェックありで、セール対象標品ではない場合
                    isShow = false; // この商品は表示しない。
                }
                // 表示対象の商品だけを新しい配列に追加する。
                if(isShow)
                {
                    newList.push(this.products[i]);
                }

            }

            // 新しい配列を並び変える
            if(this.sortOrder == 1)
            {
                //元の順番にpushしているので並び替え済み
            }
            else if (this.sortOrder == 2)
            {
                newList.sort(function(a, b){
                    return a.price - b.price;
                });
            }

            //絞り込み後の商品リストを返す
            return newList;
        } ,
        count : function() {
            return this.filteredList.length;
        }
    }

});