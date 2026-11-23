// 會員系統（2026-11-23）：加入會員、登入、忘記密碼、我的紀錄、首購折 100（加入 30 天內、聯名商品除外）
// 資料存在 Supabase，設定在 sb-config.js；沒設定時會員功能顯示「準備中」，報名照常
var MEM = { ready: false, off: false, user: null, profile: null, welcome: null, orders: null, admin: false, mode: 'login', msg: '' };
var sb = null;

// 從 Email 連結（重設密碼、確認信箱）回來時，網址後面會帶登入資訊，先收起來再交給頁面切換
(function () {
  var h = location.hash;
  if (/access_token=|error_description=/.test(h)) {
    MEM.authHash = h.slice(1);
    history.replaceState(null, '', location.pathname + location.search + '#' + (/type=recovery/.test(h) ? 'reset' : 'me'));
  }
})();

function memEsc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function memDate(d) { if (!d) return ''; var x = new Date(d); return x.getFullYear() + '/' + (x.getMonth() + 1) + '/' + x.getDate(); }
function memBase() { return location.origin + location.pathname; }

function memInit() {
  if (!SB_URL || !SB_KEY || !window.supabase) { MEM.off = true; MEM.ready = true; memRender(); return; }
  sb = supabase.createClient(SB_URL, SB_KEY, { auth: { detectSessionInUrl: false, persistSession: true, autoRefreshToken: true, flowType: 'implicit' } });
  var p = Promise.resolve();
  if (MEM.authHash) {
    var q = new URLSearchParams(MEM.authHash);
    if (q.get('access_token') && q.get('refresh_token')) p = sb.auth.setSession({ access_token: q.get('access_token'), refresh_token: q.get('refresh_token') });
    else if (q.get('error_description')) MEM.msg = '連結已經失效或用過了，請重新申請一次';
  }
  p.catch(function () {}).then(function () { return sb.auth.getSession(); }).then(function (r) {
    return memLoad(r.data.session ? r.data.session.user : null);
  }).then(memPromoAuto);
  sb.auth.onAuthStateChange(function (ev, s) {
    if (ev === 'SIGNED_OUT') setTimeout(function () { memLoad(null); }, 0);
    else if (ev === 'SIGNED_IN' && s && (!MEM.user || MEM.user.id !== s.user.id)) setTimeout(function () { memLoad(s.user); }, 0);
  });
}

function memLoad(user) {
  MEM.user = user; MEM.profile = null; MEM.welcome = null; MEM.orders = null; MEM.admin = false;
  if (!user) { MEM.ready = true; memAfter(); return Promise.resolve(); }
  return Promise.all([
    sb.from('members').select('*').eq('id', user.id).maybeSingle(),
    sb.rpc('my_welcome'),
    sb.from('orders').select('order_no,created_at,kind,items,amount,discount,total,status,pay_method').eq('member_id', user.id).order('created_at', { ascending: false }),
    sb.rpc('is_admin')
  ]).then(function (r) {
    MEM.profile = r[0].data; MEM.welcome = r[1].data; MEM.orders = r[2].data || []; MEM.admin = !!r[3].data;
  }).catch(function () {}).then(function () { MEM.ready = true; memAfter(); });
}

// 登入狀態改變後：更新會員頁、結帳頁，報名表自動帶入姓名手機
function memAfter() {
  memRender();
  if (MEM.profile) {
    [['suName', 'f_suName', MEM.profile.name], ['suPhone', 'f_suPhone', MEM.profile.phone]].forEach(function (a) {
      var el = document.getElementById(a[0]); if (el && !el.value && a[2]) { el.value = a[2]; S[a[1]] = a[2]; }
    });
  }
  document.querySelectorAll('[data-login]').forEach(function (b) { b.classList.toggle('in', !!MEM.user); });
  if (S.page === 'cart' && window.renderCart) renderCart();
}

// 結帳時能折多少（給 shared.js 的 renderCart 用）
function memOff(amount) { return MEM.user && MEM.welcome && MEM.welcome.eligible && amount >= 100 ? 100 : 0; }

