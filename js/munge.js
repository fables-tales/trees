function production(thing) {
    var end = "";

    for (var i = 0; i < thing.length; i++) {
        if (thing[i] == "f" && thing[i+1] == "]") {
            end += "f[+f][-f]"
        } else {
            end += thing[i];
        }
    }
    return end;
}

$(document).ready(function() {
    var width = $(document).width();
    var height = $(document).height();
    canvas = "<canvas id='cv' width='" + width + "' height='" + height + "'>";
    $("#container").html(canvas);
    var ctx = $("#cv")[0].getContext("2d");
    var grammar = "f[+f][-f]"
    var angle = -90*Math.PI/180; 
    var positionX = width/2;
    var positionY = height-30;
    var distancePer = 80;
    var positionStack = [];
    var strokeWidth = 10;
    var depth = 0;
    var dangle = function() {
        return (5+Math.random()*30)*Math.PI/180;
    }
    var k = 12;
    for (var i = 0; i < k; i++) {
        grammar = production(grammar);
    }
    console.log(grammar);
    var leafpositions = [];
    for (var i = 0; i < grammar.length; i++) {
        c = grammar[i];
        if (c == "f") {
            var dx = distancePer * Math.cos(angle);
            var dy = distancePer * Math.sin(angle);
            var endX = positionX + dx;
            var endY = positionY + dy;
            ctx.beginPath();
            ctx.lineWidth = strokeWidth;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.moveTo(positionX, positionY);
            ctx.lineTo(endX, endY);
            ctx.closePath();
            ctx.stroke();
            positionX = endX;
            positionY = endY;
            if (depth + 8 >= k) {
                leafpositions.push(positionX);
                leafpositions.push(positionY);
            }
        } else if (c == "[") {
            depth++;
            strokeWidth /= 1.5;
            distancePer /= 1.2;
            positionStack.push(positionX);
            positionStack.push(positionY);
            positionStack.push(angle);
        } else if (c == "]") {
            depth--;
            strokeWidth *= 1.5;
            distancePer *= 1.2;
            angle = positionStack.pop();
            positionY = positionStack.pop();
            positionX = positionStack.pop();
        } else if (c == "+") {
            angle += dangle();
        } else if (c == "-") {
            angle -= dangle();
        }
    }
    for (var i = 1; i < leafpositions.length; i += 2) {
        var positionX = leafpositions[i-1];
        var positionY = leafpositions[i];
        for (var j = 0; j < 1; j++) {
            ctx.fillStyle = "rgb(0," + (Math.floor(Math.random()*40)+90) + ",0)"
            ctx.beginPath();  
            ctx.arc(positionX+Math.random()*8-4,positionY+Math.random()*8-4,5,0,Math.PI*2,true);
            ctx.fill();
        }
    }
});
