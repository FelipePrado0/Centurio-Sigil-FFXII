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

const CATEGORY_EMOJIS = {
    "Unarmed": "\uD83E\uDD1D", 
    "One-Handed Sword": "\u2694\uFE0F", 
    "Sword": "\u2694\uFE0F", 
    "Two-Handed Sword": "\u2694\uFE0F",
    "Axe": "\uD83E\uDE93", 
    "Hammer": "\uD83D\uDD28", 
    "Dagger": "\uD83D\uDDE1\uFE0F", 
    "Mace": "\u2692\uFE0F", 
    "Measure": "\uD83D\uDCCF",
    "Hand-bomb": "\uD83D\uDCA3", 
    "Katana": "\uD83D\uDDE1\uFE0F", 
    "Ninja Sword": "\uD83D\uDDE1\uFE0F", 
    "Spear": "\uD83D\uDD31",
    "Pole": "\uD83E\uDDAF", 
    "Rod": "\uD83E\uDE84", 
    "Staff": "\uD83E\uDDD9", 
    "Bow": "\uD83C\uDFF9", 
    "Crossbow": "\uD83C\uDFF9",
    "Gun": "\uD83D\uDD2B", 
    "Shield": "\uD83D\uDEE1\uFE0F", 
    "Heavy Armor": "\uD83C\uDFE0", 
    "Light Armor": "\uD83D\uDC55",
    "Mystic Armor": "\uD83E\uDDE5", 
    "Accessory": "\uD83D\uDC8D"
};

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
        btn_apply_factor: "Apply Factor Globally"
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
        btn_apply_factor: "Aplicar Fator Globalmente"
    }
};

