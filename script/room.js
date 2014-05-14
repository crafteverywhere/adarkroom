/**
 * Module that registers the simple room functionality
 */
var Room = {
	// times in (minutes * seconds * milliseconds)
	_FIRE_COOL_DELAY: 5 * 60 * 1000, // time after a stoke before the fire cools
	_ROOM_WARM_DELAY: 30 * 1000, // time between room temperature updates
	_BUILDER_STATE_DELAY: 0.5 * 60 * 1000, // time between builder state updates
	_STOKE_COOLDOWN: 10, // cooldown to stoke the fire
	_NEED_WOOD_DELAY: 15 * 1000, // from when the stranger shows up, to when you need wood

	fire:null,
	temperature:null,
	buttons:{},

	Craftables: {
		'陷阱': {
			button: null,
			maximum: 10,
			availableMsg: '建造者说她能够制做陷阱来捕捉那些仍在野外活动的野兽',
			buildMsg: '陷阱越多，抓到的猎物就越多',
			maxMsg: "再增加陷阱已毫无裨益.",
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["陷阱"]', true);
				return {
					'木头': 10 + (n*10)
				};
			}
		},
		'货车': {
			button: null,
			maximum: 1,
			availableMsg: '建造者说她能够制造出货车，用来搬运木头',
			buildMsg: '摇摇晃晃的货车满载从森林运出的木头',
			type: 'building',
			cost: function() {
				return {
					'木头': 30
				};
			}
		},
		'小屋': {
			button: null,
			maximum: 20,
			availableMsg: "建造者说这里有许多流浪者，他们也会来工作.",
			buildMsg: '建造者在林中建立了一栋小屋，她说这个消息很快就会流传出去',
			maxMsg: '再没有空地可以建小屋了',
			type: 'building',
			cost: function() {
				var n = $SM.get('game.buildings["hut"]', true);
				return {
					'木头': 100 + (n*50)
				};
			}
		},
		'旅馆': {
			button: null,
			maximum: 1,
			availableMsg: '假如工具齐备，村民也能帮忙狩猎',
			buildMsg: '供猎人居住的旅馆已经矗立在林中，距离村子不远',
			type: 'building',
			cost: function() {
				return {
					'木头': 200,
					'毛皮': 10,
					'肉': 5
				};
			}
		},
		'贸易站': {
			button: null,
			maximum: 1,
			availableMsg: "贸易站有助于贸易.",
			buildMsg: "现在游牧部落有地方安营扎寨设立商铺了，他们也许会多逗留一段时间.",
			type: 'building',
			cost: function() {
				return {
					'木头': 400,
					'毛皮': 100
				};
			}
		},
		'制革屋': {
			button: null,
			maximum: 1,
			availableMsg: "建造者说皮革会很有用，而且村民能制出它.",
			buildMsg: '制革屋很快在村子一角建立了起来',
			type: 'building',
			cost: function() {
				return {
					'木头': 500,
					'毛皮': 50
				};
			}
		},
		'熏肉房': {
			button: null,
			maximum: 1,
			availableMsg: "应该把肉熏一下，否则它会腐坏.建造者说她能搞定这个.",
			buildMsg: '建造者完成了熏肉房，她看起来好饿',
			type: 'building',
			cost: function() {
				return {
					'木头': 600,
					'肉': 50
				};
			}
		},
		'工坊': {
			button: null,
			maximum: 1,
			availableMsg: "建造者说如果她有工具的话能做出一些更精良的东西.",
			buildMsg: "工坊终于建好了.建造者激动不已.",
			type: 'building',
			cost: function() {
				return {
					'木头': 800,
					'皮革': 100,
					'鳞片': 10
				};
			}
		},
		'炼钢坊': {
			button: null,
			maximum: 1,
			availableMsg: "建造者说给村民工具的话他们就能帮忙炼钢.",
			buildMsg: "炼钢坊开工后，一缕黑烟飘向村庄上空.",
			type: 'building',
			cost: function() {
				return {
					'木头': 1500,
					'铁': 100,
					'煤': 100
				};
			}
		},
		'军械坊': {
			button: null,
			maximum: 1,
			availableMsg: "建造者说拥有稳定的子弹来源很有必要.",
			buildMsg: "警械坊建好了,欢迎使用这些过时的武器.",
			type: 'building',
			cost: function() {
				return {
					'木头': 3000,
					'钢': 100,
					'硫磺': 50
				};
			}
		},
		'火把': {
			button: null,
			type: 'tool',
			buildMsg: '驱散黑暗的火把',
			cost: function() {
				return {
					'木头': 1,
					'布匹': 1
				};
			}
		},
		'水袋': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '起码能装那么点儿水',
			cost: function() {
				return {
					'皮革': 50
				};
			}
		},
		'水桶': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '为更长的探索之旅提供充足的水源',
			cost: function() {
				return {
					'皮革': 100,
					'铁': 20
				};
			}
		},
		'水罐': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '再也不担心口渴',
			cost: function() {
				return {
					'铁': 100,
					'钢': 50
				};
			}
		},
		'骨枪': {
			button: null,
			type: 'weapon',
			buildMsg: "这柄标枪不怎么精致，但用来戳刺手感不错",
			cost: function() {
				return {
					'木头': 100,
					'牙齿': 5
				};
			}
		},
		'双肩包': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '荒地旅行时携带更多物资',
			cost: function() {
				return {
					'皮革': 200
				};
			}
		},
		'篷车': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '篷车能够携带许多物资',
			cost: function() {
				return {
					'木头': 500,
					'铁': 100
				};
			}
		},
		'车队': {
			button: null,
			type: 'upgrade',
			maximum: 1,
			buildMsg: '车队几乎能把所有东西都装下',
			cost: function() {
				return {
					'木头': 1000,
					'铁': 200,
					'钢': 100
				};
			}
		},
		'皮甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "皮革不算结实，但总比披块破布强吧",
			cost: function() {
				return {
					'皮革': 200,
					'鳞片': 20
				};
			}
		},
		'铁甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "铁可比皮的好",
			cost: function() {
				return {
					'皮革': 200,
					'铁': 100
				};
			}
		},
		'钢甲': {
			type: 'upgrade',
			maximum: 1,
			buildMsg: "钢的总比铁的强",
			cost: function() {
				return {
					'皮革': 200,
					'钢': 100
				};
			}
		},
		'铁剑': {
			button: null,
			type: 'weapon',
			buildMsg: "剑很锋利，能够在野外提供不错的防护",
			cost: function() {
				return {
					'木头': 200,
					'皮革': 50,
					'铁': 20
				};
			}
		},
		'钢剑': {
			button: null,
			type: 'weapon',
			buildMsg: "好钢出利刃",
			cost: function() {
				return {
					'木头': 500,
					'皮革': 100,
					'钢': 20
				};
			}
		},
		'步枪': {
			type: 'weapon',
			buildMsg: "黑火药和子弹，就像过去那样",
			cost: function() {
				return {
					'木头': 200,
					'钢': 50,
					'sulphur': 50
				};
			}
		}
	},

	TradeGoods: {
		'鳞片': {
			type: 'good',
			cost: function() {
				return { '毛皮': 150 };
			}
		},
		'牙齿': {
			type: 'good',
			cost: function() {
				return { '毛皮': 300 };
			}
		},
		'铁': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 150,
					'鳞片': 50
				};
			}
		},
		'煤': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 200,
					'牙齿': 50
				};
			}
		},
		'钢': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 300,
					'鳞片': 50,
					'牙齿': 50
				};
			}
		},
		'药剂': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 50, '牙齿': 30
				};
			}
		},
		'子弹': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 10
				};
			}
		},
		'能量元件': {
			type: 'good',
			cost: function() {
				return {
					'鳞片': 10,
					'牙齿': 10
				};
			}
		},
		'套索': {
			type: 'weapon',
			cost: function() {
				return {
					'牙齿': 10
				};
			}
		},
		'手雷': {
			type: 'weapon',
			cost: function() {
				return {
					'鳞片': 100,
					'牙齿': 50
				};
			}
		},
		'刺刀': {
			type: 'weapon',
			cost: function() {
				return {
					'鳞片': 500,
					'牙齿': 250
				};
			}
		},
		'异星合金': {
			type: 'good',
			cost: function() {
				return {
					'毛皮': 1500,
					'鳞片': 750,
					'牙齿': 300
				};
			}
		},
		'罗盘': {
			type: 'upgrade',
			maximum: 1,
			cost: function() {
				return { 
					'毛皮': 400, 
					'鳞片': 20, 
					'牙齿': 10 
				};
			}
		}
	},

	MiscItems: {
	  '激光枪': {
	    type: 'weapon'
	  }
	},

	name: "Room",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);

		if(Engine._debug) {
			this._ROOM_WARM_DELAY = 5000;
			this._BUILDER_STATE_DELAY = 5000;
			this._STOKE_COOLDOWN = 0;
			this._NEED_WOOD_DELAY = 5000;
		}

		if(typeof $SM.get('features.location.room') == 'undefined') {
			$SM.set('features.location.room', true);
			$SM.set('game.builder.level', -1);
		}

		Room.temperature = this.TempEnum.Cold;
		Room.fire = this.FireEnum.Dead;


		// Create the room tab
		this.tab = Header.addLocation("小黑屋", "room", Room);

		// Create the Room panel
		this.panel = $('<div>')
			.attr('id', "roomPanel")
			.addClass('location')
			.appendTo('div#locationSlider');

		Engine.updateSlider();

		// Create the light button
		new Button.Button({
			id: 'lightButton',
			text: '生火',
			click: Room.lightFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: {'木头': 5}
		}).appendTo('div#roomPanel');

		// Create the stoke button
		new Button.Button({
			id: 'stokeButton',
			text: "添柴",
			click: Room.stokeFire,
			cooldown: Room._STOKE_COOLDOWN,
			width: '80px',
			cost: {'木头': 1}
		}).appendTo('div#roomPanel');

		// Create the stores container
		$('<div>').attr('id', 'storesContainer').appendTo('div#roomPanel');

		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Room.handleStateUpdates);

		Room.updateButton();
		Room.updateStoresView();
		Room.updateIncomeView();
		Room.updateBuildButtons();

		Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);

		/*
		 * Builder states:
		 * 0 - Approaching
		 * 1 - Collapsed
		 * 2 - Shivering
		 * 3 - Sleeping
		 * 4 - Helping
		 */
		if($SM.get('game.builder.level') >= 0 && $SM.get('game.builder.level') < 3) {
			Room._builderTimer = setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		if($SM.get('game.builder.level') == 1 && $SM.get('stores.["木头"]', true) < 0) {
			setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		}
		setTimeout($SM.collectIncome, 1000);

		Notifications.notify(Room, "房间" + Room.temperature.text);
		Notifications.notify(Room, "火堆" + Room.fire.text);
	},

	options: {}, // Nothing for now

	onArrival: function(transition_diff) {
		Room.setTitle();
		if(Room.changed) {
			Notifications.notify(Room, "火堆" + Room.fire.text);
			Notifications.notify(Room, "房间" + Room.temperature.text);
			Room.changed = false;
		}
		if($SM.get('game.builder.level') == 3) {
			$SM.add('game.builder.level', 1);
			$SM.setIncome('建造者', {
				delay: 10,
				stores: {'木头' : 2 }
			});
			Room.updateIncomeView();
			Notifications.notify(Room, "一名陌生人出现在火堆前.她说她能帮忙.帮忙建些东西.");
		}

		Engine.moveStoresView(null, transition_diff);
	},

	TempEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Freezing: { value: 0, text: '寒冷刺骨' },
		Cold: { value: 1, text: '很冷' },
		Mild: { value: 2, text: '很宜人' },
		Warm: { value: 3, text: '很温暖' },
		Hot: { value: 4, text: '很热' }
	},

	FireEnum: {
		fromInt: function(value) {
			for(var k in this) {
				if(typeof this[k].value != 'undefined' && this[k].value == value) {
					return this[k];
				}
			}
			return null;
		},
		Dead: { value: 0, text: '熄灭了' },
		Smoldering: { value: 1, text: '开始冒烟' },
		Flickering: { value: 2, text: '冒出火苗' },
		Burning: { value: 3, text: '燃烧着' },
		Roaring: { value: 4, text: '熊熊燃烧' }
	},

	setTitle: function() {
		var title = Room.fire.value < 2 ? "小黑屋" : "生火间";
		if(Engine.activeModule == this) {
			document.title = title;
		}
		$('div#location_room').text(title);
	},

	updateButton: function() {
		var light = $('#lightButton.button');
		var stoke = $('#stokeButton.button');
		if(Room.fire.value == Room.FireEnum.Dead.value && stoke.css('display') != 'none') {
			stoke.hide();
			light.show();
			if(stoke.hasClass('disabled')) {
				Button.cooldown(light);
			}
		} else if(light.css('display') != 'none') {
			stoke.show();
			light.hide();
			if(light.hasClass('disabled')) {
				Button.cooldown(stoke);
			}
		}

		if(!$SM.get('stores.["木头"]')) {
			light.addClass('free');
			stoke.addClass('free');
		} else {
			light.removeClass('free');
			stoke.removeClass('free');
		}
	},

	_fireTimer: null,
	_tempTimer: null,
	lightFire: function() {
		var wood = $SM.get('stores.["木头"]');
		if(wood < 5) {
			Notifications.notify(Room, "生火的木头不够了");
			Button.clearCooldown($('#lightButton.button'));
			return;
		} else if(wood > 4) {
			$SM.set('stores.["木头"]', wood - 5);
		}
		Room.fire = Room.FireEnum.Burning;
		Room.onFireChange();
	},

	stokeFire: function() {
		var wood = $SM.get('stores.["木头"]');
		if(wood === 0) {
			Notifications.notify(Room, "木头用光了");
			Button.clearCooldown($('#stokeButton.button'));
			return;
		}
		if(wood > 0) {
			$SM.set('stores.["木头"]', wood - 1);
		}
		if(Room.fire.value < 4) {
			Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
		}
		Room.onFireChange();
	},

	onFireChange: function() {
		if(Engine.activeModule != Room) {
			Room.changed = true;
		}
		Notifications.notify(Room, "火堆" + Room.fire.text, true);
		if(Room.fire.value > 1 && $SM.get('game.builder.level') < 0) {
			$SM.set('game.builder.level', 0);
			Notifications.notify(Room, "火光映出窗外，投入黑暗中");
			setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}	
		window.clearTimeout(Room._fireTimer);
		Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
		Room.updateButton();
		Room.setTitle();
	},

	coolFire: function() {
		var wood = $SM.get('stores.["木头"]');
		if(Room.fire.value <= Room.FireEnum.Flickering.value &&
			$SM.get('game.builder.level') > 3 && wood > 0) {
			Notifications.notify(Room, "建造者添加了柴火", true);
			$SM.set('stores.["木头"]', wood - 1);
			Room.fire = Room.FireEnum.fromInt(Room.fire.value + 1);
		}
		if(Room.fire.value > 0) {
			Room.fire = Room.FireEnum.fromInt(Room.fire.value - 1);
			Room._fireTimer = setTimeout(Room.coolFire, Room._FIRE_COOL_DELAY);
			Room.onFireChange();
		}
	},

	adjustTemp: function() {
		var old = Room.temperature.value;
		if(Room.temperature.value > 0 && Room.temperature.value > Room.fire.value) {
			Room.temperature = Room.TempEnum.fromInt(Room.temperature.value - 1);
			Notifications.notify(Room, "the room is " + Room.temperature.text, true);
		}
		if(Room.temperature.value < 4 && Room.temperature.value < Room.fire.value) {
			Room.temperature = Room.TempEnum.fromInt(Room.temperature.value + 1);
			Notifications.notify(Room, "the room is " + Room.temperature.text, true);
		}
		if(Room.temperature.value != old) {
			Room.changed = true;
		}
		Room._tempTimer = setTimeout(Room.adjustTemp, Room._ROOM_WARM_DELAY);
	},

	unlockForest: function() {
		$SM.set('stores.["木头"]', 4);
		Outside.init();
		Notifications.notify(Room, "风在屋外咆哮");
		Notifications.notify(Room, "木头用光了");
		Engine.event('progress', 'outside');
	},

	updateBuilderState: function() {
		var lBuilder = $SM.get('game.builder.level');
		if(lBuilder == 0) {
			Notifications.notify(Room, "衣衫褴褛的陌生人蹒跚地步入门来，瘫倒在角落里");
			lBuilder = $SM.setget('game.builder.level', 1);
			setTimeout(Room.unlockForest, Room._NEED_WOOD_DELAY);
		} 
		else if(lBuilder < 3 && Room.temperature.value >= Room.TempEnum.Warm.value) {
			var msg = "";
			switch(lBuilder) {
			case 1:
				msg = "陌生人瑟瑟发抖，呢喃不已，听不清在说些什么";
				break;
			case 2:
				msg = "角落里的陌生人不再颤抖了,她的呼吸平静了下来";
				break;
			}
			Notifications.notify(Room, msg);
			if(lBuilder < 3) {
				lBuilder = $SM.setget('game.builder.level', lBuilder + 1);
			}
		}
		if(lBuilder < 3) {
			setTimeout(Room.updateBuilderState, Room._BUILDER_STATE_DELAY);
		}
		Engine.saveGame();
	},

	updateStoresView: function() {
		var stores = $('div#stores');
		var weapons = $('div#weapons');
		var needsAppend = false, wNeedsAppend = false, newRow = false;
		if(stores.length == 0) {
			stores = $('<div>').attr({
				id: 'stores'
			}).css('opacity', 0);
			needsAppend = true;
		}
		if(weapons.length == 0) {
			weapons = $('<div>').attr({
				id: 'weapons'
			}).css('opacity', 0);
			wNeedsAppend = true;
		}
		for(var k in $SM.get('stores')) {

			var type = null;
			if(Room.Craftables[k]) {
				type = Room.Craftables[k].type;
			} else if(Room.TradeGoods[k]) {
				type = Room.TradeGoods[k].type;
			} else if (Room.MiscItems[k]) {
			  type = Room.MiscItems[k].type;
			}

			var location;
			switch(type) {
			case 'upgrade':
				// Don't display upgrades on the Room screen
				continue;
			case 'weapon':
				location = weapons;
				break;
			default:
				location = stores;
				break;
			}

			var id = "row_" + k.replace(' ', '-');
			var row = $('div#' + id, location);
			var num = $SM.get('stores["'+k+'"]');

			if(typeof num != 'number' || isNaN(num)) {
				// No idea how counts get corrupted, but I have reason to believe that they occassionally do.
				// Build a little fence around it!
				num = 0;
				$SM.set('stores["'+k+'"]', 0);
			}


			// thieves?
			if(typeof $SM.get('game.thieves') == 'undefined' && num > 5000 && $SM.get('features.location.world')) {
				$SM.startThieves();
			}

			if(row.length == 0 && num > 0) {
				row = $('<div>').attr('id', id).addClass('storeRow');
				$('<div>').addClass('row_key').text(k).appendTo(row);
				$('<div>').addClass('row_val').text(Math.floor(num)).appendTo(row);
				$('<div>').addClass('clear').appendTo(row);
				var curPrev = null;
				location.children().each(function(i) {
					var child = $(this);
					var cName = child.attr('id').substring(4).replace('-', ' ');
					if(cName < k && (curPrev == null || cName > curPrev)) {
						curPrev = cName;
					}
				});
				if(curPrev == null) {
					row.prependTo(location);
				} else {
					row.insertAfter(location.find('#row_' + curPrev.replace(' ', '-')));
				}
				newRow = true;
			} else if(num>= 0){
				$('div#' + row.attr('id') + ' > div.row_val', location).text(Math.floor(num));
			}
		}

		if(needsAppend && stores.children().length > 0) {
			stores.appendTo('div#storesContainer');
			stores.animate({opacity: 1}, 300, 'linear');
		}

		if(wNeedsAppend && weapons.children().length > 0) {
			weapons.appendTo('div#storesContainer');
			weapons.animate({opacity: 1}, 300, 'linear');
		}

		if(newRow) {
			Room.updateIncomeView();
		}

		if($("div#outsidePanel").length) {
			Outside.updateVillage();
		}
	},

	updateIncomeView: function() {
		var stores = $('div#stores');
		if(stores.length == 0 || typeof $SM.get('income') == 'undefined') return;
		$('div.storeRow', stores).each(function(index, el) {
			el = $(el);
			$('div.tooltip', el).remove();
			var tt = $('<div>').addClass('tooltip bottom right');
			var storeName = el.attr('id').substring(4).replace('-', ' ');
			for(var incomeSource in $SM.get('income')) {
				var income = $SM.get('income["'+incomeSource+'"]');
				for(var store in income.stores) {
					if(store == storeName && income.stores[store] != 0) {
						$('<div>').addClass('row_key').text(incomeSource).appendTo(tt);
						$('<div>')
							.addClass('row_val')
							.text(Engine.getIncomeMsg(income.stores[store], income.delay))
							.appendTo(tt);
					}
				}
			}
			if(tt.children().length > 0) {
				tt.appendTo(el);
			}
		});
	},

	buy: function(buyBtn) {
		var thing = $(buyBtn).attr('buildThing');
		var good = Room.TradeGoods[thing];
		var numThings = $SM.get('stores["'+thing+'"]', true);
		if(numThings < 0) numThings = 0;
		if(good.maximum <= numThings) {
			return;
		}

		var storeMod = {};
		var cost = good.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, "不足" + k);
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);

		Notifications.notify(Room, good.buildMsg);

		$SM.add('stores["'+thing+'"]', 1);

		if(thing == '罗盘') {
			Path.openPath();
		}
	},

	build: function(buildBtn) {
		var thing = $(buildBtn).attr('buildThing');
		if(Room.temperature.value <= Room.TempEnum.Cold.value) {
			Notifications.notify(Room, "建造者瑟瑟发抖");
			return false;
		}
		var craftable = Room.Craftables[thing];

		var numThings = 0; 
		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'tool':
		case 'upgrade':
			numThings = $SM.get('stores["'+thing+'"]', true);
			break;
		case 'building':
			numThings = $SM.get('game.buildings["'+thing+'"]', true);
			break;
		}

		if(numThings < 0) numThings = 0;
		if(craftable.maximum <= numThings) {
			return;
		}

		var storeMod = {};
		var cost = craftable.cost();
		for(var k in cost) {
			var have = $SM.get('stores["'+k+'"]', true);
			if(have < cost[k]) {
				Notifications.notify(Room, "不足" + k);
				return false;
			} else {
				storeMod[k] = have - cost[k];
			}
		}
		$SM.setM('stores', storeMod);

		Notifications.notify(Room, craftable.buildMsg);

		switch(craftable.type) {
		case 'good':
		case 'weapon':
		case 'upgrade':
		case 'tool':
			$SM.add('stores["'+thing+'"]', 1);
			break;
		case 'building':
			$SM.add('game.buildings["'+thing+'"]', 1);
			break;
		}		
	},

	needsWorkshop: function(type) {
		return type == 'weapon' || type == 'upgrade' || type =='tool';
	},

	craftUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		}
		if($SM.get('game.builder.level') < 4) return false;
		var craftable = Room.Craftables[thing];
		if(Room.needsWorkshop(craftable.type) && $SM.get('game.buildings["工坊"]', true) == 0) return false;
		var cost = craftable.cost();

		//show button if one has already been built
		if($SM.get('game.buildings["'+thing+'"]') > 0){
			Room.buttons[thing] = true;
			return true;
		}
		// Show buttons if we have at least 1/2 the wood, and all other components have been seen.
		if($SM.get('stores.["木头"]', true) < cost['木头'] * 0.5) {
			return false;
		}
		for(var c in cost) {
			if(!$SM.get('stores["'+c+'"]')) {
				return false;
			}
		}

		Room.buttons[thing] = true;
		//don't notify if it has already been built before
		if(!$SM.get('game.buildings["'+thing+'"]')){
			Notifications.notify(Room, craftable.availableMsg);
		}
		return true;
	},

	buyUnlocked: function(thing) {
		if(Room.buttons[thing]) {
			return true;
		} else if($SM.get('game.buildings["trading post"]', true) > 0) {
			if(thing == 'compass' || typeof $SM.get('stores["'+thing+'"]') != 'undefined') {
				// Allow the purchase of stuff once you've seen it
				return true;
			}
		}
		return false;
	},

	updateBuildButtons: function() {
		var buildSection = $('#buildBtns');
		var needsAppend = false;
		if(buildSection.length == 0) {
			buildSection = $('<div>').attr('id', 'buildBtns').css('opacity', 0);
			needsAppend = true;
		}

		var craftSection = $('#craftBtns');
		var cNeedsAppend = false;
		if(craftSection.length == 0 && $SM.get('game.buildings["工坊"]', true) > 0) {
			craftSection = $('<div>').attr('id', 'craftBtns').css('opacity', 0);
			cNeedsAppend = true;
		}

		var buySection = $('#buyBtns');
		var bNeedsAppend = false;
		if(buySection.length == 0 && $SM.get('game.buildings["贸易站"]', true) > 0) {
			buySection = $('<div>').attr('id', 'buyBtns').css('opacity', 0);
			bNeedsAppend = true;
		}

		for(var k in Room.Craftables) {
			craftable = Room.Craftables[k];
			var max = $SM.num(k, craftable) + 1 > craftable.maximum;
			if(craftable.button == null) {
				if(Room.craftUnlocked(k)) {
					var loc = Room.needsWorkshop(craftable.type) ? craftSection : buildSection;
					craftable.button = new Button.Button({
						id: 'build_' + k,
						cost: craftable.cost(),
						text: k,
						click: Room.build,
						width: '80px',
						ttPos: loc.children().length > 10 ? 'top right' : 'bottom right'
					}).css('opacity', 0).attr('buildThing', k).appendTo(loc).animate({opacity: 1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', craftable.button);
				costTooltip.empty();
				var cost = craftable.cost();
				for(var k in cost) {
					$("<div>").addClass('row_key').text(k).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
				}
				if(max && !craftable.button.hasClass('disabled')) {
					Notifications.notify(Room, craftable.maxMsg);
				}
			}
			if(max) {
				Button.setDisabled(craftable.button, true);
			} else {
				Button.setDisabled(craftable.button, false);
			}
		}

		for(var k in Room.TradeGoods) {
			good = Room.TradeGoods[k];
			var max = $SM.num(k, good) + 1 > good.maximum;
			if(good.button == null) {
				if(Room.buyUnlocked(k)) {
					good.button = new Button.Button({
						id: 'build_' + k,
						cost: good.cost(),
						text: k,
						click: Room.buy,
						width: '80px'
					}).css('opacity', 0).attr('buildThing', k).appendTo(buySection).animate({opacity:1}, 300, 'linear');
				}
			} else {
				// refresh the tooltip
				var costTooltip = $('.tooltip', good.button);
				costTooltip.empty();
				var cost = good.cost();
				for(var k in cost) {
					$("<div>").addClass('row_key').text(k).appendTo(costTooltip);
					$("<div>").addClass('row_val').text(cost[k]).appendTo(costTooltip);
				}
				if(max && !good.button.hasClass('disabled')) {
					Notifications.notify(Room, good.maxMsg);
				}
			}
			if(max) {
				Button.setDisabled(good.button, true);
			} else {
				Button.setDisabled(good.button, false);
			}
		}

		if(needsAppend && buildSection.children().length > 0) {
			buildSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(cNeedsAppend && craftSection.children().length > 0) {
			craftSection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
		if(bNeedsAppend && buildSection.children().length > 0) {
			buySection.appendTo('div#roomPanel').animate({opacity: 1}, 300, 'linear');
		}
	},

	handleStateUpdates: function(e){
		if(e.category == 'stores'){
			Room.updateStoresView();
			Room.updateBuildButtons();
		} else if(e.category == 'income'){
			Room.updateStoresView();
			Room.updateIncomeView();
		} else if(e.stateName.indexOf('game.buildings') == 0){
			Room.updateBuildButtons();
		}
	}
};
