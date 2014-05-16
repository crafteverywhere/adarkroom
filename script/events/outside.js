/**
 * Events that can occur when the Outside module is active
 **/
Events.Outside = [
    { /* Ruined traps */
    	title: '损毁的陷阱',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.buildings["陷阱"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					'一些陷阱损毁了.',
					'巨大的足印导向森林.'
				],
				onLoad: function() {
					var numWrecked = Math.floor(Math.random() * $SM.get('game.buildings["陷阱"]', true)) + 1;
					$SM.add('game.buildings["陷阱"]', -numWrecked);
					Outside.updateVillage();
					Outside.updateTrapButton();
				},
				notification: '一些陷阱损毁了.',
				buttons: {
					'track': {
						text: '追踪',
						nextScene: {0.5: 'nothing', 1: 'catch'}
					},
					'ignore': {
						text: '忽略',
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					'数分钟后足印消失了.',
					'森林归于静谧.'
				],
				buttons: {
					'end': {
						text: '回家',
						nextScene: 'end'
					}
				}
			},
			'catch': {
				text: [
			       '村外不远处躺着一只巨大的野兽，它的毛皮上染满了鲜血.',
			       '它无力挣扎任人宰割.'
		        ],
				reward: {
					'毛皮': 100,
					'肉': 100,
					'牙齿': 10
				},
				buttons: {
					'end': {
						text: '回家',
						nextScene: 'end'
					}
				}
			}
		}
    },
    
    { /* Sickness */
    	title: '瘟疫',
  		isAvailable: function() {
  			return Engine.activeModule == Outside && 
  				$SM.get('game.population', true) > 10 && 
  				$SM.get('game.population', true) < 50 && 
  				$SM.get('stores.medicine', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  			    '瘟疫在村子中蔓延.',
  			    '亟需药剂.'
  		    ],
  		    buttons: {
  		      'heal': {
  		        text: '1 瓶药剂',
  		        cost: { 'medicine' : 1 },
  		        nextScene: {1: 'healed'}
  		      },
  					'ignore': {
  						text: '忽略',
  						nextScene: {1: 'death'}
  					}
  				}
  			},
  			'healed': {
  				text: [
  			    '疫病及时地得到了控制.'
  		    ],
  		    buttons: {
  					'end': {
  						text: '回家',
  						nextScene: 'end'
  					}
  				}
  			},
  			'death': {
  				text: [
  			    '瘟疫在村子中蔓延.',
  			    '葬礼接着葬礼.',
  			    '尖叫响彻黑夜.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 20) + 1;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '回家',
  						nextScene: 'end'
  					}
  				}
  			}
  		}
    },
    
    { /* Plague */
    	title: '黑死病',
  		isAvailable: function() {
  			return Engine.activeModule == Outside && $SM.get('game.population', true) > 50 && $SM.get('stores.medicine', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  			    '可怕的黑死病迅速地在村子里传播开来.',
  			    '亟需药剂.'
  		    ],
  		    buttons: {
  		      'heal': {
  		        text: '5 瓶药剂',
  		        cost: { 'medicine' : 5 },
  		        nextScene: {1: 'healed'}
  		      },
  					'ignore': {
  						text: '任其自然',
  						nextScene: {1: 'death'}
  					}
  				}
  			},
  			'healed': {
  				text: [
  			    '黑死病得到了控制.',
  			    '只有少数人死掉了.',
  			    '剩下的人埋葬了他们.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 5) + 2;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '回家',
  						nextScene: 'end'
  					}
  				}
  			},
  			'death': {
  				text: [
  			    '黑死病席卷这个村落.',
  			    '尖叫响彻黑夜.',
  			    '人们只求速死.'
  		    ],
  		    onLoad: function() {
				    var numKilled = Math.floor(Math.random() * 80) + 10;
    				Outside.killVillagers(numKilled);
    			},
  		    buttons: {
  					'end': {
  						text: '回家',
  						nextScene: 'end'
  					}
  				}
  			}
  		}
    },
    
    { /* Beast attack */
    	title: '野兽来袭',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0;
		},
		scenes: {
			'start': {
				text: [
			       '一群咆哮的野兽冲出丛林.',
			       '战斗短暂而血腥，但兽群溃退了.',
			       '村民撤了回来，悼念那些死去的人.'
		        ],
		        onLoad: function() {
					var numKilled = Math.floor(Math.random() * 10) + 1;
					Outside.killVillagers(numKilled);
				},
		        reward: {
		        	fur: 100,
		        	meat: 100,
		        	teeth: 10
		        },
		        buttons: {
					'end': {
						text: '回家',
						nextScene: 'end'
					}
				}
			}
		}
    },
    
    { /* Soldier attack */
    	title: '军事突袭',
		isAvailable: function() {
			return Engine.activeModule == Outside && $SM.get('game.population', true) > 0 && $SM.get('game.cityCleared');;
		},
		scenes: {
			'start': {
				text: [
			       '枪声啸过树林.',
			       '武备精良的人冲出树林，向人群射击.',
			       '虽然他们撤走了，但我们中有人在突袭中死掉了.'
		        ],
		        onLoad: function() {
					var numKilled = Math.floor(Math.random() * 40) + 1;
					Outside.killVillagers(numKilled);
				},
		        reward: {
		        	'子弹': 10,
		        	'熏肉': 50
		        },
		        buttons: {
					'end': {
						text: '回家',
						nextScene: 'end'
					}
				}
			}
		}
    }
];
