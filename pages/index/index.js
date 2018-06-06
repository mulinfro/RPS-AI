const app = getApp();
var win = 0;
var lose = 0;
var tie = 0;
var rounds = 0;
const ROCK = 0;
const SCISSORS = 1;
const PAPER = 2;
const DECAY = 0.8;
const DECAY2 = 0.8;
const lang = { [ROCK]: "石头", [SCISSORS]: "剪刀", [PAPER]: "布" };
const ROT_IDX = { "T": 0, "R": 1, "RR": 2 };
const R_map = { [ROCK]: PAPER, [SCISSORS]: ROCK, [PAPER]: SCISSORS };
const RR_map = { [ROCK]: SCISSORS, [SCISSORS]: PAPER, [PAPER]: ROCK };
const penalty = { "L": -1, "w": 1, "T": 0 };
const STRATEGY = 2;
const MINHISLEN = 6;
var game_human_acts = new Array(),
  game_computer_acts = new Array(),
  game_res = new Array(),
  statistic_map = new Map(),
  step_rot = 0,
  step_rrot = 0,
  step_tie = 0;

const strategy_selection = {
  "1_s1": Array( "2", "3", "4"),
  "1_s2": Array( "2", "3", "5", "9"),
  "2_s1": Array("1", "2", "3", "4", "9"),
  "2_s2": Array("1", "2", "3", "4", "5", "6", "7", "8", "9"),
};

var strategy_meta_data = {
    1: {W:0, T:0, L:0},
    2: {W:0, T:0, L:0},
    3: {W:0, T:0, L:0},
    4: {W:0, T:0, L:0},
    5: {W:0, T:0, L:0},
    6: {W:0, T:0, L:0},
    7: {W:0, T:0, L:0},
    8: {W:0, T:0, L:0},
    9: { W: 0, T: 0, L: 0 }
};

