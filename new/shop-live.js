// 商店接上後台（2026-11-24 資訊部 Claude AI）
// 1) 商品改讀「imikdots 後台 → 商品」：讀不到時才用 A.html 裡原本寫死的 PRODUCTS
// 2) 商品真的下單：價錢、運費、庫存由資料庫算（place_order），訂單進後台
// 3) 結帳拿掉「信用卡」（還沒有刷卡服務），商品也走轉帳／LINE Pay 先付再送出
// 放在 A.html 最後面載入，只「包住」原本的函式，不改 shared.js 和 A.html 的程式
(function () {
  if (typeof PRODUCTS === 'undefined') return;

  // ---------- 1. 讀後台商品 ----------
  function mapP(r) {
    return { id: r.id, cat: r.cat, name: r.name, en: r.en || '', brief: r.brief || '', desc: r.description || '', price: r.price || 0, stock: r.stock || 0,
      imgs: (r.imgs && r.imgs.length) ? r.imgs : ['img/mandala-beige.jpg'], opts: r.opts || [], spec: r.spec || [], ask: !!r.ask,
      ext: !!r.url, url: r.url || '', tag: r.tag || '' };
  }
  function loadProducts(cb) {
    if (typeof SB_URL === 'undefined' || !SB_URL || !SB_KEY) return;
    fetch(SB_URL + '/rest/v1/products?select=*&active=eq.true&order=sort,created_at', { headers: { apikey: SB_KEY } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (rows) {
        if (!Array.isArray(rows) || !rows.length) return;
        // 2026-11-28 Kimi：〈森林呼吸〉〈星夜〉不是 Kimi 的作品，先不顯示（後台跑 10_原創畫作整理.sql 下架後這行可留著）
        var HIDE = ['art-forest', 'art-night'];
        PRODUCTS = rows.filter(function (r) { return HIDE.indexOf(r.id) < 0; }).map(mapP);
        // 購物車裡的商品換成最新資料（價錢、庫存）
        S.cart.forEach(function (x) { if (x.prod) { var n = PRODUCTS.filter(function (p) { return p.id === x.prod.id; })[0]; if (n) x.prod = n; } });
        var on = document.querySelector('.sp-tabs [data-sp].on');
        try { renderShop(on ? on.dataset.sp : 'all'); } catch (e) {}
        if (S.page === 'product' && PD.id) { try { renderPD(); } catch (e) {} }
        if (cb) cb();
      }).catch(function () {});
  }
  document.addEventListener('DOMContentLoaded', function () { loadProducts(); });

  // ---------- 2. 結帳：拿掉信用卡；只有商品時也顯示匯款／LINE Pay ----------
  var _renderCart = window.renderCart;
  window.renderCart = function () {
    if (S.pay === 'card' || S.pay === 'installment' && !S.cart.some(function (x) { return x.k === 'teacher'; })) { S.pay = 'transfer'; }
    _renderCart.apply(this, arguments);
    document.querySelectorAll('[data-pay="card"]').forEach(function (e) { e.style.display = 'none'; });
    if (S.pay === 'card') { S.pay = 'transfer'; S.payPicked = 0; document.querySelectorAll('[data-pay]').forEach(function (e) { e.classList.toggle('on', e.dataset.pay === S.pay); }); window.renderCkPay(); }
  };
  var _renderCkPay = window.renderCkPay;
  window.renderCkPay = function () {
    var only = S.cart.length && S.cart.every(function (x) { return x.prod; });
    if (only) S.cart.push({ k: '_shop', qty: 0, price: 0, _d: 1 });   // 讓原本的付款資訊也顯示給「只有商品」的訂單
    try { _renderCkPay.apply(this, arguments); } finally { if (only) S.cart = S.cart.filter(function (x) { return !x._d; }); }
    var btn = document.getElementById('ckBtn');
    if (btn && only) btn.textContent = !S.payPicked ? '送出訂單' : S.pay === 'transfer' ? '③ 已匯款，送出訂單' : S.pay === 'linepay' ? '③ 已付款，送出訂單' : '送出訂單';
  };

  // ---------- 3. 送出：有商品時先成立商品訂單 ----------
  function val(el) { return el ? (el.value || '').trim() : ''; }
  function strip(t) { return String(t || '').replace(/\s*[+−-]NT\$[\d,]+/, '').trim(); }
  function selOf(x) {
    var parts = String(x.opt || '').split('・');
    return (x.prod.opts || []).map(function (o, oi) { var k = o.list.map(strip).indexOf(parts[oi]); return k < 0 ? 0 : k; });
  }
  var PAYL = { transfer: '轉帳', linepay: 'LINE Pay 掃碼', installment: '中租分期' };

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-submit]');
    if (!btn) return;
    var prods = S.cart.filter(function (x) { return x.prod; });
    if (!prods.length) return;                       // 只有課程：照原本的報名流程
    e.stopImmediatePropagation(); e.preventDefault();
    var courses = S.cart.filter(function (x) { return !x.prod; });

    var sf = document.querySelector('[data-shipform]'), ins = sf ? sf.querySelectorAll('input') : [], sel = sf ? sf.querySelector('select') : null;
    var nm = val(document.getElementById('suName')), ph = val(document.getElementById('suPhone')), ln = val(document.getElementById('suLine'));
    if (courses.length && (!nm || !ph || !ln)) { toast('報名資料：姓名、手機、LINE 名稱都要填寫喔'); document.getElementById('suName').focus(); return; }
    var ship = { name: val(ins[0]) || nm, phone: val(ins[1]) || ph, method: sel ? sel.value.replace(/（.*$/, '') : '', addr: val(ins[2]) };
    function need(i, msg) { toast(msg); if (ins[i]) { ins[i].focus(); ins[i].scrollIntoView({ block: 'center', behavior: 'smooth' }); } }
    if (!ship.name) return need(0, '請填收件人姓名');
    if (!/^0\d{8,9}$/.test(ship.phone.replace(/\D/g, ''))) return need(1, '請填收件人手機號碼');
    if (!ship.addr) return need(2, '請填寄送的門市名稱或收件地址');
    if (!courses.length) { nm = ship.name; ph = ship.phone; }
    if (!S.payPicked) { toast('請選擇付款方式'); return; }
    var l5 = '';
    if (S.pay === 'transfer') { l5 = val(document.getElementById('ckL5')); if (!/^\d{5}$/.test(l5)) { toast('匯款完成後，請填帳號後五碼（5 個數字）'); var li = document.getElementById('ckL5'); if (li) { li.focus(); li.scrollIntoView({ block: 'center', behavior: 'smooth' }); } return; } }
    if (S.pay === 'linepay' && !(document.getElementById('ckLp') || {}).checked) { toast('LINE Pay 付款完成後，請勾選「我已完成付款」'); return; }
    if (typeof sb === 'undefined' || !sb) { toast('商店暫時無法下單，請私訊官方 LINE 購買'); return; }

    btn.disabled = true; btn.textContent = '送出中…';
    // 首購折：只有商品時折在商品；兩人以上同行報名時，首購折不折課程、改折在同一張購物車的商品（2026-11-25 Kimi）
    var useW = S.ckMOff > 0 && (!courses.length || !!S.ckWProd), payNow = S.pay;
    sb.rpc('place_order', { p: { brand: typeof BRAND !== 'undefined' ? BRAND : 'mandala', kind: 'product',
      items: prods.map(function (x) { return { pid: x.prod.id, sel: selOf(x), qty: x.qty, name: x.prod.name }; }),
      use_welcome: useW, pay_method: (PAYL[S.pay] || S.pay) + (S.pay === 'linepay' ? '（已勾選付款完成）' : ''), last5: l5,
      name: nm, phone: ph, line_name: ln, ship_name: ship.name, ship_phone: ship.phone, ship_method: ship.method, ship_address: ship.addr } })
    .then(function (r) {
      btn.disabled = false;
      if (r.error) { toast(/庫存不足|下架|私訊/.test(r.error.message) ? r.error.message.replace(/^.*?(庫存不足|商品已下架|這件商品)/, '$1') : '送出失敗，請稍後再試，或私訊官方 LINE'); loadProducts(function () { renderCart(); }); return; }
      var o = r.data || {};
      if (o.discount && window.MEM) MEM.welcome = Object.assign({}, MEM.welcome, { eligible: false });
      if (window.MEM && MEM.user && window.memLoad) setTimeout(function () { memLoad(MEM.user); }, 800);
      try { trk('purchase', { method: payNow, value: o.total }); } catch (x) {}
      var lines = prods.map(function (x) { return '<div><span>' + x.prod.name + (x.opt && x.opt !== '—' ? '（' + x.opt + '）' : '') + ' × ' + x.qty + '</span><span>' + money(x.price * x.qty) + '</span></div>'; }).join('') +
        (o.ship_fee ? '<div><span>運費</span><span>' + money(o.ship_fee) + '</span></div>' : '') +
        (o.discount ? '<div><span>會員首購優惠</span><span>− ' + money(o.discount) + '</span></div>' : '') +
        '<div><span>商品實付</span><span>' + money(o.total) + '</span></div>';
      S.cart = courses; updateCount();
      loadProducts();
      if (courses.length) {
        // 還有課程：交給原本的報名流程，完成頁再補上商品
        renderCart();
        var wait = setInterval(function () {
          if (S.page !== 'done') return; clearInterval(wait);
          var dl = document.getElementById('dnList'); if (dl) dl.insertAdjacentHTML('beforeend', '<div style="margin-top:8px"><span>🛍 商品訂單 ' + (o.order_no || '') + '</span><span></span></div>' + lines);
        }, 200);
        setTimeout(function () { clearInterval(wait); }, 30000);
        setTimeout(function () { document.getElementById('ckBtn').click(); }, 50);
        return;
      }
      document.querySelector('[data-pg="done"] h1').textContent = '訂單已成立';
      document.getElementById('dnNo').textContent = nm + '，謝謝妳的支持 🌿' + (o.order_no ? '（編號 ' + o.order_no + '）' : '');
      document.getElementById('dnMsg').innerHTML = (payNow === 'transfer' ? '已收到妳的訂單和匯款後五碼 <b>' + l5 + '</b>，<br>' : '已收到妳的訂單，請把 LINE Pay「付款成功」畫面截圖傳到官方 LINE，<br>') +
        'Kimi 對完帳後 3–5 個工作天出貨，出貨時會在 LINE 通知妳 📦';
      document.getElementById('dnList').innerHTML = lines;
      document.getElementById('dnLine').hidden = false;
      var dp = document.getElementById('dnPay'); if (dp) dp.hidden = true; var dn = document.getElementById('dnNote'); if (dn) dn.hidden = true;
      S.l5 = ''; S.payPicked = 0; ckClear(); updateCount(); go('done');
    }).catch(function () { btn.disabled = false; toast('送出失敗，請稍後再試，或私訊官方 LINE'); renderCart(); });
  }, true);
})();
