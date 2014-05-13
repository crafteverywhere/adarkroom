/**
 * Events that can occur when any module is active (Except World. It's special.)
 **/
Events.Global = [
	{ /* The Thief */
		title: '盗贼',
		isAvailable: function() {
			return (Engine.activeModule == Room || Engine.activeModule == Outside) && $SM.get('game.thieves') == 1;
		},
		scenes: {
			'start': {
				text: [
					'村民们从仓库里拽出来一个脏兮兮的家伙。',
					"据说他的同伙们早已经顺走许多货物。",
					'他们说应该绞死他以儆效尤。'
				],
				notification: '抓到一名盗贼',
				buttons: {
					'kill': {
						text: '绞死他',
						nextScene: {1: 'hang'}
					},
					'spare': {
						text: '释放他',
						nextScene: {1: 'spare'}
					}
				}
			},
			'hang': {
				text: [
			       '村民们将盗贼绞死，高挂在仓库的门前。',
			       '此举卓有成效。数日后，遗失的物资都被还了回来。'
		        ],
		        onLoad: function() {
		        	$SM.set('game.thieves', 2);
		        	$SM.remove('income.thieves');
		        	$SM.addM('stores', $SM.get('game.stolen'));
		        },
		        buttons: {
					'leave': {
						text: '离开',
						nextScene: 'end'
					}
				}
			},
			'spare': {
				text: [
			       "这家伙感激涕零，说他再也不会来行窃了。",
			       "在离开前他分享了有关潜行的心得。"
		        ],
		        onLoad: function() {
		        	$SM.set('game.thieves', 2);
		        	$SM.remove('income.thieves');
		        	$SM.addPerk('stealthy');
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
];
