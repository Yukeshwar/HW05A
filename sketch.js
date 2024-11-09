function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(16);
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  background(15);
  translate(width / 2, height / 2);

  let seconds = second();
  let minutes = minute();
  let hours = hour();
  let dayOfMonth = day();
  let monthOfYear = month();

  let colors = [
    [color(200, 50, 90), color(200, 30, 70)],
    [color(140, 50, 90), color(140, 30, 70)],
    [color(50, 50, 90), color(50, 30, 70)],
    [color(330, 50, 90), color(330, 30, 70)],
    [color(270, 50, 90), color(270, 30, 70)]
  ];

  drawRing(0.7, 0.8, map(seconds, 0, 60, 0, 360), colors[0], `${seconds} Sec`);
  drawRing(0.55, 0.65, map(minutes, 0, 60, 0, 360), colors[1], `${minutes} Min`);
  drawRing(0.4, 0.5, map(hours % 12, 0, 12, 0, 360), colors[2], `${hours} Hr`);
  drawRing(0.25, 0.35, map(dayOfMonth, 1, 31, 0, 360), colors[3], `Day ${dayOfMonth}`);
  drawRing(0.1, 0.2, map(monthOfYear, 1, 12, 0, 360), colors[4], monthToString(monthOfYear));
}

function drawRing(innerRadiusFactor, outerRadiusFactor, angle, colors, labelText) {
  let innerRadius = min(width, height) * innerRadiusFactor;
  let outerRadius = min(width, height) * outerRadiusFactor;

  for (let r = innerRadius; r < outerRadius; r++) {
    let interColor = lerpColor(colors[0], colors[1], map(r, innerRadius, outerRadius, 0, 1));
    stroke(interColor);
    strokeWeight(2);
    noFill();
    arc(0, 0, r, r, -90, -90 + angle, OPEN);
  }

  let capX = cos(-90 + angle) * (outerRadius + innerRadius) / 2;
  let capY = sin(-90 + angle) * (outerRadius + innerRadius) / 2;
  fill(colors[1]);
  noStroke();
  ellipse(capX, capY, 12, 12);

  fill(255);
  textSize(14);
  textStyle(BOLD);
  text(labelText, capX, capY + 18);
}

function monthToString(m) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[m - 1];
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
