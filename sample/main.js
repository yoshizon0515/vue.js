var app = new Vue({

    el : '#app' ,
    data : {
        message : 'Hello Vue!!' ,
        pos : { x : 1 , y : 2 , z : 3 }
    }
});



var Movable = function(x, y){

    this.pos = {
        x : x,
        y : y
    };

    this.move = function(x, y){

        this.pos.x += x;
        this.pos.y += y;
    };    

}


var boll = [];

for(var i=0;i<=100; i++)
{
    Math.floor(Math.random() * )
}

var boll = new Movable(5, 3);

boll.move(10, 20);

alert(boll.x + boll.y);


var app = new Vue({

    // el:コンポーネントインスタンスをどのHTMLと結びつけるかを定義
    el : '#app' ,

    // data:コンポーネントが保持するデータを定義する。
    data : {

    } ,
    
    // method : コンポーネントが持つメソッドをここに定義する。
    method : { 

    } ,

    // filters : コンポーネントが持つフィルターをここに定義する。
    filters : {

    } ,

    // watch : コンポーネントが持つウォッチャをここに定義する。
    watch : {

    }
})