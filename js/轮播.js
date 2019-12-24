<script>
    // 获取全部需要的元素
    var box = document.getElementById("box");
    var screen = box.children[0];
    var ulObj = screen.children[0];
    var liList = ulObj.children;
    var olObj = screen.children[1];
    var arr = document.getElementById("arr");
    var width = screen.offsetWidth;  // 相框的宽
    var index = 0;  // 默认小按钮的索引从零开始
    var timeId;

    //  动态的生成和li数量相等的 小按钮
    for (var i = 0; i < liList.length; i++) {
        console.log(i);
        var liObj = document.createElement("li");
        // 添加下标
        liObj.innerHTML = (i + 1);
        // 添加到ol里面
        olObj.appendChild(liObj);
        // 给liObj添加属性,存储下标
        liObj.setAttribute("index", i);

        console.log("index===" + liObj.getAttribute("index"));
        // 给小按钮添加鼠标经过事件
        liObj.onmouseover = function () {

            for (var i = 0; i < olObj.children.length; i++) { // 排他去除所有按钮的 点亮状态
                olObj.children[i].className = "";
            }
            this.className = "current"; // 设置当前的小按钮点亮

            // 移动, 将图片移动到当前小按钮下标的位置
            // 设置 index 的值,为当前小按钮的下标值
            //  index= liObj.getAttribute("index");  不能这样写,因为一打开浏览器,js其实就执行完了, 这个属性,事件都已经存在下来了,
            //  于是我们在这里面只有 通过this,才能定位到当前的 小按钮
            index = this.getAttribute("index");
            console.log(index);
            animate(ulObj, -width * index);
        };

        liObj.onmouseout = function () {
            this.className = "";
        }
    }
    // 默认选中第一按钮
    olObj.children[0].className = "current";
    // 鼠标移动到 box上面 显示那两个按钮
    document.getElementById("box").onmouseover = function () {
        clearInterval(timeId);
        document.getElementById("arr").style.display = "block";
    };

    // 鼠标离开box,干掉 arr 的显示
    document.getElementById("box").onmouseout = function () {
        timeId = setInterval(rightHandler, 1000);
        document.getElementById("arr").style.display = "";
    }

    // 无缝连接需要我们第一个轮播图和最后一份完全相同,于是我们 克隆
    //  var liNode = liList.children[0].cloneNode(true);
    var liNode = ulObj.children[0].cloneNode(true);
    // 添加到 ul 尾部
    ulObj.appendChild(liNode);

    // 给做左边的小按钮绑定点击事件
    document.getElementById("right").onclick = rightHandler;

    function rightHandler() {
        console.log("index===" + index);
        console.log("width===" + width);
        index++;  // 因为第一个index==0 , 所以想移动就得 ++

        console.log("olObj.children.length-1== " + olObj.children.length);

        if (index === olObj.children.length) {  // 这是最后一个
            // index==5 我们要重置
            index = 0;
            // 到第六张图片的时候,我们应该把第五个小按钮的点亮状态给第一个小按钮
            olObj.children[olObj.children.length - 1].className = "";
            olObj.children[0].className = "current";
            // 整排图片一次性全部归位,准备重来
            ulObj.style.left = 0 + "px";
        } else {
            // 1-4 正常移动图片
            animate(ulObj, -width * index);
            for (var i = 0; i < olObj.children.length; i++) {  // 排他干掉所有的 点亮的小按钮
                // console.log("执行了!!!  i== "+i);
                olObj.children[i].className = "";
            }
            // 设置 当前图片对应的小按钮点亮
            olObj.children[index].className = "current";
        }
    }

    // 点击右边的按钮
    document.getElementById("left").onclick = function () {
        // 点击右边的小按钮,整个图片往左动,
        // 点击左边的按钮,整个图片往右动--正数
        console.log("left");
        console.log("index==" + index);

        // 如果是第一个,那么一次性移动到第六张图片,在往右移动
        if (index === 0) {
            index = olObj.children.length;
            ulObj.style.left = -width * index + "px";
        }
        index--;
        console.log("index==" + index);
        animate(ulObj, -width * index);
        // 思考: 为什么我的图片无论往左还是往右移动在 nimate里面都是负数呢?  看上面的最近的if判断,当判断为0
        // 这时我们将图片一次性的移动到了第六张的位置,往右动,远离浏览器 -index*width
        // 我们再次点击 往右移动,就是希望,整个div 离浏览器的左边远一些,是往右动  就是让left  =  -index*width 大一点 ,正好index--了  那么他们的绝对值就会变大
    }

    // 添加自动播放的效果-- 就是隔一段时间调用一次向左移动的函数
    timeId = setInterval(rightHandler, 1000);

    // 鼠标进入暂停--- 给 box 添加鼠标进入事件, 清除定时器

    // 鼠标离开继续动,就是给box 添加鼠标离开事件


    function animate(element, target) {
        clearInterval(element.timeId);
        // element 点 timeId  是给 element 添加了一个属性, 用来存 id , 以后触发定时器,得到的id复写上一个id, 这样 定时器的时间就不会被改变
        element.timeId = window.setInterval(function () {
            // 获取div的位置
            var current = element.offsetLeft;
            // div每次移动的 像素
            var step = 10;
            step = current < target ? step : -step;  // 指明从左向右,还是反向
            // 每次移动后的距离
            current += step;
            if ((Math.abs(target - current)) > Math.abs(step)) {
                // 设置目标位置
                element.style.left = current + "px";
            } else {
                window.clearInterval(element.timeId);
                // if条件不成立.直接到达目标
                element.style.left = target + "px";
            }
        }, 20);
    }


</script>