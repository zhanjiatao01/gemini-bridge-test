// FORMATUTIL_20261021：前端纯格式化/转义函数（无 DOM 依赖、无副作用）。
// 从 app.js（6800+ 行）抽出来的第一批：这些函数只做「值 → 字符串」，改配色、加面板
// 时不必再在巨型文件里翻找，也能单独跑用例验证。
//
// 刻意保持经典脚本（不是 ES module）：index.html 里 <script src> 顺序加载，
// 顶层 function 声明即全局，app.js 直接调用即可，不改变任何加载时序。

// MDRICH_20261111：escapeHtml 前抹控制字符防注入——但保留 \x00（渲染器占位符依赖它），
// 占位符形态为 \x00S<n>E / \x00I<n>I，真实用户输入出现 \x00n\x00 序列的概率极低且最多导致
// 一次占位错位（显示错误），不构成 XSS（还原内容都是自家生成的 span）。
function escapeHtml(text) {
  text = String(text).replace(/[\x01-\x08\x0b\x0c\x0e-\x1f]/g, "");
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// MDRICH_20261111：升级为完整 Markdown 渲染——表格/列表/链接/删除线/引用块/代码高亮。
// 设计约束：零依赖（不引外部库）；先按 ``` 切代码段（与旧版一致），代码段内不做 md 处理；
// 普通文本走逐行块级解析（表格/列表/引用/标题），行内再走 inline()。
// 兼容性：CW-CODEBLOCK-CLASS 与旧版类名一致（cw-codeblock/cw-codeblock-bar/cw-codeblock-copy/
// cw-codeblock-lang/cw-code），前端已有的复制按钮委托逻辑不受影响。

// 代码高亮：轻量 tokenizer（关键字/字符串/注释/数字），按 lang 分派；无需外部库。
const CW_HL_KEYWORDS = {
  js: "const let var function return if else for while class new import export from try catch finally throw async await typeof instanceof null undefined true false this yield delete switch case break continue default do extends super static get set of in void",
  javascript: "const let var function return if else for while class new import export from try catch finally throw async await typeof instanceof null undefined true false this yield delete switch case break continue default do extends super static get set of in void",
  mjs: "const let var function return if else for while class new import export from try catch finally throw async await typeof instanceof null undefined true false this yield delete switch case break continue default do extends super static get set of in void",
  ts: "const let var function return if else for while class new interface type enum import export from try catch finally throw async await typeof instanceof null undefined true false this yield delete switch case break continue default do extends implements private public protected readonly static get set of in void never unknown any string number boolean",
  python: "def return if elif else for while class import from as try except finally raise with lambda None True False and or not is in pass break continue global nonlocal yield assert del async await self match case",
  py: "def return if elif else for while class import from as try except finally raise with lambda None True False and or not is in pass break continue global nonlocal yield assert del async await self match case",
  sql: "select from where group by order having insert into update delete create table alter drop join left right inner outer on as and or not null limit offset distinct union all case when then else end with",
  bash: "if then else fi for while do done case esac function echo exit return local export set unset source alias cd ls grep awk sed cat sudo apt npm node git",
  sh: "if then else fi for while do done case esac function echo exit return local export set unset source alias cd ls grep awk sed cat sudo apt npm node git",
  json: "true false null",
  css: "important media keyframes supports root var",
};
const CW_HL_LINECOMMENT = { js: "//", javascript: "//", mjs: "//", ts: "//", python: "#", py: "#", bash: "#", sh: "#", yaml: "#", yml: "#", r: "#", ruby: "#" };

function cwHlLine(line, lang) {
  // 策略：先把字符串/注释摘出来占位，再给关键字/数字上色，最后拼回。占位符用 \x00n\x00 防撞。
  const kw = CW_HL_KEYWORDS[lang] || "";
  const lc = CW_HL_LINECOMMENT[lang];
  const slots = [];
  let s = line;
  const stash = (html) => { slots.push(html); return "\x00S" + (slots.length - 1) + "E\x00"; };
  // 字符串（单/双/反引号）
  s = s.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (m) => stash(`<span class="hl-str">${escapeHtml(m)}</span>`));
  // 行注释（不在已摘出的字符串里，此时剩余文本无引号）
  if (lc && s.includes(lc)) {
    const idx = s.indexOf(lc);
    s = s.slice(0, idx) + stash(`<span class="hl-cmt">${escapeHtml(s.slice(idx))}</span>`);
  }
  // 关键字
  if (kw) {
    const re = new RegExp("\\b(" + kw.split(" ").join("|") + ")\\b", "g");
    s = s.replace(re, (m) => stash(`<span class="hl-kw">${escapeHtml(m)}</span>`));
  }
  // 数字（放在关键字之后；注意此时文本里已有 \x00n\x00 占位符，数字正则不能命中占位符内的数字——
  // 修复：占位符改用非数字标记段（\x00S..\x00E），彻底避免占位符自身被后续规则改写。
  s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, (m) => stash(`<span class="hl-num">${escapeHtml(m)}</span>`));
  // 函数调用名（后跟括号的标识符）
  s = s.replace(/\b([A-Za-z_$][\w$]*)(?=\s*\()/g, (m) => stash(`<span class="hl-fn">${escapeHtml(m)}</span>`));
  // 函数名注释给了占位符的地方已带 span；剩余纯文本转义
  let out = escapeHtml(s);
  out = out.replace(/\x00S(\d+)E\x00/g, (m, i) => slots[Number(i)] ?? "");
  return out;
}

