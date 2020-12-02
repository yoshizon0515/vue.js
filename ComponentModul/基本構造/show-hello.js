
// 基本
//Vue.component('show-hello', {template: '<p>Hello Vue!</p>'});

// data オプション付テンプレート
Vue.component('show-hello', {

    // テンプレート部分
    template : `<div><span> {{name}} </span> : <span> {{price}}円 </span></div>` ,
    data : function() {
        return {
            name : 'スマホケース' ,
            price : 980
        }
    }  
});

//ローカルコンポーネント。js変数にtemplateを登録し、親コンポーネントのcomponentsに登録
var myComponent = {
    template : '<p>{{name}} : {{price}} </p>' ,
    data: function() {
        return {
            // message: 'コンポーネントです。'
        }　
    } ,
    //親コンポーネントからデータを受け取る入れ物
    props : ['name', 'price']
}


// 子コンポーネントから親コンポーネントへのデータの受け渡し
// 子は親のイベントハンドラ
Vue.component('my-product', {
        template: `
            <div>
                <button v-on:click="clickHundler">値下げする</button> {{price}}円
            </div> `
            ,
        props: ['price'] ,
        methods : {
            
            clickHundler : function(){

                var discount = 0;

                // 基本50円値引き。ただし、500円以下になる場合はちょうど500円になるように値引きする。
                if((this.price -50) < 500)
                {
                    // 現在の価格が530円の場合、値下げ幅は30円
                    discount = this.price - 500;
                }
                else
                {
                    // 現在の価格が550円以上の場合、値下げ幅は50円
                    discount = 50;
                }


                // 子コンポーネントに「child-click」イベントを発生させる
                //この「'child-click'」は開発者が自由に決める、カスタムイベント
                this.$emit('child-click', discount);
            }
        }
     })