// 結帳頁上方的會員提示
function memCkBanner() {
  var el = document.getElementById('ckMem'); if (!el) return;
  if (MEM.off || !MEM.ready) { el.innerHTML = ''; return; }
  if (!MEM.user) { el.innerHTML = '<button class="mb-ban" data-go="me"><b>加入會員，首購折 NT$100</b><span>30 秒填好，這次報名就能用 →</span></button>'; return; }
  var w = MEM.welcome;
  el.innerHTML = w && w.eligible ? '<p class="mb-ok">🌿 ' + memEsc(MEM.profile ? MEM.profile.name : '') + '，已幫妳套用會員首購折 NT$100</p>'
    : '<p class="mb-ok">🌿 已登入會員：' + memEsc(MEM.profile ? MEM.profile.name : MEM.user.email) + '</p>';
}

// 送出報名時記錄訂單；回傳 { order_no, discount, total }，會員系統沒開或失敗時回傳 null
function memPlace(o) {
  if (!sb) return Promise.resolve(null);
  return sb.rpc('place_order', { p: Object.assign({ brand: BRAND }, o) }).then(function (r) {
    if (r.error) return null;
    if (r.data && r.data.discount) { MEM.welcome = Object.assign({}, MEM.welcome, { eligible: false, used_at: new Date().toISOString() }); }
    if (MEM.user) setTimeout(function () { memLoad(MEM.user); }, 800);
    return r.data;
  }).catch(function () { return null; });
}

// 優惠券樣式（會員專區和彈出視窗共用）
function memTicket(cls, title, l1, l2) {
  return '<div class="mb-tk ' + cls + '"><div class="mb-tk-l"><small>NT$</small><b>100</b><em>OFF</em></div>' +
    '<div class="mb-tk-r"><span class="mb-tk-t">' + title + '</span><span>' + l1 + '</span><span>' + l2 + '</span></div></div>';
}

// ---- 新會員首購折 100 彈出視窗（活動結束時把 sb-config.js 的 PROMO_ON 改成 false）----
// 什麼時候跳：①沒登入的人第一次逛網站（看過後 3 天內不再跳）②按「加入會員」時（每次進站只跳一次）
var MEM_POP_SHOWN = false;
function memPromoOn() { return typeof PROMO_ON === 'undefined' || PROMO_ON; }
function memPromo(fromSignup) {
  if (!memPromoOn() || MEM.user || MEM.off || MEM_POP_SHOWN || document.getElementById('mbPop')) return;
  MEM_POP_SHOWN = true;
  try { localStorage.setItem('imk_promo_seen', String(Date.now())); } catch (e) {}
  var el = document.createElement('div'); el.id = 'mbPop'; el.className = 'mb-pop';
  el.innerHTML = '<div class="mb-pop-bx" role="dialog" aria-label="新會員首購優惠"><button class="mb-pop-x" data-pop="close" aria-label="關閉">×</button>' +
    '<p class="mb-pop-k">WELCOME GIFT</p><p class="mb-pop-h">新會員首購折 NT$100</p>' +
    memTicket('', '新會員首購優惠', '加入會員後 30 天內有效', '第一次報名課程或購物，結帳自動折抵') +
    '<p class="mb-pop-s">聯名商品除外・每位會員限用一次</p>' +
    (fromSignup ? '<button class="btn full" data-pop="close">我知道了，開始填資料</button>'
                : '<button class="btn full" data-pop="join">加入會員領取</button><button class="mb-link" data-pop="close" style="display:block;margin:10px auto 0">先逛逛</button>') +
    '</div>';
  document.body.appendChild(el);
  requestAnimationFrame(function () { el.classList.add('on'); });
  trk('promo_view', { from: fromSignup ? 'signup' : 'visit' });
}
function memPromoClose() { var el = document.getElementById('mbPop'); if (!el) return; el.classList.remove('on'); setTimeout(function () { el.remove(); }, 250); }
function memPromoAuto() {
  if (!memPromoOn() || MEM.user || MEM.off || S.page === 'reset' || S.page === 'me') return;
  var seen = 0; try { seen = +localStorage.getItem('imk_promo_seen') || 0; } catch (e) {}
  if (Date.now() - seen < 3 * 864e5) return;
  setTimeout(function () { if (!MEM.user) memPromo(false); }, 1500);
}
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-pop]');
  if (t) { var a = t.getAttribute('data-pop'); memPromoClose(); if (a === 'join') { MEM.mode = 'signup'; go('me'); trk('promo_join', {}); } return; }
  if (e.target.id === 'mbPop') { memPromoClose(); return; }
  if (e.target.closest('[data-mm="signup"]')) setTimeout(function () { memPromo(true); }, 50);
});

