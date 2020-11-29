
var app = new Vue({
    el : '#app' ,
    data : {
        // 消費税率1
        taxRate : 0.08 ,
        // 制作したいムービーの種類
        movieType : '余興ムービー' ,
        // 基本料金（税込）
        basePrice : 30000 ,
        // 納期1ヵ月前の場合の割増料金
        appPrice1 : 5000 ,
        // 納期3週間の場合の割増料金
        appPrice2 : 10000 ,
        // 納期2週間前の場合の割増料金
        appPrice3 : 15000 ,
        // 納期1週間の場合の割増料金
        appPrice4 : 20000 ,
        // 納期三日後の場合の割増料金
        appPrice5 : 40000 ,
        // 納期二日後の場合の割増料金
        appPrice6 : 45000 ,
        // 納期翌日の場合の割増料金
        appPrice7 : 50000 ,
        // オプション料金（税抜き）
        optPrice : 0 ,
        // 合計金額（税抜き）
        totalPrice : 0 ,
        // 挙式日（日付）
        wedding_date : '' ,
        // DVD仕上がり予定日(日付)
        delivery_date : '' ,
        // オプション「BGM手配」
        opt1_user : false ,
        opt1_price : 5000 ,
        // オプション「撮影」
        opt2_use : false ,
        opt2_price : 5000 ,
        // オプション「DVD盤面印刷」
        opt3_use : false ,
        opt3_price : 5000 ,
        // オプション「写真スキャンニング」
        opt4_num : 0 ,
        opt4_price : 500 
    } ,
    methods : {
        // 税込み価格算出
        incTax : function (untaxed){
            return Math.floor(untaxed * this.taxRate);
        }
    }  ,
    compted : {
        // オプション「BGM手配」の税込金額を返すプロパティ
        taxedOpt1 : function(){
            return this.incTax(this.opt1_price);
        } ,
        // オプション「撮影」の税込金額を返すプロパティ
        taxedOpt2 : function(){
            return this.incTax(this.opt2_price);
        } ,
        // オプション「DVD盤面印刷」の税込金額を返すプロパティ
        taxedOpt3 : function(){
            return this.incTax(this.opt3_price);
        }　,
        // オプション「写真スキャンニング」の税込金額を返すプロパティ
        taxedOpt4 : function(){
            return this.incTax(this.opt3_price);
        }　,
        // 基本料金（税込）を返す算出プロパティ
        texedBasePrice : function() {
            // TODO:基本料金（税込）を計算して返す
         } , 
         // オプション料金（税込）を返す算出プロパティ
         texedOptPrice  : function() {
             // TODO:オプション料金（税込）を計算して返す
         } ,
         // 合計金額（税込）を返す算出プロパティ
         texedTotalPrice : function() {
            // 基本料金（税込）とオプション料金（税込）の合計を返す
            return (this.texedBasePrice * this.texedOptPrice);
         }
    }
});