// 三個版本共用：資料來自正式網站的 data.js（課程、場次），這裡只管頁面切換、選單、購物車
// 圖片直接讀正式網站的 img 資料夾，不另外複製
var IMG = '../';
var ICONS = {
  home: '<svg viewBox="0 0 24 24"><path d="M4 11 12 4l8 7v8.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5z"/><circle cx="12" cy="14.6" r="2.8"/><circle cx="12" cy="14.6" r=".4"/></svg>',
  shop: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>',
  lotus: '<svg viewBox="0 0 24 24"><path d="M12 18c-3-2-4-5-4-8 2 1 3.4 2.6 4 4.5.6-1.9 2-3.5 4-4.5 0 3-1 6-4 8z"/><path d="M12 18c-4 0-7-1.6-8.5-4 2.2-.3 4.2.2 5.8 1.3M12 18c4 0 7-1.6 8.5-4-2.2-.3-4.2.2-5.8 1.3"/><path d="M12 14.5C11 11 11.5 7.5 12 5c.5 2.5 1 6 0 9.5"/></svg>',
  cal: '<svg viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></svg>',
  candle: '<svg viewBox="0 0 24 24"><path d="M12 3.5c1.4 1.7 1.5 2.9.6 3.8-.3.3-.9.3-1.2 0-.9-.9-.8-2.1.6-3.8z"/><path d="M12 8v2"/><rect x="7" y="10" width="10" height="10" rx="1.8"/><path d="M7 14h10"/></svg>',
  brush: '<svg viewBox="0 0 24 24"><g transform="rotate(45 12 12)"><rect x="10.6" y="2" width="2.8" height="10" rx="1.4"/><path d="M9.8 12h4.4v2.2c0 2.2-1 4.4-2.2 6.3-1.2-1.9-2.2-4.1-2.2-6.3z"/></g><circle cx="16.3" cy="19.6" r=".5"/><circle cx="19.6" cy="16.3" r=".5"/></svg>',
  mag: '<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="1.2"/><path d="M8 6.8h8"/><circle cx="12" cy="13.2" r="3.2"/><circle cx="12" cy="13.2" r=".4"/></svg>',
  store: '<svg viewBox="0 0 24 24"><path d="M4 9 5.6 4.5h12.8L20 9"/><path d="M4 9a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/><path d="M5.5 11v8.5h13V11"/><circle cx="12" cy="15.3" r="2.4"/><circle cx="12" cy="15.3" r=".4"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h15"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.3-3.6 4.2-5.4 7.5-5.4s6.2 1.8 7.5 5.4"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
  leaf: '<svg viewBox="0 0 120 160" class="lf"><path d="M20 155C40 110 70 60 110 5"/><path d="M38 118c-14-18-12-40 2-52 6 20 4 38-2 52z"/><path d="M38 118c22-2 38 8 46 24-22 2-38-8-46-24z"/><path d="M60 84c-12-18-8-38 6-50 4 20 2 36-6 50z"/><path d="M60 84c22-2 36 8 44 22-20 2-36-6-44-22z"/><path d="M82 50c-8-16-4-32 8-42 2 16 0 30-8 42z"/><path d="M82 50c18-2 30 6 36 20-18 2-30-6-36-20z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M5 7h14M9.5 7V5h5v2M7 7l1 12h8l1-12"/></svg>'
};
var NAV = [['home', '首頁', 'home'], ['shop', '課程介紹', 'brush'], ['goods', '商店', 'store']];
var NOTES = ['台中班、線上課 1 人就開班，時間可討論；台中以外的縣市滿 3 人才開班。最晚於開課前一週通知，未成功開班全額退費，也可延期或轉讓。', '完成匯款後如因個人因素無法參加，可延期補課或轉讓他人，恕不退費。', '大人與小朋友同價，歡迎攜伴，請家長協助照顧。', '課堂中老師會側拍作品分享到 IG，不想入鏡請告訴老師。'];
// 兩日進階班改版（2026-11-25 Kimi 定案）：「兩日師資班」改名「進階：創作兩日進階班」，開課陪跑計劃改成加購
// 只改新網站：在這裡覆寫 data.js 的 COURSES.teacher，舊首頁不受影響
(function () {
  var t = window.COURSES && COURSES.teacher; if (!t) return;
  t.tag = '進階'; t.name = '點點曼陀羅・兩日進階班：職人研修'; t.short = '兩日進階班：職人研修';
  t.sub = '兩天學會進階技法與大幅構圖，畫出有質感的作品';
  t.orig = ''; t.badges = ['🌱 進階創作', '可分期'];
  t.chips = ['4 件作品', '材料全包', '每梯限 6 人', '終身問答'];
  t.info = [['課程時長', '兩日 09:00–17:00'], ['課程內容', '4 大主題・21 個單元'], ['課後成果', '4 件不同材質的作品'], ['附贈', '完整材料包＋獨家講義與練習本'], ['餐點', '含兩日午餐＋下午茶'], ['名額', '每梯限定 6 人'], ['報名條件', '上過「零基礎課程」<br>任何老師的零基礎班都可以']];
  t.perks = (t.perks || []).map(function (x) { return x.replace('師資社群', '學員社群'); });
  t.who = ['想一次完整學會進階技法', '想學會創作更大幅作品（如找圓心）', '想跳脫簡單構圖，讓作品更有層次', '想把畫畫得更美，做出有質感的作品', '不一定想當老師，喜歡畫畫就可以來', '單純喜歡 Kimi，想開心共度兩日'];
  t.compare = [['學習重點', '單一技法', '進階技法＋大幅構圖'], ['作品', '一堂一件小作品', '兩天完成 4 件不同材質作品'], ['材料', '要自己準備', '材料全包・顏料用到飽'], ['課後服務', '課程結束就結束', '終生問答服務']];
})();
// 零基礎班「你是不是也這樣？」（2026-11-26 Kimi，取自品牌根系 A｜零基礎班受眾的心聲與沒持續的原因）
// 兩日進階班優惠券「了解詳情」彈窗：三種情況怎麼送（2026-11-26 Kimi）
// 2026-11-27 Kimi：上過零基礎再升級改成現折 1,800（對外寫「原價 26,800 只要 25,000」，不寫折多少；舊生優惠碼 stu1800）；課後複習影片＋30 日練習本只送 Kimi 自己的學生，網站不寫，Kimi 上完課當面宣傳（2026-11-27）
var CPN_HOW = [['還沒上過零基礎', '一起報名，零基礎免費', '報名兩日進階班時，順便選一堂零基礎場次，先上零基礎、再上兩日進階班。'],
  ['上過 Kimi 的零基礎班', '原價 <s>NT$26,800</s>，只要 NT$25,000', '上完零基礎 2 週內報名兩日進階班，登入會員，系統會自動折抵。'],
  ['已報名其他老師的零基礎班', '送一堂線上零基礎回訓', '材料自備，課前提供材料清單，報名後小幫手用 LINE 跟你約時間。']];
function cpnOpen() {
  var m = document.getElementById('cpm');
  if (!m) {
    m = document.createElement('div'); m.id = 'cpm'; m.className = 'cpm';
    m.innerHTML = '<div class="cpm-bg" data-cpx></div><div class="cpm-box"><button class="cpm-x" data-cpx aria-label="關閉">×</button><small>BONUS・兩日進階班限定</small><h3>報名優惠怎麼算？</h3>' +
      CPN_HOW.map(function (r, i) { return '<div class="cpm-r"><p class="cpm-k"><i class="cpm-n">' + (i + 1) + '</i>' + r[0] + '</p><b>→ ' + r[1] + '</b><span>' + r[2] + '</span></div>'; }).join('') +
      '<button class="btn full" data-cpx>我知道了</button></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function (ev) { if (ev.target.closest('[data-cpx]')) { ev.stopPropagation(); m.hidden = true; } });
  }
  m.hidden = false;
}
var BEGINNER_PAIN = [['每天都好累', '工作、家庭、小孩，好像只有自己不在裡面'], ['想到待辦就焦慮', '想留一段時間，只給自己'], ['好喜歡這種作品', '但總覺得「我不會畫畫」'], ['上過手作體驗課', '帶回一個成品，回家就畫不下去']];
var TEACHER_PAIN = [['畫了一陣子', '作品卻一直停在小卡片'], ['想畫大幅作品', '不知道怎麼找圓心、分割'], ['構圖總是同心圓', '想讓作品更有層次'], ['想試不同材質', '木板、畫布、石膏都想畫']];
// 零基礎優惠：三種學生
// 2026-11-26 Kimi：精簡成一張表，放在兩日進階班頁最前面
var BASE_DEALS = [
  ['還沒上過零基礎', '一起報，零基礎免費'],
  ['上過 Kimi 的零基礎', '2 週內報名，只要 NT$25,000'],
  ['已報名其他老師的零基礎班', '送一堂線上零基礎回訓']
];
// 加購：開課陪跑計劃（3 個月）
var COACH = { price: 13000, later: 16800 }; // 2026-11-27 Kimi：單買改 16,800，跟兩日進階班一起加購 13,000（省 3,800）
// 等級（2026-11-26 Kimi 定案）：零基礎、線上＝初階，兩日進階班＝進階，陪跑計劃是兩日進階班的加購；三堂比較表在「全部課程」頁最上面
var COACH_FOR = [ // 2026-11-27 Kimi：一句話一格，重點那幾個字加粗（不要上下大小標題）
  '想用喜歡的點點曼陀羅開課，<b>多一份斜槓收入</b>',
  '已經是美業、瑜珈、身心靈、手作老師，<b>想多一個課程項目</b>',
  '想當老師，但<b>不知道該從哪裡開始</b>',
  '<b>不會規劃課程</b>，不知道一堂課的流程和內容要怎麼安排',
  '<b>不知道怎麼招生</b>，第一批學生要從哪裡來？',
  '想分享開課資訊，又<b>怕發出去像在硬推銷</b>',
  '<b>不知道怎麼經營 IG</b>，讓更多人看見你的作品',
  '想有一個<b>讓學生直接來報名的帳號</b>，但不知道怎麼開始'
];
var COACH_GETS = [
  ['完整教材授權', '可以用 Kimi 的教材和教案開課；教材更新時，也會拿到更新檔'],
  ['師資專屬資料庫', '開課會用到的資料都整理在一起，隨時回來查'],
  ['開課經營線上課（預錄影片）', '從創一個開課用的 IG 帳號開始，教你要發什麼、分享什麼內容，到用 Google 表單收報名資料，一步一步跟著做，隨時可以重看'],
  ['一對一線上諮詢 4 次', '每次 45 分鐘，從定位一路陪你走到開課'],
  ['開課計劃書批改', '繳交你的開課計劃書，由 Kimi 親自批改'],
  ['廠商資料', '材料、工具去哪裡買，直接給你清單'],
  ['師資結業證書', '陪跑計劃學員專屬']
];
var COACH_STEPS = [['第 1 週', '定位與目標：想教誰、在哪裡開、怎麼定價'], ['第 3～4 週', '開課計劃書修改、課程流程、材料準備'], ['第 2 個月', '招生與宣傳'], ['第 3 個月', '開課前最後確認，或第一堂課後檢討']];
var TEACHER_QA = [
  ['兩日進階班一定要想當老師嗎？', '不用！兩日進階班是給想把畫畫得更美、做出有質感大作品的人。想開課的話，再加購開課陪跑計劃就好。'],
  ['只上兩日進階班，可以用學到的東西開課嗎？', '兩日進階班是陪你把作品畫得更好，不包含教學授權。如果你想用這套教材開課，開課陪跑計劃會給你完整的教材授權，還有我一路陪你走到開課。'],
  ['上完兩日進階班之後，還能買陪跑計劃嗎？', '可以！陪跑計劃可以單獨購買，價格是 NT$16,800；報名兩日進階班時一起加購只要 NT$13,000，可以省下 NT$3,800。'],
  ['已報名其他老師的零基礎班，可以報兩日進階班嗎？', '可以！不管你在哪裡學過零基礎，都歡迎來兩日進階班。我們會贈送一堂「線上零基礎回訓」，材料自備，課前會提供材料清單，讓大家從同一個起點出發。'],
  ['完全沒學過可以直接報名嗎？', '可以！零基礎＋兩日進階班一起報，零基礎免費。報名時順便選一堂零基礎場次，先上完零基礎，再來上兩日進階班。'],
  ['上過 Kimi 的零基礎，再報兩日進階班有優惠嗎？', '有！上完零基礎 2 週內報名兩日進階班，原價 NT$26,800，只要 NT$25,000。登入會員，系統會自動幫你折抵。'],
  ['陪跑學員拿到的教材可以修改嗎？', '可以依照你的風格調整，用在自己的課程裡；教材檔案僅限本人使用，請勿轉賣或分享給他人。'],
  ['開課的材料要去哪裡買？', '陪跑計劃附有廠商資料，可以照清單自己買，也可以直接跟 Kimi 購買。'],
  ['兩日進階班可以分期嗎？', '可以，兩日進階班提供中租分期，送出報名後小幫手會用 LINE 提供分期資訊。']
];
var TEACHER_COND = '報名條件：上過「零基礎課程」（任何老師的都可以）。還沒上過的話，可以零基礎＋兩日進階班一起報，零基礎免費。';
var EXTRA = { online: { key: 'online', short: '線上課', name: '點點曼陀羅・線上課', sub: '材料包寄到家，在家視訊上課', price: 3333, priceText: 'NT$3,333', orig: 'NT$3,980', img: 'img/work5.jpg', tag: '在家上課', hours: '3 小時 30 分鐘' } };
(function () { if (window.COURSES && COURSES.beginner) { COURSES.beginner.tag = '初階'; COURSES.beginner.short = '初階班：零基礎入門'; } EXTRA.online.tag = '初階・線上'; })();
// 課程階段標誌（2026-11-26 Kimi）：初階萌芽🌱、進階綻放🌸、陪跑成林🌳
var STG_SVG = {
  b: '<path d="M12 21v-8"/><path d="M12 13C12 9 9.5 7 5 7c0 4 2.5 6 7 6z"/><path d="M12 11c0-3 2.5-5 6.5-5 0 3.5-2.5 5-6.5 5z"/>',
  t: '<circle cx="12" cy="10" r="1.8"/><path d="M12 8.2C10.2 5 11 3 12 3s1.8 2 0 5.2zM13.7 9.4c3-1.9 5-1.3 5.3-.4.3 1-1.4 2.2-5 1.9zM13.2 11.6c1.9 3 1.3 5 .4 5.3-1 .3-2.2-1.4-1.9-5zM10.8 11.6c-1.9 3-1.3 5-.4 5.3 1 .3 2.2-1.4 1.9-5zM10.3 9.4C7.3 7.5 5.3 8.1 5 9c-.3 1 1.4 2.2 5 1.9z"/><path d="M12 17v4"/>',
  c: '<path d="M12 21v-5"/><path d="M12 3C8.7 3 6.4 5.5 6.4 8.3c0 .9.2 1.7.7 2.4C6 11.5 5.3 12.6 5.3 13.8 5.3 15.6 7 17 9 17h6c2 0 3.7-1.4 3.7-3.2 0-1.2-.7-2.3-1.8-3.1.5-.7.7-1.5.7-2.4C17.6 5.5 15.3 3 12 3z"/>'
};
var STG_TXT = { b: '萌芽', t: '綻放', c: '成林' };
function stg(k) { return '<span class="stg stg-' + k + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + STG_SVG[k] + '</svg>' + STG_TXT[k] + '</span>'; }
// 開課陪跑計劃單買（2026-11-27 Kimi）：原價 16,800，網站直接結帳。
// 2026-11-27 Kimi：舊師資班學生只有 3 位，直接送陪跑（當實驗），不做優惠碼 → 陪跑頁先不顯示優惠碼欄；之後要開放改成 true（資料庫 promo_codes，course = 'coach'）
var COACH_CODE = false;
EXTRA.coach = { key: 'coach', short: '開課陪跑計劃', name: '點點曼陀羅・開課陪跑計劃', sub: '3 個月一對一陪跑', price: 16800, priceText: 'NT$16,800', img: 'img_banner/teacher.jpg', tag: '陪跑' };
function C(k) { return COURSES[k] || EXTRA[k]; }
function money(n) { return 'NT$' + n.toLocaleString('en-US'); }