// ---- 會員頁 ----
function memRender() {
  memCkBanner();
  var box = document.getElementById('meBox'); if (!box) return;
  if (MEM.off) { box.innerHTML = '<div class="mb-card"><p class="mb-h">會員功能準備中</p><p class="mb-p">很快就能加入會員、查看自己的報名紀錄 🌿</p></div>'; return; }
  if (!MEM.ready) { box.innerHTML = '<p class="mb-p" style="text-align:center;padding:40px 0">載入中…</p>'; return; }
  var msg = MEM.msg ? '<p class="mb-msg">' + memEsc(MEM.msg) + '</p>' : '';
  if (!MEM.user) {
    var m = MEM.mode;
    var tabs = '<div class="mb-tabs"><button data-mm="login" class="' + (m === 'login' ? 'on' : '') + '">登入</button><button data-mm="signup" class="' + (m === 'signup' ? 'on' : '') + '">加入會員</button></div>';
    if (m === 'signup') box.innerHTML = tabs + msg +
      '<div class="fm"><input id="mbName" placeholder="姓名" autocomplete="name"><input id="mbPhone" type="tel" inputmode="numeric" placeholder="手機號碼" autocomplete="tel">' +
      '<label class="mb-lb">生日<input id="mbBday" type="date" max="' + new Date().toISOString().slice(0, 10) + '"></label>' +
      '<input id="mbEmail" type="email" placeholder="Email（登入帳號，也會收到電子報）" autocomplete="email"><input id="mbPw" type="password" placeholder="設定密碼（至少 8 碼）" autocomplete="new-password"></div>' +
      '<label class="mb-agree"><input type="checkbox" id="mbAgree"> 我同意 imikdots 保存以上資料，用於會員服務、課程通知與電子報（電子報可隨時取消訂閱）</label>' +
      '<button class="btn full" data-mact="signup">加入會員</button>';
    else if (m === 'forgot') box.innerHTML = tabs + msg +
      '<p class="mb-p">輸入註冊的 Email，我們會寄一封重設密碼的信給妳。</p><div class="fm"><input id="mbEmail" type="email" placeholder="Email" autocomplete="email"></div>' +
      '<button class="btn full" data-mact="forgot" style="margin-top:12px">寄重設密碼信</button><button class="mb-link" data-mm="login">回登入</button>';
    else box.innerHTML = tabs + msg +
      '<div class="fm"><input id="mbEmail" type="email" placeholder="Email" autocomplete="email"><input id="mbPw" type="password" placeholder="密碼" autocomplete="current-password"></div>' +
      '<button class="btn full" data-mact="login" style="margin-top:12px">登入</button><button class="mb-link" data-mm="forgot">忘記密碼？</button>' +
      '<p class="mb-p" style="text-align:center;margin-top:18px">還不是會員？<button class="mb-link in" data-mm="signup">加入會員，首購折 NT$100</button></p>';
    return;
  }
  var p = MEM.profile || {}, w = MEM.welcome || {};
  var cp;
  if (w.eligible) { var left = Math.max(0, Math.ceil((new Date(w.expires) - Date.now()) / 864e5)); cp = memTicket('', '首購優惠券', '有效期限 ' + memDate(w.expires) + '・還剩 ' + left + ' 天', '結帳時自動折抵，聯名商品除外'); }
  else if (w.used_at) cp = memTicket('used', '首購優惠券', '已於 ' + memDate(w.used_at) + ' 使用', '謝謝妳的支持 🌿');
  else cp = memTicket('used', '首購優惠券', '已過期', '加入會員 30 天內可使用');
  var od = MEM.orders || [];
  var list = od.length ? od.map(function (o) {
    var names = (o.items || []).map(function (x) { return memEsc(x.name) + (x.detail ? '<small>' + memEsc(x.detail) + '</small>' : ''); }).join('');
    return '<div class="mb-od"><div class="mb-od-h"><span>' + memDate(o.created_at) + '・' + memEsc(o.order_no || '') + '</span><i class="st-' + memEsc(o.status) + '">' + memEsc(o.status) + '</i></div>' +
      '<div class="mb-od-n">' + names + '</div><div class="mb-od-t">' + (o.discount ? '<s>' + money(o.amount) + '</s> ' : '') + money(o.total) + '</div></div>';
  }).join('') : '<p class="mb-p">還沒有紀錄，報名課程後會出現在這裡 🌿</p>';
  box.innerHTML = msg + cp + '<p class="mb-hi">' + memEsc(p.name || '') + '，歡迎回來</p>' +
    '<p class="lbl">My Records　我的報名與訂單</p>' + list +
    '<p class="lbl">Profile　會員資料</p><div class="mb-card mb-pf">' +
    '<div><span>手機</span><b>' + memEsc(p.phone || '') + '</b></div><div><span>生日</span><b>' + memEsc(p.birthday || '未填') + '</b></div><div><span>Email</span><b>' + memEsc(p.email || MEM.user.email) + '</b></div>' +
    '<label class="mb-agree" style="margin:8px 0 0"><input type="checkbox" id="mbNews"' + (p.newsletter ? ' checked' : '') + '> 收到 imikdots 電子報</label></div>' +
    (MEM.admin ? '<a class="btn full" href="admin.html" style="margin-top:14px">進入後台</a>' : '') +
    '<button class="btn full ghost" data-mact="logout" style="margin-top:12px">登出</button>' +
    '<p class="mb-p" style="font-size:11.5px;margin-top:14px">會員上線前的報名紀錄不會顯示在這裡，有問題歡迎私訊官方 LINE</p>';
}

