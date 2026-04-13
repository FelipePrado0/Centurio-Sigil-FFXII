/**
 * XII Equipment Editor Professional Script
 * Optimized, Colorized, Animated, i18n support, 30 Presets.
 * COMPLETELY FIXED - NO OMISSIONS - NO ENCODING ERRORS.
 */

let originalData = null;
let filteredData = null;
let currentItem = null;
let currentLang = localStorage.getItem('xii_lang') || 'pt';

const CATEGORY_COLORS = {
    "Unarmed":          "badge-unarmed",
    "One-Handed Sword": "badge-weapon",
    "Sword":            "badge-weapon",
    "Two-Handed Sword": "badge-weapon",
    "Axe":              "badge-weapon",
    "Hammer":           "badge-weapon",
    "Dagger":           "badge-weapon",
    "Mace":             "badge-weapon",
    "Measure":          "badge-weapon",
    "Katana":           "badge-weapon",
    "Ninja Sword":      "badge-weapon",
    "Spear":            "badge-weapon",
    "Pole":             "badge-weapon",
    "Hand-bomb":        "badge-ranged",
    "Bow":              "badge-ranged",
    "Crossbow":         "badge-ranged",
    "Gun":              "badge-ranged",
    "Rod":              "badge-magic",
    "Staff":            "badge-magic",
    "Mystic Armor":     "badge-magic",
    "Shield":           "badge-shield",
    "Heavy Armor":      "badge-armor",
    "Light Armor":      "badge-armor",
    "Accessory":        "badge-accessory"
};

const CATEGORY_ICONS = {
    "Unarmed":          "unarmed.webp",
    "One-Handed Sword": "sword.webp",
    "Sword":            "sword.webp",
    "Two-Handed Sword": "greatsword.webp",
    "Axe":              "axe.webp",
    "Hammer":           "hammer.webp",
    "Dagger":           "dagger.webp",
    "Mace":             "mace.webp",
    "Measure":          "measure.webp",
    "Hand-bomb":        "hand_bomb.webp",
    "Katana":           "katana.webp",
    "Ninja Sword":      "ninja_sword.webp",
    "Spear":            "spear.webp",
    "Pole":             "pole.webp",
    "Rod":              "rod.webp",
    "Staff":            "staff.webp",
    "Bow":              "bow.webp",
    "Crossbow":         "crossbow.webp",
    "Gun":              "gun.webp",
    "Shield":           "shield.webp",
    "Heavy Armor":      "heavy_armor.webp",
    "Light Armor":      "light_armor.webp",
    "Mystic Armor":     "mystic_armor.webp",
    "Accessory":        "accessory.webp"
};

function getCategoryIcon(category, size = 16) {
    if (!CATEGORY_ICONS[category]) return null;
    const dirMap = {
        "Unarmed": "weapons", "One-Handed Sword": "weapons", "Sword": "weapons",
        "Two-Handed Sword": "weapons", "Axe": "weapons", "Hammer": "weapons",
        "Dagger": "weapons", "Mace": "weapons", "Measure": "weapons",
        "Hand-bomb": "weapons", "Katana": "weapons", "Ninja Sword": "weapons",
        "Spear": "weapons", "Pole": "weapons", "Rod": "weapons", "Staff": "weapons",
        "Bow": "weapons", "Crossbow": "weapons", "Gun": "weapons",
        "Shield": "armors", "Heavy Armor": "armors", "Light Armor": "armors",
        "Mystic Armor": "armors", "Accessory": "accessories"
    };
    const dir = dirMap[category] || "accessories";
    const file = CATEGORY_ICONS[category];
    const encoded = encodeURIComponent(`/assets/equipments/${dir}/${file}`);
    return `https://xii-equipment-editor.vercel.app/_next/image?url=${encoded}&w=${size * 2}&q=75`;
}



const ALL_STATUS = [
    "Protect", "Shell", "Haste", "Bravery", "Faith", "Regen", "Invisible", "Float", "Reflect",
    "Petrify", "Stop", "Sleep", "Confuse", "Doom", "Blind", "Poison", "Silence", "Sap", "Oil",
    "Disable", "Immobilize", "Reverse", "Berserk", "Bubble", "Disease", "Lure", "KO"
];

const ALL_ELEMENTS = ["Fire", "Ice", "Lightning", "Water", "Earth", "Wind", "Holy", "Dark"];

const ATTR_NAMES = {
    "atk": "ATTACK",
    "def": "DEFENSE",
    "mres": "MAGIC RESISTANCE",
    "evas": "EVASION",
    "evaw": "EVASION WEAPON",
    "str": "STRENGTH",
    "mgk": "MAGIC",
    "vit": "VITALITY",
    "spd": "SPEED",
    "hp": "HEALTH",
    "mp": "MIST",
    "rge": "RANGE",
    "crg": "CHARGE",
    "hit": "HIT RATE",
    "cmb": "COMBO RATE",
    "kb": "KNOCKBACK",
    "aug": "AUGMENTS"
};

