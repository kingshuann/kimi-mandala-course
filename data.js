// 網站共用資料：課程文案、場次快照、教室地址
// 場次：先用 2026-10-07 抓下來的快照，開頁時再嘗試讀即時資料覆蓋
var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwBrx3RqcjnG-TIbsNJlAx_rC7WWA3s8NONsc-Fm_FZ_QUwrJo0A_H5UOTe7S3D_YD-NA/exec";

var COURSES = {
  beginner: {
    key: 'beginner',
    tag: '放鬆療癒',
    name: '點點曼陀羅・零基礎課程',
    short: '零基礎課程',
    sub: '用重複的點與線，畫出一縷平靜',
    img: 'img/card-beginner.jpg',
    price: 3500, priceText: 'NT$3,500', orig: 'NT$3,980',
    note: '兩人同行 $6,666（每人 $3,333）',
    hours: '3.5 小時', units: '10 個單元',
    badges: ['🔥 熱門課程', '新手友善'],
    chips: ['零基礎OK', '贈工具大禮包', '含下午茶', '終生問答'],
    info: [['課程時長', '3.5 小時'], ['課程內容', '4 大主題・8 個單元'], ['課後成果', '<em class="nowrap">課程中：一幅 15cm 作品</em><br><em class="nowrap">課程後：多餘材料可完成 10 件作品</em>'], ['附贈', '工具大禮包（價值 $680）'], ['餐點', '含飲料一杯'], ['開班人數', '台中 1 人即開班<br>外縣市滿 3 人開班<br>6 人滿班']],
    perks: ['真・新手友善！零基礎也OK！', '報名即贈 工具大禮包', '課後能完成 10 件作品', '含下午茶一杯', '加入社群交流分享', '終生免費問答服務'],
    kit: ['13 支專用工具筆＆筆架', '專用定位打稿版', '15cm 曼陀羅專用卡紙', '10cm 圓形黑色畫卡', '六角型磁鐵', '9 色無毒丙烯顏料', '工具收納盒', '木質展示小畫架'],
    finalImg: 'img/final-beginner.jpg',
    lessons: [
      ['卡牌破冰', ['彩虹卡 x 各式卡牌：抽一張今天的訊息並分享']],
      ['圖形組合練習', ['認識基本工具', '常用 3 種基礎圖形與 3 種變化圖形拆解', '熟練度練習：既定圖形與自創圖形發想']],
      ['色彩與構圖', ['認識美國 DA 壓克力顏料與特性', '配色與構圖：找到你自己的風格', '草稿打底練習：圖形組合與構圖配置']],
      ['開始創作', ['進入心流，完成一幅屬於自己的作品']]
    ],
    who: ['覺得曼陀羅看起來很療癒', '想培養興趣，但對開始繪畫感到恐懼', '平時壓力很大，想療癒舒壓', '想發展副業增加斜槓收入', '想先打好基礎，未來有教課的打算', '我就是想來認識 Kimi 😂'],
    compare: [['課後作品', '課堂完成 1 件就結束', '回家能獨立完成 10 件'], ['基本功', '較少著墨', '完整教會，學完就能自己畫'], ['課程價值', '一次性的體驗', '擁有獨立創作的能力']],
    bring: '什麼都不用帶，開心的來就可以囉！怕餓歡迎帶零食飲料～'
  },
  teacher: {
    key: 'teacher',
    tag: '完整培訓',
    name: '點點曼陀羅・兩日師資班',
    short: '兩日師資班',
    sub: '兩天，把進階技法、教學心法與開課能力一次帶走',
    img: 'img/card-teacher.jpg',
    price: 26800, priceText: 'NT$26,800', orig: 'NT$39,800',
    note: '可中租分期・含兩日午餐＋下午茶',
    notePill: '可分期付款｜月付 1,280 起',
    hours: '2 天 09:00–17:00', units: '21 個單元',
    badges: ['🌱 開課必備', '可分期'],
    chips: ['完成 4 件作品', '教材全給', '開課諮詢', '終生問答'],
    info: [['課程時長', '兩日 09:00–17:00'], ['課程內容', '4 大主題・21 個單元'], ['課後成果', '4 件作品＋可直接沿用的教案'], ['附贈', '完整材料包＋獨家講義與練習本'], ['餐點', '含兩日午餐＋下午茶'], ['報名條件', '必須上過「零基礎課程」<br>其他老師的零基礎班也可以唷']],
    perks: ['4 種材質 + 1 種複合媒材', '3 種筆刷構圖模板', '5 種特殊構圖', '獨家找圓心方法', '加入師資社群交流分享', '終生問答服務'],
    kit: ['獨家編製講義＆練習本', '密度板、燭台、杯墊', '30cm 畫布含金屬框', '專用長峰筆刷組', '30cm 繪畫轉盤', '直尺、模具尺、量角器', '專用繪圖模板、大圓規', '顏料無限用到飽'],
    finalImg: 'img/final-teacher.jpg',
    lessons: [
      ['工具與基本功', ['基礎圖形複習與自創圖形發想', '找圓心：適用於大圓型構圖', '進階筆刷：認識長峰與短峰筆刷', '立體膠使用方式與技巧', '繪畫轉盤與大圓規的使用', '直尺、模具尺、量角器精準分割畫面', '調色與點點大小的控制']],
      ['多元材質與立體創作', ['卡紙、木板、畫布、石膏、竹板的打稿與構圖', '立體石膏燭台彩繪', '環氧樹脂媒材的保護與固定', '木板與密度板的底色處理', '不同材質的顏料附著與乾燥技巧']],
      ['進階構圖', ['多種構圖思路，告別單純同心圓構圖', '3 種筆刷構圖模板', '5 種特殊構圖實作', '配色層次：讓作品更有深度', '大幅作品的分區與比例規劃']],
      ['課程中完成的作品', ['15cm 厚木板', '竹製杯墊＋環氧樹脂封層', '立體石膏燭台', '30cm 圓形畫布含框']]
    ],
    who: ['想一次完整學習全部技法與經驗', '想學會創作更大幅作品（如找圓心）', '想跳脫簡單構圖，讓作品更有層次', '有計劃未來開課教學', '單純喜歡 Kimi，想開心共度兩日'],
    compare: [['教學重點', '只教畫畫技法', '進階技法＋教學心法'], ['開課支援', '要自己摸索', '定價、招生、教案都能問'], ['教材資源', '要自己整理', '提供全部教材檔案及廠商資料'], ['課後服務', '課程結束就結束', '終生問答服務']],
    bring: '請自備「平頭筆」及「點珠筆」！'
  }
};