function memErr(e) {
  var t = (e && e.message) || '';
  if (/Invalid login/i.test(t)) return 'Email 或密碼不對，再試一次';
  if (/not confirmed/i.test(t)) return '還沒完成信箱驗證，請到信箱點確認連結';
  if (/already registered|already been registered/i.test(t)) return '這個 Email 已經註冊過了，直接登入就好';
  if (/Password should/i.test(t)) return '密碼至少要 8 碼';
  if (/rate limit|security purposes/i.test(t)) return '操作太頻繁，請等一分鐘再試';
  if (/Database error/i.test(t)) return '這支手機已經註冊過會員了';
  return '出了點問題，請稍後再試，或私訊官方 LINE';
}
function memV(id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; }
function memBusy(btn, on, txt) { if (!btn) return; btn.disabled = on; if (on) { btn._t = btn.textContent; btn.textContent = txt || '處理中…'; } else if (btn._t) btn.textContent = btn._t; }

document.addEventListener('click', function (e) {
  var mm = e.target.closest('[data-mm]');
  if (mm) { MEM.mode = mm.dataset.mm; MEM.msg = ''; memRender(); return; }
  var a = e.target.closest('[data-mact]'); if (!a || !sb) return;
  var act = a.dataset.mact;
  if (act === 'login') {
    var em = memV('mbEmail'), pw = memV('mbPw');
    if (!em || !pw) { toast('請輸入 Email 和密碼'); return; }
    memBusy(a, true, '登入中…');
    sb.auth.signInWithPassword({ email: em, password: pw }).then(function (r) {
      memBusy(a, false);
      if (r.error) { toast(memErr(r.error)); return; }
      MEM.msg = ''; toast('登入成功 🌿'); memLoad(r.data.user);
    });
  } else if (act === 'signup') {
    var nm = memV('mbName'), ph = memV('mbPhone').replace(/\D/g, ''), bd = memV('mbBday'), em2 = memV('mbEmail'), pw2 = memV('mbPw');
    if (!nm || !ph || !bd || !em2 || !pw2) { toast('姓名、手機、生日、Email、密碼都要填喔'); return; }
    if (!/^09\d{8}$/.test(ph)) { toast('手機號碼格式是 09 開頭共 10 碼'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em2)) { toast('Email 格式好像不對'); return; }
    if (pw2.length < 8) { toast('密碼至少要 8 碼'); return; }
    if (!document.getElementById('mbAgree').checked) { toast('請勾選同意條款'); return; }
    memBusy(a, true, '加入中…');
    sb.rpc('phone_taken', { p_phone: ph }).then(function (r) {
      if (r.data) { memBusy(a, false); toast('這支手機已經註冊過了，直接登入就好'); MEM.mode = 'login'; memRender(); return; }
      return sb.auth.signUp({ email: em2, password: pw2, options: { emailRedirectTo: memBase(), data: { name: nm, phone: ph, birthday: bd, newsletter: true, brand: BRAND } } }).then(function (r2) {
        memBusy(a, false);
        if (r2.error) { toast(memErr(r2.error)); return; }
        if (r2.data.session) { trk('member_join', {}); toast('加入成功！首購折 100 已經可以用了 🌿'); memLoad(r2.data.user); }
        else if (r2.data.user && r2.data.user.identities && !r2.data.user.identities.length) { toast('這個 Email 已經註冊過了，直接登入就好'); MEM.mode = 'login'; memRender(); }
        else { trk('member_join', {}); MEM.mode = 'login'; MEM.msg = '快完成了！請到 ' + em2 + ' 收信，點確認連結後就能登入'; memRender(); }
      });
    });
  } else if (act === 'forgot') {
    var em3 = memV('mbEmail'); if (!em3) { toast('請輸入 Email'); return; }
    memBusy(a, true, '寄送中…');
    sb.auth.resetPasswordForEmail(em3, { redirectTo: memBase() }).then(function (r) {
      memBusy(a, false);
      if (r.error) { toast(memErr(r.error)); return; }
      MEM.mode = 'login'; MEM.msg = '如果這個 Email 有註冊，重設密碼的信已經寄出，請到信箱收信'; memRender();
    });
  } else if (act === 'reset') {
    var n1 = memV('rsPw1'), n2 = memV('rsPw2');
    if (n1.length < 8) { toast('密碼至少要 8 碼'); return; }
    if (n1 !== n2) { toast('兩次輸入的密碼不一樣'); return; }
    memBusy(a, true, '更新中…');
    sb.auth.updateUser({ password: n1 }).then(function (r) {
      memBusy(a, false);
      if (r.error) { toast(memErr(r.error)); return; }
      toast('密碼更新好了 🌿'); MEM.msg = ''; go('me');
    });
  } else if (act === 'logout') {
    sb.auth.signOut().then(function () { toast('已登出'); MEM.mode = 'login'; memLoad(null); });
  }
});
document.addEventListener('change', function (e) {
  if (e.target.id === 'mbNews' && sb && MEM.user) {
    sb.from('members').update({ newsletter: e.target.checked }).eq('id', MEM.user.id).then(function (r) { toast(r.error ? '更新失敗，請稍後再試' : e.target.checked ? '已訂閱電子報' : '已取消訂閱電子報'); });
  }
});

