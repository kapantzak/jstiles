$(document).ready(function() {
	setGoTop();
	toggleGoTop();
	var opt = {
		loader:1000		
	};
	$('#tiles-container').jstiles(opt);	
	
	// Exapmples ----------------------------------------- //
	// #1
	var temp1 = {
		myTemplate: {
			tilesNum: 4,
			tiles: {
				0: 'col-xs-12 col-md-6',
				1: 'col-xs-12 col-md-6',
				2: 'col-xs-12 col-md-6',
				3: 'col-xs-12 col-md-6'
			}
		}
	};
	var opt1 = {
		templateObj: temp1	
	};
	$('#live1').jstiles(opt1);
	
	// #2
	var temp2 = {
		myTemplate: {
			tilesNum: 4,
			columns: {
				0: {
					colClass: 'tl-col col-xs-12 col-md-9',
					start: '0',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-md-7',
				1: 'col-xs-12 col-md-2',
				2: 'col-xs-12 col-md-5',
				3: 'col-xs-12 col-md-3'
			}
		}
	};
	var opt2 = {
		templateObj: temp2	
	};
	$('#live2').jstiles(opt2);

	// #3
	var temp3 = {
		myTemplate: {
			tilesNum: 8,
			columns: {
				0: {
					colClass: 'tl-col col-xs-12 col-md-9',
					start: '0',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-md-7',
				1: 'col-xs-12 col-md-2',
				2: 'col-xs-12 col-md-5',
				3: 'col-xs-12 col-md-3',
				4: 'col-xs-12 col-md-3',
				5: 'col-xs-12 col-md-3',
				6: 'col-xs-12 col-md-3',
				7: 'col-xs-12 col-md-3'
			}
		}
	};
	var opt3 = {
		templateObj: temp3
	};
	$('#live3').jstiles(opt3);
	
	// #4
	var temp4 = {
		myTemplate: {
			tilesNum: 8,
			rows: {
				0: {
					rowClass: 'tl-row col-xs-12',
					start: '4',
					end: '7'
				}
			},
			columns: {
				0: {
					colClass: 'tl-col col-xs-12 col-md-9',
					start: '0',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-md-7',
				1: 'col-xs-12 col-md-2',
				2: 'col-xs-12 col-md-5',
				3: 'col-xs-12 col-md-3',
				4: 'col-xs-12 col-md-3',
				5: 'col-xs-12 col-md-3',
				6: 'col-xs-12 col-md-3',
				7: 'col-xs-12 col-md-3'
			}
		}
	};
	var opt4 = {
		templateObj: temp4
	};
	$('#live4').jstiles(opt4);
	
	// #5
	var temp5 = {
		myTemplate: {
			tilesNum: 8,
			rows: {
				0: {
					rowClass: 'tl-row col-xs-12',
					start: '4',
					end: '7'
				}
			},
			columns: {
				0: {
					colClass: 'tl-col col-xs-12 col-md-9',
					start: '0',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-md-7',
				1: 'col-xs-12 col-md-2',
				2: 'col-xs-12 col-md-5',
				3: 'col-xs-12 col-md-3',
				4: 'col-xs-12 col-md-3',
				5: 'col-xs-12 col-md-3',
				6: 'col-xs-12 col-md-3',
				7: 'col-xs-12 col-md-3'
			},
			animations: {
				0: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				1: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
				2: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				3: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:250 },
				4: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:550 },
				5: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:100 },
				6: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:400 },
				7: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:350 }	
			}
		}
	};
	var opt5 = {
		templateObj: temp5
	};
	$('#live5').jstiles(opt5);
	
	// #6
	var temp6 = {
		myTemplate: {
			tilesNum: 8,
			rows: {
				0: {
					rowClass: 'tl-row col-xs-12',
					start: '4',
					end: '7'
				}
			},
			columns: {
				0: {
					colClass: 'tl-col col-xs-12 col-md-9',
					start: '0',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-md-7',
				1: 'col-xs-12 col-md-2',
				2: 'col-xs-12 col-md-5',
				3: 'col-xs-12 col-md-3',
				4: 'col-xs-12 col-md-3',
				5: 'col-xs-12 col-md-3',
				6: 'col-xs-12 col-md-3',
				7: 'col-xs-12 col-md-3'
			},
			animations: {
				0: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				1: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
				2: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				3: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:250 },
				4: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:550 },
				5: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:100 },
				6: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:400 },
				7: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:350 }	
			},
			config: {
				0: {
					padding: '30px',
					ratio: 1
				}
			}
		}
	};
	var opt6 = {
		templateObj: temp6
	};
	$('#live6').jstiles(opt6);
	$('#live7').jstiles(opt6);
});
$('#destroy').on('click', function() {
	$('#tiles-container').jstiles('destroy');
});

var setGoTop = function() {
	var gt = $('#goTop');
	var w = $(window).width();
	var mw = $('#contentNarrow').outerWidth();
	var gtw = gt.outerWidth();
	var r = ((parseFloat(w) - parseFloat(mw)) / 2) - parseFloat(gtw) - 5;
	gt.css({'right': r + 'px'});
}
var toggleGoTop = function() {
	var gt = $('#goTop');
	var t = $(window).scrollTop();
	if (t > 200) {
		gt.show();
	} else {
		gt.hide();
	}
}

$(document).on('click', '.innerAnchor', function(e) {
	e.preventDefault();
	var href = $(this).attr('href');
	var target = $(href);
	var scroll = parseFloat(target.offset().top);
	$('html, body').animate({scrollTop: scroll + 'px'}, 450, 'easeInOutExpo');
});

$('#goTop').on('click', function() {
	$('body,html').animate({scrollTop:0},350,'easeOutExpo');	
});

$(window).resize(function() {
	setGoTop();
});
$(window).scroll(function() {
	toggleGoTop();
});