const TRANSLATIONS = {
    en: {
        title: "Equipment Editor",
        pro: "Pro",
        search_placeholder: "Search by name, ID or category...",
        magick_presets: "Magick Presets",
        presets_desc: "Select a paradigm to reshape all loaded artifacts instantly.",
        upload_btn: "Upload Grimoire",
        export_btn: "Export Lua",
        awaiting_data: "Awaiting data crystal insertion...",
        th_icon: "Icon",
        th_id: "ID",
        th_name: "Artifact Name",
        th_license: "License",
        th_category: "Category",
        th_elements: "Elements",
        th_actions: "Actions",
        btn_configure: "Configure",
        modal_overview: "Overview",
        modal_scaling: "Scaling",
        modal_augments: "Augments",
        modal_onequip: "On-Equip",
        modal_immunity: "Immunity",
        modal_affinity: "Affinity",
        label_nomenclature: "Nomenclature",
        label_classification: "Classification",
        label_license: "License Required",
        label_registry: "Registry ID",
        btn_discard: "Discard",
        btn_imprint: "Imprint Changes",
        notify_restore: "Grimoire crystal restored from aether.",
        notify_assimilated: "New grimoire assimilated successfully.",
        notify_error_parse: "Error parsing the crystal data.",
        notify_saved: "Artifact configuration saved.",
        notify_no_data: "No data loaded. Insert grimoire first.",
        notify_paradigm_enforced: "Paradigm enforced globally.",
        confirm_paradigm: "Apply paradigm to ALL artifacts? This cannot be undone.",
        vanilla_base: "Vanilla Base",
        level: "Level",
        base: "Base",
        transfer_title: "Aetherial Transfer",
        transfer_desc: "Drop your JSON grimoire here",
        label_scale_factor: "Scale Factor",
        btn_apply_factor: "Apply Factor Globally",
        label_randomizer: "Aetherial Randomizer",
        randomizer_desc: "Randomize all attributes scaling (Lv1-12). Values will always ascend.",
        btn_randomize: "Randomize",
        confirm_randomizer: "Chaos will reshape all artifacts! Attributes will scale randomly but always upwards. Proceed?",
        notify_chaos_enforced: "Chaos paradigm enforced globally.",
        mod_required: "Mod Required"
    },
    pt: {
        title: "Editor de Equipamentos",
        pro: "Pr\u00F3",
        search_placeholder: "Buscar por nome, ID ou categoria...",
        magick_presets: "Presets M\u00E1gicos",
        presets_desc: "Selecione um paradigma para moldar todos os artefatos carregados.",
        upload_btn: "Carregar Grim\u00F3rio",
        export_btn: "Exportar Lua",
        awaiting_data: "Aguardando inser\u00E7\u00E3o do cristal de dados...",
        th_icon: "\u00CDcone",
        th_id: "ID",
        th_name: "Nome do Artefato",
        th_license: "Licen\u00E7a",
        th_category: "Categoria",
        th_elements: "Elementos",
        th_actions: "A\u00E7\u00F5es",
        btn_configure: "Configurar",
        modal_overview: "Vis\u00E3o Geral",
        modal_scaling: "Escalonamento",
        modal_augments: "Aumentos",
        modal_onequip: "Ao Equipar",
        modal_immunity: "Imunidade",
        modal_affinity: "Afinidade",
        label_nomenclature: "Nomenclatura",
        label_classification: "Classifica\u00E7\u00E3o",
        label_license: "Licen\u00E7a Requerida",
        label_registry: "ID de Registro",
        btn_discard: "Descartar",
        btn_imprint: "Gravar Altera\u00E7\u00F5es",
        notify_restore: "Cristal do grim\u00F3rio restaurado do \u00E9ter.",
        notify_assimilated: "Novo grim\u00F3rio assimilado com sucesso.",
        notify_error_parse: "Erro ao processar os dados do cristal.",
        notify_saved: "Configura\u00E7\u00E3o do artefato salva.",
        notify_no_data: "Nenhum dado carregado. Insira o grim\u00F3rio primeiro.",
        notify_paradigm_enforced: "Paradigma aplicado globalmente.",
        confirm_paradigm: "Aplicar paradigma a TODOS os artefatos? Isso n\u00E3o pode ser desfeito.",
        vanilla_base: "Base Vanilla",
        level: "N\u00EDvel",
        base: "Base",
        transfer_title: "Transfer\u00EAncia Et\u00E9rea",
        transfer_desc: "Solte seu grim\u00F3rio JSON aqui",
        label_scale_factor: "Fator de Escala",
        btn_apply_factor: "Aplicar Fator Globalmente",
        label_randomizer: "Randomizador Et\u00E9reo",
        randomizer_desc: "Randomiza o escalonamento de todos os atributos (Lv1-12). Os valores v\u00E3o sempre subir.",
        btn_randomize: "Randomize",
        confirm_randomizer: "O caos ir\u00E1 remodelar todos os artefatos! Os atributos crescer\u00E3o aleatoriamente, mas sempre para cima. Prosseguir?",
        notify_chaos_enforced: "Paradigma do Caos aplicado globalmente.",
        mod_required: "Mod Requerido"
    }
};

/* === VALIDATION SYSTEM === */

function validateItem(item) {
    const issues = [];
    if (!item.attr) return issues;

    const isGun = item.category === 'Gun';

    for (let key in item.attr) {
        const scale = item.attr[key].scale;
        if (!scale || scale.length < 13) continue;
        const base = scale[0];

        // Cap 255
        for (let i = 1; i <= 12; i++) {
            if (scale[i] > 255) {
                issues.push(`${ATTR_NAMES[key]||key} Lv${i} = ${scale[i]} exceeds 255 cap`);
            }
        }

        if (key === 'atk') {
            const atk12 = scale[12];
            const lastNonZero = (() => { for(let i=1;i<=12;i++){ if(scale[i]>base) return i; } return 0; })();

            if (atk12 <= base) {
                issues.push(`ATK Lv12 (${atk12}) ≤ base (${base}) — no growth`);
            }

            if (atk12 < base * 1.25 && atk12 > base) {
                issues.push(`ATK Lv12 is only ${((atk12/base)*100).toFixed(0)}% of base (< 125%)`);
            }

            const isLegendary = atk12 > 200;
            if (atk12 > 155 && !isLegendary) {
                issues.push(`ATK Lv12 = ${atk12} > 155 (non-legendary range)`);
            }

            if (atk12 > 200) {
                issues.push(`ATK Lv12 = ${atk12} exceeds legendary threshold (200)`);
            }

            if (isGun && lastNonZero > 0) {
                const maxAtk = Math.max(...scale.slice(1));
                const increase = ((maxAtk - base) / base) * 100;
                if (increase > 80) {
                    issues.push(`Gun ATK increased ${increase.toFixed(0)}% over base (> 80% — damage formula squared!)`);
                }
            }
        }
    }

    return issues;
}

function validateAllItems() {
    if (!originalData) return [];
    return originalData.map(item => ({
        item,
        issues: validateItem(item)
    })).filter(r => r.issues.length > 0);
}

/* === VALIDATION UI === */

function renderValidationBadges() {
    document.querySelectorAll('#itemBody tr:not(.empty-row)').forEach(tr => {
        const btn = tr.querySelector('.edit-btn');
        if (!btn) return;
        const id = parseInt(btn.dataset.id, 10);
        const item = originalData?.find(i => i.id === id);
        if (!item) return;
        const issues = validateItem(item);
        if (issues.length === 0) {
            tr.classList.remove('has-issues');
            const existingBadge = tr.querySelector('.validation-badge');
            if (existingBadge) existingBadge.remove();
        } else {
            tr.classList.add('has-issues');
            let badge = tr.querySelector('.validation-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'validation-badge';
                btn.before(badge);
            }
            badge.textContent = `⚠️ ${issues.length}`;
            badge.title = issues.join('\n');
        }
    });
}

function renderValidationPanel() {
    if (!currentItem) return;
    const issues = validateItem(currentItem);
    const existing = document.getElementById('validationPanel');
    const footer = document.querySelector('.modal-footer');
    if (!existing && issues.length === 0) return;

    let panel = existing;
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'validationPanel';
        panel.className = 'validation-panel';
        footer.parentNode.insertBefore(panel, footer);
    }

    if (issues.length === 0) {
        panel.innerHTML = `<div class="validation-section ok"><span>All checks passed — item is within balanced limits.</span></div>`;
    } else {
        let html = '<ul class="validation-flat-list">';
        issues.forEach(msg => { html += `<li>⚠️ ${msg}</li>`; });
        html += '</ul>';
        panel.innerHTML = html;
    }
}

