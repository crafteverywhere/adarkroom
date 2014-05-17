/**
 * Events that only occur at specific times. Launched manually.
 **/
Events.Setpieces = {
	"前哨": { /* Friendly Outpost */
		title: '前哨',
		scenes: {
			'start': {
				text: [
					'荒野中安全的地方.'
				],
				notification: '荒野中安全的地方.',
				loot: {
					'熏肉': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				onLoad: function() {
					World.useOutpost();
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"迷雾沼泽": { /* Swamp */
		title: '迷雾沼泽',
		scenes: {
			'start': {
				text: [
					'腐烂的芦草冒出沼泽的表面.',
					'一只孤独的蛙蹲坐在淤泥中，一言不发.'
				],
				notification: '凝滞的空气中，沼泽正在溃烂.',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {1: 'cabin'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'cabin': {
				text: [
					'沼泽深处现出一栋苔藓密布的小屋.',
					'一名年迈的流浪者坐在里头，，看起来正在发呆.'
				],
				buttons: {
					'talk': {
						cost: {'护身符': 1},
						text: '对话',
						nextScene: {1: 'talk'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'talk': {
				text: [
					'流浪者接过护身符，缓缓点了点头.',
					'他谈起曾率领一支伟大的舰队前往新世界.',
					'以莫测的毁灭之力填补流浪者心中的欲壑.',
					'而如今，他待在这里的时光，都是在为此赎罪.'
				],
				onLoad: function() {
					$SM.addPerk('美食家');
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"cave": { /* Cave */
		title: '潮湿洞穴',
		scenes: {
			'start': {
				text: [
					'洞口宽敞而黑暗.',
					"看不清里面有什么."
				],
				notification: '大地裂开，宛如古老的伤痕.',
				buttons: {
					'enter': {	
						text: '进入',
						cost: { torch: 1 },
						nextScene: {0.3: 'a1', 0.6: 'a2', 1: 'a3'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: '那受到惊吓的野兽正要捍卫它的巢穴.',
				loot: {
					'毛皮': {
						min: 1,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text: [
					'洞穴狭窄，几无立足之地.',
					"岩壁潮湿，覆盖着苔藓."
				],
				buttons: {
					'continue': {	
						text: '挤入深处',
						nextScene: {0.5: 'b2', 1: 'b3'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
			       '洞穴内出现一处老旧营地的遗迹.',
			       '破旧脏污的睡袋平躺着，上面蒙着一层薄薄的灰尘.'
				],
				loot: {
					'熏肉': {
						min: 1,
						max: 5,
						chance: 1
					},
					'火把': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'皮革': {
						min: 1,
						max: 5,
						chance: 0.3
					}
				},
				buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
			       '流浪者的尸体躺在狭小的洞穴里.',
			       "它已经开始腐烂，且遗失了一些肢体.",
			       "难以分辨这里还留下了什么."
				],
				loot: {
					'铁剑': {
						min: 1,
						max: 1,
						chance: 1
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'火把': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'药剂': {
					  min: 1,
					  max: 2,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				text: [
			       '火把劈啪作响，熄灭在了潮湿的空气中.',
			       '漆黑一片.'
			    ],
				notification: '火把燃尽了.',
				buttons: {
					'continue': {	
						text: '继续深入',
						cost: {'火把': 1},
						nextScene: { 1: 'c1' }
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 1,
				hit: 0.8,
				attackDelay: 1,
				health: 5,
				notification: '那受到惊吓的野兽正要捍卫它的巢穴.',
				loot: {
					'毛皮': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				combat: true,
				enemy: '洞穴蜥蜴',
				chara: 'L',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 6,
				notification: '一只洞穴蜥蜴扑了过来',
				loot: {
					'鳞片': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'c2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: '野兽',
				chara: 'B',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '巨大的野兽现身于黑暗之中',
				loot: {
					'毛皮': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: '蜥蜴',
				chara: 'L',
				damage: 4,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '一只巨大的蜥蜴蹒跚地现身，挡住了前路',
				loot: {
					'鳞片': {
						min: 1,
						max: 3,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 3,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.7: 'end2', 1: 'end3'}
					},
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
			       '巨兽的巢穴位于洞穴后方.'
				],
				onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'毛皮': {
						min: 5,
						max: 10,
						chance: 1
					},
					'鳞片': {
						min: 5,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 5,
						max: 10,
						chance: 1
					},
					'布匹': {
						min: 5,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
			       '洞穴后出现了一个小型的补给点.'
		        ],
		        loot: {
					'布匹': {
						min: 5,
						max: 10,
						chance: 1
					},
					'皮革': {
						min: 5,
						max: 10,
						chance: 1
					},
					'铁': {
						min: 5,
						max: 10,
						chance: 1
					},
					'熏肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'钢': {
						min: 5,
						max: 10,
						chance: 0.5
					},
					'套索': {
						min: 1,
						max: 3,
						chance: 0.3
					},
					'药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.15
					}
				},
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
			       '一个陈旧的盒子夹在岩石下方，上面蒙着一层薄薄的灰尘.'
		        ],
		        loot: {
		        	'钢剑': {
		        		min: 1,
		        		max: 1,
		        		chance: 1
		        	},
		        	'套索': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.5
		        	},
    					'药剂': {
    					  min: 1,
    					  max: 3,
    					  chance: 0.3
    					}
		        },
				onLoad: function() {
					World.clearDungeon();
				},
				buttons: {
					'leave': {
						text: '离开洞穴',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"town": { /* Town */
		title: '废弃小镇',
		scenes: {
			'start': {
				text: [
					'a small suburb lays ahead, empty houses scorched and peeling.',
					"broken streetlights stand, rusting. light hasn't graced this place in a long time."
				],
				notification: "the town lies abandoned, its citizens long dead",
				buttons: {
					'enter': {	
						text: '探索',
						nextScene: {0.3: 'a1', 0.7: 'a3', 1: 'a2'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			
			'a1': {
				text: [
					"where the windows of the schoolhouse aren't shattered, they're blackened with soot.",
					'the double doors creak endlessly in the wind.'
				],
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {0.5: 'b1', 1: 'b2'},
						cost: {torch: 1}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			
			'a2': {
				combat: true,
				enemy: 'thug',
				chara: 'T',
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
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
  				},
  				notification: 'ambushed on the street.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
					"a squat building up ahead.",
					'a green cross barely visible behind grimy windows.'
				],
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {0.5: 'b5', 1: 'end5'},
						cost: {torch: 1}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b1': {
				text: [
			       'a small cache of supplies is tucked inside a rusting locker.'
			    ],
			    loot: {
			    	'熏肉': {
			    		min: 1,
			    		max: 5,
			    		chance: 1
			    	},
			    	'火把': {
			    		min: 1,
			    		max: 3,
			    		chance: 0.8
			    	},
			    	'子弹': {
			    		min: 1,
			    		max: 5,
			    		chance: 0.3
			    	},
  					'药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.05
  					}
		    	},
		    	buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b2': {
				combat: true,
				enemy: 'scavenger',
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
  					'熏肉': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					}
  				},
  				notification: 'a scavenger waits just inside the door.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b3': {
				combat: true,
				enemy: 'beast',
				chara: 'B',
				damage: 3,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: 'a beast stands alone in an overgrown park.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b4': {
				text: [
			       'an overturned caravan is spread across the pockmarked street.',
			       "it's been picked over by scavengers, but there's still some things worth taking."
				],
				loot: {
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'火把': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'药剂': {
					  min: 1,
					  max: 3,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'c5', 1: 'c6' }
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'b5': {
				combat: true,
				enemy: '疯子',
				chara: 'M',
				damage: 6,
  				hit: 0.3,
  				attackDelay: 1,
  				health: 10,
  				loot: {
  					'布匹': {
  						min: 2,
  						max: 4,
  						chance: 0.3
  					},
  					'熏肉': {
  						min: 1,
  						max: 5,
  						chance: 0.9
  					},
  					'药剂': {
  						min: 1,
  						max: 2,
  						chance: 0.4
  					}
  				},
  				notification: '一个疯子尖叫着袭来.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.3: 'end5', 1: 'end6'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c1': {
				combat: true,
				enemy: 'thug',
				chara: 'T',
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
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
  				},
  				notification: 'a thug moves out of the shadows.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c2': {
				combat: true,
				enemy: 'beast',
				chara: 'B',
				damage: 3,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: 'a beast charges out of a ransacked classroom.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c3': {
				text: [
			       'through the large gymnasium doors, footsteps can be heard.',
			       'the torchlight casts a flickering glow down the hallway.',
			       'the footsteps stop.'
		        ],
		        buttons: {
			        'continue': {
						text: '进入',
						nextScene: {1: 'd1'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		        }
			},
			'c4': {
				combat: true,
				enemy: 'beast',
				chara: 'B',
				damage: 4,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 25,
  				loot: {
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 1
  					}
  				},
  				notification: 'another beast, draw by the noise, leaps out of a copse of trees.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c5': {
				text: [
			       "something's causing a commotion a ways down the road.",
			       "a fight, maybe."
		        ],
		        buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'c6': {
				text: [
			       'a small basket of food is hidden under a park bench, with a note attached.',
			       "can't read the words."
		        ],
		        loot: {
		        	'熏肉': {
		        		min: 1,
		        		max: 5,
		        		chance: 1
		        	}
		        },
		        buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'd1': {
				combat: true,
				enemy: 'scavenger',
				chara: 'S',
				damage: 5,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.5
					}
  				},
  				notification: 'a panicked scavenger bursts through the door, screaming.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'd2': {
				combat: true,
				enemy: 'vigilante',
				chara: 'V',
				damage: 6,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
  						chance: 1
  					},
  					'皮革': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
  					'钢剑': {
  						min: 1,
  						max: 1,
  						chance: 0.5
  					}
  				},
  				notification: "a man stands over a dead wanderer. notices he's not alone.",
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end3', 1: 'end4'}
					},
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end1': {
				text: [
			       'scavenger had a small camp in the school.',
			       'collected scraps spread across the floor like they fell from heaven.'
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 1
					},
					'钢': {
						min: 5,
						max: 10,
						chance: 1
					},
					'熏肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'套索': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'药剂': {
					  min: 1,
					  max: 2,
					  chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end2': {
				text: [
			       "scavenger'd been looking for supplies in here, it seems.",
			       "a shame to let what he'd found go to waste."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'coal': {
						min: 5,
						max: 10,
						chance: 1
					},
					'熏肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'皮革': {
						min: 5,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end3': {
				text: [
			       "beneath the wanderer's rags, clutched in one of its many hands, a glint of steel.",
			       "worth killing for, it seems."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end4': {
				text: [
			       "eye for an eye seems fair.",
			       "always worked before, at least.",
			       "picking the bones finds some useful trinkets."
		        ],
		        onLoad: function() {
					World.clearDungeon();
				},
				loot: {
					'熏肉': {
						min: 5,
						max: 10,
						chance: 1
					},
					'铁': {
						min: 5,
						max: 10,
						chance: 1
					},
					'火把': {
						min: 1,
						max: 5,
						chance: 1
					},
					'套索': {
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
				buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
				}
			},
			'end5': {
				text: [
			       'some medicine abandoned in the drawers.'
		        ],
		    onLoad: function() {
					World.clearDungeon();
				},
        loot: {
        	'药剂': {
        		min: 2,
        		max: 5,
        		chance: 1
        	}
        },
        buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		    }
			},
			'end6': {
				text: [
			       'the clinic has been ransacked.',
			       'only dust and stains remain.'
		        ],
		    onLoad: function() {
					World.clearDungeon();
				},
        buttons: {
					'leave': {
						text: '离开小镇',
						nextScene: 'end'
					}
		    }
			}
		}
	},
	"city": { /* City */
		title: 'A Ruined City',
		scenes: {
			'start': {
				text: [
					'a battered highway sign stands guard at the entrance to this once-great city.',
					"the towers that haven't crumbled jut from the landscape like the ribcage of some ancient beast.",
					'might be things worth having still inside.'
				],
				notification: "the towers of a decaying city dominate the skyline",
				buttons: {
					'enter': {	
						text: '探索',
						nextScene: {0.2: 'a1', 0.5: 'a2', 0.8: 'a3', 1: 'a4'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				text:[
				    'the streets are empty.',
				    'the air is filled with dust, driven relentlessly by the hard winds.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'b1', 1: 'b2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				text:[
				    'orange traffic cones are set across the street, faded and cracked.',
				    'lights flash through the alleys between buildings.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'b3', 1: 'b4'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				text: [
			       'a large shanty town sprawls across the streets.',
			       'faces, darkened by soot and blood, stare out from crooked huts.'
		        ],
		        buttons: {
					'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'b5', 1: 'b6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			'a4': {
				text: [
			       'the shell of an abandoned hospital looms ahead.'
		        ],
        buttons: {
          'enter': {
            text: '进入',
            cost: { '火把': 1 },
            nextScene: {0.5: 'b7', 1: 'b8'}
          },
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
        }
			},
			'b1': {
				text: [
			       'the old tower seems mostly intact.',
			       'the shell of a burned out car blocks the entrance.',
			       'most of the windows at ground level are busted anyway.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '进入',
						nextScene: {0.5: 'c1', 1: 'c2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b2': {
				combat: true,
				notification: 'a huge lizard scrambles up out of the darkness of an old metro station.',
				enemy: 'lizard',
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
		        buttons: {
		        	'descend': {	
						text: 'descend',
						nextScene: {0.5: 'c2', 1: 'c3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b3': {
				notification: 'the shot echoes in the empty street.',
				combat: true,
  				enemy: 'sniper',
  				chara: 'S',
  				damage: 15,
  				hit: 0.8,
  				attackDelay: 4,
  				health: 30,
				ranged: true,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'c4', 1: 'c5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b4': {
				notification: 'the soldier steps out from between the buildings, rifle raised.',
				combat: true,
  				enemy: 'soldier',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'c5', 1: 'c6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b5': {
				notification: 'a frail man stands defiantly, blocking the path.',
				combat: true,
  				enemy: 'frail man',
  				chara: 'M',
  				damage: 1,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 10,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					},
  					'皮革': {
  						min: 1,
  						max: 1,
  						chance: 0.2
  					},
  					'药剂': {
  					  min: 1,
  					  max: 3,
  					  chance: 0.05
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'c7', 1: 'c8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b6': {
				text: [
			       'nothing but downcast eyes.',
			       'the people here were broken a long time ago.'
		        ],
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'c8', 1: 'c9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			'b7': {
				text: [
			       'empty corridors.',
			       'the place has been swept clean by scavengers.'
		        ],
		    buttons: {
		      'continue': {	
						text: '继续深入',
						nextScene: {0.3: 'c12', 0.7: 'c10', 1: 'c11'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			'b8': {
				notification: 'an old man bursts through a door, wielding a scalpel.',
				combat: true,
				enemy: 'old man',
  				chara: 'M',
  				damage: 3,
  				hit: 0.5,
  				attackDelay: 2,
  				health: 10,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 3,
  						chance: 0.5
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'药剂': {
  					  min: 1,
  					  max: 2,
  					  chance: 0.5
  					}
  				},
        buttons: {
        	'continue': {	
    				text: '继续深入',
    				nextScene: {0.3: 'c13', 0.7: 'c11', 1: 'end15'}
    			},
    			'leave': {
    				text: '离开城市',
    				nextScene: 'end'
    			}
		    }
			},
			'c1': {
				notification: 'a thug is waiting on the other side of the wall.',
				combat: true,
				enemy: 'thug',
  				chara: 'T',
  				damage: 3,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 30,
  				loot: {
  					'钢剑': {
  						min: 1,
  						max: 1,
  						chance: 0.5
  					},
  					'熏肉': {
  						min: 1,
  						max: 3,
  						chance: 0.5
  					},
  					'布匹': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'd1', 1: 'd2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c2': {
				notification: 'a snarling beast jumps out from behind a car.',
				combat: true,
				enemy: 'beast',
  				chara: 'B',
  				damage: 2,
  				hit: 0.8,
  				attackDelay: 1,
  				health: 30,
  				loot: {
  					'肉': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'毛皮': {
  						min: 1,
  						max: 5,
  						chance: 0.8
  					},
  					'牙齿': {
  						min: 1,
  						max: 5,
  						chance: 0.5
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {1: 'd2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c3': {
				text: [
			       'street above the subway platform is blown away.',
			       'lets some light down into the dusty haze.',
			       'a sound comes from the tunnel, just ahead.'
		        ],
		        buttons: {
		        	'enter': {	
						text: 'investigate',
						cost: { '火把': 1 },
						nextScene: {0.5: 'd2', 1: 'd3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c4': {
				text: [
			       'looks like a camp of sorts up ahead.',
			       'rusted chainlink is pulled across an alleyway.',
			       'fires burn in the courtyard beyond.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {0.5: 'd4', 1: 'd5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c5': {
				text: [
			       'more voices can be heard ahead.',
			       'they must be here for a reason.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {1: 'd5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c6': {
				text: [
			       'the sound of gunfire carries on the wind.',
			       'the street ahead glows with firelight.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {0.5: 'd5', 1: 'd6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c7': {
				text: [
			       'more squatters are crowding around now.',
			       'someone throws a stone.'
		        ],
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {0.5: 'd7', 1: 'd8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c8': {
				text: [
					'an improvised shop is set up on the sidewalk.',
					'the owner stands by, stoic.'
				],
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 8,
						chance: 0.25
					},
					'异星合金': {
						min: 1,
						max: 1,
						chance: 0.01
					},
					'药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.5
					}
				},
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {1: 'd8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c9': {
				text: [
			       'strips of meat hang drying by the side of the street.',
			       'the people back away, avoiding eye contact.'
		        ],
		        loot: {
		        	'熏肉': {
		        		min: 5,
		        		max: 10,
		        		chance: 1
		        	}
		        },
		        buttons: {
		        	'enter': {	
						text: '继续深入',
						nextScene: {0.5: 'd8', 1: 'd9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'c10': {
				text: [
			       'someone has locked and barricaded the door to this operating theatre.'
		        ],
		    buttons: {
		      'enter': {	
						text: '继续深入',
						nextScene: {0.2: 'end12', 0.6: 'd10', 1: 'd11'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c11': {
				notification: 'a tribe of elderly squatters is camped out in this ward.',
				combat: true,
				enemy: 'squatters',
				plural: true,
				chara: 'SSS',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
  			loot: {
					'熏肉': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'布匹': {
						min: 3,
						max: 8,
						chance: 0.8
					},
					'药剂': {
					  min: 1,
					  max: 3,
					  chance: 0.3
					}
				},
        buttons: {
    			'continue': {
    				text: '继续深入',
    				nextScene: { 1: 'end10' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c12': {
				notification: 'a pack of lizards rounds the corner.',
				combat: true,
				enemy: 'lizards',
				plural: true,
				chara: 'LLL',
				damage: 4,
				hit: 0.7,
				attackDelay: 0.7,
				health: 30,
  			loot: {
					'肉': {
						min: 3,
						max: 8,
						chance: 1
					},
					'牙齿': {
						min: 2,
						max: 4,
						chance: 1
					},
					'鳞片': {
					  min: 3,
					  max: 5,
					  chance: 1
					}
				},
        buttons: {
    			'continue': {
    				text: '继续深入',
    				nextScene: { 1: 'end10' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
			
			'c13': {
				text: [
					'strips of meat are hung up to dry in this ward.'
				],
				loot: {
					'熏肉': {
					  min: 3,
					  max: 10,
					  chance: 1
					}
				},
        buttons: {
    			'continue': {
    				text: '继续深入',
    				nextScene: { 0.5: 'end10', 1: 'end11' }
    			},
    			'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		    }
			},
						
			'd1': {
				notification: 'a large bird nests at the top of the stairs.',
				combat: true,
				enemy: 'bird',
  				chara: 'B',
  				damage: 5,
  				hit: 0.7,
  				attackDelay: 1,
  				health: 45,
  				loot: {
  					'肉': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'end1', 1: 'end2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd2': {
				text: [
			       "the debris is denser here.",
			       "maybe some useful stuff in the rubble."
		        ],
		        loot: {
		        	'子弹': {
		        		min: 1,
		        		max: 5,
		        		chance: 0.5
		        	},
		        	'钢': {
		        		min: 1,
		        		max: 10,
		        		chance: 0.8
		        	},
		        	'异星合金': {
		        		min: 1,
		        		max: 1,
		        		chance: 0.01
		        	},
		        	'布匹': {
		        		min: 1,
		        		max: 10,
		        		chance: 1
		        	}
		        },
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {1: 'end2'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd3': {
				notification: 'a swarm of rats rushes up the tunnel.',
				combat: true,
				enemy: 'rats',
				plural: true,
  				chara: 'RRR',
  				damage: 1,
  				hit: 0.8,
  				attackDelay: 0.25,
  				health: 60,
  				loot: {
  					'毛皮': {
  						min: 5,
  						max: 10,
  						chance: 0.8
  					},
					'牙齿': {
						min: 5,
						max: 10,
						chance: 0.5
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {0.5: 'end2', 1: 'end3'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd4': {
				notification: 'a large man attacks, waving a bayonet.',
				combat: true,
				enemy: 'veteran',
				chara: 'V',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 45,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end4', 1: 'end5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd5': {
				notification: 'a second soldier opens fire.',
				combat: true,
  				enemy: 'soldier',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
		        buttons: {
		        	'continue': {	
						text: '继续深入',
						nextScene: {1: 'end5'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
		        }
			},
			
			'd6': {
				notification: 'a masked soldier rounds the corner, gun drawn',
				combat: true,
				enemy: 'commando',
				chara: 'C',
				ranged: true,
				damage: 3,
				hit: 0.9,
				attackDelay: 2,
				health: 55,
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end5', 1: 'end6'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd7': {
				notification: 'the crowd surges forward.',
				combat: true,
				enemy: 'squatters',
				plural: true,
				chara: 'SSS',
				damage: 2,
				hit: 0.7,
				attackDelay: 0.5,
				health: 40,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end7', 1: 'end8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd8': {
				notification: 'a youth lashes out with a tree branch.',
				combat: true,
				enemy: 'youth',
				chara: 'Y',
				damage: 2,
				hit: 0.7,
				attackDelay: 1,
				health: 45,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'end8'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd9': {
				notification: 'a squatter stands firmly in the doorway of a small hut.',
				combat: true,
				enemy: 'squatter',
				chara: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 20,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {0.5: 'end8', 1: 'end9'}
					},
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'd10': {
				notification: 'behind the door, a deformed figure awakes and attacks.',
				combat: true,
				enemy: 'deformed',
				chara: 'D',
				damage: 8,
				hit: 0.6,
				attackDelay: 2,
				health: 40,
				loot: {
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'牙齿': {
						min: 2,
						max: 2,
						chance: 1
					},
					'钢': {
					  min: 1,
					  max: 3,
					  chance: 0.6
					},
					'鳞片': {
					  min: 2,
					  max: 3,
					  chance: 0.1
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'end14'}
					}
				}
			},
			
			'd11': {
				notification: 'as soon as the door is open a little bit, hundreds of tentacles erupt.',
				combat: true,
				enemy: '触手怪',
				plural: true,
				chara: 'TTT',
				damage: 2,
				hit: 0.6,
				attackDelay: 0.5,
				health: 60,
				loot: {
					'肉': {
						min: 10,
						max: 20,
						chance: 1
					}
				},
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: {1: 'end13'}
					}
				}
			},
		
			'end1': {
				text: [
				   'bird must have liked shiney things.',
				   'some good stuff woven into its nest.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'子弹': {
						min: 5,
						max: 10,
						chance: 0.8
					},
					'套索': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'异星合金': {
						min: 1,
						max: 1,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end2': {
				text: [
				   'not much here.',
				   'scavengers must have gotten to this place already.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'火把': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end3': {
				text: [
				   'the tunnel opens up at another platform.',
				   'the walls are scorched from an old battle.',
				   'bodies and supplies from both sides litter the ground.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'激光枪': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'能量元件': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'异星合金': {
						min: 1,
						max: 1,
						chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			
			'end4': {
				text: [
				   'the small military outpost is well supplied.',
				   'arms and munitions, relics from the war, are neatly arranged on the store-room floor.',
				   'just as deadly now as they were then.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 10,
						chance: 1
					},
					'手雷': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end5': {
				text: [
				   'searching the bodies yields a few supplies.',
				   'more soldiers will be on their way.',
				   'time to move on.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 1
					},
					'子弹': {
						min: 1,
						max: 10,
						chance: 1
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'药剂': {
					  min: 1,
					  max: 4,
					  chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end6': {
				text: [
				   'the small settlement has clearly been burning a while.',
				   'the bodies of the wanderers that lived here are still visible in the flames.',
				   "still time to rescue a few supplies."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'激光枪': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'能量元件': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'熏肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			
			'end7': {
				text: [
				   'the remaining settlers flee from the violence, their belongings forgotten.',
				   "there's not much, but some useful things can still be found."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'能量元件': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'熏肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end8': {
				text: [
				   'the young settler was carrying a canvas sack.',
				   "it contains travelling gear, and a few trinkets.",
				   "there's nothing else here."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'套索': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'熏肉': {
						min: 1,
						max: 10,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end9': {
				text: [
				   'inside the hut, a child cries.',
				   "a few belongings rest against the walls.",
				   "there's nothing else here."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'步枪': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'子弹': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'套索': {
						min: 1,
						max: 5,
						chance: 0.5
					},
					'异星合金': {
						min: 1,
						max: 1,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end10': {
				text: [
				   'the stench of rot and death fills the operating theatres.',
				   "a few items are scattered on the ground.",
				   'there is nothing else here.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'能量元件': {
						min: 1,
						max: 1,
						chance: 0.3
					},
					'药剂': {
						min: 1,
						max: 5,
						chance: 0.3
					},
					'牙齿': {
						min: 3,
						max: 8,
						chance: 1
					},
					'鳞片': {
						min: 4,
						max: 7,
						chance: 0.9
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end11': {
				text: [
				   'a pristine medicine cabinet at the end of a hallway.',
				   "the rest of the hospital is empty."
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'能量元件': {
						min: 1,
						max: 1,
						chance: 0.2
					},
					'药剂': {
						min: 3,
						max: 10,
						chance: 1
					},
					'牙齿': {
						min: 1,
						max: 2,
						chance: 0.2
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end12': {
				text: [
				   'someone had been stockpiling loot here.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'能量元件': {
						min: 1,
						max: 3,
						chance: 0.2
					},
					'药剂': {
						min: 3,
						max: 10,
						chance: 0.5
					},
					'子弹': {
						min: 2,
						max: 8,
						chance: 1
					},
					'火把': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'grenade': {
					  min: 1,
					  max: 1,
					  chance: 0.5
					},
					'异星合金': {
					  min: 1,
					  max: 2,
					  chance: 0.8
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end13': {
				text: [
				   'the tentacular horror is defeated.',
				   'inside, the remains of its victims are everywhere.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'钢剑': {
						min: 1,
						max: 3,
						chance: 0.5
					},
					'步枪': {
						min: 1,
						max: 2,
						chance: 0.3
					},
					'牙齿': {
						min: 2,
						max: 8,
						chance: 1
					},
					'布匹': {
					  min: 3,
					  max: 6,
					  chance: 0.5
					},
					'异星合金': {
					  min: 1,
					  max: 1,
					  chance: 0.1
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end14': {
				text: [
				   '受困男子的尸体躺在地面上.',
				   'the operating theatre has a lot of curious equipment.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'能量元件': {
						min: 2,
						max: 5,
						chance: 0.8
					},
					'药剂': {
						min: 3,
						max: 12,
						chance: 1
					},
					'布匹': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'钢': {
					  min: 2,
					  max: 3,
					  chance: 0.3
					},
					'异星合金': {
					  min: 1,
					  max: 1,
					  chance: 0.3
					}
				},
				buttons: {
					'leave': {
						text: '离开城市',
						nextScene: 'end'
					}
				}
			},
			
			'end15': {
				text: [
					'一名拥有些有趣玩意儿的老者.'
				],
				onLoad: function() {
					World.clearDungeon();
					$SM.set('game.cityCleared', true);
				},
				loot: {
					'异星合金': {
						min: 1,
						max: 1,
						chance: 0.8
					},
					'药剂': {
					  min: 1,
					  max: 4,
					  chance: 1
					},
					'熏肉': {
					  min: 3,
					  max: 7,
					  chance: 1
					},
					'套索': {
					  min: 1,
					  max: 3,
					  chance: 0.5
					},
					'毛皮': {
					  min: 1,
					  max: 5,
					  chance: 0.8
					}
				},
				buttons: {
    			'leave': {
    				text: '离开城市',
    				nextScene: 'end'
    			}
		    }
			}
		}	
	},
	"house": { /* Abandoned House */
		title: '老屋',
		scenes: {
			'start': {
				text: [
					'一栋老屋坐落于此，曾经白色的外墙已泛黄，涂料已剥落.',
					'门晃晃悠悠地开了.'
				],
				notification: 'the remains of an old house stand as a monument to simpler times',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: { 0.25: '药剂', 0.5: 'supplies', 1: 'occupied' }
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'supplies': {
				text: [
					'屋子虽已废弃，但尚未被人搜罗过.',
					'老井里也还能打上来些水喝.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.setWater(World.getMaxWater());
					Notifications.notify(null, 'water replenished');
				},
				loot: {
 					'熏肉': {
 						min: 1,
 						max: 10,
 						chance: 0.8
 					},
					'皮革': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'布匹': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'药剂': {
				text: [
				    '屋子已被洗劫一空.',
					'但地板上还能寻见几瓶药剂.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
					'药剂': {
						min: 2,
						max: 5,
						chance: 1
					}
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'occupied': {
				combat: true,
				enemy: '伏击者',
				chara: 'S',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				notification: '男子手持着一柄生锈的刀，从大厅上方跳了下来',
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				loot: {
 					'熏肉': {
 						min: 1,
 						max: 10,
 						chance: 0.8
 					},
					'皮革': {
						min: 1,
						max: 10,
						chance: 0.2
					},
					'布匹': {
						min: 1,
						max: 10,
						chance: 0.5
					}
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"battlefield": { /* Discovering an old battlefield */
		title: '被遗忘的战场',
		scenes: {
			'start': {
				text: [
			       '这里很久以前曾打过仗.',
			       '战斗双方曾使用的武器装备在荒原上静静躺着.'
		        ],
		        onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
		        loot: {
		        	'步枪': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.5
		        	},
		        	'子弹': {
		        		min: 5,
		        		max: 20,
		        		chance: 0.8
		        	},
		        	'激光枪': {
		        		min: 1,
		        		max: 3,
		        		chance: 0.3
		        	},
		        	'能量元件': {
		        		min: 5,
		        		max: 10,
		        		chance: 0.5
		        	},
		        	'grenade': {
		        		min: 1,
		        		max: 5,
		        		chance: 0.5
		        	},
		        	'异星合金': {
		        		min: 1,
		        		max: 1,
		        		chance: 0.3
		        	}
		        },
		        buttons: {
		        	'leave': {
		        		text: '离开',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},
	"borehole": { /* Admiring a huge borehole */
		title: '巨坑',
		scenes: {
			'start': {
				text: [
			       'a huge hole is cut deep into the earth, evidence of the past harvest.',
			       'they took what they came for, and left.',
			       'castoff from the mammoth drills can still be found by the edges of the precipice.'
		        ],
		        onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
		        loot: {
		        	'异星合金': {
		        		min: 1,
		        		max: 3,
		        		chance: 1
		        	}
		        },
		        buttons: {
		        	'leave': {
		        		text: '离开',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},
	"ship": { /* Finding a way off this rock */
		title: '破损飞船',
		scenes: {
			'start': {
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					World.drawRoad();
					World.state.ship = true;
				},
				text: [
			       'the familiar curves of a wanderer vessel rise up out of the dust and ash. ',
				   "lucky that the natives can't work the mechanisms.",
			       'with a little effort, it might fly again.'
		        ],
		        buttons: {
		        	'leavel': {
		        		text: '抢修',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},
	"sulphurmine": { /* Clearing the Sulphur Mine */
		title: 'The Sulphur Mine',
		scenes: {
			'start': {
				text: [
					"the military is already set up at the mine's entrance.",
					'soldiers patrol the perimeter, rifles slung over their shoulders.'
				],
				notification: 'a military perimeter is set up around the mine.',
				buttons: {
					'attack': {	
						text: 'attack',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
  				enemy: 'soldier',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
  				notification: 'a soldier, alerted, opens fire.',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: 'run',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
  				enemy: 'soldier',
				ranged: true,
  				chara: 'D',
  				damage: 8,
  				hit: 0.8,
  				attackDelay: 2,
  				health: 50,
  				loot: {
  					'熏肉': {
  						min: 1,
  						max: 5,
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
					}
  				},
  				notification: 'a second soldier joins the fight.',
 				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: 'run',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
				enemy: 'veteran',
				chara: 'V',
				damage: 10,
				hit: 0.8,
				attackDelay: 2,
				health: 65,
				loot: {
					'bayonet': {
						min: 1,
						max: 1,
						chance: 0.5
					},
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: 'a grizzled soldier attacks, waving a bayonet.',
 				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'the military presence has been cleared.',
					'the mine is now safe for workers.'
				],
				notification: 'the sulphur mine is clear of dangers',
				onLoad: function() {
					World.drawRoad();
					World.state.sulphurmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"coalmine": { /* Clearing the Coal Mine */
		title: '煤矿',
		scenes: {
			'start': {
				text: [
					'矿井入口边燃着营火.',
					'手持武器待命的男子在附近巡逻.'
				],
				notification: '这座矿井还没有被废弃',
				buttons: {
					'attack': {	
						text: 'attack',
						nextScene: {1: 'a1'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'a1': {
				combat: true,
				enemy: 'man',
				chara: 'M',
				damage: 3,
				hit: 0.8,
				attackDelay: 2,
				health: 10,
				loot: {
					'熏肉': {
						min: 1,
						max: 5,
						chance: 0.8
					},
					'布匹': {
						min: 1,
						max: 5,
						chance: 0.8
					}
				},
				notification: '一名男子加入了战斗',
				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'a2' }
					},
					'run': {
						text: 'run',
						nextScene: 'end'
					}
				}
			},
			'a2': {
				combat: true,
 				enemy: 'man',
 				chara: 'M',
 				damage: 3,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 10,
 				loot: {
					'熏肉': {
						min: 1,
 						max: 5,
						chance: 0.8
					},
					'布匹': {
						min: 1,
 						max: 5,
						chance: 0.8
					}
 				},
 				notification: 'a man joins the fight',
 				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'a3' }
					},
					'run': {
						text: 'run',
						nextScene: 'end'
					}
				}
			},
			'a3': {
				combat: true,
 				enemy: 'chief',
 				chara: 'C',
 				damage: 5,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 20,
 				loot: {
					'熏肉': {
						min: 5,
 						max: 10,
						chance: 1
					},
					'布匹': {
						min: 5,
 						max: 10,
						chance: 0.8
					},
					'铁': {
						min: 1,
						max: 5,
						chance: 0.8
					}
 				},
 				notification: 'only the chief remains.',
 				buttons: {
					'continue': {
						text: '继续深入',
						nextScene: { 1: 'cleared' }
					}
				}
			},
			'cleared': {
				text: [
					'the camp is still, save for the crackling of the fires.',
					'the mine is now safe for workers.'
				],
				notification: 'the coal mine is clear of dangers',
				onLoad: function() {
					World.drawRoad();
					World.state.coalmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	},
	"ironmine": { /* Clearing the Iron Mine */
		title: 'The Iron Mine',
 		scenes: {
			'start': {
				text: [
					'an old iron mine sits here, tools abandoned and left to rust.',
					'bleached bones are strewn about the entrance. many, deeply scored with jagged grooves.',
					'feral howls echo out of the darkness.'
				],
				notification: '通往废弃矿井的小路',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: { 1: 'enter' },
						cost: { '火把': 1 }
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
 			'enter': {
 				combat: true,
 				enemy: '蛮女',
 				chara: 'M',
 				damage: 4,
 				hit: 0.8,
 				attackDelay: 2,
 				health: 10,
 				loot: {
 					'牙齿': {
 						min: 5,
 						max: 10,
 						chance: 1
 					},
					'鳞片': {
						min: 5,
 						max: 10,
						chance: 0.8
					},
					'布匹': {
						min: 5,
 						max: 10,
						chance: 0.5
					}
 				},
 				notification: '一只巨大的怪物跳了出来，火把的光照亮了它暴起的肌肉',
 				buttons: {
					'leave': {
						text: '离开',
						nextScene: { 1: 'cleared' }
					}
				}
 			},
			'cleared': {
				text: [
					'野兽死了.',
					'对工人来说这座矿工现在安全了.'
				],
				notification: 'the iron mine is clear of dangers',
				onLoad: function() {
					World.drawRoad();
					World.state.ironmine = true;
					World.markVisited(World.curPos[0], World.curPos[1]);
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
 		}
	},
	
	"cache": { /* Cache - contains some of supplies from previous game */
		title: '被毁灭的村落',
		scenes: {
			'start': {
				text: [
					'被毁灭的村子灰尘遍地.',
					'破烂的尸体俯首即是.'
				],
				notification: '流浪者舰艇加力燃烧室的金属柄脚尚还悬在空中.',
				buttons: {
					'enter': {
						text: '进入',
						nextScene: {1: 'underground'}
					},
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'underground': {
				text: [
					'一栋小棚子矗立在村子中央.',
					'里头似乎还有些物资.'
				],
				buttons: {
					'take': {
						text: '拿走',
						nextScene: {1: 'exit'}
					}
				}
			},
			'exit': {
				text: [
					'这里留存着前代人的全部作品.',
					'是时候继承这些财富了.'
				],
				onLoad: function() {
					World.markVisited(World.curPos[0], World.curPos[1]);
					Prestige.collectStores();
				},
				buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			}
		}
	}
};
