var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var y = 210
var charSize = 10;
var x = 20;
var side = 0;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var grav = 9;
var jump = 0;
var shootCheck = false;
var collisionR = true;
var collisionL = true;
var collisionD = 1;
var counter = 1;
var LR = 5;
var spacePressed = false;
var debounce = true;
var jumpDebounce = true;
var counter2 = 0;
var RDetect = true;
var LDetect = true;
var DDetect = true;
var clickX = 0;
var clickY = 0;
var gravit = 1;
var reverse = false;
var jumpVal = -18;
var gravVal = 1;
var buttonPressed = false;
var DoorLen = 50;
var level = 0;
var count = 0;
var defaultX = 0;
var defaultY = 0;
var defaultOrient = 1;
var deathCount = 0;
var Count = 0;
var plats = [
  [-1, -1, -1, -1, -1, 0, 0],
  [-1, -1, -1, -1, -1, 0, 0],
  [-1, -1, -1, -1, -1, 0, 0],
];
var proPos = [
  [-1, -1, 0],
  [-1, -1, 0],
  [-1, -1, 0],
  [-1, -1, 0]
];
var mobs = [
  [-1, -1, 0, 0],
  [-1, -1, 0, 0],
  [-1, -1, 0, 0],
  [-1, -1, 0, 0]
];


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", getClickPosition, false);

function getClickPosition(e) {
 

}


function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
    LR = 10;

  } else if (e.keyCode == 37) {
    leftPressed = true;
    LR = -10;

  }
  if (e.keyCode == 38) {
    upPressed = true;

  }
  if (e.keyCode == 32) {
    spacePressed = true;
    //grav = -grav;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;

  } else if (e.keyCode == 37) {
    leftPressed = false;

  }
  if (e.keyCode == 38) {
    upPressed = false;
  }
  if (e.keyCode == 32) {
    spacePressed = false;
  }
}


function colDetect(a, b, c, d, f, e, g) {
  if (e + g > b && e + g < b + d) {
    if (f + g > a && f + g < a + c) {
      RDetect = false;
      return false;

    }
    if (f + g > a && f + g < a + c) {
      LDetect = false;
      return false;
    }
  }
  if (f + g > a && x < a + c) {
    if (e + g > b && y + charSize < b + d) {
      DDetect = false;
      return false;
    }
  }
  return true;
}


function drawChar() {
  ctx.beginPath();
  ctx.arc(x, y, charSize, 0, 2 * Math.PI);
  ctx.fillStyle = "#8A2BE2";
  ctx.fill();
  ctx.closePath();
}

function launch() {
  proPos[counter % 4][0] = x;
  proPos[counter % 4][1] = y;
  proPos[counter % 4][2] = LR;
  counter++;
}

function sustain() {
  for (var Q = 0; Q < 4; Q++) {
    if (proPos[Q][0] != -1) {
      proPos[Q][0] += proPos[Q][2];

      ctx.beginPath();
      ctx.arc(proPos[Q][0], proPos[Q][1], 3, 0, 2 * Math.PI);
      ctx.fillStyle = "#00FF00";
      ctx.fill();
      ctx.closePath();
    }

  }

}

function spawnMob(r, t) {
  mobs[counter % 4][0] = r;
  mobs[counter % 4][1] = t;
  mobs[counter % 4][2] = 3;
  mobs[counter % 4][3] = 0;
  counter++;
}

function animateMob() {
  for (var gt = 0; gt < 4; gt++) {
    if (mobs[gt][0] != -1) {

      ctx.beginPath();
      ctx.rect(mobs[gt][0], mobs[gt][1], c, d);
      ctx.fillStyle = "#FF0000";
      ctx.fill();
      ctx.closePath();
    }
  }
}

function addSpikes(xs, ys, length, direction) {
  length = length - length % 8;

  if (direction == 1) {


    var xlen = xs + length;
    var ylen = ys + 5;
    for (var Z = 0; Z < length / 8; Z++) {
      ctx.beginPath();
      ctx.moveTo(xs + Z * 8, ys);
      ctx.lineTo(xs + Z * 8 + 8, ys);
      ctx.lineTo(xs + Z * 8 + 4, ys - 20);
      ctx.fill();
    }

    ys = ys - 20;
  }
  if (direction == 2) {
    var xlen = xs + length;
    var ylen = ys + 20;

    for (var Z = 0; Z < length / 8; Z++) {
      ctx.beginPath();
      ctx.moveTo(xs + Z * 8, ys);
      ctx.lineTo(xs + Z * 8 + 4, ys + 20);
      ctx.lineTo(xs + Z * 8 + 8, ys);
      ctx.fill();
    }
  }
  if (y > ys && y < ylen) {
    if (x + charSize > xs && x + charSize < xlen) {
      dead();
    }
    if (x - charSize > xs && x - charSize < xlen) {
      dead();
    }
  }
  if (!reverse) {
    if (x > xs - 10 && x < xlen + 10) {
      if (y + charSize > ys && y + charSize < ylen) {
        dead();
      }
    }
  } else {
    if (x > xs - 10 && x < xlen + 10) {
      if (y - charSize > ys && y - charSize < ylen) {
        dead();
      }
    }
  }
}

