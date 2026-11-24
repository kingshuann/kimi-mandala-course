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
// 研修班改版（2026-11-25 Kimi 定案）：「兩日師資班」改名「進階：創作職人研修班」，開課陪跑計劃改成加購
// 只改新網站：在這裡覆寫 data.js 的 COURSES.teacher，舊首頁不受影響
(function () {
  var t = window.COURSES && COURSES.teacher; if (!t) return;
  t.tag = '進階研修'; t.name = '點點曼陀羅・創作職人研修班'; t.short = '創作職人研修班';
  t.sub = '兩天學會進階技法與大幅構圖，畫出有質感的作品';
  t.orig = ''; t.badges = ['🌱 進階創作', '可分期'];
  t.chips = ['4 件作品', '材料全包', '每梯限 6 人', '終身問答'];
  t.info = [['課程時長', '兩日 09:00–17:00'], ['課程內容', '4 大主題・21 個單元'], ['課後成果', '4 件不同材質的作品'], ['附贈', '完整材料包＋獨家講義與練習本'], ['餐點', '含兩日午餐＋下午茶'], ['名額', '每梯限定 6 人'], ['報名條件', '上過「零基礎課程」<br>任何老師的零基礎班都可以']];
  t.perks = (t.perks || []).map(function (x) { return x.replace('師資社群', '學員社群'); });
  t.who = ['想一次完整學會進階技法', '想學會創作更大幅作品（如找圓心）', '想跳脫簡單構圖，讓作品更有層次', '想把畫畫得更美，做出有質感的作品', '不一定想當老師，喜歡畫畫就可以來', '單純喜歡 Kimi，想開心共度兩日'];
  t.compare = [['學習重點', '單一技法', '進階技法＋大幅構圖'], ['作品', '一堂一件小作品', '兩天完成 4 件不同材質作品'], ['材料', '要自己準備', '材料全包・顏料用到飽'], ['課後服務', '課程結束就結束', '終生問答服務']];
})();
var TEACHER_PAIN = [['畫了一陣子', '作品卻一直停在小卡片'], ['想畫大幅作品', '不知道怎麼找圓心、分割'], ['構圖總是同心圓', '想讓作品更有層次'], ['想試不同材質', '木板、畫布、石膏都想畫']];
// 零基礎優惠：三種學生
var BASE_DEALS = [
  ['上過 Kimi 的零基礎班', '上完 2 週內報名研修班，零基礎學費全額折抵'],
  ['完全沒上過零基礎', '零基礎＋研修班一起報，零基礎免費'],
  ['在其他老師那邊上過', '贈送一堂「線上零基礎回訓」（價值 NT$3,000）；材料自備，課前會提供材料清單']
];
// 加購：開課陪跑計劃（3 個月）
var COACH = { price: 13000, later: 15800 };
var COACH_FOR = ['想開課、想多一份斜槓收入', '已經是美業、瑜珈、身心靈、手作老師，想多一個課程項目'];
var COACH_GETS = [
  ['完整教材授權', '可以用 Kimi 的教材和教案開課；教材更新時，也會拿到更新檔'],
  ['師資專屬資料庫', '開課會用到的資料都整理在一起，隨時回來查'],
  ['線上教學課（錄播）', '怎麼帶一堂課、怎麼陪學生完成作品，隨時可以重看'],
  ['一對一線上諮詢 4 次', '每次 45 分鐘，從定位一路陪你走到開課'],
  ['開課計劃書批改', '繳交你的開課計劃書，由 Kimi 親自批改'],
  ['廠商資料', '材料、工具去哪裡買，直接給你清單'],
  ['師資結業證書', '陪跑計劃學員專屬']
];
var COACH_STEPS = [['第 1 週', '定位與目標：想教誰、在哪裡開、怎麼定價'], ['第 3～4 週', '開課計劃書修改、課程流程、材料準備'], ['第 2 個月', '招生與宣傳'], ['第 3 個月', '開課前最後確認，或第一堂課後檢討']];
var TEACHER_QA = [
  ['研修班一定要想當老師嗎？', '不用！研修班是給想把畫畫得更美、做出有質感大作品的人。想開課的話，再加購開課陪跑計劃就好。'],
  ['只上研修班，可以用學到的東西開課嗎？', '研修班是陪你把作品畫得更好，不包含教學授權。如果你想用這套教材開課，開課陪跑計劃會給你完整的教材授權，還有我一路陪你走到開課。'],
  ['上完研修班之後，還能加購陪跑計劃嗎？', '可以！上完研修班之後加購是 NT$15,800；報名研修班時一起加購是 NT$13,000，會比較划算。'],
  ['我在其他老師那邊上過零基礎，可以報研修班嗎？', '可以！不管你在哪裡學過零基礎，都歡迎來研修班。我們會贈送一堂「線上零基礎回訓」（價值 NT$3,000），材料自備，課前會提供材料清單，讓大家從同一個起點出發。'],
  ['完全沒學過可以直接報名嗎？', '可以！零基礎＋研修班一起報，零基礎免費。報名時順便選一堂零基礎場次，先上完零基礎，再來上研修班。'],
  ['陪跑學員拿到的教材可以修改嗎？', '可以依照你的風格調整，用在自己的課程裡；教材檔案僅限本人使用，請勿轉賣或分享給他人。'],
  ['開課的材料要去哪裡買？', '陪跑計劃附有廠商資料，可以照清單自己買，也可以直接跟 Kimi 購買。'],
  ['研修班可以分期嗎？', '可以，研修班提供中租分期，送出報名後小幫手會用 LINE 提供分期資訊。']
];
var TEACHER_COND = '報名條件：上過「零基礎課程」（任何老師的都可以）。還沒上過的話，可以零基礎＋研修班一起報，零基礎免費。';
var EXTRA = { online: { key: 'online', short: '線上課', name: '點點曼陀羅・線上課', sub: '材料包寄到家，在家視訊上課', price: 3333, priceText: 'NT$3,333', orig: 'NT$3,980', img: 'img/work5.jpg', tag: '在家上課', hours: '3 小時 30 分鐘' } };
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
    ['course:beginner', '', '零基礎班', 1], ['course:teacher', '', '創作職人研修班', 1], ['course:online', '', '線上課', 1], ['', '', '主題課程', 1, 1],
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
  host.querySelectorAll('[data-img]').forEach(function (e) { e.src = S.k === 'teacher' ? 'img_banner/teacher.jpg' : IMG + (S.k === 'online' ? 'img/work5.jpg' : 'img/mandala-beige.jpg'); });
  host.querySelectorAll('[data-chips]').forEach(function (e) { e.innerHTML = (c.chips || ['在家上課', '材料包寄到家', '時間彈性']).map(function (x) { return '<span>' + x + '</span>'; }).join(''); });
  host.querySelectorAll('[data-perks]').forEach(function (e) { e.innerHTML = (c.perks || ['材料包寄到家', '視訊一對一帶畫', '時間報名後用 LINE 約']).slice(0, 4).map(function (x) { return '<li>' + x + '</li>'; }).join(''); });
  var en = host.querySelector('[data-en]'); if (en) en.textContent = { beginner: 'BEGINNER CLASS', teacher: 'ADVANCED CLASS', online: 'ONLINE CLASS' }[S.k] || '';
  var up = host.querySelector('[data-upn]'); if (up) { up.hidden = S.k === 'teacher'; up.innerHTML = '🌿 上完零基礎班 2 週內報名進階「創作職人研修班」，零基礎學費全額折抵　<button data-go="course:teacher">看研修班</button>'; }
  var dt = host.querySelector('[data-detail]'); if (dt) dt.innerHTML = detailHtml(S.k);
  renderPick();
}
// 課程詳細介紹：內容取自舊網站（data.js 的 COURSES）
function detailHtml(k) {
  var b = COURSES[k === 'teacher' ? 'teacher' : 'beginner'], on = k === 'online';
  var info = b.info.map(function (r) { return [r[0], r[1].replace(/<a[^>]*>|<\/a>/g, '')]; });
  if (on) info = [['課程時長', '3 小時 30 分鐘（時間報名後用 LINE 約）'], ['上課方式', '在家視訊，老師一步步帶畫'], ['材料', '工具材料包寄到家（含運費）'], ['開班', '1 人就開班']].concat(info.filter(function (r) { return r[0] === '課程內容'; }));
  var cmp = b.compare.length === 1 ? '<p class="dp"><b>' + b.compare[0][0] + '：</b>' + b.compare[0][2] + '</p>' :
    '<div class="vtb"><div class="vtb-r vtb-h"><span></span><span>一般繪畫課</span><span>這堂課</span></div>' + b.compare.map(function (r) { return '<div class="vtb-r"><b>' + r[0] + '</b><span>' + r[1] + '</span><span>' + r[2] + '</span></div>'; }).join('') + '</div>';
  var n = 0, no = function () { n++; return (n < 10 ? '0' : '') + n + '　'; }, T = k === 'teacher';
  function gets(list, cls) { return '<ul class="gets' + (cls ? ' ' + cls : '') + '">' + list.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ul>'; }
  return (T ? '<section class="ds"><p class="dk">' + no() + '你是不是也這樣？</p>' + gets(TEACHER_PAIN, 'pain') + '<blockquote class="pq">研修班要做的，<br>就是陪你把作品，一點一點畫得更美。</blockquote></section>' : '') +
    '<section class="ds"><p class="dk">' + no() + '課程資訊</p><ul class="rows">' + info.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul></section>' +
    '<section class="ds"><p class="dk">' + no() + (T ? '不只學技法，更學會創作' : '並非臨摹，而是 0 到 1 獨立創作') + '</p>' + cmp + '</section>' +
    '<section class="ds"><p class="dk">' + no() + '課程內容</p>' + b.lessons.map(function (l, i) { return '<h4 class="lh"><span>主題' + '一二三四五六七八'[i] + '</span>' + l[0] + '</h4><ul class="dl">' + l[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }).join('') + '</section>' +
    '<section class="ds"><p class="dk">' + no() + (T ? '附贈材料' : '工具大禮包') + '</p><ul class="dl">' + b.kit.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><img class="fin" src="' + IMG + b.finalImg + '" alt="課程作品" loading="lazy"></section>' +
    (T ? '<section class="ds"><p class="dk">' + no() + '零基礎優惠</p>' + gets(BASE_DEALS, 'deal') + '<blockquote class="pq">不管你在哪裡學過零基礎，<br>都歡迎來研修班，<br>我們從同一個起點出發。</blockquote></section>' +
      '<section class="ds" id="coach"><p class="dk">' + no() + '加購：開課陪跑計劃</p>' + coachHtml() + '</section>' : '') +
    '<section class="ds"><p class="dk">' + no() + '誰適合這堂課？</p><ul class="dl">' + b.who.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></section>' +
    '<section class="ds"><p class="dk">' + no() + '報名須知</p><h4 class="lh">攜帶物品</h4><p class="dp">' + (on ? '什麼都不用準備，材料包會寄到家！' : b.bring) + '</p><h4 class="lh">注意事項</h4><ol class="dl">' + NOTES.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ol>' +
    (T ? '<p class="cond">🌿 ' + TEACHER_COND + '</p>' : '') + '</section>' +
    (T ? '<section class="ds"><p class="dk">' + no() + '研修班常見問題</p><div class="qa">' + TEACHER_QA.map(function (q, i) { return '<details' + (i ? '' : ' open') + '><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div></section>' : '');
}
// 研修班頁裡的「開課陪跑計劃」區塊（深綠卡片）
function coachHtml() {
  return '<div class="cc"><small class="cc-ey">OPTIONAL ・ 3 MONTHS</small>' +
    '<h3>想開自己的課？<br>我陪你走到第一堂課</h3>' +
    '<p class="cc-lead">如果你想用這套教材開課，陪跑計劃會給你完整授權，還有我一路陪你走到開課。</p>' +
    '<div class="cc-pr"><div><small>報名研修班時一起加購</small><b>+NT$13,000</b><span>研修班＋陪跑合計 NT$39,800</span></div><div><small>上完研修班之後加購</small><b>NT$15,800</b><span>私訊官方 LINE 加購</span></div></div>' +
    '<p class="cc-h">適合這樣的你</p><ul class="cc-for">' + COACH_FOR.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
    '<p class="cc-h">陪跑計劃包含</p><ol class="cc-list">' + COACH_GETS.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ol>' +
    '<p class="cc-h">4 次一對一諮詢・每次 45 分鐘</p><ul class="cc-tl">' + COACH_STEPS.map(function (g) { return '<li><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ul>' +
    '<p class="cc-note">研修班陪你把作品畫得更好；教材授權和開課陪伴，是陪跑計劃學員才有的。想開課的話，報名時勾選加購就可以 🌿</p></div>';
}
function renderPick() {
  var L = sessionsFor(S.k), cities = [];
  L.forEach(function (s) { if (cities.indexOf(s.location) < 0) cities.push(s.location); });
  if (!S.city || cities.indexOf(S.city) < 0) S.city = cities[0] || null;
  var ce = document.querySelector('[data-cities]'), de = document.querySelector('[data-dates]');
  if (!ce) return;
  if (S.k === 'online') { ce.innerHTML = '<span class="chip on">線上・時間另約</span>'; de.innerHTML = '<p class="hint">報名後小幫手會用 LINE 跟你約上課時間</p>'; S.sess = ONLINE_FLEX; return; }
  ce.innerHTML = cities.length ? cities.map(function (ct) { return '<button class="chip' + (ct === S.city ? ' on' : '') + '" data-city="' + ct + '">' + ct + '</button>'; }).join('') : '<p class="hint">目前沒有公告場次，歡迎私訊官方 LINE 開班</p>';
  var ds = L.filter(function (s) { return s.location === S.city; }).slice(0, 12);
  de.innerHTML = ds.map(function (s, i) { var p = s.date.split('-'); return '<button class="dt' + (S.sess === s ? ' on' : '') + '" data-si="' + i + '"><small>' + (+p[1]) + '月</small><b>' + (+p[2]) + (s.endDate ? '–' + (+s.endDate.split('-')[2]) : '') + '</b><span>' + (S.k === 'teacher' ? '兩日' : slotName(s.time)) + '</span></button>'; }).join('');
  de._list = ds;
  // 直接綁在每顆按鈕上（不靠整頁的點擊判斷），第一個場次也點得到
  ce.querySelectorAll('[data-city]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); S.city = btn.dataset.city; S.sess = null; renderPick(); }; });
  de.querySelectorAll('[data-si]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); S.sess = ds[+btn.dataset.si]; renderPick(); trk('select_session', { course: S.k, city: S.city }); }; });
  renderTOpt();
}
// 研修班「零基礎在哪上」：登入會員自動查折抵（2026-11-25 Kimi 定案）
// 查到 2 週內上過 Kimi 的零基礎 → 自動折抵；查到但超過 2 週 → 不折；查不到 → 只顯示其他老師／一起報
// 舊生優惠碼 kimi3500：登入會員、限用一次、折 3,500，由資料庫 check_promo() 檢查（會員系統/6_研修班零基礎折抵.sql）
function tBaseHtml(ob) {
  var uid = window.MEM && MEM.user ? MEM.user.id : null;
  if (S.bcU !== uid) { S.bcU = uid; S.bc = null; if (S.tBase === 'kimi') { S.tBase = null; S.tCr = null; S.tCode = null; } if (uid) tLoadBC(); }
  var codeBox = S.tCode ? '<div class="tok">✓ 已套用舊生優惠碼，折抵 ' + money(S.tCr || 0) + '<button data-tcx>取消</button></div>'
    : '<div class="tcode"><input id="tCode" placeholder="輸入舊生優惠碼" autocomplete="off" autocapitalize="off"><button data-tcode>使用</button></div><p class="tcmsg" id="tCodeMsg"></p>';
  var line = '<a href="https://lin.ee/5rqtuQw" target="_blank" rel="noopener">私訊官方 LINE</a>';
  if (!uid) return '<div class="tchk"><p>上過 Kimi 的零基礎班？<br>登入會員，系統會自動幫你查學費折抵 🌿</p><button class="btn ghost" data-login>登入／加入會員</button></div>' +
    ob('base', 'other', S.tBase === 'other', '其他老師') + ob('base', 'none', S.tBase === 'none', '還沒上過（想一起報）', '零基礎＋研修班一起報，零基礎免費');
  if (!S.bc) return '<p class="hint">正在查你的零基礎紀錄…</p>';
  var b = S.bc, d = b.date ? (+b.date.split('-')[1]) + '/' + (+b.date.split('-')[2]) : '';
  if (b.found) {
    S.tBase = 'kimi';
    if (b.credit) { S.tCr = b.credit; S.tCode = null; return '<div class="tok">✓ 查到你 ' + d + ' 在' + b.location + '上過 Kimi 的零基礎班，自動折抵 ' + money(b.credit) + '</div>'; }
    if (!S.tCode) S.tCr = 0;
    return '<div class="tok off">查到你 ' + d + ' 在' + b.location + '上過 Kimi 的零基礎班' + (b.used ? '，這堂已經折抵過研修班了' : '，已經超過 2 週，這次沒有自動折抵') + '。</div>' +
      '<p class="tq">有舊生優惠碼嗎？</p>' + codeBox;
  }
  return (S.tCode ? '' : ob('base', 'other', S.tBase === 'other', '其他老師') + ob('base', 'none', S.tBase === 'none', '還沒上過（想一起報）', '零基礎＋研修班一起報，零基礎免費')) +
    '<p class="tq">上過 Kimi 的零基礎，但系統沒查到？輸入舊生優惠碼，或' + line + '，Kimi 幫你查 🌿</p>' + codeBox;
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
    S.tCode = d.code; S.tCr = d.amount; S.tBase = 'kimi'; S.fSess = null; renderTOpt();
  }).catch(function () { if (msg) msg.textContent = '現在連不上，請稍後再試'; });
}
// 研修班報名選項：加購陪跑、零基礎在哪上（一起報的話再選一堂免費零基礎）
function renderTOpt() {
  var h = document.querySelector('[data-topt]'); if (!h) return;
  if (S.k !== 'teacher') { h.innerHTML = ''; return; }
  function ob(a, v, on, t, sm) { return '<button class="box ob' + (on ? ' on' : '') + '" data-to="' + a + '" data-v="' + v + '"><span class="ob-t"><em>' + t + '</em>' + (sm ? '<small>' + sm + '</small>' : '') + '</span><span class="r"></span></button>'; }
  var html = '<p class="lbl">03　加購開課陪跑計劃</p>' +
    ob('add', 1, S.tAdd === 1, '一起加購開課陪跑計劃', '+NT$13,000・研修班＋陪跑合計 NT$39,800') +
    ob('add', 0, S.tAdd === 0, '先上研修班就好', '之後想開課，還是可以加購（NT$15,800）') +
    '<p class="lbl">04　你的零基礎是在哪裡上的？</p>' + tBaseHtml(ob);
  if (S.tBase === 'other') html += '<p class="tnote">🌿 贈送一堂「線上零基礎回訓」（價值 NT$3,000）。材料自備，課前會提供材料清單，報名後小幫手會用 LINE 跟你約時間。</p>';
  if (S.tBase === 'none') html += '<p class="lbl">05　選一堂零基礎場次（免費）</p><div class="chips" data-fcities></div><div class="dates" data-fdates></div><p class="tnote">先上完零基礎，再來上研修班 🌿</p>';
  var cr = S.tBase === 'kimi' ? (S.tCr || 0) : 0, tot = COURSES.teacher.price + (S.tAdd ? COACH.price : 0) - cr;
  html += '<div class="tsum"><span>研修班 ' + money(COURSES.teacher.price) + (S.tAdd ? '＋陪跑 ' + money(COACH.price) : '') + (cr ? '－零基礎折抵 ' + money(cr) : '') + '</span><b>' + money(tot) + '</b></div>';
  h.innerHTML = html;
  document.querySelectorAll('[data-pg="course"] .stk b').forEach(function (e) { e.textContent = money(tot); });
  h.querySelectorAll('[data-to]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); var a = b.dataset.to, v = b.dataset.v;
    if (a === 'add') S.tAdd = +v; else { S.tBase = v; S.tCr = null; S.tCode = null; S.fSess = null; }
    renderTOpt(); }; });
  var cb = h.querySelector('[data-tcode]'); if (cb) cb.onclick = function (ev) { ev.stopPropagation(); tUseCode(); };
  var ci = h.querySelector('#tCode'); if (ci) ci.onkeydown = function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); tUseCode(); } };
  var cx = h.querySelector('[data-tcx]'); if (cx) cx.onclick = function (ev) { ev.stopPropagation(); S.tCode = null; S.tCr = null; if (!(S.bc && S.bc.found)) S.tBase = null; renderTOpt(); };
  if (S.tBase !== 'none') return;
  // 免費零基礎：只列研修班之前的場次，加上「線上・時間另約」
  var lim = S.sess && S.sess.date, L = sessionsFor('beginner').filter(function (s) { return !lim || s.date < lim; }), cs = [];
  L.forEach(function (s) { if (cs.indexOf(s.location) < 0) cs.push(s.location); }); cs.push('線上');
  if (!S.fCity || cs.indexOf(S.fCity) < 0 || (!S.fPick && S.fCity === '線上')) S.fCity = cs[0];
  var fc = h.querySelector('[data-fcities]'), fd = h.querySelector('[data-fdates]');
  fc.innerHTML = cs.map(function (c) { return '<button class="chip' + (c === S.fCity ? ' on' : '') + '" data-fc="' + c + '">' + c + '</button>'; }).join('');
  var ds = L.filter(function (s) { return s.location === S.fCity; }).slice(0, 12);
  if (S.fCity === '線上') { fd.innerHTML = '<p class="hint">報名後小幫手會用 LINE 跟你約上課時間</p>'; S.fSess = ONLINE_FLEX; }
  else fd.innerHTML = ds.map(function (s, i) { var p = s.date.split('-'); return '<button class="dt' + (S.fSess === s ? ' on' : '') + '" data-fi="' + i + '"><small>' + (+p[1]) + '月</small><b>' + (+p[2]) + '</b><span>' + slotName(s.time) + '</span></button>'; }).join('') || '<p class="hint">研修班之前沒有公告場次，可以選「線上」，或私訊官方 LINE 約時間</p>';
  fc.querySelectorAll('[data-fc]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.fCity = b.dataset.fc; S.fPick = 1; S.fSess = null; renderTOpt(); }; });
  fd.querySelectorAll('[data-fi]').forEach(function (b) { b.onclick = function (ev) { ev.stopPropagation(); S.fSess = ds[+b.dataset.fi]; renderTOpt(); }; });
}
function addToCart() {
  if (!S.sess) { toast('先選地區和場次喔'); var p = document.querySelector('[data-cities]'); if (p) window.scrollTo({ top: p.getBoundingClientRect().top + pageYOffset - 140, behavior: 'smooth' }); return; }
  var c = C(S.k);
  if (S.k === 'teacher') {
    var miss = S.tAdd == null ? '要不要加購開課陪跑計劃，先選一下喔' : !S.tBase ? '選一下你的零基礎是在哪裡上的' :
      S.tBase === 'kimi' && S.tCr == null ? '正在查你的零基礎紀錄，請稍等一下' : S.tBase === 'none' && !S.fSess ? '選一堂免費的零基礎場次' : '';
    if (miss) { toast(miss); var o = document.querySelector('[data-topt]'); if (o) window.scrollTo({ top: o.getBoundingClientRect().top + pageYOffset - 120, behavior: 'smooth' }); return; }
    S.cart = S.cart.filter(function (x) { return x.k !== 'teacher' && !x.free; });
    S.cart.push({ k: 'teacher', s: S.sess, qty: 1, price: c.price + (S.tAdd ? COACH.price : 0), addon: S.tAdd, base: S.tBase, credit: S.tBase === 'kimi' ? (S.tCr || 0) : 0, code: S.tBase === 'kimi' ? S.tCode || null : null });
    if (S.tBase === 'none') S.cart.push({ k: S.fSess.flex ? 'online' : 'beginner', s: S.fSess, qty: 1, price: 0, free: 1 });
  } else {
    S.cart = S.cart.filter(function (x) { return x.k !== S.k || x.free; });
    S.cart.push({ k: S.k, s: S.sess, qty: 1, price: c.price });
  }
  updateCount(); toast('已加入購物車 🌿'); setTimeout(function () { go('cart'); }, 500);
}
// 報名表、訂單上的研修班註記：加購陪跑、零基礎在哪上、折抵金額
function tTag(x) {
  if (x.free) return '・研修班贈送零基礎';
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
    var meta = (x.s.flex ? '線上・時間另約' : x.s.location + '・' + dateLabel(x.s) + (x.k === 'teacher' ? '' : '・' + x.s.time)) +
      (x.k === 'teacher' ? (x.addon ? '<br>＋開課陪跑計劃' : '') + (x.base ? '<br>' + BASE_NAME[x.base] : '') : '') + (x.free ? '<br>研修班贈送' : '');
    return tpl.replace(/{img}/g, (x.k === 'teacher' ? 'img_banner/teacher.jpg' : IMG + (x.k === 'online' ? 'img/work5.jpg' : 'img/mandala-beige.jpg')))
      .replace(/{name}/g, c.short + (x.free ? '（贈送）' : '')).replace(/{meta}/g, meta).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
  }).join('');
  // 研修班、贈送的零基礎一次一位，不能改人數；贈送的零基礎跟著研修班，不能單獨刪
  S.cart.forEach(function (x, i) { if (x.k !== 'teacher' && !x.free) return; var el = host.children[i]; if (!el) return; var q = el.querySelector('.qty'); if (q) q.style.visibility = 'hidden'; if (x.free) { var d = el.querySelector('.del'); if (d) d.style.visibility = 'hidden'; } });
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
  var hasT = S.cart.some(function (x) { return x.k === 'teacher'; });
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
    else if (d.q) { var x = S.cart[+d.i]; if (x.k === 'teacher' || x.free) return; x.qty = Math.max(1, Math.min(x.prod ? (x.prod.stock || 9) : 4, x.qty + (+d.q))); updateCount(); renderCart(); }
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
        var items = courses.map(function (x) { var s = x.s || {}; return { name: C(x.k).short + (x.free ? '（研修班贈送）' : ''), detail: (s.flex ? '時間另約' : (s.location || '') + ' ' + dateLabel(s) + (s.time ? ' ' + s.time : '')) + '・' + x.qty + ' 人' + tTag(x) + compTag(x), companions: compList(x), k: x.k, qty: x.qty, price: x.price, sid: s.id || null, date: s.date || '', location: s.location || '', time: s.time || '' }; });
        var ord = null;
        function post(o) { return fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(o) }); }
        // 一筆一筆送，避免同時寫入同一列；轉帳的話每筆報名再補上後五碼
        (window.memPlace ? memPlace({ kind: 'course', items: items, amount: S.ckAmt, use_welcome: useW, pay_method: PAYL[S.pay] || S.pay, last5: l5, name: nm, phone: ph, line_name: ln }) : Promise.resolve(null)).then(function (r) { ord = r; }).then(function () {
        var tag = (ord && ord.discount ? '｜會員折' + ord.discount : '') + (ord && ord.order_no ? '｜' + ord.order_no : '');
        return courses.reduce(function (p, x, xi) {
          var s = x.s || {}, rng = s.endDate && s.endDate !== s.date;
          var payload = { course: x.k === 'online' ? 'beginner' : x.k, session: s.flex ? '時間另約' : rng ? s.date + '~' + s.endDate : s.date,
            dateLabel: s.flex ? '時間另約' : dateLabel(s), location: s.location || (x.k === 'online' ? '線上' : ''), time: s.time || '',
            name: nm, phone: ph, lineName: ln, partySize: x.qty + '人', paymentMethod: (PAYL[S.pay] || S.pay) + (payNow === 'linepay' ? '（已勾選付款完成）' : '') + tTag(x).replace(/・/g, '｜') + tag,
            fee: x.k === 'teacher' || x.free ? x.price * x.qty - (x.credit || 0) : undefined,
            companions: compTag(x).replace('・同行：', '') || undefined, submittedAt: new Date().toISOString(),
            enrollId: ord && ord.enrollments ? ord.enrollments[xi] || null : null };
          return p.then(function () { return post(payload); }).then(function () { if (l5) return post({ action: 'last5', name: nm, phone: ph, last5: l5, submittedAt: new Date().toISOString() }); });
        }, Promise.resolve()); }).then(function () {
          document.querySelector('[data-pg="done"] h1').textContent = '報名完成';
          document.getElementById('dnNo').textContent = nm + '，謝謝妳的報名 🌿' + (ord && ord.order_no ? '（編號 ' + ord.order_no + '）' : '');
          document.getElementById('dnMsg').innerHTML = payNow === 'transfer' ? '已收到妳的報名和匯款後五碼 <b>' + l5 + '</b>，<br>Kimi 對完帳會在官方 LINE 跟妳確認 🌿'
            : payNow === 'linepay' ? '已收到妳的報名，<br>請把 LINE Pay「付款成功」畫面截圖傳到官方 LINE，Kimi 確認後會回覆妳 🌿'
            : '我們已經收到妳的報名資料。<br>請加入官方 LINE，Kimi 會在 LINE 上跟妳確認分期付款方式。';
          document.getElementById('dnList').innerHTML = courses.map(function (x) { return '<div><span>' + C(x.k).short + (x.free ? '（贈送）' : x.addon ? '＋陪跑計劃' : '') + '　' + (x.s && x.s.date ? dateLabel(x.s) + ' ' + (x.s.time || '') : '時間另約') + '</span><span>' + x.qty + ' 人</span></div>'; }).join('') +
            (ord && ord.discount ? '<div><span>會員首購優惠</span><span>− ' + money(ord.discount) + '</span></div>' : '') + (ord ? '<div><span>實付</span><span>' + money(ord.total) + '</span></div>' : '');
          document.getElementById('dnLine').hidden = false;
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