// 重設密碼頁
function memResetRender() {
  var box = document.getElementById('rsBox'); if (!box) return;
  if (!MEM.ready) { box.innerHTML = '<p class="mb-p" style="text-align:center;padding:40px 0">載入中…</p>'; return; }
  if (!MEM.user) { box.innerHTML = '<p class="mb-msg">' + memEsc(MEM.msg || '重設密碼的連結已經失效，請回會員頁重新申請') + '</p><button class="btn full" data-go="me">回會員頁</button>'; return; }
  box.innerHTML = '<p class="mb-p">請設定新的密碼</p><div class="fm"><input id="rsPw1" type="password" placeholder="新密碼（至少 8 碼）" autocomplete="new-password"><input id="rsPw2" type="password" placeholder="再輸入一次" autocomplete="new-password"></div>' +
    '<button class="btn full" data-mact="reset" style="margin-top:12px">更新密碼</button>';
}

// 切到會員頁、重設密碼頁時畫出內容
var _memGo = go;
go = function (p) {
  _memGo(p);
  if (S.page === 'me') memRender();
  if (S.page === 'reset') memResetRender();
};
var _memRenderMain = memRender;
memRender = function () { _memRenderMain(); if (S.page === 'reset') memResetRender(); };

document.addEventListener('DOMContentLoaded', memInit);