function cwHighlightCode(body, lang) {
  const l = (lang || "").toLowerCase();
  if (!CW_HL_KEYWORDS[l] && !CW_HL_LINECOMMENT[l] && !["html", "xml", "java", "c", "cpp", "go", "rust"].includes(l)) {
    return escapeHtml(body);
  }
  return body.split("\n").map((ln) => cwHlLine(ln, l)).join("\n");
}

// 行内 md：加粗/斜体/删除线/行内代码/链接。调用前文本已按块切好，输入为“未转义原文”。
// PATHLINK_20261113：把聊天正文里的本地绝对路径做成可点芯片。
// 背景：产物常直接写在 D:\ 根目录，不在 PRODUCT_ROOTS 里 → 既进不了「本轮产物」卡片，
// 也没法走 /api/serve-file（一律 403）。于是消息里只剩一串死文字，「点不了」。
// 这里只做展示层：渲染成 <a class="cw-file-link" data-path="原路径">，点击由 app.js 的
// 委托监听接管（/api/file-stat + /api/chat-file 单独放行）。
function cwFilePathChip(rawPath) {
  const p = String(rawPath)
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const parts = p.split(/[\\/]/).filter(Boolean);
  const name = parts.length ? parts[parts.length - 1] : p;
  // 只把「像文件」的路径做成芯片：末段必须带扩展名。
  // 否则 "D:\起飞" 这类被空格截断的目录片段、以及正文里的 "D:\xxx\n-…" 都会被误伤成死芯片。
  if (!/\.[A-Za-z0-9]{1,10}$/.test(name)) return null;
  const esc = (v) => String(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // 行内 onclick / oncontextmenu：不只依赖 document 级委托。
  // 之前只挂了委托，用户反馈「左右键都没用」——事件链上任何一环（吞事件、重复重绘、委托注册晚）
  // 都会让委托静默失效；行内事件直接绑在元素上，最稳。
  return `<a href="#" class="cw-file-link" data-path="${esc(p)}"`
    + ` title="${esc(p)}&#10;左键预览或打开 · 右键打开所在文件夹"`
    + ` onclick="return window.__cwFilePathClick && window.__cwFilePathClick(this, event)"`
    + ` oncontextmenu="return window.__cwFilePathReveal && window.__cwFilePathReveal(this, event)">`
    + `<span class="cw-fl-name">${esc(name)}</span></a>`;
}

// PATHLINK_20261113b：芯片点击的自包含实现，刻意放在 format-utils.js 里。
// format-utils.js 与 app.js 分开加载，芯片能画出来就说明这个文件确定是新的——
// 把「点」也绑在这里，就不受 app.js 里其它监听器、注册顺序、异常中断的影响。
// 兜底 toast 自己实现：即使 window.toast 因为加载顺序还没就绪，用户也能看到反馈。
(function initFilePathChipActions() {
  if (window.__cwFilePathClick) return;
  const PREVIEW_EXT = [".html", ".htm", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".pdf"];
  const TEXT_EXT = [".txt", ".json", ".md", ".csv", ".log", ".yml", ".yaml", ".xml", ".py", ".js", ".mjs"];
  const ARCHIVE_EXT = [".zip", ".rar", ".7z", ".tar", ".gz", ".tgz", ".bz2", ".xz"];
  let lastHit = { path: "", at: 0 }; // 行内事件 + 委托事件会各触发一次，350ms 内同路径只处理一次

  // DIAG_20261113：壳的渲染进程开不了 devtools，前端只能自己把事实报给服务端
  // （runtime/client-diag.jsonl）。排查完可整段删掉。
  function cwDiag(stage, data) {
    try {
      fetch("/api/client-diag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage, data: data || null }),
      }).catch(() => {});
    } catch {}
  }
  window.__cwDiag = cwDiag;
  setTimeout(() => {
    try {
      const chips = [...document.querySelectorAll("a.cw-file-link")];
      const first = chips[0] || null;
      let hit = null;
      if (first) {
        const r = first.getBoundingClientRect();
        const el = (r.width && r.height) ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
        hit = el ? `${el.tagName}.${el.className}`.slice(0, 60) : "offscreen";
      }
      cwDiag("boot", {
        chips: chips.length,
        hasClickFn: typeof window.__cwFilePathClick === "function",
        hasToast: typeof window.toast === "function",
        hasPreview: typeof window.showPreview === "function",
        hasPanel: typeof window.ensureAssetsPanel === "function",
        inline: first ? !!first.getAttribute("onclick") : null,
        hit,
      });
      // 无声自检：对真实芯片发一次合成点击，只验证「事件能不能送到处理器」，不执行任何动作。
      if (first) {
        window.__cwProbe = true;
        window.__cwProbeHit = null;
        first.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
        window.__cwProbe = false;
        cwDiag("probe", { fired: !!window.__cwProbeHit, detail: window.__cwProbeHit, hit });
      }
    } catch (err) {
      cwDiag("boot-err", { msg: String((err && err.message) || err) });
    }
  }, 2600);

  function notify(msg, tone) {
    try {
      if (typeof window.toast === "function") { window.toast(msg, tone); return; }
    } catch {}
    try {
      const bar = document.createElement("div");
      bar.textContent = msg;
      bar.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:99999;"
        + "padding:9px 16px;border-radius:8px;font:13px/1.5 'Microsoft YaHei UI',sans-serif;color:#fff;"
        + "box-shadow:0 10px 28px rgb(0 0 0 / 22%);background:" + (tone === "err" ? "#a01f18" : "#26262a");
      document.body.appendChild(bar);
      setTimeout(() => bar.remove(), 2600);
    } catch {}
  }

  function extOf(p) {
    const m = String(p).match(/(\.[A-Za-z0-9]+)$/);
    return m ? m[1].toLowerCase() : "";
  }

  async function postReveal(p, mode) {
    const r = await fetch("/api/reveal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: p, mode: mode || "select" }),
    });
    return r.ok;
  }

  function pathOf(el) {
    if (!el || !el.getAttribute) return "";
    return el.getAttribute("data-path") || "";
  }

  window.__cwFilePathClick = async function (el, ev) {
    if (window.__cwProbe) { // 自检模式：只证明事件到手，不做任何动作
      window.__cwProbeHit = { path: pathOf(el), type: ev && ev.type, tag: el && el.tagName };
      return false;
    }
    if (ev && ev.preventDefault) ev.preventDefault();
    if (ev && ev.stopPropagation) ev.stopPropagation();
    const p = pathOf(el);
    if (!p) return false;
    const now = Date.now();
    if (lastHit.path === p && now - lastHit.at < 350) return false;
    lastHit = { path: p, at: now };
    const name = p.split(/[\\/]/).filter(Boolean).pop() || p;
    const ext = extOf(p);
    cwDiag("click", { p, ext, via: ev && ev.type ? ev.type : "direct" });
    try {
      const d = await fetch(`/api/file-stat?path=${encodeURIComponent(p)}`).then((r) => r.json());
      cwDiag("stat", { p, ok: !!(d && d.ok), err: d && d.error, dir: d && d.dir });
      if (!d || !d.ok) { notify((d && d.error) || `找不到这个文件：${p}`, "err"); return false; }
      if (d.dir) {
        await postReveal(p, "open");
        notify(`已打开文件夹：${name}`, "ok");
        return false;
      }
      if (PREVIEW_EXT.concat(TEXT_EXT).includes(ext) && typeof window.showPreview === "function") {
        if (typeof window.ensureAssetsPanel === "function") window.ensureAssetsPanel();
        window.showPreview({
          path: p, abs: p, name, ext, size: d.size,
          chatPath: true,
          serveUrl: `/api/chat-file?path=${encodeURIComponent(p)}`,
        });
        cwDiag("branch", { p, branch: "preview" });
        notify(`已在右侧预览：${name}`, "ok");
        return false;
      }
      // 压缩包：直接「打开」通常什么都不发生（没关联程序）→ 改成在资源管理器里选中，必有可见反应
      if (ARCHIVE_EXT.includes(ext)) {
        await postReveal(p, "select");
        cwDiag("branch", { p, branch: "archive-select" });
        notify(`已在文件夹中选中：${name}`, "ok");
        return false;
      }
      const ok = await postReveal(p, "open");
      cwDiag("branch", { p, branch: "open", ok });
      notify(ok ? `已用系统程序打开：${name}` : `打开失败：${name}`, ok ? "ok" : "err");
    } catch (err) {
      cwDiag("click-err", { p, msg: String((err && err.message) || err) });
      notify(`打开失败：${(err && err.message) || err}`, "err");
    }
    return false;
  };

  window.__cwFilePathReveal = function (el, ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    if (ev && ev.stopPropagation) ev.stopPropagation();
    const p = pathOf(el);
    if (!p) return false;
    postReveal(p, "select")
      .then((ok) => notify(ok ? "已打开所在文件夹" : "打开文件夹失败", ok ? "ok" : "err"))
      .catch((err) => notify(`打开文件夹失败：${(err && err.message) || err}`, "err"));
    return false;
  };
})();