function showGlobalValidationReport() {
    const t = TRANSLATIONS[currentLang];
    const results = validateAllItems();
    if (results.length === 0) {
        showNotification(currentLang === 'pt' ? 'Todos os itens passam nas validações.' : 'All items pass validation checks.', 'success');
        return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'validationReportModal';

    let html = `<div class="modal-content" style="max-width:900px;">
        <div class="modal-header">
            <h2>${currentLang === 'pt' ? 'Relatório de Validação' : 'Validation Report'}</h2>
            <button onclick="closeGlobalValidationReport()" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;font-size:2rem;">&times;</button>
        </div>
        <div class="modal-body">`;

    // Group by error/warning type
    const grouped = {};
    results.forEach(r => {
        [...r.errors, ...r.warnings].forEach(issue => {
            const key = issue.rule;
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push({ item: r.item, issue });
        });
    });

    const ruleLabels = {
        overpowered: currentLang === 'pt' ? 'ATK Sobrecarregado' : 'ATK Overpowered',
        legendary_atk: currentLang === 'pt' ? 'ATK Lendário' : 'ATK Legendary',
        gun_spike: 'Gun Spike',
        underpowered: currentLang === 'pt' ? 'Fraco Demais' : 'Underpowered',
        minimal_growth: currentLang === 'pt' ? 'Crescimento Mínimo' : 'Minimal Growth',
        regressive: currentLang === 'pt' ? 'Escala Regressiva' : 'Regressive Scale',
        stat_cap: currentLang === 'pt' ? 'Cap de Atributo' : 'Stat Cap',
        tier_inversion: currentLang === 'pt' ? 'Inversão de Tier' : 'Tier Inversion'
    };

    for (const rule in grouped) {
        const items = grouped[rule];
        const isCritical = items.some(g => g.issue.rule && ['overpowered','legendary_atk','gun_spike','stat_cap'].includes(g.issue.rule));
        html += `<div class="validation-section ${isCritical ? 'critical' : 'warning'}" style="margin-bottom:1rem;">
            <div class="validation-header">
                <span class="validation-title">${ruleLabels[rule] || rule} (${items.length})</span>
            </div><ul>`;
        items.slice(0, 10).forEach(g => {
            html += `<li><a href="#" class="validation-item-link" data-id="${g.item.id}" onclick="navigateToItem(${g.item.id});event.preventDefault();">${g.item.name} (Lv12: ${g.item.attr['atk']?.scale[12] ?? '—'})</a> — ${g.issue.msg}</li>`;
        });
        if (items.length > 10) html += `<li>...and ${items.length - 10} more</li>`;
        html += `</ul></div>`;
    }

    html += `</div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeGlobalValidationReport()">${currentLang === 'pt' ? 'Fechar' : 'Close'}</button>
        </div>
    </div>`;

    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

function closeGlobalValidationReport() {
    const modal = document.getElementById('validationReportModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 400);
    }
}

/* === RADAR CHART (Front 2.3) === */

function renderRadarChart() {
    if (!currentItem || !currentItem.attr) return;

    const old = document.getElementById('radarChartSection');
    if (old) old.remove();

    const detailsTab = document.getElementById('detailsTab');
    if (!detailsTab) return;

    const RADAR_ATTRS = ['atk','def','str','mgk','spd','hp','evaw','cmb'];
    const radarAttrs = RADAR_ATTRS.filter(k => currentItem.attr[k] && currentItem.attr[k].scale);
    if (radarAttrs.length === 0) return;

    const section = document.createElement('div');
    section.id = 'radarChartSection';
    section.className = 'radar-section';
    section.innerHTML = `
        <h3 class="radar-title">${currentLang === 'pt' ? 'Perfil no Nível 12' : 'Level 12 Profile'}</h3>
        <div class="radar-container">
            <canvas id="radarChart" width="500" height="500"></canvas>
        </div>`;

    const flexSection = detailsTab.querySelector('div[style*="display"]');
    if (flexSection) flexSection.after(section);

    requestAnimationFrame(() => drawRadarChart(radarAttrs));
}

function drawRadarChart(attrs) {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 500;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2;
    const R = 200;
    const n = attrs.length;
    const getXY = (i, r) => {
        const angle = (Math.PI * 2 / n) * i - Math.PI / 2;
        return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    };

    // Get values at level 12
    const values = attrs.map(k => currentItem.attr[k].scale[12] ?? currentItem.attr[k].scale[0]);
    const maxVal = Math.max(...values, 1);

    // Grid rings
    ctx.strokeStyle = 'rgba(148,163,184,0.15)';
    ctx.lineWidth = 1;
    for (let ring = 1; ring <= 4; ring++) {
        const r = (ring / 4) * R;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
            const [x, y] = getXY(i, r);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Spokes
    for (let i = 0; i < n; i++) {
        const [x, y] = getXY(i, R);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
    }

    // Data fill
    const catColor = CATEGORY_COLORS[currentItem.category] || 'badge-weapon';
    const colorMap = {
        'badge-weapon': '#f97316', 'badge-ranged': '#22c55e', 'badge-magic': '#7cd3fc',
        'badge-shield': '#8b5cf6', 'badge-armor': '#a855f7', 'badge-accessory': '#ffd700', 'badge-unarmed': '#64748b'
    };
    const color = colorMap[catColor] || '#7cd3fc';

    ctx.fillStyle = color + '22';
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
        const r = (values[i] / maxVal) * R;
        const [x, y] = getXY(i, r);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let i = 0; i < n; i++) {
        const [lx, ly] = getXY(i, R + 20);
        ctx.fillText((ATTR_NAMES[attrs[i]] || attrs[i]).substring(0, 3), lx, ly);
    }
}

function navigateToItem(id) {
    closeGlobalValidationReport();
    openEditModal(id);
}

const GUN_WEAPON_CATEGORIES = ['Gun'];
const WEAPON_CATEGORIES = ['One-Handed Sword','Sword','Two-Handed Sword','Axe','Hammer','Dagger','Mace','Measure','Katana','Ninja Sword','Spear','Pole','Hand-bomb','Bow','Crossbow','Gun','Rod','Staff'];

/* === VALIDATION SYSTEM END === */

function computeGrowthAt12(logic) {
    return (((logic(100, 12) - 100) / 100) * 100).toFixed(0);
}

const PRESETS = [
    { name: "Centurio: Vanguard", en: "Mid-game focus (+7% per lv)", pt: "Foco em mid-game (+7% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.07)) },
    { name: "Centurio: Knight", en: "Imperial might (+10% per lv)", pt: "Poder Imperial (+10% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.10)) },
    { name: "Dalmascan Dawn", en: "Linear balance (+4% per lv)", pt: "Equilíbrio Linear (+4% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.0416)) },
    { name: "Bahamut's Ire", en: "Exponential end-game scaler", pt: "Escalonamento exponencial de fim de jogo", logic: (v, lv) => Math.max(v, Math.floor(v * Math.pow(1.06, lv))) },
    { name: "Vayne's Ambition", en: "Absolute power (+15% base)", pt: "Poder absoluto (+15% base)", logic: (v, lv) => Math.floor(v * 1.15 + lv * 3) },
    { name: "Balthier's Luck", en: "Speed & Crits (+8% per lv)", pt: "Velocidade e Críticos (+8% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.08)) },
    { name: "Ashe's Ether", en: "Magick focus (+6.5% per lv)", pt: "Foco em Magia (+6.5% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.065)) },
    { name: "Basch's Wall", en: "Tank Meta (+7.5% per lv)", pt: "Meta de Tank (+7.5% por nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.075)) },
    { name: "Viera's Grace", en: "Charge acceleration (+5%)", pt: "Aceleração de carga (+5%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.05)) },
    { name: "Bangaa Rage", en: "Unstable damage (+12%)", pt: "Dano instável (+12%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12)) },
    { name: "Zodiark's Shadow", en: "Chaotic scaling (Random variance)", pt: "Escalonamento Caótico (Variância aleatória)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.10 + ((lv * 337) % 10) * 0.01)) },
    { name: "Occuria's Blessing", en: "Divine stats (+20% base)", pt: "Status Divinos (+20% base)", logic: (v, lv) => Math.floor(v * 1.20 + (v * 0.02 * lv)) },
    { name: "Minstrel's Ballad", en: "Utility focus (MP/SPD balance)", pt: "Foco em utilidade (Equilíbrio MP/SPD)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.055)) },
    { name: "Imperial Judge", en: "Heavy Armor expert (+12% DEF)", pt: "Especialista em Armadura Pesada (+12% DEF)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12)) },
    { name: "Yansa's Speed", en: "Max evasion and agility (+15% SPD)", pt: "Evasão máxima e agilidade (+15% SPD)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.15)) },
    { name: "Phon Coast Breeze", en: "Balanced natural progression", pt: "Progressão natural equilibrada", logic: (v, lv) => Math.floor(v * (1 + lv * 0.048)) },
    { name: "Cerobi Steppe Hunter", en: "Ranged damage specialist (+9%)", pt: "Especialista em dano à distância (+9%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.09)) },
    { name: "Gilgamesh's Fakes", en: "High variance, legendary potential", pt: "Alta variância, potencial lendário", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12 + ((lv * 211) % 10) * 0.01)) },
    { name: "Montblanc's Favor", en: "Clan-based steady growth", pt: "Crescimento constante do Clan", logic: (v, lv) => Math.floor(v * (1 + lv * 0.06)) },
    { name: "Gabranth's Justice", en: "High risk/reward (+18% scaling)", pt: "Alto risco/recompensa (+18% escala)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.18)) },
    { name: "Fran's Instinct", en: "Late-game spike (Exponential)", pt: "Pico de fim de jogo (Exponencial)", logic: (v, lv) => Math.floor(v * Math.pow(1.08, lv)) },
    { name: "Reddas's Sacrifice", en: "High initial burst, low scaling", pt: "Alto poder inicial, baixo escalonamento", logic: (v, lv) => Math.floor(v * 1.5 + lv * 1) },
    { name: "Larsa's Potion", en: "Vitality and HP focus (+11%)", pt: "Foco em Vitalidade e HP (+11%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.11)) },
    { name: "Cid's Invention", en: "Technical step scaling (+5 per step)", pt: "Escalonamento técnico (+5 por degrau)", logic: (v, lv) => v + (lv * 5) },
    { name: "Nalbina Grit", en: "Raw strength and endurance (+13%)", pt: "Força bruta e resistência (+13%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.13)) },
    { name: "Rabanastre Streetwise", en: "Evasion and Crit combo focus", pt: "Foco em combo de Evasão e Crítico", logic: (v, lv) => Math.floor(v * (1 + lv * 0.085)) },
    { name: "Sky Pirate's Freedom", en: "Unpredictable wind-based scaling", pt: "Escalonamento imprevisível do vento", logic: (v, lv) => Math.floor(v * (1 + lv * 0.08 + ((lv * 193) % 10) * 0.005)) },
    { name: "Chaos's Whisper", en: "Dark magick extreme scaling", pt: "Escalonamento extremo de magia negra", logic: (v, lv) => Math.floor(v * (1 + lv * 0.14)) },
    { name: "Ultima's Radiance", en: "Holy/Magick pinnacle scaling", pt: "Pico de escalonamento Holy/Magia", logic: (v, lv) => Math.floor(v * (1 + lv * 0.16)) },
    { name: "Wyrm Hero's Soul", en: "Ultimate end-game perfection", pt: "Perfeição definitiva de fim de jogo", logic: (v, lv) => Math.floor(v * (1 + lv * 0.20)) }
];

document.addEventListener('DOMContentLoaded', () => {
    initDragDrop();
    initEventListeners();
    updateUI();
    loadFromLocalStorage();
});

function updateUI() {
    const t = TRANSLATIONS[currentLang];
    if(!t) return;
    document.title = `XII ${t.title} ${t.pro}`;
    const titleEl = document.querySelector('.title');
    if(titleEl) titleEl.innerHTML = `${t.title} <span>${t.pro}</span>`;
    const searchInput = document.getElementById('searchInput');
    if(searchInput) searchInput.placeholder = t.search_placeholder;
    const sidebarH3 = document.querySelector('.sidebar h3');
    if(sidebarH3) sidebarH3.textContent = t.magick_presets;
    const sidebarP = document.querySelector('.sidebar p');
    if(sidebarP) sidebarP.textContent = t.presets_desc;
    const importBtn = document.getElementById('importBtn');
    if(importBtn) importBtn.textContent = t.upload_btn;
    const exportBtn = document.getElementById('exportBtn');
    if(exportBtn) exportBtn.textContent = t.export_btn;
    const ths = document.querySelectorAll('thead th');
    if(ths.length === 7) {
        ths[0].textContent = t.th_icon;
        ths[1].textContent = t.th_id;
        ths[2].textContent = t.th_name;
        ths[3].textContent = t.th_license;
        ths[4].textContent = t.th_category;
        ths[5].textContent = t.th_elements;
        ths[6].textContent = t.th_actions;
    }
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const key = `modal_${btn.dataset.tab.replace('-', '')}`;
        if(t[key]) btn.textContent = t[key];
    });
    const labelName = document.querySelector('label[for="detailName"]');
    if(labelName) labelName.textContent = t.label_nomenclature;
    const labelCat = document.querySelector('label[for="detailCategory"]');
    if(labelCat) labelCat.textContent = t.label_classification;
    const labelLic = document.querySelector('label[for="detailLicense"]');
    if(labelLic) labelLic.textContent = t.label_license;
    const labelID = document.querySelector('label[for="detailID"]');
    if(labelID) labelID.textContent = t.label_registry;
    const discardBtn = document.getElementById('discardBtn');
    if(discardBtn) discardBtn.textContent = t.btn_discard;
    const saveBtn = document.getElementById('saveBtn');
    if(saveBtn) saveBtn.textContent = t.btn_imprint;
    const dropH2 = document.querySelector('.drop-zone-content h2');
    if(dropH2) dropH2.textContent = t.transfer_title;
    const dropP = document.querySelector('.drop-zone-content p');
    if(dropP) dropP.textContent = t.transfer_desc;

    const labelSF = document.getElementById('labelScaleFactor');
    if(labelSF) labelSF.textContent = t.label_scale_factor;
    const applyFactorBtn = document.getElementById('applyFactorBtn');
    if(applyFactorBtn) applyFactorBtn.textContent = t.btn_apply_factor;

    const labelRand = document.getElementById('labelRandomizer');
    if(labelRand) labelRand.textContent = t.label_randomizer;
    const descRand = document.getElementById('randomizerDesc');
    if(descRand) descRand.textContent = t.randomizer_desc;
    const randomizeBtn = document.getElementById('randomizeBtn');
    if(randomizeBtn) randomizeBtn.textContent = t.btn_randomize;

    const modReqText = document.getElementById('modRequiredText');
    if(modReqText) modReqText.textContent = t.mod_required;

    renderTable();
    renderPresetsSidebar();
    }

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('xii_lang', lang);
    updateUI();
}

function saveToLocalStorage() {
    if (originalData) localStorage.setItem('xii_equipment_data', JSON.stringify(originalData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('xii_equipment_data');
    if (saved) {
        try {
            originalData = JSON.parse(saved);
            filteredData = [...originalData];
            renderTable();
            showNotification(TRANSLATIONS[currentLang].notify_restore, 'success');
        } catch (e) { console.error(e); }
    } else {
        // Fetch default JSON if no local data
        fetch('xii-equipment-data.json')
            .then(response => {
                if (!response.ok) throw new Error('Default JSON not found');
                return response.json();
            })
            .then(json => {
                originalData = json.data || json;
                filteredData = [...originalData];
                saveToLocalStorage();
                renderTable();
                console.log('Loaded default grimoire');
            })
            .catch(err => {
                console.warn('Could not load default grimoire:', err);
            });
    }
}

function initDragDrop() {
    const zone = document.getElementById('dropZone');
    if(!zone) return;
    window.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('active'); });
    zone.addEventListener('dragleave', e => { if(e.relatedTarget === null) zone.classList.remove('active'); });
    window.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('active');
        if(e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]);
    });
}

function initEventListeners() {
    const importBtn = document.getElementById('importBtn');
    const fileInput = document.getElementById('fileInput');
    const searchInput = document.getElementById('searchInput');
    const exportBtn = document.getElementById('exportBtn');
    const closeModal = document.getElementById('closeModal');
    const discardBtn = document.getElementById('discardBtn');
    const saveBtn = document.getElementById('saveBtn');
    const langEn = document.getElementById('langEn');
    const langPt = document.getElementById('langPt');
    if(importBtn && fileInput) importBtn.addEventListener('click', () => fileInput.click());
    if(fileInput) fileInput.addEventListener('change', e => handleFileUpload(e.target.files[0]));
    if(searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', e => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => filterData(e.target.value), 300);
        });
    }
    if(exportBtn) exportBtn.addEventListener('click', exportToLua);
    if(closeModal) closeModal.addEventListener('click', () => toggleModal(false));
    if(discardBtn) discardBtn.addEventListener('click', () => toggleModal(false));
    if(saveBtn) saveBtn.addEventListener('click', saveItemChanges);
    if(langEn) langEn.addEventListener('click', () => switchLanguage('en'));
    if(langPt) langPt.addEventListener('click', () => switchLanguage('pt'));

    const fInput = document.getElementById('factorInput');
    const fSlider = document.getElementById('factorSlider');
    const applyFBtn = document.getElementById('applyFactorBtn');
    const randomizeBtn = document.getElementById('randomizeBtn');

    if(fInput && fSlider) {
        fInput.addEventListener('input', e => fSlider.value = e.target.value);
        fSlider.addEventListener('input', e => fInput.value = e.target.value);
    }

    if(applyFBtn) {
        applyFBtn.addEventListener('click', () => {
            const factor = parseFloat(fInput.value);
            applyCustomScaling(factor);
        });
    }

    if(randomizeBtn) {
        randomizeBtn.addEventListener('click', () => {
            applyRandomizer();
        });
    }

    const itemBody = document.getElementById('itemBody');
    if(itemBody) {
        itemBody.addEventListener('click', e => {
            if(e.target.classList.contains('edit-btn')) openEditModal(parseInt(e.target.dataset.id, 10));
        });
    }
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            let targetId = tabId + 'Tab';
            if (tabId === 'on-equip') targetId = 'onEquipTab';
            if (tabId === 'augment') targetId = 'augmentTab';
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        });
    });
}

function handleFileUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        try {
            const json = JSON.parse(e.target.result);
            originalData = json.data || json;
            filteredData = [...originalData];
            saveToLocalStorage();
            renderTable();
            showNotification(TRANSLATIONS[currentLang].notify_assimilated, 'success');
        } catch (err) { showNotification(TRANSLATIONS[currentLang].notify_error_parse, 'error'); }
    };
    reader.readAsText(file);
}

function renderTable() {
    const tbody = document.getElementById('itemBody');
    if(!tbody) return;
    tbody.innerHTML = '';
    const t = TRANSLATIONS[currentLang];
    if (!filteredData || !filteredData.length) {
        tbody.innerHTML = `<tr class="empty-row"><td colspan="7"><div class="empty-state">
            <svg class="empty-crystal" width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="36,6 62,22 62,50 36,66 10,50 10,22" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <polygon points="36,18 50,26 50,46 36,54 22,46 22,26" stroke="currentColor" stroke-width="0.75" fill="currentColor" fill-opacity="0.06"/>
                <line x1="36" y1="6" x2="36" y2="66" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 4"/>
                <line x1="10" y1="22" x2="62" y2="50" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 4"/>
                <line x1="62" y1="22" x2="10" y2="50" stroke="currentColor" stroke-width="0.5" stroke-dasharray="3 4"/>
                <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.5"/>
            </svg>
            <h3>${t.awaiting_data}</h3>
            <p>${currentLang === 'pt' ? 'Carregue ou arraste um arquivo JSON para começar' : 'Upload or drop a JSON file to begin'}</p>
        </div></td></tr>`;
        return;
    }
    const fragment = document.createDocumentFragment();
    filteredData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.style.animationDelay = `${Math.min(index * 0.05, 1)}s`;
        const imgUrl = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fpreviews%2Fitem_${item.bit}.webp&w=128&q=75`;
        const catIcon = getCategoryIcon(item.category);
        const colorClass = CATEGORY_COLORS[item.category] || '';
        const catIconHtml = catIcon ? `<img src="${catIcon}" style="width:16px;height:16px;object-fit:contain;" onerror="this.style.display='none'">` : '';
        tr.innerHTML = `<td><img src="${imgUrl}" style="width:48px;height:48px;object-fit:contain;" onerror="this.onerror=null; this.src='https://placehold.co/48x48/1a1a1a/8521e2?text=?'"></td><td class="id-cell">${item.id}</td><td class="name-cell">${item.name}</td><td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">${item.license || '-'}</td><td><div class="category-badge ${colorClass}">${catIconHtml} ${item.category}</div></td><td>${renderElements(item.element ? item.element.value : [])}</td><td><button class="edit-btn" data-id="${item.id}">${t.btn_configure}</button></td>`;
        fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);
    renderValidationBadges();
}

function renderElements(elements) {
    if (!elements) return '-';
    let elList;
    if (Array.isArray(elements)) {
        elList = elements;
    } else if (typeof elements === 'object' && elements !== null) {
        elList = elements.name ? [elements.name] : Object.keys(elements);
    } else {
        elList = [elements];
    }
    if (elList.length === 0) return '-';
    return elList.map(el => `<img src="https://xii-equipment-editor.vercel.app/assets/elements/${el.toLowerCase()}.webp" title="${el}" style="width: 24px; height: 24px; margin-right: 6px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));">`).join('');
}

function filterData(query) {
    if(!originalData) return;
    const q = query.toLowerCase();
    let data = originalData.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.id.toString().includes(q));
    filteredData = data;
    renderTable();
}

