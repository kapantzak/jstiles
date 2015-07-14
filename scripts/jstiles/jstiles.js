/*!
*	jQuery - jsTiles
*	A jQuery plugin that produces tiles
*	Author: Ioannis Kapantzakis
*	Released under the MIT License
*/ 
;(function($, window, document, undefined) {
	
	var pluginName = 'jstiles';
	
	function Plugin(element, options, selector) {
		this.el = element;
		this.$el = $(element);		
		this.opt = $.extend({}, $.fn[pluginName].defaults, options );		
		this.templates = $.extend({}, $.fn[pluginName].templates, this.opt.templateObj);
		this.selector = selector;
		this._init();
	}
	
	Plugin.prototype = {
			
		//Private functions ------------------------------------------------------------------------------ //
		_init: function() {
			var $that = this;
			var $el = $that.$el;
			var opt = $that.opt;
			var templates = $that.templates;
			var selector = $that.selector;
			var orClass = $el.attr('class');
			
			var loader = parseInt(opt.loader);
			var loaderHtml = opt.loaderHtml;
			var tilePadding = opt.tilePadding;
			var tileRatio = opt.tileRatio;
			var containerClass = 'tl-tiles-container';
			var pagesHolderClass = 'tl-pagesHolder';
			var pageClass = 'tl-page';
			var tileClass = 'tl-tile';
			var pageHome = opt.pageHome;			
			var sliderEasing = opt.sliderEasing;
			var slideDuration = opt.slideDuration;
			
			var bootstrapMedia = $.fn[pluginName].bootstrapMedia;
			
			//Store original attributes (applied on destroy)
			$.data($el, 'storedAttr', {
				'selector': selector,
				'orClass': orClass
			});
			//Store each tile original classes
			$el.find('.tl-page').children().each(function() {
				var that = $(this);
				var cl = that.attr('class');
				var orClass = (cl) ? cl : '';
				that.attr('data-or-class', orClass);	
			});
			
			if (loader > 0) {
				$el.addClass('invisible');
				if (loaderHtml != false && loaderHtml.length > 0) {
					var loaderDiv = loaderHtml;
				} else {
					var loaderDiv = '<div class="tl-loader">';
					loaderDiv += '<div id="tl-ld-1" class="tl-loader-box"></div>';
					loaderDiv += '<div id="tl-ld-2" class="tl-loader-box"></div>';
					loaderDiv += '<div id="tl-ld-3" class="tl-loader-box"></div>';
					loaderDiv += '<div id="tl-ld-4" class="tl-loader-box"></div>';
					loaderDiv += '</div>';
				}
				var outerDiv = '<div class="tl-outer"></div>';
				$el.wrap(outerDiv).closest('.tl-outer').append(loaderDiv);
			}
			
			//Add bootstrap class
			var par3 = {
				init: $that,	//plugin object
				win: $(window)	//page object
			};
			Plugin.prototype._getBootstrapClass.apply(this, [par3]);
				
			$el.addClass(containerClass);
			var pages = $el.find('.' + pageClass);
			var pagesNum = pages.length;
			if (pagesNum > 1) {
				//Start building pages					
				var w = pagesNum * 100;
				var pw = 100 / pagesNum;
				var initMargin = - (pageHome * 100);
				var pgHolder = '<div class="' + pagesHolderClass + '" style="width:' + w + '%;margin-left:' + initMargin + '%" data-cur-page="' + pageHome + '"></div>';
				var prevArrow = '<div class="tl-arrow-holder tl-arrow-prev"><div class="tr-arrow-inner"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></div></div>';
				var nextArrow = '<div class="tl-arrow-holder tl-arrow-next"><div class="tr-arrow-inner"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></div></div>';
				$el.children('.' + pageClass).css({'width': pw + '%'}).wrapAll(pgHolder);
				$el.find('.' + pageClass).children().addClass(tileClass);
				$el.append(prevArrow).append(nextArrow);
			} else if (pagesNum == 1) {
				//Build one page
				var pgHolder = '<div class="' + pagesHolderClass + '" style="width:100%"></div>';
				$el.children('.' + pageClass).css({'width': '100%'}).wrapAll(pgHolder);
				$el.find('.' + pageClass).children().addClass(tileClass);
			}
			
			//Build the tiles
			$el.find('.' + tileClass).each(function() {
				var that = $(this);
				var html = that.html();
				var inner = '<div class="tl-tile-inner"><div class="tl-tile-content">' + html + '</div></div>';
				that.html(inner);				
				if (tilePadding != false) {
					that.css({'padding': tilePadding});						
				}
				if (tileRatio != false && !isNaN(tileRatio)) {
					that.find('.tl-tile-inner').css({'padding-top': parseFloat(tileRatio) * 100 + '%'});
				}
			});
			
			//Trigger event
			$(document).trigger('tl.tilecontent.appended', [$el]);
			
			//Set the templates
			pages.each(function(index) {
				var that = $(this);
				that.attr('data-page', index);
				//Check template
				var dataTmp = that.attr('data-tl-template');				
				if (dataTmp && dataTmp.length > 0) {
					var objTmp = templates[dataTmp];				
					if (objTmp) {
						var temp = objTmp;
					} else {
						var temp = templates.tempA;
					}
				} else {
					var temp = templates.tempA;
				}
				var pageTiles = that.find('.' + tileClass);
				if (pageTiles.length == temp.tilesNum) {
					//Build rows
					if (temp.rows) {
						for (rs in temp.rows) {
							var r = temp.rows[rs];
							var rowDiv = '<div class="' + r.rowClass + '"></div>';
							pageTiles.slice(r.start, parseInt(r.end) + 1).wrapAll(rowDiv);
						}
					}
					//Set classes
					for (tc in temp.tiles) {
						pageTiles.eq(tc).addClass(temp.tiles[tc]);
					}
					for (an in temp.animations) {
						pageTiles.eq(an).addClass(temp.animations[an].tlClass);
					}
					//Set configurations
					for (cn in temp.config) {						
						var tconf = temp.config;
						var padding = tconf[cn].padding;
						var ratio = parseFloat(tconf[cn].ratio) * 100;
						pageTiles.eq(cn)
							.css({'padding': padding})
							.find('.tl-tile-inner')
							.css({'padding-top': ratio + '%'});						
					}
					//Build columns
					if (temp.columns) {
						for (cl in temp.columns) {
							var m = temp.columns[cl];
							var columnDiv = '<div class="' + m.colClass + '"></div>';
							pageTiles.slice(m.start, parseInt(m.end) + 1).wrapAll(columnDiv);
						}	
					}	
					//Hide loader and show tiles -------------------------------------------------------- //
					setTimeout(function() {
						$el.closest('.tl-outer').find('.tl-loader').hide();
						$el.removeClass('invisible');
						//Set animations ---------------------------------------------------------------- //
						var tempAnim = temp.animations;
						if (tempAnim) {
							for (anim in tempAnim) {
								var animObj = tempAnim[anim];
								pageTiles.eq(anim).attr({
									'data-animDelay': animObj.tlDelay,
									'data-animeClass': animObj.tlClassF
								});
							}		
							pageTiles.each(function() {
								var that = $(this);
								var tlClassF = that.attr('data-animeClass');
								var tlDelay = parseInt(that.attr('data-animDelay'));
								setTimeout(function() { that.addClass(tlClassF) }, tlDelay);								
							});
						}
					}, loader);					
				} else {
					console.log("Template's tiles number doesn't match actual tiles number");
				}		
			});
			
			//Trigger event
			$(document).trigger('tl.template.built', [$el]);
			
			//Page slider --------------------------------------------------------------------------- //
			$(document).on('click', '.tl-arrow-holder', function() {
				var that = $(this);
				if (pagesNum > 1) {
					var slider = that.closest('.tl-tiles-container').find('.' + pagesHolderClass);
					var curPage = parseInt(slider.attr('data-cur-page'));
					if (!slider.hasClass('.tl-animating')) {
						if (that.hasClass('tl-arrow-prev')) {
							if (curPage > 0) {
								var target = (curPage - 1);
								var targetMrg = target * 100;
								slider
									.addClass('tl-animating')
									.animate({'margin-left': -targetMrg + '%'}, slideDuration, sliderEasing)
									.queue(function() {
										slider.attr('data-cur-page', target).removeClass('tl-animating');
										checkArrows();
										$(this).dequeue();
									});
							}
						} else if (that.hasClass('tl-arrow-next')) {
							if (curPage < parseInt(pagesNum) - 1) {
								var target = (curPage + 1);
								var targetMrg = target * 100;
								slider
									.addClass('tl-animating')
									.animate({'margin-left': -targetMrg + '%'}, slideDuration, sliderEasing)
									.queue(function() {
										slider.attr('data-cur-page', target).removeClass('tl-animating');
										checkArrows();
										$(this).dequeue();
									});
							}
						}
					}
				}
			});
			
			var checkArrows = function() {
				var slider = $el.find('.' + pagesHolderClass);
				var curPage = slider.attr('data-cur-page');
				var prev = $el.find('.tl-arrow-prev');
				var next = $el.find('.tl-arrow-next');
				if (parseInt(pagesNum) - 1 == curPage) {
					next.hide();
					prev.show();
				} else if (curPage == 0) {
					prev.hide();
					next.show();
				} else {
					prev.show();
					next.show();
				}
			};
			
			//Toggle arrows
			checkArrows();
			
		},
				
		_getBootstrapClass: function(par) {
			if (par) {
				var $that = par.init;
				var $el = $that.$el;
				var win = par.win;
				var bootstrapMedia = $.fn[pluginName].bootstrapMedia;
				var winW = parseFloat(win.width());				
				if (winW < parseInt(bootstrapMedia.sm)) {
					var btsClass = 'xs';
				} else if (winW >= parseInt(bootstrapMedia.sm) && winW < parseInt(bootstrapMedia.md)) {
					var btsClass = 'sm';
				} else if (winW >= parseInt(bootstrapMedia.md) && winW < parseInt(bootstrapMedia.lg)) {
					var btsClass = 'md';
				} else if (winW >= parseInt(bootstrapMedia.lg)) {
					var btsClass = 'lg';
				}
				$el.attr('data-bts-class', btsClass);
			}
		},
		
		//Getters (no chainability) ---------------------------------------------------------------------- //
		getPluginData: function() {			
			var $el = this.$el;
			var pluginData = $.data($el,'storedAttr');
			console.log(pluginData);
			return pluginData;
		},
		
		//Public methods --------------------------------------------------------------------------------- //		
		destroy: function() {
			//console.log('destroy()');
			var $el = this.$el;
			var outer = $el.closest('.tl-outer');
			var pagesHolderClass = 'tl-pagesHolder';
			var $data = $.data($el, 'storedAttr');		
			$el.removeData()
				.attr('class', $data.orClass)
				.find('.tl-tile').each(function() {
					var that = $(this);
					var orContent = that.find('.tl-tile-content').html();
					var dorCl = that.attr('data-or-class');
					var orTileClass = (dorCl) ? dorCl : '';
					that.removeAttr('data-animdelay data-animeclass data-or-class').attr('class', orTileClass).html(orContent);
				});
			$el.removeAttr('data-bts-class').find('.tl-page').each(function() {
				$(this).removeAttr('data-page style');
			});
			$el.find('.tl-row').each(function() {
				var that = $(this);
				that.children().unwrap();
			});
			$el.find('.tl-col').each(function() {
				var that = $(this);
				that.children().unwrap();
			});
			outer.find('.tl-loader').remove();
			outer.children().unwrap();
			$el.find('.tl-arrow-holder').remove();
			$el.find('.' + pagesHolderClass).children().unwrap();
		}
		
	}
		
	$.fn[pluginName] = function(options) {
		var args = arguments;	
		var selector = $(this).selector;
		if (options === undefined || typeof options === 'object') {
			return this.each(function() {			
				if (!$.data(this, 'plugin_' + pluginName)) {
					$.data(this, 'plugin_' + pluginName, new Plugin(this, options, selector));
				}
			});	
		} else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
			if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
				var instance = $.data(this[0], 'plugin_' + pluginName);
				return instance[options].apply(instance, Array.prototype.slice.call(args,1));
			} else {
				return this.each(function() {
					var instance = $.data(this, 'plugin_' + pluginName);
					if (instance instanceof Plugin && typeof instance[options] === 'function') {
						instance[options].apply(instance, Array.prototype.slice.call(args, 1));
					}
				});
			}
		}
	}
		
	$.fn[pluginName].getters = ['getPluginData'];
	
	$.fn[pluginName].defaults = {
		loader: 500, // if loader > 0 --> show loader else load instantly	
		loaderHtml: false,	//[string] --> provide a custom loader html
		templateObj: false,	//[object] --> provide a custom template object
		pageHome: 0,	//[number] --> set the home page (if pageNum > 1)
		tilePadding: false,	//[string] --> set tile padding in px or % or em etc
		tileRatio: false,	//[number] --> set tile height/width ratio
		sliderEasing: 'easeInOutExpo',
		slideDuration: 450
	}
	
	$.fn[pluginName].bootstrapMedia = {
		sm: '768',
		md: '992',
		lg: '1200'
	}
	
	$.fn[pluginName].templates = {
		tempA: {
			tilesNum: 10,
			columns: {
				0: {
					colClass: 'tl-col col-md-12 col-lg-8',
					start: '0',
					end: '2'
				},
				1: {
					colClass: 'tl-col col-md-7 col-lg-6',
					start: '4',
					end: '6'
				},
				2: {
					colClass: 'tl-col col-md-12 col-lg-6',
					start: '7',
					end: '9'
				}
			},
			tiles: {
				0: 'col-xs-12 col-sm-6 col-md-7',
				1: 'col-xs-12 col-sm-6 col-md-3',
				2: 'col-xs-12 col-sm-6 col-md-4 col-md-offset-1',
				3: 'col-xs-12 col-sm-6 col-md-5 col-lg-4',
				4: 'col-xs-12 col-sm-6 col-md-6 col-lg-4',
				5: 'col-xs-12 col-sm-6 col-md-3 col-lg-2',
				6: 'col-xs-12 col-sm-6 col-md-5 col-lg-6',
				7: 'col-xs-12 col-sm-6 col-md-4',
				8: 'col-xs-12 col-sm-6 col-md-5 col-lg-6',
				9: 'col-xs-12 col-sm-6 col-md-3 col-lg-2'
			},
			animations: {
				0: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				1: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
				2: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				3: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				4: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:250 },
				5: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:550 },
				6: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				7: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:350 },
				8: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				9: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
			}
		},
		tempB: {
			tilesNum: 9,	
			columns: {
				0: {
					colClass: 'tl-col col-sm-12 col-md-5',
					start: '0',
					end: '2'
				},
				1: {
					colClass: 'tl-col col-sm-12 col-md-3',
					start: '3',
					end: '5'
				},
				2: {
					colClass: 'tl-col col-sm-12 col-md-4',
					start: '6',
					end: '8'
				}
			},
			tiles: {
				0: 'col-xs-12 col-sm-4 col-md-5',
				1: 'col-xs-12 col-sm-4 col-md-7',
				2: 'col-xs-12 col-sm-4 col-md-12',
				3: 'col-xs-12 col-sm-4 col-md-6',
				4: 'col-xs-12 col-sm-4 col-md-12',
				5: 'col-xs-12 col-sm-4 col-md-10',
				6: 'col-xs-12 col-sm-4 col-md-12',
				7: 'col-xs-12 col-sm-4 col-md-4',
				8: 'col-xs-12 col-sm-4 col-md-8'
			}
		},
		tempC: {
			tilesNum: 10,
			rows: {
				0: {
					rowClass: 'tl-row col-xs-12',
					start: '0',
					end: '3'
				},
				1: {
					rowClass: 'tl-row col-xs-12',
					start: '4',
					end: '9'
				}
			},
			columns: {
				0: {
					colClass: 'tl-col col-md-3',
					start: '1',
					end: '2'
				}
			},
			tiles: {
				0: 'col-xs-12 col-sm-6 col-md-5',
				1: 'col-xs-12 col-sm-6 col-md-8',
				2: 'col-xs-12 col-sm-6 col-md-12',
				3: 'col-xs-12 col-sm-6 col-md-4',
				4: 'col-xs-12 col-sm-6 col-md-2',
				5: 'col-xs-12 col-sm-6 col-md-1',
				6: 'col-xs-12 col-sm-6 col-md-3',
				7: 'col-xs-12 col-sm-6 col-md-2',
				8: 'col-xs-12 col-sm-6 col-md-3',
				9: 'col-xs-12 col-sm-6 col-md-1'
			},
			animations: {
				0: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				1: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
				2: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				3: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				4: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:250 },
				5: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:550 },
				6: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				7: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:350 },
				8: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:150 },
				9: { tlClass:'tl-scale', tlClassF:'tl-scale-up', tlDelay:50 },
			},
			config: {
				// 0: {
					// //padding: '1',
					// ratio: '0.7' 
				// },
				// 3: {
					// ratio: '0.72' 
				// }
			}
		}		
	}
		
})(jQuery, window, document);