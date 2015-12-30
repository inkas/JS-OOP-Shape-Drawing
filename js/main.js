var Form = (function(){
	'use strict';
	/**
	 * Extending Class method
	 * @param parent <function> Parent class
	 */
	Object.prototype.extends = function objExtends(parent){
		if(!Object.create){
			Object.prototype.create = function objCreate(proto){
				function F(){}
				F.prototype = proto;
				return new F();
			};
		}
		this.prototype = Object.create(parent.prototype);
		this.prototype.constructor = this;
	};
	
	/**
	 * Check if object has keys method
	 * @param keys <string> Parent class
	 * @return boolean
	 */
	Object.prototype.hasKey = function hasKey(keys){
		var keysArr = keys.split('>');
		var obj = this;

		for(var i=0; i<keysArr.length; i++){
			if(obj.hasOwnProperty(keysArr[i])){
				if(i == keysArr.length-1){
					return true;
				}
				obj = obj[keysArr[i]];
			}
		}
		return false;
	};

	/**
	 * Move element in array with one position method
	 * @param index <int> Parent class
	 * @param direction <string> The direction of moving
	 */
	Array.prototype.move = function(index, direction){
		var newIndex = -1;
		switch(direction){
			case 'up':
				newIndex = parseInt(index) - 1;
				break;
			case 'down':
				newIndex = parseInt(index) + 1;
				break;
		}
		if(newIndex >= 0 && newIndex < this.length){
			var removedElement = this.splice(index, 1)[0];
			this.splice(newIndex, 0, removedElement);
		}
	};

	var Shapes = (function(){
		/**
		 * Main shape - abstract class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param color <string> Color in hex
		 */
		var Shape = (function(){
			function Shape(x, y, color){
				if(this.constructor === Shape){
					throw new Error('Abstract class cannot be instanciated.');
				}
				this.setX(x);
				this.setY(y);
				this.setColor(color);
			}
			
			Shape.prototype.getX = function getX(){
				return this._x;
			};
			
			Shape.prototype.setX = function setX(x){
				this._x = x;
			};
			
			Shape.prototype.getY = function getY(){
				return this._y;
			};
			
			Shape.prototype.setY = function setY(y){
				this._y = y;
			};
			
			Shape.prototype.getColor = function getColor(){
				return this._color;
			};
			
			Shape.prototype.setColor = function setColor(color){
				this._color = color;
			};
			
			Shape.prototype.toString = function printToString(){
				return this.constructor.name + 
					' - X: ' + this.getX() + 
					', Y: ' + this.getY() + 
					', Color: ' + this.getColor(); 
			};
			
			return Shape;
		})();
		
		/**
		 * Circle shape class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param radius <int> Radius size
		 * @param color <string> Color in hex
		 */
		var Circle = (function(){
			function Circle(x, y, radius, color){
				Shape.call(this, x, y, color);
				this.setRadius(radius);
			}
			
			Circle.extends(Shape);
			
			Circle.prototype.getRadius = function getRadius(){
				return this._radius;
			}
			
			Circle.prototype.setRadius = function setRadius(radius){
				this._radius = radius;
			}
			
			Circle.prototype.toString = function printToString(){
				return Shape.prototype.toString.call(this) +
						', Radius: ' + this.getRadius();
			};
			
			Circle.prototype.draw = function(ctx){
				ctx.beginPath();
				ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2*Math.PI);
				ctx.fillStyle = this.getColor();
				ctx.fill();
			};
			
			return Circle;
		})();
		
		/**
		 * Rectangle shape class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param width <int> Width
		 * @param height <int> Height
		 * @param color <string> Color in hex
		 */
		var Rectangle = (function(){
			function Rectangle(x, y, width, height, color){
				Shape.call(this, x, y, color);
				this.setWidth(width);
				this.setHeight(height);
			}
			
			Rectangle.extends(Shape);
			
			Rectangle.prototype.getWidth = function getWidth(){
				return this._width;
			};
			
			Rectangle.prototype.setWidth = function setWidth(width){
				this._width = width;
			};
			
			Rectangle.prototype.getHeight = function getHeight(){
				return this._height;
			};
			
			Rectangle.prototype.setHeight = function setHeight(height){
				this._height = height;
			};
			
			Rectangle.prototype.toString = function printToString(){
				return Shape.prototype.toString.call(this) +
						', Width: ' + this.getWidth() +
						', Height: ' + this.getHeight();
			};
			
			Rectangle.prototype.draw = function(ctx){
				ctx.fillStyle = this.getColor();
				ctx.fillRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
			};

			return Rectangle;
		})();
		
		/**
		 * Line shape class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param x2 <int> X end coordinate
		 * @param y2 <int> Y end coordinate
		 * @param color <string> Color in hex
		 */
		var Line = (function(){
			function Line(x, y, x2, y2, color){
				Shape.call(this, x, y, color);
				this.setX2(x2);
				this.setY2(y2);
			}
			
			Line.extends(Shape);
			
			Line.prototype.getX2 = function getX2(){
				return this._x2;
			};
			
			Line.prototype.setX2 = function setX2(x2){
				this._x2 = x2;
			};
			
			Line.prototype.getY2 = function getY2(){
				return this._y2;
			};
			
			Line.prototype.setY2 = function setX2(y2){
				this._y2 = y2;
			};
			
			Line.prototype.toString = function printToString(){
				return Shape.prototype.toString.call(this) +
						', X2: ' + this.getX2() +
						', Y2: ' + this.getY2();
			};
			
			Line.prototype.draw = function(ctx){
				ctx.beginPath();
				ctx.lineWidth = 0;
				ctx.moveTo(this.getX(), this.getY());
				ctx.lineTo(this.getX2(), this.getY2());
				ctx.strokeStyle = this.getColor();
				ctx.stroke();
			};
			
			return Line;
		})();
		
		/**
		 * Triangle shape class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param x2 <int> X2 coordinate
		 * @param y2 <int> Y2 coordinate
		 * @param x3 <int> X3 coordinate
		 * @param y3 <int> Y3 coordinate
		 * @param color <string> Color in hex
		 */
		var Triangle = (function(){
			function Triangle(x, y, x2, y2, x3, y3, color){
				Line.call(this, x, y, x2, y2, color);
				this.setX3(x3);
				this.setY3(y3);
			}
			
			Triangle.extends(Line);
			
			Triangle.prototype.getX3 = function getX3(){
				return this._x3;
			};
			
			Triangle.prototype.setX3 = function setX3(x3){
				this._x3 = x3;
			};
			
			Triangle.prototype.getY3 = function getY3(){
				return this._y3;
			};
			
			Triangle.prototype.setY3 = function setY3(y3){
				this._y3 = y3;
			};
			
			Triangle.prototype.toString = function printToString(){
				return Line.prototype.toString.call(this) +
						', X3: ' + this.getX3() +
						', Y3: ' + this.getY3();
			}
			
			Triangle.prototype.draw = function(ctx){
				ctx.beginPath();
				ctx.moveTo(this.getX(),this.getY());
				ctx.lineTo(this.getX2(),this.getY2());
				ctx.lineTo(this.getX3(),this.getY3());
				ctx.closePath();
				ctx.fillStyle = this.getColor();
				ctx.fill();
			};
			
			return Triangle;
		})();
		
		/**
		 * Point shape class
		 * @param x <int> X coordinate
		 * @param y <int> Y coordinate
		 * @param color <string> Color in hex
		 */
		var Point = (function(){
			function Point(x, y, color){
				Shape.call(this, x, y, color);
			}
			
			Point.extends(Shape);
			
			Point.prototype.toString = function printToString(){
				return Shape.prototype.toString.call(this);
			};
			
			Point.prototype.draw = function(ctx){
				ctx.beginPath();
				ctx.arc(this.getX(), this.getY(), 1, 0, 2*Math.PI);
				ctx.fillStyle = this.getColor();
				ctx.fill();
			};
			
			return Point;
		})();
		
		return {
			Circle: Circle,
			Rectangle: Rectangle,
			Triangle: Triangle,
			Line: Line,
			Point: Point
		}
	})();

	var MainForm = (function(){
		var self;
		
		function MainForm(form, elements){
			self = this;
			this.form = form;
			this.elements = elements;
			this.shapesArray = [];
			this.showHideFields();
		}
		
		/**
		 * Validate form method method
		 */
		MainForm.prototype.validate = function validate(){
			$(this.form).addEvent('submit', function(e){
				e.preventDefault();
				try {
					self.errorNotifier('submit');
				} catch(ex) {
					self.elements.error_box.selector.text('<strong>'+ ex.message +'</strong>');
				}
				drawAndListShapes.call(self);
			});
			
			$(this.form).addEvent('keyup', function(){
				try {
					self.errorNotifier('keyup');
				} catch(ex) {
					self.elements.error_box.selector.text('<strong>'+ ex.message +'</strong>');
				}
			});
			
			$('#up-btn').addEvent('click', function(e){
				e.preventDefault();
				self.moveOptionUp(self.elements.select_list.selector.value());
			});
			
			$('#down-btn').addEvent('click', function(e){
				e.preventDefault();
				self.moveOptionDown(self.elements.select_list.selector.value());
			});
			
			$('#remove-btn').addEvent('click', function(e){
				e.preventDefault();
				self.removeOption(self.elements.select_list.selector.value());
			});
		};
		
		/**
		 * Show or hide fields method
		 */
		MainForm.prototype.showHideFields = function(){
			for(var i in this.elements){
				if(this.elements.hasKey(i)){
					if(i == 'select_toggle'){
						var $select = this.elements[i].selector;
						$select.addEvent('change', function(){
							var active_option = this.options[this.selectedIndex];
							$(self.form + ' .hidden').hidden();
							$(self.form + ' .hidden input').removeClass('error-input').value('');
							self.elements.error_box.selector.text('');
							$($(active_option).getData('toggle')).visible();
						});
					}
				}
			}
		};
		
		/**
		 * Put shape instances in array method
		 * @param shape <string> Shape name
		 * @param data <object> Shape data
		 */
		MainForm.prototype.shapesArrayBuilder = function(shape, data){
			function F(){
				return Shapes[shape].apply(this, data);
			}
			F.prototype = Shapes[shape].prototype;
			this.shapesArray.push(new F());
		};
		
		/**
		 * Notify for errors method
		 * @param eventType <string> Event that raised the error notification
		 */
		MainForm.prototype.errorNotifier = function(eventType){
			var activeShape = this.elements.select_toggle.selector.value();
			
			/**
			 * Show errors visually method
			 * @param shape <string> Shape name
			 * @param object <object>
			 */
			function visualValidator(shape, object){
				var shapeData = [],
					type, value, i, $node;
				
				for(type in object){
					if(object.hasOwnProperty(type)){
						for(i=0; i<object[type].length; i++){
							$node = object[type][i];
							value = $node.value();
							if(type == 'int'){
								if((eventType === 'keyup' && (value === '' || $(value).isPositiveInteger())) ||
									(eventType === 'submit' && $(value).isPositiveInteger()))
								{
									$node.removeClass('error-input');
									shapeData.push(value);
								}
								else{
									$node.addClass('error-input');
									shapeData.push(false);
								}
							}
							else if(type == 'hexColor'){
								if((eventType === 'keyup' && (value === '' || $(value).isHexColor())) ||
									(eventType === 'submit' && $(value).isHexColor()))
								{
									$($node.parentNode()).removeClass('error-input');
									shapeData.push(value);
								}
								else{
									$($node.parentNode()).addClass('error-input');
									shapeData.push(false);
								}
							}
						}
					}
				}

				for(i=0; i<shapeData.length; i++){
					if(shapeData[i] === false){
						this.elements.error_box.selector.text(this.elements.error_message);
						break;
					}
					if(i == shapeData.length-1){
						this.elements.error_box.selector.text('');
						if(eventType == 'submit'){
							this.shapesArrayBuilder(shape, shapeData);
						}
					}
				}
			}
			
			/**
			 * Show errors visually method
			 * @param shape <string> Shape name
			 * @param inputArray <array> Array with required fields
			 * @return arr <array> Array with required field selectors
			 */
			function nodeChecker(shape, inputArray){
				var arr = inputArray;
				var shapeLowerCase = shape.toLowerCase();
				
				for(var i=0; i<arr.length; i++){
					if(this.elements.hasKey(shapeLowerCase + '>required_fields>' + arr[i] + '>selector')){
						arr[i] = this.elements[shapeLowerCase].required_fields[arr[i]].selector;
					}
					else
						throw new Error(shape + "'s required input '" + arr[i] + "' is not declared");
				}
				
				return arr;
			}
			
			switch(activeShape){
				case 'Circle':
					var inputs = ['x', 'y', 'radius', 'color'];
					inputs = nodeChecker.call(this, 'Circle', inputs);
					
					visualValidator.call(this, activeShape, {
						'int': [inputs[0], inputs[1], inputs[2]],
						'hexColor': [inputs[3]]
					});
					break;
				case 'Rectangle':
					var inputs = ['x', 'y', 'width', 'height', 'color'];
					inputs = nodeChecker.call(this, 'Rectangle', inputs);
					
					visualValidator.call(this, activeShape, {
						'int': [inputs[0], inputs[1], inputs[2], inputs[3]],
						'hexColor': [inputs[4]]
					});
					break;
				case 'Triangle':			
					var inputs = ['x', 'y', 'x2', 'y2', 'x3', 'y3', 'color'];
					inputs = nodeChecker.call(this, 'Triangle', inputs);
					
					visualValidator.call(this, activeShape, {
						'int': [inputs[0], inputs[1], inputs[2], inputs[3], inputs[4], inputs[5]],
						'hexColor': [inputs[6]]
					});
					break;
				case 'Line':
					var inputs = ['x', 'y', 'x2', 'y2', 'color'];
					inputs = nodeChecker.call(this, 'Line', inputs);
					
					visualValidator.call(this, activeShape, {
						'int': [inputs[0], inputs[1], inputs[2], inputs[3]],
						'hexColor': [inputs[4]]
					});
					break;
				case 'Point':
					var inputs = ['x', 'y', 'color'];
					inputs = nodeChecker.call(this, 'Point', inputs);

					visualValidator.call(this, activeShape, {
						'int': [inputs[0], inputs[1]],
						'hexColor': [inputs[2]]
					});
					break;
			}
		};
		
		/**
		 * Draw shapes method
		 */
		MainForm.prototype.drawShapes = function(){
			var canvas = this.elements.draw_area.selector.nodeIndex(0),
				ctx = canvas.getContext('2d');
			
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for(var i=0; i<this.shapesArray.length; i++){
				this.shapesArray[i].draw(ctx);
			}
		};
		
		/**
		 * List of drawn shapes method
		 */
		MainForm.prototype.listShapes = function(){
			var $optsEl = this.elements.select_list.selector;
			
			$optsEl.text('');
			for(var i=0; i<this.shapesArray.length; i++){
				var newOption = document.createElement('option');
				newOption.value = i;
				newOption.text = this.shapesArray[i].toString();
				$optsEl.append(newOption);
			}
		};
		
		/**
		 * List of drawn shapes method
		 * @param optionNum <int> Index
		 */
		MainForm.prototype.moveOptionUp = function(optionNum){
			this.shapesArray.move(optionNum, 'up');
			drawAndListShapes.call(this);
		};
		
		/**
		 * List of drawn shapes method
		 * @param optionNum <int> Index
		 */
		MainForm.prototype.moveOptionDown = function(optionNum){
			this.shapesArray.move(optionNum, 'down');
			drawAndListShapes.call(this);
		};
		
		/**
		 * List of drawn shapes method
		 * @param shapeNum <int> Index
		 */
		MainForm.prototype.removeOption = function(shapeNum){
			this.shapesArray.splice(shapeNum, 1);
			drawAndListShapes.call(this);
		};
		
		function drawAndListShapes(){
			this.drawShapes();
			this.listShapes();
		}
		
		return MainForm;
	})();

	return MainForm;
})();