function cwInline(text) {
  let s = escapeHtml(text);
  const slots = [];
  const stash = (html) => { slots.push(html); return "\x00I" + (slots.length - 1) + "I\x00"; };
  // 行内代码最先摘（防止其内容被后续规则改写）
  s = s.replace(/`([^`]+)`/g, (m, code) => stash(`<code class="cw-inline-code">${code}</code>`));
  // 链接 [t](url)
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (m, t, u) => stash(`<a href="${u}" target="_blank" rel="noopener">${t}</a>`));
  // 图片 ![alt](url) —— 在链接之前处理
  s = s.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g, (m, alt, u) => stash(`<img src="${u}" alt="${alt}" class="cw-md-img">`));
  // PATHLINK_20261113：本地绝对路径 → 可点芯片（D:\… 或 D:/…）。
  // 前导字符限定在空白/括号/冒号/箭头等边界上，避免把 https:// 里的 "s:/" 误认成路径；
  // 尾部遇到全角标点、右括号、空白即止（"…_清单.txt（打包清单：…）" 只取到 .txt）。
  s = s.replace(
    /(^|[\s(（\[【「>:：,，、])([A-Za-z]:[\\/][^\s"'`<>|*?，。；：！？、（）【】「」《》,;!()\[\]\x00]*)/g,
    (m, lead, p) => {
      const html = cwFilePathChip(p);
      return html ? lead + stash(html) : m;
    },
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  s = s.replace(/~~([^~]+)~~/g, "<del>$1</del>");
  let out = s.replace(/\x00I(\d+)I\x00/g, (m, i) => slots[Number(i)] ?? "");
  return out;
}