function dead() {
  if (defaultOrient == 1) {
    buttonPressed = false;
    gravit = 1;
    reverse = false;
    jumpVal = -18;
    gravVal = 1;

  } else {
    buttonPressed = false;
    gravit = -1;
    reverse = true;
    jumpVal = 18;
    gravVal = -1;
  }
  x = defaultX;
  y = defaultY;
  jump = 0;
  deathCount++;
}

function addButton(a, b, c, d, e) {
  if (buttonPressed) {

    var buttHght = 5;
  } else {
    doorLen = 100;
    var buttHght = 0;
  }



  if (buttonPressed && doorLen >= 0) {
    doorLen -= 5;
  }
  if (e == 1) {
    ctx.beginPath();
    ctx.rect(a, b + buttHght, 10, 9 - buttHght);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
  } else {
    ctx.beginPath();
    ctx.rect(a, b, 10, 9 - buttHght);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
  }

  addEnviro(c, d, 20, doorLen);
  ctx.beginPath();
  ctx.rect(c, d, 20, doorLen);
  ctx.fillStyle = "#00FF00";
  ctx.fill();
  ctx.closePath()

  if (y > b && y < b + 10) {
    if (x + charSize + 5 > a && x + charSize + 5 < a + 10) {
      buttonPressed = true;
    }
    if (x - charSize - 5 > a && x - charSize - 5 < a + 10) {
      buttonPressed = true;
    }
  }
  if (!reverse) {
    if (x > a - 10 && x < a + 10 + 9) {
      if (y + charSize > b && y + charSize < b + 9) {
        buttonPressed = true;
      }
    }
  } else {
    if (x > a - 10 && x < a + 10 + 9) {
      if (y - charSize > b && y - charSize < b + 9) {
        buttonPressed = true;
      }
    }
  }
}

function addMovingEnviro(a, b, len, start, finish, ) {
  plats[count % plats.length][0] = a;
  plats[count % plats.length][1] = b;
  plats[count % plats.length][2] = len;
  plats[count % plats.length][3] = start;
  plats[count % plats.length][4] = finish;
  plats[count % plats.length][6] = 1;
  count++;
}

function animateEnviro(j) {
  var touching = false;

  var side = plats[j][0];
  var b = plats[j][1];
  var len = plats[j][2];
  var start = plats[j][3];
  var finish = plats[j][4];



  if (plats[j][6] == 1) {
    addEnviro(side, b, len, 15);
  }

  if (plats[j][0] + len >= finish) {
    plats[j][5] = -3;
  } else if (plats[j][0] <= start) {
    plats[j][5] = 3;
  }

  if (!reverse) {
    if (x > side - 10 && x < side + len + 10) {
      if (y + charSize > b && y + charSize < b + 15) {
        touching = true;
      }
    }
  } else {
    if (x > side - 10 && x < side + len + 10) {
      if (y - charSize > b && y - charSize < b + 15) {
        touching = true;
      }
    }
  }
  if (touching) {
    x += plats[j][5];
  }
  //side +=  plats[j][5];
  plats[j][0] += plats[j][5];
}
//ends here

function addEnviro(a, b, c, d) {
  ctx.beginPath();
  ctx.rect(a, b, c, d);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();


  if (y > b && y < b + d) {
    if (x + charSize + 5 > a && x + charSize + 5 < a + c) {
      collisionR = false;
    }
    if (x - charSize - 5 > a && x - charSize - 5 < a + c) {
      collisionL = false;
    }
  }
  if (!reverse) {
    if (x > a - 10 && x < a + c + 10) {
      if (y + charSize > b && y + charSize < b + d) {
        collisionD = 0;
      }
    }
  } else {
    if (x > a - 10 && x < a + c + 10) {
      if (y - charSize > b && y - charSize < b + d) {
        collisionD = 0;
      }
    }
  }
}

function printDeaths() {
  document.getElementById("demo").innerHTML = "Deathcount: " + deathCount;
}

function print(phrase) {
  document.getElementById("demo").innerHTML = phrase;
}

addMovingEnviro(0, 230, 50, 0, 230);
addMovingEnviro(0, 50, 50, 0, 400);