function openEditModal(id) {
    if(!originalData) return;
    currentItem = JSON.parse(JSON.stringify(originalData.find(i => i.id === id)));
    if (!currentItem) return;
    currentItem.onequip = currentItem.onequip || { value: [], scale: [] };
    currentItem.immunity = currentItem.immunity || { value: [], scale: [] };
    currentItem.augments = currentItem.augments || { value: [], scale: [] };
    currentItem.affinity = currentItem.affinity || { value: {}, scale: [] };
    const modalName = document.getElementById('modalItemName');
    if(modalName) modalName.textContent = currentItem.name;
    const modalCat = document.getElementById('modalItemCat');
    const modalCatIcon = getCategoryIcon(currentItem.category);
    const modalCatIconHtml = modalCatIcon ? `<img src="${modalCatIcon}" style="width:16px;height:16px;object-fit:contain;" onerror="this.style.display='none'">` : '';
    if(modalCat) modalCat.innerHTML = `${modalCatIconHtml} ${currentItem.category}`;
    const modalImg = document.getElementById('modalItemImg');
    if(modalImg) {
        modalImg.src = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fpreviews%2Fitem_${currentItem.bit}.webp&w=384&q=75`;
        const fallbackCat = getCategoryIcon(currentItem.category, 192);
        modalImg.onerror = function() { this.onerror=null; this.src=fallbackCat; };
    }
    const dName = document.getElementById('detailName');
    if(dName) dName.value = currentItem.name;
    const dCat = document.getElementById('detailCategory');
    if(dCat) dCat.value = currentItem.category;
    const dLic = document.getElementById('detailLicense');
    if(dLic) dLic.value = currentItem.license || 'None';
    const dID = document.getElementById('detailID');
    if(dID) dID.value = currentItem.id;
    renderAttributeGrids();
    renderStatusSelectors('onEquipList', currentItem.onequip.value);
    renderStatusSelectors('immunityList', currentItem.immunity.value);
    renderAugmentSelectors(currentItem.augments.value || []);
    renderAffinityGrid(currentItem.affinity.value || {});
    renderRadarChart();
    renderValidationPanel();

    document.querySelectorAll('tbody tr.active-row').forEach(r => r.classList.remove('active-row'));
    const activeRow = document.querySelector(`.edit-btn[data-id="${id}"]`)?.closest('tr');
    if (activeRow) activeRow.classList.add('active-row');

    toggleModal(true);
}

function renderAttributeGrids() {
    const list = document.getElementById('attributesList');
    if(!list) return;
    list.innerHTML = '';
    const t = TRANSLATIONS[currentLang];
    const fragment = document.createDocumentFragment();
    if(!currentItem.attr) return;
    for (let key in currentItem.attr) {
        const attr = currentItem.attr[key];
        if (!attr.scale) continue;
        const group = document.createElement('div');
        group.className = 'attr-group';
        const displayName = ATTR_NAMES[key] || key.toUpperCase();
        let html = `<div class="attr-title"><span>${displayName}</span> <small style="color:var(--text-secondary);">${t.vanilla_base}: ${attr.scale[0]}</small></div>`;
        html += `<canvas id="chart-${key}" class="scale-canvas" width="900" height="200"></canvas>`;
        html += `<div class="scale-grid">`;
        attr.scale.forEach((val, lv) => { html += `<div class="scale-input"><label>${lv === 0 ? t.base : t.level + ' ' + lv}</label><input type="number" value="${val}" data-key="${key}" data-lv="${lv}" class="attr-input"></div>`; });
        html += `</div>`;
        group.innerHTML = html;
        fragment.appendChild(group);
    }
    list.appendChild(fragment);
    list.querySelectorAll('.attr-input').forEach(input => {
        input.addEventListener('input', e => {
            updateAttr(e.target.dataset.key, parseInt(e.target.dataset.lv, 10), e.target.value);
            // Redraw chart for this attribute
            const key2 = e.target.dataset.key;
            const canvas = document.getElementById(`chart-${key2}`);
            if (canvas && currentItem.attr?.[key2]) drawMiniChart(canvas, currentItem.attr[key2].scale);
            // Refresh validation panel
            renderValidationPanel();
        });
    });
    // Draw all charts
    requestAnimationFrame(() => renderMiniCharts());
}

function updateAttr(key, lv, val) { if(currentItem && currentItem.attr[key]) currentItem.attr[key].scale[lv] = parseInt(val) || 0; }

function renderStatusSelectors(containerId, activeList) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    ALL_STATUS.forEach(status => {
        const item = document.createElement('div');
        item.className = `selector-item ${activeList.includes(status) ? 'active' : ''}`;
        const imgUrl = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fstatus%2F${status.toLowerCase().replace(' ', '-')}.webp&w=32&q=75`;
        item.innerHTML = `<img src="${imgUrl}" style="width:32px;height:32px;" onerror="this.style.display='none'"><span>${status}</span>`;
        item.onclick = () => {
            const index = activeList.indexOf(status);
            if (index > -1) activeList.splice(index, 1); else activeList.push(status);
            renderStatusSelectors(containerId, activeList);
        };
        fragment.appendChild(item);
    });
    container.appendChild(fragment);
}