// 块级解析：把（已切掉代码段的）普通文本解析为 md 结构。
function cwMdBlocks(text) {
  const lines = String(text).replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  const isTableRow = (l) => /^\s*\|.*\|\s*$/.test(l);
  const isSepRow = (l) => /^\s*\|[\s:|-]+\|\s*$/.test(l) && /-/.test(l);
  const splitRow = (l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    // 表格：当前行是 |...| 且下一行是分隔行
    if (isTableRow(line) && i + 1 < lines.length && isSepRow(lines[i + 1])) {
      const header = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && isTableRow(lines[i])) { rows.push(splitRow(lines[i])); i++; }
      const th = header.map((h) => `<th>${cwInline(h)}</th>`).join("");
      const tr = rows.map((r) => "<tr>" + r.map((c) => `<td>${cwInline(c)}</td>`).join("") + "</tr>").join("");
      out.push(`<div class="cw-md-tablewrap"><table class="cw-md-table"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`);
      continue;
    }
    // 引用块（连续 > 行）
    if (/^\s*>\s?/.test(line)) {
      const q = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, "")); i++; }
      out.push(`<blockquote class="cw-md-quote">${cwInline(q.join("\n")).replace(/\n/g, "<br>")}</blockquote>`);
      continue;
    }
    // 列表（有序/无序，支持连续行；嵌套按缩进 2 空格一层简化为 flat 但保留层级缩进样式）
    const ulm = line.match(/^(\s*)[-*+]\s+(.*)$/);
    const olm = line.match(/^(\s*)\d+[.)]\s+(.*)$/);
    if (ulm || olm) {
      const ordered = !!olm;
      const items = [];
      while (i < lines.length) {
        const m2 = lines[i].match(/^(\s*)(?:[-*+]|\d+[.)])\s+(.*)$/);
        if (!m2) break;
        items.push({ indent: Math.floor(m2[1].length / 2), text: m2[2] });
        i++;
      }
      const tag = ordered ? "ol" : "ul";
      let html = `<${tag} class="cw-md-list">`;
      let curIndent = 0;
      for (const it of items) {
        while (it.indent > curIndent) { html += `<${tag} class="cw-md-list">`; curIndent++; }
        while (it.indent < curIndent) { html += `</${tag}>`; curIndent--; }
        html += `<li>${cwInline(it.text)}</li>`;
      }
      while (curIndent > 0) { html += `</${tag}>`; curIndent--; }
      html += `</${tag}>`;
      out.push(html);
      continue;
    }
    // 标题 #~######
    const hm = line.match(/^(#{1,6})\s+(.+)$/);
    if (hm) {
      const lv = Math.min(hm[1].length, 4);
      out.push(`<h${lv + 1} class="cw-md-h">${cwInline(hm[2])}</h${lv + 1}>`);
      i++;
      continue;
    }
    // 水平线
    if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) { out.push('<hr class="cw-md-hr">'); i++; continue; }
    // 普通段落：连续非空行合一段
    const para = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|\s*>|\s*[-*+]\s|\s*\d+[.)]\s|\s*\|)/.test(lines[i])) {
      para.push(lines[i]); i++;
    }
    out.push(`<p class="cw-md-p">${cwInline(para.join("\n")).replace(/\n/g, "<br>")}</p>`);
  }
  return out.join("");
}