var REVIEWS = [
  { who: '台中 零基礎班同學', text: '我才發現已經好久沒有把自己的時間排進生活裡了，原來陪伴自己可以這麼放鬆，完成之後又這麼有成就感！' },
  { who: '台中 零基礎班同學', text: '非常喜歡自己做的成品，沒想到我能這樣畫畫。我是容易緊張的人，沒想到整堂課開心又放鬆！' },
  { who: '桃園 零基礎班同學', text: '謝謝老師今天的療癒時光，我已經買了好多顏料準備要開始大畫特畫啦！' },
  { who: '高雄 零基礎班同學', text: '美麗的老師！療癒的課程。很放鬆，真的有療癒到我。' }
];

var WORKS = ['img/work6.jpg', 'img/work5.jpg', 'img/work1.jpg', 'img/work4.jpg', 'img/work2.jpg', 'img/work3.jpg', 'img/work7.jpg', 'img/mandala-navy.jpg'];

var VENUES = {
  '台北': '信義區崇德街38巷13號1樓', '新北': '新莊區新莊路209號2樓', '桃園': '桃園區新民街98號2樓',
  '新竹': '北區北門街21號2樓', '台中': '北屯區北屯路240巷15號', '高雄': '苓雅區中正二路89號6樓之5'
};

var SESSIONS = {
  beginner: [{"date":"2026-10-09","location":"台中","time":"09:00－12:30"},{"date":"2026-10-09","location":"台中","time":"13:30－17:00"},{"date":"2026-10-09","location":"台中","time":"18:30－22:00"},{"date":"2026-10-10","location":"台中","time":"09:00－12:30"},{"date":"2026-10-10","location":"台中","time":"13:30－17:00"},{"date":"2026-10-10","location":"台中","time":"18:30－22:00"},{"date":"2026-10-12","location":"台中","time":"09:00－12:30"},{"date":"2026-10-12","location":"台中","time":"18:30－22:00"},{"date":"2026-10-14","location":"台中","time":"09:00－12:30"},{"date":"2026-10-16","location":"台中","time":"13:30－17:00"},{"date":"2026-10-16","location":"台中","time":"18:30－22:00"},{"date":"2026-10-17","location":"台中","time":"09:00－12:30"},{"date":"2026-10-17","location":"台中","time":"13:30－17:00"},{"date":"2026-10-17","location":"台中","time":"18:30－22:00"},{"date":"2026-10-19","location":"台中","time":"09:00－12:30"},{"date":"2026-10-21","location":"台中","time":"09:00－12:30"},{"date":"2026-10-23","location":"台中","time":"09:00－12:30"},{"date":"2026-10-24","location":"台北","time":"13:00－16:30"},{"date":"2026-10-28","location":"台中","time":"09:00－12:30"},{"date":"2026-10-29","location":"新竹","time":"12:00－15:30"},{"date":"2026-10-30","location":"台中","time":"09:00－12:30"},{"date":"2026-10-31","location":"台中","time":"13:30－17:00"}],
  teacher: [{"date":"2026-11-14","location":"台中","time":"09:00－17:00","endDate":"2026-11-15"},{"date":"2026-11-19","location":"台中","time":"09:00－17:00","endDate":"2026-11-20"},{"date":"2026-12-23","location":"台中","time":"09:00－17:00","endDate":"2026-12-24"}]
};