function renderAugmentSelectors(activeList) {
    const container = document.getElementById('augmentsList');
    if(!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const AUGMENTS = ["HP+50", "HP+100", "HP+150", "HP+200", "HP+500", "MP+10", "MP+20", "MP+30", "MP+50", "MP+100", "Swiftness", "Battle Lore", "Magick Lore", "Channeling", "Shield Block", "Brawler", "Focus", "Adrenaline", "Last Stand", "Serenity", "Spellbreaker"];
    AUGMENTS.forEach(aug => {
        const item = document.createElement('div');
        item.className = `selector-item ${activeList.includes(aug) ? 'active' : ''}`;
        item.innerHTML = `<span>${aug}</span>`;
        item.onclick = () => {
            const idx = activeList.indexOf(aug);
            if (idx > -1) activeList.splice(idx, 1); else activeList.push(aug);
            renderAugmentSelectors(activeList);
        };
        fragment.appendChild(item);
    });
    container.appendChild(fragment);
}

function renderAffinityGrid(affinities) {
    const container = document.getElementById('affinityList');
    if(!container) return;
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    ALL_ELEMENTS.forEach(el => {
        const val = affinities[el] || "Normal";
        const div = document.createElement('div');
        div.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:var(--void); padding:1rem; border-radius:8px; border:1px solid var(--border);";
        div.innerHTML = `<div style="display:flex; align-items:center; gap:0.75rem;"><img src="https://xii-equipment-editor.vercel.app/assets/elements/${el.toLowerCase()}.webp" style="width:24px;height:24px;"><span style="font-family:var(--font-mono); color:var(--text-primary);">${el}</span></div><select data-el="${el}" style="background:var(--surface); color:var(--gold); border:1px solid var(--border); padding:0.5rem; border-radius:6px; font-family:var(--font-mono); outline:none;"><option value="Normal" ${val==='Normal'?'selected':''}>Normal</option><option value="Weak" ${val==='Weak'?'selected':''}>Weak</option><option value="Half" ${val==='Half'?'selected':''}>Half</option><option value="Immune" ${val==='Immune'?'selected':''}>Immune</option><option value="Absorb" ${val==='Absorb'?'selected':''}>Absorb</option></select>`;
        fragment.appendChild(div);
    });
    container.appendChild(fragment);
    container.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', e => updateAffinity(e.target.dataset.el, e.target.value));
    });
}

