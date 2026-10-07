// 課程頁上半部的三種排版（參考 Schooler 課程頁），用 HEAD_VARIANT 切換
(function () {
  var css = `
  .hv-wrap{padding:16px 16px 22px}
  .hv-img{width:100%;aspect-ratio:19/10;object-fit:cover;border-radius:16px;box-shadow:0 6px 18px rgba(58,50,44,.12)}
  .hv-tag{display:inline-block;margin-top:18px;font-size:13px;padding:3px 12px;border-radius:999px;border:1.3px solid var(--rose);color:var(--rose)}
  .hv-tag.t{border-color:var(--sage-deep);color:var(--sage-deep)}
  .hv-title{font-size:25px;font-weight:800;line-height:1.35;margin:10px 0 6px;letter-spacing:.01em}
  .hv-sub{font-size:15px;color:var(--ink-soft)}
  .hv-chips{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0 18px}
  .hv-chip{font-size:13.5px;padding:7px 12px;border:1px solid #e3dbd2;border-radius:8px;color:var(--ink-soft)}
  .hv-chip b{color:var(--rose);margin-right:3px}
  .hv-price{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}
  .hv-price .now{font-size:32px;font-weight:800;letter-spacing:.01em}
  .hv-price .was{font-size:16px;color:var(--muted);text-decoration:line-through}
  .hv-off{color:#C9973E;font-weight:700;font-size:14.5px;margin-top:4px}
  .hv-extra{color:#C9973E;font-weight:700;font-size:15px;margin-top:10px}
  .hv-buy{display:flex;gap:10px;margin-top:20px}
  .hv-buy .btn{flex:1;height:52px;font-size:16.5px}
  .hv-line{width:52px;height:52px;flex-shrink:0;border:1.3px solid #e3dbd2;border-radius:12px;display:grid;place-items:center;color:#06C755}
  .hv-line svg{width:24px;height:24px;stroke:currentColor;fill:none;stroke-width:1.8}

  /* 版本 2：重點四格＋價格區塊 */
  .hv-facts{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border-radius:14px;overflow:hidden;margin:16px 0 18px}
  .hv-facts div{background:#fff;padding:12px 12px;display:flex;gap:10px;align-items:center}
  .hv-facts span{font-size:20px}
  .hv-facts small{display:block;font-size:11.5px;color:var(--muted)}
  .hv-facts b{font-size:14px}
  .hv-pbox{background:var(--paper-warm);border-radius:16px;padding:16px}
  .hv-pbox .row{display:flex;justify-content:space-between;align-items:flex-end;gap:10px}
  .hv-pbox .npill{margin-top:10px}
  .hv-pbox .hv-buy{margin-top:14px}

  /* 版本 3：滿版大圖＋往上疊的白色卡片 */
  .hv3-img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block}
  .hv3-card{position:relative;margin-top:-28px;background:#fff;border-radius:24px 24px 0 0;padding:20px 16px 22px}
  .hv3-chips{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 18px}
  .hv3-chips span{font-size:13px;padding:6px 12px;border-radius:999px;background:var(--rose-soft);color:var(--rose);font-weight:500}
  .hv3-chips.t span{background:var(--sage-soft);color:var(--sage-deep)}
  .hv3-pr{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid var(--line)}
  .hv3-pr .btn{width:auto;padding:0 22px;height:50px;flex-shrink:0}
  .regbar.hide{transform:translate(-50%,120%);transition:transform .2s}
  .regbar{transition:transform .2s}
  `;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function extra(c) { return c.key === 'teacher' ? c.notePill : '兩人同行｜每人 3,333 元'; }
  function buy(k, label) {
    return '<div class="hv-buy"><button class="btn hbtn" onclick="goReg(\'' + k + '\')">' + (label || '報名這堂課') + '</button><a class="hv-line" href="' + LINE_URL + '" target="_blank" rel="noopener" aria-label="LINE 詢問">' + ICON.line + '</a></div>';
  }
  var V = {
    1: function (k) {
      var c = COURSES[k];
      return '<div class="hv-wrap"><img class="hv-img" src="' + c.img + '" alt="">' +
        '<span class="hv-tag' + (k === 'teacher' ? ' t' : '') + '">' + c.tag + '</span>' +
        '<h1 class="hv-title">' + c.name.replace('點點曼陀羅・', '') + '</h1><p class="hv-sub">' + c.sub + '</p>' +
        '<div class="hv-chips">' + c.chips.map(function (x) { return '<span class="hv-chip"><b>#</b>' + x + '</span>'; }).join('') + '</div>' +
        '<div class="hv-price"><span class="now">' + c.priceText + '</span><span class="was">' + c.orig + '</span></div>' +
        '<div class="hv-off">優惠價</div><div class="hv-extra">' + extra(c) + '</div>' + buy(k) + '</div>';
    },
    2: function (k) {
      var c = COURSES[k];
      var facts = k === 'teacher'
        ? [['⏱', '上課時間', '兩天 09:00–17:00'], ['🎨', '課堂作品', '完成 4 件'], ['📚', '附贈', '講義＋材料包'], ['💬', '課後', '終生問答']]
        : [['⏱', '上課時間', '3.5 小時'], ['🎨', '課後成果', '能畫 10 件'], ['🎁', '附贈', '工具大禮包'], ['☕', '附餐', '下午茶一杯']];
      return '<div class="hv-wrap"><img class="hv-img" src="' + c.img + '" alt="">' +
        '<span class="hv-tag' + (k === 'teacher' ? ' t' : '') + '">' + c.tag + '</span>' +
        '<h1 class="hv-title">' + c.name.replace('點點曼陀羅・', '') + '</h1><p class="hv-sub">' + c.sub + '</p>' +
        '<div class="hv-facts">' + facts.map(function (f) { return '<div><span>' + f[0] + '</span><p><small>' + f[1] + '</small><b>' + f[2] + '</b></p></div>'; }).join('') + '</div>' +
        '<div class="hv-pbox"><div class="hv-price"><span class="now">' + c.priceText + '</span><span class="was">' + c.orig + '</span></div>' +
        '<span class="npill">' + (k === 'teacher' ? '💳 ' : '👭 ') + extra(c) + '</span>' + buy(k) + '</div></div>';
    },
    3: function (k) {
      var c = COURSES[k];
      return '<img class="hv3-img" src="' + (k === 'teacher' ? 'img/mandala-navy.jpg' : 'img/mandala-beige.jpg') + '" alt="">' +
        '<div class="hv3-card"><span class="hv-tag' + (k === 'teacher' ? ' t' : '') + '" style="margin-top:0">' + c.tag + '</span>' +
        '<h1 class="hv-title">' + c.name.replace('點點曼陀羅・', '') + '</h1><p class="hv-sub">' + c.sub + '</p>' +
        '<div class="hv3-chips' + (k === 'teacher' ? ' t' : '') + '">' + c.chips.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
        '<div class="hv3-pr"><div><div class="hv-price"><span class="now" style="font-size:28px">' + c.priceText + '</span><span class="was">' + c.orig + '</span></div><div class="hv-extra" style="margin-top:2px;font-size:13.5px">' + extra(c) + '</div></div>' +
        '<button class="btn hbtn" onclick="goReg(\'' + k + '\')">報名</button></div></div>';
    }
  };
  window.courseHead = V[window.HEAD_VARIANT || 1];

  // 上方已有大按鈕時，底部報名列先藏起來；滑過按鈕才出現
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      document.querySelectorAll('.cpage').forEach(function (p) {
        var b = p.querySelector('.hbtn'), bar = p.querySelector('.regbar');
        if (!b || !bar || !('IntersectionObserver' in window)) return;
        bar.classList.add('hide');
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { bar.classList.toggle('hide', e.isIntersecting || e.boundingClientRect.top > 0); });
        }).observe(b);
      });
    }, 50);
  });
})();
