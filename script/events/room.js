/**
 * Events that can occur when the Room module is active
 **/
Events.Room = [
	{ /* The Nomad  --  Merchant */
		title: '游牧部落',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["毛皮"]', true) > 0;
		},
		scenes: {
			'start': {
				text: [
					'游牧部落慢吞吞地出现在视野中，带着许多用粗麻线扎起来的临时口袋.',
					"他们没有说是从哪里来的，但显然不会逗留很久."
				],
				notification: '游牧部落抵达，想要进行贸易',
				buttons: {
					'buyScales': {
						text: '购买鳞片',
						cost: { '毛皮': 100 },
						reward: { '鳞片': 1 }
					},
					'buyTeeth': {
						text: '购买牙齿',
						cost: { '毛皮': 200 },
						reward: { '牙齿': 1 }
					},
					'buyBait': {
						text: '购买诱饵',
						cost: { '毛皮': 5 },
						reward: { '诱饵': 1 },
						notification: '上饵的陷阱更有效率.'
					},
					'buyCompass': {
						available: function() {
							return $SM.get('stores["罗盘"]', true) < 1;
						},
						text: '购买罗盘',
						cost: { '毛皮': 300, '鳞片': 15, '牙齿': 5 },
						reward: { 'compass': 1 },
						notification: '这块旧罗盘破损蒙尘，但看起来还能用.',
						onChoose: Path.openPath
					}, 
					'goodbye': {
						text: '道别',
						nextScene: 'end'
					}
				}
			}
		}
	}, { /* Noises Outside  --  gain wood/fur */
		title: '噪音',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			'start': {
				text: [
					'嘈杂声穿墙入耳.',
					"难以分辨来源."
				],
				notification: '古怪的声音透过墙壁传来',
				buttons: {
					'investigate': {
						text: '调查',
						nextScene: { 0.3: 'stuff', 1: 'nothing' }
					},
					'ignore': {
						text: '忽略',
						nextScene: 'end'
					}
				}
			},
			'nothing': {
				text: [
					'模糊的身影掠过，消失在视野外.',
					'安静下来了.'
				],
				buttons: {
					'backinside': {
						text: '回屋',
						nextScene: 'end'
					}
				}
			},
			'stuff': {
				reward: { '木头': 100, '毛皮': 10 },
				text: [
					'一捆用粗糙的毛皮扎起来的柴火斜倚在门槛上.',
					'黑夜重归静谧.'
				],
				buttons: {
					'backinside': {
						text: '回屋',
						nextScene: 'end'
					}
				}
			}
		}
	},
	{ /* Noises Inside  --  trade wood for better good */
		title: '噪音',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			start: {
				text: [
			       '仓库里传出噪音.',
			       '有东西进里头了.'
				],
				notification: '不速之客闯入了仓库',
				buttons: {
					'investigate': {
						text: '调查',
						nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
					},
					'ignore': {
						text: '忽略',
						nextScene: 'end'
					}
				}
			},
			scales: {
				text: [
			       '有些木头不见了.',
			       '地上散落着小鳞片.'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numScales = Math.floor(numWood / 5);
			    	if(numScales == 0) numScales = 1;
			    	$SM.addM('stores', {'wood': -numWood, '鳞片': numScales});
			    },
			    buttons: {
			    	'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
			    }
			},
			teeth: {
				text: [
			       '有些木头不见了.',
			       '地上散落着小牙齿.'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numTeeth = Math.floor(numWood / 5);
			    	if(numTeeth == 0) numTeeth = 1;
			    	$SM.addM('stores', {'木头': -numWood, '牙齿': numTeeth});
			    },
			    buttons: {
			    	'leave': {
			    		text: '离开',
			    		nextScene: 'end'
			    	}
			    }
			},
			cloth: {
				text: [
			       '有些木头不见了.',
			       '地上散落着布片.'
			    ],
			    onLoad: function() {
			    	var numWood = $SM.get('stores["木头"]', true);
			    	numWood = Math.floor(numWood * 0.1);
			    	if(numWood == 0) numWood = 1;
			    	var numCloth = Math.floor(numWood / 5);
			    	if(numCloth == 0) numCloth = 1;
			    	$SM.addM('stores', {'木头': -numWood, '布匹': numCloth});
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
	{ /* The Beggar  --  trade fur for better good */
		title: '乞丐',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
		},
		scenes: {
			start: {
				text: [
			       '乞丐徘徊在门前.',
			       '祈求能施舍给他一些多余的毛皮,好让他不在夜里受冻.'
				],
				notification: '乞丐来了',
				buttons: {
					'50furs': {
						text: '施舍50张毛皮',
						cost: {'毛皮': 50},
						nextScene: { 0.5: '鳞片', 0.8: '牙齿', 1: '布匹' }
					},
					'100furs': {
						text: '施舍100张毛皮',
						cost: {'毛皮': 100},
						nextScene: { 0.5: '牙齿', 0.8: '鳞片', 1: '布匹' }
					},
					'deny': {
						text: '赶走他',
						nextScene: 'end'
					}
				}
			},
			scales: {
				reward: { scales: 20 },
				text: [
			       '乞丐感激涕零.',
			       '留给我们一堆小鳞片.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			},
			teeth: {
				reward: { teeth: 20 },
				text: [
			       '乞丐感激涕零.',
			       '留给我们一堆小牙齿.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			},
			cloth: {
				reward: { cloth: 20 },
				text: [
			       '乞丐感激涕零.',
			       '留给我们一些布匹.'
			    ],
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},

	{ /* Mysterious Wanderer  --  wood gambling */
		title: '神秘流浪者',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["木头"]');
		},
		scenes: {
			start: {
				text: [
			       '一名流浪者推着货车来到村子，声称如果让他带着木头离开，他会带回更多木头.',
			       "建造者不确定能否信任他."
				],
				notification: '神秘流浪者来了',
				buttons: {
					'100wood': {
						text: '交给他100块木头',
						cost: {'木头': 100},
						nextScene: { 1: '100wood'}
					},
					'500wood': {
						text: '交给他500块木头',
						cost: {'木头': 500},
						nextScene: { 1: '500wood' }
					},
					'deny': {
						text: '赶走他',
						nextScene: 'end'
					}
				}
			},
			'100wood': {
				text: [
			       '流浪者带着满载木头的货车离开了'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.5) {
			    		setTimeout(function() {
			    			$SM.add('stores["木头"]', 300);
			    			Notifications.notify(Room, '神秘的流浪者回来了，货车上木头堆得更高了.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			},
			'500wood': {
				text: [
				       '流浪者带着满载木头的货车离开了'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.3) {
			    		setTimeout(function() {
			    			$SM.add('stores["木头"]', 1500);
			    			Notifications.notify(Room, '神秘的流浪者回来了，货车上木头堆得更高了.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},

	{ /* Mysterious Wanderer  --  fur gambling */
		title: '神秘流浪者',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('stores["毛皮"]');
		},
		scenes: {
			start: {
				text: [
			       '一名流浪者推着货车来到村子，声称如果让他带着毛皮离开，他会带回更多毛皮.',
			       "建造者不确定能否信任他."
				],
				notification: '神秘流浪者来了',
				buttons: {
					'100fur': {
						text: '交给他100张毛皮',
						cost: {'毛皮': 100},
						nextScene: { 1: '100fur'}
					},
					'500fur': {
						text: '交给他500张毛皮',
						cost: {'毛皮': 500},
						nextScene: { 1: '500fur' }
					},
					'deny': {
						text: '赶走他',
						nextScene: 'end'
					}
				}
			},
			'100fur': {
				text: [
			       '流浪者带着满载毛皮的货车离开了'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.5) {
			    		setTimeout(function() {
			    			$SM.add('stores["毛皮"]', 300);
			    			Notifications.notify(Room, '神秘的流浪者回来了，货车上毛皮堆得更高了.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			},
			'500fur': {
				text: [
				       '流浪者带着满载毛皮的货车离开了'
			    ],
			    onLoad: function() {
			    	if(Math.random() < 0.3) {
			    		setTimeout(function() {
			    			$SM.add('stores["毛皮"]', 1500);
			    			Notifications.notify(Room, '神秘的流浪者回来了，货车上毛皮堆得更高了.');
			    		}, 60 * 1000);
			    	}
			    },
			    buttons: {
			    	'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
			    }
			}
		}
	},

	{ /* The Scout  --  Map Merchant */
		title: '侦察',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					"侦察兵说她曾环游世界.",
					"她愿意为我们讲述一部分经历."
				],
				notification: '侦察兵夜宿于此',
				buttons: {
					'buyMap': {
						text: '购买地图',
						cost: { '毛皮': 200, '鳞片': 10 },
						notification: '地图上已探知的地方扩大了一点',
						onChoose: World.applyMap
					},
					'learn': {
						text: '学习侦察',
						cost: { '毛皮': 1000, '鳞片': 50, '牙齿': 20 },
						available: function() {
							return !$SM.hasPerk('侦察');
						},
						onChoose: function() {
							$SM.addPerk('侦察');
						}
					},
					'leave': {
			    		text: '道别',
			    		nextScene: 'end'
			    	}
				}
			}
		}
	},

	{ /* The Wandering Master */
		title: '宗师',
		isAvailable: function() {
			return Engine.activeModule == Room && $SM.get('features.location.world');
		},
		scenes: {
			'start': {
				text: [
					'一名年迈的流浪者抵达了.',
					'他面带和煦的微笑，请求留宿一晚.'
				],
				notification: '年迈的流浪者抵达了',
				buttons: {
					'agree': {
						text: '同意老人的请求',
						cost: {
							'熏肉': 100,
							'毛皮': 100,
							'火把': 1
						},
						nextScene: {1: 'agree'}
					},
					'deny': {
						text: '赶走他',
						nextScene: 'end'
					}
				}
			},
			'agree': {
				text: [
			       '作为回报，流浪者为我们分享了他的智慧.'
		        ],
		        buttons: {
		        	'evasion': {
		        		text: '避实就虚',
		        		available: function() {
		        			return !$SM.hasPerk('避实就虚');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('避实就虚');
		        		},
		        		nextScene: 'end'
		        	},
		        	'precision': {
		        		text: 'precision',
		        		available: function() {
		        			return !$SM.hasPerk('精密');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('精密');
		        		},
		        		nextScene: 'end'
		        	},
		        	'force': {
		        		text: 'force',
		        		available: function() {
		        			return !$SM.hasPerk('野蛮人');
		        		},
		        		onChoose: function() {
		        			$SM.addPerk('野蛮人');
		        		},
		        		nextScene: 'end'
		        	},
		        	'nothing': {
		        		text: '一无所获',
		        		nextScene: 'end'
		        	}
		        }
			}
		}
	},

	{ /* The Sick Man */
  		title: '患病男子',
  		isAvailable: function() {
  			return Engine.activeModule == Room && $SM.get('stores["药剂"]', true) > 0;
  		},
  		scenes: {
  			'start': {
  				text: [
  					"男子咳嗽着，一瘸一拐地走了过来.",
  					"他祈求分给他一支药剂."
  				],
  				notification: '患病男子一瘸一拐地走了过来',
  				buttons: {
  					'help': {
  						text: '给他1支药剂',
  						cost: { '药剂': 1 },
  						notification: '男子迫不及待咽下了药剂',
  						nextScene: { 0.1: 'alloy', 0.3: 'cells', 0.5: '鳞片', 1.0: 'nothing' }
  					},
  					'ignore': {
  						text: '请他离开',
  						nextScene: 'end'
  					}
  				}
  			},
  			'alloy': {
  				text: [
  					"男子感激涕零.",
  					'他留下报酬走了.',
  					'那是他在旅途中捡到的一些古怪的金属.'
  				],
  				onLoad: function() {
  					$SM.add('stores["异星合金"]', 1);
			    },
  				buttons: {
  					'bye': {
  						text: '道别',
  						nextScene: 'end'
  					}
  				}
  			},
  			'cells': {
  				text: [
  					"男子感激涕零.",
  					'他留下报酬走了.',
  					'那是他在旅途中捡到的一些古怪的发光盒子.'
  				],
  				onLoad: function() {
  					$SM.add('stores["能量元件"]', 3);
			    },
  				buttons: {
  					'bye': {
  						text: '道别',
  						nextScene: 'end'
  					}
  				}
  			},
  			'鳞片': {
  				text: [
  					"男子感激涕零.",
  					'他留下报酬走了.',
  					'全是些鳞片.'
  				],
  				onLoad: function() {
  					$SM.add('stores["鳞片"]', 5);
			    },
  				buttons: {
  					'bye': {
  						text: '道别',
  						nextScene: 'end'
  					}
  				}
  			},
  			'nothing': {
  				text: [
  					"男子表达了他的谢意，一瘸一拐地离开了."
  				],
  				buttons: {
  					'bye': {
  						text: '道别',
  						nextScene: 'end'
  					}
  				}
  		  }
  	}
	}
];
