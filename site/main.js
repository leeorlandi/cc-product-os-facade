const TAB_DATA = {
  context: {
    path: '~/product-os/context $',
    lsOutput: `<span class="t-line t-prompt">ls -la</span>
<span class="t-line t-green">drwxr-xr-x  strategy.md</span>
<span class="t-line t-green">drwxr-xr-x  north-star.md</span>
<span class="t-line t-green">drwxr-xr-x  customer-segments.md</span>
<span class="t-line t-green">drwxr-xr-x  competitive-landscape.md</span>
<span class="t-line t-comment">// last updated: 2025-04-01</span>`,
    fileLabel: 'context/strategy.md',
    fileContent: `<span class="t-line t-comment">## Product Strategy — Q2 2025</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">north star:</span>
<span class="t-line t-val t-indent">Default tool for solo PM teams</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">focus this quarter:</span>
<span class="t-line t-val t-indent">Activation, not acquisition.</span>
<span class="t-line t-val t-indent">Drop-off at step 3 is the constraint.</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">not doing:</span>
<span class="t-line t-val t-indent">Integrations. Enterprise tier. API.</span>`
  },
  planning: {
    path: '~/product-os/planning $',
    lsOutput: `<span class="t-line t-prompt">ls -la</span>
<span class="t-line t-green">drwxr-xr-x  now.md</span>
<span class="t-line t-green">drwxr-xr-x  roadmap-q2.md</span>
<span class="t-line t-green">drwxr-xr-x  backlog-parking-lot.md</span>
<span class="t-line t-green">drwxr-xr-x  sprint-42.md</span>
<span class="t-line t-comment">// updated every monday</span>`,
    fileLabel: 'planning/now.md',
    fileContent: `<span class="t-line t-comment">## Now — week of 2025-04-07</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">this week:</span>
<span class="t-line t-val t-indent">Ship onboarding step 3 redesign</span>
<span class="t-line t-val t-indent">Interview 3 churned users</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">active blocker:</span>
<span class="t-line t-val t-indent">Pricing copy not approved (→ Marta, ETA Thu)</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">parking lot:</span>
<span class="t-line t-val t-indent">API roadmap — revisit Q3</span>`
  },
  teams: {
    path: '~/product-os/teams $',
    lsOutput: `<span class="t-line t-prompt">ls -la</span>
<span class="t-line t-green">drwxr-xr-x  growth/</span>
<span class="t-line t-green">drwxr-xr-x  platform/</span>
<span class="t-line t-green">drwxr-xr-x  core/</span>
<span class="t-line t-green">drwxr-xr-x  design/</span>
<span class="t-line t-comment">// one folder per team</span>`,
    fileLabel: 'teams/growth/team.md',
    fileContent: `<span class="t-line t-comment">## Growth Team</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">lead:</span><span class="t-val"> Jamie Chen</span>
<span class="t-line t-key">focus:</span>
<span class="t-line t-val t-indent">Activation funnel — step 3 drop-off</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">current sprint:</span>
<span class="t-line t-val t-indent">Redesigned empty state + progress indicator</span>
<span class="t-line">&nbsp;</span>
<span class="t-line t-key">known constraint:</span>
<span class="t-line t-val t-indent">No eng bandwidth until May 5</span>`
  }
};

document.addEventListener('DOMContentLoaded', () => {

  // ── Theme toggle ──────────────────────────────────────
  const THEME_KEY = 'cc-theme';
  const root = document.documentElement;
  const themeBtns = document.querySelectorAll('[data-theme-btn]');

  function applyTheme(value) {
    // 'system' = remove attribute and let CSS media query decide
    if (value === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', value);
    }
    themeBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.themeBtn === value);
    });
  }

  const saved = localStorage.getItem(THEME_KEY) || 'system';
  applyTheme(saved);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.themeBtn;
      localStorage.setItem(THEME_KEY, value);
      applyTheme(value);
    });
  });

  // ── Tab switcher ──────────────────────────────────────
  const tabs      = document.querySelectorAll('.tab');
  const pathEl    = document.getElementById('tab-path');
  const lsEl      = document.getElementById('tab-ls');
  const labelEl   = document.getElementById('tab-file-label');
  const fileEl    = document.getElementById('tab-file');

  function renderTab(key) {
    const d = TAB_DATA[key];
    pathEl.textContent  = d.path;
    lsEl.innerHTML      = d.lsOutput;
    labelEl.textContent = d.fileLabel;
    fileEl.innerHTML    = d.fileContent;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.dataset.tab);
    });
  });

  renderTab('context');
});