// ---- 訪客分析：拿到 ID 後貼在引號裡（空白就不啟用） ----
var TRACK = {
  clarity: '',   // Microsoft Clarity 的 Project ID
  ga4: ''        // Google Analytics 的評估 ID，G- 開頭
};
(function () {
  if (TRACK.clarity) {
    (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, 'clarity', 'script', TRACK.clarity);
  }
  if (TRACK.ga4) {
    var g = document.createElement('script'); g.async = 1; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + TRACK.ga4; document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date()); gtag('config', TRACK.ga4, { send_page_view: false });
  }
})();
// 記一個事件（GA4 和 Clarity 都收）
function trk(name, params) {
  try { if (window.gtag && TRACK.ga4) gtag('event', name, params || {}); } catch (e) {}
  try { if (window.clarity && TRACK.clarity) clarity('event', name); } catch (e) {}
}
var PG_NAME = { home: '首頁', shop: '課程介紹', course: '課程內頁', goods: '商店', cart: '結帳', done: '完成', works: '點點月刊', me: '會員', reset: '重設密碼' };

// ---- 收款資訊：Kimi 自己把 ★ 的地方換成真的資料 ----
var PAYINFO = {
  bank: '台新銀行 (812）',
  account: '28881000341346',
  holder: '金淑安',
  linepayQR: 'img_pay/linepay_qr.png'  // LINE Pay 收款條碼圖片，存成這個檔名放進 img_pay 資料夾
};
var S = { page: 'home', k: 'beginner', city: null, sess: null, cart: [], pay: 'transfer' };

// ---- 共用元件 ----
function topbar(sub) {
  // 字標靠左（內頁前面多一個返回鍵），右邊依序：會員、購物車、選單（2026-11-24 Kimi）
  return '<header class="tb"><div class="tb-lw">' + (sub ? '<button class="tb-l tb-bk" data-back aria-label="返回">' + ICONS.back + '</button>' : '') +
    '<div class="wm" data-go="home"><b>imikdots</b><small>Kimi 點點曼陀羅</small></div></div>' +
    '<div class="tb-r"><button data-login aria-label="會員登入">' + ICONS.user + '</button><button data-go="cart" aria-label="購物車">' + ICONS.shop + '<em class="cnt"></em></button><button class="tb-mn" data-menu aria-label="選單"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></header>';
}
function navbar() {
  return '<nav class="nav">' + NAV.map(function (n) { return '<button data-go="' + n[0] + '">' + navIcon(n[2]) + '<span>' + n[1] + '</span></button>'; }).join('') +
    '<button data-menu>' + navIcon('menu') + '<span>選單</span></button></nav>';
}
// 點點月刊目前是第幾期：每月出新一期時改這一行
var JOURNAL_ISSUE = '12 月號';
// 底部列圖示：AI 統一風格（米色去背 PNG），沒有對應圖時用原本的線條
var NAV_IMG = { home: 'nav_home', brush: 'nav_course', store: 'nav_store', menu: 'nav_menu' };
function navIcon(k) { return NAV_IMG[k] ? '<img class="nav-ic" src="img_icons/' + NAV_IMG[k] + '.png?v=4" alt="">' : ICONS[k]; }
// 選單下方的社群連結：[名稱, 網址, 圖示]。要加 Facebook、Threads 就照格式多一行
var SOCIAL = [
  ['Instagram', 'https://www.instagram.com/imikdots', '<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>'],
  ['LINE 官方帳號', 'https://lin.ee/5rqtuQw', '<b>LINE</b>']
];
function drawer() {
  // [連到哪, 英文小字, 名稱, 是否子項目, 即將推出]
  var it = [['home', 'HOME', '首頁'], ['about', 'ABOUT', '關於 Kimi'], ['works', 'JOURNAL', '點點月刊 <i>' + JOURNAL_ISSUE + '</i>'], ['shop', 'COURSES', '全部課程', 0, 0, 1],
    ['course:beginner', '', '初階班：零基礎入門' + stg('b'), 1], ['course:teacher', '', '兩日進階班：職人研修' + stg('t'), 1], ['course:teacher#coach', '', '開課陪跑計劃' + stg('c'), 1], ['', '', '主題課程', 1, 1],
    ['students', 'WORKS', '學生作品'], ['goods#art', 'ART', '原創畫作'], ['goods', 'SHOP', '商店'], ['faq', 'Q&A', '常見問題'], ['contact', 'CONTACT', '聯繫我']];
  return '<div class="dbg" data-close></div><aside class="drw"><div class="drw-h"><span>MENU</span><button data-close aria-label="關閉">×</button></div>' +
    it.map(function (x, n) {
      var prevSub = n > 0 && it[n - 1][3], nextSub = it[n + 1] && it[n + 1][3], h = '';
      if (x[3]) {
        h = '<button class="drw-i sub' + (x[4] ? ' soon' : '') + '" ' + (x[4] ? 'data-soon' : 'data-go="' + x[0] + '"') + '>' + x[2] + (x[4] ? ' <i>即將推出</i>' : '') + '</button>';
        if (!nextSub) h += '</div></div>';
        return h;
      }
      // 有子項目的（全部課程）：預設收起，點了展開
      if (x[5]) return '<div class="drw-i drw-acc"><button class="drw-acc-t" data-go="' + x[0] + '">' + x[2] + '</button><button class="drw-acc-c" data-acc aria-expanded="false" aria-label="展開子項目"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button></div><div class="drw-sub"><div>';
      return '<button class="drw-i" data-go="' + x[0] + '"><small>' + x[1] + '</small>' + x[2] + '</button>';
    }).join('') +
    '<div class="drw-soc">' + SOCIAL.map(function (s) { return '<a href="' + s[1] + '" target="_blank" rel="noopener" aria-label="' + s[0] + '">' + s[2] + '</a>'; }).join('') + '</div>' +
    '</aside><div class="toast" id="toast"></div>';
}
function toast(m) { var t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 2000); }

// ---- 頁面切換 ----
function go(p, fromPop) {
  var y0 = pageYOffset; // 換頁前先記住目前捲到哪（頁面一切換位置就會歸零）
  var anc = p.split('#')[1]; p = p.split('#')[0];
  var parts = p.split(':'); var page = parts[0];
  if (page === 'course') { S.k = parts[1] || S.k; S.city = null; S.sess = null; renderCourse(); }
  if (page === 'cart') renderCart();
  S.page = page;
  document.querySelectorAll('.pg').forEach(function (x) { x.classList.toggle('on', x.dataset.pg === page); });
  document.querySelectorAll('.nav [data-go]').forEach(function (b) { b.classList.toggle('on', b.dataset.go === (page === 'course' ? 'shop' : page)); });
  document.body.classList.remove('dopen');
  // 每換一頁就記一筆瀏覽紀錄：手機從螢幕左邊往右滑＝上一頁、右邊往左滑＝下一頁（瀏覽器內建手勢）
  if (!fromPop && location.hash.slice(1) !== p) {
    try { history.replaceState({ y: y0 }, '', location.hash || '#home'); history.pushState({ y: 0 }, '', '#' + p); } catch (e) {}
  }
  window.scrollTo(0, 0);
  var vp = page === 'course' ? 'course/' + S.k : page;
  if (window._lastVp !== vp) { window._lastVp = vp; trk('page_view', { page_title: (PG_NAME[page] || page) + (page === 'course' ? '｜' + S.k : ''), page_location: location.origin + location.pathname + '#' + vp }); }
  if (page === 'cart') trk('begin_checkout', {});
  if (anc === 'coach') { setTimeout(coachOpen, 80); anc = null; }
  if (anc) setTimeout(function () { var el = document.getElementById(anc); if (el && window.bookTo && window.bookTo(el)) return; if (el) window.scrollTo({ top: el.getBoundingClientRect().top + pageYOffset - 70, behavior: 'smooth' }); }, 50);
}