var myData = {};
const K_BASE = 2.0
var h_rock_num  =   K_BASE;
var h_scissors_num = K_BASE;
var h_paper_num =  K_BASE;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    level: 2,
    win: 0,
    tie: 0,
    lose: 0,
    rounds: 0,
    human_action: 0,
    computer_action: 0,
    game_res: "T",      // 一局比赛输赢
    game_res_text: "",
    human_action_text: "",
    computer_action_text: "",
    human_pic: "../../image/xiaoxin_3.jpg",
    bot_pic: "../../image/robot.jpg"
  },

  // 重新开始
  game_clear: function() {
    win = 0; lose = 0; tie = 0; rounds = 0;
    h_rock_num = K_BASE;
    h_scissors_num = K_BASE;
    h_paper_num = K_BASE;

    game_human_acts = new Array();
      game_computer_acts = new Array();
      game_res = new Array();
      statistic_map = new Map();
      step_rot = 0;
      step_rrot = 0;
      step_tie = 0;

    strategy_meta_data = {
        1: { W: 0, T: 0, L: 0 },
        2: { W: 0, T: 0, L: 0 },
        3: { W: 0, T: 0, L: 0 },
        4: { W: 0, T: 0, L: 0 },
        5: { W: 0, T: 0, L: 0 },
        6: { W: 0, T: 0, L: 0 },
        7: { W: 0, T: 0, L: 0 },
        8: { W: 0, T: 0, L: 0 },
        9: { W: 0, T: 0, L: 0 }
      };

    this.setData({
      human_pic: "../../image/xiaoxin_3.jpg",
      bot_pic: "../../image/robot.jpg",
      win: 0,
      tie: 0,
      lose: 0,
      rounds: 0,
      human_action: 0,
      computer_action: 0,
      game_res_text: "",
      human_action_text: "",
      computer_action_text: "",
    });
  },

  update_human_action_record: function (human_action) {
      if(human_action == ROCK){
        h_rock_num += 1.0;
      } else if (human_action == SCISSORS){
        h_scissors_num += 1.0;
      }else {
        h_paper_num += 1.0;
      }
  },

  update_display_image: function (human_action, res){
    if (res == "W") { // 人赢，计算机输
      switch (human_action) {
        case ROCK:
          this.setData({
            human_pic: "../../image/rock_win.jpg",
            bot_pic: "../../image/scissors_lose.jpg"
          });
          break;
        case SCISSORS:
          this.setData({
            human_pic: "../../image/scissors_win.jpg",
            bot_pic: "../../image/paper_lose.jpg"
          });
          break;
        case PAPER:
          this.setData({
            human_pic: "../../image/paper_win.jpg",
            bot_pic: "../../image/rock_lose.jpg"
          });
          break;
      }
    } else if (res == "L") {  // 人输，计算机赢
      switch (human_action) {
        case ROCK:
          this.setData({
            human_pic: "../../image/rock_lose.jpg",
            bot_pic: "../../image/paper_win.jpg"
          });
          break;
        case SCISSORS:
          this.setData({
            human_pic: "../../image/scissors_lose.jpg",
            bot_pic: "../../image/rock_win.jpg"
          });
          break;
        case PAPER:
          this.setData({
            human_pic: "../../image/paper_lose.jpg",
            bot_pic: "../../image/scissors_win.jpg"
          });
          break;
      }
    } else if (res == "T") {  // 平局
      switch (human_action) {
        case ROCK:
          this.setData({
            human_pic: "../../image/rock_tie.jpg",
            bot_pic: "../../image/rock_tie.jpg"
          });
          break;
        case SCISSORS:
          this.setData({
            human_pic: "../../image/scissors_tie.jpg",
            bot_pic: "../../image/scissors_tie.jpg"
          });
          break;
        case PAPER:
          this.setData({
            human_pic: "../../image/paper_tie.jpg",
            bot_pic: "../../image/paper_tie.jpg"
          });
          break;
      }
    }
  },

  update_display_text: function (human_action, computer_action, res) {
    var human_action_text = "";
    var computer_action_text = "";
    switch (human_action) {
      case ROCK:
        human_action_text = "玩家出石头";
        break;
      case PAPER:
        human_action_text = "玩家出布";
        break;
      case SCISSORS:
        human_action_text = "玩家出剪刀";
        break;
    }
    switch (computer_action) {
      case ROCK:
        computer_action_text = "电脑出石头";
        break;
      case PAPER:
        computer_action_text = "电脑出布";
        break;
      case SCISSORS:
        computer_action_text = "电脑出剪刀";
        break;
    }
    var r_text = "";
    if (res == "W") {
      r_text = "你赢了";
    } else if (res == "L") {
      r_text = "你输了";
    } else if (res == "T") {
      r_text = "平局";
    }

    this.setData({
      game_res_text: r_text,
      human_action_text: human_action_text,
      computer_action_text: computer_action_text
    });

  },
  // 每次猜拳结束后，更新历史记录值
  update_data: function (human_action, computer_action, res) {

    /**
     * 更新双方图片
     */
    this.update_human_action_record(human_action);
    this.update_display_image(human_action, res);
    this.update_display_text(human_action, computer_action, res);
    this.update_score(res);

    game_human_acts.push(human_action);
    game_computer_acts.push(computer_action);
    game_res.push(res);
    if (rounds > 1) {
      var t1 = this.get_rot_relation(game_human_acts[rounds - 1], game_computer_acts[rounds - 2]);
      step_tie *= DECAY;
      step_rot *= DECAY;
      step_rrot *= DECAY;
      if (t1 == "T") {
        step_tie += 1;
      } else if (t1 == "R") {
        step_rot += 1;
      } else {
        step_rrot += 1;
      }
      var idx = ROT_IDX[t1];
      if (rounds > 2) {

        var t2 = this.get_rot_relation(game_human_acts[rounds - 2], game_computer_acts[rounds - 3]);
        var dna = game_res[rounds - 3] + "_" + game_res[rounds - 2] + "_" + t2;
        if (!statistic_map.has(game_res[rounds - 2])){
          statistic_map.set(game_res[rounds - 2], new Array(0.0, 0.0, 0.0));
        };
        var tmp0 = statistic_map.get(game_res[rounds - 2]);
        tmp0[0] *= DECAY;
        tmp0[1] *= DECAY;
        tmp0[2] *= DECAY;
        tmp0[idx] += 1;
        statistic_map.set(game_res[rounds - 2], tmp0);

        if (!statistic_map.has(dna)) {
          statistic_map.set(dna, new Array(0.0, 0.0, 0.0));
        };
        var tmp = statistic_map.get(dna);
        tmp[0] *= DECAY;
        tmp[1] *= DECAY;
        tmp[2] *= DECAY;
        tmp[idx] += 1;
        statistic_map.set(dna, tmp);
      }
    }
  },

  update_score: function(res) {
    rounds = rounds + 1
    if (res == "T") {
      tie = tie + 1;
    } else if (res == "W"){
      win = win + 1;
    } else {
      lose = lose + 1;
    }
  },

  //比较猜拳胜负函数
  compare_rps: function (op1, op2) {
    if (op1 == op2) {
      return "T";
    } else if ((op1 == ROCK && op2 == SCISSORS) || (op1 == SCISSORS && op2 == PAPER) || (op1 == PAPER && op2 == ROCK)) {
      return "W";
    } else {
      return "L";
    }
  },

  get_rot_relation: function (l1, l2) {
    if (l1 == l2) {
      return "T";
    } else if (l1 - l2 == -1 || l1 - l2 == 2) {
      return "R";
    } else {
      return "RR";
    }
  },

  play_helper: function (human_action) {
    var strategy_sel = this.init_strategy();
    var computer_action = this.run_game(strategy_sel);
    var r = this.compare_rps(human_action, computer_action);
    this.simulation(human_action);
    
    this.update_data(human_action, computer_action, r);
    
    myData = {
      game_res: r,
      win: win,
      lose: lose,
      tie: tie,
      rounds: rounds,
      computer_action: computer_action,
      human_action: human_action,
    };

    this.setData(myData);
  },

  play_rock: function () {
    this.play_helper(ROCK);
  },
  play_scissors: function () {
    this.play_helper(SCISSORS);
  },
  play_paper: function () {
    this.play_helper(PAPER);
  },

  // 混合使用多种策略  UCB算法
  meta_mix: function(){
    var s_sele = Math.floor(Math.random() * (2 + 1)) + 1;
    return s_sele;
  },

  simulation: function (human_action) {
    //console.log("SIMULATION beg ###########################################");
    for(var s in strategy_meta_data){
      //console.log("TTT", s, typeof(s));
        var computer_action = this.run_game(s);
        var r = this.compare_rps(computer_action, human_action);
        strategy_meta_data[s]["W"] *= DECAY2;
        strategy_meta_data[s]["T"] *= DECAY2;
        strategy_meta_data[s]["L"] *= DECAY2;
        strategy_meta_data[s][r] += 1;
        //console.log("TTT", "STRATEGY", s, "RES:", r, "REPLY:", computer_action, strategy_meta_data[s]["W"], strategy_meta_data[s]["T"], strategy_meta_data[s]["L"])
    }
    //console.log("SIMULATION end ###########################################");
   },

  init_strategy: function() {
    var h1 = strategy_selection[this.data.level + "_s1"];
    var h2 = strategy_selection[this.data.level + "_s2"];
    if (rounds < 3) { 
      return "1";
    }else if(rounds < 6){
      return this.ucb_meta_mix(h1);
    }else{
      return this.ucb_meta_mix(h2);
    }
  },
  
  ucb_meta_mix: function(ss){
    //var lnn = 2 * Math.log(this.rounds);
    var max_score = -1;
    var strategy;
    var shift = Math.floor(Math.random() * (ss.length));
    for (var i = 0; i < ss.length; ++i){
      var s = ss[(i + shift) % ss.length];
        var score = (strategy_meta_data[s].T + strategy_meta_data[s].W) / rounds;
        if (score > max_score){
            max_score = score;
            strategy = s;
        }
        //console.log("STRATEGY RUN", s, typeof (s), "score", score);
    }
    console.log("STRATEGY", strategy, "score", max_score);
    return strategy;
  },

  argmax3tuple: function (tp3) {
    var min = tp3[0];
    var max_score = tp3[0];
    for (var i in tp3) {
      if (tp3[i] > max_score) {
        max_score = tp3[i];
      }
    }
    var r_idx = Math.floor(Math.random() * (2 + 1));
    //console.log("VE", max_score, "TP", tp3);
    for (var i = 0; i < 3; ++i) {
      var tmp = (i + r_idx) % 3;
      if (tp3[tmp] >= max_score) {
        return tmp;
      }
    }
  },

  get_reply_action: function (r, act) {
    var expected_act = SCISSORS;
    if (r == 0) {
      expected_act = act;
    } else if (r == 1) {
      expected_act = R_map[act];
    } else {
      expected_act = RR_map[act];
    }
    //console.log("LOG", r, act, typeof(r), typeof(act), expected_act, R_map[expected_act]);
    return R_map[expected_act];
  },

  /**
    * 计算下次出拳的内容
    */
  _strategy1: function () {
    return Math.floor(Math.random() * (2 + 1));
  },

  // 依概率随机
  _strategy2: function () {
    var t = Math.random();
    var r;
    if (t < h_rock_num / (rounds + K_BASE * 3)) {
      r = ROCK;
    } else if (t < (h_rock_num + h_scissors_num) / (rounds + K_BASE * 3)) {
      r = SCISSORS;
    } else {
      r = PAPER;
    }
    //console.log("2", h_rock_num, h_scissors_num, h_paper_num, rounds, (h_rock_num + h_scissors_num) / (rounds + K_BASE * 3));
    return R_map[r];
  },

    // 根据单步特征
  _strategy3:  function() {
      var r = this.argmax3tuple(new Array(step_tie, step_rot, step_rrot));
      //console.log(r, step_tie, step_rot, step_rrot, game_computer_acts[rounds - 1]);
      return this.get_reply_action(r, game_computer_acts[rounds - 1]);
  },

  //  beat _strategy3
  _strategy4: function () {
    return R_map[this._strategy3()];
  },

 //  单步输赢 + rot
  _strategy5: function () {
      var dna = game_res[rounds - 1];
      if (statistic_map.has(dna)) {
        var r = this.argmax3tuple(statistic_map.get(dna));
        return this.get_reply_action(r, game_computer_acts[rounds - 1]);
      } else {
        //console.log("UNDEFINED S5", dna);
        return this._strategy3();
      } 
  },

  //  beat _strategy5
  _strategy6: function () {
    return R_map[this._strategy5()];
  },

  // 双步输赢 + rot
  _strategy7: function () {
    //console.log("FRFR2", R_map);
      var t1 = this.get_rot_relation(game_human_acts[rounds - 1], game_computer_acts[rounds - 2]);
      var dna = game_res[rounds - 2] + "_" + game_res[rounds - 1] + "_" + t1;
      if (statistic_map.has(dna)) {
        var r = this.argmax3tuple(statistic_map.get(dna));
        return this.get_reply_action(r, game_computer_acts[rounds - 1]);
      } else {
        console.log("UNDEFINED S7", dna);

        return this._strategy3();
      }
  },

  // beat _strategy7
  _strategy8: function () {
    return R_map[this._strategy7()];
  },

    //  winner stay; lose reverse
  _strategy9: function() {
      var r;
      if (game_res[rounds -1] == 'W'){
        r = (game_human_acts[rounds - 1] - game_computer_acts[rounds - 2] + game_computer_acts[rounds-1] + 3 ) % 3;
      } else if (game_res[rounds - 1] == "T") {
        r = this._strategy2();
      }else{
          var r_idx = Math.floor(Math.random() * 2) + 1;
          r = (game_human_acts[rounds - 1] - game_computer_acts[rounds - 2] + game_computer_acts[rounds-1] + r_idx + 3) % 3;
      }
      //console.log(r, game_res[rounds-1]);
      return R_map[r];
  },

  run_game: function (s_sele) {
    var r = -1;
    switch (s_sele) {
      case "1":
        r = this._strategy1();
        break;
      case "2":
        r = this._strategy2();
        break;
      case "3":
        r = this._strategy3();
        break;
      case "4":
        r = this._strategy4();
        break;
      case "5":
        r = this._strategy5();
        break;
      case "6":
        r = this._strategy6();
        break;
      case "7":
        r = this._strategy7();
        break;
      case "8":
        r = this._strategy8();
        break;
      case "9":
        r = this._strategy9();
        break;
      default:
        r = -1;

    }
    //console.log("RRR", typeof (s_sele), s_sele, r);
    return r;
  },

  recordState: function () {
    this.setData(myData);
    wx.setStorageSync("myData", myData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //var data = wx.getStorageSync("myData");
   // if (!!data) {
   //   this.setData(data);
   // }
    this.setData({ level: options.level});
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
    this.recordState();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.recordState();
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
  onShareAppMessage: function (res) {
    return {
      title: '石头剪刀布，你赢得了AI吗？',
      path: '/pages/start/start',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }

})