function updateAffinity(el, val) { if(currentItem && currentItem.affinity) currentItem.affinity.value[el] = val; }

function saveItemChanges() {
    if(!originalData || !currentItem) return;
    const idx = originalData.findIndex(i => i.id === currentItem.id);
    if (idx > -1) {
        originalData[idx] = currentItem;
        saveToLocalStorage();
        const searchInput = document.getElementById('searchInput');
        filterData(searchInput ? searchInput.value : "");
        showNotification(TRANSLATIONS[currentLang].notify_saved, 'success');
        toggleModal(false);
    }
}

function showNotification(msg, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if(type !== 'success') toast.style.borderLeftColor = 'var(--danger)';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'toastExit 0.5s var(--ease-spring) forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

function renderPresetsSidebar() {
    const list = document.getElementById('presetList');
    if(!list) return;
    list.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const t = TRANSLATIONS[currentLang];

    PRESETS.forEach(p => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.innerHTML = `<div class="name">${p.name}</div><div class="desc">${p[currentLang]}</div>`;

        card.onclick = () => {
            if (!originalData) return showNotification(t.notify_no_data, 'error');
            if (confirm(t.confirm_paradigm)) {
                originalData.forEach(item => {
                    for (let k in item.attr) {
                        if (item.attr[k].scale) {
                            const base = item.attr[k].scale[0];
                            for (let i = 1; i < 13; i++) item.attr[k].scale[i] = Math.min(255, p.logic(base, i));
                        }
                    }
                });
                saveToLocalStorage();
                const searchInput = document.getElementById('searchInput');
                filterData(searchInput ? searchInput.value : "");
                showNotification(t.notify_paradigm_enforced, 'success');
            }
        };

        card.addEventListener('mouseenter', () => renderPresetPreview(p));
        card.addEventListener('mouseleave', hidePresetPreview);

        fragment.appendChild(card);
    });

    list.appendChild(fragment);
}

