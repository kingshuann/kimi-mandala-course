// App 版共用：圖示、場次列表、課程子頁、作品、問答、底部分頁
var ICON = {
  cal: '<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><rect x="12.5" y="13" width="4" height="3.5" rx=".6"/></svg>',
  brush: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="6.5" r="1"/><circle cx="12" cy="17.5" r="1"/><circle cx="6.5" cy="12" r="1"/><circle cx="17.5" cy="12" r="1"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v6M12 7.5v.5"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="M4 11l8-6.5 8 6.5V20h-5.5v-5h-5v5H4z"/></svg>',
  ticket: '<svg viewBox="0 0 24 24"><path d="M3.5 7.5h17v3a2 2 0 000 3v3h-17v-3a2 2 0 000-3z"/><path d="M14 7.5v9" stroke-dasharray="2 2"/></svg>',
  seed: '<svg viewBox="0 0 24 24"><path d="M12 20v-8"/><path d="M12 12c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M12 14c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/></svg>',
  cap: '<svg viewBox="0 0 24 24"><path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5V16c3 2.5 8 2.5 11 0v-4.5M21.5 9.5V15"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M4 5.5h16v10H9l-4 3.5v-3.5H4z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
  ig: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6"/></svg>',
  line: '<svg viewBox="0 0 24 24"><path d="M12 4.5c-4.7 0-8.5 3-8.5 6.8 0 3.4 3 6.2 7.1 6.7l-.3 2.5 3.4-2.6c3.7-.6 6.8-3.3 6.8-6.6 0-3.8-3.8-6.8-8.5-6.8z"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>'
};

function topBar(extraClass) {
  return '<header class="top ' + (extraClass || '') + '"><img class="logo" src="img/logo-brown.png" alt="">' +
    '<div class="nm"><b>Kimi 點點曼陀羅課程</b></div></header>';
}

// ---------- 底部分頁 ----------
function setupTabs(onChange) {
  var btns = Array.from(document.querySelectorAll('.tabbar button'));
  window.goTab = function (name) {
    btns.forEach(function (b) { b.classList.toggle('on', b.dataset.tab === name); });
    document.querySelectorAll('.page').forEach(function (p) { p.classList.toggle('on', p.dataset.page === name); });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (onChange) onChange(name);
  };
  btns.forEach(function (b) { b.onclick = function () { goTab(b.dataset.tab); }; });
}
function setupSubtabs(root) {
  root.querySelectorAll('.subtabs').forEach(function (bar) {
    var bs = Array.from(bar.querySelectorAll('button'));
    bs.forEach(function (b) {
      b.onclick = function () {
        bs.forEach(function (x) { x.classList.toggle('on', x === b); });
        var host = bar.parentElement;
        host.querySelectorAll(':scope > .subpane').forEach(function (p) { p.classList.toggle('on', p.dataset.pane === b.dataset.pane); });
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      };
    });
  });
}

// ---------- 場次列表 ----------
var BOOK = [];
function allSessions(filter) {
  var out = [];
  ['beginner', 'teacher'].forEach(function (k) {
    if (filter && filter !== k) return;
    upcoming(SESSIONS[k]).forEach(function (s) { out.push({ s: s, k: k }); });
  });
  out.sort(function (a, b) { return (a.s.date + a.s.time) < (b.s.date + b.s.time) ? -1 : 1; });
  return out;
}
function sessionRows(items) {
  if (!items.length) return '<div class="empty-note">目前沒有公告場次<br>想開班歡迎私訊官方 LINE 🙌</div>';
  var html = '', last = null, first = true;
  items.forEach(function (x) {
    var s = x.s, c = COURSES[x.k], id = BOOK.push(x) - 1;
    var showDate = s.date !== last; last = s.date;
    var dcls = showDate ? (first ? 'dt hl' : 'dt') : 'dt empty'; if (showDate) first = false;
    html += '<div class="srow2"><div class="' + dcls + '">週' + wd(s.date) + '<b>' + md(s.date) + '</b></div>' +
      '<div class="bd"><div class="tm">' + s.time.replace('－', ' - ') + (x.k === 'teacher' ? '（兩天）' : '') + '</div>' +
      '<div class="nm">' + c.short + (x.k === 'teacher' ? '' : '・' + slotName(s.time)) + '</div>' +
      '<div class="mt">' + s.location + '・' + (x.k === 'teacher' ? md(s.date) + '–' + md(s.endDate || s.date) : '3.5 小時') + ' / ' + c.priceText + '</div></div>' +
      '<div class="act"><button class="book' + (x.k === 'teacher' ? ' tch' : '') + '" data-book="' + id + '">預約</button></div></div>';
  });
  return html;
}
document.addEventListener('click', function (e) {
  var b = e.target.closest('[data-book]');
  if (b) { var x = BOOK[+b.dataset.book]; openSheet(x.k, x.s); }
});

