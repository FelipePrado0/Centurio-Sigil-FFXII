/**
 * XII Equipment Editor Professional Script
 * Paridade total + Edição Manual Completa + Sidebar de Presets
 */

let originalData = null;
let filteredData = null;
let currentItem = null;

const CATEGORY_EMOJIS = {
    "Unarmed": "🤝", "One-Handed Sword": "⚔️", "Sword": "⚔️", "Two-Handed Sword": "⚔️",
    "Axe": "🪓", "Hammer": "🔨", "Dagger": "🗡️", "Mace": "⚒️", "Measure": "📏",
    "Hand-bomb": "💣", "Katana": "🗡️", "Ninja Sword": "🗡️", "Spear": "🔱",
    "Pole": "🦯", "Rod": "🪄", "Staff": "🧙", "Bow": "🏹", "Crossbow": "🏹",
    "Gun": "🔫", "Shield": "🛡️", "Heavy Armor": "🏠", "Light Armor": "👕",
    "Mystic Armor": "🧥", "Accessory": "💍"
};

const ALL_STATUS = [
    "Protect", "Shell", "Haste", "Bravery", "Faith", "Regen", "Invisible", "Float", "Reflect",
    "Petrify", "Stop", "Sleep", "Confuse", "Doom", "Blind", "Poison", "Silence", "Sap", "Oil",
    "Disable", "Immobilize", "Reverse", "Berserk", "Bubble", "Disease", "Lure", "KO"
];

const ALL_ELEMENTS = ["Fire", "Ice", "Lightning", "Water", "Earth", "Wind", "Holy", "Dark"];

