$(window).addEvent('load', function(){
	var formElements = {
		circle: {
			required_fields: {
				'x': {selector: $('#x')},
				'y': {selector: $('#y')},
				'radius': {selector: $('#radius')},
				'color': {selector: $('#color')},
			}
		},
		rectangle: {
			required_fields: {
				'x': {selector: $('#x')},
				'y': {selector: $('#y')},
				'width': {selector: $('#width')},
				'height': {selector: $('#height')},
				'color': {selector: $('#color')},
			}
		},
		triangle: {
			required_fields: {
				'x': {selector: $('#x')},
				'y': {selector: $('#y')},
				'x2': {selector: $('#x2')},
				'y2': {selector: $('#y2')},
				'x3': {selector: $('#x3')},
				'y3': {selector: $('#y3')},
				'color': {selector: $('#color')},
			}
		},
		line: {
			required_fields: {
				'x': {selector: $('#x')},
				'y': {selector: $('#y')},
				'x2': {selector: $('#x2')},
				'y2': {selector: $('#y2')},
				'color': {selector: $('#color')},
			}
		},
		point: {
			required_fields: {
				'x': {selector: $('#x')},
				'y': {selector: $('#y')},
				'color': {selector:$('#color')}
			}
		},
		select_toggle: {
			selector: $('#shapes-select')
		},
		select_list: {
			selector: $('#drawn-shapes-options')
		},
		draw_area: {
			selector: $('#shapes-draw-area')
		},
		error_box: {
			selector: $('#error-box')
		},
		error_message: 'Please fill in the fields with correct data.'
	};
	
	var form = new Form('#shapeForm', formElements);
	form.validate();
});