// 城市篩選 + 列表，回傳 html，並在 host 上綁定
function sessionBrowser(host, course) {
  var city = '全部';
  function draw() {
    var items = allSessions(course);
    var cities = ['全部'].concat(Array.from(new Set(items.map(function (x) { return x.s.location; }))));
    var shown = items.filter(function (x) { return city === '全部' || x.s.location === city; });
    host.innerHTML = '<div class="filters">' + cities.map(function (c) { return '<button class="' + (c === city ? 'on' : '') + '" data-c="' + c + '">' + c + '</button>'; }).join('') + '</div>' +
      '<div class="slist2">' + sessionRows(shown) + '</div>';
    host.querySelectorAll('.filters button').forEach(function (b) { b.onclick = function () { city = b.dataset.c; draw(); }; });
  }
  draw();
  return draw;
}

// ---------- 課程內容 ----------
function courseRows(onClick) {
  return ['beginner', 'teacher'].map(function (k) {
    var c = COURSES[k];
    return '<button class="crow" onclick="' + onClick + '(\'' + k + '\')"><img src="' + c.img + '" alt=""><span class="t"><b>' + c.short + '</b><span>' + c.hours + '・' + c.tag + '</span><div class="p">' + c.priceText + '<s>' + c.orig + '</s></div></span><span class="arr">›</span></button>';
  }).join('');
}
function courseBody(k) {
  var c = COURSES[k];
  return '<div class="sect"><h2>課程資訊</h2><ul class="rows">' + c.info.map(function (r) { return '<li><span>' + r[0] + '</span><span>' + r[1] + '</span></li>'; }).join('') + '</ul></div>' +
    '<div class="sect"><h2>' + (k === 'teacher' ? '不只教你畫，更陪你開課' : '並非臨摹，而是 0 到 1 獨立創作') + '</h2><ul class="bullets">' + c.compare.map(function (r) { return '<li><b>' + r[0] + '：</b>' + r[2] + '</li>'; }).join('') + '</ul></div>' +
    '<div class="sect"><h2>課程內容</h2>' + c.lessons.map(function (l, i) { return '<h3 class="unit-h"><span class="unit">主題' + '一二三四五六七八'[i] + '</span>' + l[0] + '</h3><ul class="bullets">' + l[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; }).join('') + '</div>' +
    '<div class="sect"><h2>' + (k === 'teacher' ? '附贈材料' : '工具大禮包') + '</h2><ul class="bullets">' + c.kit.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
    '<img src="' + c.finalImg + '" alt="" style="border-radius:12px;margin-top:14px"></div>' +
    '<div class="sect"><h2>適合這樣的你</h2><ul class="bullets">' + c.who.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul></div>';
}
function courseHead(k) {
  var c = COURSES[k];
  return '<img class="hero-img" src="' + c.img + '" alt=""><div class="head"><span class="pill' + (k === 'teacher' ? ' sage' : '') + '">' + c.tag + '</span><h1>' + c.name + '</h1><p style="color:var(--ink-soft);font-size:14px">' + c.sub + '</p>' +
    '<div class="price"><span class="now">' + c.priceText + '</span><span class="was">' + c.orig + '</span></div>' +
    (c.notePill ? '<span class="npill">💳 ' + c.notePill + '</span>' : '<div class="pn">' + c.note + '</div>') + '</div>';
}

// 從右邊滑入的課程子頁；ctaLabel/ctaFn 是底部按鈕
function setupCourseSub(ctaLabel, ctaFn) {
  var wrap = document.createElement('div');
  wrap.innerHTML = '<div class="sub" id="sub"></div><div class="sub-cta"><a class="btn ghost" href="' + LINE_URL + '" target="_blank" rel="noopener" style="flex:0 0 96px">LINE 問</a><button class="btn" id="subCta">' + ctaLabel + '</button></div>';
  document.querySelector('.shell').appendChild(wrap);
  var cur = null;
  window.openCourse = function (k) {
    cur = k;
    var sub = document.getElementById('sub');
    sub.innerHTML = '<header class="top line"><button class="back" onclick="closeCourse()" aria-label="返回">' + ICON.back + '</button><div class="title">' + COURSES[k].short + '</div><span style="width:28px"></span></header>' + courseHead(k) + '<div class="divider"></div>' + courseBody(k) + '<div style="height:20px"></div>';
    sub.scrollTop = 0; sub.classList.add('open');
  };
  window.closeCourse = function () { document.getElementById('sub').classList.remove('open'); };
  document.getElementById('subCta').onclick = function () { closeCourse(); ctaFn(cur); };
}

// ---------- 作品／評價／問答／關於 ----------
function worksGrid() { return '<div class="grid3">' + WORKS.concat(['img/final-teacher.jpg']).map(function (w) { return '<img src="' + w + '" alt="">'; }).join('') + '</div>'; }
function reviewsHtml() { return REVIEWS.map(function (r) { return '<div class="rv2"><div class="s">★★★★★<span class="who">' + r.who + '</span></div>' + r.text + '</div>'; }).join(''); }
var FAQ = [
  ['需要帶什麼嗎？', '零基礎課程什麼都不用帶，開心來就好！師資班請自備「平頭筆」及「點珠筆」。'],
  ['完全沒畫過畫可以嗎？', '可以！零基礎課程就是為新手設計的，3.5 小時完整教會基本功。'],
  ['人數不夠會開班嗎？', '台中班 1 人就開班，時間可討論；台中以外的縣市滿 3 人才開班。最晚於開課前一週通知，未成功開班全額退費，也可延期或轉讓。'],
  ['臨時不能來怎麼辦？', '完成匯款後如因個人因素無法參加，可延期補課或轉讓他人，恕不退費。'],
  ['可以帶小朋友嗎？', '大人與小朋友同價，歡迎攜伴，但請家長協助照顧。'],
  ['師資班可以分期嗎？', '可以，師資班提供中租分期，送出報名後小幫手會用 LINE 提供分期資訊。']
];
function faqHtml() { return '<div class="qa">' + FAQ.map(function (q) { return '<details><summary>' + q[0] + '</summary><p>' + q[1] + '</p></details>'; }).join('') + '</div>'; }
function aboutHtml() {
  return '<div class="sect" style="display:flex;gap:14px;align-items:center"><img src="img/kimi-portrait.jpg" alt="" style="width:84px;height:84px;border-radius:50%;object-fit:cover">' +
    '<div><h2 style="margin:0">Kimi 老師</h2><p style="color:var(--rose);font-weight:700;font-size:13px">教學 6 年・學生 300+</p><p style="font-size:13px">曼陀羅老師／美業老師／影音創作者</p></div></div>' +
    '<div class="sect" style="padding-top:4px"><p>中興大學科管所畢業，做過廣告、行銷、美業創業，後來轉身走進療癒繪畫教學。希望陪你在忙碌的世界裡，慢慢找回屬於自己的節奏。</p></div>';
}
function venuesHtml() {
  return '<ul class="rows">' + Object.keys(VENUES).map(function (c) { return '<li><span>' + c + '</span><span>📍 ' + VENUES[c] + '</span></li>'; }).join('') + '</ul>';
}

// 上方分頁釘在品牌列正下方
function stickSubtabs() {
  var fix = function () {
    document.querySelectorAll('.page').forEach(function (p) {
      var t = p.querySelector('.top'); if (!t || !t.offsetHeight) return;
      p.querySelectorAll('.subtabs').forEach(function (s) { s.style.top = t.offsetHeight + 'px'; });
    });
  };
  fix(); window.addEventListener('resize', fix); document.addEventListener('click', function () { setTimeout(fix, 20); });
}

// 防止一行只剩一兩個字：每段文字的最後 3 個字綁在一起不換行（不用 text-wrap:pretty，iPhone 會把每行縮短）
(function () {
  var SEL = 'p, li, dd, h1, h2, h3, .rv2, .rows li span:last-child, .cmp2-r span';
  var KEEP = 3;
  function fixText(t) {
    var s = t.nodeValue, trimmed = s.replace(/\s+$/, '');
    // 結尾的標點不算字數，確保最後一行至少有 3 個真正的字
    var punct = (trimmed.match(/[。，、！？；：…）」』～!?.,)]+$/) || [''])[0].length;
    var n = KEEP + punct;
    if (trimmed.length <= n) return;
    var head = trimmed.slice(0, trimmed.length - n), tail = trimmed.slice(-n);
    var span = document.createElement('em');
    span.className = 'nowrap'; span.textContent = tail;
    t.nodeValue = head;
    t.parentNode.insertBefore(span, t.nextSibling);
  }
  function fixEl(el) {
    if (el.dataset.nw) return;
    el.dataset.nw = '1';
    // 彈性排版（flex/grid）的標題會把包裝標籤當成獨立項目，產生空隙，所以跳過
    var d = getComputedStyle(el).display;
    if (d.indexOf('flex') >= 0 || d.indexOf('grid') >= 0) return;
    Array.from(el.childNodes).forEach(function (n) {
      if (n.nodeType !== 3 || !n.nodeValue.trim()) return;
      var next = n.nextSibling;
      while (next && next.nodeType === 3 && !next.nodeValue.trim()) next = next.nextSibling;
      if (!next || next.nodeName === 'BR') fixText(n);
    });
  }
  function run(root) {
    (root.querySelectorAll ? root : document).querySelectorAll(SEL).forEach(fixEl);
  }
  var st = document.createElement('style');
  st.textContent = 'em.nowrap{white-space:nowrap;font-style:normal;color:inherit;font-weight:inherit}';
  document.head.appendChild(st);
  document.addEventListener('DOMContentLoaded', function () {
    run(document);
    var busy = false;
    new MutationObserver(function () {
      if (busy) return; busy = true;
      requestAnimationFrame(function () { run(document); busy = false; });
    }).observe(document.body, { childList: true, subtree: true });
  });
})();
