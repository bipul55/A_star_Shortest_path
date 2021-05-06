var cols = 30;
var rows = 30;
var grid = new Array(cols);

var start, end;
var w, h;

var obstacles = [];
var run = false;
var button;
// sort class
let sort;

function Cell(i, j) {
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.previous = undefined;
  this.neighbours = [];
  this.show = function (color) {
    fill(color);
    strokeWeight(0.1);
    rect(this.x * w, this.y * h, w, h);
    // rect(this.x, this.y, 1, 1);
  };

  this.addNeighbours = function () {
    if (this.x < cols - 1) {
      this.neighbours.push(grid[this.x + 1][this.y]);
    }
    if (this.x > 0) {
      this.neighbours.push(grid[this.x - 1][this.y]);
    }
    if (this.y < rows - 1) {
      this.neighbours.push(grid[this.x][this.y + 1]);
    }
    if (this.y > 0) {
      this.neighbours.push(grid[this.x][this.y - 1]);
    }
  };
}

function setup() {
  // new sort class
  sort = new A_start();
  createCanvas(700, 700).style("margin", "auto");
  // radio
  radio = createRadio();
  radio.option("start");
  radio.option("end");
  radio.option("obstables");
  radio.style("width", "500px");

  // Reset button
  Reset = createButton("Reset");
  Reset.position(100, 650);
  Reset.mousePressed(() => {
    run = false;

    obstacles = [];
    sort.obstacles = [];
    sort.openSet = [start];
    sort.closedSet = [];
    sort.path = [];
    loop();
  });
  //defining the height and width of the cell
  w = width / cols;
  h = height / rows;

  // defining the grid
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  // defining grid as array of cell
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  // adding the neighbours for each cell
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours();
    }
  }
  // initializing start and end node
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  // Run button
  Run = createButton("run");
  Run.position(100, 600);
  Run.mousePressed(() => {
    run = true;
    sort.start(grid, start, end, h, w, obstacles);
  });
}

function draw() {
  background(255);
  // draw the grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  if (run) {
    sort.draw();
  } else {
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].show(color(0, 0, 0));
    }
  }

  start.show(color(0, 255, 255));
  end.show(color(0, 255, 255));
}
function mouseDragged() {
  if (!run) {
    if (radio.value() == "obstables") {
      var x = int(mouseX / w);
      var y = int(mouseY / h);
      if (x < cols && y < rows) {
        obstacles.push(grid[x][y]);
      }
    }
  }
}

function mousePressed() {
  if (!run) {
    var x = int(mouseX / w);
    var y = int(mouseY / h);
    if (x < cols && y < rows) {
      if (radio.value() == "start") {
        sort.removeFromArray(sort.openSet, start);
        start = grid[x][y];
        sort.openSet.push(start);
      }
      if (radio.value() == "end") {
        end = grid[x][y];
      }
    } else {
    }
  }
}