const PRESETS = [
    { name: "Centurio: Vanguard", en: "Mid-game focus (+7% per lv)", pt: "Foco em mid-game (+7% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.07)) },
    { name: "Centurio: Knight", en: "Imperial might (+10% per lv)", pt: "Poder Imperial (+10% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.10)) },
    { name: "Dalmascan Dawn", en: "Linear balance (+4% per lv)", pt: "Equil\u00EDbrio Linear (+4% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.0416)) },
    { name: "Bahamut's Ire", en: "Exponential end-game scaler", pt: "Escalonamento exponencial de fim de jogo", logic: (v, lv) => Math.max(v, Math.floor(v * Math.pow(1.06, lv))) },
    { name: "Vayne's Ambition", en: "Absolute power (+15% base)", pt: "Poder absoluto (+15% base)", logic: (v, lv) => Math.floor(v * 1.15 + lv * 3) },
    { name: "Balthier's Luck", en: "Speed & Crits (+8% per lv)", pt: "Velocidade e Cr\u00EDticos (+8% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.08)) },
    { name: "Ashe's Ether", en: "Magick focus (+6.5% per lv)", pt: "Foco em Magia (+6.5% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.065)) },
    { name: "Basch's Wall", en: "Tank Meta (+7.5% per lv)", pt: "Meta de Tank (+7.5% por n\u00EDvel)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.075)) },
    { name: "Viera's Grace", en: "Charge acceleration (+5%)", pt: "Acelera\u00E7\u00E3o de carga (+5%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.05)) },
    { name: "Bangaa Rage", en: "Unstable damage (+12%)", pt: "Dano inst\u00E1vel (+12%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12)) },
    { name: "Zodiark's Shadow", en: "Chaotic scaling (Random variance)", pt: "Escalonamento Ca\u00F3tico (Vari\u00E2ncia aleat\u00F3ria)", logic: (v, lv) => { 
        let c = v; for(let i=1;i<=lv;i++) c+=Math.floor(c*(0.03 + Math.random()*0.12)); return c;
    }},
    { name: "Occuria's Blessing", en: "Divine stats (+20% base)", pt: "Status Divinos (+20% base)", logic: (v, lv) => Math.floor(v * 1.20 + (v * 0.02 * lv)) },
    { name: "Minstrel's Ballad", en: "Utility focus (MP/SPD balance)", pt: "Foco em utilidade (Equil\u00EDbrio MP/SPD)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.055)) },
    { name: "Imperial Judge", en: "Heavy Armor expert (+12% DEF)", pt: "Especialista em Armadura Pesada (+12% DEF)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12)) },
    { name: "Yansa's Speed", en: "Max evasion and agility (+15% SPD)", pt: "Evas\u00E3o m\u00E1xima e agilidade (+15% SPD)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.15)) },
    { name: "Phon Coast Breeze", en: "Balanced natural progression", pt: "Progress\u00E3o natural equilibrada", logic: (v, lv) => Math.floor(v * (1 + lv * 0.048)) },
    { name: "Cerobi Steppe Hunter", en: "Ranged damage specialist (+9%)", pt: "Especialista em dano \u00E0 dist\u00E2ncia (+9%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.09)) },
    { name: "Gilgamesh's Fakes", en: "High variance, legendary potential", pt: "Alta vari\u00E2ncia, potencial lend\u00E1rio", logic: (v, lv) => Math.floor(v * (0.5 + Math.random() * 1.5 + lv * 0.05)) },
    { name: "Montblanc's Favor", en: "Clan-based steady growth", pt: "Crescimento constante do Clan", logic: (v, lv) => Math.floor(v * (1 + lv * 0.06)) },
    { name: "Gabranth's Justice", en: "High risk/reward (+18% scaling)", pt: "Alto risco/recompensa (+18% escala)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.18)) },
    { name: "Fran's Instinct", en: "Late-game spike (Exponential)", pt: "Pico de fim de jogo (Exponencial)", logic: (v, lv) => Math.floor(v * Math.pow(1.08, lv)) },
    { name: "Reddas's Sacrifice", en: "High initial burst, low scaling", pt: "Alto poder inicial, baixo escalonamento", logic: (v, lv) => Math.floor(v * 1.5 + lv * 1) },
    { name: "Larsa's Potion", en: "Vitality and HP focus (+11%)", pt: "Foco em Vitalidade e HP (+11%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.11)) },
    { name: "Cid's Invention", en: "Technical step scaling (+5 per step)", pt: "Escalonamento t\u00E9cnico (+5 por degrau)", logic: (v, lv) => v + (lv * 5) },
    { name: "Nalbina Grit", en: "Raw strength and endurance (+13%)", pt: "For\u00E7a bruta e resist\u00EAncia (+13%)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.13)) },
    { name: "Rabanastre Streetwise", en: "Evasion and Crit combo focus", pt: "Foco em combo de Evas\u00E3o e Cr\u00EDtico", logic: (v, lv) => Math.floor(v * (1 + lv * 0.085)) },
    { name: "Sky Pirate's Freedom", en: "Unpredictable wind-based scaling", pt: "Escalonamento imprevis\u00EDvel do vento", logic: (v, lv) => Math.floor(v * (1 + lv * (0.02 + Math.random() * 0.1))) },
    { name: "Chaos's Whisper", en: "Dark magick extreme scaling", pt: "Escalonamento extremo de magia negra", logic: (v, lv) => Math.floor(v * (1 + lv * 0.14)) },
    { name: "Ultima's Radiance", en: "Holy/Magick pinnacle scaling", pt: "Pico de escalonamento Holy/Magia", logic: (v, lv) => Math.floor(v * (1 + lv * 0.16)) },
    { name: "Wyrm Hero's Soul", en: "Ultimate end-game perfection", pt: "Perfei\u00E7\u00E3o definitiva de fim de jogo", logic: (v, lv) => Math.floor(v * (1 + lv * 0.20)) }
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
        const emoji = CATEGORY_EMOJIS[item.category] || "\uD83D\uDCE6";
        const colorClass = CATEGORY_COLORS[item.category] || '';
        tr.innerHTML = `<td><img src="${imgUrl}" style="width:48px;height:48px;object-fit:contain;background:var(--void);border:1px solid var(--border);border-radius:8px;" onerror="this.onerror=null; this.src='https://via.placeholder.com/48?text=?'"></td><td class="id-cell">${item.id}</td><td class="name-cell">${item.name}</td><td style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">${item.license || '-'}</td><td><div class="category-badge ${colorClass}"><span>${emoji}</span> ${item.category}</div></td><td>${renderElements(item.element ? item.element.value : [])}</td><td><button class="edit-btn" data-id="${item.id}">${t.btn_configure}</button></td>`;
        fragment.appendChild(tr);
    });
    tbody.appendChild(fragment);
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
    filteredData = originalData.filter(i => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.id.toString().includes(q));
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
    if(modalCat) modalCat.innerHTML = `<span>${CATEGORY_EMOJIS[currentItem.category] || "\uD83D\uDCE6"}</span> ${currentItem.category}`;
    const modalImg = document.getElementById('modalItemImg');
    if(modalImg) modalImg.src = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fpreviews%2Fitem_${currentItem.bit}.webp&w=384&q=75`;
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
        let html = `<div class="attr-title"><span>${displayName}</span> <small style="color:var(--text-secondary);">${t.vanilla_base}: ${attr.scale[0]}</small></div><div class="scale-grid">`;
        attr.scale.forEach((val, lv) => { html += `<div class="scale-input"><label>${lv === 0 ? t.base : t.level + ' ' + lv}</label><input type="number" value="${val}" data-key="${key}" data-lv="${lv}" class="attr-input"></div>`; });
        html += `</div>`;
        group.innerHTML = html;
        fragment.appendChild(group);
    }
    list.appendChild(fragment);
    list.querySelectorAll('.attr-input').forEach(input => {
        input.addEventListener('change', e => updateAttr(e.target.dataset.key, parseInt(e.target.dataset.lv, 10), e.target.value));
    });
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
        fragment.appendChild(card);
    });
    list.appendChild(fragment);
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

function exportToLua() {
    if (!originalData) return showNotification(TRANSLATIONS[currentLang].notify_no_data, 'error');
    let lua = "-- FFXII Equipment Data\nreturn {\n";
    originalData.forEach((item, idX) => {
        lua += `  [${idX}] = {\n    id = ${item.id},\n    attr = {\n`;
        for (let k in item.attr) {
            lua += `      ${k} = { value = ${item.attr[k].value || 0}, scale = { `;
            item.attr[k].scale.forEach((v, l) => { lua += `[${l}] = ${v}${l < 12 ? ',' : ''} `; });
            lua += `} },\n`;
        }
        lua += `    }\n  }${idX < originalData.length - 1 ? ',' : ''}\n`;
    });
    lua += "}\n";
    const blob = new Blob([lua], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'equipmentData.lua'; a.click();
}