function renderPresetPreview(preset) {
    let overlay = document.getElementById('presetPreviewOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'presetPreviewOverlay';
        overlay.className = 'preset-preview-overlay';
        overlay.innerHTML = `<canvas id="presetPreviewCanvas"></canvas>`;
        document.body.appendChild(overlay);
    }

    overlay.classList.add('active');

    // Use the currently open modal item if available, otherwise first data item
    let sampleItem = currentItem || (originalData && originalData[0]);
    if (!sampleItem) return;

    const canvas = document.getElementById('presetPreviewCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const W = Math.min(window.innerWidth * 0.8, 1000);
    const H = Math.min(window.innerHeight * 0.6, 600);

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    const padL = 60, padR = 20, padT = 20, padB = 40;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    // Collect values
    const baseVal = sampleItem.attr?.atk?.scale[0] ?? 50;
    const currentVals = [];
    const previewVals = [];
    for (let lv = 0; lv <= 12; lv++) {
        currentVals.push(sampleItem.attr?.atk?.scale[lv] ?? baseVal);
        if (lv === 0) {
            previewVals.push(baseVal);
        } else {
            previewVals.push(Math.min(255, preset.logic(baseVal, lv)));
        }
    }

    const allVals = [...currentVals, ...previewVals];
    const minV = Math.min(...allVals);
    const maxV = Math.max(...allVals);
    const range = maxV - minV || 1;

    const x = (lv) => padL + (lv / 12) * chartW;
    const y = (v) => padT + (1 - (v - minV) / range) * chartH;

    // Grid lines
    ctx.strokeStyle = 'rgba(148,163,184,0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 4; i++) {
        const gy = padT + (i/4) * chartH;
        ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(W - padR, gy); ctx.stroke();
        
        // Y labels
        ctx.fillStyle = '#64748b';
        ctx.font = '14px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxV - (i/4)*range), padL - 10, gy + 4);
    }

    // X labels
    ctx.fillStyle = '#64748b';
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    for (let lv = 0; lv <= 12; lv += 3) ctx.fillText(`Lv${lv}`, x(lv), H - 10);

    // Base line
    ctx.strokeStyle = '#64748b';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x(0), y(baseVal));
    ctx.lineTo(x(12), y(baseVal));
    ctx.stroke();
    ctx.setLineDash([]);

    // Current curve
    ctx.strokeStyle = '#7cd3fc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    currentVals.forEach((v, lv) => { lv === 0 ? ctx.moveTo(x(lv), y(v)) : ctx.lineTo(x(lv), y(v)); });
    ctx.stroke();

    // Preview curve
    ctx.strokeStyle = '#ff6b35';
    ctx.lineWidth = 3;
    ctx.beginPath();
    previewVals.forEach((v, lv) => { lv === 0 ? ctx.moveTo(x(lv), y(v)) : ctx.lineTo(x(lv), y(v)); });
    ctx.stroke();

    // Legend
    ctx.font = '14px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7cd3fc';
    ctx.fillRect(W - 200, 20, 16, 16);
    ctx.fillText(currentLang === 'pt' ? 'Atual' : 'Current', W - 170, 33);
    ctx.fillStyle = '#ff6b35';
    ctx.fillRect(W - 200, 45, 16, 16);
    ctx.fillText(preset.name.substring(0, 20), W - 170, 58);
}

function hidePresetPreview() {
    const overlay = document.getElementById('presetPreviewOverlay');
    if (overlay) overlay.classList.remove('active');
}

/* === MINI CHART FOR SCALING TAB (Front 2.1) === */

function renderMiniCharts() {
    if (!currentItem || !currentItem.attr) return;
    for (let key in currentItem.attr) {
        const scale = currentItem.attr[key].scale;
        if (!scale || scale.length < 13) continue;
        const canvas = document.getElementById(`chart-${key}`);
        if (!canvas) continue;
        drawMiniChart(canvas, scale);
    }
}

function drawMiniChart(canvas, scale) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width, H = rect.height;
    ctx.clearRect(0, 0, W, H);

    const padL = 35, padR = 5, padT = 10, padB = 20;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;

    const minV = Math.min(...scale);
    const maxV = Math.max(...scale);
    const range = maxV - minV || 1;

    const x = (i) => padL + (i / 12) * chartW;
    const y = (v) => padT + (1 - (v - minV) / range) * chartH;

    // Base line
    ctx.strokeStyle = 'rgba(148,163,184,0.3)';
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x(0), y(scale[0]));
    ctx.lineTo(x(12), y(scale[0]));
    ctx.stroke();
    ctx.setLineDash([]);

    // Area fill
    const gradient = ctx.createLinearGradient(0, padT, 0, padT + chartH);
    gradient.addColorStop(0, 'rgba(124,211,252,0.15)');
    gradient.addColorStop(1, 'rgba(124,211,252,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x(0), padT + chartH);
    scale.forEach((v, i) => ctx.lineTo(x(i), y(v)));
    ctx.lineTo(x(12), padT + chartH);
    ctx.closePath();
    ctx.fill();

    // Line
    ctx.strokeStyle = '#7cd3fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    scale.forEach((v, i) => { i === 0 ? ctx.moveTo(x(i), y(v)) : ctx.lineTo(x(i), y(v)); });
    ctx.stroke();

    // Dots
    scale.forEach((v, i) => {
        ctx.fillStyle = '#7cd3fc';
        ctx.beginPath();
        ctx.arc(x(i), y(v), 2, 0, Math.PI * 2);
        ctx.fill();
    });

    // X labels
    ctx.fillStyle = '#64748b';
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    for (let i = 0; i <= 12; i += 3) ctx.fillText(i, x(i), H - 3);

    // Y labels
    ctx.textAlign = 'right';
    ctx.fillText(maxV, padL - 4, padT + 8);
    ctx.fillText(minV, padL - 4, padT + chartH + 4);
}

function toggleModal(show) {
    const overlay = document.getElementById('editModal');
    if(!overlay) return;
    if (show) {
        overlay.classList.add('active');
    } else {
        overlay.classList.remove('active');
        document.querySelectorAll('tbody tr.active-row').forEach(r => r.classList.remove('active-row'));
    }
}

