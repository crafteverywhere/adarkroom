/**
 * Module that registers the starship!
 */
var Ship = {
	LIFTOFF_COOLDOWN: 120,
	ALLOY_PER_HULL: 1,
	ALLOY_PER_THRUSTER: 1,
	BASE_HULL: 0,
	BASE_THRUSTERS: 1,
	
	name: "Ship",
	init: function(options) {
		this.options = $.extend(
			this.options,
			options
		);
		
		if(!$SM.get('features.location.spaceShip')) {
			$SM.set('features.location.spaceShip', true);
			$SM.setM('game.spaceShip', {
				hull: Ship.BASE_HULL,
				thrusters: Ship.BASE_THRUSTERS
			});
		}
		
		// Create the Ship tab
		this.tab = Header.addLocation("古老飞船", "ship", Ship);
		
		// Create the Ship panel
		this.panel = $('<div>').attr('id', "shipPanel")
			.addClass('location')
			.appendTo('div#locationSlider');
		
		Engine.updateSlider();
		
		// Draw the hull label
		var hullRow = $('<div>').attr('id', 'hullRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('hull:').appendTo(hullRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.hull')).appendTo(hullRow);
		$('<div>').addClass('clear').appendTo(hullRow);
		
		// Draw the thrusters label
		var engineRow = $('<div>').attr('id', 'engineRow').appendTo('div#shipPanel');
		$('<div>').addClass('row_key').text('engine:').appendTo(engineRow);
		$('<div>').addClass('row_val').text($SM.get('game.spaceShip.thrusters')).appendTo(engineRow);
		$('<div>').addClass('clear').appendTo(engineRow);
		
		// Draw the reinforce button
		new Button.Button({
			id: 'reinforceButton',
			text: '强化机体',
			click: Ship.reinforceHull,
			width: '100px',
			cost: {'异星合金': Ship.ALLOY_PER_HULL}
		}).appendTo('div#shipPanel');
		
		// Draw the engine button
		new Button.Button({
			id: 'engineButton',
			text: '升级引擎',
			click: Ship.upgradeEngine,
			width: '100px',
			cost: {'异星合金': Ship.ALLOY_PER_THRUSTER}
		}).appendTo('div#shipPanel');
		
		// Draw the lift off button
		var b = new Button.Button({
			id: 'liftoffButton',
			text: '升空',
			click: Ship.checkLiftOff,
			width: '100px',
			cooldown: Ship.LIFTOFF_COOLDOWN
		}).appendTo('div#shipPanel');
		
		if($SM.get('game.spaceShip.hull') <= 0) {
			Button.setDisabled(b, true);
		}
		
		// Init Space
		Space.init();
		
		//subscribe to stateUpdates
		$.Dispatch('stateUpdate').subscribe(Ship.handleStateUpdates);
	},
	
	options: {}, // Nothing for now
	
	onArrival: function(transition_diff) {
		Ship.setTitle();
		if(!$SM.get('game.spaceShip.seenShip')) {
			Notifications.notify(Ship, '破碎云层的上方，流浪者舰队在盘旋着.我们已经在这块大石头上耽搁太久了.');
			$SM.set('game.spaceShip.seenShip', true);
		}

		Engine.moveStoresView(null, transition_diff);
	},
	
	setTitle: function() {
		if(Engine.activeModule == this) {
			document.title = "古老飞船";
		}
	},
	
	reinforceHull: function() {
		if($SM.get('stores["alien alloy"]', true) < Ship.ALLOY_PER_HULL) {
			Notifications.notify(Ship, "异星合金不足");
			return false;
		}
		$SM.add('stores["alien alloy"]', -Ship.ALLOY_PER_HULL);
		$SM.add('game.spaceShip.hull', 1);
		if($SM.get('game.spaceShip.hull') > 0) {
			Button.setDisabled($('#liftoffButton', Ship.panel), false);
		}
		$('#hullRow .row_val', Ship.panel).text($SM.get('game.spaceShip.hull'));
	},
	
	upgradeEngine: function() {
		if($SM.get('stores["alien alloy"]', true) < Ship.ALLOY_PER_THRUSTER) {
			Notifications.notify(Ship, "异星合金不足");
			return false;
		}
		$SM.add('stores["alien alloy"]', -Ship.ALLOY_PER_THRUSTER);
		$SM.add('game.spaceShip.thrusters', 1);
		$('#engineRow .row_val', Ship.panel).text($SM.get('game.spaceShip.thrusters'));
	},
	
	getMaxHull: function() {
		return $SM.get('game.spaceShip.hull');
	},
	
	checkLiftOff: function() {
		if(!$SM.get('game.spaceShip.seenWarning')) {
			Events.startEvent({
				title: '准备好离开了吗?',
				scenes: {
					'start': {
						text: [
							"是时候离开这里，永远也不再回来了."
						],
						buttons: {
							'fly': {
								text: 'lift off',
								onChoose: function() {
									$SM.set('game.spaceShip.seenWarning', true);
									Ship.liftOff();
								},
								nextScene: 'end'
							},
							'wait': {
								text: 'linger',
								onChoose: function() {
									Button.clearCooldown($('#liftoffButton'));
								},
								nextScene: 'end'
							}
						}
					}
				}
			});
		} else {
			Ship.liftOff();
		}
	},
	
	liftOff: function () {
		$('#outerSlider').animate({top: '700px'}, 300);
		Space.onArrival();
		Engine.activeModule = Space;
	},
	
	handleStateUpdates: function(e){
		
	}
};
