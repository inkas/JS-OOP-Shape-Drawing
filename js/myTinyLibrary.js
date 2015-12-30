/**
 * Helper class (Framework)
 */
var $ = (function(){
	'use strict';
	function $(el){
		if(!(this instanceof $)){
			return new $(el);
		}
		this._element = el;
	}
	
	/**
	 * Show node(s) method
	 * @return this <object> Method chaining
	 */
	$.prototype.visible = function(){
		visibleHidden.call(this, true);
		return this;
	};
	
	/**
	 * Hide node(s) method
	 * @return this <object> Method chaining
	 */
	$.prototype.hidden = function(){
		visibleHidden.call(this, false);
		return this;
	};
	
	/**
	 * Get/Set node(s) value method
	 * @param val <string> Value to set
	 * @return values <array> Values
	 */
	$.prototype.value = function(val){
		//Add values if any are set as parameters
		if(arguments.length){
			loop(this._element, function(node){
				node.value = val;
			});
		}
		//Get the value of first matched element
		else{
			return getAllElements(this._element)[0].value;
		}
	};
	
	/**
	 * Check if value is a positive integer method
	 * @return positive <boolean>
	 */
	$.prototype.isPositiveInteger = function(){
		if(!isNaN(this._element)){
			var num = parseFloat(this._element, 10);
			if(Number(num) === num && num % 1 === 0 && num >= 0){
				return true;
			}
		}
		return false;
	};
	
	/**
	 * Check if value is a hex color method
	 * @return positive <boolean>
	 */
	$.prototype.isHexColor = function(){
		var color = this._element;
		if(this._element.charAt(0) != '#'){
			color = '#' + this._element;
		}
		if(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)){
			return true;
		}
		return false;
	};
	
	/**
	 * Style node(s) method
	 * @param style <string> CSS Rules
	 * @return this <object> Method chaining
	 */
	$.prototype.style = function(style){
		loop(this._element, function(node){
			node.style.cssText = style;
		});
		return this;
	};
	
	/**
	 * Set node(s) inner text method
	 * @param text <string> Inner text
	 * @return this <object> Method chaining
	 */
	$.prototype.text = function(text){
		loop(this._element, function(node){
			node.innerHTML = text;
		});
		return this;
	};
	
	/**
	 * Append DOM element to node(s) method
	 * @param el <string> $ Node
	 * @return this <object> Method chaining
	 */
	$.prototype.append = function(el){
		loop(this._element, function(node){
			node.appendChild(el);
		});
		return this;
	};
	
	/**
	 * Get "data-*" attribute of node(s) method
	 * @param dataAttr <string> "data-*" name
	 * @return r <object> Node dataset
	 */
	$.prototype.getData = function(dataAttr){
		var r;
		loop(this._element, function(node){
			r = node.dataset[dataAttr];
		});
		return r;
	};
	
	/**
	 * Add event method
	 * @param type <string> Event type
	 * @param fn <function> Callback function
	 * @return this <object> Method chaining
	 */
	$.prototype.addEvent = function(type, fn){
		var evts = type.split(' ');
		for(var k=0; k<evts.length; k++){
			if(this._element === window){
				addEventMain(this._element, type, fn);
			}
			else{
				loop(this._element, function(node){
					addEventMain(node, type, fn);
				});
			}
		}
		return this;
	};
	
	/**
	 * Add CSS class method
	 * @param classN <string> CSS Class(es)
	 * @param fn <function> Callback function
	 * @return this <object> Method chaining
	 */
	$.prototype.addClass = function(classN){
		loop(this._element, function(node){
			if(!(((' ' + node.className + ' ').indexOf(' ' + classN + ' ')) > -1)){
				node.className += ' ' + classN;
			}
		});
		return this;
	};
	
	/**
	 * Remove CSS class method
	 * @param classN <string> CSS Class(es)
	 * @return this <object> Method chaining
	 */
	$.prototype.removeClass = function(classN){
		loop(this._element, function(node){
			var newClassName = '',
				j,
				classes = node.className.split(' ');
				
			for(j=0; j<classes.length; j++){
				if(classes[j] !== classN){
					newClassName += classes[j] + ' ';
				}
			}
			if(newClassName.trim){
				newClassName = newClassName.trim();
			}
			node.className = newClassName;
		});
		return this;
	};
	
	/**
	 * Get parent node method
	 * @return r <object> DOM Element
	 */
	$.prototype.parentNode = function(){
		var r;
		loop(this._element, function(node){
			r = node.parentNode;
		});
		return r;
	};
	
	/**
	 * Get node by index method
	 * @param index <string> CSS Class(es)
	 * @return element <array> DOM Element
	 */
	$.prototype.nodeIndex = function(index){
		return getAllElements(this._element)[index];
	};
	
	function addEventMain(to, type, fn){
		if(to.addEventListener){
			to.addEventListener(type, fn, false);
		}
		else if(to.attachEvent){
			to.attachEvent('on'+type, fn);
		}
		else{
			to['on'+type] = fn;
		}
	}
	
	function visibleHidden(bool){
		loop(this._element, function(node){
			if(bool){
				node.style.display = 'block';
			}
			else{
				node.style.display = 'none';
			}
		});
	}
	
	function loop(node, callback){
		var elements = getAllElements(node),
			i;
		if(typeof callback === "function"){
			for(i=0; i<elements.length; i++){
				callback(elements[i], i);
			}
		}
	}
	
	function getAllElements(selector){
		if(typeof selector === 'string' || selector instanceof String){
			return document.querySelectorAll(selector);
		}
		else if((typeof selector === 'object' || selector instanceof Object) && selector !== null){
			return [selector];
		}
		else{
			return[];
		}
	}
	
	return $;
})();