// ---- 課程詳情 ----
function sessionsFor(k) {
  if (k === 'online') return [];
  return upcoming(SESSIONS[k] || []).filter(function (s) { return !isPrivate(s); });
}
function renderCourse() {
  var c = C(S.k), host = document.querySelector('[data-pg="course"]'); if (!host) return;
  host.querySelectorAll('[data-f]').forEach(function (e) { var v = c[e.dataset.f]; if (v != null) e.textContent = v; });
  host.querySelectorAll('[data-img]').forEach(function (e) { e.src = S.k === 'teacher' ? 'img_banner/teacher-43.jpg' : S.k === 'online' ? IMG + 'img/work5.jpg' : 'img_banner/beginner-43.jpg'; /* 2026-11-27 Kimi：課程主圖改 4:3 橫式，AI 擴圖不裁畫作 */ });
  host.querySelectorAll('[data-chips]').forEach(function (e) { e.innerHTML = (c.chips || ['在家上課', '材料包寄到家', '時間彈性']).map(function (x) { return '<span>' + x + '</span>'; }).join(''); });
  host.querySelectorAll('[data-perks]').forEach(function (e) { e.innerHTML = (c.perks || ['材料包寄到家', '視訊一對一帶畫', '時間報名後用 LINE 約']).slice(0, 4).map(function (x) { return '<li>' + x + '</li>'; }).join(''); });
  var en = host.querySelector('[data-en]'); if (en) en.textContent = { beginner: 'BEGINNER CLASS', teacher: 'ADVANCED CLASS', online: 'ONLINE CLASS' }[S.k] || '';
  var up = host.querySelector('[data-upn]'); if (up) { up.hidden = false; up.className = 'upn' + (S.k === 'teacher' ? ' big' : '');
    // 2026-11-26 Kimi：兩日進階班頁最上面放聳動標題，三種學生一行一句
    // 2026-11-26 Kimi：改成優惠券樣式，細節點「了解詳情」彈窗看
    up.innerHTML = S.k === 'teacher' ? '<div class="gft"><div class="gft-t"><small>BONUS・兩日進階班限定優惠</small><b>報兩日進階班，零基礎免費送</b></div><button data-cpn>了解詳情</button></div>'
      : '🌿 想一次學到好？<b>直接報名初階班＋兩日進階班，初階班免費送</b>　<button data-go="course:teacher">看兩日進階班</button><small>想先上上看也可以，上完初階班 2 週內報名兩日進階班，原價 <s>NT$26,800</s> 只要 NT$25,000</small>'; }
  // 2026-11-26 Kimi：初階／進階直接寫在班名前面，兩日進階班加「兩日」；線上併在零基礎班裡，標題一樣
  var h1 = host.querySelector('h1[data-f]'); if (h1) h1.innerHTML = S.k === 'teacher' ? stg('t') + '<span class="h1s">兩日進階班：</span>職人研修' : stg('b') + '<span class="h1s">初階班：</span>零基礎入門';
  var lh = host.querySelector('[data-lvh]'); if (lh) { lh.textContent = ''; lh.hidden = true; }
  var lv = host.querySelector('[data-lv]'); if (lv) lv.innerHTML = ''; // 2026-11-26 Kimi：課程頁先不放「看比較表」連結，比較表只在全部課程頁
  if (up) up.className = S.k === 'teacher' ? 'upn cpw' : 'upn upb';
  var cb = host.querySelector('[data-cpn]'); if (cb) cb.onclick = function (ev) { ev.stopPropagation(); cpnOpen(); };
  var dt = host.querySelector('[data-detail]'); if (dt) dt.innerHTML = detailHtml(S.k);
  renderPick();
}
// 課程詳細介紹：內容取自舊網站（data.js 的 COURSES）
// 初階班「關於課程」圖文版（2026-11-27 Kimi 參考 Hahow：緣起 → 痛點 → 特色 → 生活場景 → 課程資訊，照片穿插在文字裡）
// 文案依 品牌/我的品牌根系.md；不把曼陀羅說成心理治療。照片在 img_class/（素材/2026-11-27_課程照片相機質感/初階班，同編號）
// 2026-11-27 Kimi：橫幅改扁的（參考 Hahow），純色底＋點點紋，文字清楚，旁邊只放一小張圓形作品圖點綴
function bnr(n, en, zh, c) { return '<div class="bnr2 ' + (c || 'c1') + '"><div class="bt"><small>' + en + '</small><b>' + zh + '</b></div><span class="bi"><img src="img_class/' + n + '.jpg" alt="" loading="lazy"></span></div>'; }
function aboutBeginner(b, info, gets) {
  var ft = [
    ['b01', '零基礎也畫得出來', '從怎麼拿筆、怎麼沾顏料、點出第一個圓點開始，一步一步帶你畫。不用會素描，也不需要美術底子，上完課你會發現：原來我也可以。'],
    ['b11', '不是臨摹，是你自己的作品', '這堂課教的是點、線、配色與構圖的方法，不是照著一張圖抄。同一堂課，每個人畫出來都不一樣，因為那是你自己的作品。'],
    ['b16', '帶走工具，回家繼續畫', '附贈工具大禮包（價值 $680），講義、工具筆和 10 件材料都讓你帶回家。很多手作課上完就結束了，這堂課希望你下課以後，還能自己繼續畫。']
  ];
  return bnr('b09', 'Background', '課程緣起', 'c1') +
    '<h4 class="stt">從「我不會畫畫」開始</h4>' +
    '<p class="sp">我從小就被說不會畫畫、沒有創意。商管碩士畢業後進了廣告公司，後來創業做美業 8 年，每天都被工作追著跑。</p>' +
    '<p class="sp">直到在最焦慮、最低潮的時候遇見點點曼陀羅。一個點、一個點畫下去，心慢慢安靜下來，我才發現，原來可以把注意力放回當下。</p>' +
    '<p class="sp">一年內，我畫了超過 200 幅作品，也成為曼陀羅老師。所以我很確定：<b>零基礎，真的畫得出來。</b>現在，我想把這段安靜的時間帶給你。</p>' +
    '<p class="dk dkc ab">你是不是也這樣？</p>' + gets(BEGINNER_PAIN, 'pain') + '<blockquote class="pq">零基礎班要做的，<br>就是陪你留一段時間給自己，<br>畫出第一幅屬於你的作品。</blockquote>' +
    bnr('b11', 'Features', '課程特色', 'c2') +
    ft.map(function (f, i) { return '<div class="cft"><img src="img_class/' + f[0] + '.jpg" alt="" loading="lazy" data-zoom><h4 class="stt"><i>' + (i + 1) + '</i>' + f[1] + '</h4><p class="sp">' + f[2] + '</p></div>'; }).join('') +
    '<div class="kitb"><b>工具大禮包內容</b><span>' + b.kit.join('・') + '</span></div>' +
    bnr('b14', 'In Your Life', '把作品帶回生活', 'c3') +
    '<p class="sp">畫好的作品放在書桌、床頭或玄關，每天看到，都會想起那個只屬於自己的下午。也可以送給朋友，或畫在杯墊、石頭、蠟燭等不同材質上。</p>' +
    '<p class="sp">不用每天畫很久。每週留 30 分鐘給自己，畫畫就會慢慢變成生活裡的小儀式。</p>' +
    '<div class="pair2"><img src="img_class/b09.jpg" alt="" loading="lazy" data-zoom><img src="img_class/b12.jpg" alt="" loading="lazy" data-zoom></div>' +
    '<p class="dk dkc ab">課程資訊</p><ul class="rows">' + info.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul>';
}
// 兩日進階班「關於課程」圖文版（2026-11-27 Kimi，跟初階班同架構）。內容取自 COURSES.teacher 的單元／材料，照片 img_class/t01～t11
function aboutTeacher(b, info, gets, cmp) {
  var ft = [
    ['t05', '學會大幅構圖', '獨家找圓心方法，加上直尺、模具尺、量角器精準分割畫面，搭配繪畫轉盤與大圓規，從 15 公分的小卡片，一路畫到 30 公分的圓形畫布。'],
    ['t08', '多元材質與立體創作', '卡紙、木板、畫布、石膏、竹板，每種材質的打稿、底色和顏料附著方法都不一樣。課堂上會帶你畫立體石膏燭台，也學會用環氧樹脂保護作品。'],
    ['t06', '告別同心圓，構圖更有層次', '3 種筆刷構圖模板、5 種特殊構圖實作，再加上配色層次的練習，讓作品不再只是一圈一圈往外畫，而是有深度、有自己的風格。']
  ];
  return bnr('t09', 'Next Step', '為什麼要進階', 'c1') +
    '<h4 class="stt">從小卡片，到掛在牆上的作品</h4>' +
    '<p class="sp">很多同學上完零基礎後，會一直畫 15 公分的小卡片。越畫越熟，卻開始卡住：想畫大一點，不知道圓心怎麼找、畫面怎麼分割；構圖來來去去，總是同心圓。</p>' +
    '<p class="sp">我自己也走過這一段。一年內畫了超過 200 幅作品，從卡紙畫到木板、畫布和石頭，才慢慢整理出一套方法。</p>' +
    '<p class="sp">兩日進階班，就是把這套方法完整教給你。<b>兩天，陪你把作品一點一點畫得更美。</b></p>' +
    '<p class="dk dkc ab">你是不是也這樣？</p>' + gets(TEACHER_PAIN, 'pain') + '<blockquote class="pq">兩日進階班要做的，<br>就是陪你把作品，一點一點畫得更美。</blockquote>' +
    bnr('t10', 'Features', '課程特色', 'c2') +
    ft.map(function (f, i) { return '<div class="cft"><img src="img_class/' + f[0] + '.jpg" alt="" loading="lazy" data-zoom><h4 class="stt"><i>' + (i + 1) + '</i>' + f[1] + '</h4><p class="sp">' + f[2] + '</p></div>'; }).join('') +
    '<p class="dk dkc ab">跟一般繪畫課有什麼不同？</p>' + cmp +
    '<div class="kitb" style="margin-top:14px"><b>附贈材料</b><span>' + b.kit.join('・') + '</span></div>' +
    bnr('t11', 'In Your Life', '把作品帶回生活', 'c3') +
    '<p class="sp">兩天完成 4 件作品：15 公分厚木板、竹製杯墊、立體石膏燭台，還有一幅 30 公分含框的圓形畫布。掛在客廳或臥室，就是家裡最有溫度的一幅畫；燭台點上蠟燭，就是只屬於你的安靜角落。</p>' +
    '<p class="sp">想再往前走一步，學會的技法也能延伸到更多材質，慢慢發展出自己的作品。想開自己的課，可以再加購「開課陪跑計劃」。</p>' +
    '<div class="pair2"><img src="img_class/t02.jpg" alt="" loading="lazy" data-zoom><img src="img_class/t07.jpg" alt="" loading="lazy" data-zoom></div>' +
    '<p class="dk dkc ab">課程資訊</p><ul class="rows">' + info.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul>';
}
// 2026-11-27 Kimi：做成 LINE 對話框的樣子（變數叫 LINE_REVIEWS，不要叫 REVIEWS，那是 data.js 首頁評價用的）。[署名, LINE 上的日期, [一個泡泡一則訊息]]；原本分開傳的訊息就分開放；頭像用預設圖，不放學員照片
// 2026-11-27 Kimi：心得頭像改 Q 版小人（程式畫的，不是學員本人），4 種髮型
function chibi(t) {
  var bg = { long: '#F6DCCB', bun: '#DCE8D2', boy: '#D7E3F1', bob: '#F3E1EC' }[t] || '#EEE';
  var hair = { long: '#6B4A3A', bun: '#4A3A33', boy: '#3E3633', bob: '#2F2A2A' }[t];
  var back = t === 'long' ? '<path d="M8 22c0-9 5-14 12-14s12 5 12 14v12H8z" fill="' + hair + '"/>' : t === 'bob' ? '<path d="M8.5 22c0-8.5 5-13 11.5-13s11.5 4.5 11.5 13v6H8.5z" fill="' + hair + '"/>' : '';
  var top = t === 'bun' ? '<circle cx="20" cy="7.5" r="4.2" fill="' + hair + '"/><path d="M9 21c0-7 4.8-11 11-11s11 4 11 11c-3-3.5-7-5-11-5s-8 1.5-11 5z" fill="' + hair + '"/>'
    : t === 'boy' ? '<path d="M9 20c0-7 4.8-11 11-11s11 4 11 11c-1.5-2-3-3-4.5-3.5l-1 2-2-2.5-2 2.5-2-2.5-2 2.5-1.5-2.5C12 16.5 10.5 18 9 20z" fill="' + hair + '"/>'
    : '<path d="M9 21c0-7 4.8-11 11-11s11 4 11 11c-2.5-1-5-3.5-6-5.5-2 2.5-7.5 4.5-16 5.5z" fill="' + hair + '"/>';
  return '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="20" fill="' + bg + '"/>' + back +
    '<ellipse cx="20" cy="23" rx="10.5" ry="10" fill="#FFE6D3"/>' + top +
    '<ellipse cx="16" cy="24" rx="1.4" ry="1.8" fill="#3A2E2A"/><ellipse cx="24" cy="24" rx="1.4" ry="1.8" fill="#3A2E2A"/>' +
    '<circle cx="16.5" cy="23.4" r=".5" fill="#FFF"/><circle cx="24.5" cy="23.4" r=".5" fill="#FFF"/>' +
    '<ellipse cx="13.6" cy="27.3" rx="2" ry="1.2" fill="#F4A6A6" opacity=".6"/><ellipse cx="26.4" cy="27.3" rx="2" ry="1.2" fill="#F4A6A6" opacity=".6"/>' +
    '<path d="M18.3 28.2q1.7 1.4 3.4 0" stroke="#B5655A" stroke-width=".9" fill="none" stroke-linecap="round"/></svg>';
}
var LINE_REVIEWS = [
  // 2026-11-27 Kimi 提供截圖（10/31 台北班），Kimi 請我精簡：只節錄原句，沒有改寫
  ['台北・零基礎班學員', '10/31（六）', ['由衷感謝金老師的用心教導！', '在每一次的創作過程中，體驗到內心的平靜與美好。自在地探索色彩與線條，從中發現自己的創造力。', '遇見金老師，學習曼陀羅，真的是一件非常幸福的事！'], 'bun'],
  ['台中・零基礎班學員', '7/30（四）', ['昨天心情不是很好，為了靜心隨手畫了一幅，覺得好神奇，真的有被療癒到'], 'long'],
  ['台中・零基礎班學員', '9/23（三）', ['真的很療癒。', '未來你有新的作品或才藝，如果我有喜歡的，也會繼續和您學習。'], 'bun'],
  ['新竹・零基礎班學員', '10/19（一）', ['我回到家了，今天的體驗我很喜歡', '等我明天多畫幾張再傳給老師'], 'boy'],
  ['高雄・線上零基礎班學員', '11/1（日）', ['老師今天謝謝您', '很療癒'], 'bob'],
  // 舊版網站的學員評價（正式網站/data.js 的 REVIEWS，原文照搬）；日期與地區 2026-11-27 Kimi 更正
  ['台中・零基礎班學員', '10/12（一）', ['我才發現已經好久沒有把自己的時間排進生活裡了，原來陪伴自己可以這麼放鬆，完成之後又這麼有成就感！'], 'bob'],
  ['高雄・零基礎班學員', '8/22（六）', ['非常喜歡自己做的成品，沒想到我能這樣畫畫。我是容易緊張的人，沒想到整堂課開心又放鬆！'], 'long'],
  ['高雄・零基礎班學員', '8/22（六）', ['謝謝老師今天的療癒時光，我已經買了好多顏料準備要開始大畫特畫啦！'], 'bun'],
  ['台中・零基礎班學員', '5/16（六）', ['美麗的老師！療癒的課程。很放鬆，真的有療癒到我。'], 'long']
];
function detailHtml(k) {
  var b = COURSES[k === 'teacher' ? 'teacher' : 'beginner'], on = k === 'online';
  var info = b.info.map(function (r) { return [r[0], r[1].replace(/<a[^>]*>|<\/a>/g, '')]; });
  if (on) info = [['課程時長', '3 小時 30 分鐘（時間報名後用 LINE 約）'], ['上課方式', '在家視訊，老師一步步帶畫'], ['材料', '工具材料包寄到家（含運費）'], ['開班', '1 人就開班']].concat(info.filter(function (r) { return r[0] === '課程內容'; }));
  var cmp = b.compare.length === 1 ? '<p class="dp"><b>' + b.compare[0][0] + '：</b>' + b.compare[0][2] + '</p>' :
    '<div class="vtb"><div class="vtb-r vtb-h"><span></span><span>一般繪畫課</span><span>這堂課</span></div>' + b.compare.map(function (r) { return '<div class="vtb-r"><b>' + r[0] + '</b><span>' + r[1] + '</span><span>' + r[2] + '</span></div>'; }).join('') + '</div>';
  var n = 0, no = function () { n++; return (n < 10 ? '0' : '') + n + '　'; }, T = k === 'teacher';
  function gets(list, cls) { return '<ul class="gets' + (cls ? ' ' + cls : '') + '">' + list.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ul>'; }
  // 2026-11-27 Kimi（參考 Hahow，第二版）：拿掉 01～07 編號，分成四區
  // ① 關於課程：痛點、課程資訊、創作比較、工具大禮包一起收合（查看更多），之後照片也放這裡
  // ② 上課須知：一張卡片，誰適合／攜帶物品／注意事項，點了才展開
  // ③ 課程單元：一個主題一條，點了展開，可全部展開
  // ④ 常見問題（兩日進階班）
  function ir(t, body, open) { return '<div class="ir' + (open ? ' on' : '') + '"><button class="ir-h" data-ir>' + t + '<i></i></button><div class="ir-b">' + body + '</div></div>'; }
  var nItems = b.lessons.reduce(function (a, l) { return a + l[1].length; }, 0);
  var tabs = [['ds-about', '關於課程']].concat(T ? [] : [['ds-works', '學員作品']], [['ds-units', '課程單元'], ['ds-who', '上課須知']], T ? [['ds-qa', '常見問題']] : []);
  return '<nav class="dtab">' + tabs.map(function (x, i) { return '<button data-dtab="' + x[0] + '"' + (i ? '' : ' class="on"') + '>' + x[1] + '</button>'; }).join('') + '</nav>' +
    // 2026-11-27 Kimi：課堂紀錄相簿（素材/2026-11-27_課程照片相機質感，只挑沒拍到臉的、調成相機質感），左右滑、點了放大
    '<section class="ds clp" id="ds-about"><div class="clb">' + (T ? aboutTeacher(b, info, gets, cmp) : aboutBeginner(b, info, gets)) +
    '</div><button class="clm" data-clm>查看更多</button></section>' +
    // 2026-11-27 Kimi：學員作品牆（初階班／線上），先放 9 張，「看更多作品」展開到 18 張；照片 img_class/w01～w18（素材/2026-11-27_課程照片相機質感/學員作品牆）
    (T ? '' : '<section class="ds dcard" id="ds-works"><div class="uh"><b>學員作品</b><span>零基礎同學在課堂上完成的第一幅作品</span></div><div class="wall">' +
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(function (i) { return '<img src="img_class/w' + (i < 10 ? '0' : '') + i + '.jpg" alt="學員作品" loading="lazy" data-zoom>'; }).join('') +
      '</div><button class="clm" data-wall>看更多作品</button>' +
      // 2026-11-27 Kimi：學員心得（取自官方 LINE，Kimi 決定不具名：只留原話＋地區，名字頭像都不放；清單在 素材/學員心得/2026-11-27_官方LINE心得候選.md）
      '<div class="uh rv-h"><b>學員心得</b><span>來自 LINE 的真實回饋</span></div><div class="lchats">' + LINE_REVIEWS.map(function (r) { return '<div class="lcard"><div class="lhd"><i>‹</i><b>' + r[0] + '</b></div><div class="lbody">' + (r[1] ? '<span class="ldate">' + r[1] + '</span>' : '') + '<div class="lc"><span class="lav">' + chibi(r[3]) + '</span><div class="lcb">' + r[2].map(function (m, i) { return '<p class="lbub' + (i ? '' : ' t') + '">' + m + '</p>'; }).join('') + '</div></div></div></div>'; }).join('') + '</div><p class="cgal-n">左右滑動看更多 →</p></section>') +
    '<section class="ds dcard" id="ds-units"><div class="uh"><b>課程單元</b><span>' + b.lessons.length + ' 大主題・' + nItems + ' 個重點</span><button data-uall>全部展開</button></div>' +
      b.lessons.map(function (l, i) { return '<div class="un' + (i ? '' : ' on') + '"><button class="un-h lh" data-un><span>主題' + '一二三四五六七八'[i] + '</span>' + l[0] + '<i></i></button><ul class="dl un-b">' + l[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>'; }).join('') +
    '</section>' +
    '<section class="ds dcard" id="ds-who"><div class="icard">' +
      ir('誰適合這堂課？', '<ul class="dl">' + b.who.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>', 1) +
      ir('攜帶物品', '<p class="dp">' + (on ? '什麼都不用準備，材料包會寄到家！' : b.bring) + '</p>') +
      ir('注意事項', '<ol class="dl">' + NOTES.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ol>') +
      (T ? ir('報名條件', '<p class="dp">' + TEACHER_COND + '</p>') : '') +
    '</div></section>' +
    (T ? '<section class="ds dcard" id="ds-qa"><div class="uh"><b>常見問題</b></div><div class="qa">' + TEACHER_QA.map(function (q, i) { return '<details' + (i ? '' : ' open') + '><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div></section>' : '');
}
// 陪跑計劃獨立頁（2026-11-26 Kimi：不放在兩日進階班頁下面，點「看陪跑計劃內容」才打開）
function coachOpen() {
  var m = document.getElementById('cop');
  if (!m) {
    m = document.createElement('div'); m.id = 'cop'; m.className = 'cop'; document.body.appendChild(m);
    m.addEventListener('click', function (ev) {
      if (ev.target.closest('[data-copx]')) { ev.stopPropagation(); m.hidden = true; document.body.style.overflow = ''; }
      else if (ev.target.closest('[data-cplan]')) { ev.stopPropagation(); S.cPlan = ev.target.closest('[data-cplan]').dataset.cplan; copRender(); }
      else if (ev.target.closest('[data-cpick]')) { ev.stopPropagation(); toast('先選一個方案喔'); var px = m.querySelector('.cpx'); if (px) m.scrollTo({ top: px.offsetTop - 80, behavior: 'smooth' }); }
      else if (ev.target.closest('[data-copbuy]')) { ev.stopPropagation(); coachBuy(); }
      else if (ev.target.closest('[data-ccode]')) { ev.stopPropagation(); cUseCode(); }
      else if (ev.target.closest('[data-ccx]')) { ev.stopPropagation(); S.cCode = null; S.cCr = 0; copRender(); }
      else if (ev.target.closest('[data-copadd]')) { ev.stopPropagation(); S.tAdd = 1; m.hidden = true; document.body.style.overflow = ''; renderTOpt();
        var o = document.querySelector('[data-tadd]'); if (o) window.scrollTo({ top: o.getBoundingClientRect().top + pageYOffset - 120, behavior: 'smooth' }); }
    });
  }
  copRender();
  m.hidden = false; m.scrollTop = 0; document.body.style.overflow = 'hidden';
}
// 陪跑頁畫面（2026-11-27 Kimi：要跟其他課程頁一樣，一看就知道在「開課陪跑計劃」頁）
function copRender() {
  var m = document.getElementById('cop'); if (!m) return;
  var st = m.scrollTop, pay = EXTRA.coach.price - (S.cCr || 0), inT = S.k === 'teacher';
  m.innerHTML = '<div class="cop-hd"><button data-copx aria-label="返回">‹ 返回' + (inT ? '兩日進階班' : '') + '</button><span>開課陪跑計劃</span></div><div class="cop-bd">' + coachHtml() + '</div>' +
    '<div class="cop-ft stk2"><div><b>' + (S.cPlan === 'add' ? '+' + money(COACH.price) : money(pay)) + '</b><small>' + (S.cPlan === 'add' ? '加購價' : S.cCode ? '已用優惠碼' : '單買') + '</small></div>' +
    (S.cPlan === 'add' ? '<button class="btn" data-copadd>回兩日進階班一起報名</button>' : S.cPlan === 'single' ? '<button class="btn" data-copbuy>單買，加入購物車</button>' : '<button class="btn" data-cpick>選擇方案</button>') + '</div>';
  m.scrollTop = st;
  var ci = m.querySelector('#cCode'); if (ci) ci.onkeydown = function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); cUseCode(); } };
}
function cUseCode() {
  var el = document.getElementById('cCode'), msg = document.getElementById('cCodeMsg'), v = el ? el.value.trim() : '';
  if (!v) { if (msg) msg.textContent = '請輸入優惠碼'; return; }
  if (!window.sb) { if (msg) msg.textContent = '現在連不上，請稍後再試'; return; }
  if (msg) msg.textContent = '檢查中…';
  sb.rpc('check_promo', { p_code: v }).then(function (r) {
    var d = r.data || {};
    if (r.error || !d.ok) { if (msg) msg.textContent = d.msg || '優惠碼不正確'; return; }
    if ((d.course || (d.code === 'teacher' ? 'coach' : 'teacher')) !== 'coach') { if (msg) msg.textContent = '這個優惠碼不能用在陪跑計劃喔'; return; }
    S.cCode = d.code; S.cCr = Math.min(d.amount, EXTRA.coach.price); copRender();
  }).catch(function () { if (msg) msg.textContent = '現在連不上，請稍後再試'; });
}
function coachBuy() {
  if (S.cart.some(function (x) { return x.k === 'teacher' && x.addon; })) { toast('購物車裡的兩日進階班已經加購陪跑計劃了喔'); return; }
  S.cart = S.cart.filter(function (x) { return x.k !== 'coach'; });
  S.cart.push({ k: 'coach', s: { coach: 1 }, qty: 1, price: EXTRA.coach.price, credit: S.cCr || 0, code: S.cCode || null });
  var m = document.getElementById('cop'); if (m) m.hidden = true; document.body.style.overflow = '';
  updateCount(); toast('已加入購物車 🌿'); setTimeout(function () { go('cart'); }, 500);
}
function coachHtml() {
  var codeBox = S.cCode ? '<div class="tok">✓ 已套用優惠碼，折抵 ' + money(S.cCr || 0) + '<button data-ccx>取消</button></div>'
    : '<div class="tcode"><input id="cCode" placeholder="輸入優惠碼" autocomplete="off" autocapitalize="off"><button data-ccode>使用</button></div><p class="tcmsg" id="cCodeMsg"></p>';
  return '<div class="cc cop-cb"><small class="ey">TEACHING MENTORSHIP PROGRAM</small><h1 class="cop-h1">開課陪跑計劃</h1>' +
    '<p class="sub">3 個月一對一陪跑，從定位一路陪你走到第一堂課</p>' +
    '<div class="pr"><b>NT$16,800</b></div>' +
    '<div class="ck"><span>3 個月</span><span>一對一 4 次</span><span>教材授權</span><span>結業證書</span></div>' +
    '<p class="cc-lead">如果你想用這套教材開課，陪跑計劃會給你完整授權，還有我一路陪你走到開課。</p>' +
    '<p class="cc-h">01　選擇方案</p>' +
    '<div class="cpx"><button class="cpx-i' + (S.cPlan === 'add' ? ' on' : '') + '" data-cplan="add"><span class="cpx-r"></span><div class="cpx-t"><em class="pill">加購價・省 NT$3,800</em><b>跟兩日進階班一起報名</b><span>兩日進階班＋陪跑合計 NT$39,800</span></div><div class="cpx-p"><s>NT$16,800</s><b>+NT$13,000</b></div></button>' +
    '<button class="cpx-i' + (S.cPlan === 'single' ? ' on' : '') + '" data-cplan="single"><span class="cpx-r"></span><div class="cpx-t"><em>原價</em><b>單買陪跑計劃</b><span>上過其他老師的課，或覺得自己已經有能力，只想學怎麼開課，都可以單獨購買</span></div><div class="cpx-p"><b>NT$16,800</b></div></button></div>' +
    (S.cPlan === 'single' && COACH_CODE ? '<p class="tq">有優惠碼嗎？</p>' + codeBox : '') +

    '<p class="cc-h">02　適合這樣的你</p><ul class="cfor2">' + COACH_FOR.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
    '<p class="cc-h">03　陪跑計劃包含</p><ol class="cc-list">' + COACH_GETS.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ol>' +
    '<p class="cc-h">04　4 次一對一諮詢・每次 45 分鐘</p><ul class="cc-tl">' + COACH_STEPS.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ul>' +
    '<p class="cc-note">兩日進階班陪你把作品畫得更好；教材授權和開課陪伴，是陪跑計劃學員才有的。想開課的話，報名時勾選加購就可以 🌿</p></div>';
}
function renderPick() {
  var L = sessionsFor(S.k), cities = [];
  L.forEach(function (s) { if (cities.indexOf(s.location) < 0) cities.push(s.location); });
  if (!S.city || cities.indexOf(S.city) < 0) S.city = cities[0] || null;
  var ce = document.querySelector('[data-cities]'), de = document.querySelector('[data-dates]');
  if (!ce) return;
  // 線上課併在初階零基礎班裡（2026-11-26 Kimi）：地區多一顆「視訊線上課」，點了在同一頁切換實體／線上
  function swap(k, city) { S.k = k; S.city = city || null; S.sess = null; try { history.replaceState(null, '', '#course:' + k); } catch (e) {} renderCourse(); }
  if (S.k === 'online') {
    var bc = []; sessionsFor('beginner').forEach(function (s) { if (bc.indexOf(s.location) < 0) bc.push(s.location); });
    ce.innerHTML = bc.map(function (ct) { return '<button class="chip" data-bcity="' + ct + '">' + ct + '</button>'; }).join('') + '<span class="chip on">視訊線上課</span>';
    ce.querySelectorAll('[data-bcity]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); swap('beginner', btn.dataset.bcity); }; });
    de.innerHTML = '<p class="hint">材料包寄到家，報名後小幫手會用 LINE 跟你約上課時間</p>'; S.sess = ONLINE_FLEX; renderTOpt(); return; }
  ce.innerHTML = cities.length ? cities.map(function (ct) { return '<button class="chip' + (ct === S.city ? ' on' : '') + '" data-city="' + ct + '">' + ct + '</button>'; }).join('') : '<p class="hint">目前沒有公告場次，歡迎私訊官方 LINE 開班</p>';
  var ds = L.filter(function (s) { return s.location === S.city; }).slice(0, 12);
  de.innerHTML = ds.map(function (s, i) { var p = s.date.split('-'); return '<button class="dt' + (s.endDate ? ' dt2' : '') + (S.sess === s ? ' on' : '') + '" data-si="' + i + '">' + (s.endDate ? dt2Html(s) : '<small>' + (+p[1]) + '月</small><b>' + (+p[2]) + '</b><span>' + (S.k === 'teacher' ? '兩日' : slotEmo(s.time)) + '</span>') + '</button>'; }).join('');
  de._list = ds;
  // 2026-11-26 Kimi：兩日進階班場次少，格子旁補「這場的細節」，下面加「許願開班」
  var ow = de.parentNode && de.parentNode.querySelector('.wish'); if (ow) ow.remove();
  if (S.k === 'teacher') {
    var ss = S.sess || (ds.length === 1 ? ds[0] : null);
    if (ss && ds.length <= 2) {
      var wk = function (d) { var x = new Date(d + 'T00:00:00'); return '（' + '日一二三四五六'[x.getDay()] + '）'; }, q = ss.date.split('-');
      de.insertAdjacentHTML('beforeend', '<div class="dti"><b>' + (+q[1]) + '/' + (+q[2]) + wk(ss.date) + (ss.endDate ? '～' + (+ss.endDate.split('-')[1]) + '/' + (+ss.endDate.split('-')[2]) + wk(ss.endDate) : '') + '</b><span>09:00–17:00・' + ss.location + '</span><span>每梯限 6 人</span></div>');
    }
    de.insertAdjacentHTML('afterend', '<p class="wish">🌿 想在其他縣市上？滿 3 人就能開班，<a href="https://lin.ee/5rqtuQw" target="_blank" rel="noopener">私訊官方 LINE 許願開班 ›</a></p>');
  }
  if (S.k === 'beginner') { ce.insertAdjacentHTML('beforeend', '<button class="chip" data-gon>視訊線上課</button>'); ce.querySelector('[data-gon]').onclick = function (ev) { ev.stopPropagation(); swap('online'); }; }
  // 直接綁在每顆按鈕上（不靠整頁的點擊判斷），第一個場次也點得到
  ce.querySelectorAll('[data-city]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); S.city = btn.dataset.city; S.sess = null; renderPick(); }; });
  de.querySelectorAll('[data-si]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); S.sess = ds[+btn.dataset.si]; renderPick(); trk('select_session', { course: S.k, city: S.city }); }; });
  renderTOpt();
}
// 兩日進階班「零基礎在哪上」：登入會員自動查折抵（2026-11-25 Kimi 定案）
// 查到 2 週內上過 Kimi 的零基礎 → 自動折抵；查到但超過 2 週 → 不折；查不到 → 只顯示其他老師／一起報
// 舊生優惠碼 stu1800（2026-11-27 取代 kimi3500）：登入會員、限用一次、折 1,800，由資料庫 check_promo() 檢查（會員系統/6_研修班零基礎折抵.sql）
function tBaseHtml(ob) {
  S.tCodeHtml = ''; // 優惠碼框放在總金額上面（2026-11-26 Kimi），這裡只決定要不要顯示
  var uid = window.MEM && MEM.user ? MEM.user.id : null;
  if (S.bcU !== uid) { S.bcU = uid; S.bc = null; if (S.tBase === 'kimi') { S.tBase = null; S.tCr = null; S.tCode = null; } if (uid) tLoadBC(); }
  var codeBox = S.tCode ? '<div class="tok">✓ 已套用優惠碼，折抵 ' + money(S.tCr || 0) + '<button data-tcx>取消</button></div>'
    : '<div class="tcode"><input id="tCode" placeholder="輸入優惠碼" autocomplete="off" autocapitalize="off"><button data-tcode>使用</button></div><p class="tcmsg" id="tCodeMsg"></p>';
  var line = '<a href="https://lin.ee/5rqtuQw" target="_blank" rel="noopener">私訊官方 LINE</a>';
  // 選了「其他老師」才在選項正下方展開說明，左邊一條線（2026-11-26 Kimi）
  var oNote = S.tBase === 'other' ? '<p class="tsub">贈送一堂「線上零基礎回訓」<br>材料自備，課前會提供材料清單<br>報名後小幫手會用 LINE 跟你約時間 🌿</p>' : '';
  if (!uid) return '<div class="tchk"><p>上過 Kimi 的零基礎班？<br>登入會員，系統會自動幫你查學費折抵 🌿</p><button class="btn ghost" data-login>登入／加入會員</button></div>' +
    ob('base', 'other', S.tBase === 'other', '已報名其他老師的零基礎班', '送一堂線上零基礎回訓') + oNote + ob('base', 'none', S.tBase === 'none', '還沒上過，想一起報', '零基礎＋兩日進階班一起報，零基礎免費');
  if (!S.bc) return '<p class="hint">正在查你的零基礎紀錄…</p>';
  var b = S.bc, d = b.date ? (+b.date.split('-')[1]) + '/' + (+b.date.split('-')[2]) : '';
  if (b.found) {
    S.tBase = 'kimi';
    if (b.credit) { S.tCr = b.credit; S.tCode = null; return '<div class="tok">✓ 查到你 ' + d + ' 在' + b.location + '上過 Kimi 的零基礎班，兩日進階班只要 ' + money(COURSES.teacher.price - b.credit) + '</div>'; }
    if (!S.tCode) S.tCr = 0;
    S.tCodeHtml = '<p class="tq">有優惠碼嗎？</p>' + codeBox;
    return '<div class="tok off">查到你 ' + d + ' 在' + b.location + '上過 Kimi 的零基礎班' + (b.used ? '，這堂已經折抵過兩日進階班了' : '，已經超過 2 週，這次沒有自動折抵') + '。</div>';
  }
  S.tCodeHtml = '<p class="tq">有優惠碼嗎？</p>' + codeBox + (S.tCode ? '' : '<p class="tch">有任何疑問，可以直接' + line + '，Kimi 會親自回覆 🌿</p>');
  return S.tCode ? '<div class="tok">✓ 已套用優惠碼，折 ' + money(S.tCr || 0) + '</div>' : ob('base', 'other', S.tBase === 'other', '已報名其他老師的零基礎班', '送一堂線上零基礎回訓') + oNote + ob('base', 'none', S.tBase === 'none', '還沒上過，想一起報', '零基礎＋兩日進階班一起報，零基礎免費');
}
function tLoadBC() {
  var uid = S.bcU;
  if (!window.sb) { S.bc = { login: true, found: false }; return; }
  sb.rpc('my_beginner_credit').then(function (r) { if (S.bcU !== uid) return; S.bc = r.error || !r.data ? { login: true, found: false } : r.data; renderTOpt(); })
    .catch(function () { if (S.bcU !== uid) return; S.bc = { login: true, found: false }; renderTOpt(); });
}
function tUseCode() {
  var el = document.getElementById('tCode'), msg = document.getElementById('tCodeMsg'), v = el ? el.value.trim() : '';
  if (!v) { if (msg) msg.textContent = '請輸入優惠碼'; return; }
  if (!window.sb) { if (msg) msg.textContent = '現在連不上，請稍後再試'; return; }
  if (msg) msg.textContent = '檢查中…';
  sb.rpc('check_promo', { p_code: v }).then(function (r) {
    var d = r.data || {};
    if (r.error || !d.ok) { if (msg) msg.textContent = d.msg || '優惠碼不正確'; return; }
    if ((d.course || (d.code === 'teacher' ? 'coach' : 'teacher')) !== 'teacher') { if (msg) msg.textContent = '這個優惠碼是陪跑計劃用的，請到陪跑計劃頁使用'; return; }
    S.tCode = d.code; S.tCr = d.amount; S.tBase = 'kimi'; S.fSess = null; renderTOpt();
  }).catch(function () { if (msg) msg.textContent = '現在連不上，請稍後再試'; });
}
// 兩日進階班報名選項：加購陪跑、零基礎在哪上（一起報的話再選一堂免費零基礎）
function renderTOpt() {
  var h = document.querySelector('[data-topt]'); if (!h) return;
  // 2026-11-26 Kimi：零基礎／線上頁不在報名時推兩日進階班（參考國外賣課網站：大方案不塞在結帳），改到報名完成頁＋上完課的 LINE 追蹤；renderUpsell 先留著備用
  if (S.k !== 'teacher') {
    // 2026-11-27 Kimi：初階班加「03 選擇人數」，兩人以上同行每人 3,333（線上課本來就是 3,333）
    S.uAdd = null; if (S.bqK !== S.k) { S.bqK = S.k; S.bq = 1; }
    var on = S.k === 'online' || (S.sess && S.sess.flex), unit = on || S.bq >= 2 ? 3333 : C(S.k).price;
    h.innerHTML = '<p class="lbl">03　選擇人數</p><div class="pq2"><button data-pq="-1" aria-label="少一位"' + (S.bq <= 1 ? ' disabled' : '') + '><svg viewBox="0 0 24 24"><path d="M6 12h12"/></svg></button><b>' + S.bq + ' 人</b><button data-pq="1" aria-label="多一位"' + (S.bq >= 4 ? ' disabled' : '') + '><svg viewBox="0 0 24 24"><path d="M6 12h12M12 6v12"/></svg></button>' +
      '<span>' + (on ? '線上課每人 NT$3,333' : S.bq >= 2 ? '同行優惠：每人 NT$3,333' : '兩人以上同行，每人 NT$3,333') + '</span></div>' +
      (S.bq >= 2 ? '<div class="tled"><p><span>' + C(S.k).short + ' × ' + S.bq + ' 人</span><span>' + money(unit) + ' / 人</span></p><p class="tot"><span>合計</span><b>' + money(unit * S.bq) + '</b></p></div>' : '');
    h.querySelectorAll('[data-pq]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.bq = Math.max(1, Math.min(4, S.bq + (+b.dataset.pq))); renderTOpt(); }; });
    document.querySelectorAll('[data-pg="course"] .stk b').forEach(function (e) { e.textContent = money(unit * S.bq); });
    document.querySelectorAll('[data-pg="course"] .stk small').forEach(function (e) { e.textContent = S.bq >= 2 ? '／' + S.bq + ' 人' : '／人'; });
    return;
  }
  document.querySelectorAll('[data-pg="course"] .stk small').forEach(function (e) { e.textContent = '／人'; });
  function ob(a, v, on, t, sm) { return '<button class="box ob' + (on ? ' on' : '') + '" data-to="' + a + '" data-v="' + v + '"><span class="ob-t"><em>' + t + '</em>' + (sm ? '<small>' + sm + '</small>' : '') + '</span><span class="r"></span></button>'; }
  // 順序（2026-11-26 Kimi）：先問零基礎 → 一起報的選免費場次 → 最後才問加購陪跑
  var bh = tBaseHtml(ob), found = window.MEM && MEM.user && S.bc && S.bc.found;
  var html = '<p class="lbl">03　' + (found ? '你的零基礎' : '你上過零基礎嗎？') + '</p>' + bh, n = 4;
  if (S.tBase === 'none') html += '<p class="lbl">0' + (n++) + '　選一堂零基礎場次（免費）</p><div class="chips" data-fcities></div><div class="dates" data-fdates></div><p class="tnote">先上完零基礎，再來上兩日進階班 🌿</p>';
  // 2026-11-26 Kimi：陪跑不給「先上兩日進階班就好」選項，改成勾選加購；內容放獨立頁（coachOpen）
  if (S.tAdd == null) S.tAdd = 0;
  html += '<p class="lbl">0' + n + '　是否加購「開課陪跑計劃」</p>' +
    '<button class="box ad' + (S.tAdd ? ' on' : '') + '" data-tadd><span class="ad-t"><small>想開自己的課？一起加購</small><b>+NT$13,000</b><em>兩日進階班＋陪跑合計 NT$39,800</em></span><span class="ad-c"></span></button>' +
    '<button class="adl" data-coach>看陪跑計劃內容 ›</button>';
  var cr = S.tBase === 'kimi' ? (S.tCr || 0) : 0, tot = COURSES.teacher.price + (S.tAdd ? COACH.price : 0) - cr;
  if (S.tCodeHtml) html += '<div class="tcwrap">' + S.tCodeHtml + '</div>';
  // 2026-11-27 Kimi：像會計帳一樣一行一項，最後合計
  html += '<div class="tled"><p><span>兩日進階班：職人研修</span><span>' + money(COURSES.teacher.price) + '</span></p>' +
    (S.tAdd ? '<p><span>加購開課陪跑計劃</span><span>+' + money(COACH.price) + '</span></p>' : '') +
    (S.tBase === 'none' ? '<p><span>初階班：零基礎入門（一起報）</span><span><s>' + money(C('beginner').price) + '</s> 免費</span></p>' : '') +
    (cr ? '<p><span>上過零基礎・升級折抵</span><span>−' + money(cr) + '</span></p>' : '') +
    '<p class="tot"><span>合計</span><b>' + money(tot) + '</b></p></div>';
  h.innerHTML = html;
  document.querySelectorAll('[data-pg="course"] .stk b').forEach(function (e) { e.textContent = money(tot); });
  var ta = h.querySelector('[data-tadd]'); if (ta) ta.onclick = function (ev) { ev.stopPropagation(); S.tAdd = S.tAdd ? 0 : 1; renderTOpt(); };
  var tl = h.querySelector('[data-coach]'); if (tl) tl.onclick = function (ev) { ev.stopPropagation(); coachOpen(); };
  h.querySelectorAll('[data-to]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); var a = b.dataset.to, v = b.dataset.v;
    if (a === 'add') S.tAdd = +v; else { S.tBase = v; S.tCr = null; S.tCode = null; S.fSess = null; }
    renderTOpt(); }; });
  var cb = h.querySelector('[data-tcode]'); if (cb) cb.onclick = function (ev) { ev.stopPropagation(); tUseCode(); };
  var ci = h.querySelector('#tCode'); if (ci) ci.onkeydown = function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); tUseCode(); } };
  var cx = h.querySelector('[data-tcx]'); if (cx) cx.onclick = function (ev) { ev.stopPropagation(); S.tCode = null; S.tCr = null; if (!(S.bc && S.bc.found)) S.tBase = null; renderTOpt(); };
  if (S.tBase !== 'none') return;
  // 免費零基礎：只列兩日進階班之前的場次，加上「線上・時間另約」
  var lim = S.sess && S.sess.date, L = sessionsFor('beginner').filter(function (s) { return !lim || s.date < lim; }), cs = [];
  L.forEach(function (s) { if (cs.indexOf(s.location) < 0) cs.push(s.location); }); cs.push('線上');
  if (!S.fCity || cs.indexOf(S.fCity) < 0 || (!S.fPick && S.fCity === '線上')) S.fCity = cs[0];
  var fc = h.querySelector('[data-fcities]'), fd = h.querySelector('[data-fdates]');
  fc.innerHTML = cs.map(function (c) { return '<button class="chip' + (c === S.fCity ? ' on' : '') + '" data-fc="' + c + '">' + c + '</button>'; }).join('');
  var ds = L.filter(function (s) { return s.location === S.fCity; }).slice(0, 12);
  if (S.fCity === '線上') { fd.innerHTML = '<p class="hint">報名後小幫手會用 LINE 跟你約上課時間</p>'; S.fSess = ONLINE_FLEX; }
  else fd.innerHTML = ds.map(function (s, i) { var p = s.date.split('-'); return '<button class="dt' + (S.fSess === s ? ' on' : '') + '" data-fi="' + i + '"><small>' + (+p[1]) + '月</small><b>' + (+p[2]) + '</b><span>' + slotName(s.time) + '</span></button>'; }).join('') || '<p class="hint">兩日進階班之前沒有公告場次，可以選「線上」，或私訊官方 LINE 約時間</p>';
  fc.querySelectorAll('[data-fc]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.fCity = b.dataset.fc; S.fPick = 1; S.fSess = null; renderTOpt(); }; });
  fd.querySelectorAll('[data-fi]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.fSess = ds[+b.dataset.fi]; renderTOpt(); }; });
}
// 零基礎班／線上課頁：加購兩日進階班，零基礎這堂免費（2026-11-26 Kimi）
function renderUpsell(h) {
  function ob(a, v, on, t, sm) { return '<button class="box ob' + (on ? ' on' : '') + '" data-uo="' + a + '" data-v="' + v + '"><span class="ob-t"><em>' + t + '</em>' + (sm ? '<small>' + sm + '</small>' : '') + '</span><span class="r"></span></button>'; }
  var tp = COURSES.teacher.price, html = '<p class="lbl">03　要不要加購兩日進階班？</p>' +
    ob('up', 1, S.uAdd === 1, '加購兩日進階班：職人研修', '這堂零基礎免費・只付兩日進階班 ' + money(tp)) +
    ob('up', 0, S.uAdd === 0, '先上零基礎就好', '上完 2 週內報兩日進階班，只要 NT$25,000');
  var base = C(S.k).price, tot = base;
  if (S.uAdd === 1) {
    html += '<p class="lbl">04　選兩日進階班場次</p><div class="chips" data-ucities></div><div class="dates" data-udates></div>' +
      '<p class="lbl">05　是否加購「開課陪跑計劃」</p>' +
      ob('add', 1, S.tAdd === 1, '一起加購開課陪跑計劃', '+NT$13,000・兩日進階班＋陪跑合計 NT$39,800') +
      ob('add', 0, S.tAdd === 0, '先上兩日進階班就好', '之後想開課，還是可以單買（NT$16,800）');
    tot = tp + (S.tAdd ? COACH.price : 0);
    html += '<div class="tsum"><span>零基礎 <s>' + money(base) + '</s> 免費＋兩日進階班 ' + money(tp) + (S.tAdd ? '＋陪跑 ' + money(COACH.price) : '') + '</span><b>' + money(tot) + '</b></div>';
  }
  h.innerHTML = html;
  document.querySelectorAll('[data-pg="course"] .stk b').forEach(function (e) { e.textContent = S.uAdd === 1 ? money(tot) : C(S.k).priceText; });
  h.querySelectorAll('[data-uo]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); if (b.dataset.uo === 'up') S.uAdd = +b.dataset.v; else S.tAdd = +b.dataset.v; renderTOpt(); }; });
  if (S.uAdd !== 1) return;
  var lim = S.sess && S.sess.date, L = sessionsFor('teacher').filter(function (s) { return !lim || s.date > lim; }), cs = [];
  L.forEach(function (s) { if (cs.indexOf(s.location) < 0) cs.push(s.location); });
  if (!S.uCity || cs.indexOf(S.uCity) < 0) S.uCity = cs[0];
  if (S.uSess && L.indexOf(S.uSess) < 0) S.uSess = null;
  var fc = h.querySelector('[data-ucities]'), fd = h.querySelector('[data-udates]');
  fc.innerHTML = cs.map(function (c) { return '<button class="chip' + (c === S.uCity ? ' on' : '') + '" data-uc="' + c + '">' + c + '</button>'; }).join('');
  var ds = L.filter(function (s) { return s.location === S.uCity; }).slice(0, 12);
  fd.innerHTML = ds.map(function (s, i) { var p = s.date.split('-'); return '<button class="dt' + (s.endDate ? ' dt2' : '') + (S.uSess === s ? ' on' : '') + '" data-ui="' + i + '">' + (s.endDate ? dt2Html(s) : '<small>' + (+p[1]) + '月</small><b>' + (+p[2]) + '</b><span>' + '兩日' + '</span>') + '</button>'; }).join('') ||
    '<p class="hint">零基礎之後目前沒有公告的兩日進階班場次，歡迎<a href="https://lin.ee/5rqtuQw" target="_blank" rel="noopener">私訊官方 LINE</a> 預約下一梯</p>';
  fc.querySelectorAll('[data-uc]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.uCity = b.dataset.uc; S.uSess = null; renderTOpt(); }; });
  fd.querySelectorAll('[data-ui]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.uSess = ds[+b.dataset.ui]; renderTOpt(); }; });
}
function addToCart() {
  if (!S.sess) { toast('先選地區和場次喔'); var p = document.querySelector('[data-cities]'); if (p) window.scrollTo({ top: p.getBoundingClientRect().top + pageYOffset - 140, behavior: 'smooth' }); return; }
  var c = C(S.k);
  if (S.k === 'teacher') {
    var miss = !S.tBase ? '先選一下你有沒有上過零基礎' :
      S.tBase === 'kimi' && S.tCr == null ? '正在查你的零基礎紀錄，請稍等一下' : S.tBase === 'none' && !S.fSess ? '選一堂免費的零基礎場次' :
      S.tAdd == null ? '要不要加購開課陪跑計劃，選一下喔' : '';
    if (miss) { toast(miss); var o = document.querySelector('[data-topt]'); if (o) window.scrollTo({ top: o.getBoundingClientRect().top + pageYOffset - 120, behavior: 'smooth' }); return; }
    S.cart = S.cart.filter(function (x) { return x.k !== 'teacher' && !x.free; });
    S.cart.push({ k: 'teacher', s: S.sess, qty: 1, price: c.price + (S.tAdd ? COACH.price : 0), addon: S.tAdd, base: S.tBase, credit: S.tBase === 'kimi' ? (S.tCr || 0) : 0, code: S.tBase === 'kimi' ? S.tCode || null : null });
    if (S.tBase === 'none') S.cart.push({ k: S.fSess.flex ? 'online' : 'beginner', s: S.fSess, qty: 1, price: 0, free: 1 });
  } else if (S.uAdd === 1) {
    // 加購兩日進階班：兩日進階班＋這堂零基礎（贈送 0 元），跟兩日進階班頁「還沒上過，想一起報」一樣
    var um = !S.uSess ? '選一下兩日進階班場次' : S.tAdd == null ? '要不要加購開課陪跑計劃，選一下喔' : '';
    if (um) { toast(um); var uo = document.querySelector('[data-topt]'); if (uo) window.scrollTo({ top: uo.getBoundingClientRect().top + pageYOffset - 120, behavior: 'smooth' }); return; }
    S.cart = S.cart.filter(function (x) { return x.k !== 'teacher' && !x.free && x.k !== S.k; });
    S.cart.push({ k: 'teacher', s: S.uSess, qty: 1, price: C('teacher').price + (S.tAdd ? COACH.price : 0), addon: S.tAdd, base: 'none', credit: 0, code: null });
    S.cart.push({ k: S.k, s: S.sess, qty: 1, price: 0, free: 1 });
  } else {
    S.cart = S.cart.filter(function (x) { return x.k !== S.k || x.free; });
    S.cart.push({ k: S.k, s: S.sess, qty: Math.max(1, Math.min(4, S.bq || 1)), price: c.price });
  }
  updateCount(); toast('已加入購物車 🌿'); setTimeout(function () { go('cart'); }, 500);
}
// 報名表、訂單上的兩日進階班註記：加購陪跑、零基礎在哪上、折抵金額
function tTag(x) {
  if (x.free) return '・兩日進階班贈送零基礎';
  if (x.k === 'coach') return '・單買陪跑' + (x.code ? '・優惠碼 ' + x.code + '（折 ' + x.credit + '）' : '');
  if (x.k !== 'teacher') return '';
  return (x.addon ? '・加購陪跑' : '') + (x.base ? '・' + BASE_NAME[x.base] + (x.credit ? '（折抵 ' + x.credit + '）' : '') : '') + (x.code ? '・優惠碼 ' + x.code : '');
}
var BASE_NAME = { kimi: '零基礎：Kimi 的零基礎班', other: '零基礎：其他老師（送線上回訓）', none: '零基礎：一起報' };
function updateCount() { var n = S.cart.reduce(function (a, x) { return a + x.qty; }, 0); document.querySelectorAll('.cnt').forEach(function (e) { e.textContent = n || ''; }); }

// ---- 報名結帳 ----
function renderCart() {
  var host = document.querySelector('[data-items]'); if (!host) return;
  var tpl = document.getElementById('tpl-item').innerHTML;
  var ck = host.closest('.ck2'); if (ck) ck.classList.toggle('empty', !S.cart.length);
  if (!S.cart.length) { var t0 = document.getElementById('ckTitle'); if (t0) t0.textContent = '購物車'; host.innerHTML = '<p class="ck-empty">購物車還是空的，去逛逛課程或商品吧 🌿</p><button class="btn full" data-go="shop">看課程</button><button class="btn full ghost" data-go="goods" style="margin-top:10px">逛商店</button>'; ckSave(); return; }
  host.innerHTML = S.cart.map(function (x, i) {
    if (x.prod) return tpl.replace(/{img}/g, x.img).replace(/{name}/g, x.prod.name).replace(/{meta}/g, x.opt).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
    var c = C(x.k);
    if (x.k === 'coach') return tpl.replace(/{img}/g, 'img_banner/teacher.jpg').replace(/{name}/g, c.short).replace(/{meta}/g, '單買・3 個月一對一陪跑' + (x.code ? '<br>優惠碼 ' + x.code + ' 折 ' + money(x.credit) : '')).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
    var meta = (x.s.flex ? '線上・時間另約' : x.s.location + '・' + dateLabel(x.s) + (x.k === 'teacher' ? '' : '・' + x.s.time)) +
      (x.k === 'teacher' ? (x.addon ? '<br>＋開課陪跑計劃' : '') + (x.base ? '<br>' + BASE_NAME[x.base] : '') : '') + (x.free ? '<br>兩日進階班贈送' : '');
    return tpl.replace(/{img}/g, (x.k === 'teacher' ? 'img_banner/teacher.jpg' : IMG + (x.k === 'online' ? 'img/work5.jpg' : 'img/mandala-beige.jpg')))
      .replace(/{name}/g, c.short + (x.free ? '（贈送）' : '')).replace(/{meta}/g, meta).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
  }).join('');
  // 兩日進階班、贈送的零基礎一次一位，不能改人數；贈送的零基礎跟著兩日進階班，不能單獨刪
  S.cart.forEach(function (x, i) { if (x.k !== 'teacher' && x.k !== 'coach' && !x.free) return; var el = host.children[i]; if (!el) return; var q = el.querySelector('.qty'); if (q) q.style.visibility = 'hidden'; if (x.free) { var d = el.querySelector('.del'); if (d) d.style.visibility = 'hidden'; } });
  var sub = S.cart.reduce(function (a, x) { return a + x.price * x.qty; }, 0);
  var cr = S.cart.reduce(function (a, x) { return a + (x.credit || 0); }, 0);
  document.querySelectorAll('[data-cr]').forEach(function (e) { e.textContent = '− ' + money(cr); });
  document.querySelectorAll('[data-crrow]').forEach(function (e) { e.style.display = cr ? '' : 'none'; });
  // 零基礎班兩人同行每人 3,333
  var off = S.cart.filter(function (x) { return x.k === 'beginner' && x.qty >= 2; }).reduce(function (a, x) { return a + (3500 - 3333) * x.qty; }, 0);
  document.querySelectorAll('[data-sub]').forEach(function (e) { e.textContent = money(sub); });
  document.querySelectorAll('[data-off]').forEach(function (e) { e.textContent = off ? '− ' + money(off) : '—'; });
  document.querySelectorAll('[data-offrow]').forEach(function (e) { e.style.display = off ? '' : 'none'; });
  var prodSum = S.cart.filter(function (x) { return x.prod; }).reduce(function (a, x) { return a + x.price * x.qty; }, 0);
  var hasP = prodSum > 0, hasC = S.cart.some(function (x) { return !x.prod; });
  var ship = hasP ? (prodSum >= 1500 ? 0 : 80) : 0;
  document.querySelectorAll('[data-ship]').forEach(function (e) { e.textContent = ship ? money(ship) : '免運'; });
  document.querySelectorAll('[data-shiprow],[data-shipform]').forEach(function (e) { e.style.display = hasP ? '' : 'none'; });
  // 會員首購折 100（聯名商品不算）
  var nonCollab = S.cart.filter(function (x) { return !(x.prod && x.prod.cat === 'collab'); }).reduce(function (a, x) { return a + x.price * x.qty; }, 0) - off - cr;
  var mOff = window.memOff ? memOff(nonCollab) : 0;
  // 兩人以上同行已享同行優惠，首購折 100 不併用（2026-11-25 Kimi 定案），會員的首購折留著下次用
  // 但同一張購物車有商品、畫作（聯名除外）時，首購折改折在商品上（Kimi：只是不能折課程）
  var grp = S.cart.some(function (x) { return !x.prod && !x.free && x.qty >= 2; }), wProd = 0;
  if (grp) { var pAmt = S.cart.filter(function (x) { return x.prod && x.prod.cat !== 'collab'; }).reduce(function (a, x) { return a + x.price * x.qty; }, 0); mOff = window.memOff ? memOff(pAmt) : 0; wProd = mOff > 0; }
  S.ckWProd = wProd;
  S.ckAmt = sub - off - cr + ship; S.ckMOff = mOff;
  document.querySelectorAll('[data-moff]').forEach(function (e) { e.textContent = '− ' + money(mOff); });
  document.querySelectorAll('[data-mrow]').forEach(function (e) { e.style.display = mOff ? '' : 'none'; });
  if (window.memCkBanner) memCkBanner();
  var mb = document.getElementById('ckMem'); if (grp && mb && window.MEM && !MEM.off && MEM.ready) mb.innerHTML = '<p class="mb-ok">🌿 兩人以上同行已享同行優惠，會員首購折 NT$100 不折課程' + (wProd ? '，已改折在這次購買的商品上' : MEM.user && MEM.welcome && MEM.welcome.eligible ? '，會幫你留著，買商品、畫作時可以用' : '') + '</p>';
  document.querySelectorAll('[data-total]').forEach(function (e) { e.textContent = money(sub - off - cr - mOff + ship); });
  var t = document.getElementById('ckTitle'); if (t) t.textContent = hasP && !hasC ? '購物車結帳' : hasP ? '報名與購物結帳' : '報名結帳';
  var b = document.getElementById('ckBtn'); if (b) b.textContent = hasP ? '確認付款 ' + money(sub - off - cr - mOff + ship) : '送出報名';
  document.querySelectorAll('[data-pay="card"]').forEach(function (e) { e.style.display = hasP ? '' : 'none'; });
  if (hasP && S.pay === 'transfer' && !S.payPicked) S.pay = 'card';
  document.querySelectorAll('[data-pay]').forEach(function (e) { e.classList.toggle('on', e.dataset.pay === S.pay); });
  var hasT = S.cart.some(function (x) { return x.k === 'teacher' || x.k === 'coach'; });
  document.querySelectorAll('[data-pay="installment"]').forEach(function (e) { e.style.display = hasT ? '' : 'none'; });
  renderComp(); renderCkPay(); ckSave();
}
// 兩人以上同行：每位同行者都要填姓名＋手機（2026-11-25 Kimi 定案，必填）
function cEsc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
function renderComp() {
  var box = document.querySelector('[data-compform]'); if (!box) return;
  var rows = '';
  S.cart.forEach(function (x, i) {
    if (x.prod || x.free || x.qty < 2) { if (x.comp) delete x.comp; return; }
    x.comp = (x.comp || []).slice(0, x.qty - 1); while (x.comp.length < x.qty - 1) x.comp.push({ n: '', p: '' });
    rows += '<p class="cpn-t">' + C(x.k).short + '・同行的同學（' + (x.qty - 1) + ' 位）</p>' + x.comp.map(function (c, j) {
      return '<div class="fm cpn-r"><input data-cmp="' + i + '-' + j + '-n" placeholder="同行者' + (x.qty > 2 ? ' ' + (j + 1) : '') + ' 姓名" value="' + cEsc(c.n) + '"><input data-cmp="' + i + '-' + j + '-p" type="tel" placeholder="同行者' + (x.qty > 2 ? ' ' + (j + 1) : '') + ' 手機號碼" value="' + cEsc(c.p) + '"></div>'; }).join('');
  });
  box.innerHTML = rows ? '<p class="lbl" style="margin-top:6px">Companions　同行者資料</p>' + rows +
    '<p class="cpn-n">🌿 每位同學的資料都要填，方便上課通知。</p>' : '';
}
function compList(x) { return (x.comp || []).map(function (c) { return { name: c.n.trim(), phone: c.p.replace(/\D/g, '') }; }); }
function compTag(x) { var l = compList(x); return l.length ? '・同行：' + l.map(function (c) { return c.name + ' ' + c.phone; }).join('、') : ''; }


// ---- 結帳頁：選了付款方式就先顯示匯款資訊／LINE Pay 條碼，付完才能送出 ----
function renderCkPay() {
  var box = document.getElementById('ckPay'), btn = document.getElementById('ckBtn'); if (!box) return;
  var hasC = S.cart.some(function (x) { return !x.prod; }), hasP = S.cart.some(function (x) { return x.prod; });
  var tot = (document.querySelector('[data-total]') || {}).textContent || '';
  if (btn && hasC && S.payPicked) btn.textContent = S.pay === 'transfer' ? '③ 已匯款，送出報名' : S.pay === 'linepay' ? '③ 已付款，送出報名' : hasP ? btn.textContent : '送出報名';
  var sel = document.querySelector('[data-pg="cart"] [data-pay="' + S.pay + '"]'); if (sel && S.payPicked && sel.nextElementSibling !== box) sel.after(box); // 資訊放在選中的付款方式正下方
  var key = hasC && S.payPicked ? S.pay + '|' + tot : '';
  if (box._key === key) return; box._key = key;
  box.hidden = true; box.innerHTML = '';
  if (!hasC || !S.payPicked) { if (btn && !hasP) btn.textContent = '送出報名'; return; }
  if (S.pay === 'transfer') {
    box.innerHTML = '<p class="pi-t">① 先匯款</p>' +
      '<div class="pi-row"><span>金額</span><b>' + tot + '</b></div>' +
      '<div class="pi-row"><span>銀行</span><b>' + PAYINFO.bank + '</b></div>' +
      '<div class="pi-row"><span>帳號</span><b id="piAcc">' + PAYINFO.account + '</b><button class="pi-cp" id="piCopy">複製</button></div>' +
      '<div class="pi-row"><span>戶名</span><b>' + PAYINFO.holder + '</b></div>' +
      '<p class="pi-t" style="margin-top:14px">② 匯完填帳號後五碼</p>' +
      '<div class="pi-l5"><input id="ckL5" inputmode="numeric" maxlength="5" placeholder="帳號後五碼" value="' + (S.l5 || '') + '"></div>' +
      '<p class="pi-n">去銀行 App 匯款再回來，填好的資料都會留著</p>';
    if (btn) btn.textContent = '③ 已匯款，送出報名';
  } else if (S.pay === 'linepay') {
    box.innerHTML = '<p class="pi-t">① 用 LINE Pay 付款　' + tot + '</p>' +
      '<img class="pi-qr" src="' + PAYINFO.linepayQR + '" alt="LINE Pay 收款條碼">' +
      '<p class="pi-n">用手機報名的話：長按條碼存到相簿，打開 LINE →「錢包」→「掃描」→ 右上角從相簿選這張圖</p>' +
      '<label class="pi-ck"><input type="checkbox" id="ckLp"' + (S.lp ? ' checked' : '') + '> ② 我已完成 LINE Pay 付款</label>';
    if (btn) btn.textContent = '③ 已付款，送出報名';
  } else { if (btn && !hasP) btn.textContent = '送出報名'; return; }
  box.hidden = false;
}
document.addEventListener('input', function (e) {
  if (e.target.id === 'ckL5') { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5); S.l5 = e.target.value; }
  if (/^su(Name|Phone|Line)$/.test(e.target.id)) S['f_' + e.target.id] = e.target.value;
  var cm = e.target.dataset && e.target.dataset.cmp; if (cm) { var q = cm.split('-'), it = S.cart[+q[0]]; if (it && it.comp && it.comp[+q[1]]) it.comp[+q[1]][q[2]] = e.target.value; }
  ckSave();
});
document.addEventListener('change', function (e) { if (e.target.id === 'ckLp') { S.lp = e.target.checked; ckSave(); } });

// ---- 切去銀行 App 再回來，報名清單和填好的資料不會消失（存在這支手機，1 天後清掉） ----
var CK_KEY = 'imk_checkout';
function ckSave() { try { localStorage.setItem(CK_KEY, JSON.stringify({ t: Date.now(), cart: S.cart, pay: S.pay, picked: S.payPicked, l5: S.l5, lp: S.lp, n: S.f_suName, p: S.f_suPhone, l: S.f_suLine })); } catch (e) {} }
function ckClear() { try { localStorage.removeItem(CK_KEY); } catch (e) {} S.lp = false; S.f_suName = S.f_suPhone = S.f_suLine = ''; ['suName', 'suPhone', 'suLine'].forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; }); }
(function () {
  try {
    var v = JSON.parse(localStorage.getItem(CK_KEY) || 'null');
    if (!v || Date.now() - v.t > 864e5) return;
    S.cart = (v.cart || []).filter(function (x) { return !x.demo; }); S.cart.forEach(function (x) { x.touched = 1; });
    S.pay = v.pay || S.pay; S.payPicked = v.picked; S.l5 = v.l5 || ''; S.lp = !!v.lp; S.f_suName = v.n || ''; S.f_suPhone = v.p || ''; S.f_suLine = v.l || '';
  } catch (e) {}
})();
document.addEventListener('DOMContentLoaded', function () {
  [['suName', 'f_suName'], ['suPhone', 'f_suPhone'], ['suLine', 'f_suLine']].forEach(function (a) { var el = document.getElementById(a[0]); if (el && S[a[1]]) el.value = S[a[1]]; });
  updateCount();
});

// ---- 報名完成頁（舊版，保留備用）：匯款資訊＋後五碼、LINE Pay 條碼 ----
function showPayInfo(pay, tot) {
  var box = document.getElementById('dnPay'), msg = document.getElementById('dnMsg');
  if (!box) return;
  box.hidden = true; box.innerHTML = '';
  if (pay === 'transfer') {
    msg.innerHTML = '請在 3 天內匯款，匯完在下面填帳號後五碼，<br>Kimi 對完帳會在官方 LINE 跟妳確認 🌿';
    box.innerHTML = '<p class="pi-t">匯款資訊</p>' +
      '<div class="pi-row"><span>金額</span><b>' + tot + '</b></div>' +
      '<div class="pi-row"><span>銀行</span><b>' + PAYINFO.bank + '</b></div>' +
      '<div class="pi-row"><span>帳號</span><b id="piAcc">' + PAYINFO.account + '</b><button class="pi-cp" id="piCopy">複製</button></div>' +
      '<div class="pi-row"><span>戶名</span><b>' + PAYINFO.holder + '</b></div>' +
      '<p class="pi-t" style="margin-top:14px">匯完填後五碼</p>' +
      '<div class="pi-l5"><input id="l5In" inputmode="numeric" maxlength="5" placeholder="帳號後五碼"><button class="btn" id="l5Btn">送出</button></div>' +
      '<p class="pi-n" id="l5Msg">也可以晚點再回來填，或直接在 LINE 告訴我們</p>';
    box.hidden = false;
  } else if (pay === 'linepay') {
    msg.innerHTML = '請用 LINE Pay 掃下面的條碼付款，<br>付完把「付款成功」畫面截圖傳到官方 LINE 🌿';
    box.innerHTML = '<p class="pi-t">LINE Pay 付款　' + tot + '</p>' +
      '<img class="pi-qr" src="' + PAYINFO.linepayQR + '" alt="LINE Pay 收款條碼" onerror="this.replaceWith(Object.assign(document.createElement(\'p\'),{className:\'pi-n\',textContent:\'（條碼圖片還沒放上來）\'}))">' +
      '<p class="pi-n">用手機報名的話：長按條碼存到相簿，打開 LINE →「錢包」→「掃描」→ 右上角從相簿選這張圖</p>';
    box.hidden = false;
  } else {
    msg.innerHTML = '我們已經收到妳的報名資料。<br>請加入官方 LINE，Kimi 會在 LINE 上跟妳確認場次與付款方式。';
  }
}
document.addEventListener('click', function (e) {
  if (e.target.id === 'piCopy') {
    var v = document.getElementById('piAcc').textContent.replace(/[^\d]/g, '');
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function () { toast('帳號已複製'); }, function () { toast('請長按帳號複製'); });
  }
  if (e.target.id === 'l5Btn') {
    var inp = document.getElementById('l5In'), v = (inp.value || '').trim(), b = e.target;
    if (!/^\d{5}$/.test(v)) { toast('後五碼是 5 個數字喔'); inp.focus(); return; }
    b.disabled = true; b.textContent = '送出中…';
    var who = S.lastSign || {};
    fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'last5', name: who.name || '', phone: who.phone || '', last5: v, submittedAt: new Date().toISOString() }) })
      .then(function () { trk('submit_last5', {}); document.querySelector('.pi-l5').innerHTML = '<p class="pi-ok">已收到後五碼 ' + v + '，對完帳會在 LINE 通知妳 ✓</p>'; document.getElementById('l5Msg').remove(); })
      .catch(function () { b.disabled = false; b.textContent = '送出'; toast('送出失敗，請直接在官方 LINE 告訴我們後五碼'); });
  }
});

// ---- 作品、評價 ----
function fillCommon() {
  document.querySelectorAll('[data-works]').forEach(function (e) {
    var n = +e.dataset.works || 9; if (n === 8) n = 9;
    e.innerHTML = [1, 6, 9, 2, 5, 7, 3, 4, 8].slice(0, n).map(function (i) { return '<img src="img_sq/gallery' + i + '.jpg" alt="學生作品" loading="lazy">'; }).join('');
  });
  document.querySelectorAll('[data-reviews]').forEach(function (e) {
    e.innerHTML = REVIEWS.slice(0, +e.dataset.reviews || 3).map(function (r) { return '<div class="rv"><div class="stars" aria-label="五星好評">★★★★★</div><p>' + r.text + '</p><small>— ' + r.who + '</small></div>'; }).join('');
  });
  document.querySelectorAll('img[data-src]').forEach(function (e) { e.src = IMG + e.dataset.src; });
  document.querySelectorAll('[data-icon]').forEach(function (e) { e.innerHTML = ICONS[e.dataset.icon]; });
}

// ---- 啟動 ----
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-top]').forEach(function (e) { e.outerHTML = (window.TOPBAR || topbar)(e.dataset.top === 'sub'); });
  document.querySelector('.app').insertAdjacentHTML('beforeend', navbar() + drawer());
  fillCommon();
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-go],[data-menu],[data-close],[data-login],[data-soon],[data-back],[data-city],[data-si],[data-add],[data-q],[data-del],[data-pay],[data-submit]');
    if (!t) return;
    if (t.tagName === 'A' && t.hasAttribute('data-login')) e.preventDefault();
    var d = t.dataset;
    if (d.go) go(d.go);
    else if ('menu' in d) document.body.classList.add('dopen');
    else if ('close' in d) document.body.classList.remove('dopen');
    else if ('login' in d) go('me');
    else if ('soon' in d) toast('即將推出，敬請期待');
    else if ('back' in d) go(S.page === 'course' ? 'shop' : 'home');
    else if (d.city) { S.city = d.city; S.sess = null; renderPick(); }
    else if (d.si != null) { S.sess = document.querySelector('[data-dates]')._list[+d.si]; renderPick(); trk('select_session', { course: S.k, city: S.city }); }
    else if ('add' in d) { addToCart(); trk('add_to_cart', { course: S.k }); }
    else if (d.q) { var x = S.cart[+d.i]; if (x.k === 'teacher' || x.k === 'coach' || x.free) return; x.qty = Math.max(1, Math.min(x.prod ? (x.prod.stock || 9) : 4, x.qty + (+d.q))); updateCount(); renderCart(); }
    else if (d.del) { var dx = S.cart.splice(+d.del, 1)[0]; if (dx && dx.k === 'teacher') S.cart = S.cart.filter(function (y) { return !y.free; }); updateCount(); renderCart(); }
    else if (d.pay) { S.pay = d.pay; S.payPicked = 1; renderCart(); trk('select_payment', { method: d.pay }); }
    else if ('submit' in d) {
      var courses = S.cart.filter(function (x) { return !x.prod; });
      if (courses.length) {
        var nm = (document.getElementById('suName').value || '').trim(), ph = (document.getElementById('suPhone').value || '').trim(), ln = (document.getElementById('suLine').value || '').trim();
        if (!nm || !ph || !ln) { toast('姓名、手機、LINE 名稱都要填寫喔'); document.getElementById('suName').focus(); return; }
        var badC = document.querySelector('[data-compform] input'), cOk = true;
        S.cart.forEach(function (x, i) { (x.comp || []).forEach(function (c, j) { if (!cOk) return; if (!c.n.trim()) { cOk = false; badC = document.querySelector('[data-cmp="' + i + '-' + j + '-n"]'); } else if (!/^09\d{8}$/.test(c.p.replace(/\D/g, ''))) { cOk = false; badC = document.querySelector('[data-cmp="' + i + '-' + j + '-p"]'); } }); });
        if (!cOk) { toast('請填好每位同行者的姓名和手機（09 開頭 10 碼）'); if (badC) { badC.focus(); badC.scrollIntoView({ block: 'center', behavior: 'smooth' }); } return; }
        if (!S.payPicked) { toast('請選擇付款方式'); return; }
        var PAYL = { transfer: '轉帳', linepay: 'LINE Pay 掃碼', installment: '中租分期', card: '信用卡' };
        var l5 = '';
        if (S.pay === 'transfer') { l5 = (document.getElementById('ckL5') || {}).value || ''; l5 = l5.trim(); if (!/^\d{5}$/.test(l5)) { toast('匯款完成後，請填帳號後五碼（5 個數字）'); var li = document.getElementById('ckL5'); if (li) { li.focus(); li.scrollIntoView({ block: 'center', behavior: 'smooth' }); } return; } }
        if (S.pay === 'linepay' && !(document.getElementById('ckLp') || {}).checked) { toast('LINE Pay 付款完成後，請勾選「我已完成付款」'); return; }
        var payNow = S.pay; S.lastSign = { name: nm, phone: ph };
        var btn = document.getElementById('ckBtn'); btn.disabled = true; btn.textContent = '送出中…';
        var useW = S.ckMOff > 0;
        var items = courses.map(function (x) { var s = x.s || {}; return { name: C(x.k).short + (x.free ? '（兩日進階班贈送）' : ''), detail: (x.k === 'coach' ? '開課陪跑計劃（單買・3 個月）' : s.flex ? '時間另約' : (s.location || '') + ' ' + dateLabel(s) + (s.time ? ' ' + s.time : '')) + '・' + x.qty + ' 人' + tTag(x) + compTag(x), companions: compList(x), k: x.k, qty: x.qty, price: x.price, sid: s.id || null, date: s.date || '', location: s.location || '', time: s.time || '' }; });
        var ord = null;
        function post(o) { return fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(o) }); }
        // 一筆一筆送，避免同時寫入同一列；轉帳的話每筆報名再補上後五碼
        (window.memPlace ? memPlace({ kind: 'course', items: items, amount: S.ckAmt, use_welcome: useW, pay_method: PAYL[S.pay] || S.pay, last5: l5, name: nm, phone: ph, line_name: ln }) : Promise.resolve(null)).then(function (r) { ord = r; }).then(function () {
        var tag = (ord && ord.discount ? '｜會員折' + ord.discount : '') + (ord && ord.order_no ? '｜' + ord.order_no : '');
        return courses.reduce(function (p, x, xi) {
          var s = x.s || {}, rng = s.endDate && s.endDate !== s.date;
          if (x.k === 'coach') s = { flex: 0, date: '', location: '線上', time: '' };
          var payload = { course: x.k === 'online' ? 'beginner' : x.k, session: x.k === 'coach' ? '開課陪跑計劃' : s.flex ? '時間另約' : rng ? s.date + '~' + s.endDate : s.date,
            dateLabel: x.k === 'coach' ? '開課陪跑計劃（單買・3 個月）' : s.flex ? '時間另約' : dateLabel(s), location: s.location || (x.k === 'online' ? '線上' : ''), time: s.time || '',
            name: nm, phone: ph, lineName: ln, partySize: x.qty + '人', paymentMethod: (PAYL[S.pay] || S.pay) + (payNow === 'linepay' ? '（已勾選付款完成）' : '') + tTag(x).replace(/・/g, '｜') + tag,
            fee: x.k === 'teacher' || x.k === 'coach' || x.free ? x.price * x.qty - (x.credit || 0) : undefined,
            companions: compTag(x).replace('・同行：', '') || undefined, submittedAt: new Date().toISOString(),
            enrollId: ord && ord.enrollments ? ord.enrollments[xi] || null : null };
          return p.then(function () { return post(payload); }).then(function () { if (l5) return post({ action: 'last5', name: nm, phone: ph, last5: l5, submittedAt: new Date().toISOString() }); });
        }, Promise.resolve()); }).then(function () {
          document.querySelector('[data-pg="done"] h1').textContent = '報名完成';
          document.getElementById('dnNo').textContent = nm + '，謝謝妳的報名 🌿' + (ord && ord.order_no ? '（編號 ' + ord.order_no + '）' : '');
          document.getElementById('dnMsg').innerHTML = payNow === 'transfer' ? '已收到妳的報名和匯款後五碼 <b>' + l5 + '</b>，<br>Kimi 對完帳會在官方 LINE 跟妳確認 🌿'
            : payNow === 'linepay' ? '已收到妳的報名，<br>請把 LINE Pay「付款成功」畫面截圖傳到官方 LINE，Kimi 確認後會回覆妳 🌿'
            : '我們已經收到妳的報名資料。<br>請加入官方 LINE，Kimi 會在 LINE 上跟妳確認分期付款方式。';
          document.getElementById('dnList').innerHTML = courses.map(function (x) { return '<div><span>' + C(x.k).short + (x.free ? '（贈送）' : x.addon ? '＋陪跑計劃' : '') + '　' + (x.k === 'coach' ? '3 個月陪跑' : x.s && x.s.date ? dateLabel(x.s) + ' ' + (x.s.time || '') : '時間另約') + '</span><span>' + x.qty + ' 人</span></div>'; }).join('') +
            (ord && ord.discount ? '<div><span>會員首購優惠</span><span>− ' + money(ord.discount) + '</span></div>' : '') + (ord ? '<div><span>實付</span><span>' + money(ord.total) + '</span></div>' : '');
          document.getElementById('dnLine').hidden = false;
          // 報名零基礎（沒報兩日進階班）→ 完成頁邀請下一步：兩日進階班
          var du = document.getElementById('dnUp'), isB = courses.some(function (x) { return (x.k === 'beginner' || x.k === 'online') && !x.free; }), hasT = courses.some(function (x) { return x.k === 'teacher'; });
          if (du) { du.hidden = !(isB && !hasT); du.innerHTML = '<small>NEXT STEP・進階</small><b>上完課，想把作品畫得更美？</b><p>上完零基礎 2 週內報名「兩日進階班：職人研修」，兩日進階班原價 <s>NT$26,800</s>，<b>只要 NT$25,000</b>。先好好享受這堂課，畫完再決定就好 🌿</p><button class="btn ghost full" data-go="course:teacher">看兩日進階班</button>'; }
          var dp = document.getElementById('dnPay'); if (dp) dp.hidden = true; var dn = document.getElementById('dnNote'); if (dn) dn.hidden = true;
          trk('sign_up', { method: payNow, courses: courses.length });
          S.cart = []; S.l5 = ''; S.payPicked = 0; ckClear(); updateCount(); go('done');
        }).catch(function () { toast('送出失敗，請稍後再試，或直接私訊官方 LINE 報名'); })
          .then(function () { btn.disabled = false; renderCart(); });
        return;
      }
      var no = 'IMK' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + String(Math.floor(Math.random() * 900) + 100);
      var tot = document.querySelector('[data-total]').textContent;
      document.getElementById('dnNo').textContent = '訂單編號 ' + no;
      document.getElementById('dnList').innerHTML = S.cart.map(function (x) { return '<div><span>' + (x.prod ? x.prod.name + '（' + x.opt + '）' : C(x.k).short) + ' × ' + x.qty + '</span><span>' + money(x.price * x.qty) + '</span></div>'; }).join('') + '<div><span>合計（含運）</span><span>' + tot + '</span></div>';
      var du2 = document.getElementById('dnUp'); if (du2) du2.hidden = true;
      S.cart = []; updateCount(); go('done');
    }
  });
  var h = location.hash.slice(1) || 'home';
  try { history.replaceState({ y: 0 }, '', '#' + h); } catch (e) {}
  go(h, true);
  // 滑回上一頁／下一頁時，切到那一頁並回到原本捲到的位置
  window.addEventListener('popstate', function (e) {
    go(location.hash.slice(1) || 'home', true);
    var y = e.state && e.state.y; if (y) setTimeout(function () { window.scrollTo(0, y); }, 30);
  });
  loadLiveSessions(function () { if (window.renderUpcoming) renderUpcoming(); if (S.page === 'course') renderPick(); if (S.page === 'cart') renderCart(); });
});