function loop() {

  ctx.clearRect(0, 0, 480, 320);
  collisionR = true;
  collisionL = true;
  collisionD = 1;
  defaultX = 20;
  defaultY = 210;
  drawChar();
  if (level == -1) {
    document.getElementById("head").innerHTML = "GRAVITRON";
  }
  if (level == 0) {

    addEnviro(0, 300, 50, 20);
    addEnviro(50, 280, 430, 20);
    addEnviro(220, 200, 160, 20);
    addEnviro(380, 100, 100, 20);
    addEnviro(460, 0, 20, 180);
    addEnviro(360, 100, 20, 100)
    addButton(400, 120, 460, 180, 2)
    addSpikes(150, 280, 24, 1);
    addSpikes(250, 280, 100, 1);
    if (x > 0 && x < 100 && Count == 0) {
      print("Use the arrow keys to jump and move around.");
      Count++;
    }
    if (x > 100 && x < 200 && Count == 1) {
      print("Touch the spikes and you die");
      Count++;
    }
    if (x > 200 && x < 350 && Count == 2) {
      print("Press spacebar to switch gravity (you can do this in mid air).");
      Count++;
    }
    if (x > 350 && Count == 3) {
      print("Press the green button to open the door.")
    }

  }
  if (level == 2) {
    defaultOrient = 1;
    addEnviro(0, 300, 200, 20);
    addEnviro(200, 280, 280, 20);
    addEnviro(0, 100, 100, 20);
    addEnviro(230, 98, 20, 185);
    addEnviro(0, 0, 80, 15);
    addEnviro(160, 0, 320, 15);
    addEnviro(460, 15, 20, 165)
    addSpikes(144, 300, 56, 1);
    addSpikes(80, 0, 80, 2);
    addSpikes(0, 120, 90, 2);
    addSpikes(232, 98, 16, 1);
    addSpikes(232, 15, 16, 2);
    addSpikes(252, 120, 72, 1);
    addSpikes(384, 120, 72, 1);
    addSpikes(334, 200, 40, 1);
    addButton(10, 90, 460, 180, 1);
  }
  if (level == 1) {
    addEnviro(0, 300, 100, 20);
    addEnviro(100, 300, 200, 20);
    addEnviro(0, 0, 300, 20);
    addEnviro(300, 20, 180, 20);
    addEnviro(300, 280, 180, 20);
    addEnviro(460, 140, 20, 140);

    addSpikes(100, 300, 200, 1);
    addSpikes(0, 20, 300, 2);
    addSpikes(300, 280, 160, 1);
    addSpikes(300, 40, 80, 2)
  }
  if (level == 3) {
    defaultOrient = 2;
    addEnviro(0, 100, 100, 20);
    addEnviro(250, 98, 20, 200);
    addEnviro(80, 120, 20, 30);
    addEnviro(0, 0, 100, 20);
    addEnviro(100, 80, 20, 40);
    addEnviro(340, 150, 20, 150);
    addEnviro(340, 300, 140, 20);
    addEnviro(390, 150, 20, 40);
    addEnviro(410, 170, 70, 20);
    addEnviro(230, 230, 20, 15);
    animateEnviro(0);
    animateEnviro(1);
    addSpikes(82, 150, 16, 2);
    addSpikes(0, 320, 340, 1);
    addSpikes(100, 0, 480, 2);
    addSpikes(100, 230, 8, 1);
    addSpikes(342, 150, 16, 1)
    addSpikes(392, 150, 16, 1)
    addButton(20, 20, 460, 200, 2);


  }
  if(level >3){
  print("You Win!");
  }


  if (upPressed && jumpDebounce && collisionD == 0) {
    jump = jumpVal;
    jumpDebounce = false;
  }

  if (!upPressed) {
    jumpDebounce = true;
  }

  if (rightPressed) {
    if (collisionR) {
      x += 5;
    }
  } else if (leftPressed && x > 0 + charSize) {
    if (collisionL) {
      x += -5;
    }
  }

  if (spacePressed) {
    if (debounce) {

      gravit = -gravit;
      reverse = !reverse;
      jumpVal = -jumpVal;
      jump = 0;
      gravVal = -gravVal;
      debounce = false;
    }

  }
  if (!spacePressed) {
    debounce = true;
  }
  sustain();
  for (var w = 0; w < grav; w++) {
    if (y + 1 < 320 - charSize) {
      if (level == 2) {

        addEnviro(0, 300, 200, 20);
        addEnviro(200, 280, 280, 20);
        addEnviro(0, 100, 100, 20);
        addEnviro(230, 98, 20, 110);
        addEnviro(0, 0, 80, 15);
        addEnviro(160, 0, 320, 15)
      }
      if (level == 1) {
        addEnviro(0, 300, 100, 20);
        addEnviro(100, 300, 200, 20);
        addEnviro(0, 0, 300, 20);
        addEnviro(300, 20, 180, 20);
        addEnviro(300, 280, 180, 20);
        addEnviro(460, 140, 20, 140);
      }
      if (level == 3) {
        addEnviro(0, 100, 100, 20);

      }
      if (collisionD == 1) {
        y += gravit;

      }
    }
  }
  y += jump;
  if (jump * gravVal < 0) {
    jump += gravVal;
  }
  if (x > 480) {
    level++;
    x = 20;
    y = 210;
  }
  if (level != 0) {
    printDeaths();
  }
}
setInterval(loop, 20);
