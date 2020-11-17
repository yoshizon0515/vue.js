var app = new Vue({
    el: '#app' ,
    data: {
        salecheckbox : false ,
        shippingcheckbox : false ,
        sortselect : '' ,
        items : [{
            //画像パス
            img : 'images/01.jpg' ,
            //商品名
            name : 'Michael' ,
            //カテゴリー
            category : 'スマホケース' ,
            //値段
            price : 1580 ,
            //送料
            shipping : 0 ,
            //ステータス
            status : 'SALE' ,
            //表示フラグ
            disp : true ,
            //初期のソート順
            defaultsort : 0
        } 
        , {
            img : 'images/02.jpg' ,
            name : 'Raphael' ,
            category : 'スマホケース' ,
            price : 1580 ,
            shipping : 0 ,
            status : 'SALE' ,
            disp : true ,
            defaultsort : 1
        } , {
            img : 'images/03.jpg' ,
            name : 'Gabriel' ,
            category : 'スマホケース' ,
            price : 1580 ,
            shipping : 240 ,
            status : 'SALE' ,
            disp : true ,
            defaultsort : 2
        } , {
            img : 'images/04.jpg' ,
            name : 'Uriel' ,
            category : 'スマホケース' ,
            price : 980 ,
            shipping : 240 ,
            status : 'SALE' ,
            disp : true ,
            defaultsort : 3
        } , {
            img : 'images/05.jpg' ,
            name : 'Ariel' ,
            category : 'スマホケース' ,
            price : 980 ,
            shipping : 0 ,
            status : '' ,
            disp : true ,
            defaultsort : 4
        } , {
            img : 'images/06.jpg' ,
            name : 'Azrael' ,
            category : 'スマホケース' ,
            price : 1580 ,
            shipping : 0 ,
            status : '' ,
            disp : true ,
            defaultsort : 5
        }] 
    } ,
    filters : {
        dispprice : function(price){
            return price.toLocaleString();
        }
    } ,
    methods : {
        
        filteritems : function(){
            
            var items = this.items; 

            for(item of items) {
                //割引商品以外を非表示にする
                item.disp = true;
            }

            //セール対象 チェックボックス
            if(this.salecheckbox)
            {
                for(item of items) {

                    var v = item.status === "" ? "×" : item.status; 
                    //割引商品以外を非表示にする
                    if(!(v == 'SALE')){
                        item.disp = false;
                    }
                }
            }

            // 送料無料 チェックボックス
            if(this.shippingcheckbox)
            {
                for(item of items) {
                    var v = item.shipping === "" ? "×" : item.shipping; 

                    //送料0以外の商品を非表示にする
                    if(!(v == 0)){
                        item.disp = false;
                    }
                }    
            }
        } , 
 
        // 並び替え セレクトボックス
        sortitems : function(){

            var items = this.items;
            
            switch(this.sortselect){

                //「標準」の場合
                case '1' :
                    items.sort((item1, item2) => { 
                        return  item1.defaultsort - item2.defaultsort;
                    });
                    break;
                //「価格が安い」の場合
                case '2':
                    items.sort((item1, item2) => { 
                        return  item1.price - item2.price;
                    });
                    break;
            }
        }
    } ,
    computed : {
        itemcount : function(){
            var items = this.items.filter((item) => {
                return item.disp
            });

            return items.length;
        } 
    } ,
    watch : {
        //ステータスの変化を監視するウォッチャ
        itemcount : function(){
            var items = this.items.filter((item) => {
                return item.disp
            });

            return items.length;
        } 
    }

});