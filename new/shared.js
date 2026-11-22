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
var TEACHER_COND = '報名條件：必須上過「零基礎課程」（其他老師的零基礎班也可以）。送出報名後用 LINE 傳一張過去作品給 Kimi 即可。';
var EXTRA = { online: { key: 'online', short: '線上課', name: '點點曼陀羅・線上課', sub: '材料包寄到家，在家視訊上課', price: 3333, priceText: 'NT$3,333', orig: 'NT$3,980', img: 'img/work5.jpg', tag: '在家上課', hours: '3 小時 30 分鐘' } };
function C(k) { return COURSES[k] || EXTRA[k]; }
function money(n) { return 'NT$' + n.toLocaleString('en-US'); }

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
  return '<header class="tb">' + (sub ? '<button class="tb-l" data-back aria-label="返回">' + ICONS.back + '</button>' : '<span class="tb-l"></span>') +
    '<div class="wm" data-go="home"><b>imikdots</b><small>Kimi 點點曼陀羅</small></div>' +
    '<div class="tb-r"><button data-login aria-label="會員登入">' + ICONS.user + '</button><button data-go="cart" aria-label="購物車">' + ICONS.shop + '<em class="cnt"></em></button></div></header>';
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
function drawer() {
  // [連到哪, 英文小字, 名稱, 是否子項目, 即將推出]
  var it = [['home', 'HOME', '首頁'], ['about', 'ABOUT', '關於 Kimi'], ['works', 'JOURNAL', '點點月刊 <i>' + JOURNAL_ISSUE + '</i>'], ['shop', 'COURSES', '全部課程', 0, 0, 1],
    ['course:beginner', '', '零基礎班', 1], ['course:teacher', '', '兩日師資班', 1], ['course:online', '', '線上課', 1], ['', '', '主題課程', 1, 1],
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
    '</aside><div class="toast" id="toast"></div>';
}
function toast(m) { var t = document.getElementById('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove('on'); }, 2000); }

// ---- 頁面切換 ----
function go(p) {
  var anc = p.split('#')[1]; p = p.split('#')[0];
  var parts = p.split(':'); var page = parts[0];
  if (page === 'course') { S.k = parts[1] || S.k; S.city = null; S.sess = null; renderCourse(); }
  if (page === 'cart') renderCart();
  S.page = page;
  document.querySelectorAll('.pg').forEach(function (x) { x.classList.toggle('on', x.dataset.pg === page); });
  document.querySelectorAll('.nav [data-go]').forEach(function (b) { b.classList.toggle('on', b.dataset.go === (page === 'course' ? 'shop' : page)); });
  document.body.classList.remove('dopen');
  if (location.hash.slice(1) !== p) history.replaceState(null, '', '#' + p);
  window.scrollTo(0, 0);
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
  var en = host.querySelector('[data-en]'); if (en) en.textContent = { beginner: 'BEGINNER CLASS', teacher: 'TEACHER TRAINING', online: 'ONLINE CLASS' }[S.k] || '';
  var dt = host.querySelector('[data-detail]'); if (dt) dt.innerHTML = detailHtml(S.k);
  renderPick();
}
// 課程詳細介紹：內容取自舊網站（data.js 的 COURSES）
function detailHtml(k) {
  var b = COURSES[k === 'teacher' ? 'teacher' : 'beginner'], on = k === 'online';
  var info = b.info.map(function (r) { return [r[0], r[1].replace(/<a[^>]*>|<\/a>/g, '')]; });
  if (on) info = [['課程時長', '3 小時 30 分鐘（時間報名後用 LINE 約）'], ['上課方式', '在家視訊，老師一步步帶畫'], ['材料', '工具材料包寄到家（含運費）'], ['開班', '1 人就開班']].concat(info.filter(function (r) { return r[0] === '課程內容'; }));
  var cmp = b.compare.length === 1 ? '<p class="dp"><b>' + b.compare[0][0] + '：</b>' + b.compare[0][2] + '</p>' :
    '<div class="vs">' + b.compare.map(function (r) { return '<div class="vs-i"><p class="vs-k">' + r[0] + '</p><div class="vs-g"><div class="vs-a"><small>一般繪畫課</small><span>' + r[1] + '</span></div><div class="vs-b"><small>這堂課</small><span>' + r[2] + '</span></div></div></div>'; }).join('') + '</div>';
  return '<section class="ds"><p class="dk">01　課程資訊</p><ul class="rows">' + info.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul></section>' +
    '<section class="ds"><p class="dk">02　' + (k === 'teacher' ? '不只教你畫，更陪你開課' : '並非臨摹，而是 0 到 1 獨立創作') + '</p>' + cmp + '</section>' +
    '<section class="ds"><p class="dk">03　課程內容</p>' + b.lessons.map(function (l, i) { return '<h4 class="lh"><span>主題' + '一二三四五六七八'[i] + '</span>' + l[0] + '</h4><ul class="dl">' + l[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }).join('') + '</section>' +
    '<section class="ds"><p class="dk">04　' + (k === 'teacher' ? '附贈材料' : '工具大禮包') + '</p><ul class="dl">' + b.kit.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul><img class="fin" src="' + IMG + b.finalImg + '" alt="課程作品" loading="lazy"></section>' +
    '<section class="ds"><p class="dk">05　誰適合這堂課？</p><ul class="dl">' + b.who.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></section>' +
    '<section class="ds"><p class="dk">06　報名須知</p><h4 class="lh">攜帶物品</h4><p class="dp">' + (on ? '什麼都不用準備，材料包會寄到家！' : b.bring) + '</p><h4 class="lh">注意事項</h4><ol class="dl">' + NOTES.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ol>' +
    (k === 'teacher' ? '<p class="cond">🌿 ' + TEACHER_COND + '</p>' : '') + '</section>';
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
  de.querySelectorAll('[data-si]').forEach(function (btn) { btn.onclick = function (ev) { ev.stopPropagation(); S.sess = ds[+btn.dataset.si]; renderPick(); }; });
}
function addToCart() {
  if (!S.sess) { toast('先選地區和場次喔'); var p = document.querySelector('[data-cities]'); if (p) window.scrollTo({ top: p.getBoundingClientRect().top + pageYOffset - 140, behavior: 'smooth' }); return; }
  var c = C(S.k);
  S.cart = S.cart.filter(function (x) { return x.k !== S.k; });
  S.cart.push({ k: S.k, s: S.sess, qty: 1, price: c.price });
  updateCount(); toast('已加入報名清單 🌿'); setTimeout(function () { go('cart'); }, 500);
}
function updateCount() { var n = S.cart.reduce(function (a, x) { return a + x.qty; }, 0); document.querySelectorAll('.cnt').forEach(function (e) { e.textContent = n || ''; }); }

// ---- 報名結帳 ----
function renderCart() {
  var host = document.querySelector('[data-items]'); if (!host) return;
  var tpl = document.getElementById('tpl-item').innerHTML;
  if (!S.cart.length) { // 預覽用：沒有東西時先放一筆示範
    var L = sessionsFor('beginner');
    S.cart = [{ k: 'beginner', demo: 1, s: L[0] || { date: '2026-12-06', location: '台中', time: '13:30－17:00' }, qty: 1, price: 3500 }];
    updateCount();
  }
  host.innerHTML = S.cart.map(function (x, i) {
    if (x.prod) return tpl.replace(/{img}/g, x.img).replace(/{name}/g, x.prod.name).replace(/{meta}/g, x.opt).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
    var c = C(x.k);
    var meta = x.s.flex ? '線上・時間另約' : x.s.location + '・' + dateLabel(x.s) + (x.k === 'teacher' ? '' : '・' + x.s.time);
    return tpl.replace(/{img}/g, (x.k === 'teacher' ? 'img_banner/teacher.jpg' : IMG + (x.k === 'online' ? 'img/work5.jpg' : 'img/mandala-beige.jpg')))
      .replace(/{name}/g, c.short).replace(/{meta}/g, meta).replace(/{price}/g, money(x.price * x.qty)).replace(/{qty}/g, x.qty).replace(/{i}/g, i);
  }).join('');
  var sub = S.cart.reduce(function (a, x) { return a + x.price * x.qty; }, 0);
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
  document.querySelectorAll('[data-total]').forEach(function (e) { e.textContent = money(sub - off + ship); });
  var t = document.getElementById('ckTitle'); if (t) t.textContent = hasP && !hasC ? '購物車結帳' : hasP ? '報名與購物結帳' : '報名結帳';
  var b = document.getElementById('ckBtn'); if (b) b.textContent = hasP ? '確認付款 ' + money(sub - off + ship) : '送出報名';
  document.querySelectorAll('[data-pay="card"]').forEach(function (e) { e.style.display = hasP ? '' : 'none'; });
  if (hasP && S.pay === 'transfer' && !S.payPicked) S.pay = 'card';
  document.querySelectorAll('[data-pay]').forEach(function (e) { e.classList.toggle('on', e.dataset.pay === S.pay); });
  var hasT = S.cart.some(function (x) { return x.k === 'teacher'; });
  document.querySelectorAll('[data-pay="installment"]').forEach(function (e) { e.style.display = hasT ? '' : 'none'; });
}

// ---- 報名完成頁：匯款資訊＋後五碼、LINE Pay 條碼 ----
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
      .then(function () { document.querySelector('.pi-l5').innerHTML = '<p class="pi-ok">已收到後五碼 ' + v + '，對完帳會在 LINE 通知妳 ✓</p>'; document.getElementById('l5Msg').remove(); })
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
    else if ('login' in d) { document.body.classList.remove('dopen'); toast('會員登入即將開放：之後可以查看買過的課程'); }
    else if ('soon' in d) toast('即將推出，敬請期待');
    else if ('back' in d) go(S.page === 'course' ? 'shop' : 'home');
    else if (d.city) { S.city = d.city; S.sess = null; renderPick(); }
    else if (d.si != null) { S.sess = document.querySelector('[data-dates]')._list[+d.si]; renderPick(); }
    else if ('add' in d) addToCart();
    else if (d.q) { var x = S.cart[+d.i]; x.qty = Math.max(1, Math.min(x.prod ? (x.prod.stock || 9) : 4, x.qty + (+d.q))); updateCount(); renderCart(); }
    else if (d.del) { S.cart.splice(+d.del, 1); updateCount(); renderCart(); }
    else if (d.pay) { S.pay = d.pay; S.payPicked = 1; renderCart(); }
    else if ('submit' in d) {
      var courses = S.cart.filter(function (x) { return !x.prod; });
      if (courses.length) {
        var nm = (document.getElementById('suName').value || '').trim(), ph = (document.getElementById('suPhone').value || '').trim(), ln = (document.getElementById('suLine').value || '').trim();
        if (!nm || !ph || !ln) { toast('姓名、手機、LINE 名稱都要填寫喔'); document.getElementById('suName').focus(); return; }
        if (!S.payPicked) { toast('請選擇付款方式'); return; }
        var PAYL = { transfer: '轉帳', linepay: 'LINE Pay 掃碼', installment: '中租分期', card: '信用卡' };
        var payNow = S.pay, totNow = (document.querySelector('[data-total]') || {}).textContent || ''; S.lastSign = { name: nm, phone: ph };
        var btn = document.getElementById('ckBtn'); btn.disabled = true; btn.textContent = '送出中…';
        Promise.all(courses.map(function (x) {
          var s = x.s || {}, rng = s.endDate && s.endDate !== s.date;
          var payload = { course: x.k === 'online' ? 'beginner' : x.k, session: s.flex ? '時間另約' : rng ? s.date + '~' + s.endDate : s.date,
            dateLabel: s.flex ? '時間另約' : dateLabel(s), location: s.location || (x.k === 'online' ? '線上' : ''), time: s.time || '',
            name: nm, phone: ph, lineName: ln, partySize: x.qty + '人', paymentMethod: PAYL[S.pay] || S.pay, submittedAt: new Date().toISOString() };
          return fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
        })).then(function () {
          document.querySelector('[data-pg="done"] h1').textContent = '報名已送出';
          document.getElementById('dnNo').textContent = nm + '，謝謝妳的報名 🌿';
          document.getElementById('dnMsg').innerHTML = '我們已經收到妳的報名資料。<br>請加入官方 LINE，Kimi 會在 LINE 上跟妳確認場次與付款方式。';
          document.getElementById('dnList').innerHTML = courses.map(function (x) { return '<div><span>' + C(x.k).short + '　' + (x.s && x.s.date ? dateLabel(x.s) + ' ' + (x.s.time || '') : '時間另約') + '</span><span>' + x.qty + ' 人</span></div>'; }).join('');
          document.getElementById('dnLine').hidden = false;
          showPayInfo(payNow, totNow);
          S.cart = []; updateCount(); go('done');
        }).catch(function () { toast('送出失敗，請稍後再試，或直接私訊官方 LINE 報名'); })
          .then(function () { btn.disabled = false; btn.textContent = '送出報名'; });
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
  go(h);
  loadLiveSessions(function () { if (window.renderUpcoming) renderUpcoming(); if (S.page === 'course') renderPick(); if (S.page === 'cart' && S.cart.length === 1 && !S.cart[0].touched) { S.cart = []; renderCart(); } });
});

// 選單：全部課程預設收起，點一下展開／收起
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-acc]'); if (!t) return;
  var row = t.closest('.drw-acc') || t, open = row.classList.toggle('open'); t.setAttribute('aria-expanded', open);
});
