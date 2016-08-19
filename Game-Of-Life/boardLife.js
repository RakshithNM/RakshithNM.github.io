"use strict";
var gameOfLife = {

	rowHolder: document.getElementById('rowHolder'), //returns a reference to rowHolder

	boardState: [], //All the cells on the board are dead

	init : function(){
		var self = this; //making this available to the sub function within setInterval
		this.makeGrid(10,10).populateGrid();
		window.setInterval(function(){
			self.invokeGeneration(); //call the invokeGenearation method every 66ms
		},250);
	},
	invokeGeneration: function() { //method defined to get the next state of the board
		
		var nextBoardState = JSON.parse(JSON.stringify(this.boardState)); //make a deep copy of the array to the nextBoardState

		for(var i = 0; i < this.rows; i++) { //move through the rows of the grid

			for(var j = 0; j < this.cols; j++) { //move through the columns of the grid

				var countNeighbours = this.noOfAliveNeighbours(i,j); //call method to count no, of alive neighbours for a particular cell and return the count
				if (this.boardState[i][j] === true) { //while the cell is in the alive state or true
		            if (countNeighbours == 0 || countNeighbours == 1 || countNeighbours > 3) { //if count=0,1 o greater than 3
		            	nextBoardState[i][j] = false; //kill, for count=2 and 3, the copying of the array will do. 
		            }
		            	
		        } 	else { //while the cell is dead or false
		            	if (countNeighbours == 3) {  //if count = 3
		            		nextBoardState[i][j] = true; //give life on the next board	
		           		}
		        	}
					
			}
		}
		this.boardState = nextBoardState; //assign nextBoardState to boardState before drawing
		this.drawCellOnGrid(); //call the drawing method;
	},
	noOfAliveNeighbours: function(i,j){ //method to count the no of alive neighbours in the particular generation
		var k,l; // variables to traverse through the neighbours of a cell
		var count = 0; // variable to return the count of the number of variables

		for(k=-1; k<=1;k++) //iterating through the rows of the neighbours
		{
			for(l=-1; l<=1;l++) //iterating through the columns of the neighbours
			{ 
				if(k || l) //perform the count only if either of k or l is 1 or when both are not 0, not pointing to the cell
				{
					if(this.boardState[this.circularX(i,k)][this.circularY(j,l)]) // making the index of the two dimensional array toroidal when the cell is at the boundary, stiching together the ends of the grid from right to left and top to bottom
					{
						count++; // increment the count 
					}
				}
			}
		}
		return count;  
	},
	circularX: function stitchX(m,n){ // method to stitch the right and left boundaries of the grid together
		m += n; //iterate through the neighbours
		while (m < 0) m += this.cols; //if the cell index goes outside the extreme left, the cell near the extreme right is referenced as neighbour
		while (m >= this.cols) m-= this.cols; //if the cell index goes outside the extreme right, the cell near the extreme left is referenced as neighbour
		return m; //return the neighbour index
	},
	circularY: function stitchY(m,n){ //method to stitch the top and bottom boundaries of the grid together
		m += n; //iterate through the neighbours
		while(m < 0) m += this.rows; //if the cell index goes outside the extreme top, the cell near the extreme bottom is referenced as neighbour
		while(m > this.rows) m -= this.rows; //if the cell index goes outside the extreme bottom, the cell near the extreme top is referenced as neighbour
		return m; //return the neighbour index
	},
	makeGrid: function(rows,cols) { //method to make the 
		var i = 0, 
			j = 0;

		this.rows = rows;
		this.cols = cols;

		this.rowHolder.innerHTML = ''; //initialise the rowHolder with empty string
		this.boardState = []; // Empty array for the complete grid, 2D

		for(i = 0; i < rows; i++) { //move through the rows of the grid
			var row = document.createElement('div'); //for each i->rows create a div
			row.className = 'row-format'; //and give the className

			var boardRow = []; //Empty array for a row in the grid, 1D

			for(j = 0; j < cols; j++) { //move through the columns of the grid
				var cell = document.createElement('div'); //for each j->cols create a cell 
				cell.className = 'cell-format'; //and give the className
				row.appendChild(cell); //append each cell to the row for each j->cols
				boardRow.push(false); //designing the grid structure with killed lives or cells
			}
			this.rowHolder.appendChild(row); //adding each row to the rowHolder property 
			this.boardState.push(boardRow); //push the boardRow to boardState for each i->rows
		}
		return this;
	},
	drawCellOnGrid: function(){ //method to draw cell on grid based  on boardState
		for (var i = 0; i < this.rows; i++) { //move through each row

			for (var j = 0; j < this.cols; j++ ) { //move through each column
				var toDrawCell = this.getCell(i,j) //get a cell in a particular row based on i,j
				if(this.boardState[i][j]) { //evaluates to true or if there is life
					toDrawCell.classList.add('alive'); //add the alive class to the cell returned by getCell
				} else {  //if false or no life
					toDrawCell.classList.remove('alive'); //remove the alive class from the cell
				}
			}

		}
	},
	populateGrid: function(){

		var i = 0, 
			j = 0; //variables to iterate throughout the grid

		for(i = 0; i< this.rows; i++) { //move through a row on each iteration
			for(j = 0;j< this.cols; j++) { // move through a column on each iteration
				var r = Math.random(); //generate a random number
					if(r > 0.7) { //20% percent probabilty of evaluating to true
						this.giveLife(i,j); //call method to change the formating of the cell
					};
			}

		}
	},
	giveLife: function(i,j){ //method to give life(add color) to the cell
		var cell = this.getCell(i,j); //method to target a particular cell with classes row-format and cell-format
		this.boardState[i][j] = true; //make the particular cell 1 or give life
		cell.classList.add('alive'); //add the alive class to the classList of the cell
		return this;
	},
	getCell: function(i,j){
		var  cell = document.querySelectorAll('.row-format:nth-child('+(i+1)+') .cell-format:nth-child('+(j+1)+')') || false; //selects an cell that is an nth-child from all cells with the classes 
		return cell[0];
	},
		
};

gameOfLife.rowHolder.addEventListener('click',function(){ 
	gameOfLife.init();
},false);
gameOfLife.init();
