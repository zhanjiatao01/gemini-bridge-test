// Claude 中文工作台 - 前端接线（Phase 1）
// 只负责界面与本地桥接服务通信，不接触任何密钥。

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const threadEl = $(".cw-thread");
const textarea = $(".cw-composer textarea");
const sendBtn = $(".cw-send");
const statusPill = $(".cw-status-pill");
const chatSub = $(".cw-chat-sub");
const modelChip = $(".cw-model");
const newChatBtn = $(".cw-new-chat");
const composerTop = $(".cw-composer-top");
const firstThread = $(".cw-thread-list button small");
const projectPath = $("#cw-project-path");
const projectName = $("#cw-project-name");
const runtimeElectron = $("#cw-runtime-electron");
const statusModel = $("#cw-status-model");
const statusProxy = $("#cw-status-proxy");
const statusCli = $("#cw-status-cli");
const statusPool = $("#cw-status-pool"); // POOLCAP_20261021：独立一行显示并行内核 n/上限
const statusPermission = $("#cw-status-permission");
const statusBudget = $("#cw-status-budget");
const statusAutoCompact = $("#cw-status-autocompact");
const statusTurns = $("#cw-status-turns");
const statusCwd = $("#cw-status-cwd");
const attachmentsEmpty = $("#cw-attachments-empty");
const stopBtn = $(".cw-stop");
const modelSelect = $("#cw-model-select");
const restartBtn = $("#cw-restart-btn");
const statusUpstream = $("#cw-status-upstream");
const statusLast = $("#cw-status-last");
const queueList = $("#cw-queue-list");
const queueSummary = $("#cw-queue-summary");
const queueClearBtn = $("#cw-queue-clear");
const assetGrid = $("#cw-asset-grid");
const assetsSummary = $("#cw-assets-summary");
const historyList = $("#cw-history-list");
const historySummary = $("#cw-history-summary");
const aboutModal = $("#cw-about-modal");
const aboutBody = $("#cw-about-body");
const helpBtn = $('.cw-title-actions button[aria-label="帮助"]');
const browserHost = $("#cw-browser-host");
const browserUrlInput = $("#cw-browser-url");
const browserStatusEl = $("#cw-browser-status");
const browserBackBtn = $("#cw-browser-back");
const browserForwardBtn = $("#cw-browser-forward");
const browserReloadBtn = $("#cw-browser-reload");

// composer 工具栏
const addBtn = $("#cw-add-btn");
const addMenu = $("#cw-add-menu");
const historyBtn = $("#cw-history-btn");
const enhanceBtn = $("#cw-enhance-btn"); // ENHPROMPT_20261114
const composerModel = $("#cw-composer-model");
const addImageChip = $("#cw-add-image-chip");
// @文件
const atPop = $("#cw-at-pop");
const atList = $("#cw-at-list");
// 产物预览
const previewBox = $("#cw-preview-box");
const previewActions = $("#cw-preview-actions");
const previewOpen = $("#cw-preview-open");
const previewReveal = $("#cw-preview-reveal");
const previewDownload = $("#cw-preview-download");
const previewBrowser = $("#cw-preview-browser"); // H1-2：在内置浏览器打开（HTML/图片/PDF 时显示）
// 头部
const headSearch = $("#cw-head-search");
const headNew = $("#cw-head-new");
const headHistory = $("#cw-head-history");
const headDocs = $("#cw-head-docs");
const bell = $("#cw-bell");
const bellDot = $("#cw-bell-dot");
const settingsBtn = $("#cw-settings-btn");
// 设置弹窗
const settingsModal = $("#cw-settings-modal");
const settingsModel = $("#cw-settings-model");
const settingsCwd = $("#cw-settings-cwd");
const settingsBaseUrl = $("#cw-settings-baseurl");
const settingsClose = $("#cw-settings-close");
const settingsCancel = $("#cw-settings-cancel");
const settingsSave = $("#cw-settings-save");
const settingsBrowserMcp = $("#cw-settings-browser-mcp");
const settingsBrowserMode = $("#cw-settings-browser-mode"); // CHROMEMCP_20261115
const settingsComputerUse = $("#cw-settings-computer-use"); // COMPUTERUSE_20261115
const settingsComputerDryRun = $("#cw-settings-computer-dryrun"); // COMPUTERUSE_20261115
const settingsToolScope = $("#cw-settings-toolscope"); // TOOLSCOPE_20261021：只读展示内核收到的工具清单
const settingsSound = $("#cw-settings-sound");
const settingsBudgetMinutes = $("#cw-settings-budget-minutes");
const settingsBudgetSteps = $("#cw-settings-budget-steps");
const settingsBudgetOutput = $("#cw-settings-budget-output");
const settingsAutoCompact = $("#cw-settings-autocompact");
// 权限下拉 / 风险确认
const permBtn = $("#cw-perm-btn");
const permMenu = $("#cw-perm-menu");
const permLabel = $("#cw-perm-label");
const effortBtn = $("#cw-effort-btn");
const effortMenu = $("#cw-effort-menu");
const effortLabel = $("#cw-effort-label");
const riskModal = $("#cw-risk-modal");
const riskAck = $("#cw-risk-ack");
const riskClose = $("#cw-risk-close");
const riskCancel = $("#cw-risk-cancel");
const riskConfirm = $("#cw-risk-confirm");
// 底部计量条
const meterTurns = $("#cw-meter-turns");
const meterSpeed = $("#cw-meter-speed");
const meterTokens = $("#cw-meter-tokens");
const meterCache = $("#cw-meter-cache");
const meterCost = $("#cw-meter-cost");
// TURNLIVE_20261025：本轮时长/进度/剩余片（对齐 DeepSeek Harness 的「本轮 8:45 ~44% 预计 04:40」）
const meterLive = $("#cw-meter-live");
const meterLiveText = $("#cw-meter-live-text");
// CONTEXTMETER_20261019：上下文占用环
const ctxMeter = $("#cw-ctxmeter");
const ctxTrigger = $("#cw-ctx-trigger");
const ctxPanel = $("#cw-ctx-panel");
const ctxRing = $("#cw-ctx-ring");
const ctxPercent = $("#cw-ctx-percent");
const ctxBig = $("#cw-ctx-big");
const ctxFigures = $("#cw-ctx-figures");
const ctxSegSystem = $("#cw-ctx-seg-system");
const ctxSegTools = $("#cw-ctx-seg-tools");
const ctxSegMessages = $("#cw-ctx-seg-messages");
const ctxSystem = $("#cw-ctx-system");
const ctxTools = $("#cw-ctx-tools");
const ctxMessages = $("#cw-ctx-messages");
// 右侧用量统计
const uTodayCalls = $("#cw-u-today-calls");
const uTodayIn = $("#cw-u-today-in");
const uTodayOut = $("#cw-u-today-out");
const uTotalTok = $("#cw-u-total-tok");
const uHit = $("#cw-u-hit");
const uCost = $("#cw-u-cost");
// QUOTA_20261017：智谱套餐额度
const quotaLevel = $("#cw-quota-level");
const quota5Pct = $("#cw-quota-5-pct");
const quota5Bar = $("#cw-quota-5-bar");
const quota5Meta = $("#cw-quota-5-meta");
const quotaWPct = $("#cw-quota-w-pct");
const quotaWBar = $("#cw-quota-w-bar");
const quotaWMeta = $("#cw-quota-w-meta");
const quotaCard = $("#cw-quota-card");

let currentPermission = "fullAccess"; // 默认完全权限（用户要求：不用每次手动点允许）
let currentEffort = "medium";
let pendingPermission = null;
let currentBrowserMcp = true; // 服务端当前内置浏览器 MCP 状态（保存时对比决定是否切换）
let currentBrowserMode = "builtin"; // CHROMEMCP_20261115：builtin/chrome
let currentComputerUse = false; // COMPUTERUSE_20261115：电脑操作开关（服务端当前值）
let currentComputerDryRun = false; // COMPUTERUSE_20261115：演练模式
// NOOUTPUTCAP_20261021 / OUTPUTCAP1M_20261021：默认 1000000（1M），与服务端 DEFAULT_TURN_BUDGET 对齐，
// 避免设置面板首次打开时把服务端的值显示成 32000 并反手写回去。
let currentTurnBudget = { maxDurationMs: 120 * 60 * 1000, maxSteps: 600, maxOutputTokens: 1000000 };
let currentAutoCompact = "180000";

let pending = [];
let currentAssistant = null;
let busy = false;
// SWITCHRACE_20261111：setActiveView 切回"生成中的标签"时，threadEl 已被清空、
// currentAssistant 已置 null，随后有一个 await fetch(transcript) 的异步窗口。
// 这个窗口里到达的 delta/tool/thinking_delta 事件会命中 forActive=true → appendDelta/
// ensureAssistant 直接在半初始化的 DOM 上建孤儿气泡，与紧随其后的 transcript 渲染叠加
// （内容重复/秒表重数/工具记录消失）。加两个守卫：
//   switchTranscriptLoading —— 转写加载窗口，流式事件一律转投后台缓冲（v.buf）；
//   activeExpectedKernelId —— setActiveView 开始时就登记目标内核，事件归属不符也转缓冲。
let switchTranscriptLoading = false;
let activeExpectedKernelId = null;
let connected = false;
let turnStartAt = 0;
// LIVEMETER_20261017：进行中轮次的实时统计（底部计量条），思考/出字/调工具全程更新；
// 轮末用 /api/usage 的精确值回填覆盖。tok/s 为流式字符估算（≈），result 后是精确值。
let liveTurn = null;
let currentTurnTtft = null; // TTFT_20261017：本轮首字延迟（ms），随结果行展示
let thinkingStartAt = 0;
// TURNLIVE_20261025：典型轮长先验（ms）= /api/usage recentAvgDurationMs（最近完成轮均值），
// refreshUsage 心跳刷新；estimateTurnProgress 拿它当进度分母，0 表示尚无历史（回退杀极限预算）。
let typicalTurnMs = 0;
let thinkingTimer = null;
let sessionChip = null;
let turnCount = 0;
let displayModel = "GLM-5.3";
let poolMaxLive = 0; // POOLCAP_20261021：服务端并行内核上限（快照 maxLive），用于状态栏「n/5」显示
let currentView = "chat";
let currentRightPanel = "browser";
let readingHistory = null;
let lastHealth = null;
let lastSentText = "";
let lastTranscript = [];
let transcriptHidden = 0;
// AUTOCONTINUE_STOP_20261021：预算到限后服务端排了一次自动续跑，界面此时是「空闲」的。
// 这个标志让停止按钮在窗口期仍然可用，不会因为 !busy 直接 return。
let autoContinuePending = false;
let activeDraftSession = null;
// DRAFTKEY_20261021：空白标签此前一律落到 "wb.draft.current"，多个未发送标签共用一份草稿，
// 切标签时互相覆盖。有 sessionId 的按会话存，没有的按标签 key 存。
function draftKey() {
  const sid = readingHistory ? readingHistory.sessionId : currentSessionId || (lastHealth && lastHealth.sessionId);
  if (sid) return "wb.draft." + sid;
  return "wb.draft.view." + (activeViewKey || "current");
}
function saveDraft() { try { localStorage.setItem(draftKey(), textarea ? textarea.value : ""); } catch {} }

/* VIEWSTATE_20261021：附件与自动续跑状态跟着标签走。
   全局 pending/contextFiles 曾是单份——在 A 标签贴的图会随 B 标签的消息一起发出去。
   切台时把当前标签的存回 view，再把目标标签的装回全局并重建 chip。 */
function stashViewState(v) {
  if (!v) return;
  v.pending = pending.slice();
  v.contextFiles = contextFiles.slice();
  v.autoContinue = autoContinuePending;
  // ISOLATE_20261021：产物范围 / 右侧面板 / 预览项也随标签存回
  v.artScope = artScope;
  v.panel = currentRightPanel;
  v.preview = activePreview;
}
function applyViewState(v) {
  pending = v && Array.isArray(v.pending) ? v.pending.slice() : [];
  contextFiles = v && Array.isArray(v.contextFiles) ? v.contextFiles.slice() : [];
  autoContinuePending = Boolean(v && v.autoContinue);
  applyScopedPanelState(v);
  if (composerTop) {
    $$(".cw-mini-chip[data-pending], .cw-file-chip[data-ctx]", composerTop).forEach((c) => c.remove());
    pending.forEach((item, i) => { if (item) appendImageChip(item, i); });
    contextFiles.forEach((c, i) => { if (c) appendFileChip(c, i); });
  }
  if (attachmentsEmpty) {
    attachmentsEmpty.classList.toggle("cw-hidden", pending.some(Boolean) || contextFiles.some(Boolean));
  }
}
/* ISOLATE_20261021：把目标标签自己的「产物范围 / 右侧面板 / 预览项」装回全局并重画。
   这几个以前是单份全局状态：A 会话选了「全部」或预览了 a.html，切到 B 会话还是一样的画面。
   注意 applyRightPanel 内部会写 currentRightPanel 并触发面板刷新，这里要先设全局再调用。 */
function applyScopedPanelState(v) {
  artScope = v && v.artScope === "all" ? "all" : v && v.artScope === "session" ? "session" : artScopeDefault;
  const scopeBtns = $$("#cw-art-scope .cw-dev-btn");
  scopeBtns.forEach((b) => b.classList.toggle("is-active", b.dataset.scope === artScope));

  activePreview = v ? v.preview : null;
  if (activePreview) showPreview(activePreview);
  else resetPreview();

  const panel = (v && v.panel) || "browser";
  if (insModeNow() === "open") {
    if (panel !== currentRightPanel) applyRightPanel(panel);
    else if (panel === "assets") loadProducts();
  } else if (v) {
    v.panel = panel; // 面板收着：只记下选择，等展开时再切
  }
}
function resetPreview() {
  if (previewBox) previewBox.innerHTML = `<div class="cw-preview-empty">点击下方文件，在这预览音视频 / 图片 / 网页。</div>`;
  if (previewActions) previewActions.classList.add("cw-hidden");
}
function restoreDraft() {
  if (!textarea) return;
  try { textarea.value = localStorage.getItem(draftKey()) || ""; } catch { textarea.value = ""; }
  textarea.dispatchEvent(new Event("input"));
}
let contextFiles = []; // 文本文件上下文：{path, name, content}
let atState = null; // {items, sel, start, query}
let activePreview = null; // 当前预览 {path, name, ext}
let notifications = []; // 通知记录
let documentHidden = false;

/* ---------- 多会话标签（内核池） ----------
   每个标签 = 一条会话视图：
   - attached：服务端有活跃内核（kernelId），SSE 事件按 kernelId 路由到该标签；
   - detached：只读历史存档（发首条消息时自动 --resume 续接挂载）；
   - new：空白未发送标签（首次发送时 spawn 全新内核）。
   busy/turnStartAt/currentSessionId 等全局变量始终描述「当前激活的标签」。 */
const sessionViews = new Map(); // key -> view
let activeViewKey = null;
let newTabSeq = 0;

/* ---------- MULTIWIN_20261115：多窗口身份与归属路由 ----------
   每窗口加载同一前端（?wid=<id>[&sid=<sessionId>]），共享内核池。
   归属=本窗口挂载的视图；attachView 经 win:claim 上报，主进程广播注册表。
   他窗内核：不建视图、不弹权限窗，只更新侧栏状态点。 */
const mwParams = new URLSearchParams(location.search);
const windowId = mwParams.get("wid") || "main";
const bootSessionId = mwParams.get("sid") || null;
let isMainWindow = true;
let otherWindows = []; // windows:changed 快照（含自己）
let claimNextKernel = false; // 本窗口正在发送/挂载，等待认领新内核
function mwOwnedByOther(msg) {
  if (!msg || !otherWindows.length) return false;
  return otherWindows.some((w) => w.wid !== windowId && (
    (msg.kernelId && Array.isArray(w.kernels) && w.kernels.includes(msg.kernelId)) ||
    (msg.sessionId && w.sid === msg.sessionId)
  ));
}
function mwClaim(v) {
  try {
    const cd = window.claudeDesktop;
    // 节流键=kernelId+sessionId：attachView 时 sessionId 尚未到达（SSE 才带），
    // sid 到达后必须再报一次，否则注册表 sid 永远为空、他窗聚焦路由失效。
    const tag = (v.kernelId || "") + ":" + (v.sessionId || "");
    if (cd && cd.winClaim && v && v.kernelId && v._mwClaimed !== tag) {
      v._mwClaimed = tag;
      cd.winClaim(v.sessionId || null, v.kernelId);
    }
  } catch {}
}
function mwApplyRole() {
  document.body.classList.toggle("mw-subwindow", !isMainWindow);
  // D6：副窗口无内置浏览器面板
  const bt = document.querySelector('.cw-tab[data-panel="browser"]');
  // P7-⑤_SUBWINBROWSER_20261117：副窗也开放内置浏览器面板（视图由 main hostWin 挂到本窗）
  if (bt) bt.style.display = "";
  const bc = document.querySelector('[data-panel-content="browser"]');
  if (bc && !isMainWindow) bc.classList.remove("cw-hidden");
}
function mwPruneForeignViews() {
  let changed = false;
  for (const v of [...sessionViews.values()]) {
    if (v.key === activeViewKey) continue;
    if (v.kernelId && otherWindows.some((w) => w.wid !== windowId && Array.isArray(w.kernels) && w.kernels.includes(v.kernelId))) {
      sessionViews.delete(v.key);
      changed = true;
    }
  }
  if (changed) renderSessionTabs();
}
function mwInit() {
  const cd = window.claudeDesktop;
  if (!cd || !cd.winList) return;
  const apply = (list) => {
    otherWindows = Array.isArray(list) ? list : [];
    const me = otherWindows.find((w) => w.wid === windowId);
    if (me) isMainWindow = !!me.main;
    mwApplyRole();
    mwPruneForeignViews();
  };
  cd.winList().then(apply).catch(() => {});
  if (cd.onWindowsChanged) cd.onWindowsChanged(apply);
}
function mwOpenInNewWindow(sessionId) {
  const cd = window.claudeDesktop;
  if (!cd || !cd.winOpenSession || !sessionId) return;
  cd.winOpenSession(sessionId).then(() => {
    // 本窗口释放该视图（会话在新窗口续接）；若是活动视图则落到其余视图或空白
    const v = findViewBySessionId(sessionId);
    if (v) {
      const wasActive = activeViewKey === v.key;
      sessionViews.delete(v.key);
      if (wasActive) {
        const next = [...sessionViews.values()][0];
        if (next) setActiveView(next.key); else openNewTab();
      }
      renderSessionTabs();
      persistTabs();
    }
    toast("已在新窗口打开", "ok");
  }).catch(() => toast("新窗口打开失败", "err"));
}
function activeView() { return sessionViews.get(activeViewKey) || null; }
function makeView(init) {
  const v = {
    key: init.key,
    kernelId: init.kernelId || null,
    sessionId: init.sessionId || null,
    title: init.title || "",
    busy: Boolean(init.busy),
    done: false, // 后台完成标记（切回即清除）
    detached: Boolean(init.detached),
    turns: init.turns || 0,
    cwd: init.cwd || null, // WORKTREE_20261018：空白标签绑定的工作树目录（首条消息挂载时随 /api/session/new 下发）
    buf: null, // 后台生成中的流式缓冲 {text,think,tools,startedAt}（切回重放，包1「切回不丢」）
    // VIEWSTATE_20261021：这些以前是全局单份，切标签就串台——A 标签贴的图会随 B 标签的消息
    // 发出去，A 的自动续跑窗口会让 B 的停止按钮亮着。现在按标签各存一份，切台时装卸。
    pending: [], // 待发图片（与全局 pending 同步）
    contextFiles: [], // 待发文本上下文（与全局 contextFiles 同步）
    autoContinue: false, // 该会话是否处于"已排程自动续跑"窗口
    artifacts: null, // 本轮产物基线 Map（每标签独立，后台轮次也能正确比出新增产物）
    // ISOLATE_20261021：右侧面板的「看什么」也按标签各存一份，否则 A 标签切到产物面板、
    // 选了「全部」范围或预览了某个文件，切到 B 标签仍是同一份 → 表现为各会话共用。
    panel: null, // 该标签停留的右侧面板（null = 跟随全局默认 browser）
    artScope: null, // 该标签的产物范围 "session" | "all"（null = 跟全局偏好）
    preview: undefined, // 该标签的预览项（undefined = 未决定，null = 明确没预览）
    _ownerKey: null, // 上次上报给主进程的浏览器归属键（见 rekeyView）
  };
  v._ownerKey = v.kernelId || v.key;
  sessionViews.set(v.key, v);
  return v;
}
/* ISOLATE_20261021：会话归属键在 attach / 内核重启时会变（new:3 → k:xxx，k:a → k:b），
   主进程里已经开着的标签要跟着改名，否则变成无人认领的孤儿。
   这里缓存每个标签上一次上报给主进程的键，键变了就通知改名。 */
function ownerKeyOf(v) { return v ? v.kernelId || v.key || null : null; }
function reownerBrowser(from, to) {
  const bapi = browserApi();
  if (!bapi || !bapi.reowner || !from || !to || from === to) return;
  bapi.reowner(from, to).then(renderBrowserState).catch(() => {});
}
function rekeyView(v, nextKey) {
  if (v.key === nextKey) { v._ownerKey = ownerKeyOf(v); return; }
  const prevOwner = v._ownerKey || v.key;
  sessionViews.delete(v.key);
  v.key = nextKey;
  sessionViews.set(v.key, v);
  const nextOwner = ownerKeyOf(v);
  v._ownerKey = nextOwner;
  if (prevOwner && nextOwner && prevOwner !== nextOwner) reownerBrowser(prevOwner, nextOwner);
}
function findViewByKernelId(kernelId) {
  if (!kernelId) return null;
  for (const v of sessionViews.values()) if (v.kernelId === kernelId) return v;
  return null;
}
function findViewBySessionId(sessionId) {
  if (!sessionId) return null;
  for (const v of sessionViews.values()) if (v.sessionId === sessionId) return v;
  return null;
}
function persistTabs() {
  try {
    // TABBAROFF_20261114：顶部标签栏已移除（体验对齐 WorkBuddy，会话走左侧列表切换）。
    // wb.tabs 不再用于「开一堆标签页」，只留单个激活项做断线重连用。
    const cur = activeView();
    const tabs = cur ? [{
      sessionId: cur.sessionId,
      title: cur.title,
      detached: !cur.kernelId,
      kernelId: cur.kernelId || null,
    }] : [];
    sessionStorage.setItem("wb.tabs", JSON.stringify({ tabs, active: activeViewKey })); // MULTIWIN：按窗口隔离（localStorage 同源共享会互踩）
  } catch {}
}

/* ---------- 会话中心侧栏：状态点与高亮的轻量同步（不重建列表） ---------- */

// 更新某会话在侧栏的实时状态点；行还不存在（新会话未落历史）时回退全量重建。
function updateSidebarLive(v) {
  const listEl = $("#cw-task-list");
  if (!listEl || !v || !v.sessionId) return;
  const row = listEl.querySelector(`.wb-task-item[data-sid="${v.sessionId}"]`);
  if (!row) {
    loadTaskList();
    return;
  }
  row.querySelectorAll(".wb-live-dot").forEach((d) => d.remove());
  row.classList.remove("is-live-busy", "is-live-done");
  const dot = document.createElement("span");
  dot.className = "wb-live-dot" + (v.busy ? " is-busy" : v.done ? " is-done" : "");
  dot.title = v.busy ? "生成中" : v.done ? "已完成，点击查看" : "";
  row.prepend(dot);
  if (v.busy) row.classList.add("is-live-busy");
  else if (v.done) row.classList.add("is-live-done");
}

// 当前会话在侧栏的高亮跟随切换（DOM-only）。
let lastAnchoredSid = null; // SIDEBARP2：只在当前行变化时才滚动/闪烁，避免流式期间反复拉滚动条
function syncSidebarActive() {
  const activeId = (readingHistory && readingHistory.sessionId) || currentSessionId || null;
  let activeRow = null;
  document.querySelectorAll("#cw-task-list .wb-task-item").forEach((r) => {
    const on = Boolean(activeId) && r.dataset.sid === activeId;
    r.classList.toggle("is-active", on);
    if (on) activeRow = r;
  });
  if (activeRow && activeRow.dataset.sid !== lastAnchoredSid) {
    lastAnchoredSid = activeRow.dataset.sid;
    activeRow.scrollIntoView({ block: "nearest" });
    activeRow.classList.remove("wb-flash");
    void activeRow.offsetWidth; // 重启动画
    activeRow.classList.add("wb-flash");
  }
}

// 首轮结束后自动 AI 起名（每会话一次；已有手动标题/起名失败都静默跳过）。
const autoTitled = new Set();
const autoTitleRetry = new Map(); // 失败重试用（记为下次轮末再试的轮次），成功后永久进 autoTitled
function maybeAutoTitle(v) {
  if (!v || !v.sessionId || autoTitled.has(v.sessionId)) return;
  // AUTOTITLE_20261021：旧条件 (turns === 1) 太严——首轮被预算/中断掐断时 turns 直接跳到 2，
  // 自动起名永远不触发，侧栏长期显示「会话 01eee62a」或整段提示词。
  // 改为：首轮结果落地后（turns >= 1）就试；失败则在 3 轮内再试一次，之后不再打扰。
  const turns = v.turns || 0;
  if (turns < 1) return;
  const retryAt = autoTitleRetry.get(v.sessionId);
  if (retryAt && turns < retryAt) return;
  if ((wsCache.chats[v.sessionId] || {}).title) return;
  autoTitled.add(v.sessionId);
  const sid = v.sessionId;
  fetch("/api/auto-title", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId: sid }),
  })
    .then((r) => r.json().catch(() => ({})))
    .then((out) => {
      if (out && out.ok !== false && out.title) {
        const vv = findViewBySessionId(sid);
        if (vv) vv.title = out.title;
        loadTaskList();
        renderSessionTabs();
        return;
      }
      // 失败放开重试：autoTitled 先删掉，记「第 turns+2 轮再试一次」，不刷屏也不放弃
      autoTitled.delete(sid);
      autoTitleRetry.set(sid, turns + 2);
    })
    .catch(() => {
      autoTitled.delete(sid);
      autoTitleRetry.set(sid, turns + 2);
    });
}

/* ---------- 工具函数 ---------- */
// FORMATUTIL_20261021：escapeHtml / renderRich / format* / fmt* / relativeTime 已迁至 format-utils.js
// （index.html 在本文件之前加载该脚本，顶层函数声明全局可见）。

/* ---------- 滚动：粘底跟随 ----------
   之前流式期间每帧无条件 scrollTop=scrollHeight，用户往上翻会被立刻拽回底部，
   表现为"聊天画面不能上下滑动"。现在只在用户本来就停在底部附近时才自动跟随；
   用户向上翻动即暂停跟随，并提供"回到最新"按钮跳回。 */
let stickToBottom = true;
let jumpLatestBtn = null;

function nearBottom() {
  if (!threadEl) return true;
  return threadEl.scrollHeight - threadEl.scrollTop - threadEl.clientHeight < 48;
}

function scrollToEnd(force) {
  if (!threadEl) return;
  if (!force && !stickToBottom) {
    updateJumpLatest();
    return;
  }
  threadEl.scrollTop = threadEl.scrollHeight;
  updateJumpLatest();
}

function updateJumpLatest() {
  if (!jumpLatestBtn || !threadEl) return;
  jumpLatestBtn.classList.toggle("cw-hidden", stickToBottom || threadEl.children.length === 0);
}

let iconsScheduled = false;
function refreshIcons() {
  if (iconsScheduled) return;
  iconsScheduled = true;
  queueMicrotask(() => {
    iconsScheduled = false;
    if (!(window.lucide && typeof window.lucide.createIcons === "function")) return;
    try { window.lucide.createIcons(); } catch {}
    // lucide 生成的 SVG 会带 data-lucide 属性，导致下次 createIcons 把全文档图标
    // 拆掉重建（会话越长越卡，工具调用密集时界面明显顿挫）。替换完就摘掉标记，
    // 后续调用只处理新增图标。
    document.querySelectorAll("svg[data-lucide]").forEach((s) => s.removeAttribute("data-lucide"));
  });
}

function setStatus(text, tone) {
  if (!statusPill) return;
  statusPill.textContent = text;
  statusPill.dataset.tone = tone || "";
}

// STATUSPILL_20261021：连接正常却一直停在「正在连接本地服务…」的根因是 es.onopen 只置了
// connected 标志、快照也只在「池里零会话」时写徽标——只要开着会话，徽标就永远停在初始文案。
// 这里统一收口：SSE 一连上就按当前模型写「已连接」，特殊状态（启动中/预算/压缩）仍由各自分支覆盖。
function markConnected() {
  const av = typeof activeView === "function" ? activeView() : null;
  const model = (av && (av.displayModel || av.model)) || displayModel;
  setStatus(`${model} · 本地服务已连接`, "ok");
}

function setRunState(el, text, tone) {
  if (!el) return;
  el.textContent = text;
  el.dataset.tone = tone || "";
}

// FINDINSESSION_20261111：会话内搜索（Ctrl+F）。搜索条覆盖在消息区顶部，
// 输入即搜：高亮所有命中（只处理已定稿的 .cw-stable 与用户气泡文本节点），
// 上下按钮/回车跳转命中点并滚动到视口中央；Esc 关闭并清除高亮。
let findBarEl = null;
let findHits = [];
let findIdx = -1;

function findClearHighlights() {
  threadEl.querySelectorAll("mark.cw-find-hit").forEach((m) => {
    const parent = m.parentNode;
    if (!parent) return;
    parent.replaceChild(document.createTextNode(m.textContent), m);
    parent.normalize();
  });
  findHits = [];
  findIdx = -1;
}

function findRun(keyword) {
  findClearHighlights();
  if (!keyword || keyword.length < 2) return;
  const walker = document.createTreeWalker(threadEl, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !node.nodeValue.includes(keyword)) return NodeFilter.FILTER_REJECT;
      const mark = node.parentElement && node.parentElement.closest("mark,script,style,textarea");
      return mark ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  const targets = [];
  while (walker.nextNode()) targets.push(walker.currentNode);
  for (const node of targets) {
    const v = node.nodeValue;
    let idx = v.indexOf(keyword);
    let frag = document.createDocumentFragment();
    let last = 0;
    while (idx >= 0) {
      frag.appendChild(document.createTextNode(v.slice(last, idx)));
      const mark = document.createElement("mark");
      mark.className = "cw-find-hit";
      mark.textContent = v.slice(idx, idx + keyword.length);
      frag.appendChild(mark);
      last = idx + keyword.length;
      idx = v.indexOf(keyword, last);
    }
    frag.appendChild(document.createTextNode(v.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }
  findHits = [...threadEl.querySelectorAll("mark.cw-find-hit")];
}

function findJump(dir) {
  if (!findHits.length) return;
  findIdx = (findIdx + (dir === "prev" ? -1 : 1) + findHits.length) % findHits.length;
  findHits.forEach((m, i) => m.classList.toggle("cw-find-cur", i === findIdx));
  const el = findHits[findIdx];
  const r = el.getBoundingClientRect();
  const view = threadEl.closest(".cw-thread-scroll") || threadEl.parentElement;
  view.scrollBy({ top: r.top - view.getBoundingClientRect().top - view.clientHeight / 2, behavior: "smooth" });
}

function openFindBar() {
  if (findBarEl) { findBarEl.querySelector("input").focus(); findBarEl.querySelector("input").select(); return; }
  const anchor = threadEl.closest(".cw-thread-scroll") || threadEl.parentElement;
  if (!anchor) return;
  if (getComputedStyle(anchor).position === "static") anchor.style.position = "relative";
  findBarEl = document.createElement("div");
  findBarEl.className = "cw-find-bar";
  findBarEl.innerHTML = `
    <input type="text" placeholder="会话内搜索…（回车下一个，Shift+回车上一个，Esc 关闭）" />
    <span class="cw-find-count">0</span>
    <button type="button" data-find="prev" title="上一个 (Shift+回车)">↑</button>
    <button type="button" data-find="next" title="下一个 (回车)">↓</button>
    <button type="button" data-find="close" title="关闭 (Esc)">×</button>`;
  anchor.appendChild(findBarEl);
  const input = findBarEl.querySelector("input");
  const count = findBarEl.querySelector(".cw-find-count");
  let debounce = 0;
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      findRun(input.value.trim());
      count.textContent = findHits.length ? `${findIdx + 1 || 1}/${findHits.length}` : "0";
      if (findHits.length) findJump("next");
    }, 220);
  });
  const doFind = (dir) => {
    if (!findHits.length && input.value.trim().length >= 2) { findRun(input.value.trim()); }
    findJump(dir);
    count.textContent = findHits.length ? `${findIdx + 1}/${findHits.length}` : "0";
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); doFind(e.shiftKey ? "prev" : "next"); }
    if (e.key === "Escape") { e.preventDefault(); closeFindBar(); }
  });
  findBarEl.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-find]");
    if (!b) return;
    if (b.dataset.find === "close") closeFindBar();
    else doFind(b.dataset.find);
  });
  input.focus();
}

function closeFindBar() {
  findClearHighlights();
  if (findBarEl) { findBarEl.remove(); findBarEl = null; }
}

// CHANNELLABEL_20261114：渠道标签跟随实际渠道（此前硬编码「智谱官方」，切到通义仍显示智谱，误导）
const CHANNEL_LABELS = { zhipu: "智谱官方", qwen: "通义 Token Plan", deepseek: "DeepSeek", nim: "NIM · 免费", antling: "百灵", ernie: "文心", local: "本地 Ollama", acm: "ACM" };
let currentChannelLabel = "智谱官方";
function setChannelLabel(ch) {
  if (!ch) return;
  currentChannelLabel = CHANNEL_LABELS[ch] || String(ch);
  const note = document.querySelector(".cw-model-note");
  if (note) note.textContent = currentChannelLabel;
}
function setModel(next) {
  if (!next) return;
  displayModel = String(next);
  if (modelChip) modelChip.textContent = `${displayModel} · ${currentChannelLabel}`;
  if (statusModel) statusModel.textContent = displayModel;
  // 切换模型后右侧“上游模型”必须立刻跟上，否则要等下次打开关于面板才刷新。
  if (statusUpstream) statusUpstream.textContent = displayModel;
  // 标题栏模型名跟着走（原来是写死的 GLM-5.3，切到 flash 也不变，和输入框对不上）。
  const headerModel = $("#cw-header-model");
  if (headerModel) headerModel.textContent = `Claude Code · ${displayModel}`;
  // ANOMALY_20261115：状态徽标模型名随会话/模型切换同步（原来仅 markConnected 写一次，切台后停在旧模型，与标题/下拉不符）
  if (statusPill && statusPill.dataset.tone === "ok") statusPill.textContent = `${displayModel} · 本地服务已连接`;
}

function setTurns(next) {
  turnCount = Number(next) || 0;
  if (statusTurns) statusTurns.textContent = String(turnCount);
  const av = typeof activeView === "function" && activeView();
  if (av) av.turns = turnCount; // 同步当前标签视图的轮数
}

function setBudgetStatus(budget) {
  if (!statusBudget || !budget) return;
  const minutes = Math.round(Number(budget.maxDurationMs || 0) / 60000);
  const steps = Number(budget.maxSteps || 0);
  const output = Number(budget.maxOutputTokens || 0);
  if (minutes > 0 && steps > 0 && output > 0) statusBudget.textContent = `${minutes}m · ${steps} 步 · ${Math.round(output / 1000)}k`;
}

function setAutoCompactStatus(value) {
  if (!statusAutoCompact) return;
  const raw = String(value ?? "").trim().toLowerCase();
  if (raw === "auto") {
    statusAutoCompact.textContent = "自动";
    return;
  }
  const tokens = Number(raw);
  statusAutoCompact.textContent = Number.isFinite(tokens) && tokens > 0 ? `${Math.round(tokens / 1000)}k` : "—";
}

const PERMISSION_LABELS = {
  manual: "手动",
  acceptEdits: "自动编辑",
  plan: "计划",
  auto: "自动",
  fullAccess: "完全权限",
};
const EFFORT_LABELS = { low: "Low", medium: "Medium", high: "High", xhigh: "XHigh", max: "Max" };
let autoEffortTier = null; // AUTOEFFORT_20261017：Auto 模式下服务端判定的当前实际档位

function setPermissionUI(preset) {
  currentPermission = PERMISSION_LABELS[preset] ? preset : "acceptEdits";
  if (permLabel) permLabel.textContent = PERMISSION_LABELS[currentPermission];
  $$("#cw-perm-menu button").forEach((b) => b.classList.toggle("is-active", b.dataset.perm === currentPermission));
}

function setEffortUI(level) {
  const allowed = level === "auto" || Boolean(EFFORT_LABELS[level]);
  currentEffort = allowed ? level : "auto"; // AUTOEFFORT：默认 Auto
  if (effortLabel) {
    effortLabel.textContent = currentEffort === "auto"
      ? (autoEffortTier ? `Auto · ${EFFORT_LABELS[autoEffortTier] || autoEffortTier}` : "Auto")
      : EFFORT_LABELS[currentEffort];
    if (effortLabel) effortLabel.title = currentEffort === "auto"
      ? "自动档：按任务难度定档（干活 High，失败自动升 XHigh/Max，闲聊 Low）；点这里可手动固定"
      : "手动档：本会话固定此思考深度；点这里可切回 Auto";
  }
  $$("#cw-effort-menu button").forEach((b) => b.classList.toggle("is-active", b.dataset.effort === currentEffort));
}

/* CONTEXTMETER_20261019：上下文占用环。
   交互对齐 DeepSeek Harness：点触发器开合；点面板外部关闭；Esc 关闭；无数据整体不渲染。 */
const CTX_RING_R = 5.5;
const CTX_RING_C = 2 * Math.PI * CTX_RING_R;
let ctxPanelOpen = false;

function setCtxPanelOpen(next) {
  ctxPanelOpen = Boolean(next);
  if (ctxPanel) {
    ctxPanel.classList.toggle("cw-hidden", !ctxPanelOpen);
    // CTXINMETER_20261114：面板改为 fixed 定位，打开时按触发器位置对齐（右下角弹出）。
    if (ctxPanelOpen && ctxTrigger) {
      const r = ctxTrigger.getBoundingClientRect();
      const pw = 264, ph = ctxPanel.offsetHeight || 220;
      let x = r.right - pw;
      let y = r.top - ph - 10;
      if (x < 8) x = 8;
      if (y < 8) y = r.bottom + 10;
      ctxPanel.style.left = `${Math.round(x)}px`;
      ctxPanel.style.top = `${Math.round(y)}px`;
    }
  }
  if (ctxTrigger) ctxTrigger.setAttribute("aria-expanded", String(ctxPanelOpen));
}

function renderContextMeter(ctx) {
  if (!ctxMeter) return;
  // 上游尚未回报任何用量时整体隐藏（与上游 return null 同语义），避免显示 0% 误导。
  const ready = ctx && ctx.loaded && Number(ctx.contextWindow) > 0;
  ctxMeter.classList.toggle("cw-hidden", !ready);
  if (!ready) { setCtxPanelOpen(false); return; }
  const percent = Math.max(0, Math.min(100, Number(ctx.percent) || 0));
  if (ctxPercent) ctxPercent.textContent = `${percent}%`;
  // CTXWARN_20261112：上下文水位预警——>80% 变黄、>90% 变红 + 系统提示建议开新会话。
  // 阈值只提示一次（跨过 80/90 线才发），不刷屏；开新会话/切标签重置状态。
  {
    const ring = ctxRing;
    if (ring) ring.style.stroke = percent >= 90 ? "#e05540" : percent >= 80 ? "#e0a030" : "";
    const warnKey = `ctxwarn:${currentSessionId || "none"}`;
    if (percent >= 90 && !sessionStorage.getItem(warnKey + ":90")) {
      sessionStorage.setItem(warnKey + ":90", "1");
      addSystemNote(`上下文已用 ${percent}%——接近打满，模型质量会开始劣化。建议点「新建任务」开新会话（本会话产物与历史仍可从侧栏查看）。`, "warn");
    } else if (percent >= 80 && percent < 90 && !sessionStorage.getItem(warnKey + ":80")) {
      sessionStorage.setItem(warnKey + ":80", "1");
      addSystemNote(`上下文已用 ${percent}%——超过 80% 后长程记忆会逐渐变差，复杂任务建议换新会话。`, "warn");
    }
    if (percent < 70) {
      sessionStorage.removeItem(warnKey + ":80");
      sessionStorage.removeItem(warnKey + ":90");
    }
  }
  if (ctxRing) ctxRing.setAttribute("stroke-dasharray", `${(CTX_RING_C * percent) / 100} ${CTX_RING_C}`);
  if (ctxTrigger) ctxTrigger.setAttribute("aria-label", `上下文已用 ${percent}%`);
  if (ctxBig) ctxBig.textContent = `${percent}%`;
  if (ctxFigures) ctxFigures.textContent = `~${formatCompactTokens(ctx.usedTokens)} / ${formatCompactTokens(ctx.contextWindow)}`;
  const b = ctx.breakdown || { systemTokens: 0, toolsTokens: 0, messageTokens: 0 };
  const total = (Number(b.systemTokens) || 0) + (Number(b.toolsTokens) || 0) + (Number(b.messageTokens) || 0);
  // 分段宽度按「各段占已用量的比例」换算到整体百分比——与上游 width = percent * row / total 同口径。
  const seg = (v) => (total > 0 ? (percent * (Number(v) || 0)) / total : 0);
  if (ctxSegSystem) ctxSegSystem.style.width = `${seg(b.systemTokens)}%`;
  if (ctxSegTools) ctxSegTools.style.width = `${seg(b.toolsTokens)}%`;
  if (ctxSegMessages) ctxSegMessages.style.width = `${seg(b.messageTokens)}%`;
  // CONTEXTSPLIT_20261021：上游 init 帧没有系统提示正文、工具清单只有名字，那两层估出来恒为 0/百来
  // token。照实显示「~0」会让人误以为系统提示和工具定义不占上下文。缺失的层显示「未知」，并把
  // 这部分量老实归进「对话消息」（服务端已按 used - system - tools 算好），别伪造精确拆分。
  const unknown = new Set(Array.isArray(ctx.breakdownUnknown) ? ctx.breakdownUnknown : []);
  const cell = (el, key, tokens) => { if (el) el.textContent = unknown.has(key) ? "未计入（并入对话消息）" : `~${formatCompactTokens(tokens)}`; };
  cell(ctxSystem, "system", b.systemTokens);
  cell(ctxTools, "tools", b.toolsTokens);
  if (ctxMessages) ctxMessages.textContent = `~${formatCompactTokens(b.messageTokens)}`;
}

async function refreshContextMeter() {
  try {
    const d = await fetch("/api/context").then((r) => r.json());
    if (d && d.ok) renderContextMeter(d.context);
  } catch {}
}

function initContextMeterInteractions() {
  if (ctxTrigger) {
    ctxTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      setCtxPanelOpen(!ctxPanelOpen);
    });
  }
  // 点面板外部关闭（触发器自身已在 click 里 stopPropagation，不重复处理）
  document.addEventListener("click", (e) => {
    if (!ctxPanelOpen) return;
    if (ctxPanel && ctxPanel.contains(e.target)) return;
    if (ctxTrigger && ctxTrigger.contains(e.target)) return;
    setCtxPanelOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && ctxPanelOpen) setCtxPanelOpen(false);
  });
}

// JOBS_20261114：后台任务徽章/弹层（数据源 /api/queue：运行中/待发 + 最近完成）
let runningSids = new Set();
let jobsOpen = false;
async function refreshJobs() {
  const badge = $("#cw-jobs-badge");
  const badgeText = $("#cw-jobs-badge-text");
  const listEl = $("#cw-jobs-list");
  let d;
  try { d = await fetch("/api/queue").then((r) => r.json()); } catch { return; }
  const items = Array.isArray(d.items) ? d.items : [];
  const running = Number(d.running || 0);
  const pending = Number(d.pending || 0);
  const active = running + pending;
  runningSids = new Set(items.filter((i) => i.state === "running" || i.state === "pending").map((i) => i.sessionId).filter(Boolean));
  if (badge) {
    badge.classList.toggle("is-active", active > 0);
    if (badgeText) badgeText.textContent = active > 0 ? `后台 ${active}` : "空闲";
    badge.title = active > 0 ? `后台任务：${running} 运行中 · ${pending} 待发（点击查看）` : "后台任务（空闲，点击查看最近任务）";
  }
  if (!jobsOpen || !listEl) return;
  const activeRows = items.filter((i) => i.state === "running" || i.state === "pending");
  const recent = items
    .filter((i) => i.state === "done" || i.state === "error" || i.state === "interrupted" || i.state === "budget_exceeded")
    .sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0))
    .slice(0, 6);
  listEl.innerHTML = "";
  const mkSec = (t) => { const s = document.createElement("div"); s.className = "cw-jobs-sec"; s.textContent = t; listEl.appendChild(s); };
  const mkRow = (t) => {
    const r = document.createElement("div"); r.className = "cw-jobs-row";
    const label = String(t.label || "未命名任务").replace(/\s+/g, " ").slice(0, 70);
    const tone = t.state === "running" || t.state === "pending" ? "run" : t.state === "done" ? "ok" : t.state === "error" ? "err" : "warn";
    const st = t.state === "running" ? "运行中" : t.state === "pending" ? "待发" : t.state === "done" ? "完成" : t.state === "error" ? "失败" : "中断";
    r.innerHTML = `<div class="cw-jobs-main"><b></b><small></small></div><span class="cw-jobs-state" data-tone="${tone}">${st}</span>`;
    $("b", r).textContent = label;
    const dur = t.state === "running" ? fmtTurnDur(Math.max(0, (Date.now() - (t.startedAt || 0)) / 1000)) : t.durationMs ? fmtTurnDur(t.durationMs / 1000) : "";
    $("small", r).textContent = [t.sessionId ? "会话 " + String(t.sessionId).slice(0, 8) : "无会话", dur, t.toolSteps ? t.toolSteps + " 步" : ""].filter(Boolean).join(" · ");
    r.addEventListener("click", () => { closeJobs(); if (t.sessionId) openSessionTab(t.sessionId, label.slice(0, 20)); });
    listEl.appendChild(r);
  };
  if (activeRows.length) { mkSec("进行中"); activeRows.forEach(mkRow); }
  if (recent.length) { mkSec("最近完成"); recent.forEach(mkRow); }
  if (!activeRows.length && !recent.length) listEl.innerHTML = `<div class="cw-empty">暂无后台任务</div>`;
  refreshIcons();
}
function openJobs() {
  const pop = $("#cw-jobs-pop");
  const badge = $("#cw-jobs-badge");
  if (!pop || !badge) return;
  jobsOpen = true;
  pop.classList.remove("cw-hidden");
  refreshJobs();
  const r = badge.getBoundingClientRect();
  placeMenu(pop, Math.max(8, r.left - 140), r.bottom + 6);
}
function closeJobs() {
  jobsOpen = false;
  const pop = $("#cw-jobs-pop");
  if (pop) pop.classList.add("cw-hidden");
}
const jobsBadgeBtn = $("#cw-jobs-badge");
if (jobsBadgeBtn) jobsBadgeBtn.addEventListener("click", (e) => { e.stopPropagation(); jobsOpen ? closeJobs() : openJobs(); });
const jobsCloseBtn = $("#cw-jobs-close");
if (jobsCloseBtn) jobsCloseBtn.addEventListener("click", closeJobs);
document.addEventListener("click", (e) => {
  if (!jobsOpen) return;
  if (e.target.closest("#cw-jobs-pop") || e.target.closest("#cw-jobs-badge")) return;
  closeJobs();
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && jobsOpen) closeJobs(); });

// SHADOWCOST_20261114：影子计价（不花钱试算切到付费模型的账单），60s 节流。
let shadowLastFetch = 0;
let shadowChip = null;
function ensureShadowChip() {
  if (shadowChip) return shadowChip;
  if (!meterCost) return null;
  // 锚点只依赖 meterCost 的父级链（一定存在），不强依赖某个容器 id/class。
  const item = meterCost.parentElement;
  if (!item || !item.parentElement) return null;
  shadowChip = document.createElement("span");
  shadowChip.className = "cw-meter-item";
  shadowChip.id = "cw-meter-shadow";
  shadowChip.style.cursor = "help";
  item.parentElement.appendChild(shadowChip);
  return shadowChip;
}
function refreshShadowCost() {
  const now = Date.now();
  if (now - shadowLastFetch < 60000) return;
  shadowLastFetch = now;
  fetch("/api/shadow-cost").then((r) => r.json()).then((d) => {
    if (!d || !d.ok || !Array.isArray(d.models) || !d.models.length) return;
    const chip = ensureShadowChip();
    if (!chip) return;
    const top = d.models[0];
    chip.textContent = `影子 ${top.label} ¥${Number(top.window).toFixed(0)}/近30天`;
    chip.title = d.models.map((m) =>
      `${m.label}：今日 ¥${Number(m.today).toFixed(2)} · 近30天 ¥${Number(m.window).toFixed(0)} · 折算 ¥${Number(m.month30).toFixed(0)}/月`
    ).join("\n") + `\n\n${d.note}\n倍率 ${d.rate}x，样本 ${d.basis.activeDays} 个活跃日 / ${d.basis.calls} 次调用`;
  }).catch(() => {});
}

async function refreshUsage() {
  try {
    const d = await fetch("/api/usage").then((r) => r.json());
    if (!d || !d.ok) return;
    // TURNLIVE_20261025：缓存典型轮长先验，供 estimateTurnProgress 的进度/ETA 用
    if (d.recentAvgDurationMs != null) typicalTurnMs = Number(d.recentAvgDurationMs) || 0;
    // METERSESS_20261021：三个数字片此前一直是全局累计（d.turns 是壳启动以来的总轮次），
    // 与旁边按会话显示的 tok/费用不同口径，读起来像「本会话 4 轮」其实是全局 189 步。
    // 有当前会话时先不写，交给下面 session-stats 的按会话口径覆盖；无会话才回退全局。
    if (meterTurns) {
      meterTurns.textContent = `${d.turns} 轮 · ${d.steps} 步`;
      meterTurns.title = `全局累计（壳启动以来）：${d.turns} 轮 · ${d.steps} 步`;
    }
    if (meterSpeed && d.lastDurationMs && d.lastOutputTokens) {
      const tps = d.lastOutputTokens / (d.lastDurationMs / 1000);
      meterSpeed.textContent = `${Math.round(tps)} tok/s`;
    }
    if (meterTokens) meterTokens.textContent = `${formatNum(d.totals.totalTokens)} tok`;
    if (meterCache) meterCache.textContent = `缓存命中 ${(d.totals.hitRate * 100).toFixed(0)}%`;
    if (meterCost) meterCost.textContent = `¥${Number(d.totals.cost).toFixed(4)}`;
    // METERSESS_20261017：右侧三个数据改显当前会话，全局累计移到悬停提示（用户要求"看到当前的数据"）
    const sidNow = currentSessionId || (lastHealth && lastHealth.sessionId) || null;
    if (sidNow) {
      fetch(`/api/session-stats?id=${encodeURIComponent(sidNow)}`).then((r) => r.json()).then((sd) => {
        if (!sd || sd.ok === false || !Number(sd.turns) && !Number(sd.totalTokens)) return;
        const den = (Number(sd.inputTokens) || 0) + (Number(sd.cacheReadTokens) || 0) + (Number(sd.cacheCreateTokens) || 0);
        const hit = den > 0 ? (Number(sd.cacheReadTokens) || 0) / den : 0;
        if (meterTurns) {
          // METERSESS_20261021：按会话口径覆盖全局值（步数全局才有，会话口径只给轮次）
          meterTurns.textContent = `${Number(sd.turns) || 0} 轮`;
          meterTurns.title = `当前会话 ${Number(sd.turns) || 0} 轮（全局 ${d.turns} 轮 · ${d.steps} 步）`;
        }
        if (meterTokens) {
          meterTokens.textContent = `${formatNum(sd.totalTokens)} tok`;
          meterTokens.title = `当前会话（全局累计 ${formatNum(d.totals.totalTokens)} tok）`;
        }
        if (meterCache) {
          meterCache.textContent = `缓存命中 ${(hit * 100).toFixed(0)}%`;
          meterCache.title = `当前会话（全局 ${(d.totals.hitRate * 100).toFixed(0)}%）`;
        }
        if (meterCost) {
          meterCost.textContent = `¥${Number(sd.cost).toFixed(4)}`;
          meterCost.title = `当前会话（全局 ¥${Number(d.totals.cost).toFixed(4)}）`;
        }
      }).catch(() => {});
    }
    if (uTodayCalls) uTodayCalls.textContent = `${d.today.calls} 次`;
    if (uTodayIn) uTodayIn.textContent = formatNum(d.today.inputTokens);
    if (uTodayOut) uTodayOut.textContent = formatNum(d.today.outputTokens);
    if (uTotalTok) uTotalTok.textContent = formatNum(d.totals.totalTokens);
    if (uHit) uHit.textContent = `${(d.totals.hitRate * 100).toFixed(1)}%`;
    if (uCost) uCost.textContent = `¥${Number(d.totals.cost).toFixed(4)}`;
    refreshQuota(); // QUOTA：蹭 5s 心跳，内部 30s 节流 + 面板不可见跳过
    refreshShadowCost(); // SHADOWCOST_20261114：60s 节流，动态追加影子计价片
  } catch {}
}

/* QUOTA_20261017：套餐额度（智谱官方用量）。客户端 30s 节流（服务端同款缓存），
   挂在 refreshUsage 的 5s 心跳上蹭车；展示口径对齐官方用量统计页：百分比 + 积分 + 重置时间。 */
let quotaLastFetch = 0;
let quotaToken = 0;
function renderQuotaItem(pctEl, barEl, metaEl, q) {
  if (!pctEl || !barEl || !metaEl) return;
  if (!q) { pctEl.textContent = "—"; metaEl.textContent = "无数据"; return; }
  const pct = Number(q.percentage);
  pctEl.textContent = Number.isFinite(pct) ? `${pct}%` : "—";
  barEl.style.width = `${Math.max(0, Math.min(100, Number.isFinite(pct) ? pct : 0))}%`;
  barEl.classList.toggle("is-warn", pct >= 80 && pct < 95);
  barEl.classList.toggle("is-hot", pct >= 95);
  const parts = [`已用 ${fmtCredit(q.used)} / ${fmtCredit(q.usage)} 积分`];
  const reset = fmtResetTime(q.resetAt);
  if (reset) parts.push(`重置 ${reset}`);
  metaEl.textContent = parts.join(" · ");
}
async function refreshQuota(force) {
  if (!quotaCard) return;
  // 面板不可见时不白拉（状态面板折叠/切走时跳过；force 例外）
  if (!force && quotaCard.offsetParent === null) return;
  const now = Date.now();
  if (!force && now - quotaLastFetch < 30000) return;
  quotaLastFetch = now;
  const token = ++quotaToken;
  try {
    const d = await fetch("/api/quota").then((r) => r.json());
    if (token !== quotaToken) return;
    if (!d || d.ok === false) {
      const msg = `读取失败${d && d.error ? `：${d.error}` : ""}`;
      if (quota5Meta) quota5Meta.textContent = msg;
      if (quotaWMeta) quotaWMeta.textContent = msg;
      if (quotaCard) quotaCard.title = `额度读取失败（30 秒后重试）${d && d.error ? `：${d.error}` : ""}`;
      return;
    }
    if (quotaLevel) quotaLevel.textContent = d.level ? ` · ${d.level}` : "";
    renderQuotaItem(quota5Pct, quota5Bar, quota5Meta, d.fiveHours);
    renderQuotaItem(quotaWPct, quotaWBar, quotaWMeta, d.weekly);
    if (quotaCard) quotaCard.title = `智谱官方用量 · 更新于 ${new Date(d.fetchedAt || Date.now()).toLocaleTimeString("zh-CN", { hour12: false })}（30 秒缓存）`;
  } catch {}
}

// 会话级设置（包4）：当前视图有活跃内核时走 /api/kernel-settings（只重启该会话内核，不丢上下文）。
// 返回 true = 已按会话处理（无论成败）；false = 无活跃内核，调用方回退全局接口。
async function tryKernelSetting(body) {
  const v = activeView();
  if (!v || !v.kernelId) {
    // 空白标签（内核未起）：暂存为该标签的会话级设置，内核挂载后自动补投。
    // 绝不回退全局接口——否则换模型会扇出重启所有内核，别的窗口跟着变。
    if (v) {
      v.pendingSettings = { ...(v.pendingSettings || {}), ...body };
      toast("已记录，本会话启动时生效（仅当前会话）");
    }
    return true;
  }
  try {
    const r = await fetch("/api/kernel-settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, kernelId: v.kernelId }),
    }).then((x) => x.json());
    if (r && r.ok) {
      // H2_20261020：把会话级真实值缓存到视图（切台回显用）。绝不写 modelSelect/settingsModel——
      // 那两个是全局入口的选择器，会话级选择污染它们，正是「一换模型其他对话也跟着换」的显示根因之一。
      cacheViewSettings(v, r);
      toast("已切换（仅当前会话，不影响其他会话）");
      return true;
    }
    toast((r && r.error) || "切换失败", "err");
    return true;
  } catch {
    toast("切换失败", "err");
    return true;
  }
}

async function applyPermission(preset) {
  if (permMenu) permMenu.classList.add("cw-hidden");
  if (preset === currentPermission) return;
  // H2_20261020：tryKernelSetting 恒 true（见其注释），无全局 /api/permission 回退分支——
  // 权限是会话级概念，扇出改全局只会把别的会话也拖下水。标签回显由视图缓存接管（applyViewControls）。
  await tryKernelSetting({ permissionPreset: preset });
  setPermissionUI(preset);
}

async function applyEffort(level) {
  if (effortMenu) effortMenu.classList.add("cw-hidden");
  if (level === currentEffort) return;
  // H2_20261020：同 applyPermission——无全局 /api/effort 回退，思考强度按会话处理。
  await tryKernelSetting({ effort: level });
  setEffortUI(level);
}

function setRuntimeInfo(info) {
  if (!info) return;
  if (info.turnBudget && typeof info.turnBudget === "object") {
    currentTurnBudget = { ...currentTurnBudget, ...info.turnBudget };
    setBudgetStatus(currentTurnBudget);
  }
  if (info.autoCompact) {
    currentAutoCompact = String(info.autoCompact);
    setAutoCompactStatus(currentAutoCompact);
  }
  setModel(info.displayModel || info.model);
  if (info.baseUrl && statusProxy) {
    statusProxy.textContent = info.baseUrl.replace(/^https?:\/\//, "");
    statusProxy.dataset.tone = "ok";
  }
  if (runtimeElectron) runtimeElectron.textContent = info.electron ? `Electron ${info.electron}` : "Electron";
  if (info.workDir) {
    if (projectPath) projectPath.textContent = info.workDir;
    // PROJECTNAME_20261021：标题写死「Claude Code 工作区」，切换工作目录后仍是旧的。
    // 取目录名显示，路径放在下面的 projectPath 里。
    if (projectName) {
      const base = String(info.workDir).replace(/[\\/]+$/, "").split(/[\\/]/).pop();
      if (base) projectName.textContent = base;
    }
    if (statusCwd) statusCwd.textContent = `工作目录：${info.workDir}`;
    if (chatSub) {
      const second = $$("span", chatSub)[1];
      if (second) second.textContent = `权限 ${info.permissionMode || "plan"} · ${info.workDir}`;
    }
  }
}

async function loadRuntime() {
  const api = window.claudeDesktop;
  if (!api || typeof api.getRuntime !== "function") {
    try {
      const info = await fetch("/api/health").then((res) => res.json());
      setRuntimeInfo({
        displayModel: info.displayModel || info.model,
        baseUrl: info.baseUrl,
        workDir: info.cwd,
        permissionMode: info.permissionMode,
        turnBudget: info.turnBudget,
        autoCompact: info.autoCompact,
      });
      setRunState(statusPermission, info.permissionMode || "plan", "ok");
      setTurns(info.turns);
      if (runtimeElectron) runtimeElectron.textContent = "浏览器预览（非 Electron 外壳）";
    } catch {
      if (runtimeElectron) runtimeElectron.textContent = "运行时读取失败";
    }
    return;
  }
  try {
    setRuntimeInfo(await api.getRuntime());
  } catch {
    setRunState(statusProxy, "读取失败", "warn");
  }
}

let currentSessionId = null;
let costChip = null;
let costChipToken = 0;
const sessionStatsCache = { at: 0, map: {} };
function setSession(id) {
  if (!chatSub || !id) return;
  currentSessionId = id;
  if (!sessionChip) {
    sessionChip = document.createElement("span");
    sessionChip.className = "cw-session-chip";
    chatSub.appendChild(sessionChip);
  }
  sessionChip.textContent = `会话 ${String(id).slice(0, 8)}`;
  sessionChip.title = `session_id: ${id}`;
  refreshCostChip(id);
}

// 会话头部「累计费用」小片：累计 ¥x · N tok（随会话切换 / 每轮结束刷新）。
// 不动 cw-status-pill 的状态文案；旧会话无记录时不渲染，避免噪音。
function renderCostChip(st) {
  if (!chatSub) return;
  if (!st || !Number(st.turns)) {
    if (costChip) { costChip.remove(); costChip = null; }
    return;
  }
  if (!costChip) {
    costChip = document.createElement("span");
    costChip.className = "cw-session-chip cw-cost-chip";
    chatSub.appendChild(costChip);
  }
  costChip.textContent = `累计 ¥${Number(st.cost).toFixed(4)} · ${formatNum(st.totalTokens)} tok`;
  costChip.title = `本会话累计：${st.turns} 轮 · 输入 ${formatNum(st.inputTokens)} / 输出 ${formatNum(st.outputTokens)} tok · 缓存命中 ${(Number(st.hitRate) * 100).toFixed(0)}%`;
}
async function refreshCostChip(sessionId) {
  const sid = sessionId || (readingHistory && readingHistory.sessionId) || currentSessionId || (lastHealth && lastHealth.sessionId) || null;
  if (!sid || !chatSub) return;
  const token = ++costChipToken;
  try {
    const d = await fetch(`/api/session-stats?id=${encodeURIComponent(sid)}`).then((r) => r.json());
    if (token !== costChipToken) return; // 只认最新一次请求，防止旧响应覆盖
    if (!d || d.ok === false) return;
    renderCostChip(d);
  } catch {}
}
// 侧栏整表统计：30s 内存缓存，避免每次切视图都全量扫 usage.jsonl。
function sessionStatsMap() {
  if (Date.now() - sessionStatsCache.at < 30000 && sessionStatsCache.map) return Promise.resolve(sessionStatsCache.map);
  return fetch("/api/session-stats").then((r) => r.json()).then((d) => {
    if (d && d.ok !== false && d.stats && typeof d.stats === "object") {
      sessionStatsCache.at = Date.now();
      sessionStatsCache.map = d.stats;
      return d.stats;
    }
    return {};
  }).catch(() => ({}));
}

// IMGCHIP_20261017：附件图片大图预览（点击遮罩/Esc 关闭）
function showImageLightbox(src, name) {
  let lb = $("#cw-img-lightbox");
  if (!lb) {
    lb = document.createElement("div");
    lb.id = "cw-img-lightbox";
    lb.className = "cw-img-lightbox";
    lb.innerHTML = `<img alt=""><div class="cw-img-lightbox-cap"></div>`;
    lb.addEventListener("click", () => lb.classList.add("cw-hidden"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lb && !lb.classList.contains("cw-hidden")) {
        e.stopPropagation();
        lb.classList.add("cw-hidden");
      }
    });
    // 必须挂在应用根节点内——CSS 都写在 #claude-workbench-mock 选择器下，挂 body 上样式不命中（等于隐形）
    (document.getElementById("claude-workbench-mock") || document.body).appendChild(lb);
  }
  $("img", lb).src = src;
  $(".cw-img-lightbox-cap", lb).textContent = name || "";
  lb.classList.remove("cw-hidden");
}

// COPYFALLBACK_20261021：壳内 navigator.clipboard.writeText 常因权限/非安全上下文被拒，
// 五处「复制」原来都直接 toast「复制失败」。统一走 copyText：先试异步剪贴板，失败退到
// execCommand("copy") 的隐藏 textarea（Electron 里这一路稳定可用）。
async function copyText(text) {
  const s = String(text == null ? "" : text);
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(s);
      return true;
    }
  } catch {}
  try {
    const ta = document.createElement("textarea");
    ta.value = s;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;left:-9999px;top:0;opacity:0;";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, s.length);
    const ok = document.execCommand("copy");
    ta.remove();
    return !!ok;
  } catch { return false; }
}

// TOASTSTACK_20261021：旧实现只有一个 .cw-toast，后一条直接覆盖前一条（多标签连续
// 「后台完成 / 预算到限」只剩最后一条可读）。改为最多同时 3 条的堆栈，超出的挤掉最旧一条。
const TOAST_MAX = 3;
function toast(message, tone) {
  let stack = $(".cw-toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "cw-toast-stack";
    document.body.appendChild(stack);
  }
  const el = document.createElement("div");
  el.className = "cw-toast";
  el.textContent = message;
  el.dataset.tone = tone || "";
  stack.appendChild(el);
  while (stack.childElementCount > TOAST_MAX) stack.firstElementChild.remove();
  requestAnimationFrame(() => el.classList.add("is-open"));
  el.__timer = setTimeout(() => {
    el.classList.remove("is-open");
    setTimeout(() => el.remove(), 220); // 等过渡结束再摘 DOM，避免堆栈跳动
  }, 4200);
  el.addEventListener("click", () => { clearTimeout(el.__timer); el.remove(); });
  el.style.pointerEvents = "auto"; // 单条可点掉（栈本身仍穿透）
}

/* ASKTEXT_20261017：Electron 不支持 window.prompt（点了没反应的根因），
   用自绘输入弹窗替代：确定/取消/Enter/Esc/点遮罩关闭。 */
function askText(message, defaultValue) {
  return new Promise((resolve) => {
    const ov = document.createElement("div");
    ov.className = "cw-ask-ov";
    ov.innerHTML = `<div class="cw-ask"><div class="cw-ask-msg"></div><input class="cw-ask-in" type="text"><div class="cw-ask-btns"><button class="cw-ghost-btn cw-ask-cancel" type="button">取消</button><button class="cw-ghost-btn cw-ask-ok" type="button">确定</button></div></div>`;
    $(".cw-ask-msg", ov).textContent = message;
    const input = $(".cw-ask-in", ov);
    if (defaultValue) input.value = defaultValue;
    const done = (v) => { ov.remove(); document.removeEventListener("keydown", onKey, true); resolve(v); };
    const onKey = (ev) => {
      if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); done(null); }
      else if (ev.key === "Enter") { ev.preventDefault(); ev.stopPropagation(); done(input.value); }
    };
    $(".cw-ask-ok", ov).addEventListener("click", () => done(input.value));
    $(".cw-ask-cancel", ov).addEventListener("click", () => done(null));
    ov.addEventListener("mousedown", (ev) => { if (ev.target === ov) done(null); });
    document.addEventListener("keydown", onKey, true);
    document.body.appendChild(ov);
    input.focus();
    if (defaultValue) input.select();
  });
}

// ENHPROMPT_20261114：增强结果预览弹层。textarea 可手动微调，「采用」回填输入框并聚焦。
function showEnhancePreview(text) {
  const ov = document.createElement("div");
  ov.className = "cw-enhance-ov";
  ov.innerHTML = `
    <div class="cw-enhance">
      <div class="cw-enhance-head"><strong>增强后的提示词</strong><button class="cw-enhance-close" type="button" aria-label="关闭">✕</button></div>
      <textarea class="cw-enhance-out" spellcheck="false"></textarea>
      <div class="cw-enhance-foot">
        <span class="cw-enhance-hint">可直接编辑微调；采用后替换输入框内容</span>
        <div class="cw-enhance-btns">
          <button class="cw-enhance-retry" type="button">重新增强</button>
          <button class="cw-enhance-apply is-primary" type="button">采用</button>
        </div>
      </div>
    </div>`;
  const out = $(".cw-enhance-out", ov);
  out.value = text;
  const close = () => { ov.remove(); document.removeEventListener("keydown", onKey, true); };
  const onKey = (ev) => {
    if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); close(); }
    else if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) {
      ev.preventDefault(); ev.stopPropagation();
      applyText(out.value);
    }
  };
  const applyText = (v) => {
    const t = String(v || "").trim();
    if (!t) { toast("内容为空", "warn"); return; }
    textarea.value = t;
    textarea.dispatchEvent(new Event("input"));
    close();
    textarea.focus();
    toast("已采用增强提示词", "ok");
  };
  $(".cw-enhance-close", ov).addEventListener("click", close);
  ov.addEventListener("mousedown", (ev) => { if (ev.target === ov) close(); });
  $(".cw-enhance-apply", ov).addEventListener("click", () => applyText(out.value));
  $(".cw-enhance-retry", ov).addEventListener("click", async () => {
    // 重新增强：以输入框原始草稿（用户可能已改回）为准
    const src = (textarea.value || "").trim();
    if (!src) { toast("输入框已空，无法重新增强", "warn"); return; }
    const btn = $(".cw-enhance-retry", ov);
    btn.disabled = true; btn.textContent = "增强中…";
    try {
      const res = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: src }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) throw new Error(data.error || `HTTP ${res.status}`);
      out.value = data.text || "";
    } catch (err) {
      toast(`增强失败：${(err && err.message) || err}`, "err");
    } finally {
      btn.disabled = false; btn.textContent = "重新增强";
    }
  });
  document.addEventListener("keydown", onKey, true);
  document.body.appendChild(ov);
  out.focus();
}

/* ---------- 渲染 ---------- */

let lastUserOrdinal = 0; // POLISH_20261018：当前线程已渲染的用户消息数（编辑重发按序号定位用）
function addUserMessage(text, images, at, userIndex) {
  const article = document.createElement("article");
  article.className = "cw-message cw-user-message";
  // REWIND_20261017：记录消息时刻与原文，供「就地编辑→回退重发」定位原生会话档。
  // POLISH_20261018：再加「第 N 条用户消息」序号——服务端按序号定位，时间戳只做校验。
  article.dataset.at = String(Number(at) || Date.now());
  article.dataset.origText = text || "";
  if (Number(userIndex) >= 1) {
    article.dataset.userIndex = String(Number(userIndex));
    lastUserOrdinal = Math.max(lastUserOrdinal, Number(userIndex));
  } else {
    lastUserOrdinal += 1; // 实时发送：接在已渲染序号之后
    article.dataset.userIndex = String(lastUserOrdinal);
  }
  const bubble = document.createElement("div");
  bubble.className = "cw-user-bubble";
  const textNode = document.createElement("div");
  textNode.textContent = text || "";
  bubble.appendChild(textNode);
  if (images && images.length) {
    const row = document.createElement("div");
    row.className = "cw-attach-row";
    for (const img of images) {
      const chip = document.createElement("span");
      chip.className = "cw-mini-chip";
      // MSGIMAGES_20261018：历史消息的图片此前是死标签（无点击、无图源），点了没反应。
      // 有 url 时画缩略图并绑定大图预览；旧记录没有图源则退化为原来的灰标签。
      // IMGFIX_20261113：刚发送的消息拿到的是待发对象（有 data 无 url），旧判断直接落到
      // 「无图源」灰标签分支 —— 用户反馈「我发的图打不开」。这里就地用 base64 生成
      // data URL，缩略图与大图预览一并可用，和历史消息表现一致。
      const imgSrc = (img && img.url)
        || (img && img.data ? `data:${img.media_type || "image/png"};base64,${img.data}` : null);
      if (imgSrc) {
        chip.classList.add("cw-mini-chip--img");
        chip.title = `点击预览：${img.source || img.name || "图片"}`;
        chip.innerHTML = `<img class="cw-mini-thumb" alt=""><span>${escapeHtml(img.source || img.name || "图片")}</span>`;
        const thumb = $(".cw-mini-thumb", chip);
        if (thumb) thumb.src = imgSrc;
        chip.addEventListener("click", () => showImageLightbox(imgSrc, img.source || img.name));
      } else {
        chip.innerHTML = `<i data-lucide="image" aria-hidden="true"></i>${escapeHtml((img && img.name) || "图片")}`;
      }
      row.appendChild(chip);
    }
    bubble.appendChild(row);
  }
  // TIME_20261017：消息时间戳（HH:MM）；回放历史用记录时刻，实时发送用当下。
  const shown = new Date(Number(at) || Date.now());
  const timeChip = document.createElement("div");
  timeChip.className = "cw-user-time";
  timeChip.textContent = `${String(shown.getHours()).padStart(2, "0")}:${String(shown.getMinutes()).padStart(2, "0")}`;
  bubble.appendChild(timeChip);
  article.appendChild(bubble);
  const acts = document.createElement("span");
  acts.className = "wb-acts cw-user-acts";
  acts.innerHTML = `<button class="wb-act" data-uact="edit" type="button" title="编辑并重发"><i data-lucide="pencil" aria-hidden="true"></i></button><button class="wb-act" data-uact="copy" type="button" title="复制"><i data-lucide="copy" aria-hidden="true"></i></button>`;
  acts.addEventListener("click", (e) => {
    const act = e.target.closest("[data-uact]");
    if (!act) return;
    e.stopPropagation();
    if (act.dataset.uact === "edit") {
      // REWIND_20261017：豆包式就地编辑——直接在气泡里改，保存后从这条消息处回退重发。
      startUserMessageEdit(article);
    } else {
      copyText(text || "").then((ok) => toast(ok ? "已复制" : "复制失败", ok ? undefined : "err"));
    }
  });
  article.appendChild(acts);
  threadEl.appendChild(article);
  // 用户自己发的消息：无论当前停在哪都跳到底部。
  scrollToEnd(true);
  refreshIcons();
  return article;
}

// REWIND_20261017：豆包式就地编辑——气泡原地变编辑框，保存后从这条消息处回退重发。
// 服务端 /api/session/rewind 负责截断原生会话档 + 壳历史档，并 --resume 后发新文本。
function startUserMessageEdit(article) {
  if (!article || article.querySelector(".cw-user-editbox")) return;
  const bubble = $(".cw-user-bubble", article);
  if (!bubble) return;
  const orig = article.dataset.origText || "";
  const saved = document.createElement("div"); // 暂存原内容，取消时原样还原
  while (bubble.firstChild) saved.appendChild(bubble.firstChild);
  const box = document.createElement("div");
  box.className = "cw-user-editbox";
  const ta = document.createElement("textarea");
  ta.className = "cw-user-edit-text";
  ta.value = orig;
  const row = document.createElement("div");
  row.className = "cw-user-edit-acts";
  const save = document.createElement("button");
  save.type = "button";
  save.className = "cw-ghost-btn is-primary";
  save.textContent = "保存并重发";
  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "cw-ghost-btn";
  cancel.textContent = "取消";
  const restore = () => {
    box.remove();
    while (saved.firstChild) bubble.appendChild(saved.firstChild);
    refreshIcons();
  };
  cancel.addEventListener("click", restore);
  ta.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { e.stopPropagation(); restore(); }
    else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); save.click(); }
  });
  save.addEventListener("click", async () => {
    const next = ta.value.trim();
    if (!next) { toast("内容不能为空", "warn"); return; }
    const v = activeView();
    if (!v || (!v.kernelId && !v.sessionId)) { toast("会话未挂载，无法回退重发", "err"); return; }
    if (v.busy) { toast("该会话生成中请先停止，再编辑重发", "warn"); return; }
    save.disabled = true;
    try {
      // 历史标签没有活跃内核时先挂载（--resume 续接），再回退。
      if (!v.kernelId && v.sessionId) {
        const o = await fetch("/api/session/open", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: v.sessionId }),
        }).then((r) => r.json()).catch(() => null);
        if (!o || o.ok === false) { toast((o && o.error) || "会话挂载失败", "err"); save.disabled = false; return; }
        attachView(v, o.kernelId);
      }
      const res = await fetch("/api/session/rewind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kernelId: v.kernelId || undefined,
          sessionId: v.sessionId || undefined,
          at: Number(article.dataset.at) || 0,
          userIndex: Number(article.dataset.userIndex) || 0, // POLISH_20261018：第 N 条用户消息，服务端按此定位
          origText: orig,
          text: next,
          images: [],
        }),
      }).catch((err) => { toast(`回退请求失败：${err.message}`, "err"); save.disabled = false; return null; });
      if (!res) return;
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        toast(data.error || "回退失败", "err");
        save.disabled = false;
        return;
      }
      // UI 同步回退：这条用户消息及其后的所有消息移除，新回复由 SSE 流式补上。
      let node = article;
      while (node) {
        const nxt = node.nextElementSibling;
        node.remove();
        node = nxt;
      }
      // REWINDACTIVE_20261021：await 期间可能切了标签，只有仍在本标签上才动全局 UI。
      if (v === activeView()) {
        setBusy(true);
        currentAssistant = null;
        turnStartAt = Date.now();
        beginAssistantTurn();
      } else {
        v.busy = true;
        v.autoContinue = false;
        renderSessionTabs();
      }
      snapshotArtifacts(v);
      toast("已回退并按新内容重发");
    } catch (err) {
      toast(`编辑失败：${err.message}`, "err");
      save.disabled = false;
    }
  });
  row.append(save, cancel);
  box.append(ta, row);
  bubble.appendChild(box);
  ta.focus();
  ta.setSelectionRange(ta.value.length, ta.value.length);
}

function ensureAssistant() {
  if (currentAssistant) return currentAssistant;
  const article = document.createElement("article");
  article.className = "cw-message";
  article.innerHTML = `
    <div class="cw-assistant-row">
      <div class="cw-avatar"><i data-lucide="sparkles" aria-hidden="true"></i></div>
      <div class="cw-assistant-body"></div>
    </div>`;
  threadEl.appendChild(article);
  const body = $(".cw-assistant-body", article);
  currentAssistant = {
    article, body, buffer: "", para: null,
    seg: "", segLen: 0, stableEl: null, raf: 0,
    tailLen: 0, liveTail: null,
    thinkEl: null, thinkBody: null, thinkBuffer: "", thinkRaf: 0,
  };
  refreshIcons();
  return currentAssistant;
}

/* 进行中状态：发消息后立刻出现“已处理 Ns”气泡，首个 delta/工具调用到达才让位给正文。
   这是用户抱怨“发完消息看不到工作中状态”的核心修复。 */

function startThinkingTimer() {
  if (thinkingTimer) return;
  const tick = () => {
    if (!thinkingStartAt) return;
    const sec = Math.max(0, Math.floor((Date.now() - thinkingStartAt) / 1000));
    // LIVEMETER：底部计量条实时跟上（轮数含进行中这轮、步数含思考后的工具、tok/s 流式估算）
    if (liveTurn) {
      if (meterTurns) meterTurns.textContent = `${turnCount + 1} 轮 · ${liveTurn.steps} 步`;
      if (meterSpeed) {
        const elapsed = Math.max(1, (Date.now() - thinkingStartAt) / 1000);
        const tps = (liveTurn.chars * 0.6) / elapsed; // 中文主导场景 ≈0.6 token/字符，轮末精确值回填
        meterSpeed.textContent = `≈${Math.round(tps)} tok/s`;
      }
    }
    // LIVENESS_20261021：思考占位一被 clearThinkingPlaceholder 摘掉（首次出字/首个工具），
    // 下面这条秒表就没了文字可写——旧实现干脆整段 return，活动条也跟着冻结几分钟，
    // 看着就是卡死。改成：占位在就写占位，占位不在就都写活动条。
    const el = $(".cw-thinking-timer");
    // ANOMALY2_20261115：气泡保留原始发送时间，重跑/续跑时易被误读为「时间错乱」。
    // 秒表附「本次 HH:mm」=本轮真实起点，与气泡旧时间区分，一眼可知是新一轮在跑。
    if (el) el.textContent = `已处理 ${sec}s · 本次 ${new Date(thinkingStartAt || Date.now()).toTimeString().slice(0, 5)}`;
    const ctx = currentAssistant;
    if (ctx && ctx.workBar) {
      const wt = $(".cw-work-text", ctx.workBar);
      // ANOMALY_20261115：纯思考期占位泡已显示「正在思考…Ns」，活动条隐藏避免同屏双份；
      // 占位被摘（首次出字）或已有工具步时活动条才现身，接续显示思考/工作进度。
      const hasPh = !!$(".cw-thinking", ctx.body);
      const show = !hasPh || (ctx.workSteps || 0) > 0;
      ctx.workBar.style.display = show ? "" : "none";
      if (wt && !ctx.workSteps) wt.textContent = `正在思考 · 已处理 ${sec}s`;
      else if (wt && ctx.workStepAt) {
        const wait = Math.max(0, Math.floor((Date.now() - ctx.workStepAt) / 1000));
        wt.textContent = `正在工作 · 第 ${ctx.workSteps} 步${ctx.workLabel ? ` · ${ctx.workLabel}` : ""} · 已等 ${wait}s`;
      }
      if (show && ctx.body.lastElementChild !== ctx.workBar) ctx.body.appendChild(ctx.workBar);
    }
  };
  tick();
  thinkingTimer = setInterval(tick, 1000);
}

function stopThinkingTimer() {
  if (thinkingTimer) {
    clearInterval(thinkingTimer);
    thinkingTimer = null;
  }
}

/* THINKLIVE_20261017：思考块标题行实时显示 思考时间 · ≈进度 · 预计完成时间（Codex 式）。
   进度按单轮预算估算：流式输出 token 占 maxOutputTokens、工具步数占 maxSteps、
   轮时长占 maxDurationMs，取大者（封顶 95%）。全是估算值，带 ≈。
   TURNLIVE_20261025：估算抽成 estimateTurnProgress() 共享——思考标题行与底部「本轮」片
   必须同口径，否则两处同时可见时百分比对不上。 */
let liveStatsTimer = null;
function estimateTurnProgress() {
  const sec = thinkingStartAt ? Math.max(0, (Date.now() - thinkingStartAt) / 1000) : 0;
  const outBudget = Number(currentTurnBudget && currentTurnBudget.maxOutputTokens) || 0;
  const stepBudget = Number(currentTurnBudget && currentTurnBudget.maxSteps) || 0;
  const durBudgetMs = Number(currentTurnBudget && currentTurnBudget.maxDurationMs) || 0;
  const estTok = liveTurn ? liveTurn.chars * 0.6 : 0; // 中文主导场景 ≈0.6 token/字符
  const pOut = outBudget > 0 ? estTok / outBudget : 0;
  const pStep = stepBudget > 0 && liveTurn ? liveTurn.steps / stepBudget : 0;
  // TURNLIVE_20261025：时长信号优先用「最近完成轮的均值」当典型轮长（/api/usage
  // recentAvgDurationMs，refreshUsage 心跳缓存）——正常轮次进度随时间线性走，接近参考
  // 栏的观感；杀极限预算 pDur 只做无历史时的兜底，避免正常几分钟的轮次永远显示个位数 %。
  const pTyp = typicalTurnMs > 0 ? (sec * 1000) / typicalTurnMs : 0;
  const pDur = typicalTurnMs > 0 ? 0 : (durBudgetMs > 0 ? (sec * 1000) / durBudgetMs : 0);
  const pct = Math.min(0.95, Math.max(pOut, pStep, pTyp, pDur, 0.02));
  // <6% 刚起跑、≥90% 先验耗尽（已超过典型轮长/逼近上限）——这两种时候剩余时间都无意义，
  // 返回 null 由调用方显示「—」，不瞎猜。
  const remainSec = pct >= 0.06 && pct < 0.9 ? Math.max(0, (sec * (1 - pct)) / pct) : null;
  return { sec, pct, remainSec };
}
function updateThinkLive() {
  const ctx = currentAssistant;
  if (!ctx || !ctx.thinkLive || !ctx.thinkLive.isConnected) return;
  if (!thinkingStartAt) return;
  const { sec, pct, remainSec } = estimateTurnProgress();
  let eta = "—";
  if (remainSec != null) {
    eta = new Date(Date.now() + remainSec * 1000).toTimeString().slice(0, 5);
  }
  ctx.thinkLive.textContent = `思考 ${Math.floor(sec)}s · ≈${Math.round(pct * 100)}% · 预计 ${eta}`;
}
function startLiveStatsTimer() {
  if (liveStatsTimer) return;
  liveStatsTimer = setInterval(updateThinkLive, 1000);
}
function stopLiveStatsTimer() {
  if (liveStatsTimer) {
    clearInterval(liveStatsTimer);
    liveStatsTimer = null;
  }
}

/* TURNLIVE_20261025：底部计量条「本轮 时长 · ≈进度 · 预计剩余」，对齐 DeepSeek Harness。
   旧 LIVEMETER 的秒表挂在思考占位定时器上，首个 delta 一到 clearThinkingPlaceholder 就停，
   思考结束后 tok/s 与轮步数冻结到轮末。这里挂一个整轮独立秒表：思考/出字/调工具全程
   每秒刷新，顺带把没人写的 轮步/tok/s 续上；轮末 teardown 收掉并隐藏，精确值仍由
   endAssistantTurn -> refreshUsage 回填覆盖。 */
let turnMeterTimer = null;
function fmtTurnDur(sec) {
  const s = Math.max(0, Math.round(sec));
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  const tail = `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  return h > 0 ? `${h}:${tail}` : tail.replace(/^0(?=\d)/, ""); // "04:40" → "4:40"，与参考样式一致
}
function updateTurnMeter() {
  if (!thinkingStartAt) return;
  const { sec, pct, remainSec } = estimateTurnProgress();
  if (meterLive) meterLive.classList.remove("cw-hidden");
  if (meterLiveText) {
    const remain = remainSec != null ? fmtTurnDur(remainSec) : "—";
    meterLiveText.textContent = `本轮 ${fmtTurnDur(sec)} · ≈${Math.round(pct * 100)}% · 预计 ${remain}`;
  }
  if (liveTurn) {
    if (meterTurns) meterTurns.textContent = `${turnCount + 1} 轮 · ${liveTurn.steps} 步`;
    if (meterSpeed) {
      const tps = (liveTurn.chars * 0.6) / Math.max(1, sec);
      // THINKMETER_20261117：思考/工具阶段无可见文字时不显示误导的「≈0 tok/s」，改显阶段；出字后恢复 tok/s。
      meterSpeed.textContent = (liveTurn.chars || 0) > 0 ? `≈${Math.round(tps)} tok/s` : (liveTurn.steps > 0 ? "工具中…" : "思考中…");
    }
  }
}
function startTurnMeterTimer() {
  if (turnMeterTimer) return;
  updateTurnMeter();
  turnMeterTimer = setInterval(updateTurnMeter, 1000);
}
function stopTurnMeterTimer() {
  if (turnMeterTimer) {
    clearInterval(turnMeterTimer);
    turnMeterTimer = null;
  }
  if (meterLive) {
    meterLive.classList.add("cw-hidden");
    if (meterLiveText) meterLiveText.textContent = "本轮 —";
  }
}

function clearThinkingPlaceholder() {
  $$(".cw-thinking").forEach((el) => el.remove());
  stopThinkingTimer();
}

function beginAssistantTurn() {
  if (!threadEl) return null;
  // 秒表只在真正开始一轮时归零；turn_start 可能从 send() 和 SSE 各来一次。
  if (!thinkingStartAt) thinkingStartAt = Date.now();
  if (!liveTurn) liveTurn = { chars: 0, steps: 0 };
  const ctx = ensureAssistant();
  if (!$(".cw-thinking", ctx.body)) {
    const ph = document.createElement("div");
    ph.className = "cw-thinking";
    ph.dataset.phase = "pending";
    ph.innerHTML = `
      <span class="cw-spinner" aria-hidden="true"></span>
      <span class="cw-thinking-label">正在思考…</span>
      <span class="cw-thinking-timer">已处理 0s</span>`;
    ctx.body.appendChild(ph);
  }
  // WORKBAR2_20261017：活动条从轮次一开始就常驻，思考/出字/调工具全程跟在末尾
  if (!ctx.workBar) {
    ctx.workBar = document.createElement("div");
    ctx.workBar.className = "cw-work-bar";
    ctx.workBar.innerHTML = `<i data-lucide="loader-circle" class="cw-work-spin" aria-hidden="true"></i><span class="cw-work-text"></span>`;
    ctx.workSteps = 0;
    const wt = $(".cw-work-text", ctx.workBar);
    if (wt) wt.textContent = "正在思考 · 已处理 0s";
    ctx.body.appendChild(ctx.workBar);
    ctx.workBar.style.display = "none"; // ANOMALY_20261115：占位泡已显示「正在思考」，活动条先隐藏防双份；tick 在出字/调工具后显示
    refreshIcons();
  }
  startThinkingTimer();
  startLiveStatsTimer(); // THINKLIVE：标题行 思考时间/进度/ETA 每秒更新
  startTurnMeterTimer(); // TURNLIVE：底部「本轮」片整轮独立计时
  scrollToEnd();
  return ctx;
}

function setThinkingPhase(phase, label) {
  const ph = $(".cw-thinking");
  if (!ph) return;
  if (phase) ph.dataset.phase = phase;
  const lab = $(".cw-thinking-label", ph);
  if (lab && label) lab.textContent = label;
  scrollToEnd();
}

// TURNCLEAN_20261021：切标签时只需要清掉上一标签留在 DOM 里的活动条/定时器，
// 不必再打一次 /api/usage（随后 setBusy/切台流程自己会刷）。拆出来避免重复请求。
function teardownAssistantTurn() {
  clearThinkingPlaceholder();
  // THINKLIVE：轮末定格为「思考 Ns」，不再显示估算进度/ETA
  if (currentAssistant && currentAssistant.thinkLive && currentAssistant.thinkLive.isConnected) {
    const sec = thinkingStartAt ? Math.max(0, Math.floor((Date.now() - thinkingStartAt) / 1000)) : 0;
    currentAssistant.thinkLive.textContent = `思考 ${sec}s`;
  }
  if (currentAssistant) {
    if (currentAssistant.raf) { cancelAnimationFrame(currentAssistant.raf); currentAssistant.raf = 0; }
    if (currentAssistant.thinkRaf) { cancelAnimationFrame(currentAssistant.thinkRaf); currentAssistant.thinkRaf = 0; }
    if (currentAssistant.workBar) { currentAssistant.workBar.remove(); currentAssistant.workBar = null; } // WORKBAR：完成即撤
    // TOOLMERGE_20261017：轮末把本轮所有工具分组并成一个「本轮工具 · N 步」（Codex 的「已运行命令」样式）
    mergeToolGroups(currentAssistant);
  }
  thinkingStartAt = 0;
  liveTurn = null;
  stopLiveStatsTimer(); // THINKLIVE：轮末停止标题行统计（保留最后一次显示）
  stopTurnMeterTimer(); // TURNLIVE：轮末收掉「本轮」片并隐藏，等 refreshUsage 回填精确值
}

function endAssistantTurn() {
  teardownAssistantTurn();
  refreshUsage(); // LIVEMETER：轮末立刻用精确统计覆盖流式估算
}

// 轮末工具分组合并成单个「本轮工具 · N 步」（实时轮末与转写重放共用）。
function mergeToolGroups(ctx) {
  if (!ctx || !ctx.body) return;
  const groups = Array.from(ctx.body.querySelectorAll(".cw-tool-group"));
  if (groups.length > 1) {
    const first = groups[0];
    const fl = $(".cw-tool-list", first);
    for (let i = 1; i < groups.length; i++) {
      const gl = $(".cw-tool-list", groups[i]);
      if (gl) Array.from(gl.children).forEach((ch) => fl.appendChild(ch));
      groups[i].remove();
    }
    const lbl = $(".cw-tool-summary-label", first);
    if (lbl) lbl.textContent = `本轮工具 · ${fl.children.length} 步`;
    const cnt = $(".cw-tool-summary-count", first);
    if (cnt) cnt.textContent = "";
    first.open = false;
    first.classList.remove("is-work"); // 干完活才亮出来
  } else if (groups.length === 1) {
    groups[0].open = false;
    groups[0].classList.remove("is-work");
  }
}

// REPLAYFIX_20261017：转写重放用的轻量轮次气泡——不走 beginAssistantTurn（避免秒表/思考占位/活动条）。
function replayEnsureAssistant() {
  if (currentAssistant) return currentAssistant;
  const article = document.createElement("article");
  article.className = "cw-message";
  article.innerHTML = `
    <div class="cw-assistant-row">
      <div class="cw-avatar"><i data-lucide="sparkles" aria-hidden="true"></i></div>
      <div class="cw-assistant-body"></div>
    </div>`;
  threadEl.appendChild(article);
  currentAssistant = {
    article, body: $(".cw-assistant-body", article), buffer: "", para: null,
    seg: "", segLen: 0, stableEl: null, raf: 0,
    tailLen: 0, liveTail: null,
    thinkEl: null, thinkBody: null, thinkBuffer: "", thinkRaf: 0,
  };
  refreshIcons();
  return currentAssistant;
}

// 重放的工具步骤：并入当前气泡的工具分组（纯静态，无活动条/实时统计）。
function appendReplayTool(ctx, name) {
  const label = toolLabel(name);
  let group = ctx.body.lastElementChild;
  if (!group || !group.classList.contains("cw-tool-group")) {
    group = document.createElement("details");
    group.className = "cw-tool-group is-work";
    group.open = false;
    group.innerHTML = `<summary><i data-lucide="terminal" aria-hidden="true"></i><span class="cw-tool-summary-label">执行工具</span><span class="cw-tool-summary-count">0</span></summary><div class="cw-tool-list"></div>`;
    ctx.body.appendChild(group);
  }
  const list = $(".cw-tool-list", group);
  const item = document.createElement("div");
  item.className = "cw-tool-item";
  item.textContent = label;
  item.title = name; // 悬停可看原始工具名
  list.appendChild(item);
  $(".cw-tool-summary-label", group).textContent = `执行工具 · ${label}`;
  $(".cw-tool-summary-count", group).textContent = `×${list.children.length}`;
}

// THINKPERSIST_20261116（P4）：历史重放渲染服务端持久化的思考块（entry.thinking）。
// 与实时 appendThinkingDelta 同款 details.cw-think 结构，但静态填充（无 RAF/实时跟随），默认收起。
function appendReplayThinking(ctx, text) {
  if (!ctx || !text) return;
  let details = ctx.thinkEl;
  if (!details) {
    details = document.createElement("details");
    details.className = "cw-think";
    details.open = false;
    details.innerHTML = `<summary><i data-lucide="brain" aria-hidden="true"></i><span>思考过程</span><span class="cw-think-hint">点击展开/收起</span></summary><div class="cw-think-body"></div>`;
    ctx.body.appendChild(details);
    ctx.thinkEl = details;
    ctx.thinkBody = $(".cw-think-body", details);
    refreshIcons();
  }
  ctx.thinkBuffer = (ctx.thinkBuffer || "") + text;
  if (ctx.thinkBody) ctx.thinkBody.textContent = ctx.thinkBuffer;
}

// 发送失败时清掉刚建出来、还没有任何内容的助手气泡。
function abortAssistantTurn() {
  clearThinkingPlaceholder();
  thinkingStartAt = 0;
  liveTurn = null;
  stopLiveStatsTimer();
  stopTurnMeterTimer();
  if (currentAssistant && !currentAssistant.buffer) {
    currentAssistant.article.remove();
  }
  currentAssistant = null;
}

function appendDelta(text) {
  clearThinkingPlaceholder();
  if (liveTurn) liveTurn.chars += text.length; // LIVEMETER
  const ctx = ensureAssistant();
  collapseThinking(ctx);
  ctx.buffer += text;
  ctx.seg += text;
  // delta 可能几十毫秒一条：合并到每帧最多重排一次，长回复不再越写越卡。
  if (!ctx.raf) ctx.raf = requestAnimationFrame(() => flushStreaming(ctx));
}

/* 流式渲染分两层：空行边界之前的段落已定稿，只在新段落出现时增量渲染；
   边界之后的“活尾巴”仅做转义换行，等定稿后再升级为 markdown。 */
function flushStreaming(ctx) {
  ctx.raf = 0;
  if (currentAssistant !== ctx) return;
  const seg = ctx.seg;
  let cut = seg.lastIndexOf("\n\n");
  if (cut < 0) cut = 0;
  // 边界落在未闭合的代码围栏里时整段按尾巴渲染，避免 ``` 配对错乱。
  else if (((seg.slice(0, cut).match(/```/g) || []).length % 2) === 1) cut = 0;
  if (cut > ctx.segLen) {
    if (!ctx.stableEl) {
      ctx.stableEl = document.createElement("div");
      ctx.stableEl.className = "cw-stable";
      ctx.body.insertBefore(ctx.stableEl, ctx.para);
    }
    const tmp = document.createElement("div");
    tmp.innerHTML = renderRich(seg.slice(ctx.segLen, cut));
    while (tmp.firstChild) ctx.stableEl.appendChild(tmp.firstChild);
    ctx.segLen = cut;
  }
  if (!ctx.para) {
    ctx.para = document.createElement("p");
    ctx.para.className = "cw-live-tail";
    ctx.body.appendChild(ctx.para);
    ctx.liveTail = null;
    ctx.tailLen = 0;
  }
  const tail = seg.slice(ctx.segLen);
  // 活尾巴只追加文本节点（pre-wrap 呈现换行），不再每帧重建整段 HTML。
  // 之前长回复流式时每帧都对整段尾巴做转义+重排，主线程被打满，
  // 界面在生成期间点不动、选不中文字。
  if (!ctx.liveTail) {
    ctx.liveTail = document.createTextNode("");
    ctx.para.appendChild(ctx.liveTail);
    ctx.tailLen = 0;
  }
  if (ctx.tailLen > tail.length) ctx.liveTail.data = tail;
  else if (tail.length > ctx.tailLen) ctx.liveTail.data += tail.slice(ctx.tailLen);
  ctx.tailLen = tail.length;
  scrollToEnd();
}

/* 思考过程：默认展开的浅色折叠块，正文首个 delta 到达时自动收起。 */
function collapseThinking(ctx) {
  if (ctx.thinkEl && ctx.thinkEl.open) {
    ctx.thinkEl.open = false;
    ctx.thinkEl.classList.add("cw-think-done");
  }
}

function appendThinkingDelta(text) {
  // turn 结束后（result 已把 turnStartAt 清零）再漏进来的思考事件直接丢弃，
  // 否则 ensureAssistant 会凭空建出一个没有正文的空气泡。
  if (!text || !turnStartAt) return;
  if (liveTurn) liveTurn.chars += text.length; // LIVEMETER：思考字数也计入流式速率
  const ctx = ensureAssistant();
  if (!ctx.thinkEl) {
    const details = document.createElement("details");
    details.className = "cw-think";
    // THINKCOLLAPSE_20261117：实时思考默认收起（长思考不再占满视野），summary 仍带实时「思考 Ns」保持活性感知，点击可展开。
    details.open = false;
    details.innerHTML = `<summary><i data-lucide="brain" aria-hidden="true"></i><span>思考过程</span><span class="cw-think-live"></span><span class="cw-think-hint">点击展开/收起</span></summary><div class="cw-think-body"></div>`;
    ctx.body.appendChild(details);
    ctx.thinkEl = details;
    ctx.thinkLive = $(".cw-think-live", details);
    ctx.thinkBody = $(".cw-think-body", details);
    ctx.thinkFollow = true;
    ctx.thinkBody.addEventListener("scroll", () => {
      const b = ctx.thinkBody;
      if (!b) return;
      ctx.thinkFollow = b.scrollHeight - b.scrollTop - b.clientHeight < 40;
    });
    refreshIcons();
  }
  ctx.thinkBuffer = (ctx.thinkBuffer || "") + text;
  if (!ctx.thinkRaf) ctx.thinkRaf = requestAnimationFrame(() => flushThinking(ctx));
}

function flushThinking(ctx) {
  ctx.thinkRaf = 0;
  if (currentAssistant !== ctx || !ctx.thinkBody || !ctx.thinkBody.isConnected) return;
  ctx.thinkBody.textContent = ctx.thinkBuffer;
  // THINKFOLLOW_20261017：思考内容实时跟随滚到底，看得见正在写的部分；
  // 用户手动上翻（离底部>40px）时暂停跟随不抢滚动条，拉回底部自动恢复。
  if (ctx.thinkFollow !== false) ctx.thinkBody.scrollTop = ctx.thinkBody.scrollHeight;
  scrollToEnd();
}

function finalizeAssistant(blocks) {
  const textBlocks = (blocks || []).filter((b) => b.type === "text");
  const text = textBlocks.map((b) => b.text).join("");
  // 流式过程里会先来一条 blocks=[] 的 message；此时必须保留已渲染的内容。
  // 纯工具调用的 assistant 消息同样没有文本，也不能清空正在显示的回答。
  if (!text) return;
  clearThinkingPlaceholder();
  const ctx = ensureAssistant();
  if (ctx.raf) { cancelAnimationFrame(ctx.raf); ctx.raf = 0; }
  // 同一轮“正文→工具→再正文”会来多条 message；每条定稿后必须重开一段
  // 流式缓冲，否则下一段 delta 会叠在上一段全文后面重复渲染（文字叠加）。
  if (ctx.segLen > text.length) ctx.segLen = text.length;
  if (!ctx.stableEl) {
    ctx.stableEl = document.createElement("div");
    ctx.stableEl.className = "cw-stable";
    ctx.body.insertBefore(ctx.stableEl, ctx.para);
  }
  const rest = text.slice(ctx.segLen);
  if (rest) {
    const tmp = document.createElement("div");
    tmp.innerHTML = renderRich(rest);
    while (tmp.firstChild) ctx.stableEl.appendChild(tmp.firstChild);
  }
  ctx.seg = "";
  ctx.segLen = 0;
  ctx.tailLen = 0;
  ctx.liveTail = null;
  if (ctx.para) { ctx.para.remove(); ctx.para = null; }
  scrollToEnd();
}

// TOOLLABEL_20261017：工具名 → 人话动作（Codex 式「搜索代码/读取文件」，不甩原始名）
function toolLabel(name) {
  const raw = String(name || "");
  let short = raw;
  if (raw.startsWith("mcp__browser__")) short = raw.slice(14);
  else if (raw.startsWith("mcp__")) short = raw.split("__")[2] || raw;
  const map = {
    Grep: "搜索代码", Glob: "查找文件", Read: "读取文件", Edit: "修改文件", Write: "写入文件",
    NotebookEdit: "修改笔记本", PowerShell: "运行命令", Bash: "运行命令", WebFetch: "抓取网页",
    WebSearch: "搜索网页", Task: "派发子任务", Agent: "派发子任务", TodoWrite: "更新计划",
    AskUserQuestion: "向你提问", Skill: "调用技能", EnterPlanMode: "规划方案", ExitPlanMode: "提交方案",
    CronCreate: "创建定时任务", CronDelete: "删除定时任务", CronList: "查看定时任务",
    ScheduleWakeup: "安排唤醒", SendMessage: "发送消息", ListAgents: "查看子代理", TaskStop: "停止任务",
    EnterWorktree: "创建工作树", ExitWorktree: "退出工作树", ReportFindings: "汇报发现",
    browser_open: "打开网页", browser_read: "读取网页", browser_click: "点击页面", browser_type: "填写网页",
    browser_scroll: "滚动网页", browser_screenshot: "截屏", browser_back: "网页后退",
    browser_forward: "网页前进", browser_reload: "刷新网页", set_session: "切换浏览器会话",
    webReader: "读取网页",
  };
  return map[short] || map[raw] || (raw.startsWith("mcp__") ? "调用工具" : raw);
}

function addToolNote(name) {
  clearThinkingPlaceholder();
  const ctx = ensureAssistant();
  const label = toolLabel(name);
  let group = ctx.body.lastElementChild;
  if (!group || !group.classList.contains("cw-tool-group")) {
    group = document.createElement("details");
    group.className = "cw-tool-group is-work"; // is-work：干活期间不显示，只留活动条
    group.open = false;
    group.innerHTML = `<summary><i data-lucide="terminal" aria-hidden="true"></i><span class="cw-tool-summary-label">执行工具</span><span class="cw-tool-summary-count">0</span></summary><div class="cw-tool-list"></div>`;
    ctx.body.appendChild(group);
  }
  const list = $(".cw-tool-list", group);
  const item = document.createElement("div");
  item.className = "cw-tool-item";
  item.textContent = label;
  item.title = name; // 悬停可看原始工具名
  list.appendChild(item);
  $(".cw-tool-summary-label", group).textContent = `执行工具 · ${label}`;
  $(".cw-tool-summary-count", group).textContent = `×${list.children.length}`;
  // WORKBAR_20261017：整轮一条「正在工作」活动条（Codex 式），完成后随轮次结束移除
  if (!ctx.workBar) {
    ctx.workBar = document.createElement("div");
    ctx.workBar.className = "cw-work-bar";
    ctx.workBar.innerHTML = `<i data-lucide="loader-circle" class="cw-work-spin" aria-hidden="true"></i><span class="cw-work-text"></span>`;
    ctx.workSteps = 0;
  }
  ctx.workSteps += 1;
  ctx.workStepAt = Date.now(); // LIVENESS_20261021：本步起点，供活动条显示「第 N 步 · 已等 Ms」
  ctx.workLabel = label;
  if (liveTurn) liveTurn.steps = ctx.workSteps; // LIVEMETER：底部步数实时跟手
  const wtxt = $(".cw-work-text", ctx.workBar);
  if (wtxt) wtxt.textContent = `正在工作 · 第 ${ctx.workSteps} 步 · ${label}`;
  ctx.workBar.style.display = ""; // ANOMALY_20261115：有工具步立即现身（思考期它是隐藏的）
  ctx.body.appendChild(ctx.workBar); // 活动条始终压在末尾
  refreshIcons();
  scrollToEnd();
}

// STEPRESUME_20261021：切回正在跑的标签时，用服务端权威进度把活动条的「第 N 步」补回来。
// ctx.workSteps 只在收到 tool 事件时自增，切走期间的事件进了 v.buf.tools（只重放缓冲的那几条），
// 因此切回后计数总是从小数字重来。服务端 /api/sessions 的 currentTurn.steps 才是这条轮次的
// 真实步数（内核 steps 减去轮次起点）。取 max：缓冲重放可能已经比快照新，不回退进度。
async function resumeWorkSteps(ctx, v) {
  if (!ctx || !ctx.workBar || !v || !v.kernelId) return;
  const keyAtStart = activeViewKey;
  try {
    const data = await fetch("/api/sessions").then((r) => r.json());
    if (activeViewKey !== keyAtStart || currentAssistant !== ctx) return; // 期间又切走了，别写错标签
    const s = (data.sessions || []).find((x) => x.kernelId === v.kernelId);
    const authoritative = Number(s && s.currentTurn && s.currentTurn.steps);
    if (!Number.isFinite(authoritative) || authoritative <= 0) return;
    if (authoritative > (Number(ctx.workSteps) || 0)) {
      ctx.workSteps = authoritative;
      ctx.workStepAt = Date.now(); // 「已等」从切回这一刻重新起算，不再显示切走前残留的旧等待
      if (liveTurn) liveTurn.steps = authoritative;
      const wt = $(".cw-work-text", ctx.workBar);
      if (wt) wt.textContent = `正在工作 · 第 ${authoritative} 步${ctx.workLabel ? ` · ${ctx.workLabel}` : ""}`;
    }
  } catch {}
}

function addResultFooter(info) {
  clearThinkingPlaceholder();
  const ctx = ensureAssistant();
  info.ttftMs = currentTurnTtft; // TTFT：随结果行展示，随转写重建自然消失
  currentTurnTtft = null;
  const body = ctx.body;
  body.appendChild(buildResultRow(info, ctx.buffer || ""));
  currentAssistant = null;
  thinkingStartAt = 0;
  scrollToEnd();
  // ARTKEEP_20261021：把气泡正文交回调用方——产物卡片要挂在收轮之前抓好的宿主上，
  // 不能等 currentAssistant 归零后再去取（那条路径永远是 null，卡片一张都画不出来）。
  return body;
}

function addSystemNote(text, _level) {
  // _level 保留占位（多处调用传 "warn"），当前统一 info 样式渲染。
  const article = document.createElement("article");
  article.className = "cw-message";
  article.innerHTML = `<div class="cw-inline-note"><i data-lucide="info" aria-hidden="true"></i><span>${escapeHtml(text)}</span></div>`;
  threadEl.appendChild(article);
  refreshIcons();
  scrollToEnd();
}

function appendAssistantText(text, tools) {
  const article = document.createElement("article");
  article.className = "cw-message";
  article.innerHTML = `
    <div class="cw-assistant-row">
      <div class="cw-avatar"><i data-lucide="sparkles" aria-hidden="true"></i></div>
      <div class="cw-assistant-body"></div>
    </div>`;
  threadEl.appendChild(article);
  const body = $(".cw-assistant-body", article);
  if (text) {
    const para = document.createElement("p");
    para.innerHTML = renderRich(text);
    body.appendChild(para);
  }
  if ((tools || []).length) {
    const group = document.createElement("details");
    group.className = "cw-tool-group";
    // TOOLLABEL_20261017：历史消息同样显示人话动作，不甩原始工具名
    const lastLabel = toolLabel(tools[tools.length - 1]);
    group.innerHTML = `<summary><i data-lucide="terminal" aria-hidden="true"></i><span class="cw-tool-summary-label">本轮工具 · ${escapeHtml(lastLabel)} 等</span><span class="cw-tool-summary-count">×${tools.length}</span></summary><div class="cw-tool-list"></div>`;
    const list = $(".cw-tool-list", group);
    for (const name of tools) {
      const item = document.createElement("div");
      item.className = "cw-tool-item";
      item.textContent = toolLabel(name);
      item.title = name; // 悬停看原始名
      list.appendChild(item);
    }
    body.appendChild(group);
  }
  refreshIcons();
  return body;
}

// 每条助手消息底部：复制 / 分支（+ 用量与时间）。
function buildResultRow(info, text) {
  const row = document.createElement("div");
  row.className = "cw-msg-actions";

  const copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "cw-msg-action";
  copyBtn.innerHTML = `<i data-lucide="copy" aria-hidden="true"></i><span>复制</span>`;
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(text || "");
    if (ok) {
      const lab = copyBtn.querySelector("span");
      if (lab) { lab.textContent = "已复制"; setTimeout(() => (lab.textContent = "复制"), 1200); }
    } else {
      toast("复制失败", "err");
    }
  });

  const forkBtn = document.createElement("button");
  forkBtn.type = "button";
  forkBtn.className = "cw-msg-action";
  forkBtn.innerHTML = `<i data-lucide="git-fork" aria-hidden="true"></i><span>分支</span>`;
  forkBtn.addEventListener("click", async () => {
    if (busy) { toast("当前仍在生成，请先停止后再分支", "warn"); return; }
    const av = activeView();
    try {
      const r = await fetch("/api/fork", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(av && av.kernelId ? { kernelId: av.kernelId } : {}),
      }).then((x) => x.json());
      if (r && r.ok) {
        // fork 会重启内核并换新会话 id：本地直接重开一个标签承接（后端 session 事件会把 id 带回来）
        if (av) { sessionViews.delete(av.key); if (activeViewKey === av.key) activeViewKey = null; }
        await openNewTab();
        if (threadEl) threadEl.innerHTML = "";
        currentAssistant = null;
        endAssistantTurn();
        turnStartAt = 0;
        setTurns(0);
        addSystemNote("已从当前会话创建分支，新分支与原会话独立演进。");
        toast("已创建分支");
      } else {
        toast((r && r.error) || "分支失败", "err");
      }
    } catch {
      toast("分支失败", "err");
    }
  });

  row.appendChild(copyBtn);
  row.appendChild(forkBtn);

  // REDO_20261017：重新生成（把上一条用户消息再发一轮；会话是追加式，等价「再答一次」）
  const redoBtn = document.createElement("button");
  redoBtn.type = "button";
  redoBtn.className = "cw-msg-action";
  redoBtn.innerHTML = `<i data-lucide="refresh-cw" aria-hidden="true"></i><span>重答</span>`;
  redoBtn.addEventListener("click", () => {
    if (busy) { toast("当前仍在生成，请先停止", "warn"); return; }
    const bubbles = threadEl ? threadEl.querySelectorAll(".cw-user-message .cw-user-bubble") : [];
    if (!bubbles.length) { toast("找不到上一条消息", "warn"); return; }
    const first = bubbles[bubbles.length - 1].firstElementChild;
    const text = (first && first.textContent || "").trim();
    if (!text) { toast("上一条消息为空", "warn"); return; }
    textarea.value = text;
    textarea.dispatchEvent(new Event("input"));
    send();
  });
  row.appendChild(redoBtn);

  const bits = [];
  // TIME_20261017：回复开始时刻（HH:MM），让每条回复带时间感
  if (info.durationMs) {
    // REPLAYFIX_20261017：重放时按条目自身时刻回推开始时间，不再用当前时钟（否则历史 footer 全是"刚刚"）
    const st = new Date((Number(info.at) || Date.now()) - info.durationMs);
    bits.push(`${String(st.getHours()).padStart(2, "0")}:${String(st.getMinutes()).padStart(2, "0")}`);
  }
  const uc = info.usageCalc;
  if (uc) {
    if (uc.totalTokens) bits.push(`${formatNum(uc.totalTokens)} tok`);
    if (typeof uc.hitRate === "number" && uc.totalTokens) bits.push(`缓存 ${(uc.hitRate * 100).toFixed(0)}%`);
    if (typeof uc.cost === "number" && uc.cost > 0) bits.push(`¥${uc.cost.toFixed(4)}`);
  }
  if (info.ttftMs) bits.push(`首字 ${(info.ttftMs / 1000).toFixed(1)}s`); // TTFT：壳→内核→API 首字延迟
  if (info.durationMs) bits.push(`${(info.durationMs / 1000).toFixed(1)}s`);
  if (info.budgetExceeded) bits.push("预算停止");
  else if (info.interrupted) bits.push("已中断");
  else if (info.isError) bits.push("本轮出错");
  if (bits.length) {
    const meta = document.createElement("span");
    meta.className = "cw-msg-meta";
    meta.textContent = bits.join(" · ");
    row.appendChild(meta);
  }
  refreshIcons();
  return row;
}

/* ---------- 视图切换与面板 ---------- */

function switchView(view) {
  currentView = view;
  $$(".cw-nav button").forEach((btn) => btn.classList.toggle("is-active", btn.dataset.view === view));
  $$("[data-view-content]").forEach((section) => {
    section.classList.toggle("cw-hidden", section.dataset.viewContent !== view);
  });
  if (view === "queue") loadQueue();
  if (view === "queue") loadAutomations(); // AUTOMATIONS_20261114：任务队列视图同时刷新定时自动化列表
  if (view === "assets") { loadAssets(); loadProducts(); }
  if (view === "history") loadHistory();
  if (view === "chat") loadTaskList();
  if (typeof renderSessionTabs === "function") renderSessionTabs(); // SESSIONTABS：非对话页收起标签栏
  // 浏览器固定在右侧面板：先写坐标再挂载，避免原生视图用默认尺寸遮挡。
  if (currentRightPanel === "browser") {
    syncBrowserBounds();
    syncBrowserVisibility(true);
  } else {
    syncBrowserVisibility(false);
  }
  updateJumpLatest();
}

function emptyNote(text) {
  const div = document.createElement("div");
  div.className = "cw-empty";
  div.textContent = text;
  return div;
}

async function loadQueue() {
  if (!queueList) return;
  try {
    const data = await fetch("/api/queue").then((r) => r.json());
    const items = Array.isArray(data.items) ? data.items : [];
    queueList.innerHTML = "";
    const pendingCount = Number(data.pending || 0);
    const queueLimit = Number(data.queueLimit || 3);
    if (queueSummary) {
      queueSummary.textContent = data.current
        ? `进行中 1 项 · 待发送 ${pendingCount}/${queueLimit} · 共 ${items.length} 项`
        : `空闲 · 共 ${items.length} 项`;
    }
    if (queueClearBtn) queueClearBtn.classList.toggle("cw-hidden", pendingCount === 0);
    if (!items.length) {
      queueList.appendChild(emptyNote("当前会话还没有任务。"));
      return;
    }
    for (const task of items) {
      const row = document.createElement("div");
      row.className = "cw-list-item";
      const tone = task.state === "done" ? "ok" : task.state === "error" ? "err" : task.state === "running" ? "warn" : task.state === "budget_exceeded" ? "warn" : "";
      const label = task.state === "done" ? "已完成" : task.state === "error" ? "失败" : task.state === "running" ? (task.interrupting ? "中断中" : "进行中") : task.state === "budget_exceeded" ? "预算超限" : "已中断";
      row.innerHTML = `
        <i data-lucide="${task.state === "done" ? "circle-check" : task.state === "error" ? "circle-alert" : task.state === "budget_exceeded" ? "triangle-alert" : "loader"}" aria-hidden="true"></i>
        <div><strong></strong><small></small></div>
        <span class="cw-badge" data-tone="${tone}">${label}</span>`;
      $("strong", row).textContent = task.label || "未命名任务";
      $("small", row).textContent = `${formatTime(task.startedAt)}${task.durationMs ? ` · ${(task.durationMs / 1000).toFixed(1)}s` : ""}${task.toolSteps ? ` · ${task.toolSteps} 步` : ""}${task.images ? ` · ${task.images} 张图片` : ""}`;
      queueList.appendChild(row);
    }
    refreshIcons();
  } catch (err) {
    if (queueSummary) queueSummary.textContent = "读取失败";
    queueList.innerHTML = "";
    queueList.appendChild(emptyNote(`任务读取失败：${err.message}`));
  }
}

// AUTOMATIONS_20261114：定时自动化（对齐 Codex automations）——定时在新会话里发送提示词
function autoScheduleText(a) {
  if (!a || !a.schedule) return "未设置";
  if (a.schedule.kind === "daily") return "每天 " + (a.schedule.time || "09:00");
  return "每 " + (Number(a.schedule.minutes) || 60) + " 分钟";
}
function autoNextText(ts) {
  if (!ts) return "未启用";
  const d = new Date(Number(ts));
  return "下次 " + d.toLocaleString("zh-CN", { hour12: false, month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}
async function loadAutomations() {
  const box = $("#cw-auto-list");
  if (!box) return;
  try {
    const d = await fetch("/api/automations").then((r) => r.json());
    const items = Array.isArray(d.items) ? d.items : [];
    box.innerHTML = "";
    if (!items.length) {
      box.appendChild(emptyNote("还没有定时自动化任务。点「＋ 新建」创建（定时在新会话里执行任务内容）。"));
      return;
    }
    for (const a of items) {
      const row = document.createElement("div");
      row.className = "cw-list-item cw-auto-item" + (a.enabled ? "" : " is-off");
      row.dataset.id = a.id;
      const main = document.createElement("div");
      main.className = "cw-auto-main";
      const t = document.createElement("strong");
      t.textContent = a.name || "未命名";
      const s = document.createElement("small");
      const bits = [autoScheduleText(a), autoNextText(a.nextRunAt), a.runs ? "已运行 " + a.runs + " 次" : ""];
      if (a.lastResult) bits.push("最近：" + a.lastResult);
      if (a.lastError) bits.push("错误：" + String(a.lastError).slice(0, 40));
      s.textContent = bits.filter(Boolean).join(" · ");
      main.append(t, s);
      const acts = document.createElement("div");
      acts.className = "cw-auto-acts";
      const mk = (label, act, on) => {
        const b = document.createElement("button");
        b.type = "button";
        b.textContent = label;
        b.dataset.act = act;
        if (on) b.classList.add("is-on");
        return b;
      };
      acts.append(mk(a.enabled ? "停用" : "启用", "toggle", a.enabled), mk("立即运行", "run"), mk("删除", "del"));
      row.append(main, acts);
      box.appendChild(row);
    }
    refreshIcons();
  } catch (err) {
    box.innerHTML = "";
    box.appendChild(emptyNote("自动化读取失败：" + err.message));
  }
}
async function autoAction(action, id, extra) {
  try {
    const d = await fetch("/api/automations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.assign({ action, id }, extra || {})),
    }).then((r) => r.json());
    if (!d.ok) {
      toast(d.error || "操作失败", "err");
      return;
    }
    if (action === "run") toast("已触发自动化（新会话已开始）");
    loadAutomations();
  } catch (err) {
    toast("操作失败：" + err.message, "err");
  }
}
async function createAutomation() {
  const name = await askText("自动化名称（如「每日对账」）：");
  if (!name || !name.trim()) return;
  const prompt = await askText("任务内容（会作为消息发到新会话）：");
  if (!prompt || !prompt.trim()) return;
  const plan = await askText("计划：输入分钟数（如 60 = 每 60 分钟）或时间（如 09:30 = 每天）：", "60");
  if (!plan || !plan.trim()) return;
  const p = plan.trim();
  const schedule = /^\d{1,2}:\d{2}$/.test(p)
    ? { kind: "daily", time: p }
    : { kind: "interval", minutes: Math.max(1, Math.min(1440, parseInt(p, 10) || 60)) };
  try {
    const d = await fetch("/api/automations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", name: name.trim(), prompt: prompt.trim(), schedule }),
    }).then((r) => r.json());
    if (!d.ok) {
      toast(d.error || "创建失败", "err");
      return;
    }
    toast("自动化已创建");
    loadAutomations();
  } catch (err) {
    toast("创建失败：" + err.message, "err");
  }
}
const autoNewBtn = $("#cw-auto-new");
if (autoNewBtn) autoNewBtn.addEventListener("click", createAutomation);
const autoListEl = $("#cw-auto-list");
if (autoListEl) {
  autoListEl.addEventListener("click", (e) => {
    const row = e.target.closest(".cw-auto-item");
    const btn = e.target.closest("button[data-act]");
    if (!row || !btn) return;
    const id = row.dataset.id;
    const act = btn.dataset.act;
    if (act === "del") {
      if (!window.confirm("删除这个自动化任务？")) return;
      autoAction("delete", id);
    } else if (act === "run") {
      autoAction("run", id);
    } else if (act === "toggle") {
      autoAction("toggle", id);
    }
  });
}

async function clearQueuedMessages() {
  if (!queueClearBtn) return;
  queueClearBtn.disabled = true;
  try {
    const av = activeView();
    const res = await fetch("/api/queue/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(av && av.kernelId ? { kernelId: av.kernelId } : {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) return toast(data.error || "清空排队失败", "err");
    toast(data.cleared ? `已清空 ${data.cleared} 条待发送消息` : "当前没有待发送消息", "ok");
    loadQueue();
  } catch (err) {
    toast(`清空排队失败：${err.message}`, "err");
  } finally {
    queueClearBtn.disabled = false;
  }
}

async function loadAssets() {
  if (!assetGrid) return;
  try {
    const data = await fetch("/api/assets").then((r) => r.json());
    const items = Array.isArray(data.items) ? data.items : [];
    assetGrid.innerHTML = "";
    if (assetsSummary) {
      const total = items.reduce((sum, it) => sum + (Number(it.size) || 0), 0);
      assetsSummary.textContent = `${items.length} 个文件 · ${formatBytes(total)}`;
    }
    if (!items.length) {
      assetGrid.appendChild(emptyNote("还没有发送过图片素材。"));
      return;
    }
    for (const item of items) {
      const card = document.createElement("div");
      card.className = "cw-asset-card";
      card.innerHTML = `
        <img class="cw-asset-thumb" alt="" loading="lazy">
        <div class="cw-asset-meta">
          <strong title="${escapeHtml(item.source || item.name)}">${escapeHtml(item.source || item.name)}</strong>
          <small>${formatBytes(item.size)} · ${formatTime(item.at)}</small>
          <div class="cw-asset-actions"></div>
        </div>`;
      $(".cw-asset-thumb", card).src = item.url;
      // IMGLIGHTBOX_20261112：素材缩略图点击放大
      const thumb = $(".cw-asset-thumb", card);
      if (thumb) thumb.addEventListener("click", () => showImageLightbox(item.url, item.source || item.name));
      const actions = $(".cw-asset-actions", card);
      const openBtn = document.createElement("button");
      openBtn.type = "button";
      openBtn.className = "cw-ghost-btn";
      openBtn.innerHTML = `<i data-lucide="external-link" aria-hidden="true"></i>打开`;
      openBtn.addEventListener("click", () => window.open(item.url, "_blank", "noopener"));
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "cw-ghost-btn";
      delBtn.innerHTML = `<i data-lucide="trash-2" aria-hidden="true"></i>删除`;
      delBtn.addEventListener("click", async () => {
        try {
          const res = await fetch(`/api/assets?name=${encodeURIComponent(item.name)}`, { method: "DELETE" });
          const out = await res.json().catch(() => ({}));
          if (!res.ok || out.ok === false) return toast(out.error || "删除失败", "err");
          toast("已删除素材");
          loadAssets();
        } catch (err) {
          toast(`删除失败：${(err && err.message) || err}`, "err");
        }
      });
      actions.appendChild(openBtn);
      actions.appendChild(delBtn);
      assetGrid.appendChild(card);
    }
    refreshIcons();
  } catch (err) {
    if (assetsSummary) assetsSummary.textContent = "读取失败";
    assetGrid.innerHTML = "";
    assetGrid.appendChild(emptyNote(`素材读取失败：${err.message}`));
  }
}

// HISTSEARCH_20261021：历史页此前把 271 条一次铺开、没有搜索/分页（侧栏有搜索，历史页没有），
// 找一场旧会话只能滚；单条「删除」还没有二次确认（侧栏批量删除有）。
const HISTORY_PAGE_SIZE = 40;
let historyCache = [];
let historyQuery = "";
let historyPage = 0;

async function loadHistory() {
  if (!historyList) return;
  try {
    const data = await fetch("/api/history").then((r) => r.json());
    // 无效档（sessionId 为空，如 runtime/history/null.json）进来就是一条点不开、删不掉的幽灵行
    historyCache = (Array.isArray(data.items) ? data.items : [])
      .filter((x) => x && typeof x.sessionId === "string" && /^[a-zA-Z0-9-]{6,64}$/.test(x.sessionId));
    renderHistory();
  } catch (err) {
    if (historySummary) historySummary.textContent = "读取失败";
    historyList.innerHTML = "";
    historyList.appendChild(emptyNote(`历史读取失败：${err.message}`));
  }
}

function renderHistory() {
  if (!historyList) return;
  const q = historyQuery.trim().toLowerCase();
  const matched = q
    ? historyCache.filter((x) => `${x.title || ""}\n${x.preview || ""}\n${x.sessionId}`.toLowerCase().includes(q))
    : historyCache;
  const pages = Math.max(1, Math.ceil(matched.length / HISTORY_PAGE_SIZE));
  if (historyPage >= pages) historyPage = pages - 1;
  if (historyPage < 0) historyPage = 0;
  const slice = matched.slice(historyPage * HISTORY_PAGE_SIZE, (historyPage + 1) * HISTORY_PAGE_SIZE);

  const pageEl = $("#cw-history-page");
  if (pageEl) pageEl.textContent = `第 ${historyPage + 1} / ${pages} 页`;
  const prevBtn = $("#cw-history-prev");
  const nextBtn = $("#cw-history-next");
  if (prevBtn) prevBtn.disabled = historyPage <= 0;
  if (nextBtn) nextBtn.disabled = historyPage >= pages - 1;
  const clearBtn = $("#cw-history-search-clear");
  if (clearBtn) clearBtn.classList.toggle("cw-hidden", !q);

  historyList.innerHTML = "";
  if (historySummary) {
    historySummary.textContent = q
      ? `${matched.length} / ${historyCache.length} 个已归档会话`
      : `${historyCache.length} 个已归档会话`;
  }
  if (!matched.length) {
    historyList.appendChild(emptyNote(q ? `没有匹配「${historyQuery.trim()}」的历史会话。` : "还没有归档会话；每轮结果落盘后会自动出现。"));
    return;
  }
  for (const item of slice) {
    const row = document.createElement("div");
    row.className = "cw-list-item is-clickable";
    row.innerHTML = `
      <i data-lucide="clock" aria-hidden="true"></i>
      <div><strong></strong><small></small></div>
      <span class="cw-badge">${Number(item.turns) || 0} 轮</span>
      <button class="cw-ghost-btn" type="button" title="删除这条历史档">删除</button>`;
    $("strong", row).textContent = item.title || item.preview || "(无文字内容)";
    $("small", row).textContent = `会话 ${String(item.sessionId).slice(0, 8)} · ${formatTime(item.updatedAt)}`;
    row.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      openHistory(item.sessionId);
    });
    $("button", row).addEventListener("click", async (e) => {
      e.stopPropagation();
      // HISTDEL_20261021：单条删除补二次确认（此前点一下即永久删档，不可恢复）
      if (!window.confirm(`删除历史会话「${item.title || item.preview || item.sessionId}」？\n\n只删壳的历史存档，原生会话文件与项目文件不受影响；该操作不可恢复。`)) return;
      try {
        const res = await fetch(`/api/history?id=${encodeURIComponent(item.sessionId)}`, { method: "DELETE" });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || out.ok === false) return toast(out.error || "删除失败", "err");
        toast("已删除历史会话");
        loadHistory();
      } catch (err) {
        toast(`删除失败：${(err && err.message) || err}`, "err"); // FETCHGUARD_20261021
      }
    });
    historyList.appendChild(row);
  }
  refreshIcons();
}

/* 左侧会话列表：置顶 / 项目（文件夹）/ 最近（Codex 风格） */
const collapsedProjects = new Set();
const aiTitleBusy = new Set(); // AI 起名进行中的会话 id，防连点重复请求

/* ===== 批量管理 + 归档 ===== */
let batchMode = false;
const batchSelected = new Set();
let archivedOpen = false;

function setBatchMode(on) {
  batchMode = on;
  batchSelected.clear();
  const bar = $("#cw-batch-bar");
  if (bar) {
    bar.classList.toggle("cw-hidden", !on);
    if (on) updateBatchBar();
  }
  const btn = $("#cw-manage-btn");
  if (btn) {
    btn.textContent = on ? "退出管理" : "管理";
    btn.classList.toggle("is-on", on);
  }
  loadTaskList();
}

function updateBatchBar() {
  const info = $("#cw-batch-info");
  if (info) info.textContent = `已选 ${batchSelected.size}`;
}

function batchIds() {
  return Array.from(batchSelected);
}

async function batchArchive() {
  const ids = batchIds();
  if (!ids.length) { toast("请先勾选会话", "err"); return; }
  try {
    await apiWorkspace({ action: "batch-archive", sessionIds: ids, archived: true });
    toast(`已归档 ${ids.length} 个会话`);
    archivedOpen = true;
    setBatchMode(false);
  } catch (err) { toast(err.message, "err"); }
}

async function batchDelete() {
  const ids = batchIds();
  if (!ids.length) { toast("请先勾选会话", "err"); return; }
  if (!window.confirm(`确定删除选中的 ${ids.length} 个会话？该操作不可恢复。`)) return;
  let ok = 0;
  for (const sid of ids) {
    try {
      const res = await fetch(`/api/history?id=${encodeURIComponent(sid)}`, { method: "DELETE" });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok !== false) ok++;
    } catch {}
  }
  toast(ok === ids.length ? `已删除 ${ok} 个会话` : `已删除 ${ok}/${ids.length} 个（其余失败）`, ok ? undefined : "err");
  setBatchMode(false);
}

function batchMove() {
  const ids = batchIds();
  if (!ids.length) { toast("请先勾选会话", "err"); return; }
  closeFloatMenu();
  const menu = document.createElement("div");
  menu.className = "wb-float-menu";
  menu.id = "wb-float-menu";
  for (const proj of wsCache.projects) {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<i data-lucide="folder" aria-hidden="true"></i><span></span>`;
    b.querySelector("span").textContent = proj.name;
    b.addEventListener("click", async () => {
      closeFloatMenu();
      try {
        await apiWorkspace({ action: "batch-assign", sessionIds: ids, projectId: proj.id });
        toast(`已把 ${ids.length} 个会话移到「${proj.name}」`);
        setBatchMode(false);
      } catch (err) { toast(err.message, "err"); }
    });
    menu.appendChild(b);
  }
  const newP = document.createElement("button");
  newP.type = "button";
  newP.innerHTML = `<i data-lucide="folder-plus" aria-hidden="true"></i><span>新建项目并移入</span>`;
  newP.addEventListener("click", async () => {
    closeFloatMenu();
    const name = await askText("项目名称：");
    if (!name || !name.trim()) return;
    try {
      const r = await apiWorkspace({ action: "project-create", name });
      await apiWorkspace({ action: "batch-assign", sessionIds: ids, projectId: r.id });
      toast(`已移入新项目「${name.trim()}」`);
      setBatchMode(false);
    } catch (err) { toast(err.message, "err"); }
  });
  menu.appendChild(newP);
  if (wsCache.projects.length) {
    const outB = document.createElement("button");
    outB.type = "button";
    outB.innerHTML = `<i data-lucide="folder-minus" aria-hidden="true"></i><span>移出项目</span>`;
    outB.addEventListener("click", async () => {
      closeFloatMenu();
      try {
        await apiWorkspace({ action: "batch-assign", sessionIds: ids, projectId: null });
        toast("已移出项目");
        setBatchMode(false);
      } catch (err) { toast(err.message, "err"); }
    });
    menu.appendChild(outB);
  }
  document.body.appendChild(menu);
  placeMenu(menu, 12, window.innerHeight - (menu.offsetHeight || 120) - 90);
  refreshIcons();
  setTimeout(() => document.addEventListener("click", closeFloatMenu, { once: true }), 0);
}
let wsCache = { projects: [], chats: {} };
let dragSid = null; // drag-to-project：当前拖拽中的 sessionId
function clearDropMarks() {
  document.querySelectorAll(".wb-drop-target").forEach((el) => el.classList.remove("wb-drop-target"));
}
async function apiWorkspace(body) {
  const res = await fetch("/api/workspace", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).catch((err) => { throw new Error(`网络请求失败：${err.message}`); });
  const out = await res.json().catch(() => ({}));
  if (!res.ok || out.ok === false) throw new Error(out.error || "操作失败");
  return out;
}
function closeFloatMenu() {
  const old = document.getElementById("wb-float-menu");
  if (old) old.remove();
}
function placeMenu(menu, x, y) {
  const w = 190, h = menu.offsetHeight || 120;
  menu.style.left = `${Math.max(8, Math.min(x, window.innerWidth - w - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(y, window.innerHeight - h - 8))}px`;
}
let lastTaskListSig = ""; // SIDEBARLIVE：列表内容签名，未变化不重建
let taskFilter = ""; // SIDEBARP2：会话搜索过滤词
let ftsTimer = null; // FULLTEXT：全文搜索防抖
let ftsSeq = 0; // FULLTEXT：丢弃乱序过期响应
function wireTaskSearch() {
  const input = $("#cw-task-search");
  if (!input || input.dataset.wired === "1") return;
  input.dataset.wired = "1";
  const clearBtn = $("#cw-task-search-clear");
  input.addEventListener("input", () => {
    taskFilter = input.value.trim();
    if (clearBtn) clearBtn.classList.toggle("cw-hidden", !taskFilter);
    loadTaskList();
    if (ftsTimer) clearTimeout(ftsTimer);
    ftsTimer = setTimeout(runFulltextSearch, 350); // FULLTEXT_20261018：跨会话全文搜索
  });
  if (clearBtn) clearBtn.addEventListener("click", () => {
    input.value = ""; taskFilter = "";
    clearBtn.classList.add("cw-hidden");
    loadTaskList();
    runFulltextSearch();
    input.focus();
  });
}

// HISTSEARCH_20261021：历史页搜索 + 分页（纯前端过滤已加载的 items，零额外请求）。
function wireHistoryTools() {
  const input = $("#cw-history-search");
  if (!input || input.dataset.wired === "1") return;
  input.dataset.wired = "1";
  const clearBtn = $("#cw-history-search-clear");
  input.addEventListener("input", () => {
    historyQuery = input.value;
    historyPage = 0; // 换搜索词回到第一页
    if (clearBtn) clearBtn.classList.toggle("cw-hidden", !historyQuery.trim());
    renderHistory();
  });
  if (clearBtn) clearBtn.addEventListener("click", () => {
    input.value = ""; historyQuery = ""; historyPage = 0;
    clearBtn.classList.add("cw-hidden");
    renderHistory();
    input.focus();
  });
  const prevBtn = $("#cw-history-prev");
  const nextBtn = $("#cw-history-next");
  if (prevBtn) prevBtn.addEventListener("click", () => { historyPage -= 1; renderHistory(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { historyPage += 1; renderHistory(); });
}
// FULLTEXT_20261018：跨会话全文搜索——服务端扫壳历史档，命中块点击直达会话。
async function runFulltextSearch() {
  const box = $("#cw-fulltext-results");
  if (!box) return;
  const q = taskFilter;
  const seq = ++ftsSeq;
  if (!q || q.length < 2) { box.classList.add("cw-hidden"); box.innerHTML = ""; return; }
  try {
    const r = await fetch("/api/history/search?q=" + encodeURIComponent(q));
    if (seq !== ftsSeq) return; // 输入已更新，丢弃过期响应
    const data = await r.json();
    const items = Array.isArray(data.items) ? data.items : [];
    box.innerHTML = "";
    if (!items.length) { box.classList.add("cw-hidden"); return; }
    const titles = (typeof wsCache === "object" && wsCache && wsCache.chats) || {};
    const head = document.createElement("div");
    head.className = "cw-fts-meta";
    head.style.padding = "5px 10px";
    head.textContent = `全文命中 ${items.length} 条`;
    box.appendChild(head);
    for (const it of items.slice(0, 12)) {
      const hit = document.createElement("div");
      hit.className = "cw-fulltext-hit";
      const meta = document.createElement("div");
      meta.className = "cw-fts-meta";
      const t = (titles[it.sessionId] || {}).title || it.sessionId.slice(0, 8);
      meta.textContent = `${it.role === "user" ? "🧑" : "🤖"} ${t} · ${new Date(it.at || 0).toLocaleString()}`;
      const sn = document.createElement("div");
      sn.className = "cw-fts-snippet";
      sn.textContent = it.snippet || "";
      hit.appendChild(meta); hit.appendChild(sn);
      hit.addEventListener("click", () => { box.classList.add("cw-hidden"); box.innerHTML = ""; openHistory(it.sessionId); });
      box.appendChild(hit);
    }
    box.classList.remove("cw-hidden");
  } catch { box.classList.add("cw-hidden"); }
}
// PROMPTLIB_20261018：提示词库——composer 空开头键入 / 弹出；↑↓ 选择、Enter 插入；存量 localStorage(wb.prompts)。
const PROMPTLIB_DEFAULTS = [
  { name: "总结要点", text: "请把上面的内容总结成要点清单，保留关键数字与结论。" },
  { name: "审查代码", text: "请审查上面的代码改动，指出 bug、边界条件和更简单的写法。" },
  { name: "投流测算", text: "按口径：总成本=13个点（5%平台费+8%团队），ROI=净成交金额÷消耗。请基于我给的数据测算并给结论。" },
];
// PROMPTLIB2_20261021：localStorage 只是即时缓存，权威副本在服务端 runtime/prompts.json。
// 启动时拉一次覆盖本地缓存（换机器/清缓存后提示词还在）；服务端不可达就继续用本地，静默降级。
let promptLibCache = null; // 内存缓存：弹层每次按键都调用 promptLibList()，不能回回读 localStorage
async function promptLibSyncFromServer() {
  try {
    const d = await fetch("/api/prompts").then((r) => r.json());
    if (d && d.ok && Array.isArray(d.prompts) && d.prompts.length) {
      promptLibCache = d.prompts;
      try { localStorage.setItem("wb.prompts", JSON.stringify(d.prompts)); } catch {}
    }
  } catch {} // 服务端不可达：保留本地副本
}
function promptLibSave(list) {
  promptLibCache = list;
  try { localStorage.setItem("wb.prompts", JSON.stringify(list)); } catch {}
  fetch("/api/prompts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompts: list }),
  }).catch(() => {}); // 落盘失败不打断界面；下次改动会再试
}
function promptLibList() {
  if (promptLibCache) return promptLibCache;
  try { const v = JSON.parse(localStorage.getItem("wb.prompts") || "null"); if (Array.isArray(v) && v.length) { promptLibCache = v; return v; } } catch {}
  return PROMPTLIB_DEFAULTS;
}
function wirePromptLib() {
  if (!textarea || textarea.dataset.promptlib === "1") return;
  textarea.dataset.promptlib = "1";
  const wrap = textarea.closest(".cw-composer-wrap");
  if (!wrap) return;
  let pop = null, idx = -1, items = [], blurTimer = null;
  const close = () => { if (pop) { pop.remove(); pop = null; } idx = -1; items = []; };
  const cancelClose = () => { if (blurTimer) { clearTimeout(blurTimer); blurTimer = null; } };
  const highlight = () => items.forEach((it, i) => it.row.classList.toggle("is-active", i === idx));
  const insert = (p) => {
    close();
    textarea.value = (textarea.value ? textarea.value.replace(/\s+$/, "") + "\n\n" : "") + p.text;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
  };
  const render = () => {
    close();
    items = promptLibList().map((p) => ({ p }));
    pop = document.createElement("div");
    pop.className = "cw-promptlib-pop";
    pop.addEventListener("mousedown", cancelClose); // 弹层内按下（含输入框取焦）不关闭
    const title = document.createElement("div");
    title.className = "cw-promptlib-title";
    title.textContent = "提示词库 · ↑↓ 选择，Enter 插入";
    pop.appendChild(title);
    items.forEach((it, i) => {
      const row = document.createElement("div");
      row.className = "cw-promptlib-item";
      const nm = document.createElement("div"); nm.className = "cw-promptlib-name"; nm.textContent = it.p.name;
      const tx = document.createElement("div"); tx.className = "cw-promptlib-text"; tx.textContent = it.p.text;
      row.appendChild(nm); row.appendChild(tx);
      row.addEventListener("mousedown", (ev) => ev.preventDefault()); // 防抢焦点触发 blur
      row.addEventListener("click", () => insert(it.p));
      const del = document.createElement("button");
      del.className = "cw-promptlib-del"; del.type = "button"; del.textContent = "×"; del.title = "删除这条提示词";
      del.addEventListener("mousedown", (ev) => { ev.preventDefault(); ev.stopPropagation(); });
      del.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const list = promptLibList().filter((x) => x.name !== it.p.name);
        promptLibSave(list); // PROMPTLIB2：本地缓存 + 服务端落盘
        render();
      });
      row.appendChild(del);
      it.row = row; pop.appendChild(row);
    });
    const add = document.createElement("div");
    add.className = "cw-promptlib-add";
    const nameIn = document.createElement("input"); nameIn.placeholder = "名称"; nameIn.maxLength = 20;
    const textIn = document.createElement("input"); textIn.placeholder = "提示词内容";
    const save = document.createElement("button"); save.type = "button"; save.textContent = "保存";
    save.addEventListener("click", () => {
      const name = nameIn.value.trim(), text = textIn.value.trim();
      if (!name || !text) return;
      const list = promptLibList().filter((x) => x.name !== name);
      list.push({ name, text });
      promptLibSave(list); // PROMPTLIB2：本地缓存 + 服务端落盘
      render();
    });
    add.appendChild(nameIn); add.appendChild(textIn); add.appendChild(save);
    pop.appendChild(add);
    wrap.appendChild(pop);
    idx = items.length ? 0 : -1;
    highlight();
  };
  textarea.addEventListener("keydown", (e) => {
    if (pop) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        if (items.length) { e.preventDefault(); e.stopImmediatePropagation(); idx = (idx + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length; highlight(); }
        return;
      }
      // 本监听先于 composer 发送监听注册：插入时必须拦停后面的 Enter 发送，否则一次按键既插入又发送
      if (e.key === "Enter" && !e.shiftKey && idx >= 0) { e.preventDefault(); e.stopImmediatePropagation(); insert(items[idx].p); return; }
      if (e.key === "Enter" && !e.shiftKey) { close(); return; } // 无选中项：关弹层，放行发送
      if (e.key === "Escape") { close(); return; }
    }
    if (e.key === "/" && (textarea.value === "" || /\s$/.test(textarea.value))) {
      e.preventDefault();
      render();
    }
  });
  textarea.addEventListener("blur", () => { blurTimer = setTimeout(close, 200); });
}
wirePromptLib();
promptLibSyncFromServer(); // PROMPTLIB2：启动时把服务端落盘副本拉回来覆盖本地缓存
async function loadTaskList() {
  const listEl = $("#cw-task-list");
  if (!listEl) return;
  try {
    const [hist, ws, statsMap] = await Promise.all([
      fetch("/api/history").then((r) => r.json()),
      fetch("/api/workspace").then((r) => r.json()).catch(() => ({ projects: [], chats: {} })),
      sessionStatsMap(),
    ]);
    const items = Array.isArray(hist.items) ? hist.items : [];
    wsCache = { projects: Array.isArray(ws.projects) ? ws.projects : [], chats: ws.chats || {} };
    const metaOf = (sid) => wsCache.chats[sid] || {};
    // SIDEBARLIVE_20261017：内容签名没变就不重建列表（防 30s 自愈刷新造成闪动/滚动跳动）。
    // 标题/归档/过滤词变化也计入签名（AI 起名、手动归档、搜索输入后仍会重绘）；状态点不经过这里，走 updateSidebarLive。
    // FAKEFIX_20261018：项目清单/置顶/所属项目也必须计入签名——否则新建项目、拖拽进项目、
    // 置顶、项目改名/删除后签名不变、列表不重绘，按钮看起来就是「假的」（用户实踩：新建项目没出来）。
    {
      const projSig = wsCache.projects.map((p) => `${p.id}:${p.name}`).join(",");
      // COLLAPSE_20261114：折叠状态必须计入签名——否则点分组头改了 collapsedSections 但列表不重绘（同 FAKEFIX 教训）
      // COLLAPSE2_20261114：项目组折叠（collapsedProjects）与归档开合（archivedOpen）同属此坑，一并计入
      const collapseSig = [...collapsedProjects].join(",") + "|" + (archivedOpen ? 1 : 0);
      const sig = taskFilter + "|" + (uiPrefs.collapsedSections || []).join(",") + "|" + collapseSig + "|" + projSig + "|" + items.map((x) => {
        const m = metaOf(x.sessionId);
        return `${x.sessionId}:${x.updatedAt || 0}:${m.title || ""}:${m.archived ? 1 : 0}:${m.pinned ? 1 : 0}:${m.projectId || ""}`;
      }).join(",");
      // SIDEBARLIVE2_20261021：活动会话（还没落历史盘的新会话）也必须进签名。旧签名只看 /api/history，
      // 新会话首条消息发出时历史没变化 → 签名相同 → 直接 return，下面「活动会话补行」那段永远跑不到，
      // 于是侧栏要等 result 或 10s 慢刷落盘后才有这一行（用户实踩：发完消息侧栏看不到）。
      const liveSig = [...sessionViews.values()]
        .filter((v) => v.sessionId && !items.some((x) => x.sessionId === v.sessionId))
        .map((v) => `${v.sessionId}:${tabTitleFor(v)}:${v.busy ? 1 : 0}`)
        .join(",");
      const fullSig = sig + "||" + liveSig;
      if (fullSig === lastTaskListSig && listEl.childElementCount) return;
      lastTaskListSig = fullSig;
    }
    const activeId = (readingHistory && readingHistory.sessionId) || currentSessionId || null; // 当前标签的会话在侧栏高亮
    const sorted = items.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    const visibleAll = sorted.filter((x) => !metaOf(x.sessionId).archived);
    const archivedItems = sorted.filter((x) => metaOf(x.sessionId).archived);
    // SIDEBARP2：搜索过滤（标题 + 内容预览 + 会话 ID 片段，大小写不敏感）
    const q = taskFilter.toLowerCase();
    const matchQ = (x) => !q ||
      `${metaOf(x.sessionId).title || ""}\n${x.preview || ""}\n${x.sessionId}`.toLowerCase().includes(q);
    const visible = visibleAll.filter(matchQ);
    const archivedShown = q ? [] : archivedItems; // 搜索时收起归档区，减少噪音
    const countEl = $("#cw-task-count");
    if (countEl) countEl.textContent = q ? `(${visible.length}/${visibleAll.length})` : `(${visibleAll.length})`;
    listEl.innerHTML = "";
    listEl.classList.toggle("is-batch", batchMode);
    if (!items.length) {
      listEl.appendChild(emptyNote("还没有会话；发送消息后会自动归档。"));
      return;
    }
    const pinned = visible.filter((x) => metaOf(x.sessionId).pinned);

    function chatRow(item, statsMap, opts) {
      const archived = Boolean(opts && opts.archived);
      const row = document.createElement("div");
      row.className = "wb-task-item" + (item.sessionId === activeId ? " is-active" : "") +
        (batchMode ? " is-batch" : "") + (batchSelected.has(item.sessionId) ? " is-checked" : "") +
        (archived ? " is-archived" : "");
      row.dataset.sid = item.sessionId;
      // 会话中心：行首实时状态点（🟡生成中 / 🟢完成待看 / 灰=已挂载空闲）
      const lv = findViewBySessionId(item.sessionId);
      if (lv && (lv.busy || lv.done || lv.kernelId)) {
        const dot = document.createElement("span");
        dot.className = "wb-live-dot" + (lv.busy ? " is-busy" : lv.done ? " is-done" : "");
        dot.title = lv.busy ? "生成中" : lv.done ? "已完成，点击查看" : "会话运行中";
        row.prepend(dot);
        if (lv.busy) row.classList.add("is-live-busy");
        else if (lv.done) row.classList.add("is-live-done");
      }
      // JOBS_20261114：后台任务运行中标记（非活动会话也可见）
      if (runningSids.has(item.sessionId) && !(lv && lv.busy)) {
        const qdot = document.createElement("span");
        qdot.className = "wb-live-dot is-queue";
        qdot.title = "后台任务运行中";
        row.prepend(qdot);
      }
      row.draggable = !batchMode && !archived; // drag-to-project：批量模式与归档行禁用拖拽
      row.innerHTML = `<strong></strong><small></small>` +
        `<span class="wb-acts">` +
        (archived
          ? `<button class="wb-act" data-act="unarchive" type="button" title="取消归档"><i data-lucide="archive-restore" aria-hidden="true"></i></button>`
          : `<button class="wb-act" data-act="aititle" type="button" title="AI 起名"><i data-lucide="sparkles" aria-hidden="true"></i></button>` +
            `<button class="wb-act" data-act="rename" type="button" title="重命名会话"><i data-lucide="pencil-line" aria-hidden="true"></i></button>` +
            `<button class="wb-act" data-act="pin" type="button" title="${metaOf(item.sessionId).pinned ? "取消置顶" : "置顶"}"><i data-lucide="pin" aria-hidden="true"></i></button>` +
            `<button class="wb-act" data-act="move" type="button" title="移动到项目"><i data-lucide="folder-input" aria-hidden="true"></i></button>` +
            `<button class="wb-act" data-act="archive" type="button" title="归档"><i data-lucide="archive" aria-hidden="true"></i></button>`) +
        `<button class="wb-act" data-act="del" type="button" title="删除">×</button>` +
        `</span>`;
      let pressOnAct = false; // 记录按下起点是否在操作按钮上：按钮上不允许起拖
      row.addEventListener("pointerdown", (e) => { pressOnAct = Boolean(e.target.closest("button, .wb-acts")); });
      row.addEventListener("dragstart", (e) => {
        if (pressOnAct) { e.preventDefault(); return; }
        dragSid = item.sessionId;
        if (e.dataTransfer) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", item.sessionId);
        }
        row.classList.add("is-dragging");
      });
      row.addEventListener("dragend", () => {
        dragSid = null;
        row.classList.remove("is-dragging");
        clearDropMarks();
      });
      row.addEventListener("click", (e) => {
        const act = e.target.closest("[data-act]");
        if (act) { e.stopPropagation(); rowAction(act.dataset.act, item, e); return; }
        if (batchMode) {
          if (batchSelected.has(item.sessionId)) batchSelected.delete(item.sessionId);
          else batchSelected.add(item.sessionId);
          row.classList.toggle("is-checked", batchSelected.has(item.sessionId));
          const cb = row.querySelector(".wb-batch-check");
          if (cb) cb.checked = batchSelected.has(item.sessionId);
          updateBatchBar();
          return;
        }
        openSessionTab(item.sessionId, metaOf(item.sessionId).title || item.preview || "");
      });
      if (batchMode) {
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "wb-batch-check";
        cb.checked = batchSelected.has(item.sessionId);
        cb.addEventListener("click", (e) => e.stopPropagation());
        cb.addEventListener("change", () => {
          if (cb.checked) batchSelected.add(item.sessionId); else batchSelected.delete(item.sessionId);
          row.classList.toggle("is-checked", cb.checked);
          updateBatchBar();
        });
        row.prepend(cb);
      }
      // TITLEBACKFILL_20261018：优先 workspace 标题，其次历史档回填的 title，最后才是首条消息预览。
      $("strong", row).textContent = metaOf(item.sessionId).title || item.title || item.preview || "(无文字内容)";
      const st = statsMap && statsMap[item.sessionId];
      const smallEl = $("small", row);
      // DSHALIGN2_20261114：行内小字只显示时间（对齐 DSH 左栏），费用/token 移到 hover 提示
      smallEl.textContent = relativeTime(item.updatedAt);
      if (st && Number(st.turns)) {
        row.title = `累计 ${st.turns} 轮 · ¥${Number(st.cost).toFixed(4)} · ${formatNum(st.totalTokens)} tok · 缓存命中 ${(Number(st.hitRate) * 100).toFixed(0)}%`;
      }
      return row;
    }
    function rowAction(act, item, e) {
      if (act === "archive") {
        apiWorkspace({ action: "archive", sessionId: item.sessionId, archived: true })
          .then(() => { toast("已归档"); archivedOpen = true; loadTaskList(); })
          .catch((err) => toast(err.message, "err"));
        return;
      }
      if (act === "unarchive") {
        apiWorkspace({ action: "archive", sessionId: item.sessionId, archived: false })
          .then(() => { toast("已取消归档"); loadTaskList(); })
          .catch((err) => toast(err.message, "err"));
        return;
      }
      if (act === "aititle") {
        if (aiTitleBusy.has(item.sessionId)) { toast("正在起名，请稍候…", "warn"); return; }
        aiTitleBusy.add(item.sessionId);
        toast("AI 起名中…");
        fetch("/api/auto-title", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: item.sessionId }),
        })
          .then(async (res) => {
            const out = await res.json().catch(() => ({}));
            if (!res.ok || out.ok === false) throw new Error(out.error || "AI 起名失败");
            toast(`已命名为「${out.title}」`);
            loadTaskList();
          })
          .catch((err) => toast(err.message, "err"))
          .finally(() => aiTitleBusy.delete(item.sessionId));
        return;
      }
      if (act === "rename") {
        const cur = metaOf(item.sessionId).title || item.title || item.preview || "";
        askText("重命名会话（留空恢复默认标题）：", cur).then((name) => {
          if (name === null) return;
          apiWorkspace({ action: "rename", sessionId: item.sessionId, title: name.trim() })
            .then(() => { toast(name.trim() ? "已重命名" : "已恢复默认标题"); loadTaskList(); })
            .catch((err) => toast(err.message, "err"));
        });
        return;
      }
      if (act === "del") { deleteHistory(item.sessionId); return; }
      if (act === "pin") {
        const cur = Boolean(metaOf(item.sessionId).pinned);
        apiWorkspace({ action: "pin", sessionId: item.sessionId, pinned: !cur })
          .then(() => { toast(cur ? "已取消置顶" : "已置顶"); loadTaskList(); })
          .catch((err) => toast(err.message, "err"));
        return;
      }
      if (act === "move") showMoveMenu(item, e.clientX, e.clientY);
    }
    async function deleteHistory(sid) {
      try {
        const res = await fetch(`/api/history?id=${encodeURIComponent(sid)}`, { method: "DELETE" });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || out.ok === false) return toast(out.error || "删除失败", "err");
        toast("已删除会话");
        loadTaskList();
      } catch (err) {
        // FETCHGUARD_20261021：桥断开时原来抛的是未捕获拒绝，界面毫无反馈。
        toast(`删除失败：${(err && err.message) || err}`, "err");
      }
    }
    function mkHead(label, actionsHtml) {
      const head = document.createElement("div");
      head.className = "wb-sec-head";
      head.innerHTML = `<span></span><span class="wb-sec-head-r">${actionsHtml || ""}</span>`;
      const first = head.querySelector("span");
      first.textContent = label;
      return head;
    }
    // COLLAPSE_20261114：侧栏分组折叠（置顶/最近/今天/7天内/更早），状态持久化到 uiPrefs.collapsedSections
    function isSectionCollapsed(key) { return (uiPrefs.collapsedSections || []).includes(key); }
    function toggleSection(key) {
      const arr = (uiPrefs.collapsedSections || []).slice();
      const i = arr.indexOf(key);
      if (i >= 0) arr.splice(i, 1); else arr.push(key);
      uiPrefs.collapsedSections = arr;
      saveUiPrefs();
    }
    function mkSectionHead(label, actionsHtml, key) {
      const head = mkHead(label, actionsHtml);
      head.classList.add("is-collapsible");
      const chev = document.createElement("i");
      chev.setAttribute("data-lucide", isSectionCollapsed(key) ? "chevron-right" : "chevron-down");
      chev.setAttribute("aria-hidden", "true");
      chev.className = "wb-sec-chev";
      head.insertBefore(chev, head.firstChild);
      head.addEventListener("click", (e) => {
        if (e.target.closest("[data-sec-act]")) return;
        toggleSection(key);
        loadTaskList();
      });
      return head;
    }
    function mkSubHead(label, n, key) {
      const h = document.createElement("div");
      h.className = "wb-sub-head is-collapsible";
      h.innerHTML = `<i data-lucide="${isSectionCollapsed(key) ? "chevron-right" : "chevron-down"}" class="wb-sec-chev" aria-hidden="true"></i><span>${label} · ${n}</span>`;
      h.addEventListener("click", () => { toggleSection(key); loadTaskList(); });
      return h;
    }
    function showMoveMenu(item, x, y) {
      closeFloatMenu();
      const menu = document.createElement("div");
      menu.className = "wb-float-menu";
      menu.id = "wb-float-menu";
      for (const proj of wsCache.projects) {
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = `<i data-lucide="folder" aria-hidden="true"></i><span></span>`;
        b.querySelector("span").textContent = proj.name;
        b.addEventListener("click", async () => {
          closeFloatMenu();
          try { await apiWorkspace({ action: "assign", sessionId: item.sessionId, projectId: proj.id }); toast(`已移动到「${proj.name}」`); loadTaskList(); } catch (err) { toast(err.message, "err"); }
        });
        menu.appendChild(b);
      }
      const newP = document.createElement("button");
      newP.type = "button";
      newP.innerHTML = `<i data-lucide="folder-plus" aria-hidden="true"></i><span>新建项目并移入</span>`;
      newP.addEventListener("click", async () => {
        closeFloatMenu();
        const name = await askText("项目名称：");
        if (!name || !name.trim()) return;
        try {
          const r = await apiWorkspace({ action: "project-create", name });
          await apiWorkspace({ action: "assign", sessionId: item.sessionId, projectId: r.id });
          toast(`已移入新项目「${name.trim()}」`);
          loadTaskList();
        } catch (err) { toast(err.message, "err"); }
      });
      menu.appendChild(newP);
      if (metaOf(item.sessionId).projectId) {
        const outB = document.createElement("button");
        outB.type = "button";
        outB.innerHTML = `<i data-lucide="folder-minus" aria-hidden="true"></i><span>移出项目</span>`;
        outB.addEventListener("click", async () => {
          closeFloatMenu();
          try { await apiWorkspace({ action: "assign", sessionId: item.sessionId, projectId: null }); toast("已移出项目"); loadTaskList(); } catch (err) { toast(err.message, "err"); }
        });
        menu.appendChild(outB);
      }
      document.body.appendChild(menu);
      placeMenu(menu, x, y);
      refreshIcons();
      setTimeout(() => document.addEventListener("click", closeFloatMenu, { once: true }), 0);
    }
    function projMenu(proj, x, y) {
      closeFloatMenu();
      const menu = document.createElement("div");
      menu.className = "wb-float-menu";
      menu.id = "wb-float-menu";
      const rn = document.createElement("button");
      rn.type = "button";
      rn.textContent = "重命名项目";
      rn.addEventListener("click", async () => {
        closeFloatMenu();
        const name = await askText("新的项目名称：", proj.name);
        if (!name || !name.trim() || name.trim() === proj.name) return;
        try { await apiWorkspace({ action: "project-rename", id: proj.id, name }); loadTaskList(); } catch (err) { toast(err.message, "err"); }
      });
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "删除项目（会话移回最近）";
      del.addEventListener("click", async () => {
        closeFloatMenu();
        if (!window.confirm(`删除项目「${proj.name}」？其中的会话会移回「最近」。`)) return;
        try { await apiWorkspace({ action: "project-delete", id: proj.id }); toast("项目已删除"); loadTaskList(); } catch (err) { toast(err.message, "err"); }
      });
      menu.append(rn, del);
      document.body.appendChild(menu);
      placeMenu(menu, x, y);
      setTimeout(() => document.addEventListener("click", closeFloatMenu, { once: true }), 0);
    }

    if (pinned.length) {
      listEl.appendChild(mkSectionHead("置顶", "", "pinned"));
      if (!isSectionCollapsed("pinned")) for (const it of pinned) listEl.appendChild(chatRow(it, statsMap));
    }
    // SIDEBARP2：会话行右键菜单（复用行内按钮同一套动作；挂载一次，闭包只引用模块级状态）
    function initTaskContextMenu() {
      if (listEl.dataset.ctxWired === "1") return;
      listEl.dataset.ctxWired = "1";
      listEl.addEventListener("contextmenu", (e) => {
        const row = e.target.closest(".wb-task-item");
        if (!row || !row.dataset.sid || row.classList.contains("is-archived")) return;
        e.preventDefault();
        const sid = row.dataset.sid;
        const item = { sessionId: sid };
        closeFloatMenu();
        const menu = document.createElement("div");
        menu.className = "wb-float-menu";
        menu.id = "wb-float-menu";
        const add = (icon, label, fn) => {
          const b = document.createElement("button");
          b.type = "button";
          b.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i><span></span>`;
          b.querySelector("span").textContent = label;
          b.addEventListener("click", () => { closeFloatMenu(); fn(e); });
          menu.appendChild(b);
        };
        add("pencil-line", "重命名", (ev) => rowAction("rename", item, ev));
        add("pin", (wsCache.chats[sid] || {}).pinned ? "取消置顶" : "置顶", (ev) => rowAction("pin", item, ev));
        add("folder-input", "移动到项目", (ev) => rowAction("move", item, ev));
        add("sparkles", "AI 起名", (ev) => rowAction("aititle", item, ev));
        add("archive", "归档", (ev) => rowAction("archive", item, ev));
        add("copy", "复制会话 ID", () => {
          copyText(sid).then((ok) => toast(ok ? "已复制会话 ID" : "复制失败：剪贴板不可用", ok ? undefined : "err"));
        });
        const delB = document.createElement("button");
        delB.type = "button";
        delB.innerHTML = `<i data-lucide="trash-2" aria-hidden="true"></i><span>删除会话</span>`;
        delB.addEventListener("click", () => { closeFloatMenu(); deleteHistory(sid); });
        menu.appendChild(delB);
        document.body.appendChild(menu);
        placeMenu(menu, e.clientX, e.clientY);
        refreshIcons();
        setTimeout(() => document.addEventListener("click", closeFloatMenu, { once: true }), 0);
      });
    }
    const head = mkHead("项目", `<button class="wb-sec-act" data-sec-act="newproj" type="button">＋ 新建项目</button>`);
    listEl.appendChild(head);
    head.querySelector("[data-sec-act=\"newproj\"]").addEventListener("click", async () => {
      const name = await askText("项目名称：");
      if (!name || !name.trim()) return;
      try { await apiWorkspace({ action: "project-create", name }); toast("项目已创建"); loadTaskList(); } catch (err) { toast(err.message, "err"); }
    });
    for (const proj of wsCache.projects) {
      const chats = visible.filter((x) => !metaOf(x.sessionId).pinned && metaOf(x.sessionId).projectId === proj.id);
      const wrap = document.createElement("div");
      wrap.className = "wb-proj";
      const ph = document.createElement("div");
      ph.className = "wb-proj-head";
      ph.dataset.projId = proj.id; // drag-to-project：项目组头作为投放目标
      ph.innerHTML = `<i data-lucide="${collapsedProjects.has(proj.id) ? "chevron-right" : "chevron-down"}" aria-hidden="true"></i><span></span><small></small>` +
        `<button class="wb-proj-menu" type="button" title="项目操作"><i data-lucide="more-horizontal" aria-hidden="true"></i></button>`;
      ph.querySelector("span").textContent = proj.name;
      ph.querySelector("small").textContent = `${chats.length}`;
      ph.addEventListener("click", (e) => {
        if (e.target.closest(".wb-proj-menu")) { e.stopPropagation(); projMenu(proj, e.clientX, e.clientY); return; }
        if (collapsedProjects.has(proj.id)) collapsedProjects.delete(proj.id); else collapsedProjects.add(proj.id);
        loadTaskList();
      });
      wrap.appendChild(ph);
      if (!collapsedProjects.has(proj.id)) {
        const box = document.createElement("div");
        box.className = "wb-proj-chats";
        for (const it of chats) box.appendChild(chatRow(it, statsMap));
        wrap.appendChild(box);
      }
      listEl.appendChild(wrap);
    }
    const loose = visible.filter((x) => !metaOf(x.sessionId).pinned && !metaOf(x.sessionId).projectId);
    // 「最近」区头固定渲染（即使没有散会话）：作为拖拽移出项目的投放区。
    const recentHead = mkSectionHead("最近", "", "recent");
    recentHead.dataset.dropZone = "loose";
    listEl.appendChild(recentHead);
    // SIDEBARP2：「最近」区按时间分组（今天 / 7 天内 / 更早），长列表不再无限平铺
    const DAY = 864e5;
    const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
    const t0 = startOfToday.getTime();
    const gToday = [], gWeek = [], gOlder = [];
    for (const it of loose) {
      if ((it.updatedAt || 0) >= t0) gToday.push(it);
      else if ((it.updatedAt || 0) >= t0 - 6 * DAY) gWeek.push(it);
      else gOlder.push(it);
    }
    const subKey = (label) => "recent-" + (label === "今天" ? "today" : label === "7 天内" ? "week" : "older");
    for (const [label, arr] of [["今天", gToday], ["7 天内", gWeek], ["更早", gOlder]]) {
      if (!arr.length) continue;
      if (isSectionCollapsed("recent")) continue; // 「最近」整体折叠时子分组一并隐藏
      const key = subKey(label);
      listEl.appendChild(mkSubHead(label, arr.length, key));
      if (!isSectionCollapsed(key)) for (const it of arr) listEl.appendChild(chatRow(it, statsMap));
    }
    // 还没落历史盘的活动会话（首轮生成中/刚建）也进「最近」区，保证侧栏看得到、点得到
    const knownSids = new Set(items.map((x) => x.sessionId));
    for (const v of sessionViews.values()) {
      if (!v.sessionId || knownSids.has(v.sessionId) || batchSelected.has(v.sessionId)) continue;
      if (isSectionCollapsed("recent")) break; // 「最近」折叠时不渲染在途会话行
      const liveItem = { sessionId: v.sessionId, updatedAt: Date.now(), preview: tabTitleFor(v) };
      if (!matchQ(liveItem)) continue;
      listEl.appendChild(chatRow(liveItem, statsMap));
    }
    if (q && !listEl.querySelector(".wb-task-item")) {
      listEl.appendChild(emptyNote("没有匹配的会话"));
    }
    // 归档折叠区：入口常驻，展开才渲染归档行（搜索时收起）。
    const archHead = document.createElement("div");
    archHead.className = "wb-arch-head";
    archHead.innerHTML = `<i data-lucide="${archivedOpen ? "chevron-down" : "chevron-right"}" aria-hidden="true"></i><span>归档</span><small>(${archivedShown.length})</small>`;
    archHead.addEventListener("click", () => { archivedOpen = !archivedOpen; loadTaskList(); });
    if (!q) listEl.appendChild(archHead);
    if (!q && archivedOpen && archivedShown.length) {
      const archBox = document.createElement("div");
      archBox.className = "wb-arch-chats";
      for (const it of archivedShown) archBox.appendChild(chatRow(it, statsMap, { archived: true }));
      listEl.appendChild(archBox);
    }
    wireTaskSearch();
    initTaskContextMenu();
    refreshIcons();
  } catch (err) {
    listEl.innerHTML = "";
    listEl.appendChild(emptyNote(`会话读取失败：${err.message}`));
  }
}

/* drag-to-project：把侧栏会话拖进项目（投放目标=项目组头），拖到「最近」区=移出项目 */
function initDragToProject() {
  const listEl = $("#cw-task-list");
  if (!listEl || listEl.dataset.dndWired === "1") return;
  listEl.dataset.dndWired = "1";
  const findHead = (e) => e.target.closest(".wb-proj-head");
  const findLoose = (e) => e.target.closest("[data-drop-zone='loose']");
  listEl.addEventListener("dragover", (e) => {
    if (!dragSid) return;
    const head = findHead(e);
    const zone = findLoose(e);
    if (!head && !zone) { clearDropMarks(); return; }
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
    const el = head || zone;
    if (!el.classList.contains("wb-drop-target")) { clearDropMarks(); el.classList.add("wb-drop-target"); }
  });
  listEl.addEventListener("dragleave", (e) => {
    const el = e.target.closest && e.target.closest(".wb-drop-target");
    if (el && !(e.relatedTarget && el.contains(e.relatedTarget))) el.classList.remove("wb-drop-target");
  });
  listEl.addEventListener("drop", async (e) => {
    if (!dragSid) return;
    e.preventDefault();
    const head = findHead(e);
    const zone = findLoose(e);
    clearDropMarks();
    const sid = dragSid;
    dragSid = null;
    if (head) {
      const proj = wsCache.projects.find((p) => p.id === head.dataset.projId);
      if (!proj) return;
      if ((wsCache.chats[sid] || {}).projectId === proj.id) { toast("已在该项目中"); return; }
      try {
        await apiWorkspace({ action: "assign", sessionId: sid, projectId: proj.id });
        toast(`已移动到「${proj.name}」`);
        loadTaskList();
      } catch (err) { toast(err.message, "err"); }
      return;
    }
    if (zone) {
      if (!(wsCache.chats[sid] || {}).projectId) { toast("该会话不在任何项目中"); return; }
      try {
        await apiWorkspace({ action: "assign", sessionId: sid, projectId: null });
        toast("已移出项目");
        loadTaskList();
      } catch (err) { toast(err.message, "err"); }
    }
  });
  // 兜底：拖到列表外一律不允许落（防 sessionId 文本被丢进聊天输入框/页面其他位置）
  const guardOver = (e) => {
    if (!dragSid) return;
    if (!e.target.closest || e.target.closest("#cw-task-list")) return;
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "none";
  };
  const guardDrop = (e) => {
    if (dragSid && (!e.target.closest || !e.target.closest("#cw-task-list"))) e.preventDefault();
  };
  document.addEventListener("dragover", guardOver, true);
  document.addEventListener("drop", guardDrop, true);
}

/* REPLAYWINDOW_20261021：切回标签只看到零星几条消息。
   旧实现按「原始条目数」留最后 200 条。但工具密集型回合里，每次工具调用都是一条
   独立 assistant 条目（实测一条会话 863 条中 759 条是 assistant、445 对是纯工具），
   200 条窗口里只剩 1 条用户提问、3 条有正文的回答，切回来就像记录被吞了。
   改为按「轮」开窗：始终完整保留最近 MIN_VISIBLE_TURNS 轮用户提问及其回答，
   只有超过 MAX_RENDER_ENTRIES 这种极端情况才截断，且截断点对齐到轮首，不切断某一轮。

   FULLREPLAY_20261021：上面的「8 轮」窗口仍然把切回做成了「只有最后几步」。
   实测这条会话 2518 条里 user 只占 33 条、其余全是工具条目，8 轮窗口 = 从第 25 轮
   「重启了」开始，前面 25 轮整段被折叠成一句「加载更早记录（还有 25 轮）」——用户
   切回自己刚才那步，看到的就是「从第一步开始」。
   用户主动点开/切回一个会话，意思就是要看这条会话的完整上下文，不是要一个摘要窗口。
   所以默认整段渲染，只在条目数真的会拖垮 DOM 时才截断（阈值内不受影响）。 */
const MIN_VISIBLE_TURNS = 8; // 截断时至少完整保留的轮数（截断点对齐轮首，不切断某一轮）
const MAX_RENDER_ENTRIES = 12000;
function computeTranscriptStart(list) {
  const total = list.length;
  if (!total) return 0;
  if (total <= MAX_RENDER_ENTRIES) return 0; // 常规会话：整段渲染，一刀不切
  // 只有超长会话才开窗：起点同时满足「至少 MIN_VISIBLE_TURNS 轮」和「条目不超过
  // MAX_RENDER_ENTRIES」，即取两者里更靠后的那个；再回退到最近的用户提问作为轮首。
  let start = 0;
  const userIdx = [];
  for (let i = 0; i < total; i++) if (list[i] && list[i].role === "user") userIdx.push(i);
  if (userIdx.length > MIN_VISIBLE_TURNS) start = userIdx[userIdx.length - MIN_VISIBLE_TURNS];
  const hard = Math.max(0, total - MAX_RENDER_ENTRIES);
  if (start < hard) {
    let s = hard;
    while (s > 0 && !(list[s] && list[s].role === "user")) s -= 1;
    start = (list[s] && list[s].role === "user") ? s : hard;
  }
  return Math.max(0, Math.min(start, total));
}

/* 右侧产物面板：复用素材接口 */
function renderTranscript(entries, mode) {
  if (!threadEl) return;
  const list = Array.isArray(entries) ? entries : [];
  lastTranscript = list;
  if (mode === "top" || mode === "bottom") transcriptHidden = computeTranscriptStart(list);
  const visible = list.slice(transcriptHidden);
  const prevHeight = threadEl.scrollHeight;
  threadEl.innerHTML = "";
  todoCardEl = null; // TODOCARD_20261018：重放重建，实时卡片随历史重画
  if (!list.length) {
    addSystemNote("这条会话没有可显示的记录。");
    return;
  }
  if (transcriptHidden > 0) {
    const more = document.createElement("article");
    more.className = "cw-message";
    const wrap = document.createElement("div");
    wrap.className = "cw-inline-note";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cw-ghost-btn";
    // 按轮往前翻：一次多放 MIN_VISIBLE_TURNS 轮，而不是「再往前 200 条原始条目」。
    let earlierTurns = 0;
    for (let i = 0; i < transcriptHidden; i++) if (list[i] && list[i].role === "user") earlierTurns += 1;
    btn.textContent = earlierTurns > 0
      ? `加载更早记录（还有 ${earlierTurns} 轮）`
      : `加载更早记录（还有 ${transcriptHidden} 条）`;
    btn.addEventListener("click", () => {
      const prevStart = transcriptHidden;
      let seen = 0;
      let next = 0;
      for (let i = prevStart - 1; i >= 0; i--) {
        if (list[i] && list[i].role === "user") {
          seen += 1;
          if (seen >= MIN_VISIBLE_TURNS) { next = i; break; }
        }
      }
      transcriptHidden = next;
      renderTranscript(lastTranscript, "keep");
    });
    wrap.appendChild(btn);
    more.appendChild(wrap);
    threadEl.appendChild(more);
  }
  // POLISH_20261018：按完整列表预计算用户消息序号（第 N 条）——注意含被 AUTODUPE 折叠的重复条目，
  // 服务端原生档案里它们真实存在，序号必须与档案一致。
  {
    let u = 0;
    for (const e of list) if (e.role === "user") { u += 1; e.__userOrdinal = u; }
    lastUserOrdinal = u;
  }
  let prevUserEntry = null; // AUTODUPE_20261017：重放时折叠 5 秒内的重复用户条目（换档重启曾把同一条记两次）
  const artUsed = new Set(); // ARTKEEP：本次重画的产物占用集，一条记录只挂一轮
  for (const entry of visible) {
    if (entry.role === "user") {
      const gap = (Number(entry.at) || 0) - (Number(prevUserEntry && prevUserEntry.at) || 0);
      if (prevUserEntry && gap >= 0 && gap < 5000
          && String(prevUserEntry.text || "") === String(entry.text || "")
          && Number(prevUserEntry.images) === Number(entry.images)) {
        continue; // 同一句话 5 秒内的第二条 = 服务端重复记录，跳过
      }
      prevUserEntry = entry;
      currentAssistant = null; // 轮边界：用户消息之后开新气泡
      // MSGIMAGES_20261018：服务端已按时间把真实素材挂到 entry.imageItems；没有则退回占位。
      addUserMessage(
        entry.text || "",
        Array.isArray(entry.imageItems) && entry.imageItems.length
          ? entry.imageItems
          : Array.from({ length: Number(entry.images) || 0 }, () => ({})),
        Number(entry.at) || 0,
        entry.__userOrdinal,
      );
    } else if (entry.role === "assistant") {
      // REPLAYFIX_20261017：连续 assistant 条目并入同一个轮次气泡（对齐实时视图）。
      // 之前一条一个 article，切标签回来/看历史时整轮被"切碎"成 N 个工具条+文本块。
      const ctx = replayEnsureAssistant();
      if (entry.thinking) appendReplayThinking(ctx, entry.thinking); // THINKPERSIST（P4）：重建思考块
      for (const t of entry.tools || []) appendReplayTool(ctx, t);
      if (entry.todos) appendTodoCard(entry.todos); // TODOCARD_20261018：历史档里带任务清单的轮次原地重画卡片
      if (entry.text) {
        const para = document.createElement("p");
        para.innerHTML = renderRich(entry.text);
        ctx.body.appendChild(para);
      }
    } else if (entry.role === "result") {
      // ARTKEEP_20261021：历史重画时把该轮产物卡片复原。以前卡片只是 DOM 里的临时节点，
      // renderTranscript 一清空就永久消失——这就是「聊着聊着产物又没了」。
      const artSid = (readingHistory && readingHistory.sessionId) || currentSessionId || null;
      const artItems = artifactsForTurn(artSid, entry.at, artUsed);
      if (currentAssistant) {
        // footer 并进气泡内 + 收轮（与实时视图一致），不再单独成块
        mergeToolGroups(currentAssistant);
        currentAssistant.body.appendChild(buildResultRow(entry));
        if (artItems) {
          const block = buildArtifactBlock(artItems);
          if (block) currentAssistant.body.appendChild(block);
        }
        currentAssistant = null;
      } else {
        const article = document.createElement("article");
        article.className = "cw-message";
        article.appendChild(buildResultRow(entry));
        if (artItems) {
          const block = buildArtifactBlock(artItems);
          if (block) article.appendChild(block);
        }
        threadEl.appendChild(article);
      }
    }
  }
  currentAssistant = null;
  endAssistantTurn();
  turnStartAt = 0;
  refreshIcons();
  // 历史回看从顶部开始读；返回当前会话时定位到最新；加载更早时保持视口位置。
  if (mode === "keep") {
    threadEl.scrollTop = Math.max(0, threadEl.scrollHeight - prevHeight);
    updateJumpLatest();
  } else if (mode === "top") {
    stickToBottom = false;
    threadEl.scrollTop = 0;
    updateJumpLatest();
  } else {
    stickToBottom = true;
    scrollToEnd(true);
  }
}

/* ---------- 多会话标签：渲染与切换 ---------- */

function tabTitleFor(v) {
  if (v.title) return v.title;
  if (v.sessionId) return `会话 ${String(v.sessionId).slice(0, 8)}`;
  return "新会话";
}

function renderSessionTabs() {
  const bar = document.getElementById("cw-session-tabs");
  if (!bar) return;
  // TABBAROFF_20261114：用户要求操作体验对齐 WorkBuddy——会话只在左侧列表切换，
  // 顶部标签栏整排移除。多会话后台运行不受影响（内核池照旧，任务队列/状态栏仍可见）。
  bar.classList.add("cw-hidden");
  bar.innerHTML = "";
  const act = null;
  if (act && act.scrollIntoView) act.scrollIntoView({ block: "nearest", inline: "nearest" });
}

async function closeView(v) {
  if (v.kernelId) {
    // 宽松化（2026-10-18）：生成中也允许关——后端 409 时确认一次就带 force 强杀，不再逼用户「先停止再关」。
    let force = false;
    for (;;) {
      let res, data = {};
      try {
        res = await fetch("/api/session/close", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kernelId: v.kernelId, force }),
        });
        data = await res.json().catch(() => ({}));
      } catch (err) {
        return toast(`关闭失败：${err.message}`, "err");
      }
      if (res.ok && data.ok !== false) break;
      if (res.status === 409 && data.code === "busy" && !force) {
        if (!confirm("该会话正在生成，强制关闭会丢弃本轮输出。确定关闭？")) return;
        force = true;
        continue;
      }
      return toast(data.error || "关闭失败", "err");
    }
  }
  sessionViews.delete(v.key);
  if (activeViewKey === v.key) {
    activeViewKey = null;
    const next = [...sessionViews.values()][0];
    if (next) await setActiveView(next.key);
    else await openNewTab();
  } else {
    renderSessionTabs();
  }
  persistTabs();
  loadTaskList(); // 状态点随视图移除
}

async function setActiveView(key) {
  const v = sessionViews.get(key);
  if (!v || activeViewKey === key) return;
  saveDraft();
  // SWITCHBUF_20261023：轮次在前台跑到一半就切走时，后台缓冲 v.buf 还不存在——它只在
  // 后台收到 turn_start 时才创建。于是切走期间的 delta/工具事件全被丢弃（if (v.buf) 直接漏），
  // 切回来只能走「无缓冲」分支：秒表从 1s 重数、已出的工具记录消失，看着像整轮从头再来。
  // 离场前把 buf 播种出来（起点用真实 turnStartAt），后台事件从此有处可落。
  const outgoingView = sessionViews.get(activeViewKey);
  if (outgoingView && outgoingView.kernelId && (busy || thinkingStartAt)) {
    // THINKSNAP_20261115：思考流只活在 DOM（currentAssistant.thinkBuffer），服务端 transcript
    // 不存思考（assistant 条目仅 role/text/tools/at）。切走会清 DOM，而旧逻辑 buf 只收「切走后」
    // 的后台 delta，且仅在 buf 为空时播种→切走前已渲染的思考、以及反复切回后新增的思考全部丢失，
    // 切回只能重放后台片段，看着像整轮重新思考。离场把当前完整思考快照进 buf.think（transcript
    // 无思考，重放不重复）；text/tools 仍只缓冲后台增量（transcript 已有，防重复）。
    const snapThink = (currentAssistant && currentAssistant.thinkBuffer) || "";
    if (!outgoingView.buf) outgoingView.buf = { text: "", think: "", tools: [], startedAt: turnStartAt || thinkingStartAt || Date.now() };
    if (snapThink) outgoingView.buf.think = snapThink;
  }
  stashViewState(outgoingView); // VIEWSTATE_20261021：附件/续跑标记先存回旧标签
  activeViewKey = key;
  // 重置单会话渲染状态：全局 busy/秒表/转写缓存都描述当前标签
  currentAssistant = null;
  teardownAssistantTurn(); // TURNCLEAN_20261021：切台只清 DOM/定时器，不重复打 /api/usage
  thinkingStartAt = 0;
  turnStartAt = 0;
  lastTranscript = [];
  transcriptHidden = 0;
  if (threadEl) threadEl.innerHTML = "";
  clearHistoryBanner();
  clearRecoverBanner();
  currentSessionId = v.sessionId || null;
  readingHistory = v.detached && v.sessionId ? { sessionId: v.sessionId, turns: 0 } : null;
  setBusy(Boolean(v.busy), true); // quiet：切台不打 /api/usage，下面 syncComposerModel 会取权威值
  setTurns(v.turns || 0);
  if (currentSessionId) setSession(currentSessionId);
  else {
    // 空白标签：清掉上个标签留下的会话/费用 chip
    if (sessionChip) { sessionChip.remove(); sessionChip = null; }
    if (costChip) { costChip.remove(); costChip = null; }
  }
  renderSessionTabs();
  syncSidebarActive();
  applyViewControls(v); // H2：切台即时回显（缓存值），随后 syncComposerModel 用 /api/sessions 权威校正
  // 会话独立浏览器：同步前端正看的会话，浏览器视图随之切换，MCP 建标签也不再抢错视图
  try {
    const bapi = browserApi();
    // ISOLATE_20261021：归属键用 browserSessionKey()（空白/历史标签也有自己的桶），
    // 否则这些标签的 frontendSession 为 null，过滤后只剩公共区标签，等于继续共用。
    if (bapi && bapi.setSession) bapi.setSession(browserSessionKey()).then(renderBrowserState).catch(() => {});
  } catch {}
  restoreDraft();
  applyViewState(v); // VIEWSTATE_20261021：装回目标标签的附件与自动续跑状态
  v.done = false;
  if (v.kernelId) {
    // SWITCHRACE_20261111：登记期望内核 + 打开转写加载窗口，流式事件先转后台缓冲
    activeExpectedKernelId = v.kernelId;
    switchTranscriptLoading = true;
    // attached：直接读内核内存转写（含本轮进行中内容）
    try {
      // TRANSCRIPTK_20261111：带 kernelId 精确归属。本地会话（sessionId 未回报）切走再切回时，
      // 旧逻辑回落 /api/transcript（无参数）→ server 返回 activeKernel——多内核池里可能是
      // 别的会话的内核 → 空转写，显示"没有已记录"。带 kernelId 后 server 按标签精确解析。
      // SIDMERGE_20261112：有 sid 时也附带 kernelId（若标签绑定内核在池中）——server 端
      // sid 命中内核后优先读内存，内存空（轮内切走空窗）再落历史档兜底，不再空窗。
      const url = currentSessionId
        ? `/api/transcript?id=${encodeURIComponent(currentSessionId)}${v.kernelId ? `&kernelId=${encodeURIComponent(v.kernelId)}` : ""}`
        : v.kernelId
          ? `/api/transcript?kernelId=${encodeURIComponent(v.kernelId)}`
          : "/api/transcript";
      const data = await fetch(url).then((r) => r.json());
      if (activeViewKey === key) renderTranscript((data && data.entries) || [], "bottom");
      // 服务端可能借本次请求回填 sessionId（本地会话中途已认领），同步进标签
      if (activeViewKey === key && !currentSessionId && data && data.sessionId) {
        currentSessionId = data.sessionId;
        v.sessionId = data.sessionId;
        setSession(data.sessionId);
      }
      // SWITCHNOTE_20261111：转写为空但该标签确实跑过轮次（turns>0）→ 说明是"本地会话
      // 未认领 sessionId + 内核 transcript 被重置"的蒸发场景，给出明确提示而非空白页，
      // 并引导续接（发消息会自动 --resume 原生档案，原生 CLI 档不受壳层蒸发影响）。
      if (activeViewKey === key && (data.entries || []).length === 0 && (data.turns || 0) > 0 && !v.busy) {
        addSystemNote(
          `此会话跑过 ${data.turns} 轮，但壳层转写已被内核回收（本地会话未认领 sessionId，不落盘）。` +
          `直接发送消息即可续接原对话上下文（自动 --resume）。`,
          "warn"
        );
      }
    } catch {
      if (activeViewKey === key) renderTranscript([], "bottom");
    }
    // 窗口关闭：此后事件恢复直写 DOM（此时 DOM 已由 renderTranscript 建好）
    switchTranscriptLoading = false;
    if (activeViewKey === key && v.buf && v.busy) {
      // 切回不丢：重放后台期间缓冲的思考/正文/工具，再无缝接实时流
      turnStartAt = v.buf.startedAt || Date.now();
      thinkingStartAt = turnStartAt; // 秒表接着真实轮次起点走，不从 0 重数
      const ctx = beginAssistantTurn();
      for (const t of v.buf.tools) addToolNote(t);
      if (v.buf.think) appendThinkingDelta(v.buf.think);
      if (v.buf.text) appendDelta(v.buf.text);
      v.buf = { text: "", think: "", tools: [], startedAt: turnStartAt }; // 已重放的消费掉，防再次切回重放重复
      // STEPRESUME_20261021：workSteps 是纯前端计数，切走即归零，切回只重放「后台缓冲的那几次
      // 工具调用」——于是正在跑第 8 步的轮次，切回来显示成「第 1 步」，看着像重头再来。
      // 服务端 currentTurn.steps 是权威进度（/api/sessions），切回时以它为准。
      // 只回填不回退：缓冲重放可能比服务端快照更新，取两者较大值。
      if (ctx) await resumeWorkSteps(ctx, v);
      scrollToEnd(true);
    } else if (activeViewKey === key && v.busy) {
      // BUSYVIS_20261021：切回「在跑但后台一个事件都没收到」的标签（上游 429 卡住数分钟，
      // CLI 迟迟不发 message_start，于是 v.buf 一直是 null）时，转写里只有用户气泡，
      // 界面看着像「发了消息什么都没发生」。这里补出思考占位与活动条，把「还在跑」显式画出来。
      turnStartAt = Date.now();
      const ctx = beginAssistantTurn();
      resumeWorkSteps(ctx, v); // SWITCHBUF：无缓冲也补服务端权威步数，别显示成「从头思考」
      scrollToEnd(true);
    }
  } else {
    // SWITCHRACE_20261111：非内核标签（空白/历史）没有内核事件归属，清掉守卫窗口
    activeExpectedKernelId = null;
    switchTranscriptLoading = false;
    if (v.sessionId) {
      await renderDetached(v);
    } else {
      addSystemNote("新会话已就绪。发送首条消息时才会启动内核进程。");
    }
  }
  persistTabs();
  syncComposerModel(); // H2 时机①：切视图/切会话后的权威核对（不 await，防晚到响应串台已由内部竞态守卫处理）
}

async function renderDetached(v) {
  try {
    const res = await fetch(`/api/history/content?id=${encodeURIComponent(v.sessionId)}`);
    const data = await res.json();
    if (activeViewKey !== v.key) return;
    if (!res.ok || data.ok === false) {
      toast(data.error || "历史读取失败", "err");
      renderTranscript([], "bottom");
      return;
    }
    v.turns = Number(data.data?.turns) || 0;
    setTurns(v.turns);
    renderTranscript(data.data?.entries || [], "top");
    addSystemNote("历史存档 · 直接发送消息即可续接此会话（自动 --resume）。");
  } catch (err) {
    toast(`历史读取失败：${err.message}`, "err");
  }
}

// 侧栏/Ctrl+K 点开历史会话 → detached 标签（已打开则直接激活）。
async function openSessionTab(sessionId, title) {
  // MULTIWIN（D2）：会话已在他窗挂载 → 聚焦该窗，不重复挂载
  const foreign = otherWindows.find((w) => w.wid !== windowId && w.sid === sessionId);
  if (foreign) {
    try { window.claudeDesktop.winFocus(foreign.wid); } catch {}
    toast("该会话已在另一窗口打开，已为你切过去", "ok");
    return findViewBySessionId(sessionId) || null;
  }
  let v = findViewBySessionId(sessionId);
  if (!v) v = makeView({ key: `s:${sessionId}`, sessionId, title: title || "", detached: true });
  await setActiveView(v.key);
  if (currentView !== "chat") switchView("chat");
  return v;
}

// 新建空白标签：不占内核额度，首条消息才 spawn。
async function openNewTab(extra) {
  const v = makeView({ key: `new:${++newTabSeq}`, ...(extra || {}) });
  await setActiveView(v.key);
  if (currentView !== "chat") switchView("chat");
  renderSessionTabs();
  persistTabs();
  return v;
}

// 空白标签暂存的会话级设置（tryKernelSetting 存的 pendingSettings）：
// 内核挂载后补投 /api/kernel-settings。必须赶在首条消息入队前，否则内核 busy 会被拒；
// 失败时保留 pendingSettings，下次挂载重试。
async function flushPendingSettings(v) {
  if (!v || !v.kernelId || !v.pendingSettings) return;
  const body = v.pendingSettings;
  delete v.pendingSettings;
  try {
    const r = await fetch("/api/kernel-settings", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, kernelId: v.kernelId }),
    }).then((x) => x.json());
    if (r && r.ok) {
      // H2：真实值缓存进视图（cacheViewSettings）；单例控件只在 v 是活动视图时对齐——
      // 本函数会被任意视图的挂载触发（含后台标签），无条件写全局标签会把后台会话的设置串到前台。
      cacheViewSettings(v, r);
      if (activeView() === v) applyViewControls(v);
    } else {
      v.pendingSettings = { ...(v.pendingSettings || {}), ...body };
    }
  } catch {
    v.pendingSettings = { ...(v.pendingSettings || {}), ...body };
  }
}

// detached/new → attached：记录 kernelId，键切换成 k:<kernelId>。
function attachView(v, kernelId) {
  const wasActive = activeViewKey === v.key;
  v.kernelId = kernelId;
  v.detached = false;
  v.busy = true;
  claimNextKernel = false; // MULTIWIN：挂载完成，认领窗口确定
  rekeyView(v, `k:${kernelId}`);
  if (wasActive) {
    activeViewKey = v.key;
    readingHistory = null;
  }
  renderSessionTabs();
  persistTabs();
  mwClaim(v); // MULTIWIN：向主进程上报归属（HTTP 响应即拿到 kernelId，先于 SSE 事件）
}

// 启动恢复：只恢复一个激活会话（TABBAROFF_20261114：标签栏已移除，多开历史由左侧列表承载）。
async function restoreTabs(sessions) {
  let saved = null;
  try { saved = JSON.parse(sessionStorage.getItem("wb.tabs") || "null"); } catch {} // MULTIWIN：按窗口隔离
  // MULTIWIN：?sid= 启动的窗口直接恢复指定会话；他窗拥有的池内核不认领
  if (bootSessionId && !findViewBySessionId(bootSessionId)) {
    makeView({ key: `s:${bootSessionId}`, sessionId: bootSessionId, title: "", detached: true });
  }
  const freeSessions = sessions.filter((s) => !mwOwnedByOther(s));
  if (!sessionViews.size && freeSessions.length) {
    const s = freeSessions[0];
    const v0 = makeView({ key: `k:${s.kernelId}`, kernelId: s.kernelId, sessionId: s.sessionId, busy: s.busy, turns: s.turns });
    mwClaim(v0); // MULTIWIN：启动恢复挂载即上报归属
  }
  if (!sessionViews.size && saved && Array.isArray(saved.tabs) && saved.tabs.length) {
    const last = [...saved.tabs].reverse().find((t) => t && t.sessionId);
    if (last) makeView({ key: `s:${last.sessionId}`, sessionId: last.sessionId, title: last.title || "", detached: true });
  }
  if (!sessionViews.size) {
    await openNewTab();
    return;
  }
  if (saved && saved.active && sessionViews.has(saved.active)) {
    await setActiveView(saved.active);
  } else {
    // RESTARTLANDING_20261017：重启后落在最近活跃的真实会话，不再落空白标签（空白会话=发消息即新建，正是"会话消失"体感的来源之一）。
    let latestKey = null;
    try {
      const hist = await fetch("/api/history").then((r) => r.json());
      const items = Array.isArray(hist.items) ? hist.items : [];
      for (const it of items) {
        const v = findViewBySessionId(it.sessionId);
        if (v) { latestKey = v.key; break; } // items 已按 updatedAt 倒序，第一个命中即最近
      }
    } catch {}
    await setActiveView(latestKey || [...sessionViews.keys()][0]);
  }
  const restoredCount = [...sessionViews.values()].filter((v) => v.sessionId).length;
  if (restoredCount > 0) toast(`已定位到最近的会话`); // RESTOREBANNER（TABBAROFF：不再恢复一排标签）
}

// RESTOREFIX：detached→attached 迁移后重拉当前标签的记录。restoreTabs 恢复的 detached
// 视图可能还在 renderDetached 的 fetch 途中，此时快照到来 rekey（activeViewKey 变新 key），
// fetch 返回撞上 `activeViewKey !== v.key` 守卫被丢弃——界面永远停在「没有可显示的记录」。
async function reloadAttachedTranscript(v) {
  if (!v || !v.kernelId || !v.sessionId) return;
  if (activeViewKey !== v.key) return;
  try {
    const data = await fetch(`/api/transcript?id=${encodeURIComponent(v.sessionId)}`).then((r) => r.json());
    if (activeViewKey === v.key) renderTranscript((data && data.entries) || [], "bottom");
  } catch {}
}

function handleSnapshot(msg) {
  // 全局设置区（新旧快照同形）。H2：快照 displayModel 取自服务端 activeKernel（最后被碰的内核），
  // 未必是前端活动标签——标题以活动标签在 sessions 里的真实模型为准，取不到才回退快照全局值。
  const snapSessions0 = Array.isArray(msg.sessions) ? msg.sessions : [];
  const avSnap = activeView();
  const avEntry0 = avSnap && avSnap.kernelId ? snapSessions0.find((s) => s.kernelId === avSnap.kernelId) : null;
  setModel((avEntry0 && (avEntry0.displayModel || avEntry0.model)) || msg.displayModel || msg.model);
  if (msg.context !== undefined) renderContextMeter(msg.context); // CONTEXTMETER
  if (msg.turnBudget && typeof msg.turnBudget === "object") {
    currentTurnBudget = { ...currentTurnBudget, ...msg.turnBudget };
    setBudgetStatus(currentTurnBudget);
  }
  if (msg.autoCompact) {
    currentAutoCompact = String(msg.autoCompact);
    setAutoCompactStatus(currentAutoCompact);
  }
  if (msg.permissionMode) setRunState(statusPermission, msg.permissionMode, "ok");
  if (msg.baseUrl && statusProxy) {
    statusProxy.textContent = msg.baseUrl.replace(/^https?:\/\//, "");
    statusProxy.dataset.tone = "ok";
  }
  if (msg.cwd && statusCwd) statusCwd.textContent = `工作目录：${msg.cwd}`;

  const sessions = Array.isArray(msg.sessions) ? msg.sessions : [];
  for (const s of sessions) {
    if (mwOwnedByOther(s)) continue; // MULTIWIN：他窗内核不在本窗建视图
    let v = findViewByKernelId(s.kernelId) || findViewBySessionId(s.sessionId);
    if (!v) {
      v = makeView({ key: `k:${s.kernelId}`, kernelId: s.kernelId, sessionId: s.sessionId, busy: s.busy, turns: s.turns });
    } else {
      const wasActive = activeViewKey === v.key;
      v.kernelId = s.kernelId;
      v.detached = false;
      if (s.sessionId) v.sessionId = s.sessionId;
      v.busy = Boolean(s.busy);
      // TURNSKEEP_20261021：内核 restart（换渠道/换档）会把服务端 turns 归零，快照不能拿它
      // 把界面轮数改回 0（底部计量条会显示「0 轮」而转写里有历史）。只增不减。
      v.turns = Math.max(Number(v.turns) || 0, Number(s.turns) || 0);
      rekeyView(v, `k:${s.kernelId}`);
      if (wasActive) {
        activeViewKey = v.key;
        readingHistory = null;
        reloadAttachedTranscript(v); // RESTOREFIX：迁移后当前标签立即补画记录
      }
    }
    if (s.model) { v.model = s.model; v.displayModel = s.displayModel || v.displayModel; } // H2：视图缓存真实模型
    mwClaim(v); // MULTIWIN：快照挂载也上报归属（空闲内核无 session 事件，不能只靠事件路径）
  }
  // 池里消失的内核：有历史退回 detached，空白新会话直接移除
  for (const v of [...sessionViews.values()]) {
    if (!v.kernelId || sessions.some((s) => s.kernelId === v.kernelId)) continue;
    const wasActive = activeViewKey === v.key;
    v.kernelId = null;
    v.busy = false;
    if (v.sessionId) {
      v.detached = true;
      rekeyView(v, `s:${v.sessionId}`);
      if (wasActive) {
        activeViewKey = v.key;
        readingHistory = { sessionId: v.sessionId, turns: v.turns || 0 };
      }
    } else {
      sessionViews.delete(v.key);
      if (wasActive) activeViewKey = null;
    }
  }
  if (!activeViewKey || !sessionViews.has(activeViewKey)) {
    restoreTabs(sessions);
  }
  if (!sessions.length && !busy) {
    setStatus("内核待启动 · 发消息或点开任务即自动启动", "ok");
    setRunState(statusCli, "待启动", "");
  }
  // POOLCAP_20261021：并行上限（默认 5）此前对用户完全不可见——空闲内核被静默驱逐后
  // 会话悄悄降级成历史档，用户不知道「刚才的活会话怎么没了」。这里把额度写进状态栏，
  // 满了就明确告知「再开会顶掉最久空闲的那个」。
  if (Number(msg.maxLive) > 0) {
    poolMaxLive = Number(msg.maxLive);
    const n = sessions.length;
    const busyCount = sessions.filter((s) => s.busy).length;
    if (statusPool) {
      const full = n >= poolMaxLive;
      // 独立一行：statusCli 会被「就绪/生成中/预算停止」等运行态反复覆盖，池计数放那里留不住
      setRunState(statusPool, `${n}/${poolMaxLive}${full ? " 已满" : ""}`, full ? "warn" : n ? "ok" : "");
      statusPool.title = full
        ? `并行上限 ${poolMaxLive} 个已满（生成中 ${busyCount} 个）。再新开会顶掉最久空闲的内核，该会话改为历史档，仍可查看与续接。`
        : `并行内核 ${n}/${poolMaxLive}（生成中 ${busyCount} 个）。`;
    }
  }
  applyViewControls(activeView()); // H2：快照重连后单例控件按活动标签对齐
  renderSessionTabs();
  persistTabs();
}

function handleSessionEvent(msg) {
  // MULTIWIN：他窗拥有的内核 → 不建视图，只更新侧栏状态点
  if (mwOwnedByOther(msg)) {
    if (msg.sessionId) updateSidebarLive({ sessionId: msg.sessionId });
    return;
  }
  let v = findViewByKernelId(msg.kernelId);
  if (!v && msg.sessionId) v = findViewBySessionId(msg.sessionId);
  // ROUTEFALLBACK_20261021：原来的兜底 `if (!v) v = activeView()` 会把「无归属内核」的
  // 会话帧硬塞进当前正在看的标签——把内核 id / 会话 id 改错，导致串台。
  // 正确兜底：只有「当前标签还空着（既无内核也无会话）」时才认领；否则建一个后台视图承接。
  // MULTIWIN：空视图认领仅限本窗口正在发送（claimNextKernel），防止抢走他窗刚挂载的内核。
  if (!v) {
    const av = activeView();
    if (av && !av.kernelId && !av.sessionId && claimNextKernel) { v = av; claimNextKernel = false; }
  }
  if (!v && msg.kernelId && isMainWindow) {
    // MULTIWIN：仅主窗口承接无归属内核（自动化/外部触发）；副窗口不镜像
    v = makeView({
      key: `k:${msg.kernelId}`,
      kernelId: msg.kernelId,
      sessionId: msg.sessionId || null,
      detached: !msg.kernelId,
    });
  }
  if (!v) return;
  const wasActive = activeViewKey === v.key;
  if (msg.kernelId) {
    v.kernelId = msg.kernelId;
    v.detached = false;
    rekeyView(v, `k:${msg.kernelId}`);
    flushPendingSettings(v); // 兜底：非发消息路径挂载的内核也补投暂存设置（busy 被拒时会保留待重试）
  }
  if (msg.sessionId) v.sessionId = msg.sessionId;
  mwClaim(v); // MULTIWIN：归属上报（_mwClaimed 节流，同内核只报一次）
  // H2 时机③：会话帧带着该内核的 model/effort——缓存进视图，供切台回显。
  if (msg.model) {
    v.model = msg.model;
    v.displayModel = msg.displayModel || v.displayModel;
    v.effort = msg.effort || v.effort;
    v.effortMode = msg.effortMode || v.effortMode;
    if (msg.effortMode === "auto") v.autoEffortTier = msg.effort;
  }
  if (wasActive) {
    activeViewKey = v.key;
    readingHistory = null;
    if (msg.sessionId) setSession(msg.sessionId);
    applyViewControls(v);
  }
  renderSessionTabs();
  persistTabs();
  updateSidebarLive(v); // 行不存在（新会话未落历史）时内部回退 loadTaskList
}

// 后台标签的事件：只维护指示灯，不写当前 DOM；流式细节切回标签时从内核内存重拉。
function handleBackgroundEvent(msg, v) {
  switch (msg.kind) {
    case "turn_start":
      v.busy = true;
      v.done = false;
      if (!v.buf) v.buf = { text: "", think: "", tools: [], startedAt: Date.now() };
      renderSessionTabs();
      updateSidebarLive(v);
      return true;
    case "delta":
      if (v.buf) v.buf.text += msg.text || ""; // 切回不丢：后台流式内容先进缓冲
      return true;
    case "thinking_delta":
      if (v.buf) v.buf.think += msg.text || "";
      return true;
    case "tool":
      if (v.buf) v.buf.tools.push(msg.name || "tool");
      return true;
    case "message":
      // 该段正文已在服务端转写定稿（切回时由 /api/transcript 渲染），清缓冲防重放重复
      if (v.buf) { v.buf.text = ""; v.buf.think = ""; }
      return true;
    case "thinking":
    case "tool_result":
    case "compaction":
    case "auto_retry":
    case "raw":
      return true;
    case "result": {
      v.busy = false;
      v.done = true;
      v.turns = (v.turns || 0) + 1;
      v.autoContinue = Boolean(msg.autoContinue); // VIEWSTATE_20261021：续跑窗口也归后台标签，别点亮当前标签的停止键
      v.buf = null; // 定稿已入转写，缓冲作废
      v.lastResultAt = Date.now(); // ARTKEEP：后台轮次也留时间戳，切回后靠它把产物卡片挂回对应的那一轮
      flushArtifacts(v); // ARTIFACTS_20261021：后台轮次结束也要落账，否则切走那轮的产物永远丢失
      updateSidebarLive(v);
      if (insModeNow() !== "open") setInspectorBadge(true); // 任务驱动：右栏收起时提示有东西看
      sessionStatsCache.at = 0;
      refreshUsage();
      loadProducts();
      if (msg.isError && !msg.interrupted) toast(`「${tabTitleFor(v)}」本轮返回错误`, "err");
      else if (msg.budgetExceeded) toast(`「${tabTitleFor(v)}」达到预算上限已停止`, "warn");
      else notify("后台会话完成", `「${tabTitleFor(v)}」本轮已处理完毕。`);
      maybeAutoTitle(v); // AUTOTITLE_20261021：后台轮次也要起名，否则切走的那场永远是「会话 xxxxxxxx」
      renderSessionTabs();
      return true;
    }
    case "budget_exceeded":
      toast(`「${tabTitleFor(v)}」本轮达到预算上限`, "warn");
      return true;
    case "status":
      if (msg.state === "error") {
        v.busy = false;
        toast(`「${tabTitleFor(v)}」内核异常：${msg.detail || "未知原因"}`, "err");
      } else if (msg.state === "exited") {
        v.busy = false;
      }
      renderSessionTabs();
      return true;
    case "queue_rejected":
      toast(`「${tabTitleFor(v)}」排队已达上限（${msg.limit || 3} 条）`, "warn");
      return true;
    case "interrupt_timeout":
    case "auto_recover":
      return true;
    case "auto_continue_canceled":
      // VIEWSTATE_20261021：只清该后台标签自己的续跑状态；若两个会话同时处于续跑窗口，
      // 取消 B 的排程不该顺手灭掉 A 标签的停止按钮。
      v.autoContinue = false;
      toast(`「${tabTitleFor(v)}」已取消自动续跑`, "ok");
      renderSessionTabs();
      return true;
    case "permission_request":
    case "permission_resolved":
    case "permission_timeout":
      return false; // 权限弹窗全局，走原逻辑（弹窗内标注来源会话）
    case "task":
    case "queue":
    case "assets":
    case "stderr":
    case "control":
      return false; // 全局面板事件，走原逻辑
    case "settings_deferred":
    case "settings_applied":
      return false; // GLOBALSET_20261021：全局设置提示与标签无关，交给主处理器统一 toast
    default:
      return true;
  }
}

function showHistoryBanner(label, sessionId) {
  clearHistoryBanner();
  const banner = document.createElement("div");
  banner.className = "cw-history-banner";
  banner.id = "cw-history-banner";
  banner.innerHTML = `
    <i data-lucide="book-open" aria-hidden="true"></i>
    <span></span>
    <button class="cw-ghost-btn" type="button">返回当前会话</button>`;
  $("span", banner).textContent = `正在查看历史会话 ${String(sessionId).slice(0, 8)}（${label}）`;
  $("button", banner).addEventListener("click", exitHistory);
  threadEl.insertBefore(banner, threadEl.firstChild);
  refreshIcons();
}

function clearHistoryBanner() {
  const old = $("#cw-history-banner");
  if (old) old.remove();
}

async function openHistory(sessionId) {
  // 多会话模式下点历史 = 开 detached 标签；发消息即自动续接，不再有只读模式。
  if (busy && activeView() && findViewBySessionId(sessionId) === activeView()) {
    // 重复点击当前正在生成的标签时直接忽略
    return;
  }
  return openSessionTab(sessionId, "");
}

async function exitHistory() {
  readingHistory = null;
  clearHistoryBanner();
  refreshCostChip();
  try {
    const data = await fetch("/api/transcript").then((r) => r.json());
    renderTranscript(data.entries || [], "bottom");
  } catch {
    renderTranscript([]);
  }
}

function showRecoverBanner(detail) {
  const old = $("#cw-recover-banner");
  if (old) old.remove();
  const banner = document.createElement("div");
  banner.className = "cw-recover";
  banner.id = "cw-recover-banner";
  banner.innerHTML = `
    <i data-lucide="triangle-alert" aria-hidden="true"></i>
    <span></span>
    <button class="cw-ghost-btn" type="button">重启本机进程</button>`;
  $("span", banner).textContent = detail || "本机 Claude Code 进程已停止。";
  $("button", banner).addEventListener("click", () => restartBridge(true));
  threadEl.insertBefore(banner, threadEl.firstChild);
  refreshIcons();
}

function clearRecoverBanner() {
  const old = $("#cw-recover-banner");
  if (old) old.remove();
}

async function restartBridge(fromBanner) {
  try {
    const av = activeView();
    const res = await fetch("/api/restart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(av && av.kernelId ? { kernelId: av.kernelId } : {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) return toast(data.error || "重启失败", "err");
    clearRecoverBanner();
    setStatus("正在重启本机 Claude Code…", "warn");
    setRunState(statusCli, "启动中", "warn");
    if (!fromBanner) toast("已请求重启本机进程");
  } catch (err) {
    toast(`重启失败：${err.message}`, "err");
  }
}

async function stopGeneration() {
  // AUTOCONTINUE_STOP_20261021：服务端在「空闲但有排程」时也能拦截自动续跑，
  // 所以这里不再因为 !busy 直接 return——否则预算到限那 3 秒的窗口里点停止毫无反应。
  if (!busy && !autoContinuePending) return;
  if (stopBtn) stopBtn.disabled = true;
  try {
    const av = activeView();
    const res = await fetch("/api/interrupt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(av && av.kernelId ? { kernelId: av.kernelId } : {}),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) toast(data.error || "停止失败", "err");
    else if (data.canceledAutoContinue) {
      setAutoContinue(false);
      setStatus("已取消自动续跑", "ok");
      toast("已取消自动续跑");
    }
    else toast("已请求停止本轮生成");
  } catch (err) {
    toast(`停止失败：${err.message}`, "err");
  } finally {
    setTimeout(() => {
      if (stopBtn) stopBtn.disabled = false;
    }, 1200);
  }
}

/* ---------- 状态 ---------- */

// VIEWSTATE_20261021：自动续跑窗口的状态也归标签——旧全局值切台不重置，
// 结果 A 标签排了续跑，切到 B 标签时停止按钮还亮着，点下去打的是 B 的内核。
function setAutoContinue(next) {
  autoContinuePending = Boolean(next);
  const av = typeof activeView === "function" ? activeView() : null;
  if (av) av.autoContinue = autoContinuePending;
  if (stopBtn) stopBtn.classList.toggle("cw-hidden", !busy && !autoContinuePending);
}

// quiet=true 用于切标签：只同步界面状态，不触发轮末统计刷新（切台流程自己会取数）。
function setBusy(next, quiet) {
  busy = next;
  const av = typeof activeView === "function" && activeView();
  if (av) av.busy = next; // 同步当前标签视图的忙碌状态
  // 生成期间发送按钮保持可用：再发一条会进入队列，本轮结束后自动发出，
  // 不再把输入框"锁死"到本轮结束。
  if (sendBtn) sendBtn.title = next ? "本轮仍在生成；点击把消息排入队列" : "";
  // 自动续跑窗口期（界面空闲但有排程）也保留停止按钮，否则用户没机会取消。
  if (stopBtn) stopBtn.classList.toggle("cw-hidden", !next && !autoContinuePending);
  if (textarea) textarea.disabled = false;
  document.body.classList.toggle("cw-busy", next);
  if (firstThread) firstThread.textContent = next ? "刚刚 · 正在生成" : "刚刚 · 已保存";
  if (next) setRunState(statusCli, "生成中", "warn");
  else if (quiet) teardownAssistantTurn();
  else endAssistantTurn();
}

/* ---------- SSE ---------- */

function connect() {
  const es = new EventSource("/api/events");
  es.onopen = () => {
    connected = true;
    markConnected(); // STATUSPILL_20261021：连上就更新徽标，别停在「正在连接…」
  };
  es.onmessage = (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    handleEvent(msg);
  };
  es.onerror = () => {
    connected = false;
    setStatus("本地服务重连中…", "warn");
    es.close();
    setTimeout(connect, 1600);
  };
}

function handleEvent(msg) {
  // 多会话路由：snapshot/session 单独处理；其余事件按 kernelId 归属标签。
  if (msg.kind === "snapshot") {
    handleSnapshot(msg);
    return;
  }
  if (msg.kind === "context") {
    // CONTEXTMETER：只在当前标签就是产出该用量的内核时刷新，避免串台
    const av = typeof activeView === "function" ? activeView() : null;
    if (!msg.kernelId || !av || av.kernelId === msg.kernelId) renderContextMeter(msg.context);
    return;
  }
  if (msg.kind === "session") {
    handleSessionEvent(msg);
    return;
  }
  let evView = msg.kernelId ? findViewByKernelId(msg.kernelId) : msg.sessionId ? findViewBySessionId(msg.sessionId) : null;
  // MULTIWIN：他窗内核的事件不镜像（全局事件无 kernelId，不受影响）
  if (!evView && mwOwnedByOther(msg)) return;
  if (!evView && msg.kernelId && isMainWindow) {
    // 事件来自还没有标签的内核（异常恢复/外部触发）：主窗口建后台标签承接
    evView = makeView({ key: `k:${msg.kernelId}`, kernelId: msg.kernelId, sessionId: msg.sessionId || null });
  }
  if (!evView && msg.kernelId) return; // MULTIWIN：副窗口不承接无归属内核
  const active = activeView();
  const forActive = !evView || (active && evView.key === active.key);
  // SWITCHRACE_20261111：转写加载窗口守卫。切回标签后 fetch(transcript) 未完成前，
  // 流式事件即使归属当前标签也不直接写 DOM——转投该标签的后台缓冲，渲染完由
  // 既有"切回不丢"重放逻辑统一出画。防止孤儿气泡与转写叠加。
  const switchLoading = switchTranscriptLoading && evView && evView.kernelId
    ? evView.kernelId === activeExpectedKernelId
    : false;
  const routeToBackground = !forActive || (switchLoading && (msg.kind === "delta" || msg.kind === "thinking_delta" || msg.kind === "tool" || msg.kind === "message" || msg.kind === "turn_start"));
  if (routeToBackground) {
    if (handleBackgroundEvent(msg, evView)) return;
  } else if (evView) {
    // 同步当前标签视图状态（切走再切回时能恢复忙碌/轮数）
    if (msg.kind === "turn_start") { evView.busy = true; updateSidebarLive(evView); }
    else if (msg.kind === "result") {
      evView.busy = false;
      evView.done = false;
      evView.turns = (evView.turns || 0) + 1;
      evView.buf = null;
      updateSidebarLive(evView);
      maybeAutoTitle(evView);
    }
  }
  // 查看历史存档时（detached 活动标签不会有内核事件，这里只是防御），实时流不写只读视图。
  if (readingHistory && (msg.kind === "delta" || msg.kind === "message" || msg.kind === "thinking_delta" || msg.kind === "tool" || msg.kind === "tool_result" || msg.kind === "todo")) {
    return;
  }
  // ARTKEEP_20261021：本轮气泡正文的接收篮。result 分支在收轮前把它填上，
  // 后面的 flushArtifacts 拿它当宿主（switch 内声明跨 case 不可见，必须提到这里）。
  let resultBody = null;
  switch (msg.kind) {
    case "status":
      if (msg.displayModel) setModel(msg.displayModel);
      // H2 时机②：内核就绪/状态帧——活动内核的真实模型同步进视图缓存与 composer 下拉。
      // （能走到主 switch 的 status 帧必属活动视图；后台内核的 status 已被 handleBackgroundEvent 截留。）
      if (evView && msg.model) {
        evView.model = msg.model;
        evView.displayModel = msg.displayModel || evView.displayModel;
        setComposerModelValue(msg.model, msg.displayModel);
      }
      if (msg.state === "ready") {
        setStatus(msg.detail || `${displayModel} · ${currentChannelLabel}已连接`, "ok");
        setRunState(statusCli, "就绪", "ok");
        setRunState(statusPermission, msg.permissionMode || "plan", "ok");
        clearRecoverBanner();
        if (msg.cwd && chatSub) {
          const second = $$("span", chatSub)[1];
          if (second) second.textContent = `权限 ${msg.permissionMode || "plan"} · ${msg.cwd}`;
          if (statusCwd) statusCwd.textContent = `工作目录：${msg.cwd}`;
        }
      } else if (msg.state === "starting") {
        setStatus("正在启动本机 Claude Code…", "warn");
        setRunState(statusCli, "启动中", "warn");
      } else if (msg.state === "error") {
        setStatus("本机进程异常", "err");
        setRunState(statusCli, "异常", "err");
        toast(msg.detail || "本机进程异常", "err");
        setBusy(false);
        if (msg.recoverable) showRecoverBanner(msg.detail);
      } else if (msg.state === "exited") {
        setStatus("本机进程已退出", "err");
        setRunState(statusCli, "已退出", "err");
        setBusy(false);
      }
      break;
    case "session":
      // 已由 handleSessionEvent 处理（防御性保留：直接刷新会话 chip）
      if (msg.sessionId) setSession(msg.sessionId);
      break;
    case "turn_start":
      // send() 与 SSE 都会触发 turn_start；只在首次设置起点，秒表不被重置。
      if (!turnStartAt) turnStartAt = Date.now();
      setAutoContinue(false); // 新一轮已开始，自动续跑窗口结束
      setBusy(true);
      if (!readingHistory) beginAssistantTurn();
      break;
    case "effort_auto": // AUTOEFFORT：Auto 档服务端定了新档位，按钮跟着显示
      autoEffortTier = msg.effort || null;
      if (currentEffort === "auto") setEffortUI("auto");
      break;
    case "settings_deferred": // GLOBALSET_20261021：全局设置已记账，等本轮结束才重启落地
      toast(msg.note || "全局设置将在本轮结束后生效", "ok");
      break;
    case "settings_applied":
      toast(msg.note || "全局设置已生效", "ok");
      break;
    case "thinking":
      if (!busy) break;
      if (msg.phase === "thinking") setThinkingPhase("thinking", "深度思考");
      else setThinkingPhase("connected", "生成中");
      break;
    case "thinking_delta":
      // 与 case "delta" 一致不设 busy 守卫：定时任务/队列发起的轮次前端 busy 未必置位。
      if (msg.ttftMs && !currentTurnTtft) currentTurnTtft = msg.ttftMs; // TTFT：首帧自带
      appendThinkingDelta(msg.text || "");
      break;
    case "delta":
      if (msg.ttftMs && !currentTurnTtft) currentTurnTtft = msg.ttftMs;
      appendDelta(msg.text || "");
      break;
    case "tool":
      addToolNote(msg.name || "tool");
      break;
    case "todo":
      showTodoCardLive(msg.todos);
      break;
    case "kernel_settings_applied":
      // H2 时机④：排队中的会话级设置轮末应用完成——真实值落视图缓存并对齐单例控件。
      if (msg.ok !== false && msg.model) {
        const v0 = msg.kernelId ? findViewByKernelId(msg.kernelId) : activeView();
        if (v0) { v0.model = msg.model; applyViewControls(v0); } // displayModel 待 ready status 帧回填
      }
      if (msg.ok === false) addSystemNote(`排队中的设置应用失败：${msg.error || "未知原因"}`, "warn");
      else addSystemNote(`排队中的设置已应用${msg.model ? `（模型 → ${msg.model}）` : ""}。`, "ok");
      break;
    case "rescue":
      if (msg.phase === "retry") addSystemNote(`检测到模型拒绝回复，已自动补全授权语境重试一次（原请求：${msg.preview || ""}…）`, "warn");
      else if (msg.phase === "still-refused") addSystemNote("重试后模型仍拒绝。建议：换个说法（说明具体场景）或换渠道模型再试——壳侧已尽力。", "warn");
      else if (msg.phase === "failed") addSystemNote("拒绝救援重试未正常完成，请重发消息。", "warn");
      break;
    case "message":
      finalizeAssistant(msg.blocks);
      break;
    case "budget_exceeded": {
      const b = msg.budget || {};
      const labels = { time: "时间", steps: "工具步数", output_tokens: "输出 token" };
      if (msg.autoContinue) {
        setStatus(`预算到限 · 自动继续（第 ${msg.autoContinueSeq} 轮）`, "warn");
        setRunState(statusCli, "自动继续", "warn");
        addSystemNote(`本轮达到${labels[b.kind] || "预算"}上限（${b.value ?? "—"}/${b.limit ?? "—"}），已自动从中断处继续（第 ${msg.autoContinueSeq} 轮），直到任务完成。`, "warn");
      } else {
        setStatus("本轮预算已到达", "warn");
        setRunState(statusCli, "预算停止", "warn");
        toast(`本轮已达到${labels[b.kind] || "预算"}上限，已停止。`, "warn");
        addSystemNote(`本轮达到${labels[b.kind] || "预算"}上限（${b.value ?? "—"}/${b.limit ?? "—"}），已停止。${msg.note || "不会自动继续排队任务。"}`);
      }
      break;
    }
    case "compaction":
      if (msg.phase === "state") {
        const windowTokens = Number(msg.value && (msg.value.effective_window || msg.value.threshold));
        if (Number.isFinite(windowTokens) && windowTokens > 0) {
          currentAutoCompact = String(windowTokens);
          setAutoCompactStatus(currentAutoCompact);
        }
      } else if (msg.phase === "boundary") {
        setStatus("正在压缩上下文…", "warn");
        setRunState(statusCli, "压缩上下文", "warn");
        addSystemNote("Claude Code 正在自动压缩上下文，原会话会继续保留。", "warn");
      } else if (msg.phase === "done") {
        setStatus("上下文已压缩", "ok");
        const chars = Number(msg.outputChars);
        addSystemNote(chars > 0 ? `上下文压缩完成（摘要约 ${formatNum(chars)} 字符）。` : "上下文压缩完成，原会话继续。", "ok");
      } else {
        setStatus("上下文压缩失败", "warn");
        addSystemNote(`上下文压缩失败，保留原上下文继续：${msg.error || "未知原因"}`, "warn");
        toast("上下文压缩失败，已保留原上下文", "warn");
      }
      break;
    case "result":
      if (!msg.durationMs && turnStartAt) msg.durationMs = Date.now() - turnStartAt;
      // ARTKEEP_20261021：先盖本轮时间戳——预算停止/中断的轮次也可能产出文件，
      // 产物要靠它跟转写里的 result 条目对上号。
      if (evView) evView.lastResultAt = Date.now();
      endAssistantTurn();
      turnStartAt = 0;
      // AUTOCONTINUE_STOP_20261021：result.autoContinue=true 表示服务端已排下一次续跑，
      // 这段时间界面是空闲的，要让停止按钮仍能取消它。
      setAutoContinue(Boolean(msg.autoContinue));
      if (msg.budgetExceeded) {
        if (msg.autoContinue) {
          addSystemNote(`本轮到达预算上限，已自动继续（第 ${msg.autoContinueSeq} 轮），直到任务完成。`, "warn");
        } else {
          if (currentAssistant && !currentAssistant.buffer) currentAssistant.article.remove();
          currentAssistant = null;
          addSystemNote("本轮已因预算上限停止。" + (msg.note || "未自动继续排队消息。"));
        }
      } else if (msg.interrupted) {
        if (currentAssistant && !currentAssistant.buffer) currentAssistant.article.remove();
        currentAssistant = null;
        addSystemNote("本轮生成已中断。");
      } else if (!readingHistory) {
        // ERRVIS_20261021：上游报错（429 额度耗尽/5xx）时，错误正文以前只沉在服务端转写里，
        // 界面只剩「本轮出错」。把真实原因直接写在会话里，用户不用再去翻日志。
        if (msg.isError && msg.resultText) {
          addSystemNote(`上游返回错误：${String(msg.resultText).slice(0, 300)}`, "warn");
        }
        // ARTKEEP_20261021：先抓住本轮气泡正文，再收轮。老顺序是 addResultFooter 把
        // currentAssistant 置 null 之后才 flushArtifacts，宿主永远取不到，产物卡片一张都没画出来。
        resultBody = addResultFooter(msg);
      }
      setTurns(turnCount + 1);
      setBusy(false);
      setRunState(statusCli, msg.autoContinue ? "自动继续" : "就绪", msg.isError ? "err" : "ok");
      if (msg.budgetExceeded && !msg.autoContinue) toast("本轮达到预算上限，已停止", "warn");
      else if (msg.interrupted && !msg.autoContinue) toast("已中断本轮生成", "warn");
      else if (msg.imageUnsupported) toast("当前上游模型不支持图片输入：请改用文字描述，或把图片内容转成文字后发送", "warn");
      else if (msg.isError) toast("本轮返回错误", "err");
      // 完成通知（窗口非前台时弹系统通知；自动续跑的到限轮不弹，等真正完成再弹）
      if (msg.budgetExceeded && !msg.autoContinue) notify("任务达到预算", "本轮已达到配置的预算上限。");
      else if (msg.interrupted && !msg.autoContinue) notify("任务已中断", "本轮生成被手动停止。");
      else if (msg.isError && !msg.autoContinue) notify("任务出错", "本轮返回错误，请查看。");
      else if (!msg.autoContinue && !msg.budgetExceeded && (msg.durationMs || 0) > 30000) {
        const secs = Math.round((msg.durationMs / 1000));
        notify("任务完成", `本轮已处理完毕，用时 ${secs} 秒。`);
      }
      // 提示音：成功=上行双音，错误/预算=下行低音（仅窗口隐藏或耗时>8s 才响；回放历史/手动中断不响）
      if (!readingHistory) {
        if (msg.budgetExceeded && !msg.autoContinue) playTurnSound("down");
        else if (msg.isError && !msg.interrupted && !msg.autoContinue) playTurnSound("down");
        else if (!msg.interrupted && !msg.autoContinue) playTurnSound("up", msg.durationMs);
      }
      // 结果后刷新产物列表（可能有新文件），并在聊天里渲染本轮产物卡片
      // ARTKEEP_20261021：flushArtifacts 先跑（它要往本轮气泡里追加卡片），
      // loadProducts 放后面，右栏「本会话」才能在同一拍就读到刚落账的产物。
      flushArtifacts(evView, resultBody).finally(() => { loadProducts(); });
      // 结果后刷新用量统计与底部计量条
      refreshUsage();
      sessionStatsCache.at = 0;
      refreshCostChip();
      if (statusLast) {
        statusLast.textContent = msg.budgetExceeded
          ? "预算停止"
          : msg.interrupted
          ? "已中断"
          : msg.isError
            ? "出错"
            : `${((msg.durationMs || 0) / 1000).toFixed(1)}s`;
        statusLast.dataset.tone = msg.budgetExceeded ? "warn" : msg.isError && !msg.interrupted ? "err" : "";
      }
      if ((msg.isError || msg.budgetExceeded) && lastSentText) {
        const act = document.createElement("article");
        act.className = "cw-message";
        const wrap = document.createElement("div");
        wrap.className = "cw-msg-actions";
        const retry = document.createElement("button");
        retry.type = "button";
        retry.className = "cw-msg-action";
        retry.innerHTML = `<i data-lucide="rotate-ccw" aria-hidden="true"></i><span>重试本轮</span>`;
        retry.addEventListener("click", () => {
          if (busy) return toast("仍在生成，稍后再试", "warn");
          textarea.value = lastSentText;
          textarea.dispatchEvent(new Event("input"));
          send();
        });
        wrap.appendChild(retry);
        if (msg.budgetExceeded) {
          const cont = document.createElement("button");
          cont.type = "button";
          cont.className = "cw-msg-action";
          cont.innerHTML = `<i data-lucide="play" aria-hidden="true"></i><span>继续生成</span>`;
          cont.addEventListener("click", () => {
            if (busy) return toast("仍在生成，稍后再试", "warn");
            textarea.value = "请从刚才中断的位置继续完成剩余工作。";
            textarea.dispatchEvent(new Event("input"));
            send();
          });
          wrap.appendChild(cont);
        }
        act.appendChild(wrap);
        threadEl.appendChild(act);
        refreshIcons();
      }
      if (currentView === "queue") loadQueue();
      break;
    case "task":
      if (currentView === "queue") loadQueue();
      break;
    case "assets":
      if (currentView === "assets") loadAssets();
      break;
    case "control":
      if (msg.detail) toast(`控制指令失败：${msg.detail}`, "warn");
      break;
    case "queue":
      if (currentView === "queue") loadQueue();
      break;
    case "queue_rejected":
      toast(`排队已达上限（${msg.limit || 3} 条），请等待完成或清空排队。`, "warn");
      if (currentView === "queue") loadQueue();
      break;
    case "interrupt_timeout":
      setStatus("停止请求未响应", "err");
      setRunState(statusCli, "恢复中", "warn");
      showRecoverBanner("停止请求未收到内核回应，正在自动恢复（重启内核并续接会话）…");
      toast("停止请求未响应，正在自动恢复。", "warn");
      break;
    case "auto_recover":
      if (msg.phase === "start") {
        setStatus("中断卡死，正在自动恢复…", "warn");
        showRecoverBanner("内核未响应停止请求，正在自动重启并续接会话…");
      } else {
        addSystemNote(msg.resumed ? "已自动恢复：内核重启完成并续接原会话，可继续对话。" : "已自动恢复：内核重启完成（无会话可续接）。");
      }
      break;
    case "auto_continue_canceled":
      setAutoContinue(false);
      setStatus("已取消自动续跑", "ok");
      addSystemNote("已取消本轮的自动续跑，不会再开下一轮。", "ok");
      break;
    case "no_visible_break": // NOVISBREAK_20261115：免费模型无可见收尾文字死循环的熔断提示
      setAutoContinue(false);
      setStatus("已熔断空转", "warn");
      addSystemNote(msg.note || "模型连续多轮无可见收尾文字，已自动停止防空转；产物如已生成可在产物/文件页查看。", "warn");
      break;
    case "auto_retry":
      addSystemNote("上游返回瞬时错误，工作台已自动重试。");
      toast(`上游瞬时错误，正在自动重试（第 ${msg.attempt || 2} 次尝试）…`, "warn");
      break;
    case "permission_request":
      // MULTIWIN（D4）：归属窗口才弹；无归属内核由主窗口兜底（他窗事件已在路由层过滤）
      if (findViewByKernelId(msg.kernelId) || findViewBySessionId(msg.sessionId) || isMainWindow) showPermissionModal(msg);
      break;
    case "permission_resolved":
      hidePermissionModal(msg.requestId);
      toast(msg.behavior === "allow" ? "已允许本次工具调用" : "已拒绝本次工具调用");
      break;
    case "permission_timeout":
      hidePermissionModal(msg.requestId);
      toast(`权限请求 ${msg.timeoutMs ? Math.round(msg.timeoutMs / 1000) : 120} 秒未响应，已自动拒绝。`, "warn");
      break;
    case "stderr":
      if (/Invalid API key|401|403/i.test(msg.text || "")) {
        toast((msg.text || "").slice(0, 160), "warn");
      }
      break;
  }
}

/* ---------- 发送 ---------- */

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      const comma = result.indexOf(",");
      const meta = result.slice(0, comma);
      const data = result.slice(comma + 1);
      const mediaType = /data:([^;]+)/.exec(meta)?.[1] || "image/png";
      resolve({ media_type: mediaType, data, name: file.name });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// 输入附件 chip 的创建抽成函数：发送失败时要按原样恢复图片/文件，不能只恢复文字。
function appendImageChip(item, idx) {
  if (attachmentsEmpty) attachmentsEmpty.classList.add("cw-hidden");
  const chip = document.createElement("span");
  chip.className = "cw-mini-chip";
  chip.title = "点击预览大图";
  chip.dataset.pending = String(idx);
  // IMGCHIP_20261017：点主体=打开大图预览，点 × 才移除（此前整块点击=误删）
  chip.innerHTML = `<i data-lucide="image" aria-hidden="true"></i>${escapeHtml(item.name || "图片")}<span class="cw-chip-x" title="移除"><i data-lucide="x" aria-hidden="true"></i></span>`;
  chip.addEventListener("click", (e) => {
    if (e.target.closest(".cw-chip-x")) {
      const i = Number(chip.dataset.pending);
      pending[i] = null;
      chip.remove();
      if (attachmentsEmpty && !pending.some(Boolean) && !contextFiles.some(Boolean)) attachmentsEmpty.classList.remove("cw-hidden");
      return;
    }
    showImageLightbox(`data:${item.media_type};base64,${item.data}`, item.name || "图片");
  });
  composerTop.appendChild(chip);
}

function appendFileChip(entry, idx) {
  if (attachmentsEmpty) attachmentsEmpty.classList.add("cw-hidden");
  const chip = document.createElement("span");
  chip.className = "cw-mini-chip cw-file-chip";
  chip.dataset.ctx = String(idx);
  chip.innerHTML = `<i data-lucide="file-text" aria-hidden="true"></i>${escapeHtml(entry.name)}<span class="cw-chip-x" title="移除"><i data-lucide="x" aria-hidden="true"></i></span>`;
  chip.addEventListener("click", (e) => {
    // FILECHIP：与图片 chip 一致，只有 × 才移除，防整块点击误删
    if (!e.target.closest(".cw-chip-x")) return;
    const ci = Number(chip.dataset.ctx);
    contextFiles[ci] = null;
    chip.remove();
    if (attachmentsEmpty && !pending.some(Boolean) && !contextFiles.some(Boolean)) attachmentsEmpty.classList.remove("cw-hidden");
  });
  composerTop.appendChild(chip);
}

// SENDLOSE_20261021：发送失败/挂载失败时把原输入放回输入框，避免用户白打一段话。
function restoreComposer(rawText, images, ctxs) {
  if (textarea && !textarea.value) textarea.value = rawText;
  // 失败路径通常还没清过 composer，chip 仍在→不要重复添加
  if (images.length && !pending.some(Boolean) && !$$(".cw-mini-chip[data-pending]", composerTop).length) {
    pending = images.slice();
    images.forEach((item, i) => appendImageChip(item, i));
  }
  if (ctxs.length && !contextFiles.some(Boolean) && !$$(".cw-file-chip[data-ctx]", composerTop).length) {
    contextFiles = ctxs.slice();
    ctxs.forEach((c, i) => appendFileChip(c, i));
  }
  if (attachmentsEmpty && (pending.some(Boolean) || contextFiles.some(Boolean))) attachmentsEmpty.classList.add("cw-hidden");
  try { localStorage.setItem(draftKey(), textarea ? textarea.value || "" : rawText); } catch {}
  refreshIcons();
}

async function addFiles(fileList) {
  for (const file of Array.from(fileList || [])) {
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      if (file.size > 12 * 1024 * 1024) {
        toast(`图片过大（>12MB）：${file.name}`, "warn");
        continue;
      }
      const item = await readFileAsBase64(file);
      pending.push(item);
      appendImageChip(item, pending.length - 1);
    } else {
      // 文本文件：读内容作为上下文
      let content;
      try {
        content = await file.text();
      } catch {
        toast(`无法读取：${file.name}`, "warn");
        continue;
      }
      if (content.length > 60000) content = content.slice(0, 60000) + "\n…(已截断)";
      contextFiles.push({ path: file.name, name: file.name, content });
      appendFileChip(contextFiles[contextFiles.length - 1], contextFiles.length - 1);
    }
  }
  refreshIcons();
}

async function send() {
  // 忙碌期不再静默吞掉输入：消息原样发给本地服务，由服务端排队，
  // 本轮结束后自动发出（详见 server.mjs 的 pendingSends）。
  // detached/空白标签直接发消息：先挂载内核（历史会话 --resume 续接），不再丢上下文回当前会话。
  // 没有任何视图（发消息即建会话）：直接凭空建一个空白视图走 /api/session/new。
  let targetView = activeView();
  if (!targetView) {
    targetView = makeView({ key: `new:${++newTabSeq}` });
    activeViewKey = targetView.key;
    renderSessionTabs();
    persistTabs();
  }
  const rawText = (textarea.value || "").trim();
  const images = pending.filter(Boolean);
  const ctxs = contextFiles.filter(Boolean);
  if (!rawText && !images.length && !ctxs.length) {
    toast("请输入内容或添加图片/文件", "warn");
    return;
  }
  // 把文本文件内容作为上下文拼在消息前面。
  let text = rawText;
  if (ctxs.length) {
    const ctxBlock = ctxs
      .map((c) => `<附带文件 path="${c.path}">\n${c.content}\n</附带文件>`)
      .join("\n");
    text = `${ctxBlock}\n${rawText}`.trim();
  }
  const userArticle = addUserMessage(rawText, images, Date.now());
  ctxs.forEach((c) => {
    if (c) {
      const row = document.createElement("div");
      row.className = "cw-attach-row";
      row.innerHTML = `<span class="cw-mini-chip"><i data-lucide="file-text" aria-hidden="true"></i>${escapeHtml(c.name)}</span>`;
      const bubble = $(".cw-user-bubble", userArticle);
      if (bubble) bubble.appendChild(row);
    }
  });
  lastSentText = rawText;
  // SENDLOSE_20261021：输入框与附件改成「发送成功后再清空」，失败时原样放回，
  // 不再出现“报错 + 输入没了”的情况。
  const sendPendingSnapshot = pending.slice();
  const sendCtxSnapshot = contextFiles.slice();
  const clearComposer = () => {
    // 等待服务端确认期间用户可能已经打了下一句/又贴了图：只清理本条消息对应的内容。
    if (textarea && textarea.value.trim() === rawText) textarea.value = "";
    if (pending.length === sendPendingSnapshot.length && pending.every((p, i) => p === sendPendingSnapshot[i])) {
      pending = [];
      $$(".cw-mini-chip[data-pending]", composerTop).forEach((c) => c.remove());
    }
    if (contextFiles.length === sendCtxSnapshot.length && contextFiles.every((c, i) => c === sendCtxSnapshot[i])) {
      contextFiles = [];
      $$(".cw-file-chip[data-ctx]", composerTop).forEach((c) => c.remove());
    }
    try { localStorage.setItem(draftKey(), textarea ? textarea.value || "" : ""); } catch {}
    if (attachmentsEmpty && !pending.some(Boolean) && !contextFiles.some(Boolean)) attachmentsEmpty.classList.remove("cw-hidden");
  };
  // 挂载内核：空白标签 → /api/session/new；历史标签 → /api/session/open（--resume 续接）。
  if (targetView && !targetView.kernelId) {
    claimNextKernel = true; // MULTIWIN：本窗口即将认领新内核（空视图兜底仅认此标志）
    setStatus(targetView.sessionId ? "正在续接会话…" : "正在启动会话内核…", "warn");
    try {
      const url = targetView.sessionId ? "/api/session/open" : "/api/session/new";
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: targetView.sessionId ? JSON.stringify({ sessionId: targetView.sessionId }) : JSON.stringify({ cwd: targetView.cwd || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        claimNextKernel = false;
        toast(data.error || "会话启动失败", "err");
        if (userArticle && userArticle.isConnected) userArticle.remove();
        restoreComposer(rawText, images, ctxs);
        return;
      }
      attachView(targetView, data.kernelId);
      await flushPendingSettings(targetView); // 空白标签暂存的模型/权限：赶在首条消息前按会话生效
      loadTaskList(); // 新会话首条消息：立刻在侧栏「最近」区露出（带状态点）
    } catch (err) {
      claimNextKernel = false;
      toast(`会话启动失败：${err.message}`, "err");
      if (userArticle && userArticle.isConnected) userArticle.remove();
      restoreComposer(rawText, images, ctxs);
      return;
    }
  }
  // SENDTARGET_20261021：上面 await 启动内核期间用户可能已经切到别的标签。
  // 忙碌标记与助手气泡必须归 targetView，不能顺手打扮成「当前标签在生成」。
  const targetIsActive = targetView === activeView();
  const wasBusy = Boolean(targetView.busy);
  if (!targetIsActive) {
    targetView.busy = true;
    targetView.done = false;
    // ARTKEEP_20261021：后台标签发消息也要拍基线。以前只有活动标签分支才拍，
    // 于是「在 A 标签发完切到 B」那一轮永远对不出产物。
    snapshotArtifacts(targetView);
  } else if (!busy) {
    setBusy(true);
    currentAssistant = null;
    // 发消息的瞬间就建出助手气泡与“已处理 Ns”秒表，不等首个 delta（可能要 5 秒）。
    turnStartAt = Date.now();
    beginAssistantTurn();
    snapshotArtifacts(targetView); // ARTIFACTS_20261021：基线记到目标标签，后台/切台都不串
  } else if (!thinkingStartAt) {
    // SENDVIS_20261021：忙碌标记残留（上一轮 result 没落到这个标签，或上游 429 卡住时
    // CLI 迟迟不发 message_start，本标签又没在跑任何一轮）时，旧逻辑会因为 busy=true 跳过
    // 建气泡——用户看到的就是「发了消息什么都没发生」。只要本标签没在计时，就照样建。
    setBusy(true);
    currentAssistant = null;
    turnStartAt = Date.now();
    beginAssistantTurn();
    snapshotArtifacts(targetView);
  }
  renderSessionTabs();
  try {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        images: images.map((i) => ({ media_type: i.media_type, data: i.data })),
        kernelId: targetView ? targetView.kernelId : undefined,
        sessionId: targetView && targetView.sessionId ? targetView.sessionId : undefined, // 兜底：内核丢失时服务端按 sessionId 自动 --resume
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (data && data.queued) {
      // 服务端已接住排队请求；当前轮的流式气泡保持原样继续渲染。
      clearComposer();
      addSystemNote("工作中，消息已排队；本轮结束后会和排队中的消息合并成一条继续处理，不打断当前工作。");
      return;
    }
    if (!res.ok || data.ok === false) {
      toast(data.error || `发送失败（${res.status}）`, "err");
      // 队列已满/停止中时服务端没有接收这条消息，撤回刚画出的用户气泡，
      // 避免界面出现“幽灵输入”。
      if (userArticle && userArticle.isConnected) userArticle.remove();
      restoreComposer(rawText, images, ctxs);
      if (!wasBusy) {
        if (targetIsActive) { abortAssistantTurn(); setBusy(false); }
        targetView.busy = false;
        renderSessionTabs();
      }
    } else {
      clearComposer(); // 服务端已接收：这时才清空输入框与附件
    }
  } catch (err) {
    toast(`发送失败：${err.message}`, "err");
    if (userArticle && userArticle.isConnected) userArticle.remove();
    restoreComposer(rawText, images, ctxs);
    if (!wasBusy) {
      if (targetIsActive) { abortAssistantTurn(); setBusy(false); }
      targetView.busy = false;
      renderSessionTabs();
    }
  }
}

/* ---------- @文件提及 ---------- */

function atIconFor(item) {
  if (item.dir) return "folder";
  const ext = item.ext;
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext)) return "image";
  if ([".mp4", ".mov", ".webm", ".mp3", ".wav", ".m4a"].includes(ext)) return "file-video";
  if ([".py", ".js", ".mjs", ".json", ".txt", ".md", ".csv"].includes(ext)) return "file-code";
  return "file";
}

function atRelPath(p) {
  return String(p || "").replace(/\\/g, "/").replace(/^[A-Za-z]:[\/]*/, "");
}

async function openAtMention(query) {
  if (!atPop) return;
  atPop.classList.remove("cw-hidden");
  atState = { items: [], sel: 0, query: query || "" };
  await renderAtItems();
}

function closeAtMention() {
  if (atPop) atPop.classList.add("cw-hidden");
  atState = null;
}

async function renderAtItems() {
  if (!atState) return;
  let data;
  try {
    data = await fetch("/api/files").then((r) => r.json());
  } catch {
    return;
  }
  let items = Array.isArray(data.items) ? data.items : [];
  const q = atState.query.toLowerCase();
  // 目录在前；按 query 过滤名称
  items = items.filter((it) => !q || it.name.toLowerCase().includes(q) || it.path.toLowerCase().includes(q));
  items.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1));
  items = items.slice(0, 60);
  atState.items = items;
  if (atState.sel >= items.length) atState.sel = 0;
  atList.innerHTML = "";
  items.forEach((it, i) => {
    const row = document.createElement("div");
    row.className = "cw-at-item" + (i === atState.sel ? " is-sel" : "");
    row.innerHTML = `<i data-lucide="${atIconFor(it)}"></i><span class="cw-at-name"></span><span class="cw-at-rel"></span>`;
    $(".cw-at-name", row).textContent = it.name;
    $(".cw-at-rel", row).textContent = atRelPath(it.path);
    row.addEventListener("mousedown", (e) => {
      e.preventDefault();
      atState.sel = i;
      commitAtSelection();
    });
    atList.appendChild(row);
  });
  refreshIcons();
}

function atMove(delta) {
  if (!atState || !atState.items.length) return;
  atState.sel = (atState.sel + delta + atState.items.length) % atState.items.length;
  $$(".cw-at-item", atList).forEach((r, i) => r.classList.toggle("is-sel", i === atState.sel));
  const sel = $$(".cw-at-item", atList)[atState.sel];
  if (sel) sel.scrollIntoView({ block: "nearest" });
}

async function commitAtSelection() {
  if (!atState) return;
  const item = atState.items[atState.sel];
  if (!item) return closeAtMention();
  // 去掉已输入的 @query，替换为 @相对路径
  const before = textarea.value.slice(0, textarea.selectionStart).replace(/@[^\s@]*$/, "");
  const after = textarea.value.slice(textarea.selectionStart);
  const rel = atRelPath(item.path);
  textarea.value = `${before}@${rel} ` + after;
  textarea.selectionStart = textarea.selectionEnd = (before + `@${rel} `).length;
  closeAtMention();
  if (item.dir) return; // 目录仅引用
  const ext = item.ext;
  const isImage = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext);
  if (isImage) {
    try {
      const buf = await fetch(`/api/serve-file?path=${encodeURIComponent(item.path)}`);
      const blob = await buf.blob();
      const f = new File([blob], item.name, { type: blob.type });
      addFiles([f]);
    } catch {}
  } else if ([".txt", ".json", ".md", ".py", ".js", ".mjs", ".csv", ".html", ".htm", ".css", ".yaml", ".yml", ".log", ".xml"].includes(ext)) {
    try {
      const d = await fetch(`/api/read-text?path=${encodeURIComponent(item.path)}`).then((r) => r.json());
      if (d.ok) {
        contextFiles.push({ path: item.path, name: item.name, content: d.content });
        appendFileChip(contextFiles[contextFiles.length - 1], contextFiles.length - 1);
        refreshIcons();
      }
    } catch {}
  }
}

function detectAtTrigger() {
  const pos = textarea.selectionStart;
  const upto = textarea.value.slice(0, pos);
  const m = upto.match(/(^|\s)@([^\s@]*)$/);
  if (m) {
    if (!atState) openAtMention(m[2]);
    else { atState.query = m[2]; renderAtItems(); }
  } else if (atState) {
    closeAtMention();
  }
}

/* ---------- 产物预览 ---------- */

/* 聊天内产物卡片（WorkBuddy 式）：发送时快照工作区，本轮结束时对比出新增/变化文件，
   在助手气泡下渲染卡片，点击复用产物面板的 showPreview。纯前端实现，不依赖服务端改动。 */
// VIEWSTATE_20261021：基线从全局单份改成每标签各一份（v.artifacts），
// 否则 A 标签发送时快照、B 标签 result 时对比，A 的新增文件会挂到 B 名下，A 自己反而漏报。
let artifactBaseline = null; // 兼容旧路径：始终指向当前活动标签的基线
// 产物归属会话：sessionId -> Map<path, item>（本轮结束时由 flushArtifacts 记录）
const sessionArtifacts = new Map();
// ARTKEEP_20261021：每轮产物按「轮末时间戳」留档。以前产物只活在那一个 DOM 节点里，
// renderTranscript 一 innerHTML="" 就永久消失——用户看到的就是「聊着聊着东西又没了」。
// 转写重画时按 result 条目的 at 就近匹配回来，卡片就能原地复现。
const turnArtifacts = new Map(); // sid -> [{ at, items }]
const ART_STORE_KEY = "wb.artifactStore.v1";
// ISOLATE_20261021：artScope 现在是「当前标签」的值，artScopeDefault 才是全局偏好（新标签沿用它）。
let artScopeDefault = "session";
try { artScopeDefault = localStorage.getItem("wb.artScope") === "all" ? "all" : "session"; } catch {}
let artScope = artScopeDefault;

// 落盘（防抖）：刷新页面/重开壳后，本会话产物卡片与右栏清单都还在。
let artPersistTimer = 0;
function persistArtifactsSoon() {
  if (artPersistTimer) return;
  artPersistTimer = setTimeout(() => {
    artPersistTimer = 0;
    try {
      const out = { s: {}, t: {} };
      for (const [sid, m] of sessionArtifacts) out.s[sid] = [...m.values()].slice(-300);
      for (const [sid, list] of turnArtifacts) out.t[sid] = list.slice(-40);
      localStorage.setItem(ART_STORE_KEY, JSON.stringify(out));
    } catch {}
  }, 400);
}
function restoreArtifacts() {
  let parsed = null;
  try { parsed = JSON.parse(localStorage.getItem(ART_STORE_KEY) || "null"); } catch { return; }
  if (!parsed) return;
  for (const [sid, items] of Object.entries(parsed.s || {})) {
    if (!Array.isArray(items)) continue;
    const m = new Map();
    items.forEach((it) => { if (it && it.path) m.set(it.path, it); });
    sessionArtifacts.set(sid, m);
  }
  for (const [sid, list] of Object.entries(parsed.t || {})) {
    if (!Array.isArray(list)) continue;
    turnArtifacts.set(sid, list.filter((t) => t && Array.isArray(t.items)));
  }
}

// ARTKEEP：按 result 条目时间就近匹配该轮的产物。used 是本次重画的占用集——
// 一次渲染里每条产物记录只能挂一轮，避免两条相邻 result 抢同一份卡片。
function artifactsForTurn(sid, at, used) {
  if (!sid || !at) return null;
  const list = turnArtifacts.get(sid);
  if (!list || !list.length) return null;
  let best = -1;
  let bestGap = 8000; // 同机时钟，正常误差在毫秒级；8s 容差足够兜住防抖落盘
  for (let i = 0; i < list.length; i++) {
    if (used && used.has(i)) continue;
    const gap = Math.abs(Number(list[i].at) - Number(at));
    if (gap <= bestGap) { bestGap = gap; best = i; }
  }
  if (best < 0) return null;
  if (used) used.add(best);
  return list[best].items || null;
}

function recordTurnArtifacts(sid, at, items) {
  if (!sid || !items || !items.length) return;
  let list = turnArtifacts.get(sid);
  if (!list) { list = []; turnArtifacts.set(sid, list); }
  list.push({ at, items });
  if (list.length > 40) list.splice(0, list.length - 40);
}

async function snapshotArtifacts(view) {
  const av = view || activeView();
  try {
    const data = await fetch("/api/products").then((r) => r.json());
    const items = Array.isArray(data.items) ? data.items : [];
    const map = new Map();
    items.forEach((it) => map.set(it.path, `${it.mtime}:${it.size}`));
    if (av) av.artifacts = map;
    if (av === activeView()) artifactBaseline = map;
  } catch {
    if (av) av.artifacts = null;
    if (av === activeView()) artifactBaseline = null;
  }
}

// ARTKEEP_20261021：卡片构建抽成纯函数——实时轮末与历史重画共用同一套外观/交互，
// 不再各写一份（各写一份正是「实时有时有、重画必消失」的来源）。
function buildArtifactCard(item) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "cw-artifact-card";
  card.innerHTML = `<i data-lucide="${atIconFor(item)}" aria-hidden="true"></i><span class="cw-ac-name"></span><span class="cw-ac-size"></span>`;
  $(".cw-ac-name", card).textContent = item.name;
  $(".cw-ac-size", card).textContent = formatBytes(item.size);
  card.title = canOpenInBrowser(item) ? "左键预览 · 双击在内置浏览器打开 · 右键打开所在文件夹 · 图片可 Ctrl+点击放大" : "左键预览 · 右键打开所在文件夹";
  card.addEventListener("click", (e) => {
    // IMGLIGHTBOX_20261112：图片类产物 Ctrl+点击 直接全屏放大（不切面板）
    const ext = String(item.ext || "").toLowerCase();
    const isImg = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext);
    if (isImg && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      showImageLightbox(`/api/serve-file?path=${encodeURIComponent(item.path)}`, item.name);
      return;
    }
    ensureAssetsPanel();
    showPreview(item);
  });
  card.addEventListener("dblclick", (e) => { e.preventDefault(); openArtifactInBrowser(item); });
  card.addEventListener("contextmenu", (e) => { e.preventDefault(); revealArtifact(item); });
  return card;
}

function buildArtifactBlock(items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return null;
  const wrap = document.createElement("div");
  wrap.className = "cw-artifacts";
  const label = document.createElement("div");
  label.className = "cw-artifacts-label";
  label.textContent = `本轮产物 · ${list.length}`;
  const grid = document.createElement("div");
  grid.className = "cw-artifact-grid";
  list.forEach((item) => grid.appendChild(buildArtifactCard(item)));
  wrap.append(label, grid);
  return wrap;
}

// ARTKEEP_20261021：host 显式传入。调用点必须在本轮 currentAssistant 还活着时抓好气泡正文，
// 不能等到 addResultFooter 把 currentAssistant 置 null 之后再来取（老代码就是这样，
// 守卫恒为 null → 卡片一次都没真正挂上去过）。
async function flushArtifacts(view, host) {
  // ARTIFACTS_20261021：由事件所属标签驱动，后台标签的 result 也能正确落账。
  const v = view || activeView();
  const baseline = v ? v.artifacts : artifactBaseline;
  if (!baseline) return;
  let items = [];
  try {
    const data = await fetch("/api/products").then((r) => r.json());
    items = Array.isArray(data.items) ? data.items : [];
  } catch { return; }
  const fresh = items
    .filter((it) => baseline.get(it.path) !== `${it.mtime}:${it.size}`)
    .slice(0, 12);
  if (v) v.artifacts = null;
  if (!v || v === activeView()) artifactBaseline = null;
  // 产物归属该标签的会话（供产物面板「本会话」范围与变更面板降级清单使用）
  const ownerSid = v && v.sessionId ? v.sessionId : currentSessionId;
  if (fresh.length && ownerSid) {
    let m = sessionArtifacts.get(ownerSid);
    if (!m) { m = new Map(); sessionArtifacts.set(ownerSid, m); }
    fresh.forEach((it) => m.set(it.path, it));
    // ARTKEEP：按轮留档，历史重画时据此复原卡片
    recordTurnArtifacts(ownerSid, v && v.lastResultAt ? v.lastResultAt : Date.now(), fresh);
    persistArtifactsSoon();
  }
  // 右栏不可见或不在产物标签时：点亮任务驱动角标（产物+N）
  if (fresh.length && (insModeNow() !== "open" || currentRightPanel !== "assets")) {
    unseenProducts += fresh.length;
    setProductsBadge(unseenProducts);
    setInspectorBadge(true);
  }
  if (!fresh.length) return;
  // 后台标签的产物不进聊天流（DOM 只有一份，属于活动标签），但归属与角标已在上面记账。
  if (v && v !== activeView()) return;
  const target = host && host.isConnected
    ? host
    : (currentAssistant && currentAssistant.article && currentAssistant.article.isConnected
      ? currentAssistant.article
      : null);
  if (!target) return;
  const block = buildArtifactBlock(fresh);
  if (!block) return;
  target.appendChild(block);
  refreshIcons();
  scrollToEnd();
}

async function loadProducts() {
  const grid = $("#cw-product-grid");
  if (!grid) return;
  // 范围开关：本会话（默认）/ 全部（工作目录扫描）
  // SESSPROD_20261114：「本会话」改走 /api/session-products——服务端从会话历史档反查
  // 时间窗内写入的文件，落盘可溯源，壳重启/换客户端后历史会话照样能看（旧前端基线法会丢）。
  if (artScope === "session") {
    const sid = (readingHistory && readingHistory.sessionId) || currentSessionId ||
      (activeView() && activeView().sessionId) || null;
    if (!sid) { renderProductRows([], "当前没有活动会话"); return; }
    let data;
    try {
      data = await fetch(`/api/session-products?sid=${encodeURIComponent(sid)}`).then((r) => r.json());
    } catch {
      const sm = $("#cw-product-summary");
      if (sm) sm.textContent = "读取失败";
      return;
    }
    if (!data.ok) { renderProductRows([], data.error || "读取失败"); return; }
    const mine = Array.isArray(data.items) ? data.items : [];
    renderProductRows(mine, "这个会话还没有产出文件；任务产出后会显示在这里（可切「全部」看工作目录）");
    return;
  }
  let data;
  try {
    data = await fetch("/api/products").then((r) => r.json());
  } catch {
    const sm = $("#cw-product-summary");
    if (sm) sm.textContent = "读取失败";
    return;
  }
  const items = Array.isArray(data.items) ? data.items : [];
  renderProductRows(items, "工作目录还没有可预览的产物");
}

function renderProductRows(items, emptyHint) {
  const grid = $("#cw-product-grid");
  if (!grid) return;
  const summary = $("#cw-product-summary");
  if (summary) {
    if (!items.length) summary.textContent = emptyHint || "没有可预览的产物";
    else {
      const total = items.reduce((s, it) => s + (Number(it.size) || 0), 0);
      summary.textContent = `${items.length} 个文件 · ${formatBytes(total)}`;
    }
  }
  grid.innerHTML = "";
  grid.className = "cw-product-list";
  items.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "cw-product-row";
    const browserBtn = canOpenInBrowser(item) ? `<span class="cw-pr-open" role="button" title="在内置浏览器打开"><i data-lucide="app-window" aria-hidden="true"></i></span>` : "";
    row.innerHTML = `<i data-lucide="${atIconFor(item)}"></i><span class="cw-pr-name"></span><span class="cw-pr-size"></span>${browserBtn}`;
    $(".cw-pr-name", row).textContent = item.name;
    $(".cw-pr-size", row).textContent = formatBytes(item.size);
    row.title = canOpenInBrowser(item) ? "左键预览 · 双击或右侧按钮在内置浏览器打开 · 右键打开所在文件夹" : "左键预览 · 右键打开所在文件夹";
    row.addEventListener("contextmenu", (e) => { e.preventDefault(); revealArtifact(item); });
    row.addEventListener("dblclick", (e) => { e.preventDefault(); openArtifactInBrowser(item); });
    row.addEventListener("click", () => {
      $$(".cw-product-row", grid).forEach((r) => r.classList.remove("is-active"));
      row.classList.add("is-active");
      showPreview(item);
    });
    const open = $(".cw-pr-open", row);
    if (open) open.addEventListener("click", (e) => { e.stopPropagation(); openArtifactInBrowser(item); });
    grid.appendChild(row);
  });
  refreshIcons();
}

/* ARTCTX_20261016：产物右键 = 打开所在文件夹（explorer /select 选中该文件）。
   点击产物卡片时自动展开右栏到产物页——右栏收起时点卡片曾表现为"没反应"。 */
function revealArtifact(item) {
  if (!item || !item.path) return;
  fetch("/api/reveal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: item.path }),
  }).catch(() => {});
}

/* PATHLINK_20261113：聊天正文里的本地路径芯片。
   起因：模型把产物直接写在 D:\ 根目录（D:\xxx.tar.gz），不在 PRODUCT_ROOTS 内 →
   既没有「本轮产物」卡片，也点不开，聊天里只剩一串死文字。
   动作实现已搬到 format-utils.js 的 window.__cwFilePathClick / __cwFilePathReveal
   （那里是芯片渲染的同源文件，确定会被加载；且芯片本身带行内 onclick）。
   这里只留一层捕获阶段的委托做兜底，重复触发由 350ms 同路径去重挡掉。 */
document.addEventListener("click", (e) => {
  const a = e.target && e.target.closest ? e.target.closest("a.cw-file-link") : null;
  if (!a || typeof window.__cwFilePathClick !== "function") return;
  e.preventDefault();
  window.__cwFilePathClick(a, e);
}, true);
document.addEventListener("contextmenu", (e) => {
  const a = e.target && e.target.closest ? e.target.closest("a.cw-file-link") : null;
  if (!a || typeof window.__cwFilePathReveal !== "function") return;
  e.preventDefault();
  window.__cwFilePathReveal(a, e);
}, true);

/* H1-2：产物在内置浏览器打开——走既有浏览器面板 tab 通道（claudeDesktop.browser.tabNew，
   main.js browser:tab-new → createTabView + showBrowserView）。
   URL 用本壳静态服务 /api/serve-file（http://127.0.0.1:<port>），不用 file:// 直读。
   非壳环境（浏览器里开前端）回退 window.open。 */
const BROWSER_PREVIEW_EXT = new Set([".html", ".htm", ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".pdf"]);
function extOfArtifact(item) {
  const p = String((item && (item.abs || item.path)) || "");
  const m = p.match(/(\.[A-Za-z0-9]+)$/);
  return m ? m[1].toLowerCase() : "";
}
function canOpenInBrowser(item) { return BROWSER_PREVIEW_EXT.has(extOfArtifact(item)); }
async function openArtifactInBrowser(item) {
  if (!item || !(item.abs || item.path)) return;
  if (!canOpenInBrowser(item)) { toast("该类型不支持内置浏览器预览（支持 HTML / 图片 / PDF）", "err"); return; }
  const url = `${location.origin}/api/serve-file?path=${encodeURIComponent(item.abs || item.path)}`;
  try {
    if (window.claudeDesktop && window.claudeDesktop.browser && window.claudeDesktop.browser.tabNew) {
      // ISOLATE_20261021：产物预览标签记在当前会话名下，不再落进所有会话共用的公共区
      await window.claudeDesktop.browser.tabNew(url, browserSessionKey());
      toast("已在内置浏览器新标签打开", "ok");
    } else {
      window.open(url, "_blank");
    }
  } catch {
    window.open(url, "_blank");
  }
}
function ensureAssetsPanel() {
  if (insModeNow() !== "open") {
    uiPrefs.insMode = "open";
    uiPrefs.inspectorHidden = false;
    saveUiPrefs();
    applyShellLayout();
    setInspectorBadge(false);
  }
  applyRightPanel("assets");
}

function showPreview(item) {
  activePreview = item;
  const pv = activeView();
  if (pv) pv.preview = item; // ISOLATE_20261021：预览项跟着标签走
  const ext = item.ext;
  // PATHLINK_20261113：聊天里点开的文件可能在工作目录之外，走 /api/chat-file 而不是 serve-file
  const serve = item.serveUrl || `/api/serve-file?path=${encodeURIComponent(item.path)}`;
  previewBox.innerHTML = "";
  const isAudio = [".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"].includes(ext);
  const isVideo = [".mp4", ".mov", ".webm", ".mkv", ".avi"].includes(ext);
  const isImage = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"].includes(ext);
  const isHtml = [".html", ".htm"].includes(ext);
  const isPdf = ext === ".pdf";
  const isText = [".txt", ".json", ".md", ".py", ".js", ".mjs", ".csv"].includes(ext);
  if (isAudio) {
    previewBox.innerHTML = `<audio controls src="${serve}"></audio>`;
  } else if (isVideo) {
    previewBox.innerHTML = `<video controls src="${serve}"></video>`;
  } else if (isImage) {
    // IMGLIGHTBOX_20261112：预览图点击放大（showImageLightbox 全屏查看，点击遮罩/Esc 关闭）
    previewBox.innerHTML = `<img class="cw-preview-img-clickable" src="${serve}" alt="${escapeHtml(item.name)}" title="点击放大查看">`;
    const bigImg = previewBox.querySelector("img");
    if (bigImg) bigImg.addEventListener("click", () => showImageLightbox(serve, item.name));
  } else if (isHtml) {
    previewBox.innerHTML = `<iframe src="${serve}"></iframe>`;
  } else if (isPdf) {
    previewBox.innerHTML = `<iframe src="${serve}"></iframe>`;
  } else if (isText) {
    const pre = document.createElement("pre");
    previewBox.appendChild(pre);
    // FETCHGUARD_20261021：原来没有 catch，桥断开时文本预览永远停在空白。
    // PATHLINK_20261113：工作目录外的聊天路径没有 read-text 权限，直接用 chat-file 取原文（纯文本响应）。
    if (item.chatPath && item.serveUrl) {
      fetch(item.serveUrl)
        .then((r) => (r.ok ? r.text() : `读取失败（HTTP ${r.status}）`))
        .then((t) => { pre.textContent = t; })
        .catch((err) => { pre.textContent = `读取失败：${(err && err.message) || err}`; });
    } else {
      fetch(`/api/read-text?path=${encodeURIComponent(item.path)}`)
        .then((r) => r.json())
        .then((d) => { pre.textContent = d.ok ? d.content : d.error || "读取失败"; })
        .catch((err) => { pre.textContent = `读取失败：${(err && err.message) || err}`; });
    }
  } else {
    previewBox.innerHTML = `<div class="cw-preview-empty">该文件类型不支持预览，可用下方按钮打开。</div>`;
  }
  // H1-2：HTML/图片/PDF 才显示「浏览器打开」
  if (previewBrowser) previewBrowser.classList.toggle("cw-hidden", !canOpenInBrowser(item));
  previewActions.classList.remove("cw-hidden");
}

/* ---------- 通知 ---------- */

function notify(title, body) {
  const rec = { title, body, at: Date.now() };
  notifications.push(rec);
  if (notifications.length > 30) notifications = notifications.slice(-30);
  // 仅在窗口非前台时弹系统通知并点亮红点
  if (documentHidden) {
    if (bellDot) bellDot.classList.remove("cw-hidden");
    if ("Notification" in window && Notification.permission === "granted") {
      try { new Notification(title, { body }); } catch {}
    }
  }
}

/* ---------- 提示音（WebAudio 合成，无音频文件） ---------- */

const SOUND_KEY = "wb.sound"; // "1"=开，"0"=关，缺省开
function soundEnabled() {
  try { return localStorage.getItem(SOUND_KEY) !== "0"; } catch { return true; }
}
function setSoundEnabled(on) {
  try { localStorage.setItem(SOUND_KEY, on ? "1" : "0"); } catch {}
}
let soundCtx = null;
function beepAt(ctx, at, freq, dur, vol, type) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(vol, at + 0.012); // 12ms 快起音，防爆音
  gain.gain.exponentialRampToValueAtTime(0.0001, at + dur); // 指数衰减收尾
  osc.connect(gain).connect(ctx.destination);
  osc.start(at);
  osc.stop(at + dur + 0.03);
}
// kind: "up"=成功上行双音 | "down"=错误/预算下行低音
// 门禁：仅在窗口隐藏(documentHidden)或本轮耗时 > 8s 时发声；音量固定 0.12
function playTurnSound(kind, durationMs) {
  if (!soundEnabled()) return;
  const hidden = documentHidden || document.hidden;
  if (!hidden && !((Number(durationMs) || 0) > 8000)) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!soundCtx) soundCtx = new AC();
    if (soundCtx.state === "suspended") soundCtx.resume().catch(() => {});
    const t = soundCtx.currentTime + 0.02;
    const v = 0.12;
    if (kind === "down") {
      beepAt(soundCtx, t, 330, 0.16, v, "triangle");
      beepAt(soundCtx, t + 0.14, 220, 0.22, v, "triangle");
    } else {
      beepAt(soundCtx, t, 660, 0.12, v, "sine");
      beepAt(soundCtx, t + 0.13, 990, 0.16, v, "sine");
    }
  } catch {}
}

/* ---------- manual 权限弹窗 ---------- */

// PERMQUEUE_20261021：并行标签会同时撞上权限请求。以前 permissionState 只有一份，
// 后到的请求直接盖掉前一个——前一个标签的工具调用没人应答，120s 后被动按拒绝收尾。
// 改成按 requestId 排队，一次只显示一个，处理完自动弹下一个。
let permissionState = null;
const permissionQueue = []; // 等待用户应答的请求（按到达顺序）
function showPermissionModal(msg) {
  if (!msg || !msg.requestId) return;
  // 重复投递（重连重放）不重复入队
  if (permissionState && permissionState.requestId === msg.requestId) return;
  if (permissionQueue.some((q) => q.requestId === msg.requestId)) return;
  if (permissionState) { permissionQueue.push(msg); updatePermissionBadge(); return; }
  renderPermissionModal(msg);
}
function updatePermissionBadge() {
  const modal = document.getElementById("cw-permission-modal");
  if (!modal || modal.classList.contains("cw-hidden")) return;
  const toolEl = document.getElementById("cw-permission-tool");
  if (toolEl && permissionQueue.length) {
    toolEl.dataset.queued = String(permissionQueue.length);
    toolEl.title = `还有 ${permissionQueue.length} 个权限请求在排队`;
  }
}
function renderPermissionModal(msg) {
  permissionState = msg;
  const modal = document.getElementById("cw-permission-modal");
  if (!modal) return;
  const toolEl = document.getElementById("cw-permission-tool");
  const descEl = document.getElementById("cw-permission-desc");
  const inputEl = document.getElementById("cw-permission-input");
  const reasonEl = document.getElementById("cw-permission-reason");
  // 多会话：标注来源会话，避免不知道是哪个标签在请求权限
  const srcView = findViewByKernelId(msg.kernelId) || findViewBySessionId(msg.sessionId);
  const srcLabel = srcView ? `「${tabTitleFor(srcView)}」` : "";
  const suffix = permissionQueue.length ? `（另有 ${permissionQueue.length} 个待处理）` : "";
  if (toolEl) {
    toolEl.textContent = (srcLabel ? srcLabel + " " : "") + (msg.displayName || msg.toolName || "工具") + suffix;
    if (permissionQueue.length) toolEl.title = `还有 ${permissionQueue.length} 个权限请求在排队`;
    else toolEl.removeAttribute("title");
  }
  if (descEl) descEl.textContent = (srcLabel ? `来自会话 ${srcLabel}：` : "") + (msg.description || "（无描述）");
  if (inputEl) inputEl.textContent = JSON.stringify(msg.input || {}, null, 2).slice(0, 2000);
  if (reasonEl) {
    if (msg.decisionReason) { reasonEl.textContent = `原因：${msg.decisionReason}`; reasonEl.classList.remove("cw-hidden"); }
    else reasonEl.classList.add("cw-hidden");
  }
  modal.classList.remove("cw-hidden");
  if (typeof refreshIcons === "function") refreshIcons();
}
// requestId 可选：给了就只摘掉对应的那一条（可能是排队中的），不给则清当前并弹下一个。
function hidePermissionModal(requestId) {
  const modal = document.getElementById("cw-permission-modal");
  if (requestId) {
    const idx = permissionQueue.findIndex((q) => q.requestId === requestId);
    if (idx >= 0) permissionQueue.splice(idx, 1);
    if (!permissionState || permissionState.requestId !== requestId) {
      if (permissionState) renderPermissionModal(permissionState);
      return;
    }
  }
  permissionState = null;
  if (permissionQueue.length) { renderPermissionModal(permissionQueue.shift()); return; }
  if (modal) modal.classList.add("cw-hidden");
}
let permissionSending = false;
async function respondPermission(behavior) {
  const msg = permissionState;
  // PERMROBUST_20261021：此前先关弹窗再 POST，网络一抖这个请求就丢了——
  // 工具调用卡在 120s 超时后按拒绝处理，用户却以为已经允许。改成 POST 成功才关。
  if (!msg || permissionSending) return;
  permissionSending = true;
  const modal = document.getElementById("cw-permission-modal");
  const btns = ["cw-permission-allow", "cw-permission-deny", "cw-permission-close"]
    .map((id) => document.getElementById(id)).filter(Boolean);
  btns.forEach((b) => { b.disabled = true; });
  try {
    const res = await fetch("/api/permission-response", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requestId: msg.requestId, behavior }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) throw new Error(data.error || `HTTP ${res.status}`);
    hidePermissionModal(msg.requestId);
  } catch (err) {
    // 弹窗留着，用户可以再点；服务端 120s 未响应仍会按拒绝收尾。
    toast(`权限响应发送失败：${(err && err.message) || err}`, "err");
    if (modal) modal.classList.remove("cw-hidden");
  } finally {
    permissionSending = false;
    btns.forEach((b) => { b.disabled = false; });
  }
}
(function wirePermissionModal() {
  const modal = document.getElementById("cw-permission-modal");
  if (!modal) return;
  document.getElementById("cw-permission-allow")?.addEventListener("click", () => respondPermission("allow"));
  document.getElementById("cw-permission-deny")?.addEventListener("click", () => respondPermission("deny"));
  document.getElementById("cw-permission-close")?.addEventListener("click", () => respondPermission("deny"));
  modal.addEventListener("click", (e) => { if (e.target === modal) respondPermission("deny"); });
})();

/* ---------- 三档工作模式 ---------- */

const modeBtnEl = document.getElementById("cw-mode-btn");
const modeMenuEl = document.getElementById("cw-mode-menu");
const modeLabelEl = document.getElementById("cw-mode-label");
const MODE_LABELS = { fast: "快速", balanced: "均衡", deep: "深度", custom: "自定义" };
async function loadModeUI() {
  try {
    const d = await (await fetch("/api/mode")).json();
    const label = d && d.ok ? (MODE_LABELS[d.mode] || "自定义") : "";
    if (modeLabelEl && label) modeLabelEl.textContent = label;
    const btn = document.getElementById("cw-mode-btn");
    if (btn && label) btn.title = `工作模式：${label}（快速=少思考秒回 / 均衡=日常 / 深度=重活）`;
  } catch {}
}
if (modeBtnEl && modeMenuEl) {
  modeBtnEl.addEventListener("click", () => modeMenuEl.classList.toggle("cw-hidden"));
  modeMenuEl.addEventListener("click", async (e) => {
    const item = e.target.closest("button[data-mode]");
    if (!item) return;
    modeMenuEl.classList.add("cw-hidden");
    const key = item.dataset.mode;
    try {
      const r = await fetch("/api/mode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode: key }) });
      const d = await r.json();
      if (d && d.ok) {
        if (modeLabelEl) modeLabelEl.textContent = MODE_LABELS[key];
        // GLOBALSET_20261021：有会话在生成时服务端不再整单拒绝，而是排到轮末重启生效。
        toast(d.deferred > 0 ? `已切换到「${MODE_LABELS[key]}」，${d.deferred} 个会话本轮结束后生效` : `已切换到「${MODE_LABELS[key]}」模式`, "ok");
        if (typeof loadRuntime === "function") loadRuntime();
      } else toast((d && d.error) || "切换失败", "err");
    } catch { toast("切换失败", "err"); }
  });
  loadModeUI();
}

/* ---------- 初始化 ---------- */

function fillModelSelect(sel, items, current) {
  if (!sel) return;
  sel.innerHTML = "";
  for (const item of items) {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.label || item.upstream || "GLM-5.3";
    if (item.id === current) option.selected = true;
    sel.appendChild(option);
  }
}

let composerDefaultModel = "";     // 全局默认模型 id（/api/models current）
let composerDefaultDisplay = "";   // 及其显示名
// EFFORTSUPPORT_20261114：模型 → 思考强度支持。/api/models 下发 supportsEffort；
// 免费通道（NIM/百灵/本地 Ollama/文心）上游不认 thinking 预算，按钮对这些模型隐藏。
const effortSupportByModel = new Map();

async function loadModels() {
  try {
    const data = await fetch("/api/models").then((r) => r.json());
    if (data.channel) setChannelLabel(data.channel); // CHANNELLABEL_20261114：渠道标签跟随
    if (statusUpstream) statusUpstream.textContent = data.upstream || displayModel;
    if (Array.isArray(data.items)) {
      effortSupportByModel.clear();
      data.items.forEach((m) => effortSupportByModel.set(m.id, m.supportsEffort !== false));
      fillModelSelect(modelSelect, data.items, data.current);
      fillModelSelect(composerModel, data.items, data.current);
      fillModelSelect(settingsModel, data.items, data.current);
      // H2：记住全局默认模型——空白标签（无内核）的下拉/标题显示它，不吃任何会话的残留选择。
      if (data.current) { composerDefaultModel = data.current; composerDefaultDisplay = data.upstream || data.current; }
    }
  } catch {
    if (statusUpstream) statusUpstream.textContent = displayModel;
  }
}

// EFFORTSUPPORT_20261114：按当前选中模型显隐「思考强度」按钮。默认显示（未知模型不误伤）。
function syncEffortVisibility() {
  if (!effortBtn) return;
  const id = composerModel && composerModel.value ? composerModel.value : composerDefaultModel;
  const supports = effortSupportByModel.get(id);
  const hide = supports === false; // 只有明确标记 false 才隐藏
  effortBtn.classList.toggle("cw-hidden", hide);
  effortBtn.title = hide
    ? "当前模型不支持思考强度调节"
    : "思考强度：控制模型的思考预算档位";
}


/* ---------- H2_20261020 模型下拉诚实化 ----------
   根因：composerModel（以及权限/思考强度标签）是全局单例 DOM，此前从不同步——
   在会话 A 选了 DeepSeek 再切到会话 B，下拉仍显示 DeepSeek，而标题栏被 status 帧驱动
   显示 B 的真实模型 → 两者同框矛盾，用户读成「全都跟着换了」。
   约定：这些单例控件只许描述「当前活动视图」；每个视图缓存自己的真实值（帧驱动维护），
   切台/就绪/设置应用时统一经 applyViewControls 对齐；权威核对走 /api/sessions。 */

let permDefaultGlobal = "fullAccess"; // 服务端全局权限档（/api/settings 校准）

// 会话级真实值 → 视图缓存。r 来自 /api/kernel-settings 响应（model/effort/effortMode/permissionPreset）。
function cacheViewSettings(v, r) {
  if (!v || !r) return;
  if (r.model) v.model = r.model;
  if (r.effort) {
    v.effort = r.effort;
    v.effortMode = r.effortMode || "manual";
    v.autoEffortTier = r.effortMode === "auto" ? r.effort : null;
  }
  if (r.permissionPreset) v.permissionPreset = r.permissionPreset;
}

// 下拉选值：精确命中直接选；缺项（/api/models 数据源晚到/不含该 id）选同渠道最接近项并 title 标注真实值。
function setComposerModelValue(id, displayName) {
  if (!composerModel || !id) return;
  const opts = Array.from(composerModel.options);
  if (opts.some((o) => o.value === id)) {
    composerModel.value = id;
    composerModel.removeAttribute("title");
    return;
  }
  const stem = (x) => String(x).split(/[-:]/)[0].toLowerCase();
  let best = null;
  for (const o of opts) {
    if (stem(o.value) !== stem(id)) continue;
    if (!best || o.value.length < best.value.length) best = o; // 渠道内取最短名≈基线款
  }
  if (best) composerModel.value = best.value;
  // 标注同时给显示名与原始 id：用户/复核者都能一眼确认「下拉选的是近似项、会话真实模型是什么」。
  const shown = displayName && displayName !== id ? `${displayName} / ${id}` : (displayName || id);
  composerModel.title = `当前会话实际模型：${shown}（下拉暂无精确选项，已选最接近项）`;
}

// 视图真实状态 → 全局单例控件（模型下拉+标题 / 权限 / 思考强度标签）。
// 只在 v 仍是活动视图时写；空白标签显示 pendingSettings（待生效）或全局默认。
function applyViewControls(v) {
  if (!v || activeView() !== v) return;
  let model = v.model || "";
  let pending = false;
  if (!v.kernelId && v.pendingSettings && v.pendingSettings.model) { model = v.pendingSettings.model; pending = true; }
  if (model) {
    const disp = pending ? model : (v.displayModel || model);
    setModel(disp);
    setComposerModelValue(model, disp);
    if (pending) composerModel.title = "已记录：本会话启动时生效（仅当前会话）";
  } else if (composerDefaultModel) {
    setModel(composerDefaultDisplay || composerDefaultModel);
    setComposerModelValue(composerDefaultModel, composerDefaultDisplay);
  }
  syncEffortVisibility(); // EFFORTSUPPORT：切视图后按模型能力显隐思考强度按钮
  const pendEffort = (!v.kernelId && v.pendingSettings && v.pendingSettings.effort) || null;
  if (v.effort) {
    autoEffortTier = v.autoEffortTier || null;
    setEffortUI(v.effortMode === "auto" ? "auto" : v.effort);
  } else if (pendEffort) {
    setEffortUI(pendEffort);
  } else {
    setEffortUI("auto"); // 无会话数据时回到服务端默认档（Auto）
  }
  const pendPerm = (!v.kernelId && v.pendingSettings && v.pendingSettings.permissionPreset) || null;
  if (v.permissionPreset) setPermissionUI(v.permissionPreset);
  else if (pendPerm) setPermissionUI(pendPerm);
  else setPermissionUI(permDefaultGlobal);
}

// 权威核对：/api/sessions 里该内核的真实 model 回写视图并对齐控件。
// setActiveView 先用缓存即时回显（applyViewControls），再由这里异步校正——帧缓存丢失/过期也不至于说谎。
async function syncComposerModel() {
  const v = activeView();
  if (!v || !v.kernelId) return; // 空白标签：applyViewControls 已按全局默认处理
  const keyAtStart = activeViewKey;
  try {
    const data = await fetch("/api/sessions").then((r) => r.json());
    if (activeViewKey !== keyAtStart) return; // 切台竞态：晚到的响应不许写到别的视图头上
    const s = (data.sessions || []).find((x) => x.kernelId === v.kernelId);
    if (s && s.model) {
      v.model = s.model;
      v.displayModel = s.displayModel || v.displayModel;
      applyViewControls(v);
    }
  } catch {}
}

function fillAbout(health) {
  lastHealth = health || lastHealth;
  const facts = [
    ["桥接地址", location.origin],
    ["上游代理", lastHealth?.baseUrl || "—"],
    ["上游模型", lastHealth?.displayModel || displayModel],
    ["请求模型", lastHealth?.model || "—"],
    ["工作目录", lastHealth?.cwd || "—"],
    ["权限模式", lastHealth?.permissionMode || "—"],
    ["允许工具", lastHealth?.allowedTools || "—"],
    ["本机进程", lastHealth?.state || "—"],
    ["已处理轮次", String(lastHealth?.turns ?? turnCount)],
    ["会话 ID", lastHealth?.sessionId ? String(lastHealth.sessionId) : "尚未建立"],
    ["Electron", window.claudeDesktop ? "原生外壳" : "浏览器预览"],
  ];
  if (!aboutBody) return;
  aboutBody.innerHTML = "";
  for (const [key, value] of facts) {
    const row = document.createElement("div");
    row.className = "cw-fact";
    const label = document.createElement("span");
    label.textContent = key;
    const val = document.createElement("small");
    val.textContent = value;
    val.title = value;
    row.appendChild(label);
    row.appendChild(val);
    aboutBody.appendChild(row);
  }
}

async function refreshHealth() {
  try {
    const health = await fetch("/api/health").then((r) => r.json());
    setActiveModelFromHealth(health);
    // MIRRORGUARD_20261112：双镜像漂移黄条——app\ 源码与运行镜像脱节时提醒同步
    if (health.mirror && health.mirror.checked && health.mirror.drifted && !window.__mirrorWarnShown) {
      window.__mirrorWarnShown = true;
      addSystemNote(
        "⚠ 双镜像漂移：app\\ 源码与运行镜像 (dist\\resources\\app) 不一致——你运行的可能是旧代码。" +
        "双击 workbench-desktop\\sync-app.cmd 同步后重启工作台。",
        "warn"
      );
    }
    return health;
  } catch {
    return null;
  }
}

function setActiveModelFromHealth(health) {
  if (!health) return;
  if (statusUpstream) statusUpstream.textContent = health.displayModel || displayModel;
  if (modelSelect && health.model && modelSelect.value !== health.model) {
    const has = Array.from(modelSelect.options).some((o) => o.value === health.model);
    if (has) modelSelect.value = health.model;
  }
}

function openAbout() {
  // ABOUTBRIDGE_20261021：HTML 里 #cw-about-bridge 写着「读取中…」但 fillAbout 会整段重建
  // about-body，这个 id 永远不会被单独赋值——先补一次，再走整体重建。
  const bridgeEl = $("#cw-about-bridge");
  if (bridgeEl) {
    bridgeEl.textContent = location.origin;
    bridgeEl.title = location.origin;
  }
  refreshHealth().then(fillAbout);
  if (aboutModal) aboutModal.classList.remove("cw-hidden");
}

function closeAbout() {
  if (aboutModal) aboutModal.classList.add("cw-hidden");
}

/* ---------- 内置浏览器 ---------- */

function browserApi() {
  return (window.claudeDesktop && window.claudeDesktop.browser) || null;
}

/* ISOLATE_20261021：浏览器按会话分桶的归属键。
   主进程的标签页早就有 owner 概念，但前端所有调用都没带 session → 全部落进 owner=null
   的「公共区」，于是每个会话看到的、用的都是同一批标签页。
   这里统一取当前标签的键：已挂内核用 kernelId（与 setSession 一致），未挂内核的空白/历史
   标签退回视图键（k:/s:/new:），保证每个会话框有自己独立的一桶。 */
function browserSessionKey() {
  const v = activeView();
  if (!v) return null;
  return v.kernelId || v.key || null;
}

function browserHostRect() {
  if (!browserHost) return null;
  const r = browserHost.getBoundingClientRect();
  return { x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
}

// 右侧宿主必须真正布局出尺寸（窗口未显示 / 首帧 flex 高度未算出时为 0）。
function browserHostReady() {
  const r = browserHostRect();
  return !!(r && r.width > 2 && r.height > 2);
}
async function waitForBrowserHost(timeout = 3000) {
  if (browserHostReady()) return true;
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    await new Promise((res) =>
      typeof requestAnimationFrame === "function"
        ? requestAnimationFrame(() => res())
        : setTimeout(res, 16));
    if (browserHostReady()) return true;
    await new Promise((res) => setTimeout(res, 40));
  }
  return browserHostReady();
}

// 浏览器面板挂载：先等右侧宿主布局出来、把真实坐标交给主进程，再挂载原生视图，
// 并在窗口显示后做多次兜底定位，避免视图停留在默认尺寸盖住左上角。
async function mountBrowserPanel() {
  const ok = await waitForBrowserHost();
  if (!ok) {
    // 布局始终没出来也先试一次，但主进程会在无有效 bounds 时拒绝挂载（不遮挡）。
    try { await syncBrowserVisibility(true); } catch {}
    return;
  }
  await syncBrowserBounds();          // 先写有效 bounds
  await syncBrowserVisibility(true);  // 再挂载（此时主进程校验通过）
  [120, 400, 900, 1500].forEach((ms) => setTimeout(() => syncBrowserBounds(), ms));
}

async function syncBrowserBounds() {
  const api = browserApi();
  if (!api || currentRightPanel !== "browser") return;
  const rect = browserHostRect();
  if (!rect || rect.width < 2 || rect.height < 2) return;
  try {
    await api.setBounds(rect);
  } catch {}
}

async function syncBrowserVisibility(show) {
  const api = browserApi();
  if (!api) return;
  try {
    if (show) {
      await api.show(browserSessionKey()); // ISOLATE_20261021：只挂载本会话自己的标签
      await syncBrowserBounds();
    } else {
      await api.hide();
    }
  } catch {}
}

let browserPrevVisible = null;

// BROWSERTABS_20261016：Codex 式多标签条渲染（包3：只看当前会话的标签 + 公共区）
function renderBrowserTabs(state) {
  const wrap = document.getElementById("cw-browser-tabs");
  if (!wrap) return;
  const all = (state && state.tabs) || [];
  const mine = all.filter((t) => !t.owner || t.owner === state.frontendSession);
  if (!mine.length) {
    wrap.innerHTML = "";
    wrap.classList.add("cw-hidden");
    return;
  }
  wrap.classList.remove("cw-hidden");
  wrap.innerHTML = "";
  mine.forEach((t) => {
    const el = document.createElement("div");
    el.className = "cw-btab" + (t.id === state.activeId ? " is-active" : "");
    const label = (t.owner ? "" : "[公共] ") + (t.title || t.url || "新标签页");
    el.title = t.owner ? `${label} · 会话 ${t.owner}` : `${label} · 公共区`;
    const sp = document.createElement("span");
    sp.className = "t";
    sp.textContent = (t.loading ? "⏳ " : "") + label;
    el.appendChild(sp);
    const x = document.createElement("button");
    x.className = "x";
    x.textContent = "×";
    x.title = "关闭标签页";
    x.addEventListener("click", (e) => {
      e.stopPropagation();
      const api = browserApi();
      if (api && api.tabClose) api.tabClose(t.id).then(renderBrowserState).catch(() => {});
    });
    el.appendChild(x);
    el.addEventListener("click", () => {
      const api = browserApi();
      if (api && api.tabSwitch) api.tabSwitch(t.id, browserSessionKey()).then(renderBrowserState).catch(() => {});
    });
    wrap.appendChild(el);
  });
  const plus = document.createElement("button");
  plus.className = "cw-btab-new";
  plus.textContent = "+";
  plus.title = "新建标签页";
  plus.addEventListener("click", () => {
    const api = browserApi();
    if (api && api.tabNew) api.tabNew("", browserSessionKey()).then(renderBrowserState).catch(() => {});
  });
  wrap.appendChild(plus);
}

function renderBrowserState(state) {
  if (!state) return;
  renderBrowserTabs(state);
  const empty = $(".cw-browser-empty");
  if (empty) empty.classList.toggle("cw-hidden", Boolean(state.url));
  // Claude 开始驱动浏览器时把右侧切到浏览器面板（既能看到操作，也避免原生视图
  // 盖住其它面板）。只在"隐藏→显示"的瞬间切一次：一轮里连续几十次浏览器调用
  // 期间用户手动点开的产物/状态面板不再被反复抢走。
  if (state.visible && browserPrevVisible === false && currentRightPanel !== "browser") {
    switchRightPanel("browser");
  }
  browserPrevVisible = state.visible;
  if (browserUrlInput && document.activeElement !== browserUrlInput && state.url) {
    browserUrlInput.value = state.url;
  }
  if (browserBackBtn) browserBackBtn.disabled = !state.canGoBack;
  if (browserForwardBtn) browserForwardBtn.disabled = !state.canGoForward;
  if (browserStatusEl) {
    const bits = [];
    if (state.loading) bits.push("加载中…");
    else if (state.url) bits.push("已加载");
    else bits.push("尚未打开页面");
    if (state.title) bits.push(state.title);
    else if (state.url) bits.push(state.url);
    if (state.error) bits.push("错误：" + state.error);
    browserStatusEl.textContent = bits.join(" · ");
  }
}

async function browserOpen(input) {
  const api = browserApi();
  if (!api) {
    toast("内置浏览器只在桌面外壳里可用", "warn");
    return;
  }
  const value = String(input == null ? "" : input).trim();
  if (!value) {
    toast("请输入网址", "warn");
    return;
  }
  try {
    renderBrowserState(await api.navigate(value, browserSessionKey()));
  } catch (err) {
    toast("打开失败：" + (err && err.message ? err.message : err), "err");
  }
}

async function browserSendToClaude() {
  const api = browserApi();
  if (!api) return;
  let snap;
  try {
    snap = await api.snapshot(browserSessionKey());
  } catch {
    toast("读取页面失败", "err");
    return;
  }
  if (!snap || !snap.url) {
    toast("先在内置浏览器打开一个页面", "warn");
    return;
  }
  const lines = ["请看这个网页并回答问题：", "", "URL: " + snap.url, "标题: " + (snap.title || ""), "", "正文节选：", snap.text || "(空)"];
  if (snap.links && snap.links.length) {
    lines.push("", "主要链接：");
    snap.links.slice(0, 25).forEach((l) => lines.push("- " + l.text + " -> " + l.href));
  }
  textarea.value = lines.join("\n");
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
  switchView("chat");
  textarea.focus();
  toast("已把当前页面内容填入输入框");
}

async function browserInit() {
  const api = browserApi();
  if (!api) return;
  try {
    renderBrowserState(await api.state());
  } catch {}
  api.onState((state) => renderBrowserState(state));
  if (browserUrlInput) {
    browserUrlInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        browserOpen(browserUrlInput.value);
      }
    });
  }
  const goBtn = $("#cw-browser-go");
  if (goBtn) goBtn.addEventListener("click", () => browserOpen(browserUrlInput ? browserUrlInput.value : ""));
  if (browserBackBtn) browserBackBtn.addEventListener("click", () => api.back(browserSessionKey()).then(renderBrowserState).catch(() => {}));
  if (browserForwardBtn) browserForwardBtn.addEventListener("click", () => api.forward(browserSessionKey()).then(renderBrowserState).catch(() => {}));
  if (browserReloadBtn) browserReloadBtn.addEventListener("click", () => api.reload(browserSessionKey()).then(renderBrowserState).catch(() => {}));
  const shotBtn = $("#cw-browser-shot");
  if (shotBtn) {
    shotBtn.addEventListener("click", async () => {
      try {
        const info = await api.screenshot(browserSessionKey());
        toast("已截图：" + info.file);
      } catch {
        toast("截图失败", "err");
      }
    });
  }
  const sendBtnBrowser = $("#cw-browser-send");
  if (sendBtnBrowser) sendBtnBrowser.addEventListener("click", browserSendToClaude);
  window.addEventListener("resize", syncBrowserBounds);
  if (browserHost && typeof ResizeObserver === "function") {
    new ResizeObserver(() => syncBrowserBounds()).observe(browserHost);
  }
  if (window.claudeDesktop && window.claudeDesktop.onWindowState) {
    window.claudeDesktop.onWindowState(() => setTimeout(syncBrowserBounds, 120));
  }
}

function init() {
  // MULTIWIN_20261115：窗口身份/注册表 + 新窗口按钮
  mwInit();
  // AUTOUPDATE_20261115：启动静默检查通知（只提示，不自动应用）
  if (window.claudeDesktop && claudeDesktop.onUpdateAvailable) {
    claudeDesktop.onUpdateAvailable((d) => {
      toast(`发现 ${d.count} 个工作台更新（v${d.srcVersion || "?"}），打开设置 → 关于与更新 查看并应用`);
      const sb = $("#cw-settings-btn");
      if (sb) sb.setAttribute("data-update", "1");
    });
  }
  const newWinBtn = document.getElementById("cw-newwin-btn");
  if (newWinBtn) newWinBtn.addEventListener("click", () => {
    const cd = window.claudeDesktop;
    if (cd && cd.winNew) cd.winNew();
  });
  const detachBtn = document.getElementById("cw-detach-btn");
  if (detachBtn) detachBtn.addEventListener("click", () => {
    const v = activeView();
    if (v && v.sessionId) mwOpenInNewWindow(v.sessionId);
    else toast("当前会话还没有内容，发一条消息后再开新窗口", "warn");
  });
  applyDarkModePref();
  // ARTKEEP_20261021：先把上次落盘的产物归属/分轮记录装回来，
  // 刷新或重开壳之后，历史里的「本轮产物」卡片和右栏清单都不至于凭空消失。
  restoreArtifacts();
  if (threadEl) threadEl.innerHTML = "";
  addSystemNote("GLM-5.3 本地工作台已启动：会话与密钥留在本机；工具白名单为只读工具 + 内置浏览器。");

  // 聊天区滚动：用户向上翻动时暂停自动跟随，滚回底部附近自动恢复。
  if (threadEl) {
    threadEl.addEventListener("scroll", () => {
      stickToBottom = nearBottom();
      updateJumpLatest();
    }, { passive: true });
  }
  // “回到最新”悬浮按钮：跟随时隐藏，向上翻动后出现。
  const composerWrap = $(".cw-composer-wrap");
  if (composerWrap) {
    jumpLatestBtn = document.createElement("button");
    jumpLatestBtn.type = "button";
    jumpLatestBtn.className = "cw-jump-latest cw-hidden";
    jumpLatestBtn.innerHTML = `<i data-lucide="arrow-down-to-line" aria-hidden="true"></i><span>回到最新</span>`;
    jumpLatestBtn.addEventListener("click", () => {
      stickToBottom = true;
      scrollToEnd(true);
      if (textarea) textarea.focus();
    });
    composerWrap.appendChild(jumpLatestBtn);
  }

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.multiple = true;
  fileInput.hidden = true;
  document.body.appendChild(fileInput);
  fileInput.addEventListener("change", () => {
    addFiles(fileInput.files);
    fileInput.value = "";
  });

  // 文本文件 input
  const textFileInput = document.createElement("input");
  textFileInput.type = "file";
  textFileInput.accept = ".txt,.json,.md,.py,.js,.mjs,.csv,.html,.htm,.css,.yaml,.yml,.log,.xml,.sh,.ps1,.bat";
  textFileInput.multiple = true;
  textFileInput.hidden = true;
  document.body.appendChild(textFileInput);
  textFileInput.addEventListener("change", () => {
    addFiles(textFileInput.files);
    textFileInput.value = "";
  });

  if (addImageChip) addImageChip.addEventListener("click", () => fileInput.click());

  // +综合添加菜单
  if (addBtn) {
    addBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addMenu.classList.toggle("cw-hidden");
    });
  }
  if (addMenu) {
    addMenu.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-add]");
      if (!btn) return;
      const mode = btn.dataset.add;
      if (mode === "skills") return; // SKILLSMENU：技能项走悬停/独立点击逻辑，不关菜单
      addMenu.classList.add("cw-hidden");
      if (mode === "image") fileInput.click();
      else if (mode === "file") textFileInput.click();
      else if (mode === "mention") {
        const pos = textarea.value.length;
        textarea.value += textarea.value ? " @" : "@";
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
        detectAtTrigger();
      }
    });
  }

  // SKILLSMENU_20261112：+ 菜单里的「技能」子菜单（WorkBuddy 同款：搜索框 + 列表 + 底部操作）
  {
    const skillWrap = document.getElementById("cw-skill-wrap");
    const skillMenu = document.getElementById("cw-skill-menu");
    const skillList = document.getElementById("cw-skill-list");
    const skillSearch = document.getElementById("cw-skill-search");
    let skillsLoaded = false;
    let skillsCache = [];
    let hideTimer = null;
    const renderSkills = (kw) => {
      const list = (kw && kw.trim())
        ? skillsCache.filter((s) => (s.name + " " + (s.description || "")).toLowerCase().includes(kw.trim().toLowerCase()))
        : skillsCache;
      if (!list.length) {
        skillList.innerHTML = `<div class="cw-skill-empty">${kw && kw.trim() ? "没有匹配的技能" : "没有找到技能（skills 目录为空）"}</div>`;
        return;
      }
      skillList.innerHTML = "";
      for (const s of list) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "cw-skill-item";
        b.title = s.description || s.name;
        // SKILLSICON：左侧彩色图标（无图标则用首字母圆块）
        const ic = document.createElement("span");
        ic.className = "cw-skill-icon";
        if (s.icon) {
          const img = document.createElement("img");
          img.src = `/api/skills/icon?dir=${encodeURIComponent(s.dir)}&f=${encodeURIComponent(s.icon)}`;
          img.alt = "";
          ic.appendChild(img);
        } else {
          ic.textContent = (s.name || "?").trim().charAt(0).toUpperCase();
          ic.classList.add("cw-skill-icon-letter");
        }
        const tx = document.createElement("span");
        tx.className = "cw-skill-text";
        const nm = document.createElement("div");
        nm.className = "cw-skill-name";
        nm.textContent = s.name;
        const ds = document.createElement("div");
        ds.className = "cw-skill-desc";
        ds.textContent = s.description || s.path;
        tx.appendChild(nm); tx.appendChild(ds);
        b.appendChild(ic); b.appendChild(tx);
        b.addEventListener("click", () => {
          addMenu.classList.add("cw-hidden");
          skillMenu.classList.add("cw-hidden");
          const line = `请使用技能 ${s.name}（${s.path}）处理下面的任务：`;
          textarea.value = textarea.value ? textarea.value.replace(/\s+$/, "") + "\n\n" + line : line;
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
          textarea.focus();
        });
        skillList.appendChild(b);
      }
    };
    const showSkills = () => {
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
      if (!skillMenu) return;
      skillMenu.classList.remove("cw-hidden");
      if (!skillsLoaded) {
        skillsLoaded = true;
        fetch("/api/skills").then((r) => r.json()).then((d) => {
          if (!d || !d.ok || !Array.isArray(d.skills)) throw new Error("bad payload");
          skillsCache = d.skills;
          renderSkills(skillSearch ? skillSearch.value : "");
          if (window.lucide && typeof window.lucide.createIcons === "function") { try { window.lucide.createIcons(); } catch {} }
        }).catch(() => {
          skillsLoaded = false;
          skillList.innerHTML = '<div class="cw-skill-empty">技能列表加载失败</div>';
        });
      }
    };
    const hideSkills = () => { if (skillMenu) skillMenu.classList.add("cw-hidden"); };
    const scheduleHide = () => { if (hideTimer) clearTimeout(hideTimer); hideTimer = setTimeout(hideSkills, 250); };
    if (skillWrap) {
      skillWrap.addEventListener("mouseenter", showSkills);
      skillWrap.addEventListener("mouseleave", scheduleHide);
    }
    if (skillMenu) {
      skillMenu.addEventListener("mouseenter", () => { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } });
      skillMenu.addEventListener("mouseleave", scheduleHide);
      if (skillSearch) skillSearch.addEventListener("input", () => renderSkills(skillSearch.value));
    }
    // 点「技能」行也展开（触屏/键盘友好）
    const skillsBtn = document.getElementById("cw-skills-btn");
    if (skillsBtn) skillsBtn.addEventListener("click", (e) => { e.stopPropagation(); showSkills(); });
    // 底部操作：从本地添加技能 / 管理技能 → 打开技能文件夹
    const openSkillsFolder = () => {
      fetch("/api/skills/open-folder", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" })
        .then((r) => r.json()).catch(() => {});
      addMenu.classList.add("cw-hidden");
      if (skillMenu) skillMenu.classList.add("cw-hidden");
    };
    const skillAddBtn = document.getElementById("cw-skill-add");
    const skillManageBtn = document.getElementById("cw-skill-manage");
    if (skillAddBtn) skillAddBtn.addEventListener("click", openSkillsFolder);
    if (skillManageBtn) skillManageBtn.addEventListener("click", openSkillsFolder);
    document.addEventListener("click", (e) => {
      if (skillMenu && !skillMenu.classList.contains("cw-hidden") && !e.target.closest(".cw-skill-wrap")) hideSkills();
    });
  }
  document.addEventListener("click", (e) => {
    if (addMenu && !addMenu.classList.contains("cw-hidden") && !e.target.closest(".cw-add-wrap")) {
      addMenu.classList.add("cw-hidden");
    }
  });

  // 历史按钮：切到历史会话视图
  if (historyBtn) {
    historyBtn.addEventListener("click", () => switchView("history"));
  }

  // COMPOSERHEIGHT_20261114：移除常驻「添加图片」chip（与底部「+」按钮功能重复，白占 34px 行高）。
  // 附件 chips 由 JS 动态 append，不受影响；top 行没有子元素时保持 12px（padding）不再撑一行。
  {
    const staleAddChip = document.querySelector("#cw-add-image-chip");
    if (staleAddChip) staleAddChip.remove();
    if (addImageChip) {
      // 保留点击行为代理到文件选择框（万一别处还有引用），但节点已不在 DOM
      addImageChip.addEventListener("click", () => { const fi = $("#cw-file-image"); if (fi) fi.click(); });
    }
  }

  // ENHPROMPT_20261114：提示词增强。点击 → 调 /api/enhance-prompt 改写 → 预览弹层（可编辑）
  // → 采用回填输入框。busy 期间禁用；空输入 toast 提示。
  if (enhanceBtn) {
    enhanceBtn.addEventListener("click", async () => {
      const draft = (textarea.value || "").trim();
      if (!draft) { toast("先在输入框写下想法，再点增强", "warn"); return; }
      if (busy) { toast("生成中，等本轮结束再增强", "warn"); return; }
      enhanceBtn.classList.add("is-loading");
      try {
        const res = await fetch("/api/enhance-prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: draft }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.ok === false) throw new Error(data.error || `HTTP ${res.status}`);
        showEnhancePreview(data.text || "");
      } catch (err) {
        toast(`增强失败：${(err && err.message) || err}`, "err");
      } finally {
        enhanceBtn.classList.remove("is-loading");
      }
    });
  }

  // FAKEFIX_20261018：标题栏窗口按钮此前是纯装饰——main/preload 的 win:* IPC 一直都在，
  // 前端从没绑过（最小化/最大化/关闭点了没反应）；帮助按钮顺势接到「关于」弹窗。
  {
    const titleButtons = $$(".cw-titlebar button");
    for (const b of titleButtons) {
      const label = b.getAttribute("aria-label") || "";
      if (label === "最小化") b.addEventListener("click", () => window.claudeDesktop && window.claudeDesktop.minimize());
      else if (label === "最大化") b.addEventListener("click", () => window.claudeDesktop && window.claudeDesktop.toggleMaximize());
      else if (label === "关闭") b.addEventListener("click", () => window.claudeDesktop && window.claudeDesktop.close());
      else if (label === "帮助") b.addEventListener("click", () => openAbout());
    }
  }

  // POLISH_20261018：窗口最大化状态 → 切换标题栏最大化/还原图标（main.js win:state 广播）
  if (window.claudeDesktop && window.claudeDesktop.onWindowState) {
    const applyMax = (m) => document.body.classList.toggle("is-max", Boolean(m));
    window.claudeDesktop.onWindowState((st) => applyMax(st && st.maximized));
    if (window.claudeDesktop.isMaximized) window.claudeDesktop.isMaximized().then(applyMax).catch(() => {});
  }

  // FAKEFIX_20261018：左栏「当前会话」状态块是 <button> 却没有点击行为——点它 = 回到最新消息。
  {
    const curBtn = $(".cw-thread-list button");
    if (curBtn) {
      curBtn.addEventListener("click", () => {
        if (currentView !== "chat") switchView("chat");
        if (threadEl) threadEl.scrollTop = threadEl.scrollHeight;
      });
    }
  }

  // composer 模型下拉切换（包4：有活跃内核时仅切换当前会话）。
  // H2_20261020：tryKernelSetting 恒返回 true（空白标签暂存 pendingSettings 也算「已按会话处理」），
  // 此处不存在也不允许全局 /api/model 回退——那会扇出重启全部内核（=「一换模型别的窗口跟着换」的服务端面）。
  // 也不再回写 modelSelect/settingsModel：顶栏/设置面板是显式全局入口，其选择由全局操作自己维护。
  if (composerModel) {
    composerModel.addEventListener("change", async () => {
      syncEffortVisibility(); // EFFORTSUPPORT：切模型即时显隐思考强度按钮
      await tryKernelSetting({ model: composerModel.value });
    });
  }

  // 权限下拉
  if (permBtn) {
    permBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (permMenu) permMenu.classList.toggle("cw-hidden");
    });
  }
  if (permMenu) {
    permMenu.addEventListener("click", (e) => {
      const item = e.target.closest("button[data-perm]");
      if (!item) return;
      const preset = item.dataset.perm;
      if (preset === "fullAccess") {
        // 完全权限必须先在风险确认框勾选。
        pendingPermission = "fullAccess";
        if (riskAck) riskAck.checked = false;
        if (riskConfirm) riskConfirm.disabled = true;
        if (riskModal) riskModal.classList.remove("cw-hidden");
        if (permMenu) permMenu.classList.add("cw-hidden");
      } else {
        applyPermission(preset);
      }
    });
  }

  // 思考强度下拉
  if (effortBtn) {
    effortBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (effortMenu) effortMenu.classList.toggle("cw-hidden");
    });
  }
  if (effortMenu) {
    effortMenu.addEventListener("click", (e) => {
      const item = e.target.closest("button[data-effort]");
      if (!item) return;
      applyEffort(item.dataset.effort);
    });
  }

  document.addEventListener("click", (e) => {
    if (permMenu && !permMenu.classList.contains("cw-hidden") && !e.target.closest(".cw-perm-wrap")) {
      permMenu.classList.add("cw-hidden");
    }
    if (effortMenu && !effortMenu.classList.contains("cw-hidden") && !e.target.closest(".cw-effort-wrap")) {
      effortMenu.classList.add("cw-hidden");
    }
  });
  const closeRisk = () => {
    if (riskModal) riskModal.classList.add("cw-hidden");
    pendingPermission = null;
  };
  if (riskClose) riskClose.addEventListener("click", closeRisk);
  if (riskCancel) riskCancel.addEventListener("click", closeRisk);
  if (riskAck) riskAck.addEventListener("change", () => {
    if (riskConfirm) riskConfirm.disabled = !riskAck.checked;
  });
  if (riskConfirm) riskConfirm.addEventListener("click", () => {
    if (riskAck && riskAck.checked && pendingPermission === "fullAccess") {
      applyPermission("fullAccess");
      closeRisk();
    }
  });

  if (sendBtn) sendBtn.addEventListener("click", send);
  if (textarea) {
    textarea.addEventListener("input", () => {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      detectAtTrigger();
    });
    textarea.addEventListener("input", saveDraft);
    textarea.addEventListener("keydown", (e) => {
      // ↑ 空输入时回填上一条已发送内容，可直接编辑重发
      if (e.key === "ArrowUp" && !textarea.value && !atState && lastSentText) {
        e.preventDefault();
        textarea.value = lastSentText;
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        return;
      }
      // @文件弹层打开时拦截导航键
      if (atState) {
        if (e.key === "ArrowDown") { e.preventDefault(); atMove(1); return; }
        if (e.key === "ArrowUp") { e.preventDefault(); atMove(-1); return; }
        if (e.key === "Enter" || e.key === "Tab") { e.preventDefault(); commitAtSelection(); return; }
        if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeAtMention(); return; }
      }
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        send();
      }
    });
    textarea.addEventListener("paste", (e) => {
      const items = Array.from(e.clipboardData?.items || []);
      const files = items.filter((i) => i.kind === "file").map((i) => i.getAsFile()).filter(Boolean);
      if (files.length) {
        e.preventDefault();
        addFiles(files);
      }
    });
  }
  document.addEventListener("paste", (e) => {
    if (document.activeElement === textarea) return;
    const files = Array.from(e.clipboardData?.files || []);
    if (files.length) addFiles(files);
  });
  // DROPFILES_20261117：拖拽文件/图片进输入区直接附加（复用 addFiles），补「只能粘贴/按钮」的便捷缺口。
  for (const zone of [textarea, textarea.parentElement]) {
    if (!zone) continue;
    ["dragover", "dragenter"].forEach((ty) => zone.addEventListener(ty, (e) => {
      if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes("Files")) { e.preventDefault(); e.stopPropagation(); e.dataTransfer.dropEffect = "copy"; }
    }));
    zone.addEventListener("drop", (e) => {
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length) { e.preventDefault(); e.stopPropagation(); addFiles(files); }
    });
  }

  if (newChatBtn) {
    newChatBtn.addEventListener("click", async () => {
      // 内核池模式：新建只开一个空白标签，不打断任何正在生成的会话。
      await openNewTab();
      toast("已新建会话标签");
    });
  }

  if (queueClearBtn) queueClearBtn.addEventListener("click", clearQueuedMessages);

  $$(".cw-nav button").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view || "chat"));
  });

  if (stopBtn) stopBtn.addEventListener("click", stopGeneration);
  // ESCSTOP_20261117：Esc 快捷停止生成（不在输入框/可编辑区时），与停止按钮同路；弹层自带 Esc 优先（defaultPrevented 跳过）。
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || e.defaultPrevented) return;
    if (!(busy || autoContinuePending)) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    stopGeneration();
  });
  // SHORTCUTS_20261117：快捷键/隐藏功能提示面板（Ctrl+/ 或点输入框旁提示），治「功能藏着不知道」；消息操作提对比度。
  (function initShortcutsHelp() {
    const st = document.createElement("style");
    st.textContent = "#cw-shortcuts-ov{position:fixed;inset:0;background:rgb(10 12 16/.45);display:flex;align-items:center;justify-content:center;z-index:999}#cw-shortcuts-ov.cw-hidden{display:none}.cw-sc-panel{width:min(560px,92vw);max-height:80vh;overflow:auto;background:#fff;color:#111;border-radius:14px;padding:18px 20px;box-shadow:0 18px 44px rgb(0 0 0/.25)}.cw-dark .cw-sc-panel,body.wb-dark .cw-sc-panel{background:#161b26;color:#e5e7eb}.cw-sc-panel h3{margin:0 0 10px;font-size:15px}.cw-sc-grid{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;font-size:13px;align-items:center}.cw-sc-grid kbd{background:rgb(127 127 127/.15);border:1px solid rgb(127 127 127/.3);border-radius:5px;padding:1px 6px;font-family:ui-monospace,monospace;font-size:12px;white-space:nowrap}.cw-sc-sec{margin:12px 0 4px;font-size:12px;font-weight:600;opacity:.7}.cw-sc-close{margin-top:14px;width:100%;padding:7px;border:0;border-radius:8px;background:rgb(127 127 127/.15);cursor:pointer}.cw-sc-hint{font-size:11px;opacity:.65;margin-left:8px;white-space:nowrap;cursor:pointer}#claude-workbench-mock .cw-msg-actions .cw-msg-action{color:#5b6472}#claude-workbench-mock.cw-dark .cw-msg-actions .cw-msg-action{color:#9aa4b8}";
    document.head.appendChild(st);
    const ov = document.createElement("div");
    ov.id = "cw-shortcuts-ov"; ov.className = "cw-hidden";
    ov.innerHTML = '<div class="cw-sc-panel"><h3>快捷键与隐藏功能</h3>' +
      '<div class="cw-sc-grid"><kbd>Ctrl+K</kbd><span>命令面板（搜会话/功能）</span><kbd>Ctrl+F</kbd><span>会话内搜索</span><kbd>Ctrl+Enter</kbd><span>发送消息</span><kbd>Esc</kbd><span>停止生成 / 关闭弹层</span><kbd>Ctrl+/</kbd><span>打开本帮助</span><kbd>@</kbd><span>提及文件（输入框内）</span></div>' +
      '<div class="cw-sc-sec">消息上的操作</div><div class="cw-sc-grid"><kbd>复制</kbd><span>复制整条回复</span><kbd>分支</kbd><span>从该处分叉新会话</span><kbd>重答</kbd><span>重新生成该轮</span></div>' +
      '<div class="cw-sc-sec">侧栏/头部</div><div class="cw-sc-grid"><kbd>AI起名</kbd><span>自动会话标题</span><kbd>管理</kbd><span>批量移动/归档/删除</span><kbd>大纲</kbd><span>会话大纲</span><kbd>分享</kbd><span>导出会话</span></div>' +
      '<button class="cw-sc-close" type="button">知道了（Esc）</button></div>';
    document.body.appendChild(ov);
    const open = () => ov.classList.remove("cw-hidden");
    const close = () => ov.classList.add("cw-hidden");
    ov.addEventListener("click", (e) => { if (e.target === ov || e.target.closest(".cw-sc-close")) close(); });
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") { e.preventDefault(); if (ov.classList.contains("cw-hidden")) open(); else close(); return; }
      if (e.key === "Escape" && !ov.classList.contains("cw-hidden")) { e.preventDefault(); e.stopPropagation(); close(); }
    }, true);
    const ta = document.querySelector(".cw-input textarea") || document.querySelector("textarea");
    if (ta && ta.parentElement) {
      const hint = document.createElement("span");
      hint.className = "cw-sc-hint";
      hint.textContent = "Ctrl+K 命令 · Ctrl+/ 快捷键";
      hint.addEventListener("click", open);
      ta.parentElement.appendChild(hint);
    }
  })();
  if (restartBtn) restartBtn.addEventListener("click", () => restartBridge(false));

  if (modelSelect) {
    modelSelect.addEventListener("change", async () => {
      const next = modelSelect.value;
      // FETCHGUARD_20261021：桥不在时 fetch 直接 reject，以前是未捕获的 Promise 拒绝，
      // 下拉框还停在用户选的新值上，看起来像"换成功了"。
      try {
        const res = await fetch("/api/model", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: next }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.ok === false) {
          toast(data.error || "模型切换失败", "err");
          refreshHealth().then(setActiveModelFromHealth).catch(() => {});
          return;
        }
        toast(data.unchanged ? "已在使用该模型别名" : "已切换模型别名，正在重启本机进程");
        setStatus("正在切换模型…", "warn");
      } catch (err) {
        toast(`模型切换失败：${(err && err.message) || err}`, "err");
        refreshHealth().then(setActiveModelFromHealth).catch(() => {});
      }
    });
  }

  // 预览操作：打开 / 定位文件夹 / 下载
  if (previewOpen) {
    previewOpen.addEventListener("click", () => {
      if (activePreview) fetch("/api/reveal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: activePreview.path, mode: "open" }) });
    });
  }
  if (previewReveal) {
    previewReveal.addEventListener("click", () => {
      if (activePreview) fetch("/api/reveal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: activePreview.path }) });
    });
  }
  if (previewDownload) {
    previewDownload.addEventListener("click", () => {
      if (activePreview) {
        const a = document.createElement("a");
        a.href = `/api/serve-file?path=${encodeURIComponent(activePreview.path)}`;
        a.download = activePreview.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    });
  }
  // H1-2：预览页脚「浏览器打开」——走内置浏览器面板 tab 通道
  if (previewBrowser) {
    previewBrowser.addEventListener("click", () => {
      if (activePreview) openArtifactInBrowser(activePreview);
    });
  }

  // 头部快捷
  if (headSearch) headSearch.addEventListener("click", (e) => { e.stopPropagation(); openSearchPanel(headSearch); });
  if (headNew) headNew.addEventListener("click", () => { if (newChatBtn) newChatBtn.click(); });
  if (headHistory) headHistory.addEventListener("click", () => switchView("history"));
  if (headDocs) headDocs.addEventListener("click", openAbout);

  // 铃铛：展开通知面板
  if (bell) {
    bell.addEventListener("click", (e) => {
      e.stopPropagation();
      let panel = $("#cw-notif-panel");
      if (panel) { panel.remove(); return; }
      panel = document.createElement("div");
      panel.id = "cw-notif-panel";
      panel.className = "cw-notif-panel";
      if (!notifications.length) {
        panel.innerHTML = `<div class="cw-notif-empty">暂无通知</div>`;
      } else {
        notifications.slice().reverse().forEach((n) => {
          const row = document.createElement("div");
          row.className = "cw-notif-row";
          row.innerHTML = `<strong></strong><span></span>`;
          $("strong", row).textContent = n.title;
          $("span", row).textContent = n.body;
          panel.appendChild(row);
        });
      }
      document.body.appendChild(panel);
      if (bellDot) bellDot.classList.add("cw-hidden");
      // 定位到铃铛附近
      const r = bell.getBoundingClientRect();
      panel.style.top = r.bottom + 6 + "px";
      panel.style.right = Math.max(8, window.innerWidth - r.right) + "px";
    });
  }
  document.addEventListener("click", (e) => {
    const panel = $("#cw-notif-panel");
    if (panel && !e.target.closest("#cw-notif-panel") && !e.target.closest("#cw-bell")) panel.remove();
  });

  // 设置弹窗
  if (settingsBtn) {
    settingsBtn.addEventListener("click", async () => {
      settingsModal.classList.remove("cw-hidden");
      settingsBtn.removeAttribute("data-update"); // AUTOUPDATE：打开设置即清除更新徽标
      renderUpdateSection();
      try {
        const d = await fetch("/api/settings").then((r) => r.json());
        if (d.ok) {
          settingsCwd.value = d.cwd || "";
          settingsBaseUrl.value = d.baseUrl || "";
          if (settingsModel && d.model) {
            const has = Array.from(settingsModel.options).some((o) => o.value === d.model);
            if (has) settingsModel.value = d.model;
          }
          if (settingsBrowserMcp && typeof d.browserMcpEnabled === "boolean") {
            currentBrowserMcp = d.browserMcpEnabled;
            settingsBrowserMcp.checked = d.browserMcpEnabled;
          }
          // CHROMEMCP_20261115：回显浏览器模式
          fetch("/api/browser-mode").then((r) => r.json()).then((bm) => {
            if (bm && bm.ok) {
              currentBrowserMode = bm.mode;
              if (settingsBrowserMode) settingsBrowserMode.value = bm.mode;
            }
          }).catch(() => {});
          // COMPUTERUSE_20261115：回显电脑操作开关
          fetch("/api/computer-use").then((r) => r.json()).then((cu) => {
            if (cu && cu.ok) {
              currentComputerUse = Boolean(cu.enabled);
              currentComputerDryRun = Boolean(cu.dryRun);
              if (settingsComputerUse) settingsComputerUse.checked = currentComputerUse;
              if (settingsComputerDryRun) settingsComputerDryRun.checked = currentComputerDryRun;
            }
          }).catch(() => {});
          // TOOLSCOPE_20261021：只读展示。空数组表示未裁剪（环境变量接管白名单或显式关闭）；
          // 字段缺失 = 后端还是旧版本（只刷新页面没重启壳），显示 — 而不是谎称「未裁剪」。
          if (settingsToolScope) {
            if (!Array.isArray(d.toolScope)) {
              settingsToolScope.textContent = "—（需重启本机进程后生效）";
            } else {
              settingsToolScope.textContent = d.toolScope.length
                ? `${d.toolScope.length} 个：${d.toolScope.join("、")}`
                : "未裁剪（WORKBENCH_ALLOWED_TOOLS 接管或 WORKBENCH_TOOL_SCOPE=off）";
            }
          }
          if (d.turnBudget && typeof d.turnBudget === "object") {
            currentTurnBudget = { ...currentTurnBudget, ...d.turnBudget };
            if (settingsBudgetMinutes) settingsBudgetMinutes.value = String(Math.round(currentTurnBudget.maxDurationMs / 60000));
            if (settingsBudgetSteps) settingsBudgetSteps.value = String(currentTurnBudget.maxSteps);
            if (settingsBudgetOutput) settingsBudgetOutput.value = String(currentTurnBudget.maxOutputTokens);
          }
          if (d.autoCompact) {
            currentAutoCompact = String(d.autoCompact);
            setAutoCompactStatus(currentAutoCompact);
            if (settingsAutoCompact) settingsAutoCompact.value = currentAutoCompact;
          }
        }
      } catch {}
    });
  }
  // 提示音开关：勾选即生效（纯前端 localStorage，不走「保存并重启」）
  if (settingsSound) {
    settingsSound.checked = soundEnabled();
    settingsSound.addEventListener("change", () => {
      setSoundEnabled(settingsSound.checked);
      if (settingsSound.checked) playTurnSound("up", 99999); // 开启时试听一声
    });
  }
  const closeSettings = () => settingsModal.classList.add("cw-hidden");
  if (settingsClose) settingsClose.addEventListener("click", closeSettings);
  if (settingsCancel) settingsCancel.addEventListener("click", closeSettings);
  settingsModal.addEventListener("click", (e) => { if (e.target === settingsModal) closeSettings(); });

  // AUTOUPDATE_20261115：关于与更新（检查/两步应用/回滚；永不自动应用）
  const updVersion = $("#cw-update-version");
  const updCli = $("#cw-update-cli");
  const updCheckBtn = $("#cw-update-check");
  const updApplyBtn = $("#cw-update-apply");
  const updRollbackBtn = $("#cw-update-rollback");
  const updStatus = $("#cw-update-status");
  let updApplyArmed = false;
  let updRollbackArmed = false;
  let updArmTimer = null;
  function updDisarm() {
    updApplyArmed = false;
    updRollbackArmed = false;
    if (updArmTimer) { clearTimeout(updArmTimer); updArmTimer = null; }
    if (updApplyBtn && !updApplyBtn.classList.contains("cw-hidden")) updApplyBtn.textContent = "应用更新";
    if (updRollbackBtn) updRollbackBtn.textContent = "回滚上一版";
  }
  async function renderUpdateSection() {
    if (!window.claudeDesktop || !claudeDesktop.updateInfo || !updVersion) return;
    try {
      const info = await claudeDesktop.updateInfo();
      const built = info.builtAt ? new Date(info.builtAt).toLocaleString("zh-CN", { hour12: false }) : "未记录";
      updVersion.textContent = `工作台 v${info.version || "?"} · ${info.gitHead || "无 git 信息"} · 部署于 ${built}${info.srcAvailable ? "" : " · 无源码目录（更新不可用）"}`;
      if (updCli) updCli.textContent = `Claude Code CLI ${info.cliVersion || "未知"}`;
      if (updRollbackBtn) updRollbackBtn.classList.toggle("cw-hidden", !info.hasBackup);
      if (claudeDesktop.updateCliCheck) {
        claudeDesktop.updateCliCheck().then((r) => {
          if (!updCli) return;
          if (r && r.ok) updCli.textContent = `Claude Code CLI ${r.current || "?"} → 最新 ${r.latest}${r.updateAvailable ? "（有新版，可自行 npm 更新）" : "（已是最新）"}`;
          else updCli.textContent = `Claude Code CLI ${(r && r.current) || info.cliVersion || "未知"}（在线检查失败：${(r && r.error) || "网络"}）`;
        }).catch(() => {});
      }
    } catch (err) {
      updVersion.textContent = "版本信息读取失败：" + String((err && err.message) || err);
    }
  }
  async function updDoCheck() {
    if (!updStatus || !window.claudeDesktop || !claudeDesktop.updateCheck) return;
    updDisarm();
    updStatus.textContent = "检查中…";
    if (updApplyBtn) updApplyBtn.classList.add("cw-hidden");
    try {
      const r = await claudeDesktop.updateCheck();
      if (!r || !r.ok) { updStatus.textContent = "检查不可用：" + ((r && (r.detail || r.code)) || "未知"); return; }
      if (r.conflicts && r.conflicts.length) {
        updStatus.textContent = `⚠ 运行目录有 ${r.conflicts.length} 个文件被更新流程之外修改（${r.conflicts.join("、")}），应用已保护性中止。请先对齐（joint commit 或手工同步清单）。`;
        return;
      }
      if (!r.updates || !r.updates.length) {
        updStatus.textContent = `已是最新（源码 v${r.srcVersion || "?"}，无文件差异）${r.missing && r.missing.length ? `；源码已删 ${r.missing.length} 个文件（仅报告，不自动删）` : ""}`;
        return;
      }
      updStatus.textContent = `发现 ${r.updates.length} 个文件更新（源码 v${r.srcVersion || "?"}）：${r.updates.map((u) => u.rel).join("、")}${r.missing && r.missing.length ? `；另有 ${r.missing.length} 个源码已删文件仅报告` : ""}`;
      if (updApplyBtn) { updApplyBtn.classList.remove("cw-hidden"); updApplyBtn.textContent = `应用 ${r.updates.length} 个文件更新`; }
    } catch (err) {
      updStatus.textContent = "检查失败：" + String((err && err.message) || err);
    }
  }
  if (updCheckBtn) updCheckBtn.addEventListener("click", updDoCheck);
  // CLIUPDATE_20261117（P7-⑥）：CLI 一键自动安装/回滚（二次确认+进度+成功露回滚）。
  const cliInstallBtn = $("#cw-cli-install");
  const cliRollbackBtn = $("#cw-cli-rollback");
  const cliStatus = $("#cw-cli-status");
  let cliArm = false, cliArmTimer = null;
  const cliDisarm = () => { cliArm = false; if (cliInstallBtn) cliInstallBtn.textContent = "CLI 自动安装"; };
  if (cliInstallBtn) cliInstallBtn.addEventListener("click", async () => {
    if (!window.claudeDesktop || !claudeDesktop.updateCliInstall) { if (cliStatus) cliStatus.textContent = "当前版本不支持"; return; }
    if (!cliArm) { cliArm = true; cliInstallBtn.textContent = "确认安装？"; cliArmTimer = setTimeout(cliDisarm, 6000); return; }
    clearTimeout(cliArmTimer); cliDisarm();
    cliInstallBtn.disabled = true;
    if (cliStatus) cliStatus.textContent = "安装中（下载→物化→备份→换目录→校验）…";
    try {
      const r = await claudeDesktop.updateCliInstall();
      if (r && r.ok) {
        if (r.noop) { if (cliStatus) cliStatus.textContent = `已是最新（${r.to}）`; }
        else { if (cliStatus) cliStatus.textContent = `已安装 ${r.from} → ${r.to}。新会话即用新版；如异常可 CLI 回滚。`; if (cliRollbackBtn) cliRollbackBtn.classList.remove("cw-hidden"); toast(`CLI 已更新 ${r.from}→${r.to}`); }
      } else { if (cliStatus) cliStatus.textContent = "安装失败：" + ((r && (r.detail || r.error)) || "未知"); }
    } catch (e) { if (cliStatus) cliStatus.textContent = "安装失败：" + String(e.message || e); }
    finally { cliInstallBtn.disabled = false; renderUpdateSection(); }
  });
  if (cliRollbackBtn) cliRollbackBtn.addEventListener("click", async () => {
    cliRollbackBtn.disabled = true;
    if (cliStatus) cliStatus.textContent = "回滚中…";
    try { const r = await claudeDesktop.updateCliRollback(); if (cliStatus) cliStatus.textContent = r && r.ok ? `已回滚 ${r.from}→${r.to}` : "回滚失败：" + ((r && r.error) || "未知"); }
    catch (e) { if (cliStatus) cliStatus.textContent = "回滚失败：" + String(e.message || e); }
    finally { cliRollbackBtn.disabled = false; renderUpdateSection(); }
  });
  if (updApplyBtn) updApplyBtn.addEventListener("click", async () => {
    if (!updApplyArmed) {
      updApplyArmed = true;
      updApplyBtn.textContent = "确认重启并应用？";
      updArmTimer = setTimeout(updDisarm, 6000);
      return;
    }
    updDisarm();
    updApplyBtn.disabled = true;
    if (updStatus) updStatus.textContent = "应用中（备份→复制→核验）…";
    try {
      const r = await claudeDesktop.updateApply();
      if (!r || !r.ok) {
        const msg = r && r.code === "busy" ? `已中止：${r.detail}`
          : r && r.code === "conflict" ? `已中止（冲突保护）：${(r.files || []).join("、")}`
          : `应用失败：${(r && (r.error || r.code)) || "未知"}`;
        if (updStatus) updStatus.textContent = msg;
        toast(msg);
      } else if (r.noop) {
        if (updStatus) updStatus.textContent = "无差异，无需应用";
      } else {
        if (updStatus) updStatus.textContent = `已应用 ${(r.applied || []).length} 个文件，正在重启…`;
        toast("更新已应用，工作台正在重启");
      }
    } catch (err) {
      if (updStatus) updStatus.textContent = "应用失败：" + String((err && err.message) || err);
    } finally {
      updApplyBtn.disabled = false;
    }
  });
  if (updRollbackBtn) updRollbackBtn.addEventListener("click", async () => {
    if (!updRollbackArmed) {
      updRollbackArmed = true;
      updRollbackBtn.textContent = "确认回滚并重启？";
      updArmTimer = setTimeout(updDisarm, 6000);
      return;
    }
    updDisarm();
    updRollbackBtn.disabled = true;
    if (updStatus) updStatus.textContent = "回滚中…";
    try {
      const r = await claudeDesktop.updateRollback();
      if (!r || !r.ok) {
        const msg = r && r.code === "busy" ? `已中止：${r.detail}` : `回滚失败：${(r && (r.error || r.code)) || "未知"}`;
        if (updStatus) updStatus.textContent = msg;
        toast(msg);
      } else {
        if (updStatus) updStatus.textContent = `已回滚 ${(r.restored || []).length} 个文件，正在重启…`;
        toast("已回滚到上一版，工作台正在重启");
      }
    } catch (err) {
      if (updStatus) updStatus.textContent = "回滚失败：" + String((err && err.message) || err);
    } finally {
      updRollbackBtn.disabled = false;
    }
  });

  if (settingsSave) {
    settingsSave.addEventListener("click", async () => {
      // SETTINGSROBUST_20261021：保存链路有三段网络请求，任何一段抛错（断网/服务重启中）
      // 以前都会把按钮永久置灰且不给提示。改成 try/catch/finally 兜底。
      settingsSave.disabled = true;
      try {
        // 内置浏览器开关有变化时先切换（服务端会重启内核）。
        if (settingsBrowserMcp && settingsBrowserMcp.checked !== currentBrowserMcp) {
          const br = await fetch("/api/browser-mcp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ enabled: settingsBrowserMcp.checked }),
          });
          const bd = await br.json().catch(() => ({}));
          if (!br.ok || bd.ok === false) {
            toast(bd.error || "浏览器工具切换失败", "err");
            return;
          }
          currentBrowserMcp = settingsBrowserMcp.checked;
        }
        // CHROMEMCP_20261115：浏览器模式切换（新建会话生效）
        if (settingsBrowserMode && settingsBrowserMode.value !== currentBrowserMode) {
          const mr = await fetch("/api/browser-mode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: settingsBrowserMode.value }),
          });
          const md = await mr.json().catch(() => ({}));
          if (!mr.ok || md.ok === false) {
            toast(md.error || "浏览器模式切换失败", "err");
            return;
          }
          currentBrowserMode = settingsBrowserMode.value;
          toast(md.note || "浏览器模式已切换", "ok");
        }
        // COMPUTERUSE_20261115：电脑操作开关（即时生效，不重启内核）
        if (settingsComputerUse && (settingsComputerUse.checked !== currentComputerUse || (settingsComputerDryRun && settingsComputerDryRun.checked !== currentComputerDryRun))) {
          const cr = await fetch("/api/computer-use", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ enabled: settingsComputerUse.checked, dryRun: settingsComputerDryRun ? settingsComputerDryRun.checked : currentComputerDryRun }),
          });
          const cd = await cr.json().catch(() => ({}));
          if (!cr.ok || cd.ok === false) {
            toast(cd.error || "电脑操作开关切换失败", "err");
            return;
          }
          currentComputerUse = settingsComputerUse.checked;
          currentComputerDryRun = settingsComputerDryRun ? settingsComputerDryRun.checked : currentComputerDryRun;
          toast(currentComputerUse ? (currentComputerDryRun ? "电脑操作已开启（演练模式）" : "电脑操作已开启：每个动作都会弹窗审批") : "电脑操作已关闭", "ok");
        }
        // 先切模型
        if (settingsModel && settingsModel.value) {
          await fetch("/api/model", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: settingsModel.value }) });
        }
        const res = await fetch("/api/settings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cwd: settingsCwd.value.trim(),
            baseUrl: settingsBaseUrl.value.trim(),
            autoCompact: settingsAutoCompact && settingsAutoCompact.value.trim() ? settingsAutoCompact.value.trim() : currentAutoCompact,
            turnBudget: {
              maxDurationMinutes: Number(settingsBudgetMinutes && settingsBudgetMinutes.value),
              maxSteps: Number(settingsBudgetSteps && settingsBudgetSteps.value),
              maxOutputTokens: Number(settingsBudgetOutput && settingsBudgetOutput.value),
            },
          }),
        });
        const d = await res.json().catch(() => ({}));
        if (!res.ok || d.ok === false) {
          toast(d.error || "保存失败", "err");
          return;
        }
        if (settingsAutoCompact && settingsAutoCompact.value.trim()) {
          currentAutoCompact = settingsAutoCompact.value.trim();
          setAutoCompactStatus(currentAutoCompact);
        }
        currentTurnBudget = {
          maxDurationMs: Number(settingsBudgetMinutes && settingsBudgetMinutes.value) * 60000,
          maxSteps: Number(settingsBudgetSteps && settingsBudgetSteps.value),
          maxOutputTokens: Number(settingsBudgetOutput && settingsBudgetOutput.value),
        };
        closeSettings();
        // GLOBALSET_20261021：有会话在生成时保存不再被 409 顶回来，而是等该轮结束再重启生效。
        toast(d.deferred > 0 ? `已保存，${d.deferred} 个会话本轮结束后生效` : "已保存，正在重启本机进程…", "ok");
        setTimeout(() => location.reload(), 1500);
      } catch (err) {
        toast(`保存失败：${(err && err.message) || err}`, "err");
      } finally {
        settingsSave.disabled = false;
      }
    });
  }

  // 前台 / 隐藏状态（决定是否弹完成通知）
  document.addEventListener("visibilitychange", () => {
    documentHidden = document.hidden;
    if (!document.hidden && bellDot) bellDot.classList.add("cw-hidden");
  });
  if ("Notification" in window && Notification.permission === "default") {
    try { Notification.requestPermission(); } catch {}
  }

  if (helpBtn) helpBtn.addEventListener("click", openAbout);
  if (aboutModal) {
    aboutModal.addEventListener("click", (e) => {
      if (e.target === aboutModal) closeAbout();
    });
  }
  const aboutCloseBtn = $("#cw-about-close");
  if (aboutCloseBtn) aboutCloseBtn.addEventListener("click", closeAbout);
  // ESCGUARD_20261021：Esc 的优先级从"最上层"往下走，关闭任何浮层都不再顺带停止生成。
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    // 1) 权限弹窗：Esc = 拒绝本次请求
    const permissionModalEl = document.getElementById("cw-permission-modal");
    if (permissionModalEl && !permissionModalEl.classList.contains("cw-hidden")) { respondPermission("deny"); return; }
    // 2) 图片灯箱 / @ 提及 / 设置 / 风险 / 关于：只关浮层
    if (document.getElementById("cw-lightbox")) { closeLightbox(); return; }
    // LIGHTBOXESC_20261021：附件大图预览也是浮层——它自己的 Esc 监听注册得更晚，
    // 以前这一条没拦住，Esc 关图的同时还把正在跑的一轮给停了。
    const imgLb = document.getElementById("cw-img-lightbox");
    if (imgLb && !imgLb.classList.contains("cw-hidden")) {
      imgLb.classList.add("cw-hidden");
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (atState) { closeAtMention(); return; }
    if (settingsModal && !settingsModal.classList.contains("cw-hidden")) { closeSettings(); return; }
    if (riskModal && !riskModal.classList.contains("cw-hidden")) { closeRisk(); return; }
    if (aboutModal && !aboutModal.classList.contains("cw-hidden")) { closeAbout(); return; }
    // 3) 没有浮层时才作用于生成
    if (busy || autoContinuePending) stopGeneration();
  });
  document.addEventListener("keydown", (e) => {
    // DSH 对齐：Ctrl+Alt+B = 左侧栏开关（DSH 语义）；右侧面板让位到 Ctrl+Alt+R
    if (e.ctrlKey && e.altKey && !e.shiftKey && e.key.toLowerCase() === "b") {
      e.preventDefault();
      const tl = document.getElementById("cw-toggle-left");
      if (tl) tl.click();
      return;
    }
    if (e.ctrlKey && e.altKey && !e.shiftKey && e.key.toLowerCase() === "r") {
      e.preventDefault();
      const tr = document.getElementById("cw-toggle-right");
      if (tr) tr.click();
      return;
    }
    // FINDINSESSION_20261111：Ctrl+F 会话内搜索（本机 Ctrl+F 不被浏览器接管——壳是独立窗口）。
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "f") {
      e.preventDefault();
      openFindBar();
      return;
    }
    if (e.ctrlKey && e.altKey && !e.shiftKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      const lay = document.getElementById("cw-toggle-layout");
      if (lay) lay.click();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      if (newChatBtn) newChatBtn.click();
    }
  });
  if (riskModal) {
    riskModal.addEventListener("click", (e) => {
      if (e.target === riskModal) closeRisk();
    });
  }
  const shareBtn = document.getElementById("cw-head-share");
  if (shareBtn) shareBtn.addEventListener("click", exportCurrentSession);
  const outlineBtn = document.getElementById("cw-head-outline");
  if (outlineBtn) outlineBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleOutline(outlineBtn); });
  if (threadEl) {
    threadEl.addEventListener("click", async (e) => {
      const copyBtn = e.target.closest(".cw-codeblock-copy");
      if (copyBtn) {
        const ok = await copyText(decodeURIComponent(copyBtn.dataset.code || ""));
        if (ok) {
          copyBtn.textContent = "已复制";
          setTimeout(() => (copyBtn.textContent = "复制代码"), 1200);
        } else toast("复制失败", "err");
        return;
      }
      const img = e.target.closest("img");
      if (img && img.src && !img.closest(".cw-lightbox")) openLightbox(img.src);
    });
  }

  setModel(displayModel);
  setStatus("正在连接本地服务…", "warn");
  loadRuntime();
  loadModels();
  // H2：校准全局默认权限档（空白标签回显基准）。
  fetch("/api/settings").then((r) => r.json()).then((st) => {
    if (st && st.ok && st.permissionPreset && PERMISSION_LABELS[st.permissionPreset]) permDefaultGlobal = st.permissionPreset;
  }).catch(() => {});
  loadTaskList();
  wireHistoryTools(); // HISTSEARCH_20261021：历史页搜索/分页一次性绑定
  initDragToProject(); // drag-to-project：一次性委托绑定（在 init() 里只装一次）
  const manageBtn = $("#cw-manage-btn");
  if (manageBtn) manageBtn.addEventListener("click", () => setBatchMode(!batchMode));
  if ($("#cw-batch-bar")) {
    $("#cw-batch-cancel").addEventListener("click", () => setBatchMode(false));
    $("#cw-batch-archive").addEventListener("click", batchArchive);
    $("#cw-batch-delete").addEventListener("click", batchDelete);
    $("#cw-batch-move").addEventListener("click", batchMove);
  }

  $$(".cw-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const panel = tab.dataset.panel;
      if (!panel) return;
      applyRightPanel(panel);
    });
  });
  browserInit();
  wireShellLayout();
  applyRightPanel("browser");
  refreshIcons();
  setPermissionUI("fullAccess"); // 默认完全权限；/api/settings 拉回的仍是 fullAccess 则无感
  setEffortUI("auto"); // AUTOEFFORT：默认自动档（按任务难度定档）
  refreshUsage();
  initContextMeterInteractions(); // CONTEXTMETER：点击开合 + 点外部/Esc 收起
  refreshContextMeter();
  // 每 5 秒刷新一次用量与底部计量条；切到状态面板时也会立即刷新。
  // POLLHIDE_20261021：窗口最小化/被遮住时停掉这两个心跳（没人看，纯耗电），
  // 切回前台立刻补一次，不会看到旧数据。
  // POLLHINT_20261112：usage 与 contextMeter 两个 5s 轮询合并为一个（各自 catch 自守，互不影响）。
  setInterval(() => {
    if (document.visibilityState !== "visible") return;
    refreshUsage();
    refreshContextMeter(); // CONTEXTMETER：轮末事件之外的兜底刷新
    refreshJobs(); // JOBS：后台任务徽章刷新
  }, 5000);
  // SIDEBARLIVE_20261017：会话列表自愈——不再只依赖轮次结束的 result 帧才刷新。
  // 30s 静默刷（内容签名没变时不重绘）+ 窗口聚焦/切回立刷，长任务期间新建/恢复的会话也能实时出现。
  setInterval(() => { if (document.visibilityState === "visible") loadTaskList(); }, 30000);
  window.addEventListener("focus", () => loadTaskList());
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") loadTaskList(); });
  fetch("/api/settings").then((r) => r.json()).then((d) => {
    if (d && d.ok && d.permissionPreset) setPermissionUI(d.permissionPreset);
    // 全局 effort 只是 Auto 档的兜底参考，不再覆盖 UI（各会话默认 Auto，判定档位随帧回传）
    if (d && d.ok && typeof d.browserMcpEnabled === "boolean") {
      currentBrowserMcp = d.browserMcpEnabled;
      if (settingsBrowserMcp) settingsBrowserMcp.checked = d.browserMcpEnabled;
    }
  }).catch(() => {});
  connect();
}

/* ---------- 文件面板：Codex 风格文件树 + 多标签代码查看器 ---------- */
const filesState = { inited: false, root: null, children: new Map(), expanded: new Set(), filter: "", tabs: [], active: null };
function fileParent(p) { const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/")); return idx > 0 ? p.slice(0, idx) : p; }
function fileNameOf(p) { const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/")); return idx >= 0 ? p.slice(idx + 1) : p; }
function fileExtOf(name) { const idx = name.lastIndexOf("."); return idx >= 0 ? name.slice(idx + 1).toLowerCase() : ""; }
async function fetchTree(dir) {
  const d = await fetch(`/api/files?dir=${encodeURIComponent(dir)}`).then((r) => r.json());
  if (!d.ok) throw new Error(d.error || "读取目录失败");
  filesState.root = d.root || filesState.root;
  const map = new Map();
  for (const ent of d.items || []) {
    const parent = fileParent(ent.path) || filesState.root;
    if (!map.has(parent)) map.set(parent, []);
    map.get(parent).push(ent);
  }
  for (const [k, v] of map) {
    if (!filesState.children.has(k) || v.length) filesState.children.set(k, v);
  }
}
async function ensureFilesPanel() {
  if (filesState.inited) { renderFilesTree(); renderViewerTabs(); renderViewerContent(); return; }
  filesState.inited = true;
  try { await fetchTree(""); } catch (err) {
    const tree = $("#cw-files-tree");
    if (tree) tree.innerHTML = `<div class="cw-empty">目录读取失败：${escapeHtml(err.message)}</div>`;
    return;
  }
  const refresh = $("#cw-files-refresh");
  if (refresh) refresh.addEventListener("click", async () => {
    filesState.children.clear();
    try { await fetchTree(""); renderFilesTree(); } catch (err) { toast(err.message, "err"); }
  });
  const filter = $("#cw-files-filter");
  if (filter) filter.addEventListener("input", () => { filesState.filter = filter.value.trim().toLowerCase(); renderFilesTree(); });
  const openBtn = $("#cw-viewer-open");
  if (openBtn) openBtn.addEventListener("click", () => revealActiveFile("open"));
  const revealBtn = $("#cw-viewer-reveal");
  if (revealBtn) revealBtn.addEventListener("click", () => revealActiveFile("folder"));
  renderFilesTree();
}
function revealActiveFile(mode) {
  const tab = filesState.tabs.find((t) => t.path === filesState.active);
  if (!tab) return toast("先打开一个文件", "warn");
  fetch("/api/reveal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: tab.path, mode }) });
}
async function toggleDir(path) {
  if (filesState.expanded.has(path)) { filesState.expanded.delete(path); renderFilesTree(); return; }
  if (!filesState.children.has(path)) {
    try { await fetchTree(path); } catch (err) { toast(err.message, "err"); return; }
  }
  filesState.expanded.add(path);
  renderFilesTree();
}
function sortEntries(list) {
  return list.slice().sort((a, b) => (b.dir - a.dir) || a.name.localeCompare(b.name, "zh-Hans-CN"));
}
function fileIconFor(name) {
  const ext = fileExtOf(name);
  if (["js", "mjs", "ts", "py", "json", "css", "html", "htm", "csv", "xml", "yaml", "yml"].includes(ext)) return "file-code";
  if (["md", "txt", "log"].includes(ext)) return "file-text";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) return "file-image";
  if (["mp3", "wav", "m4a", "aac", "ogg", "flac"].includes(ext)) return "file-audio";
  if (["mp4", "mov", "webm", "mkv", "avi"].includes(ext)) return "file-video";
  return "file";
}
function renderFilesTree() {
  const tree = $("#cw-files-tree");
  if (!tree || !filesState.root) return;
  tree.innerHTML = "";
  const q = filesState.filter.toLowerCase();
  if (q) {
    const flat = [];
    const collect = (list) => {
      for (const ent of list) {
        if (!ent.dir && ent.name.toLowerCase().includes(q)) flat.push(ent);
        if (ent.dir && filesState.children.has(ent.path)) collect(filesState.children.get(ent.path));
      }
    };
    collect(filesState.children.get(filesState.root) || []);
    if (!flat.length) { tree.appendChild(emptyNote("没有匹配文件（仅搜索已加载目录，可点开文件夹后再筛）")); return; }
    for (const ent of flat.slice(0, 200)) tree.appendChild(treeRow(ent, 0));
    refreshIcons();
    return;
  }
  const renderLevel = (parent, depth, container) => {
    for (const ent of sortEntries(filesState.children.get(parent) || [])) {
      container.appendChild(treeRow(ent, depth));
      if (ent.dir && filesState.expanded.has(ent.path)) {
        const box = document.createElement("div");
        box.className = "cw-files-children";
        renderLevel(ent.path, depth + 1, box);
        container.appendChild(box);
      }
    }
  };
  renderLevel(filesState.root, 0, tree);
  refreshIcons();
}
function treeRow(ent, depth) {
  const row = document.createElement("div");
  row.className = "cw-files-row";
  row.style.paddingLeft = `${8 + depth * 14}px`;
  if (ent.dir) {
    row.innerHTML = `<i data-lucide="${filesState.expanded.has(ent.path) ? "chevron-down" : "chevron-right"}" aria-hidden="true"></i><i data-lucide="${filesState.expanded.has(ent.path) ? "folder-open" : "folder"}" aria-hidden="true"></i><span></span>`;
    row.addEventListener("click", () => toggleDir(ent.path));
  } else {
    row.innerHTML = `<i data-lucide="${fileIconFor(ent.name)}" aria-hidden="true"></i><span></span>`;
    row.addEventListener("click", () => { openViewerFile(ent.path); });
  }
  row.querySelector("span").textContent = ent.name;
  return row;
}
async function openViewerFile(path) {
  const existing = filesState.tabs.find((t) => t.path === path);
  if (existing) { filesState.active = path; renderViewerTabs(); renderViewerContent(); return; }
  const d = await fetch(`/api/read-text?path=${encodeURIComponent(path)}`)
    .then((r) => r.json())
    .catch((err) => ({ ok: false, error: `网络请求失败：${err.message}` }));
  if (!d.ok) return toast(d.error || "读取失败", "err");
  filesState.tabs.push({ path, name: fileNameOf(path), content: String(d.content || "") });
  if (filesState.tabs.length > 8) filesState.tabs.shift();
  filesState.active = path;
  renderViewerTabs();
  renderViewerContent();
}
function closeViewerTab(path) {
  const idx = filesState.tabs.findIndex((t) => t.path === path);
  if (idx < 0) return;
  filesState.tabs.splice(idx, 1);
  if (filesState.active === path) filesState.active = filesState.tabs.length ? filesState.tabs[Math.max(0, idx - 1)].path : null;
  renderViewerTabs();
  renderViewerContent();
}
function renderViewerTabs() {
  const bar = $("#cw-viewer-tabs");
  if (!bar) return;
  bar.innerHTML = "";
  const viewer = $("#cw-viewer");
  if (viewer) viewer.classList.toggle("cw-hidden", !filesState.tabs.length);
  for (const tab of filesState.tabs) {
    const el = document.createElement("div");
    el.className = "cw-vtab" + (tab.path === filesState.active ? " is-active" : "");
    el.innerHTML = `<span></span><button type="button" aria-label="关闭">×</button>`;
    el.querySelector("span").textContent = tab.name;
    el.addEventListener("click", (e) => { if (e.target.closest("button")) return; filesState.active = tab.path; renderViewerTabs(); renderViewerContent(); });
    el.querySelector("button").addEventListener("click", () => closeViewerTab(tab.path));
    bar.appendChild(el);
  }
}
function highlightLine(line, ext) {
  let html = escapeHtml(line);
  // 字符串先摘出为私有区占位符，避免后续关键词（如 class）打碎已生成的 span 属性。
  const slots = [];
  html = html.replace(/(&quot;(?:(?!&quot;).)*&quot;|&#39;(?:(?!&#39;).)*&#39;)/g, (m) => {
    if (slots.length >= 64) return m;
    slots.push(`<span class="tok-str">${m}</span>`);
    return String.fromCharCode(0xE000 + slots.length - 1);
  });
  const comRe = ext === "py" ? /(#.*$)/ : ["js", "mjs", "ts"].includes(ext) ? /(\/\/.*$|\/\*.*?\*\/)/ : ["css", "html", "htm"].includes(ext) ? /(\/\*.*?\*\/|&lt;!--.*?--&gt;)/ : null;
  if (comRe) html = html.replace(comRe, (m) => {
    if (slots.length >= 64) return m;
    slots.push(`<span class="tok-com">${m}</span>`);
    return String.fromCharCode(0xE000 + slots.length - 1);
  });
  const kwMap = {
    code: "const|let|var|function|return|if|else|for|while|import|export|from|class|extends|new|await|async|try|catch|finally|throw|switch|case|break|continue|typeof|default|this|null|undefined|true|false",
    py: "def|return|if|elif|else|for|while|import|from|class|try|except|finally|with|as|pass|raise|lambda|None|True|False|and|or|not|in|is",
    web: "function|var|let|const|return|if|else|class|true|false|null",
  };
  const kw = ["js", "mjs", "ts"].includes(ext) ? kwMap.code : ext === "py" ? kwMap.py : ["css", "html", "htm", "json"].includes(ext) ? kwMap.web : "";
  if (kw) html = html.replace(new RegExp(`\\b(${kw})\\b`, "g"), `<span class="tok-kw">$1</span>`);
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, `<span class="tok-num">$1</span>`);
  html = html.replace(/[\uE000-\uE03F]/g, (ch) => slots[ch.charCodeAt(0) - 0xE000] || "");
  return html;
}
function renderViewerContent() {
  const crumb = $("#cw-viewer-breadcrumb");
  const code = $("#cw-viewer-code");
  if (!crumb || !code) return;
  const tab = filesState.tabs.find((t) => t.path === filesState.active);
  if (!tab) { crumb.textContent = ""; code.innerHTML = ""; return; }
  crumb.textContent = tab.path;
  const ext = fileExtOf(tab.name);
  const lines = tab.content.split("\n");
  const MAX = 3000;
  const parts = [];
  for (let i = 0; i < Math.min(lines.length, MAX); i++) {
    const rendered = highlightLine(lines[i], ext) || "&nbsp;";
    parts.push(`<div class="cw-code-line"><span class="cw-code-no">${i + 1}</span><code>${rendered}</code></div>`);
  }
  if (lines.length > MAX) parts.push(`<div class="cw-code-line cw-code-more">文件过大，仅显示前 ${MAX} 行（共 ${lines.length} 行）</div>`);
  code.innerHTML = parts.join("");
}

/* ---------- 分享导出 + 会话大纲 ---------- */
async function exportCurrentSession() {
  const sid = readingHistory ? readingHistory.sessionId : currentSessionId || (lastHealth && lastHealth.sessionId) || null;
  if (!sid) return toast("还没有可导出的会话", "warn");
  try {
    const d = await fetch(`/api/export-session?id=${encodeURIComponent(sid)}`).then((r) => r.json());
    if (!d.ok) return toast(d.error || "导出失败", "err");
    const blob = new Blob([d.markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `会话-${String(sid).slice(0, 8)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 3000);
    toast("已导出 Markdown 文件", "ok");
  } catch (err) { toast(`导出失败：${err.message}`, "err"); }
}
let outlineOpen = false;
async function toggleOutline(btn) {
  closeFloatMenu();
  if (outlineOpen) { outlineOpen = false; return; }
  const nodes = threadEl ? Array.from(threadEl.querySelectorAll(".cw-user-message")) : [];
  if (!nodes.length) return toast("当前会话还没有提问，无法生成大纲", "warn");
  const menu = document.createElement("div");
  menu.className = "wb-float-menu cw-outline-menu";
  menu.id = "wb-float-menu";
  const head = document.createElement("div");
  head.className = "cw-outline-head";
  head.textContent = "会话大纲 · 点击跳转";
  menu.appendChild(head);
  nodes.forEach((node, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.innerHTML = `<i data-lucide="corner-down-right" aria-hidden="true"></i><span></span>`;
    const text = (node.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
    b.querySelector("span").textContent = `${i + 1}. ${text || "（图片提问）"}`;
    b.addEventListener("click", () => {
      outlineOpen = false;
      closeFloatMenu();
      node.scrollIntoView({ behavior: "smooth", block: "start" });
      node.classList.add("is-outline-flash");
      setTimeout(() => node.classList.remove("is-outline-flash"), 1400);
    });
    menu.appendChild(b);
  });
  document.body.appendChild(menu);
  const rect = btn.getBoundingClientRect();
  menu.style.left = `${Math.max(8, rect.right - menu.offsetWidth - 8)}px`;
  menu.style.top = `${rect.bottom + 6}px`;
  menu.style.maxHeight = "56vh";
  menu.style.overflow = "auto";
  refreshIcons();
  outlineOpen = true;
  setTimeout(() => document.addEventListener("click", () => { outlineOpen = false; closeFloatMenu(); }, { once: true }), 0);
}

/* ---------- 全局会话搜索 ---------- */
function openSearchPanel(btn) {
  closeFloatMenu();
  const menu = document.createElement("div");
  menu.className = "wb-float-menu cw-search-menu";
  menu.id = "wb-float-menu";
  menu.innerHTML = `<div class="cw-outline-head">搜索全部会话内容（回车执行）</div>`;
  const input = document.createElement("input");
  input.className = "cw-files-filter";
  input.placeholder = "关键词…";
  input.style.margin = "0 8px 8px";
  menu.appendChild(input);
  const box = document.createElement("div");
  box.className = "cw-search-results";
  box.innerHTML = `<div class="cw-outline-head">输入关键词搜索历史会话正文</div>`;
  menu.appendChild(box);
  const run = async () => {
    const q = input.value.trim();
    if (!q) return;
    box.innerHTML = `<div class="cw-outline-head">搜索中…</div>`;
    try {
      const d = await fetch(`/api/search?q=${encodeURIComponent(q)}`).then((r) => r.json());
      box.innerHTML = "";
      const rs = Array.isArray(d.results) ? d.results : [];
      if (!rs.length) { box.innerHTML = `<div class="cw-outline-head">没有命中的会话</div>`; return; }
      for (const r of rs) {
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = `<span></span><small></small>`;
        b.querySelector("span").textContent = r.title || r.sessionId.slice(0, 8);
        b.querySelector("small").textContent = (r.hits && r.hits[0] || "").slice(0, 80);
        b.addEventListener("click", () => { closeFloatMenu(); openHistory(r.sessionId); });
        box.appendChild(b);
      }
    } catch { box.innerHTML = `<div class="cw-outline-head">搜索失败</div>`; }
  };
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") run(); });
  document.body.appendChild(menu);
  const rect = btn.getBoundingClientRect();
  menu.style.left = `${Math.max(8, rect.right - 380)}px`;
  menu.style.top = `${rect.bottom + 6}px`;
  menu.style.width = "380px";
  setTimeout(() => { input.focus(); document.addEventListener("click", closeFloatMenu, { once: true }); }, 0);
}

/* ---------- Ctrl+K 命令面板 ---------- */
const paletteState = { open: false, items: [], sel: 0, sessions: [] };

function darkOn() {
  const rootEl = document.getElementById("claude-workbench-mock");
  return Boolean(rootEl && rootEl.classList.contains("cw-dark"));
}
function applyDarkModePref() {
  initDarkMode(); // 统一走完整深色体系（幂等：只在此处绑定一次按钮）
}
function toggleDarkMode() {
  const next = !darkOn();
  applyDarkMode(next);
  try { localStorage.setItem("wb.dark", next ? "1" : "0"); } catch {}
  toast(next ? "已切换到深色模式" : "已切换到浅色模式");
}

// 模糊打分：q 的每个字符按顺序出现在 text 中即命中；连续命中与前缀命中加分，否则 0 分。
function paletteScore(text, q) {
  if (!q) return 1;
  const t = String(text || "").toLowerCase();
  let ti = 0, score = 0, streak = 0;
  for (const ch of q.toLowerCase()) {
    const idx = t.indexOf(ch, ti);
    if (idx < 0) return 0;
    streak = idx === ti ? streak + 1 : 1;
    score += 2 + streak + (idx === 0 ? 4 : 0);
    ti = idx + 1;
  }
  return score;
}

// 数据源与 loadTaskList 同源：/api/history 出会话，/api/workspace 出自定义标题。
async function paletteLoadSessions() {
  try {
    const [hist, ws] = await Promise.all([
      fetch("/api/history").then((r) => r.json()),
      fetch("/api/workspace").then((r) => r.json()).catch(() => ({ projects: [], chats: {} })),
    ]);
    const items = Array.isArray(hist.items) ? hist.items : [];
    const chats = (ws && ws.chats) || {};
    return items
      .map((it) => ({
        sessionId: it.sessionId,
        title: (chats[it.sessionId] && chats[it.sessionId].title) || it.preview || "(无文字内容)",
        preview: it.preview || "",
        updatedAt: it.updatedAt || 0,
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 200);
  } catch {
    return [];
  }
}

// 内置动作：优先复用既有按钮的 click()，保持单一事实源（busy 确认、toast、标签刷新都跟着走）。
function paletteActions() {
  const mode = (key, label) => ({
    icon: "gauge", label: `切换模式：${label}`, hint: "工作模式", keywords: `mode ${key} 模式`,
    run() {
      const btn = document.querySelector(`#cw-mode-menu button[data-mode="${key}"]`);
      if (btn) btn.click();
    },
  });
  const view = (key, label, icon) => ({
    icon, label: `打开：${label}`, hint: "视图", keywords: key,
    run() { switchView(key); },
  });
  return [
    { icon: "plus", label: "新建会话", hint: "Ctrl+N", keywords: "new 新建 会话 chat", run() { if (newChatBtn) newChatBtn.click(); } },
    mode("fast", "快速"),
    mode("balanced", "均衡"),
    mode("deep", "深度"),
    { icon: "panel-left", label: "显示 / 隐藏左栏", hint: "Ctrl+Alt+B", keywords: "sidebar 左栏 侧栏", run() { const b = document.getElementById("cw-toggle-left"); if (b) b.click(); } },
    { icon: "panel-right", label: "显示 / 隐藏右侧面板", hint: "Ctrl+Alt+R", keywords: "inspector 右栏 面板", run() { const b = document.getElementById("cw-toggle-right"); if (b) b.click(); } },
    { icon: darkOn() ? "sun" : "moon", label: darkOn() ? "切换到浅色模式" : "切换到深色模式", hint: "主题", keywords: "dark light theme 深色 浅色 主题", run: toggleDarkMode },
    view("chat", "助理", "message-square"),
    view("queue", "任务队列", "puzzle"),
    view("history", "历史记录", "clock"),
    view("assets", "资料库", "folder-open"),
    { icon: "search", label: "搜索会话内容", hint: "全文搜索", keywords: "search 搜索 全文", run() { if (headSearch) headSearch.click(); } },
    { icon: "settings", label: "打开设置", hint: "设置", keywords: "settings 设置", run() { if (settingsBtn) settingsBtn.click(); } },
    { icon: "refresh-cw", label: "刷新工作台页面", hint: "F5 / Ctrl+R", keywords: "reload refresh 刷新 重载 F5 页面", run() { location.reload(); } },
  ];
}

function renderPalette() {
  const box = document.getElementById("cw-palette-list");
  const input = document.getElementById("cw-palette-input");
  if (!box) return;
  const q = ((input && input.value) || "").trim();
  const actions = paletteActions()
    .map((a) => ({ kind: "action", ...a, score: paletteScore(`${a.label} ${a.keywords}`, q) }))
    .filter((a) => a.score > 0);
  const sessions = paletteState.sessions
    .map((s) => ({ kind: "session", icon: "message-square", ...s, score: Math.max(paletteScore(s.title, q), paletteScore(s.preview, q) * 0.6) }))
    .filter((s) => s.score > 0);
  sessions.sort((a, b) => b.score - a.score || b.updatedAt - a.updatedAt);
  paletteState.items = [...actions.slice(0, 12), ...sessions.slice(0, 16)].slice(0, 30);
  if (paletteState.sel >= paletteState.items.length) paletteState.sel = 0;
  box.innerHTML = "";
  if (!paletteState.items.length) {
    box.innerHTML = `<div class="cw-palette-empty">没有匹配的会话或命令</div>`;
    return;
  }
  paletteState.items.forEach((item, i) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "cw-palette-item" + (i === paletteState.sel ? " is-sel" : "");
    row.title = item.kind === "session" ? (item.preview || item.title) : (item.label || "");
    row.innerHTML = `<i data-lucide="${item.icon || "message-square"}" aria-hidden="true"></i><span class="cw-palette-label"></span><small></small>`;
    $(".cw-palette-label", row).textContent = item.kind === "session" ? item.title : item.label;
    $("small", row).textContent = item.kind === "session" ? `会话 · ${relativeTime(item.updatedAt)}` : (item.hint || "");
    row.addEventListener("click", () => { paletteState.sel = i; runPaletteItem(); });
    row.addEventListener("mousemove", () => {
      if (paletteState.sel === i) return;
      paletteState.sel = i;
      $$(".cw-palette-item", box).forEach((r, j) => r.classList.toggle("is-sel", j === i));
    });
    box.appendChild(row);
  });
  refreshIcons();
  const selEl = $$(".cw-palette-item", box)[paletteState.sel];
  if (selEl) selEl.scrollIntoView({ block: "nearest" });
}

function paletteMove(delta) {
  const n = paletteState.items.length;
  if (!n) return;
  paletteState.sel = (paletteState.sel + delta + n) % n;
  const box = document.getElementById("cw-palette-list");
  $$(".cw-palette-item", box).forEach((r, i) => r.classList.toggle("is-sel", i === paletteState.sel));
  const sel = $$(".cw-palette-item", box)[paletteState.sel];
  if (sel) sel.scrollIntoView({ block: "nearest" });
}

function runPaletteItem() {
  const item = paletteState.items[paletteState.sel];
  closeCommandPalette();
  if (!item) return;
  try {
    if (item.kind === "session") openHistory(item.sessionId);
    else if (typeof item.run === "function") item.run();
  } catch (err) {
    toast((err && err.message) || "执行失败", "err");
  }
}

async function openCommandPalette() {
  if (paletteState.open) return;
  let ov = document.getElementById("cw-command-palette");
  if (!ov) {
    ov = document.createElement("div");
    ov.id = "cw-command-palette";
    ov.innerHTML = `
      <div class="cw-palette-card" role="dialog" aria-modal="true" aria-label="命令面板">
        <input id="cw-palette-input" type="text" spellcheck="false" autocomplete="off" placeholder="搜索会话，或输入命令（新建会话 / 切模式 / 深色模式…）">
        <div id="cw-palette-list" class="cw-palette-list"></div>
        <div class="cw-palette-foot">↑↓ 选择 · Enter 执行 · Esc 关闭</div>
      </div>`;
    document.body.appendChild(ov);
    const input = $("#cw-palette-input", ov);
    input.addEventListener("input", () => { paletteState.sel = 0; renderPalette(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); paletteMove(1); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); paletteMove(-1); return; }
      if (e.key === "Enter") { e.preventDefault(); runPaletteItem(); return; }
    });
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) { e.preventDefault(); closeCommandPalette(); } });
  }
  paletteState.open = true;
  paletteState.sel = 0;
  ov.classList.remove("cw-hidden");
  const input = $("#cw-palette-input", ov);
  input.value = "";
  renderPalette();
  paletteLoadSessions().then((list) => { paletteState.sessions = list; if (paletteState.open) renderPalette(); });
  setTimeout(() => input.focus(), 0);
}

function closeCommandPalette() {
  paletteState.open = false;
  const ov = document.getElementById("cw-command-palette");
  if (ov) ov.classList.add("cw-hidden");
}

function toggleCommandPalette() {
  if (paletteState.open) closeCommandPalette();
  else openCommandPalette();
}

// Ctrl+K 开关面板、Esc 关闭：必须用捕获阶段注册，先于 init() 里的 Esc/Ctrl+N 气泡监听器，
// 面板打开时按 Esc 只关面板、不会误触“停止生成”。
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && !e.altKey && !e.shiftKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    e.stopPropagation();
    toggleCommandPalette();
    return;
  }
  if (e.key === "Escape" && paletteState.open) {
    e.preventDefault();
    e.stopPropagation();
    closeCommandPalette();
  }
}, true);

/* ---------- 图片 lightbox ---------- */
function openLightbox(src) {
  closeLightbox();
  const ov = document.createElement("div");
  ov.className = "cw-lightbox";
  ov.id = "cw-lightbox";
  const img = document.createElement("img");
  img.src = src;
  img.alt = "预览";
  ov.appendChild(img);
  ov.addEventListener("click", closeLightbox);
  document.body.appendChild(ov);
}
function closeLightbox() {
  const ov = document.getElementById("cw-lightbox");
  if (ov) ov.remove();
}

/* ---------- 深色模式：wb.dark 记忆；.cw-dark 挂 mock 根，body.cw-dark-page 覆盖 body 级浮层 ---------- */
function applyDarkMode(on) {
  const rootEl = document.getElementById("claude-workbench-mock");
  if (rootEl) rootEl.classList.toggle("cw-dark", Boolean(on));
  document.body.classList.toggle("cw-dark-page", Boolean(on));
  const btn = document.getElementById("cw-dark-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.title = on ? "切换到浅色模式" : "切换到深色模式";
  }
}
function initDarkMode() {
  let saved = null;
  try { saved = localStorage.getItem("wb.dark"); } catch {}
  const on = saved === "1" || (saved === null
    && window.matchMedia
    && window.matchMedia("(prefers-color-scheme: dark)").matches);
  applyDarkMode(on);
  const btn = document.getElementById("cw-dark-toggle");
  if (btn) btn.addEventListener("click", () => {
    const rootEl = document.getElementById("claude-workbench-mock");
    const next = !(rootEl && rootEl.classList.contains("cw-dark"));
    applyDarkMode(next);
    try { localStorage.setItem("wb.dark", next ? "1" : "0"); } catch {}
  });
}

/* ---------- 面板布局：拖宽 / 隐藏显示（Codex 风格，宽度记忆在 localStorage） ---------- */
const uiPrefs = (() => { try { return JSON.parse(localStorage.getItem("wb.ui") || "{}") || {}; } catch { return {}; } })();
function saveUiPrefs() { try { localStorage.setItem("wb.ui", JSON.stringify(uiPrefs)); } catch {} }
function insModeNow() {
  if (uiPrefs.insMode === "rail" || uiPrefs.insMode === "hidden") return uiPrefs.insMode;
  return uiPrefs.inspectorHidden ? "hidden" : "open"; // 兼容旧开关
}
// 右栏任务驱动角标：rail/hidden 期间后台有完成或新产物时点亮
function setInspectorBadge(on) {
  const tr = document.getElementById("cw-toggle-right");
  if (tr) tr.classList.toggle("has-badge", Boolean(on));
}
let unseenProducts = 0;
function setProductsBadge(n) {
  const el = document.getElementById("cw-rail-badge-assets");
  if (!el) return;
  el.textContent = n > 0 ? String(n) : "";
  el.classList.toggle("cw-hidden", !(n > 0));
}
function splitModeNow() {
  return uiPrefs.splitMode === "split" ? "split" : uiPrefs.splitMode === "bfull" ? "bfull" : "";
}
function applyShellLayout() {
  const shell = document.querySelector(".cw-shell");
  if (!shell) return;
  const sbW = Math.min(420, Math.max(200, Number(uiPrefs.sidebarWidth) || 280)); // DSH 对齐：默认 280（DSH SIDEBAR_DEFAULT）
  const insW = Math.min(640, Math.max(280, Number(uiPrefs.inspectorWidth) || 306));
  shell.classList.toggle("sb-hidden", Boolean(uiPrefs.sidebarHidden));
  const sm = splitModeNow(); // Codex 式布局循环：split/bfull 期间右栏强制可见，忽略 rail/hidden
  shell.classList.toggle("split-mode", sm === "split");
  shell.classList.toggle("bfull-mode", sm === "bfull");
  const mode = sm ? "open" : insModeNow();
  shell.classList.toggle("rail-mode", mode === "rail");
  shell.classList.toggle("ins-hidden", mode === "hidden");
  const rail = document.getElementById("cw-rail");
  if (rail) rail.classList.toggle("cw-hidden", mode !== "rail");
  if (rail) rail.querySelectorAll(".cw-rail-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.rail === currentRightPanel));
  shell.style.setProperty("--cw-sbw", `${sbW}px`);
  shell.style.setProperty("--cw-insw", `${insW}px`);
  // LAYOUTESC_20261016：布局按钮在分屏/全宽浏览器态高亮（提示再点一次可退出）
  const layBtn = document.getElementById("cw-toggle-layout");
  if (layBtn) layBtn.classList.toggle("is-active", Boolean(sm));
  // SIDEUX_20261115：左右栏开关按钮反映当前可见状态（高亮+aria-pressed+动态 title），一眼可知面板开/关
  const tlBtn = document.getElementById("cw-toggle-left");
  const trBtn = document.getElementById("cw-toggle-right");
  if (tlBtn) {
    const on = !uiPrefs.sidebarHidden;
    tlBtn.classList.toggle("is-active", on);
    tlBtn.setAttribute("aria-pressed", on ? "true" : "false");
    tlBtn.title = (on ? "隐藏左栏" : "显示左栏") + " (Ctrl+Alt+B)";
  }
  if (trBtn) {
    const on = mode !== "hidden";
    trBtn.classList.toggle("is-active", on);
    trBtn.setAttribute("aria-pressed", on ? "true" : "false");
    trBtn.title = (on ? "收起右侧面板" : "展开右侧面板") + " (Ctrl+Alt+R)";
  }
  syncBrowserBounds();
}

// LAYOUTESC_20261016：一键退出分屏/全宽浏览器，回到普通聊天布局
function exitSplitLayout() {
  if (!splitModeNow()) return false;
  uiPrefs.splitMode = "";
  uiPrefs.insMode = "open";
  uiPrefs.inspectorHidden = false;
  saveUiPrefs();
  applyShellLayout();
  return true;
}
function startSplitDrag(e, key, fromRight) {
  e.preventDefault();
  const shell = document.querySelector(".cw-shell");
  if (!shell) return;
  const splitter = e.currentTarget;
  splitter.classList.add("is-dragging");
  // SIDEUX_20261115：拖动时显示实时宽度气泡，松手移除——给「拖到多宽」即时反馈
  let badge = splitter.querySelector(".cw-split-badge");
  if (!badge) { badge = document.createElement("span"); badge.className = "cw-split-badge"; splitter.appendChild(badge); }
  const showBadge = () => { badge.textContent = `${Math.round(Number(uiPrefs[key]) || 0)}px`; };
  showBadge();
  // SPLITCAP_20261114：改用 Pointer Events + setPointerCapture——旧实现 mousemove/mouseup 绑在 document，
  // 拖出窗口外松手时 mouseup 收不到 → is-dragging 蓝色残留 + 监听泄漏（今天实测复现）。
  // 捕获后指针移出窗口仍持续派发到 splitter，松手/取消/失焦三路兜底清理。
  try { splitter.setPointerCapture(e.pointerId); } catch {}
  const rect = shell.getBoundingClientRect();
  const onMove = (ev) => {
    const raw = fromRight ? rect.right - ev.clientX : ev.clientX - rect.left;
    uiPrefs[key] = Math.min(fromRight ? 640 : 420, Math.max(fromRight ? 280 : 200, raw));
    applyShellLayout();
    showBadge();
  };
  const cleanup = () => {
    splitter.classList.remove("is-dragging");
    if (badge) badge.remove();
    splitter.removeEventListener("pointermove", onMove);
    splitter.removeEventListener("pointerup", cleanup);
    splitter.removeEventListener("pointercancel", cleanup);
    window.removeEventListener("blur", cleanup);
    saveUiPrefs();
  };
  splitter.addEventListener("pointermove", onMove);
  splitter.addEventListener("pointerup", cleanup);
  splitter.addEventListener("pointercancel", cleanup);
  window.addEventListener("blur", cleanup);
}
function wireShellLayout() {
  try {
    const shell = document.querySelector(".cw-shell");
    if (!shell) return;
    shell.classList.add("has-splitters");
    // FOOTCOLLAPSE_20261114：左下角项目/会话信息块折叠（状态记忆在 uiPrefs.sideFootCollapsed）
    const foot = document.querySelector(".wb-side-foot");
    const ft = document.getElementById("cw-foot-toggle");
    if (foot && ft) {
      const applyFoot = () => {
        foot.classList.toggle("foot-collapsed", Boolean(uiPrefs.sideFootCollapsed));
        ft.textContent = uiPrefs.sideFootCollapsed ? "▴" : "▾";
        ft.title = uiPrefs.sideFootCollapsed ? "展开项目与会话信息" : "收起项目与会话信息";
      };
      applyFoot();
      if (!ft.dataset.bound) {
        ft.dataset.bound = "1";
        ft.addEventListener("click", () => { uiPrefs.sideFootCollapsed = !uiPrefs.sideFootCollapsed; saveUiPrefs(); applyFoot(); });
      }
    }
    const left = document.getElementById("cw-split-left");
    const right = document.getElementById("cw-split-right");
    if (left) left.addEventListener("pointerdown", (e) => startSplitDrag(e, "sidebarWidth", false));
    if (right) right.addEventListener("pointerdown", (e) => startSplitDrag(e, "inspectorWidth", true));
    const tl = document.getElementById("cw-toggle-left");
    const tr = document.getElementById("cw-toggle-right");
    if (tl) tl.addEventListener("click", () => { uiPrefs.sidebarHidden = !uiPrefs.sidebarHidden; saveUiPrefs(); applyShellLayout(); });
    // 右栏三态循环：展开 → 收窄图标条 → 全隐 → 展开（分屏/全宽浏览器态下点击 = 退回普通布局）
    if (tr) tr.addEventListener("click", () => {
      if (splitModeNow()) {
        exitSplitLayout();
        return;
      }
      const mode = insModeNow();
      uiPrefs.insMode = mode === "open" ? "rail" : mode === "rail" ? "hidden" : "open";
      uiPrefs.inspectorHidden = uiPrefs.insMode === "hidden";
      saveUiPrefs();
      applyShellLayout();
      if (uiPrefs.insMode === "open") { setInspectorBadge(false); if (currentRightPanel === "assets") { unseenProducts = 0; setProductsBadge(0); } }
    });
    // Codex 式布局循环：聊天 → 分屏（左聊天右浏览器）→ 全宽浏览器 → 聊天
    const lay = document.getElementById("cw-toggle-layout");
    if (lay) lay.addEventListener("click", () => {
      const cur = splitModeNow();
      const next = cur === "" ? "split" : cur === "split" ? "bfull" : "";
      uiPrefs.splitMode = next;
      if (next) { uiPrefs.insMode = "open"; uiPrefs.inspectorHidden = false; }
      saveUiPrefs();
      applyShellLayout();
      if (next) applyRightPanel("browser");
    });
    // 双击右侧分隔条：展开⇄收窄快速切换
    const rightSplit = document.getElementById("cw-split-right");
    if (rightSplit) rightSplit.addEventListener("dblclick", () => {
      const mode = insModeNow();
      uiPrefs.insMode = mode === "open" ? "rail" : "open";
      uiPrefs.inspectorHidden = false;
      saveUiPrefs();
      applyShellLayout();
    });
    // SIDEUX_20261115：左分隔条双击复位默认宽；两条分隔条键盘可达（方向键微调、Shift 大步、Home/End 极值、回车/空格复位）
    if (left) left.addEventListener("dblclick", () => { uiPrefs.sidebarWidth = 280; saveUiPrefs(); applyShellLayout(); });
    const wireSplitKeys = (el, key, fromRight, def, min, max) => {
      if (!el || el.dataset.a11y) return; el.dataset.a11y = "1";
      el.tabIndex = 0; el.setAttribute("role", "separator"); el.setAttribute("aria-orientation", "vertical");
      el.setAttribute("aria-valuemin", String(min)); el.setAttribute("aria-valuemax", String(max));
      const sync = () => el.setAttribute("aria-valuenow", String(Math.round(Number(uiPrefs[key]) || def)));
      sync();
      el.addEventListener("keydown", (e) => {
        const step = e.shiftKey ? 48 : 16; let d = 0;
        if (e.key === "ArrowLeft") d = fromRight ? step : -step;
        else if (e.key === "ArrowRight") d = fromRight ? -step : step;
        else if (e.key === "Home") uiPrefs[key] = min;
        else if (e.key === "End") uiPrefs[key] = max;
        else if (e.key === "Enter" || e.key === " ") uiPrefs[key] = def;
        else return;
        e.preventDefault();
        if (d) uiPrefs[key] = Math.min(max, Math.max(min, (Number(uiPrefs[key]) || def) + d));
        saveUiPrefs(); applyShellLayout(); sync();
      });
    };
    wireSplitKeys(left, "sidebarWidth", false, 280, 200, 420);
    wireSplitKeys(right, "inspectorWidth", true, 306, 280, 640);
    // LAYOUTESC_20261016：Esc 退出分屏/全宽浏览器；浏览器栏"退出布局"按钮同效
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && splitModeNow()) {
        e.preventDefault();
        exitSplitLayout();
      }
    });
    const exitBtn = document.getElementById("cw-exit-layout");
    if (exitBtn) exitBtn.addEventListener("click", exitSplitLayout);
    // 收窄图标条：点击展开并直达对应标签
    $$("#cw-rail .cw-rail-btn").forEach((b) => b.addEventListener("click", () => {
      uiPrefs.insMode = "open";
      uiPrefs.inspectorHidden = false;
      saveUiPrefs();
      applyShellLayout();
      setInspectorBadge(false);
      applyRightPanel(b.dataset.rail);
    }));
    // 设备预览宽度
    $$("#cw-device-modes .cw-dev-btn").forEach((b) => b.addEventListener("click", () => {
      uiPrefs.deviceMode = b.dataset.dev;
      saveUiPrefs();
      applyDeviceMode();
    }));
    // 产物范围：本会话 / 全部
    $$("#cw-art-scope .cw-dev-btn").forEach((b) => b.addEventListener("click", () => {
      artScope = b.dataset.scope === "all" ? "all" : "session";
      artScopeDefault = artScope; // 同时记成新标签的默认值
      const v = activeView();
      if (v) v.artScope = artScope; // ISOLATE_20261021：只改当前标签，别的会话不受影响
      try { localStorage.setItem("wb.artScope", artScopeDefault); } catch {}
      $$("#cw-art-scope .cw-dev-btn").forEach((x) => x.classList.toggle("is-active", x === b));
      loadProducts();
    }));
    const changesRefresh = document.getElementById("cw-changes-refresh");
    if (changesRefresh) changesRefresh.addEventListener("click", () => { ensureChangesPanel(); loadCheckpoints(true); loadWorktrees(); });
    const wtNew = document.getElementById("cw-wt-new");
    if (wtNew) wtNew.addEventListener("click", newWorktree);
    applyShellLayout();
    applyDeviceMode();
  } catch (err) { console.warn("shell layout init failed:", err); }
}

function applyRightPanel(panel) {
  currentRightPanel = panel;
  const cv = activeView();
  if (cv) cv.panel = panel; // ISOLATE_20261021：面板选择记在这个标签名下，切回来还是它
  $$(".cw-tab").forEach((item) => {
    const active = item.dataset.panel === panel;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", active ? "true" : "false");
  });
  $$("[data-panel-content]").forEach((section) => {
    section.classList.toggle("cw-hidden", section.dataset.panelContent !== panel);
  });
  if (panel === "assets") {
    loadProducts();
    if (insModeNow() === "open") { unseenProducts = 0; setProductsBadge(0); setInspectorBadge(false); }
  }
  if (panel === "changes") ensureChangesPanel();
  if (panel === "files") ensureFilesPanel();
  if (panel === "fleet") ensureFleetPanel(); // FLEET_20261114：舰队状态/任务板/技能库三合一面板
  if (panel === "status") refreshQuota(); // QUOTA：切到状态面板立即拉额度（内部有 30s 节流）
  if (panel === "browser") {
    mountBrowserPanel();
  } else {
    syncBrowserVisibility(false);
  }
}

function switchRightPanel(panel) { applyRightPanel(panel); }

/* ---------- 设备预览宽度（手机 375 / 平板 768 / 全宽）：收窄浏览器宿主元素，原生视图跟随边界 ---------- */
const DEVICE_WIDTHS = { full: null, tablet: 768, mobile: 375 };
function applyDeviceMode() {
  const mode = uiPrefs.deviceMode === "tablet" || uiPrefs.deviceMode === "mobile" ? uiPrefs.deviceMode : "full";
  const host = document.getElementById("cw-browser-host");
  if (host) {
    const w = DEVICE_WIDTHS[mode];
    host.classList.toggle("device-framed", mode !== "full");
    host.style.width = w ? `${w}px` : "";
    host.style.margin = w ? "0 auto" : "";
  }
  document.querySelectorAll("#cw-device-modes .cw-dev-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.dev === mode));
  syncBrowserBounds();
}

/* ---------- 变更审阅：git 仓列出 porcelain 变更 + 单文件 diff；非 git 降级本会话产物 ---------- */
// FLEET_20261114：舰队状态 / 任务板 / 技能库 三合一面板（数据源 /api/fleet /api/tasks /api/skills）
async function ensureFleetPanel() {
  loadFleet();
  for (const [id, fn] of [["#cw-fleet-refresh", loadFleet], ["#cw-tasks-refresh", loadFleet]]) {
    const btn = $(id);
    if (btn && !btn.dataset.bound) { btn.dataset.bound = "1"; btn.addEventListener("click", fn); }
  }
}

async function loadFleet() {
  const hint = $("#cw-fleet-hint");
  if (hint) hint.textContent = "刷新于 " + new Date().toLocaleTimeString();
  const fleetList = $("#cw-fleet-list");
  if (fleetList) {
    try {
      const d = await fetch("/api/fleet").then((r) => r.json());
      if (!d.ok) throw new Error(d.error || "读取失败");
      const rows = Array.isArray(d.fleet) ? d.fleet : [];
      const sm = $("#cw-fleet-meta");
      if (sm) sm.textContent = `${rows.length} 个内核 · 完成条件：${d.completionCondition ? "已设" : "未设"}`;
      fleetList.innerHTML = rows.length ? "" : `<div class="cw-empty">当前没有内核（发首条消息时自动拉起）</div>`;
      for (const k of rows) {
        const row = document.createElement("div");
        row.className = "cw-change-row";
        row.innerHTML = `<span class="cw-change-status st-add">${k.busy ? "●" : "○"}</span><span class="cw-change-path"></span>`;
        $(".cw-change-path", row).textContent = `${k.sessionId ? String(k.sessionId).slice(0, 12) : "(未挂会话)"} · ${k.model || "?"} · ${k.effort || "auto"} · ${k.busy ? "生成中" : "空闲"} · 自动续跑 ${k.autoContinues || 0} 次`;
        fleetList.appendChild(row);
      }
    } catch (err) {
      fleetList.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    }
  }
  const taskList = $("#cw-tasks-list");
  if (taskList) {
    try {
      const d = await fetch("/api/tasks").then((r) => r.json());
      if (!d.ok) throw new Error(d.error || "读取失败");
      const tasks = Array.isArray(d.tasks) ? d.tasks : [];
      const sm = $("#cw-tasks-meta");
      const st = d.stats || {};
      if (sm) sm.textContent = `待办 ${st.queued || 0} · 进行 ${st.claimed || 0} · 完成 ${st.done || 0} · 失败 ${st.failed || 0}`;
      taskList.innerHTML = tasks.length ? "" : `<div class="cw-empty">任务板为空（内核里用 task-board 技能派单/认领）</div>`;
      for (const t of tasks.slice(-40).reverse()) {
        const row = document.createElement("div");
        row.className = "cw-change-row";
        const mark = { queued: "Q", claimed: "▶", done: "✓", failed: "✗" }[t.status] || "?";
        row.innerHTML = `<span class="cw-change-status st-add">${mark}</span><span class="cw-change-path"></span>`;
        $(".cw-change-path", row).textContent = `${t.subject}${(t.blockedBy || []).length ? `（依赖 ${t.blockedBy.length}）` : ""}${t.owner ? ` · ${t.owner}` : ""}${t.deliverable ? ` · ${t.deliverable}` : ""}`;
        row.title = `id=${t.id} rev=${t.revision}`;
        taskList.appendChild(row);
      }
    } catch (err) {
      taskList.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    }
  }
  const skList = $("#cw-skills-list");
  if (skList) {
    try {
      const d = await fetch("/api/skills").then((r) => r.json());
      if (!d.ok) throw new Error(d.error || "读取失败");
      const sm = $("#cw-skills-meta");
      if (sm) sm.textContent = `${d.total} 个技能`;
      skList.innerHTML = "";
      for (const s of d.skills || []) {
        const row = document.createElement("div");
        row.className = "cw-change-row";
        row.innerHTML = `<span class="cw-change-path"></span>`;
        $(".cw-change-path", row).textContent = `${s.name} — ${String(s.description || "").slice(0, 110)}`;
        row.title = `${s.name}（${s.dir}）`;
        skList.appendChild(row);
      }
      if (!(d.skills || []).length) skList.innerHTML = `<div class="cw-empty">未发现 SKILL.md</div>`;
    } catch (err) {
      skList.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    }
  }
}

async function ensureChangesPanel() {
  const listEl = $("#cw-changes-list");
  const hint = $("#cw-changes-hint");
  if (!listEl) return;
  const viewer = $("#cw-diff-viewer");
  if (viewer) viewer.classList.add("cw-hidden");
  listEl.innerHTML = `<div class="cw-empty">正在读取变更…</div>`;
  loadCheckpoints();
  loadWorktrees();
  let data;
  try {
    data = await fetch("/api/git-status").then((r) => r.json());
  } catch (err) {
    if (currentRightPanel === "changes") listEl.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    return;
  }
  if (currentRightPanel !== "changes") return;
  const items = Array.isArray(data && data.items) ? data.items : [];
  if (!data || data.git !== true) {
    if (hint) hint.textContent = "非 git 目录：显示本会话新增/变化的文件";
    const sid = currentSessionId;
    const m = sid ? sessionArtifacts.get(sid) : null;
    const mine = m ? [...m.values()].sort((a, b) => (b.mtime || 0) - (a.mtime || 0)) : [];
    listEl.innerHTML = "";
    if (!mine.length) {
      listEl.innerHTML = `<div class="cw-empty">本会话还没有产出文件。${escapeHtml((data && data.reason) ? `（git 不可用：${data.reason}）` : "")}</div>`;
      return;
    }
    for (const it of mine) {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "cw-change-row";
      row.innerHTML = `<span class="cw-change-status st-add">N</span><span class="cw-change-path"></span>${canOpenInBrowser(it) ? `<span class="cw-pr-open" role="button" title="在内置浏览器打开"><i data-lucide="app-window" aria-hidden="true"></i></span>` : ""}`;
      $(".cw-change-path", row).textContent = it.path;
      if (canOpenInBrowser(it)) {
        row.addEventListener("dblclick", (e) => { e.preventDefault(); openArtifactInBrowser(it); });
        const open = $(".cw-pr-open", row);
        if (open) open.addEventListener("click", (e) => { e.stopPropagation(); openArtifactInBrowser(it); });
      }
      row.addEventListener("click", () => showPreview(it));
      listEl.appendChild(row);
    }
    return;
  }
  if (hint) hint.textContent = items.length ? `git 工作区 · ${items.length} 个变更` : "git 工作区 · 没有未提交变更";
  listEl.innerHTML = "";
  if (!items.length) {
    listEl.innerHTML = `<div class="cw-empty">工作区干净，没有未提交变更。</div>`;
    return;
  }
  for (const it of items) {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "cw-change-row";
    const stClass = it.x === "?" || it.y === "?" ? "st-un" : it.x === "A" || it.y === "A" ? "st-add" : it.x === "D" || it.y === "D" ? "st-del" : "st-mod";
    const label = it.x === "?" ? "?" : it.x !== " " ? it.x : it.y;
    row.innerHTML = `<span class="cw-change-status ${stClass}"></span><span class="cw-change-path"></span>${canOpenInBrowser(it) ? `<span class="cw-pr-open" role="button" title="在内置浏览器打开"><i data-lucide="app-window" aria-hidden="true"></i></span>` : ""}`;
    $(".cw-change-status", row).textContent = label;
    $(".cw-change-path", row).textContent = it.path;
    row.title = `${it.x}${it.y} ${it.path}`;
    if (canOpenInBrowser(it)) {
      row.addEventListener("dblclick", (e) => { e.preventDefault(); openArtifactInBrowser(it); });
      const open = $(".cw-pr-open", row);
      if (open) open.addEventListener("click", (e) => { e.stopPropagation(); openArtifactInBrowser(it); });
    }
    row.addEventListener("click", () => showDiff(it, row));
    listEl.appendChild(row);
  }
}

async function showDiff(item, row) {
  $$("#cw-changes-list .cw-change-row").forEach((r) => r.classList.remove("is-active"));
  if (row) row.classList.add("is-active");
  const viewer = $("#cw-diff-viewer");
  const bc = $("#cw-diff-breadcrumb");
  const code = $("#cw-diff-code");
  if (!viewer || !code) return;
  viewer.classList.remove("cw-hidden");
  bc.textContent = item.path;
  code.textContent = "读取 diff…";
  if (item.x === "?") {
    // 未跟踪新文件：没有 git 基线，直接展示当前内容
    try {
      const d = await fetch(`/api/read-text?path=${encodeURIComponent(item.abs || item.path)}`).then((r) => r.json());
      code.textContent = d.ok ? d.content : `（新文件内容预览失败：${d.error || "未知原因"}）`;
    } catch (err) {
      code.textContent = `（读取失败：${err.message}）`;
    }
    return;
  }
  try {
    const d = await fetch(`/api/git-diff?path=${encodeURIComponent(item.path)}`).then((r) => r.json());
    if (!d.ok) {
      code.textContent = `（无法获取 diff：${d.reason || "未知原因"}）`;
      return;
    }
    code.innerHTML = "";
    const frag = document.createDocumentFragment();
    for (const line of String(d.diff || "").split("\n")) {
      const div = document.createElement("div");
      let cls = "diff-line";
      if (!line.startsWith("+++") && !line.startsWith("---")) {
        if (line.startsWith("@@")) cls += " diff-hunk";
        else if (line.startsWith("+")) cls += " diff-add";
        else if (line.startsWith("-")) cls += " diff-del";
      }
      div.className = cls;
      div.textContent = line || " ";
      frag.appendChild(div);
    }
    code.appendChild(frag);
  } catch (err) {
    code.textContent = `（读取失败：${err.message}）`;
  }
}

/* ---------- TODOCARD_20261018（三期③）：任务清单卡片 ---------- */
let todoCardEl = null;

function buildTodoCard(todos) {
  const items = (Array.isArray(todos) ? todos : []).filter((t) => t && (t.content || t.subject || t.activeForm));
  const card = document.createElement("div");
  card.className = "cw-todo-card";
  const done = items.filter((t) => t.status === "completed").length;
  const head = document.createElement("div");
  head.className = "cw-todo-head";
  const title = document.createElement("span");
  title.className = "cw-todo-title";
  title.textContent = "任务清单";
  const count = document.createElement("span");
  count.className = "cw-todo-count";
  count.textContent = items.length ? `${done}/${items.length}` : "";
  head.append(title, count);
  card.appendChild(head);
  const list = document.createElement("div");
  list.className = "cw-todo-list";
  for (const t of items) {
    const st = t.status === "completed" ? "done" : t.status === "in_progress" ? "active" : "pending";
    const row = document.createElement("div");
    row.className = `cw-todo-item st-${st}`;
    const mark = document.createElement("span");
    mark.className = "cw-todo-mark";
    mark.textContent = st === "done" ? "✓" : st === "active" ? "▸" : "○";
    const label = document.createElement("span");
    label.className = "cw-todo-label";
    label.textContent = (st === "active" && t.activeForm) ? t.activeForm : (t.content || t.subject || "");
    row.append(mark, label);
    list.appendChild(row);
  }
  card.appendChild(list);
  return card;
}

// 实时：每次 TodoWrite 原地更新同一张卡片（位置固定在首次出现处，内容随进度刷新）
function showTodoCardLive(todos) {
  if (!threadEl) return;
  const fresh = buildTodoCard(todos);
  if (todoCardEl && todoCardEl.isConnected) todoCardEl.replaceWith(fresh);
  else threadEl.appendChild(fresh);
  todoCardEl = fresh;
  scrollToEnd();
}

// 重放：历史档里带 todos 的 assistant 条目
function appendTodoCard(todos) {
  if (!threadEl) return;
  todoCardEl = buildTodoCard(todos);
  threadEl.appendChild(todoCardEl);
}

/* ---------- WORKTREE_20261018（三期②）：并行工作树 ---------- */
async function loadWorktrees() {
  const listEl = $("#cw-wt-list");
  if (!listEl) return;
  let d;
  try {
    d = await fetch("/api/worktree/list").then((r) => r.json());
  } catch (err) {
    listEl.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    return;
  }
  const items = Array.isArray(d && d.items) ? d.items : [];
  if (!items.length) {
    listEl.innerHTML = `<div class="cw-empty">${d && d.git === false ? "git 不可用，工作树未启用。" : "还没有并行工作树。点「新建」创建。"}</div>`;
    return;
  }
  listEl.innerHTML = "";
  for (const wt of items) {
    const row = document.createElement("div");
    row.className = "cw-cp-row";
    const info = document.createElement("div");
    info.className = "cw-cp-info";
    info.textContent = `${wt.name}${wt.branch ? ` · ${wt.branch}` : ""}`;
    info.title = wt.path;
    const open = document.createElement("button");
    open.type = "button";
    open.className = "cw-ghost-btn cw-cp-restore";
    open.textContent = "开新会话";
    open.addEventListener("click", () => openSessionInWorktree(wt));
    const del = document.createElement("button");
    del.type = "button";
    del.className = "cw-ghost-btn cw-cp-restore";
    del.textContent = "移除";
    del.addEventListener("click", () => removeWorktree(wt));
    row.append(info, open, del);
    listEl.appendChild(row);
  }
}

async function newWorktree() {
  // WTPROMPT_20261021：Electron 不支持 window.prompt（本文件 904 行 ASKTEXT 注释就是为这个写的），
  // 这里漏改导致「新建工作树」按钮点了完全没反应。改用自绘 askText。
  const name = await askText("工作树名称（字母/数字/-/_，最长 32）：将创建工作区下 wt-<名称> 目录，分支 wb/<名称>。");
  if (!name || !name.trim()) return;
  if (!/^[A-Za-z0-9_-]{1,32}$/.test(name.trim())) {
    toast("名称只能用字母、数字、- 和 _，最长 32 个字符", "warn");
    return;
  }
  try {
    const r = await fetch("/api/worktree/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim() }),
    }).then((x) => x.json());
    if (r.ok) {
      toast(`工作树 ${r.name} 已创建（分支 ${r.branch}）`, "ok");
      loadWorktrees();
    } else {
      toast(r.error || "创建失败", "err");
    }
  } catch (err) {
    toast(`创建失败：${err.message}`, "err");
  }
}

async function removeWorktree(wt) {
  if (!confirm(`移除工作树 ${wt.name}？\n\n有未提交改动时会被拒绝；已提交的内容保留在分支 ${wt.branch || ""} 上。`)) return;
  try {
    const r = await fetch("/api/worktree/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: wt.name }),
    }).then((x) => x.json());
    if (r.ok) {
      toast("工作树已移除", "ok");
      loadWorktrees();
    } else {
      toast(r.error || "移除失败", "err");
    }
  } catch (err) {
    toast(`移除失败：${err.message}`, "err");
  }
}

async function openSessionInWorktree(wt) {
  await openNewTab({ cwd: wt.path });
  toast(`新标签已绑定 ${wt.name}，发送首条消息时在工作树内启动`, "ok");
}

/* ---------- 检查点（三期①）：每轮发送前的影子快照清单 + 一键回退 ---------- */
let cpLoadedAt = 0;
async function loadCheckpoints(force = false) {
  const listEl = $("#cw-cp-list");
  if (!listEl) return;
  if (!force && Date.now() - cpLoadedAt < 3000) return;
  cpLoadedAt = Date.now();
  listEl.innerHTML = `<div class="cw-empty">读取检查点…</div>`;
  let d;
  try {
    d = await fetch("/api/checkpoints?limit=12").then((r) => r.json());
  } catch (err) {
    listEl.innerHTML = `<div class="cw-empty">读取失败：${escapeHtml(err.message)}</div>`;
    return;
  }
  const items = Array.isArray(d && d.items) ? d.items : [];
  if (!items.length) {
    listEl.innerHTML = `<div class="cw-empty">${d && d.git === false ? "git 不可用，检查点未启用。" : "还没有检查点：发一条消息后自动生成。"}</div>`;
    return;
  }
  listEl.innerHTML = "";
  for (const it of items) {
    const row = document.createElement("div");
    row.className = "cw-cp-row";
    const t = new Date(it.at || 0);
    const hh = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(t.getSeconds()).padStart(2, "0")}`;
    const info = document.createElement("div");
    info.className = "cw-cp-info";
    info.textContent = `${hh} · ${it.label || "快照"}`;
    info.title = it.hash;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cw-ghost-btn cw-cp-restore";
    btn.textContent = "回退";
    btn.addEventListener("click", () => restoreCheckpoint(it));
    row.append(info, btn);
    listEl.appendChild(row);
  }
}

async function restoreCheckpoint(cp) {
  const when = new Date(cp.at || 0).toLocaleString();
  if (!confirm(`把工作区整体回退到这个检查点？\n\n${when} · ${cp.label || "快照"}\n\n回退后新增的文件会被删除、被改的文件会还原；回退前会先拍一张保险快照，后悔可再回退一次撤销。`)) return;
  try {
    const r = await fetch("/api/checkpoint/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash: cp.hash }),
    }).then((x) => x.json());
    if (r.ok) {
      cpLoadedAt = 0;
      await ensureChangesPanel();
      await loadCheckpoints(true);
    } else {
      alert(`回退失败：${r.error || "未知原因"}`);
    }
  } catch (err) {
    alert(`回退失败：${err.message}`);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