function renderRich(text) {
  const parts = String(text).split(/```/);
  return parts
    .map((chunk, i) => {
      if (i % 2 === 1) {
        const langMatch = chunk.match(/^([a-zA-Z0-9_+-]*)\r?\n/);
        const lang = langMatch ? langMatch[1] : "";
        const body = langMatch ? chunk.slice(langMatch[0].length) : chunk;
        return `<div class="cw-codeblock"><div class="cw-codeblock-bar"><span class="cw-codeblock-lang">${escapeHtml(lang || "代码")}</span><button type="button" class="cw-codeblock-copy" data-code="${encodeURIComponent(body)}">复制代码</button></div><pre class="cw-code">${cwHighlightCode(body.replace(/\n$/, ""), lang)}</pre></div>`;
      }
      // MDRICH_20261111：完整 md 块级渲染（表格/列表/引用/标题/链接/删除线/高亮）
      return cwMdBlocks(chunk);
    })
    .join("");
}

function formatCompactTokens(n) {
  const v = Number(n) || 0;
  if (v < 1000) return String(Math.round(v));
  if (v < 1e6) { const x = v / 1000; return `${x >= 100 ? Math.round(x) : Math.round(x * 10) / 10}K`; }
  const m = v / 1e6; return `${m >= 100 ? Math.round(m) : Math.round(m * 10) / 10}M`;
}

function fmtCredit(n) {
  const v = Number(n) || 0;
  if (v >= 10000) {
    const w = v / 10000;
    return `${w >= 100 ? Math.round(w) : Math.round(w * 10) / 10}万`;
  }
  return v.toLocaleString("zh-CN");
}

function fmtResetTime(ms) {
  if (!ms) return "";
  const d = new Date(Number(ms));
  if (Number.isNaN(d.getTime())) return "";
  const p = (x) => String(x).padStart(2, "0");
  const now = new Date();
  const sameDay = d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  const hm = `${p(d.getHours())}:${p(d.getMinutes())}`;
  return sameDay ? hm : `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${hm}`;
}

function formatNum(n) {
  const v = Number(n) || 0;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
}

function formatTime(ts) {
  const value = Number(ts) || 0;
  if (!value) return "—";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function formatBytes(size) {
  const n = Number(size) || 0;
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function relativeTime(ts) {
  const value = Number(ts) || 0;
  if (!value) return "";
  const diff = Date.now() - value;
  if (diff < 0) return "刚刚";
  const min = Math.floor(diff / 60000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min}分钟前`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h}小时前`;
  const day = Math.floor(h / 24);
  if (day < 30) return `${day}天前`;
  const mon = Math.floor(day / 30);
  if (mon < 12) return `${mon}个月前`;
  return `${Math.floor(mon / 12)}年前`;
}
