// 報名抽屜：填資料 → 送到 Google Apps Script（寫進「報名資料」分頁）→ 提醒加官方 LINE 完成報名
var LINE_URL = 'https://lin.ee/5rqtuQw';
(function () {
  var html =
    '<div class="sheet-bg" id="sheetBg"></div>' +
    '<div class="sheet" id="sheet" role="dialog" aria-label="報名表">' +
    '<div class="grab"></div>' +
    '<form id="signupForm" novalidate>' +
    '<h3>填寫報名資料</h3>' +
    '<div class="picked" id="sheetPicked">尚未選擇場次</div>' +
    '<div class="field"><label for="fName">你的名字（希望我如何稱呼你）*</label><input id="fName" autocomplete="name" placeholder="例如：小美" required></div>' +
    '<div class="field"><label for="fPhone">聯絡電話 *</label><input id="fPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="僅供緊急聯絡用" required></div>' +
    '<div class="field"><label for="fLine">LINE 名稱 *</label><input id="fLine" placeholder="方便小幫手確認是你" required></div>' +
    '<div class="field"><label for="fParty">報名人數 *</label><select id="fParty"><option>1人</option><option>2人</option><option>3人</option><option>多人包班</option></select></div>' +
    '<div class="field"><label for="sheetPay">付款方式 *</label><select id="sheetPay"></select></div>' +
    '<p class="note">送出後，小幫手會透過 LINE 提供匯款帳號、刷卡連結或分期資訊。</p>' +
    '<p class="ferr" id="formErr"></p>' +
    '<button class="btn" id="sheetSubmit" type="submit">送出報名</button>' +
    '</form>' +
    '<div class="done" id="sheetDone" hidden>' +
    '<div class="done-ic">📝</div><h3>報名表已送出</h3>' +
    '<p class="done-warn">⚠️ 還差一步！<br>請加入官方 LINE 並傳訊息給小幫手，<br>才算報名成功唷！</p>' +
    '<a class="btn line-go" href="' + LINE_URL + '" target="_blank" rel="noopener">加入官方 LINE 完成報名</a>' +
    '<button class="done-close" type="button" id="doneClose">關閉</button>' +
    '</div>' +
    '</div><div class="toast" id="toast"></div>';
  var css =
    '.ferr{color:#C1613F;font-size:13px;font-weight:700;margin:-4px 0 10px;min-height:1px}' +
    '.done{text-align:center;padding:6px 4px 10px}' +
    '.done-ic{font-size:40px;margin-bottom:6px}' +
    '.done-warn{color:#C1613F;font-weight:700;font-size:15px;line-height:1.6;margin:10px 0 18px}' +
    '.line-go{display:flex;align-items:center;justify-content:center;background:#06C755 !important;color:#fff !important;text-decoration:none}' +
    '.done-close{margin-top:12px;font-size:14px;color:var(--muted);padding:8px 16px}' +
    '#sheetSubmit[disabled]{opacity:.6}';
  var LABELS = { transfer: '轉帳', linepay: 'LINE Pay 刷卡', installment: '中租分期' };
  var last = {};

  document.addEventListener('DOMContentLoaded', function () {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var wrap = document.createElement('div'); wrap.innerHTML = html; document.body.appendChild(wrap);
    document.getElementById('sheetBg').onclick = closeSheet;
    document.getElementById('doneClose').onclick = closeSheet;
    document.getElementById('signupForm').addEventListener('submit', submit);
  });

  // 日期格式跟舊網站一致，Google Sheet 才不會一筆一個樣
  function fmt(d) { var x = new Date(d + 'T00:00:00'); return (x.getMonth() + 1) + '/' + x.getDate() + '（' + WEEK[x.getDay()] + '）'; }
  function isRange(s) { return s.endDate && s.endDate !== s.date; }

  function submit(e) {
    e.preventDefault();
    var err = document.getElementById('formErr');
    var s = last.s;
    var name = document.getElementById('fName').value.trim();
    var phone = document.getElementById('fPhone').value.trim();
    var line = document.getElementById('fLine').value.trim();
    if (!s) { err.textContent = '請先選擇場次喔！'; return; }
    if (!name || !phone || !line) { err.textContent = '名字、電話、LINE 名稱都要填寫喔！'; return; }
    err.textContent = '';
    var payload = {
      course: last.k,
      session: isRange(s) ? s.date + '~' + s.endDate : s.date,
      dateLabel: isRange(s) ? fmt(s.date) + ' ～ ' + fmt(s.endDate) : fmt(s.date),
      location: s.location || '',
      time: s.time || '',
      name: name,
      phone: phone,
      lineName: line,
      partySize: document.getElementById('fParty').value,
      paymentMethod: LABELS[document.getElementById('sheetPay').value] || document.getElementById('sheetPay').value,
      submittedAt: new Date().toISOString()
    };
    var btn = document.getElementById('sheetSubmit');
    btn.setAttribute('disabled', ''); btn.textContent = '送出中…';
    fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) })
      .then(function () {
        document.getElementById('signupForm').hidden = true;
        document.getElementById('sheetDone').hidden = false;
        document.getElementById('signupForm').reset();
      })
      .catch(function () { err.textContent = '送出失敗，請稍後再試，或直接私訊官方 LINE 報名。'; })
      .then(function () { btn.removeAttribute('disabled'); btn.textContent = '送出報名'; });
  }

  window.openSheet = function (courseKey, session) {
    last = { k: courseKey, s: session };
    var c = COURSES[courseKey];
    var t = '<b>' + c.short + '</b>';
    t += session ? '　' + session.location + '・' + dateLabel(session) + '・' + session.time : '　（請先選擇場次）';
    document.getElementById('sheetPicked').innerHTML = t;
    // 中租分期只給師資班；iOS 下拉選單藏不住 option，所以整個重建
    document.getElementById('sheetPay').innerHTML = '<option value="transfer">轉帳</option><option value="linepay">LINE Pay 刷卡</option>' + (courseKey === 'teacher' ? '<option value="installment">中租分期</option>' : '');
    document.getElementById('formErr').textContent = '';
    document.getElementById('signupForm').hidden = false;
    document.getElementById('sheetDone').hidden = true;
    document.getElementById('sheet').classList.add('open');
    document.getElementById('sheetBg').classList.add('open');
  };
  function closeSheet() {
    document.getElementById('sheet').classList.remove('open');
    document.getElementById('sheetBg').classList.remove('open');
  }
  window.toast = function (msg) {
    var el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 1800);
  };
})();