var WEEK = ['日', '一', '二', '三', '四', '五', '六'];
function todayStr() { var d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function md(s) { var p = s.split('-'); return (+p[1]) + '/' + (+p[2]); }
function wd(s) { return WEEK[new Date(s + 'T00:00:00').getDay()]; }
function dateLabel(s) { var t = md(s.date) + '（' + wd(s.date) + '）'; if (s.endDate) t += '～' + md(s.endDate) + '（' + wd(s.endDate) + '）'; return t; }
function slotName(t) { var h = parseInt(t, 10); if (isNaN(h)) return '時間洽詢'; return h < 12 ? '早班' : h < 18 ? '午班' : '晚班'; }
// 包班（私人包場）：照樣顯示在場次裡，但不開放預約。之後有新的包班就加在這裡
var PRIVATE_SESSIONS = [
  { date: '2026-10-24', location: '台北' }
];
function isPrivate(s) {
  if (/包班/.test((s.location || '') + (s.time || ''))) return true;
  return PRIVATE_SESSIONS.some(function (p) { return p.date === s.date && (!p.location || p.location === s.location); });
}
function upcoming(list) { var t = todayStr(); return list.filter(function (s) { return s.date >= t; }); }

// 讀後台即時場次（Google Sheet）；讀得到就以後台為準，讀不到才用上面的快照
function loadLiveSessions(cb) {
  var done = 0;
  ['beginner', 'teacher'].forEach(function (k) {
    fetch(APPS_SCRIPT_URL + '?course=' + k).then(function (r) { return r.json(); }).then(function (d) {
      if (Array.isArray(d)) {
        // 修正 endDate 早於開始日的資料（後台目前有一筆 11/14 → 10/15）
        d.forEach(function (s) { if (s.endDate && s.endDate < s.date) { var p = s.date.split('-'); var e = new Date(+p[0], +p[1] - 1, +p[2] + 1); s.endDate = e.getFullYear() + '-' + String(e.getMonth() + 1).padStart(2, '0') + '-' + String(e.getDate()).padStart(2, '0'); } });
        SESSIONS[k] = d;
      }
    }).catch(function () {}).then(function () { if (++done === 2 && cb) cb(); });
  });
}
