// pages/index/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    nodex: [{
      name: 'h2',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '说明'
      }]
    }],

    nodey: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '在对战中，AI有一个学习过程，为了尽量避免随机性，请保持一定量的对战局数(建议大于30局)。 PS: 如果能找到AI的弱点就能打败AI，Good Luck！'
      }]
    }],
    nodez: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '推荐个益智微信小游戏: NoCross，富有挑战和趣味性；《最强大脑》节目上曾有过类似项目。'
      }]
    }],

    node0: [{
      name: 'h2',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '历史起源'
      }]
    }],
    node1: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '石头-剪刀-布是一种猜拳游戏。其起源有两种说法：一种是说起源于中国，主要是由明朝人所写《五杂组》中记载的“最早剪刀石头布是起源自汉朝的手势令与豁拳”，然而中国所谓的豁拳是否是指猜拳，这仍待考证。'
      }]
    }],
    node2: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '另外一种比较有直接证据的说法是起源于19世纪的日本，相关资料可见由日本国立民族学博物馆所出版的文献。日本明治时期开始传入中国，到了二十世纪剪刀石头布的游戏开始传到了欧洲与美国，而欧美都称剪刀石头布的游戏是"日本游戏"，法国人称剪刀石头布为"jeu Japonais"（意思就是日本游戏）。原因就是因为到了二十世纪，日本人大量西化以及日本人到世界各国游历的原因，也对欧美推广了这个游戏，使得很多欧美人都认为剪刀石头布就是日本的游戏。'
      }]
    }],
    node3: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '中国人一般都叫“石头、剪刀、布”，而日本人则叫做“石头、剪刀、纸”，与美洲、欧洲的叫法相近（Rock, Paper, Scissors），这是因为“石头、剪刀、纸”是由19世纪的日本传入欧美的缘故。台湾人的闽南语式玩法，也是以纸代替布，闽南语一般叫“铰刀、石头、纸”；国语则叫“剪刀、石头、布”。韩国人的顺序也是“剪刀、石头、布”。'
      }]
    }],
    node4: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node5: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node6: [{
      name: 'h2',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '游戏策略'
      }]
    }],
    node7: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node8: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '从博弈论的角度，石头剪刀布游戏的最优策略就是每次随机出拳； 这样无论对手采取哪种策略，自己都有50%的胜率(不考虑平局)，然而也没法提高胜率。但是，如果对手不是采用“最优”策略，而是采用某种“次优”策略的话，自己采用随机玩法就不是最好的玩法，只要能找到对方策略的特点，针对性出拳，就能把胜率提高到50%以上。&nbsp;'
      }]
    }],
    node9: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '事实上，受心理因素和大脑的潜意识影响，大部分人出拳都有一定的倾向性，而不是真正的随机；比如统计发现：人们第一次出拳倾向于出石头；大部分人在同样手势连输两次以后大概率会改变手势；上一回合的输家，接下来很可能会出自己上一招的克招等。'
      }]
    }],
    node10: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '浙江大学、浙江工商大学和中科院理论物理研究所的科研人员曾发表过关于“石头剪刀布”游戏的研究分析论文。研究员通过研究实验者的表现，总结出了玩家往往倾向于采用上一轮赢了的策略，会在下一轮中更换其输了的策略。 比如，一个人上一轮比赛出了石头赢了，其下一轮会倾向于再用石头，而如果其用石头输了，下一轮可能会选择换布或者剪刀。还对此给出了剪刀石头布的获胜策略：如果你的对手前一轮用石头打败了你，那你这一轮可以选择用布；而如果你的对手前一轮出石头输了，那你可以针对其此轮可能会出的剪刀或布，给出相应的克制招。'
      }]
    }],
    node11: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node12: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node13: [{
      name: 'h2',
      attrs: {
      },
      children: [{
        type: 'text',
        text: 'AI的策略'
      }]
    }],
    node14: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node15: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '虽然上面提到的浙江大学等的研究员给出了一个“制胜策略”，但这个策略是针对广泛人群的一个统计意义上的策略，策略本身太简单，很容易被发现和克制。 事实上任意一个单一策略都不够强，因为对手也在不断学习, 而AI必须足够"智能"，以应对不同的对手。'
      }]
    }],
    node16: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '针对石头-剪刀-布这个游戏，一个足够强健的AI程序应该尽量满足下面三个条件：&nbsp;'
      }]
    }],
    node17: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node18: [{
      name: 'ul',
      attrs: {
      },
      children: [{
        name: 'li',
        attrs: {
        },
        children: [{
          type: 'text',
          text: '发现弱点: 能找到对手出拳的模式&nbsp;'
        }]
      },
      {
        name: 'li',
        attrs: {
        },
        children: [{
          type: 'text',
          text: '动态调整: 能够随着对手的策略改变而调整自己的策略&nbsp;'
        }]
      },
      {
        name: 'li',
        attrs: {
        },
        children: [{
          type: 'text',
          text: '隐蔽性: 能隐藏自己的策略 &nbsp;'
        }]
      }]
    }],
    node19: [{
      type: 'text',
      text: '此小游戏AI所采取的策略核心是：混合不同的策略。因为策略每种都会有弱点，动态使用不同的策略，才能做到最稳健的AI。每次出拳，AI程序会在后台同时运行N种不同的策略，然后根据每种策略最近的效果(即不败率)来挑选一个最优的策略来应对。 这N种策略各有不同，甚至模式上互相相反。 在这N种策略中，比较重要的一类是偏好分析相关的策略。这些策略会分析对手的出拳偏好，根据对方出拳的偏好给出应对。 举一个简单的例子：假如A经常在出石头胜利后，下一次偏好出石头或布，那AI遇到这种情况，只要出布即可。 可以看出，这些策略是为了满足上述的条件"发现弱点"，当遇到出拳规律很明显的选手时，AI必须完克对方。'
    }],
    node20: [{
      name: 'br',
      attrs: {
      },
      children: []
    }],
    node21: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node22: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '对手的策略会不断调整，所以AI也必须实现"动态调整"来应对。这个机制的实现主要是依赖：1混合不同子策略，2子策略本身的参数变化。 虽然AI会根据对手做出改变，但是程序做变化的速率是固定的，同时也是依赖于历史数据的，所以只要玩家策略调整的节奏控制的恰当好处，就能完爆AI。 针对上述问题，必须强化条件"隐蔽性"。混合不同策略本身可以比较好的隐藏自己的策略，同时当对手模式不清晰时，AI也会加入了一定的随机性在里面，来强化"隐蔽性"。'
      }]
    }],
    node23: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }],
    node24: [{
      name: 'h2',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '关于我们'
      }]
    }],
    node25: [{
      name: 'p',
      attrs: {
      },
      children: [{
        type: 'text',
        text: '个人开发者，希望喜欢；联系方式：netmagic@126.com'
      }]
    }],

    node26: [{
      name: 'p',
      attrs: {
      },
      children: [{
        name: 'br',
        attrs: {
        },
        children: []
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
})
