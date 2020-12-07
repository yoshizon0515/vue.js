var app = new Vue({
    el: '#app' ,
    data: {
        products : [
            { id: 1 , name: 'Raphael<br>スマホケース', price : 1580, image: 'images/01.jpg' , delv: 0 , isSale: true } ,
            { id: 2 , name: 'Michael<br>スマホケース', price : 1580, image: 'images/02.jpg' , delv: 0 , isSale: true } , 
            { id: 3 , name: 'Gabriel<br>スマホケース', price : 1580, image: 'images/03.jpg' , delv: 240 , isSale: true } , 
            { id: 4 , name: 'Uriel<br>スマホケース', price : 980, image: 'images/04.jpg' , delv: 240 , isSale: true } , 
            { id: 5 , name: 'Ariel<br>スマホケース', price : 980, image: 'images/05.jpg' , delv: 0 , isSale: false } ,
            { id: 6 , name: 'Azrael<br>スマホケース', price : 980, image: 'images/06.jpg' , delv: 0 , isSale: false }
        ] 
    } 
    
    
    ,
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