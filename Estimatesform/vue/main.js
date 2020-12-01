
Vue.filter('number_format', function(val) {
    return val.toLocaleString();
});


// 自動見積コンポーネント
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
        opt1_use : false ,
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
            return Math.floor(untaxed * (1 + this.taxRate));
        } ,
        getDateDiff : function(bfrDateStr, aftDateStr){

            // 日付を表す文字列から日付オブジェクトを生成
            var date1 = new Date(bfrDateStr);
            var date2 = new Date(aftDateStr);
            
            // 2つの日付の差分（ミリ秒）を計算
            var msDiff = date1.getTime() - date2.getTime();

            // 求めた差分（ミリ秒）を日付に変換
            // 差分 ÷ (1000ミリ秒×60秒×60分×24時間)
            return Math.ceil(msDiff / (1000 * 60 * 60 * 24));
        } ,
        formatDate : function(dt) {

            var y = dt.getFullYear();

            var m = ('00' + (dt.getMonth() +  1)).slice(-2);
        
            var d = ('00' + dt.getDate()).slice(-2);
        
            return (y + '-' + m + '-' + d);
        }
    }  ,
    computed : {
        // 基本料金（税込）を返す算出プロパティ
        taxedBasePrice : function(){
            
            // 割増料金
            var addPrice = 0;
            // 納期までの残り日数を計算
            var dateDiff = this.getDateDiff(delivery_date.value, (new Date()).toLocaleString());

            // 割増料金を求める
            if(21 <= dateDiff && dateDiff < 30) {
                // 納期が1ヵ月未満の場合
                addPrice = this.appPrice1;
            }
            else if(14 <= dateDiff && dateDiff < 21)
            {
                // 納期が3週間未満の場合
                addPrice = this.appPrice2;
            }
            else if(7 <= dateDiff && dateDiff < 14)
            {
                // 納期が2週間未満の場合
                addPrice = this.appPrice3;
            }
            else if(3 < dateDiff && dateDiff < 7)
            {
                // 納期が1週間未満の場合
                addPrice = this.appPrice4;
            }
            else if(dateDiff == 3)
            {
                // 納期が3日後の場合
                addPrice = this.appPrice5;
            }
            else if(dateDiff == 2)
            {
                // 納期が2日後の場合
                addPrice = this.appPrice6;
            }
            else if(dateDiff == 1)
            {
                // 納期が翌日の場合
                addPrice = this.appPrice7;
            }

            // 基本料金（税込）を返す
            return this.incTax(this.basePrice + addPrice);

        } ,
        taxedOptPrice : function(){

            // オプション料金
            var optPrice = 0;

            // BGM手配
            if(this.opt1_use) { optPrice += this.opt1_price; }
            // 撮影
            if(this.opt2_use) { optPrice += this.opt2_price; }
            // DVD盤面印刷
            if(this.opt3_use) { optPrice += this.opt3_price; }
            // 写真スキャンニング
            if(this.opt4_num=='') { this.opt4_num = 0; }
            optPrice += this.opt4_num * this.opt4_price;

            //オプション料金（税込）を返す
            return this.incTax(optPrice);
        } ,

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
            return this.incTax(this.opt4_price);
        }　,
         // 合計金額（税込）を返す算出プロパティ
         taxedTotalPrice : function() {
            // 基本料金（税込）とオプション料金（税込）の合計を返す
            return (this.taxedBasePrice + this.taxedOptPrice);
         } ,
         tommorow : function(){

             var dt = new Date();

             dt.setDate(dt.getDate() + 1);

             return this.formatDate(dt);
         }
    } ,
    created : function(){

        // 今日の日付を取得
        var dt = new Date();

        //挙式の2ヵ月後の日付を設定
        dt.setMonth(dt.getMonth() + 2);

        this.wedding_date = this.formatDate(dt);

        // DVDの仕上がり予定日に、挙式日の一週間前の日付を設定
        dt.setDate(dt.getDate() - 7);

        this.delivery_date = this.formatDate(dt);

    }
});