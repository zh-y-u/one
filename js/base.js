//鼠标点击事件
var mouseSum = 2;

$(function(){
   $("body").click(function(e) {
       var a = new Array("蛤","s0", "暗牧安格瑞", "这是坠吼的", "无可奉告", "识得唔识得啊", "这是坠痛苦", "你们毕竟还图样" ,"你们啊naive", "提高自己的姿势水平", "不知道高到那你去", "too simple!", "闷声发大财");
       var $i = $("<span/>").text(a[mouseSum]);
       mouseSum = (mouseSum + 1) % a.length;
       var x = e.pageX,
       y = e.pageY;
       $i.css({
            "z-index": 9999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#6651ff"
       });
       $("body").append($i);
       $i.animate({/* */
            "top": y - 180,
            "opacity": 0
       },
            1500,
       function() {
           $i.remove();
       });
   });
});

// 黑色字体
// .konw{
//     background-color:black;
// };
// .konw:hover{
//
// }

$("#alink").click(function () {
    alert("软件Q171班李振宇");
});
$("#alink").click(function(){
        var item = $(this).index();  //获取索引下标 也从0开始
        var textword = $(this).text();  //文本内容
        alert("软件Q171班李振宇"); //  \n换行
    });

function myFunction()
{
    // alert("，我是一个警告框！");
    alert("软件Q171\n李振宇\n201709601005")
}
// var itemli = document.getElementById("alink");
//
// for(var i = 0; i<itemli.length; i++){
//
//     (function(n){
//
//         itemli[i].onclick = function(){
//
//             alert("下标索引值为："+n+"\n"+"文本内容是："+itemli[n].innerHTML);    //  \n换行   索引值从0开始
//
//         }
//
//     })(i)
//
// }