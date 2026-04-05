# Equipment Editor v2 — Design de Melhorias

## Contexto

Documento de design para três frentes de melhoria identificadas no editor.
O app permanece **frontend-only** (HTML + JS + CSS, sem build, sem backend).

---

## Frente 1 — Presets Mais Ricos

### Problema
Os 30 presets atuais têm descrições de uma linha que não comunicam o impacto real. É impossível saber a diferença entre "Centurio: Knight (+10%)" e "Bangaa Rage (+12%)" sem aplicar e verificar manualmente.

### Design Proposto

#### 1.1 — Metadados por Preset
Adicionar ao objeto `PRESET` os seguintes campos:

```js
{
  name: "Bahamut's Ire",
  en: "...", pt: "...",
  logic: (v, lv) => ...,

  // NOVOS CAMPOS:
  archetype: "exponential",          // "linear" | "exponential" | "burst" | "chaotic" | "flat"
  growth_at_12: "~201%",             // valor aproximado no nível máximo (base = 100%)
  recommended_for: ["Sword", "Spear", "Katana"],   // categorias ideais
  risk: "low",                       // "low" | "medium" | "high" (para Guns: sempre "high")
  tags: ["late-game", "investment"], // tags livres para busca/filtro
}
```

#### 1.2 — Card de Preset Expandido
O card na sidebar exibe:
- Nome + descrição atual
- Badge de arquétipo colorido (`LINEAR`, `EXPO`, `BURST`, etc.)
- Crescimento no nível 12 em % (ex: `+201% no Lv12`)
- Ícone de risco (🟢 baixo / 🟡 médio / 🔴 alto)

#### 1.3 — Preview Antes de Aplicar
Ao **hover** no preset card (ou clique em "Preview"), exibir um mini-gráfico inline mostrando a curva de um item representativo (ex: item selecionado ou primeiro da lista) **sem aplicar os dados**.

#### 1.4 — Filtro/Agrupamento de Presets
Adicionar filtros simples na sidebar:
- Por arquétipo (Linear / Exponencial / Burst / Caótico)
- Por risco (Baixo / Médio / Alto)
- Por tag

---

## Frente 2 — Visualização de Curvas

### Problema
O editor só mostra números em inputs. Não há como "ler" o formato de crescimento de um item sem calcular mentalmente cada valor.

### Design Proposto

#### 2.1 — Gráfico de Linha por Atributo (Tab "Scaling")
Na aba **Scaling** do modal de edição, acima dos inputs numéricos:
- Um gráfico de linha por atributo (canvas ou SVG puro, sem dependências externas)
- Eixo X: níveis 0–12
- Eixo Y: valor do atributo
- **Atualização em tempo real** conforme o usuário edita os inputs
- Linha tracejada cinza mostrando a linha base (escala plana do `scale[0]`)

#### 2.2 — Comparação Preset vs. Atual
Ao fazer hover em um preset card:
- Overlay no gráfico do item atualmente aberto no modal
- Linha azul = curva atual
- Linha laranja = curva que o preset geraria
- Não modifica dados — só visualiza

#### 2.3 — Radar Chart no Nível Máximo
Nova sub-seção na aba **Overview** do modal:
- Radar/spider chart com os atributos principais (`atk`, `def`, `str`, `mgk`, `spd`, `hp`, `evaw`, `cmb`)
- Mostra o "perfil" do item no nível 12
- Cores por categoria (Sword = azul, Gun = vermelho, Staff = roxo, etc.)

#### 2.4 — Simulador de Dano (Opcional / Fase 2)
Painel colapsável na aba **Scaling**:
- Entradas: STR/MGK do personagem, Level do personagem, DEF do inimigo
- Saída: dano estimado mín/máx por categoria usando as fórmulas do TZA
- Aviso destacado para Guns (fórmula `ATK²`)

> **Nota de implementação:** usar `<canvas>` nativo para os gráficos. Evitar Chart.js ou D3 para manter o app sem dependências externas.

---

## Frente 3 — Sistema de Validação e Alertas

### Problema
Não há nenhum feedback quando um item ultrapassa limites razoáveis, fica irrelevante no nível 12, ou quando uma Gun recebe ATK excessivo.

### Design Proposto

#### 3.1 — Regras de Validação

| Regra | Condição | Severidade |
|---|---|---|
| **ATK Overpowered** | `atk.scale[12] > 155` em armas não-lendárias | 🔴 Erro |
| **ATK Lendário** | `atk.scale[12] > 200` em qualquer arma | 🔴 Erro |
| **Gun Spike** | Qualquer aumento de ATK em categoria `Gun` > 80% do base | 🔴 Erro |
| **Underpowered** | `scale[12] <= scale[0]` (sem crescimento real) | 🟡 Aviso |
| **Crescimento Mínimo** | `scale[12] < scale[0] * 1.25` | 🟡 Aviso |
| **Inversão de Tier** | Item de tier baixa com `scale[12]` > item de tier alta (mesma categoria) | 🟡 Aviso |
| **Scale Regressiva** | Qualquer `scale[n] < scale[n-1]` para `n >= 1` | 🟡 Aviso |
| **Cap de Stat** | Qualquer atributo ultrapassa 255 | 🔴 Erro |

#### 3.2 — Indicadores Visuais na Tabela Principal
- Badge de alerta na coluna de ações do item: `⚠️ 2` (número de problemas)
- Linha da tabela com borda esquerda vermelha/amarela se tiver erros/avisos
- Filtro rápido no header: "Mostrar apenas itens com alertas"

#### 3.3 — Painel de Validação no Modal
- Seção fixa no rodapé do modal (acima dos botões Discard/Save)
- Lista os alertas do item atual em tempo real
- Bloquear o botão **"Imprint Changes"** se houver erros críticos (🔴)
- Avisos (🟡) não bloqueiam, apenas informam

#### 3.4 — Relatório Global de Validação
- Botão "Validate All" na sidebar
- Exibe modal com lista de todos os itens problemáticos
- Agrupado por tipo de problema
- Permite navegar diretamente ao item clicando nele

---

## Decision Log

| Decisão | Alternativas Consideradas | Motivo |
|---|---|---|
| Canvas nativo para gráficos | Chart.js, D3.js, Plotly | App sem dependências externas; simplicidade de deploy |
| Validação no frontend | Backend API de validação | App é offline-first / single-file |
| Preview de preset via hover | Tab dedicada de comparação | YAGNI — hover é suficiente para o caso de uso solo |
| Bloquear Save em erros críticos | Só avisar, nunca bloquear | Erros 🔴 (cap 255, Gun spike) são potencialmente destrutivos |
| Simulador de dano como Fase 2 | Incluir no escopo inicial | Alta complexidade; as outras 3 frentes têm mais valor imediato |

---

## Prioridade de Implementação Sugerida

1. **Frente 3 — Validação** (maior valor de segurança, menor complexidade)
2. **Frente 1 — Presets ricos** (melhora imediata na usabilidade diária)
3. **Frente 2 — Visualização** (maior impacto, maior esforço)
4. **Frente 2.4 — Simulador de dano** (fase 2, após validação das outras)
