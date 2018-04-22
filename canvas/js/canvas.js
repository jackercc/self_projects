var canvasWidth = 600;
var canvasHeight = canvasWidth;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;



function dragGrid() {
    context.save();

    context.strokeStyle = 'red';

    // 红色边框
    context.beginPath();
    context.moveTo(3, 3);
    context.lineTo(canvasWidth - 3, 3);
    context.lineTo(canvasWidth - 3, canvasHeight - 3);
    context.lineTo(3, canvasHeight - 3);
    context.closePath();

    context.lineWidth = 6;
    context.stroke();

    // 米子斜线
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, canvasHeight);

    context.moveTo(canvasWidth, 0);
    context.lineTo(0, canvasHeight);

    context.moveTo(canvasWidth / 2, 0);
    context.lineTo(canvasWidth / 2, canvasHeight);

    context.moveTo(0, canvasHeight / 2);
    context.lineTo(canvasWidth, canvasHeight / 2);

    context.lineWidth = 1;
    context.stroke();

    context.restore();
    
}

dragGrid();

var isMouseDown = false;
var lastLoc = {x:0,y:0};
var lastTimestamp = 0;
var lastLineWidth = -1;

// 坐标系转换
function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return {
        x: Math.round(x - bbox.left),
        y: Math.round(y - bbox.top)
    };
}
// 计算距离
function calcDistance(loc1, loc2) {
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) - (loc1.y - loc2.y) * (loc1.y - loc2.y));
}
// 计算看度
function calcLineWidth(t, s) {
    var v = s/t;

    var resultLineWidth;
    if(v <= 0.1) {
        resultLineWidth = 30;
    } else if(v >= 10) {
        resultLineWidth = 1;
    } else {
        resultLineWidth = 30 - (v-0.1)/(10-0.1)*(30-1);
    }
    if(lastLineWidth == -1) {
        return resultLineWidth;
    }
    return lastLineWidth*2/3 + resultLineWidth*1/3;
}

// 鼠标按下
canvas.onmousedown = function(e) {
    e.preventDefault();
    isMouseDown = true;

    lastLoc = windowToCanvas(e.clientX, e.clientY);
    lastTimestamp = new Date().getTime();
}
// 鼠标抬起
canvas.onmouseup = function (e) {
    e.preventDefault();
    isMouseDown = false;
}
// 鼠标移出
canvas.onmouseout = function (e) {
    e.preventDefault();
    isMouseDown = false;
}
// 鼠标移动
canvas.onmousemove = function (e) {
    e.preventDefault();
    if( isMouseDown ) {
        // 绘制
        console.log("onmousemove");
        // 获取
        var curLoc = windowToCanvas(e.clientX, e.clientY);
        // 获取当前时间
        var curTimestamp = new Date().getTime();
        // 获取一小段路程
        var s = calcDistance(curLoc, lastLoc);
        var t = curTimestamp - lastTimestamp;
        // 速度
        var lineWidth = calcLineWidth(t, s);

        // draw
        context.beginPath();
        context.moveTo(lastLoc.x, lastLoc.y);
        context.lineTo(curLoc.x, curLoc.y);

        context.strokeStyle='black';
        // 线框宽度
        context.lineWidth=lineWidth;
        // 线条平滑
        context.lineCap='round';
        context.lineJoin='round';
        
        context.stroke();
        
        
        

        lastLoc = curLoc;
        lastTimestamp = curTimestamp;
        lastLineWidth = lineWidth;
        
    }
}





















