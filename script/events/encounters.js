/**
 * Events that can occur when wandering around the world
 **/
Events.Encounters = [
	/* Tier 1 */
	{ /* Snarling Beast */
		title: '咆哮的野兽',
 		isAvailable: function() {
 			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '咆哮的野兽',
 				chara: 'B',
 				damage: 1,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 5,
 				loot: {
 					'毛皮': {
 						min: 1,
 						max: 3,
 						chance: 1
 					},
 					'肉': {
 						min: 1,
 						max: 3,
 						chance: 1
 					},
 					'牙齿': {
 						min: 1,
 						max: 3,
 						chance: 0.8
 					}
 				},
 				notification: '一只咆哮的野兽从灌木丛里蹿了出来。'
 			}
 		}
	},
	{ /* Gaunt Man */
     	title: '憔悴的男子',
  		isAvailable: function() {
  			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '憔悴的男子',
  				chara: 'G',
  				damage: 2,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 6,
  				loot: {
  					'布匹': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 1,
  						max: 2,
  						chance: 0.5
  					}
  				},
  				notification: '一名憔悴的男子靠了过来，眼中流露出疯狂。'
  			}
		}
  	},
	{ /* Strange Bird */
     	title: '怪鸟',
  		isAvailable: function() {
  			return World.getDistance() <= 10 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '怪鸟',
  				chara: 'B',
  				damage: 3,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 4,
  				loot: {
  					'鳞片': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.5
  					},
  					'肉': {
  						min: 1,
  						max: 3,
  						chance: 0.8
  					}
  				},
  				notification: '一只模样古怪的鸟快速掠过平原。'
  			}
		}
  	},
	/* Tier 2*/
	{ /* Shivering Man */
     	title: '颤抖的男子',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '颤抖的男子',
  				chara: 'S',
  				damage: 5,
  				hit: 0.5,
  				attackDelay: 1,
  				health: 20,
  				loot: {
  					'布匹': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'牙齿': {
  						min: 1,
  						max: 2,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.7
  					}
  				},
  				notification: '一名颤抖的男子靠了过来，以令人吃惊的怪力发起袭击。'
  			}
		}
  },
	{ /* Man-eater */
		title: '食人怪',
 		isAvailable: function() {
 			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '食人怪',
 				chara: 'E',
 				damage: 3,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 25,
 				loot: {
 					'毛皮': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'肉': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 0.8
 					}
 				},
 				notification: '一只巨大的生物袭来，爪子上鲜血淋漓。'
 			}
 		}
	},
	{ /* Scavenger */
     	title: '拾荒者',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '拾荒者',
  				chara: 'S',
  				damage: 4,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'布匹': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'铁': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '一名拾荒者贴了过来，想要发起偷袭。'
  			}
		}
  	},
	{ /* Huge Lizard */
     	title: '巨蜥',
  		isAvailable: function() {
  			return World.getDistance() > 10 && World.getDistance() <= 20 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '巨蜥',
  				chara: 'L',
  				damage: 5,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 20,
  				loot: {
  					'鳞片': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 5,
  						max: 10,
  						chance: 0.5
  					},
  					'肉': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					}
  				},
  				notification: '草丛疯摇，一只巨蜥扑了出来。'
  			}
		}
  	},
	/* Tier 3*/
	{ /* Feral Terror */
		title: '凶怪',
 		isAvailable: function() {
 			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FOREST;
 		},
 		scenes: {
 			'start': {
 				combat: true,
 				enemy: '凶怪',
 				chara: 'F',
 				damage: 6,
 				hit: 0.8,
 				attackDelay: 1,
 				health: 45,
 				loot: {
 					'毛皮': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'肉': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 0.8
 					}
 				},
 				notification: '一只超出想象的狂野的凶怪，从林子中扑将出来。'
 			}
 		}
	},
	{ /* Soldier */
     	title: '士兵',
  		isAvailable: function() {
  			return World.getDistance() > 20 && World.getTerrain() == World.TILE.BARRENS;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '士兵',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'衣服': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'子弹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'步枪': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '士兵从沙漠那边开火。'
  			}
		}
  	},
	{ /* Sniper */
     	title: '狙击手',
  		isAvailable: function() {
  			return World.getDistance() > 20 && World.getTerrain() == World.TILE.FIELD;
  		},
  		scenes: {
  			'start': {
  				combat: true,
  				enemy: '狙击手',
  				chara: 'S',
  				damage: 15,
  				hit: 0.8,
  				attackDelay: 4,
  				health: 30,
				ranged: true,
  				loot: {
  					'布匹': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'子弹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'步枪': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.1
  					}
  				},
  				notification: '从深草丛的某处射出一发子弹。'
  			}
		}
  	}
];