// 選單：全部課程預設收起，點一下展開／收起
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-acc]'); if (!t) return;
  var row = t.closest('.drw-acc') || t, open = row.classList.toggle('open'); t.setAttribute('aria-expanded', open);
});

// 場次改讀「imikdots 後台 → 排課」（2026-11-24）：直接讀資料庫，比較快；讀不到或後台還沒排課，才照舊讀 Google 試算表
(function () {
  var sheetLoad = window.loadLiveSessions;
  window.loadLiveSessions = function (cb) {
    if (typeof SB_URL === 'undefined' || !SB_URL || !SB_KEY) return sheetLoad(cb);
    var t = new Date(Date.now() - 864e5), from = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0') + '-' + String(t.getDate()).padStart(2, '0');
    fetch(SB_URL + '/rest/v1/sessions?select=id,course,date,end_date,time_start,time_end,location&status=eq.' + encodeURIComponent('開放') + '&date=gte.' + from + '&order=date,time_start',
      { headers: { apikey: SB_KEY } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (rows) {
        if (!Array.isArray(rows) || !rows.length) throw 0;
        var out = { beginner: [], teacher: [] };
        rows.forEach(function (r) {
          var o = { id: r.id, date: r.date, location: r.location, time: r.time_start + '－' + r.time_end };
          if (r.end_date && r.end_date !== r.date) o.endDate = r.end_date;
          (out[r.course] || out.beginner).push(o);
        });
        SESSIONS.beginner = out.beginner; SESSIONS.teacher = out.teacher;
        if (cb) cb();
      })
      .catch(function () { sheetLoad(cb); });
  };
})();

// 課程階段標誌：把頁面上 data-stg 的空格子填成 萌芽／綻放／成林（2026-11-26）
(function () {
  function fill() { [].forEach.call(document.querySelectorAll('i[data-stg]'), function (e) { var k = e.getAttribute('data-stg'); e.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + STG_SVG[k] + '</svg>' + STG_TXT[k]; e.removeAttribute('data-stg'); }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill); else fill();
})();


// 兩日場次格子：像兩個一般日期格接在一起「12月 23 週三 ～ 12月 24 週四」（2026-11-27 Kimi）
function dt2Html(s) {
  function one(d) { var p = d.split('-'), w = '日一二三四五六'[new Date(+p[0], +p[1] - 1, +p[2]).getDay()]; return '<em class="dd"><small>' + (+p[1]) + '月</small><b>' + (+p[2]) + '</b><span>週' + w + '</span></em>'; }
  return one(s.date) + '<i class="dsep">～</i>' + one(s.endDate);
}
// 早午晚班前面加 emoji：☀️ 早班、🍵 午班、🌙 晚班（2026-11-27 Kimi；不動正式網站 data.js 的 slotName）
function slotEmo(t) { var n = slotName(t); return ({ '早班': '☀️', '午班': '🍵', '晚班': '🌙' }[n] || '') + n; }
// 初階班不含下午茶了（2026-11-27 Kimi；不動正式網站 data.js）
(function () { var b = window.COURSES && COURSES.beginner; if (!b) return;
  if (b.chips) b.chips = b.chips.filter(function (x) { return x.indexOf('下午茶') < 0; });
  if (b.perks) b.perks = b.perks.filter(function (x) { return x.indexOf('含下午茶') < 0; }); })();
// 「三種課程怎麼選？」改成點了才彈出來的頁面（2026-11-27 Kimi：全部課程頁一進來只看到乾淨的課程）
(function () {
  function init() {
    var m = document.getElementById('cmpo'); if (!m) return;
    if (m.parentNode !== document.body) document.body.appendChild(m);
    function close() { m.hidden = true; document.body.style.overflow = ''; }
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cmpo]')) { m.hidden = false; m.scrollTop = 0; document.body.style.overflow = 'hidden'; return; }
      if (e.target.closest('[data-cmpx]')) { close(); return; }
      if (e.target.closest('#cmpo [data-go]')) close();
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

// 課程頁：分頁籤、展開／收合（2026-11-27 Kimi，參考 Hahow）
(function () {
  function dtOn(id) { document.querySelectorAll('.dtab button').forEach(function (b) { b.classList.toggle('on', b.dataset.dtab === id); }); }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest('[data-acc]'); if (a) { a.parentElement.classList.toggle('on'); return; }
    var r = ev.target.closest('[data-ir],[data-un]'); if (r) { r.parentElement.classList.toggle('on'); return; }
    var wl = ev.target.closest('[data-wall]'); if (wl) { var wg = wl.previousElementSibling; wg.classList.toggle('all'); wl.textContent = wg.classList.contains('all') ? '收起' : '看更多作品'; if (!wg.classList.contains('all')) wl.parentElement.scrollIntoView({ block: 'start' }); return; }
    var ua = ev.target.closest('[data-uall]'); if (ua) { var us = ua.closest('section').querySelectorAll('.un'), all = [].every.call(us, function (u) { return u.classList.contains('on'); }); us.forEach(function (u) { u.classList.toggle('on', !all); }); ua.textContent = all ? '全部展開' : '全部收起'; return; }
    var m = ev.target.closest('[data-clm]'); if (m) { var c = m.parentElement; c.classList.toggle('open'); m.textContent = c.classList.contains('open') ? '收起' : '查看更多'; if (!c.classList.contains('open')) c.scrollIntoView({ block: 'start' }); return; }
    var t = ev.target.closest('[data-dtab]'); if (t) {
      var sec = document.getElementById(t.dataset.dtab); if (!sec) return;
      if (sec.classList.contains('acc')) sec.classList.add('on');
      var nav = t.parentElement, y = sec.getBoundingClientRect().top + window.scrollY - 64 - nav.offsetHeight - 6;
      window.scrollTo({ top: y, behavior: 'smooth' }); dtOn(t.dataset.dtab);
    }
  });
  var tick = 0;
  window.addEventListener('scroll', function () {
    if (tick) return; tick = 1;
    requestAnimationFrame(function () {
      tick = 0; var nav = document.querySelector('[data-pg="course"]:not([hidden]) .dtab'); if (!nav || !nav.offsetParent) return;
      var lim = 64 + nav.offsetHeight + 20, cur = null;
      nav.querySelectorAll('[data-dtab]').forEach(function (b) { var e = document.getElementById(b.dataset.dtab); if (e && e.getBoundingClientRect().top <= lim) cur = b.dataset.dtab; });
      if (cur) dtOn(cur); else dtOn(nav.querySelector('[data-dtab]').dataset.dtab);
    });
  }, { passive: true });
})();

// 課程頁報名步驟標題（01 選擇地區…）：數字做成深綠圓圈、標題放大加深，主次比較清楚（2026-11-27 Kimi）
(function () {
  function fix(root) {
    root.querySelectorAll('.lbl:not(.stp)').forEach(function (p) {
      var m = p.textContent.match(/^0?(\d+)　(.*)$/); if (!m) return;
      p.classList.add('stp'); p.innerHTML = '<i>' + m[1] + '</i><span>' + p.innerHTML.replace(/^0?\d+　/, '') + '</span>';
    });
  }
  function start() {
    var pg = document.querySelector('[data-pg="course"]'); if (!pg) return;
    fix(pg); new MutationObserver(function () { fix(pg); }).observe(pg, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

// 課堂紀錄相簿：點照片放大（2026-11-27 Kimi）
document.addEventListener('click', function (ev) {
  var z = ev.target.closest('[data-zoom]');
  var bx = document.getElementById('zbox');
  if (z) { if (!bx) { bx = document.createElement('div'); bx.id = 'zbox'; bx.className = 'zbox'; bx.innerHTML = '<img alt="">'; document.body.appendChild(bx); bx.addEventListener('click', function () { bx.hidden = true; }); } bx.querySelector('img').src = z.src; bx.hidden = false; }
});

// 2026-11-27 Kimi 更正舊評價地區（首頁評價用 data.js 的 REVIEWS；只在新網站這裡改，不動正式網站 data.js）
(function () {
  if (typeof REVIEWS === 'undefined' || !REVIEWS.forEach) return;
  REVIEWS.forEach(function (r) {
    if (/^非常喜歡自己做的成品|^謝謝老師今天的療癒時光/.test(r.text)) r.who = '高雄 零基礎班同學';
    if (/^美麗的老師/.test(r.text)) r.who = '台中 零基礎班同學';
  });
})();