const PRESETS = [
    // --- GERAIS / PROGRESSÃO ---
    { name: "Centurio: Moppet", desc: "Progressão inicial balanceada (+4% p/ nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.04)) },
    { name: "Centurio: Vanguard", desc: "Foco em mid-game (+7% p/ nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.07)) },
    { name: "Centurio: Knight of the Round", desc: "Poder imperial (+10% p/ nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.10)) },
    { name: "Alvorada de Dalmasca", desc: "Equilíbrio linear (50% ganho total)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.0416)) },
    
    // --- AGRESSIVOS / EXPONENCIAIS ---
    { name: "Fúria de Bahamut", desc: "Exponencial agressivo (Foco em End-game)", logic: (v, lv) => Math.max(v, Math.floor(v * Math.pow(1.06, lv))) },
    { name: "Lâmina de Nabudis", desc: "Quadrático: Foco em multiplicadores altos", logic: (v, lv) => Math.floor(v + Math.pow(lv, 2) * (v * 0.005)) },
    { name: "Vayne's Ambition", desc: "Poder absoluto (+15% base + fixo)", logic: (v, lv) => Math.floor(v * 1.15 + lv * 3) },
    { name: "Archadian Might", desc: "Escalonamento bruto de dano físico", logic: (v, lv) => Math.floor(v * (1 + lv * 0.09)) },

    // --- ESPECIALIZADOS (FORMULAS TZA) ---
    { name: "Sorte de Balthier", desc: "Críticos e Velocidade (Adagas/Arcos)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.08)) },
    { name: "Éter de Ashe", desc: "Mágico: Foco em MAG e MP (Cajados/Rod)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.065)) },
    { name: "Muralha de Basch", desc: "Tank Meta: Foco em DEF/MDEF/HP", logic: (v, lv) => Math.floor(v * (1 + lv * 0.075)) },
    { name: "Viera's Grace", desc: "Aceleração de carga (Arcos/Bestas)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.05)) },
    { name: "Bangaa Rage", desc: "Dano instável mas poderoso (Machados/Martelos)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.12)) },
    { name: "Imperial Tech", desc: "Guns: Escalonamento moderado (Perigoso!)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.03)) },

    // --- TEMÁTICOS / LORE ---
    { name: "Sombra de Zodiark", desc: "Caos: 3% a 15% randômico por nível", logic: (v, lv) => { 
        let c = v; for(let i=1;i<=lv;i++) c+=Math.floor(c*(0.03 + Math.random()*0.12)); return c;
    }},
    { name: "Bênção de Occuria", desc: "Status divinos (+20% inicial, +2% linear)", logic: (v, lv) => Math.floor(v * 1.20 + (v * 0.02 * lv)) },
    { name: "Lhusu Quartz", desc: "Resistência de minerador (Foco em VIT)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.045)) },
    { name: "Crystal Sentry", desc: "Proteção cristalina (Escudos)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.06)) },
    { name: "Bhujerba Spark", desc: "Dano elétrico/místico (Maces)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.055)) },
    { name: "Raiva do Deserto", desc: "Escalonamento frenético de SPD", logic: (v, lv) => Math.floor(v * (1 + lv * 0.11)) },
    { name: "Paz de Old Dalan", desc: "Progressão suave e estável (+3% nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.03)) },
    { name: "Chaos Loop", desc: "Poder imprevisível (High Variance)", logic: (v, lv) => { 
        const rand = 0.8 + Math.random() * 0.4;
        return Math.floor(v * (1 + lv * 0.06) * rand);
    }},
    { name: "Judicious King", desc: "Balanceamento perfeito (All-rounder)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.05)) },
    { name: "Forbidden Grimoire", desc: "Poder de nível 99 (Extremo)", logic: (v, lv) => Math.floor(v * 1.5 + lv * 10) },
    { name: "Lenda do Herói", desc: "Status de herói (+8% linear)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.08)) },
    { name: "Voto de Penelo", desc: "Cura e Suporte (Macia/Vitalidade)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.045)) },
    { name: "Ouro de Giza", desc: "Resistência ao sol (Foco em VIT/HP)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.052)) },
    { name: "Sombras de Giruvegan", desc: "Poder sombrio (+13% p/ nível)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.13)) },
    { name: "Relíquia de Raithwall", desc: "Poder ancestral (+18% inicial)", logic: (v, lv) => Math.floor(v * 1.18 + lv * 2) },
    { name: "Sopro de Pharos", desc: "Escalonamento de torre (+6% linear)", logic: (v, lv) => Math.floor(v * (1 + lv * 0.06)) }
];

document.addEventListener('DOMContentLoaded', () => {
    initDragDrop();
    initEventListeners();
    renderPresetsSidebar();
    loadFromLocalStorage();
});

function saveToLocalStorage() {
    if (originalData) {
        localStorage.setItem('xii_equipment_data', JSON.stringify(originalData));
    }
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('xii_equipment_data');
    if (saved) {
        try {
            originalData = JSON.parse(saved);
            filteredData = [...originalData];
            renderTable();
            showNotification('Dados carregados automaticamente!', 'success');
        } catch (e) {
            console.error('Erro ao carregar do localStorage', e);
        }
    }
}

function initDragDrop() {
    const zone = document.getElementById('dropZone');
    window.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('active'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('active'));
    window.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('active');
        handleFileUpload(e.dataTransfer.files[0]);
    });
}

function initEventListeners() {
    document.getElementById('importBtn').onclick = () => document.getElementById('fileInput').click();
    document.getElementById('fileInput').onchange = (e) => handleFileUpload(e.target.files[0]);
    document.getElementById('searchInput').oninput = (e) => filterData(e.target.value);
    document.getElementById('exportBtn').onclick = exportToLua;
    document.getElementById('closeModal').onclick = () => toggleModal(false);
    document.getElementById('discardBtn').onclick = () => toggleModal(false);
    document.getElementById('saveBtn').onclick = saveItemChanges;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            const tabId = btn.dataset.tab;
            let targetId = tabId + 'Tab';
            
            // Fix ID mismatch for some tabs
            if (tabId === 'on-equip') targetId = 'onEquipTab';
            if (tabId === 'augment') targetId = 'augmentTab';

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const target = document.getElementById(targetId);
            if (target) target.classList.add('active');
        };
    });
}

function handleFileUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const json = JSON.parse(e.target.result);
            originalData = json.data;
            filteredData = [...originalData];
            saveToLocalStorage();
            renderTable();
            showNotification('JSON importado e salvo no navegador!', 'success');
        } catch (err) { alert('Erro ao processar JSON.'); }
    };
    reader.readAsText(file);
}

function renderTable() {
    const tbody = document.getElementById('itemBody');
    tbody.innerHTML = '';
    if (!filteredData) return;

    filteredData.forEach(item => {
        const tr = document.createElement('tr');
        // Usando a URL oficial corrigida com bit field e proxy
        const imgUrl = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fpreviews%2Fitem_${item.bit}.webp&w=128&q=75`;
        const emoji = CATEGORY_EMOJIS[item.category] || "📦";

        tr.innerHTML = `
            <td><img src="${imgUrl}" class="item-img" onerror="this.onerror=null; this.src='https://via.placeholder.com/48?text=?'"></td>
            <td style="color: var(--text-secondary)">${item.id}</td>
            <td style="font-weight: 600; color: var(--gold);">${item.name}</td>
            <td style="font-size: 0.75rem;">${item.license || '-'}</td>
            <td><div class="category-badge"><span>${emoji}</span> ${item.category}</div></td>
            <td>${renderElements(item.element ? item.element.value : [])}</td>
            <td><button class="edit-btn" onclick="openEditModal(${item.id})">Edit</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderElements(elements) {
    if (!elements) return '-';
    // Se for um objeto (ex: { Fire: true }), pega as chaves
    const elList = Array.isArray(elements) ? elements : (typeof elements === 'object' ? Object.keys(elements) : [elements]);
    if (elList.length === 0) return '-';

    return elList.map(el => {
        const url = `https://xii-equipment-editor.vercel.app/assets/elements/${el.toLowerCase()}.webp`;
        return `<img src="${url}" title="${el}" style="width: 20px; height: 20px; margin-right: 5px;">`;
    }).join('');
}

function filterData(query) {
    const q = query.toLowerCase();
    filteredData = originalData.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q) || 
        i.id.toString().includes(q)
    );
    renderTable();
}

function openEditModal(id) {
    currentItem = JSON.parse(JSON.stringify(originalData.find(i => i.id === id))); 
    if (!currentItem) return;

    // Fix field mappings to match the JSON structure correctly
    currentItem.onequip = currentItem.onequip || { value: [], scale: [] };
    currentItem.immunity = currentItem.immunity || { value: [], scale: [] };
    currentItem.augments = currentItem.augments || { value: [], scale: [] };
    currentItem.affinity = currentItem.affinity || { value: {}, scale: [] };

    document.getElementById('modalItemName').textContent = currentItem.name;
    document.getElementById('modalItemCat').textContent = currentItem.category;
    document.getElementById('modalItemImg').src = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fpreviews%2Fitem_${currentItem.bit}.webp&w=384&q=75`;
    
    document.getElementById('detailName').textContent = currentItem.name;
    document.getElementById('detailCategory').textContent = currentItem.category;
    document.getElementById('detailLicense').textContent = currentItem.license || 'None';
    document.getElementById('detailID').textContent = currentItem.id;

    renderAttributeGrids();
    renderStatusSelectors('onEquipList', currentItem.onequip.value);
    renderStatusSelectors('immunityList', currentItem.immunity.value);
    renderAugmentSelectors(currentItem.augments.value || []);
    renderAffinityGrid(currentItem.affinity.value || {});

    toggleModal(true);
}

function renderAttributeGrids() {
    const list = document.getElementById('attributesList');
    list.innerHTML = '';
    for (let key in currentItem.attr) {
        const attr = currentItem.attr[key];
        if (!attr.scale) continue;
        const group = document.createElement('div');
        group.className = 'attr-group';
        let html = `<div class="attr-title"><span>${key.toUpperCase()}</span> <small>Vanilla: ${attr.scale[0]}</small></div><div class="scale-grid">`;
        attr.scale.forEach((val, lv) => {
            html += `<div class="scale-input"><label>${lv === 0 ? 'Default' : 'Lv ' + lv}</label>
                     <input type="number" value="${val}" onchange="updateAttr('${key}', ${lv}, this.value)"></div>`;
        });
        html += `</div>`;
        group.innerHTML = html;
        list.appendChild(group);
    }
}

function updateAttr(key, lv, val) { currentItem.attr[key].scale[lv] = parseInt(val) || 0; }

function renderStatusSelectors(containerId, activeList) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    ALL_STATUS.forEach(status => {
        const item = document.createElement('div');
        item.className = `selector-item ${activeList.includes(status) ? 'active' : ''}`;
        const imgUrl = `https://xii-equipment-editor.vercel.app/_next/image?url=%2Fassets%2Fstatus%2F${status.toLowerCase().replace(' ', '-')}.webp&w=32&q=75`;
        item.innerHTML = `<img src="${imgUrl}" onerror="this.style.display='none'">${status}`;
        item.onclick = () => {
            const index = activeList.indexOf(status);
            if (index > -1) activeList.splice(index, 1);
            else activeList.push(status);
            renderStatusSelectors(containerId, activeList);
        };
        container.appendChild(item);
    });
}

function renderAugmentSelectors(activeList) {
    const container = document.getElementById('augmentsList');
    container.innerHTML = '';
    const AUGMENTS = [
        "HP+50", "HP+100", "HP+150", "HP+200", "HP+500",
        "MP+10", "MP+20", "MP+30", "MP+50", "MP+100",
        "Swiftness", "Battle Lore", "Magick Lore", "Channeling", "Shield Block",
        "Brawler", "Focus", "Adrenaline", "Last Stand", "Serenity", "Spellbreaker"
    ];
    AUGMENTS.forEach(aug => {
        const item = document.createElement('div');
        item.className = `selector-item ${activeList.includes(aug) ? 'active' : ''}`;
        item.innerHTML = aug;
        item.onclick = () => {
            const idx = activeList.indexOf(aug);
            if (idx > -1) activeList.splice(idx, 1);
            else activeList.push(aug);
            renderAugmentSelectors(activeList);
        };
        container.appendChild(item);
    });
}

function renderAffinityGrid(affinities) {
    const container = document.getElementById('affinityList');
    container.innerHTML = '';
    ALL_ELEMENTS.forEach(el => {
        const val = affinities[el] || "Normal";
        const div = document.createElement('div');
        div.className = 'affinity-row';
        div.innerHTML = `<span>${el}</span>
            <select onchange="updateAffinity('${el}', this.value)">
                <option ${val==='Normal'?'selected':''}>Normal</option>
                <option ${val==='Weak'?'selected':''}>Weak</option>
                <option ${val==='Half'?'selected':''}>Half</option>
                <option ${val==='Immune'?'selected':''}>Immune</option>
                <option ${val==='Absorb'?'selected':''}>Absorb</option>
            </select>`;
        container.appendChild(div);
    });
}

function updateAffinity(el, val) { currentItem.affinity[el] = val; }

function saveItemChanges() {
    const idx = originalData.findIndex(i => i.id === currentItem.id);
    if (idx > -1) {
        originalData[idx] = currentItem;
        saveToLocalStorage();
        renderTable();
        showNotification(`Item "${currentItem.name}" salvo com sucesso!`, 'success');
        toggleModal(false);
    }
}

function showNotification(msg, type = 'success') {
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'var(--success)' : 'var(--accent)';
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: ${bg}; color: #fff;
        padding: 1rem 2rem; border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 5000; animation: slideUp 0.3s ease-out;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function renderPresetsSidebar() {
    const list = document.getElementById('presetList');
    list.innerHTML = '';
    PRESETS.forEach(p => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.innerHTML = `<div class="name">${p.name}</div><div class="desc">${p.desc}</div>`;
        card.onclick = () => {
            if (!originalData) return alert('Carregue o JSON primeiro!');
            if (confirm(`Aplicar "${p.name}" em todos os itens?`)) {
                originalData.forEach(item => {
                    for (let k in item.attr) {
                        if (item.attr[k].scale) {
                            const base = item.attr[k].scale[0];
                            for (let i = 1; i < 13; i++) item.attr[k].scale[i] = Math.min(255, p.logic(base, i));
                        }
                    }
                });
                saveToLocalStorage();
                renderTable();
                showNotification(`Preset "${p.name}" aplicado em todos os itens!`, 'success');
            }
        };
        list.appendChild(card);
    });
}

function toggleModal(show) { document.getElementById('editModal').style.display = show ? 'flex' : 'none'; }

function exportToLua() {
    if (!originalData) return;
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
