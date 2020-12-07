Vue.component('product-list', {
    template : `
        <div class="container">
            <product-header
                v-bind:count="filteredList.length"
                v-bind:showSaleItem="showSaleItem"
                v-bind:showDelvItem="showDelvFree"
                v-bind:sortOrder="sortOrder"
                v-on:showSaleItemChanged="showSaleItem = !showSaleItem"
                v-on:showDelvFreeChanged="showDelvFree = !showDelvFree"
                v-on:sortOrderChanged="sortOrderChanged"
            >
            </product-header>
            <div class="list">
                <product
                    v-for="product in filteredList"
                    v-bind:product="product"
                    v-bind:key="product.id"
                >
                </product>
            </div>
        </div>
    ` ,
    components : {
        'product-header': productHeader ,
        'product' : product
    } ,
    props : ['products'] ,
    data : function() {
        return {
            // 「セール対象」チェック状態(true:チェック有、false: チェックなし)
            showSaleItem : false ,
            // 「送料無料」チェック状態(true:チェック有、false: チェックなし)
            showDelvFree : false ,
            // 「並び替え」の選択肢（1:標準、2:価格が安い順）
            sortOrder : 1
         }
    } ,
    methods : {
        // 「並び替え」の選択肢が変わったときに呼び出されるメソッド
        sortOrderChanged : function(order) {
            // 現在の選択肢を新しい選択肢で上書きする
            this.sortOrder = order;
        }
    } ,
    computed : {

        // 絞り込み後の商品リストを返す算出プロパティ
        filteredList : function () {
            //絞り込み後の商品リストを格納する新しい配列
            var newList = [];
            for(var i=0; i<this.products.length; i++) {
                // 表示対象かどうかを判定するフラグ
                var isShow = true;
                // i番目の商品が表示対象かどうかを判定する。
                if( this.showSaleItem && !this.products[i].isSale) {
                    // 「セール対象」チェック有で、セール対象商品ではない場合
                    isShow = false; // この商品は表示しない
                }

                // 送料無料 チェック済み、かつ送料が0以上の場合
                if(this.showDelvFree && this.products[i].delv > 0) {
                    //非表示
                    isShow = false;
                }

                // 表示対象の商品だけを新しい配列に追加する
                if(isShow) {
                    newList.push(this.products[i])
                }
            }

            // 配列のソート
            if(this.sortaOrder == 1) {
                // 元の配列通りにpushしているので並び替え済み
            }
            else if(this.sortOrder == 2) {
                // 価格が安い順に並び変える
                newList.sort((a, b) => { return a.price - b.price})
            }
            // ソート後の配列を返す。
            return newList;
        }
    }
})