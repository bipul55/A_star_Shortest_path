function A_start() {
  this.openSet = []; //nodes that need to be traversed
  this.closedSet = []; //path that does not need to be traversed
  this.start; //starting point
  this.end; //ending poing
  this.path = []; //sortest path
  this.obstables = []; //obstacles
  this.grid;
  //removes an object from a specific object
  this.removeFromArray = function (arr, element) {
    for (var i = arr.length - 1; i >= 0; i--) {
      if (arr[i] == element) {
        arr.splice(i, 1);
      }
    }
  };
  //calculate the heuristics value between point "a" and poin "b"
  this.heuristic = function (a, b) {
    var d = dist(a.x, a.y, b.x, b.y);
    return d;
  };
  // setup function
  this.start = function (grid, start, end, h, w, obstacles) {
    this.grid = grid;
    this.start = start;
    this.end = end;
    this.openSet.push(start);
    this.obstacles = obstacles.slice();
    this.closedSet = obstacles.slice();
    console.log(obstacles);
  };
  //   drawing function
  this.draw = function () {
    if (this.openSet.length > 0) {
      // we can keep iterating
      var winner = 0;
      //   find the  node index with lowest f value in openset
      for (var i = 0; i < this.openSet.length; i++) {
        if (this.openSet[i].f < this.openSet[winner].f) {
          winner = i;
        }
      }
      //   let the node be current
      var current = this.openSet[winner];
      //   if current == end , we have the path
      if (current == end) {
        console.log("DONE!");
        // find the path
        temp = current;
        this.path.push(current);
        while (temp.previous) {
          this.path.push(temp.previous);
          temp = temp.previous;
        }
        noLoop();
        console.log("path", this.path);
      }
      //remove the current from the openset as we already traversed it and push it to closed set
      this.removeFromArray(this.openSet, current);
      this.closedSet.push(current);

      var neighbours = current.neighbours;
      // traverse through all the neighbours of current and update the g value if needed(we need to set the possible least g value)
      for (var i = 0; i < neighbours.length; i++) {
        var neighbour = neighbours[i];

        if (!this.closedSet.includes(neighbour)) {
          var tempG = current.g + 1;
          if (this.openSet.includes(neighbour)) {
            if (tempG < neighbour.g) {
              neighbour.g = tempG;
            }
          } else {
            neighbour.g = tempG;
            // if neighbour is not yet traversed then push it to openset
            this.openSet.push(neighbour);
          }
          //   calculate and set the heuristic value "f" of the neighbour
          neighbour.h = this.heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    } else {
      console.log("NO SOLUTION");
      noLoop();
      window.alert("no solution");
    }
    for (var i = 0; i < this.closedSet.length; i++) {
      this.closedSet[i].show(color(255, 0, 0));
    }

    for (var i = 0; i < this.openSet.length; i++) {
      this.openSet[i].show(color(0, 255, 0));
    }
    for (var i = 0; i < this.path.length; i++) {
      this.path[i].show(color(0, 0, 255));
    }
    for (var i = 0; i < this.obstacles.length; i++) {
      obstacles[i].show(color(0, 0, 0));
    }
  };
}