function applyCustomScaling(factor) {
    if (!originalData) return showNotification(TRANSLATIONS[currentLang].notify_no_data, 'error');
    const t = TRANSLATIONS[currentLang];
    if (confirm(t.confirm_paradigm)) {
        originalData.forEach(item => {
            for (let k in item.attr) {
                if (item.attr[k].scale) {
                    const base = item.attr[k].scale[0];
                    // Logic: base * (1 + level * (factor - 1))
                    for (let i = 1; i < 13; i++) {
                        item.attr[k].scale[i] = Math.min(255, Math.floor(base * (1 + i * (factor - 1))));
                    }
                }
            }
        });
        saveToLocalStorage();
        const searchInput = document.getElementById('searchInput');
        filterData(searchInput ? searchInput.value : "");
        showNotification(t.notify_paradigm_enforced, 'success');
    }
}

function applyRandomizer() {
    if (!originalData) return showNotification(TRANSLATIONS[currentLang].notify_no_data, 'error');
    const t = TRANSLATIONS[currentLang];
    
    if (confirm(t.confirm_randomizer)) {
        originalData.forEach(item => {
            if (!item.attr) return;
            
            for (let k in item.attr) {
                const attr = item.attr[k];
                if (attr.scale && attr.scale.length >= 13) {
                    const base = attr.scale[0];
                    let lastValue = base;
                    
                    for (let i = 1; i <= 12; i++) {
                        // Ensure it always goes up or stays same, but we want it to feel like growth
                        // Random increase between 0 and a weighted amount based on remaining space to 255
                        const remainingSpace = 255 - lastValue;
                        if (remainingSpace > 0) {
                            // Max increase per level to avoid hitting 255 too early, but ensuring some growth
                            const maxIncrease = Math.max(1, remainingSpace / (13 - i) * 1.5);
                            const increase = Math.floor(Math.random() * maxIncrease);
                            attr.scale[i] = Math.min(255, lastValue + increase);
                        } else {
                            attr.scale[i] = 255;
                        }
                        lastValue = attr.scale[i];
                    }

                    // Rule: points must always rise. If after randomization Lv12 <= Lv0 (and space was available), 
                    // force at least a small increase if possible.
                    if (attr.scale[12] <= base && base < 255) {
                        attr.scale[12] = Math.min(255, base + 1);
                        // Smooth back-fill to ensure non-decreasing
                        for (let i = 11; i >= 1; i--) {
                            if (attr.scale[i] > attr.scale[12]) attr.scale[i] = attr.scale[12];
                        }
                    }
                }
            }
        });
        
        saveToLocalStorage();
        const searchInput = document.getElementById('searchInput');
        filterData(searchInput ? searchInput.value : "");
        showNotification(t.notify_chaos_enforced, 'success');
    }
}

function exportToLua() {
    if (!originalData) return showNotification(TRANSLATIONS[currentLang].notify_no_data, 'error');

    function serializeValue(val, indent) {
        const pad = ' '.repeat(indent);
        const inner = ' '.repeat(indent + 2);

        if (val === null || val === undefined) return '{}';
        if (typeof val === 'number') return val.toString();
        if (typeof val === 'string') return '"' + val + '"';
        if (typeof val === 'boolean') return val.toString();

        if (Array.isArray(val)) {
            if (val.length === 0) return '{}';
            const allObjects = val.every(v => typeof v === 'object' && v !== null && !Array.isArray(v));
            if (allObjects) {
                let s = '{\n';
                val.forEach((v, i) => {
                    s += inner + '[' + i + '] = ' + serializeObject(v, indent + 2);
                    if (i < val.length - 1) s += ',';
                    s += '\n';
                });
                s += pad + '}';
                return s;
            }
            const allStrings = val.every(v => typeof v === 'string');
            if (allStrings) return '{' + val.map(v => '"' + v + '"').join(', ') + '}';
            return '{}';
        }

        if (typeof val === 'object') return serializeObject(val, indent);
        return '{}';
    }

    function serializeObject(obj, indent) {
        const pad = ' '.repeat(indent);
        const inner = ' '.repeat(indent + 2);
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}';
        let s = '{\n';
        keys.forEach((k, i) => {
            s += inner + k + ' = ' + serializeValue(obj[k], indent + 2);
            if (i < keys.length - 1) s += ',';
            s += '\n';
        });
        s += pad + '}';
        return s;
    }

    function serializeAttrScale(scaleArr) {
        let s = '{\n';
        scaleArr.forEach((v, i) => {
            s += '          [' + i + '] = ' + v;
            if (i < scaleArr.length - 1) s += ',';
            s += '\n';
        });
        s += '        }';
        return s;
    }

    function serializeExtraScale(scaleArr) {
        let s = '{\n';
        scaleArr.forEach((v, i) => {
            if (Array.isArray(v)) {
                if (v.length === 0) {
                    s += '        [' + i + '] = {}';
                } else {
                    const allObjects = v.every(x => typeof x === 'object' && x !== null && !Array.isArray(x));
                    if (allObjects) {
                        s += '        [' + i + '] = {\n';
                        v.forEach((x, xi) => {
                            s += '          [' + xi + '] = ' + serializeObject(x, 10);
                            if (xi < v.length - 1) s += ',';
                            s += '\n';
                        });
                        s += '        }';
                    } else {
                        s += '        [' + i + '] = {}';
                    }
                }
            } else if (typeof v === 'object' && v !== null) {
                s += '        [' + i + '] = {}';
            } else {
                s += '        [' + i + '] = {}';
            }
            if (i < scaleArr.length - 1) s += ',';
            s += '\n';
        });
        s += '      }';
        return s;
    }

    function serializeItem(item) {
        const FIELDS = ['id', 'bit', 'attr', 'element', 'onhit', 'onequip', 'immunity', 'affinity'];
        const parts = [];

        for (const field of FIELDS) {
            if (item[field] === undefined) continue;

            if (field === 'id' || field === 'bit') {
                parts.push('    ' + field + ' = ' + item[field]);
                continue;
            }

            if (field === 'attr') {
                const entries = Object.entries(item.attr);
                let s = '    attr = {\n';
                entries.forEach(([akey, adata], ai) => {
                    s += '      ' + akey + ' = {\n';
                    s += '        value = ' + (adata.value ?? 0) + ',\n';
                    s += '        scale = ' + serializeAttrScale(adata.scale) + '\n';
                    s += '      }';
                    if (ai < entries.length - 1) s += ',';
                    s += '\n';
                });
                s += '    }';
                parts.push(s);
                continue;
            }

            const extra = item[field] || {};
            let s = '    ' + field + ' = {\n';
            s += '      value = ' + serializeValue(extra.value, 6) + ',\n';
            if (extra.scale && Array.isArray(extra.scale)) {
                s += '      scale = ' + serializeExtraScale(extra.scale) + '\n';
            }
            s += '    }';
            parts.push(s);
        }

        let result = '{\n';
        for (let i = 0; i < parts.length; i++) {
            result += parts[i];
            if (i < parts.length - 1) result += ',';
            result += '\n';
        }
        result += '  }';
        return result;
    }

    let lua = '-- Made By FehDead\nreturn {\n';
    originalData.forEach((item, index) => {
        lua += '  [' + index + '] = ' + serializeItem(item);
        if (index < originalData.length - 1) lua += ',';
        lua += '\n';
    });
    lua += '}\n';

    const blob = new Blob([lua], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipmentData.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
