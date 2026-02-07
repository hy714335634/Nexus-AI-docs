/**
 * Nexus-AI 架构报告 - 交互脚本
 * 从 architect-report.html 提取
 */

/* ---- 主题切换 ---- */
(function initTheme() {
    var saved = localStorage.getItem('nexus-report-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
    }
    updateThemeIcon();
})();

function updateThemeIcon() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.title = isDark ? '切换到浅色主题' : '切换到深色主题';
}

document.getElementById('themeToggle').addEventListener('click', function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('nexus-report-theme', next);
    updateThemeIcon();
});

/* ---- Tab 切换 ---- */
document.querySelectorAll('.tabs').forEach(function(tabGroup) {
    tabGroup.querySelectorAll('.tab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');
            tabGroup.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            var parent = tabGroup.parentElement;
            parent.querySelectorAll('.tab-panel').forEach(function(panel) {
                panel.classList.remove('active');
            });
            var target = document.getElementById(tabId);
            if (target) {
                target.classList.add('active');
                /* 渲染当前 tab 中缓存的 Mermaid 图表 */
                renderMermaidInElement(target);
            }
        });
    });
});

/* ---- Mermaid 按需渲染辅助函数 ---- */
function renderMermaidInElement(el) {
    if (typeof mermaid === 'undefined') return;
    /* 查找有缓存源码但尚未渲染的 mermaid 元素 */
    var pending = el.querySelectorAll('.mermaid[data-mermaid-source]');
    if (pending.length === 0) return;

    pending.forEach(function(node) {
        /* 恢复原始 mermaid 源码 */
        node.textContent = node.getAttribute('data-mermaid-source');
        node.removeAttribute('data-mermaid-source');
        /* 清除 mermaid 可能留下的处理标记 */
        node.removeAttribute('data-processed');
    });

    try {
        mermaid.run({ nodes: Array.from(pending) });
    } catch (e) {
        try { mermaid.init(undefined, Array.from(pending)); } catch (e2) { /* 忽略 */ }
    }
}

/* ---- 侧边栏导航高亮 ---- */
var sectionIds = ['overview', 'architecture', 'modules', 'flows', 'issues', 'api', 'verification'];
var sidebarLinks = document.querySelectorAll('.sidebar-nav a');
var navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    var scrollPos = window.scrollY + 120;
    var activeId = sectionIds[0];
    for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
            activeId = sectionIds[i];
        }
    }
    sidebarLinks.forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
    navLinks.forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + activeId);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* ---- 回到顶部按钮 ---- */
var backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- 移动端侧边栏 ---- */
var sidebar = document.getElementById('sidebar');
var overlay = document.getElementById('sidebarOverlay');

document.getElementById('mobileMenuBtn').addEventListener('click', function() {
    sidebar.classList.toggle('open');
    overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
});

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.style.display = 'none';
}

sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
            closeSidebar();
        }
    });
});

/* ---- 搜索功能 ---- */
document.getElementById('searchInput').addEventListener('input', function() {
    var query = this.value.toLowerCase().trim();
    var sections = document.querySelectorAll('.section');
    if (!query) {
        sections.forEach(function(s) { s.style.display = ''; });
        return;
    }
    sections.forEach(function(s) {
        var text = s.textContent.toLowerCase();
        s.style.display = text.indexOf(query) !== -1 ? '' : 'none';
    });
});

/* ---- Mermaid 图表渲染 ---- */
(function loadMermaid() {
    /*
     * 策略：在加载 mermaid.js 之前，将隐藏 tab 中的 .mermaid 元素的
     * 原始文本保存到 data-mermaid-source 属性中，然后清空元素内容。
     * 这样 mermaid 初始化时只会处理可见的图表。
     * 切换 tab 时，renderMermaidInElement() 会恢复源码并渲染。
     */
    document.querySelectorAll('.tab-panel:not(.active) .mermaid').forEach(function(node) {
        node.setAttribute('data-mermaid-source', node.textContent.trim());
        node.textContent = '';
    });

    var script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.onload = function() {
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        mermaid.initialize({
            startOnLoad: false,
            theme: isDark ? 'dark' : 'default',
            securityLevel: 'loose',
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
            sequence: { useMaxWidth: true }
        });
        /* 只渲染当前可见（active tab）的 mermaid 元素 */
        var visible = document.querySelectorAll('.mermaid:not([data-mermaid-source])');
        if (visible.length > 0) {
            try {
                mermaid.run({ nodes: Array.from(visible) });
            } catch (e) {
                try { mermaid.init(undefined, Array.from(visible)); } catch (e2) { /* 忽略 */ }
            }
        }
    };
    document.head.appendChild(script);
})();

/* ---- 导出 PDF 功能 ---- */
(function addExportButton() {
    var nav = document.querySelector('.nav-actions');
    if (!nav) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('aria-label', 'Export PDF');
    btn.title = '导出 PDF';
    btn.textContent = '📄';
    btn.style.marginLeft = '8px';
    btn.addEventListener('click', function() {
        window.print();
    });
    nav.appendChild(btn);
})();

/* ---- API 表格折叠/展开 ---- */
document.querySelectorAll('.api-group-header').forEach(function(header) {
    var table = header.nextElementSibling;
    if (table && table.tagName === 'TABLE') {
        var indicator = document.createElement('span');
        indicator.textContent = '▼';
        indicator.style.cssText = 'margin-left:auto;font-size:0.75rem;transition:transform 0.2s;';
        header.style.cursor = 'pointer';
        header.appendChild(indicator);
        header.addEventListener('click', function() {
            var isHidden = table.style.display === 'none';
            table.style.display = isHidden ? 'table' : 'none';
            indicator.style.transform = isHidden ? '' : 'rotate(-90deg)';
        });
    }
});

/* ---- 图表容器点击展开/收起 ---- */
document.querySelectorAll('.diagram-container h4').forEach(function(title) {
    title.style.cursor = 'pointer';
    title.title = '点击展开/收起';
    var content = title.nextElementSibling;
    title.addEventListener('click', function() {
        if (content) {
            var isHidden = content.style.display === 'none';
            content.style.display = isHidden ? '' : 'none';
        }
    });
});
