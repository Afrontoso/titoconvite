// Cole este código em Extensões > Apps Script da sua planilha do Google.
// Passo a passo completo no README.md.

const ABA = "Confirmações";
const CABECALHO = ["Data/hora", "Nome", "Vai?", "Adultos", "Crianças", "Total", "Quem vem", "WhatsApp", "Recado"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter;
    const aba = pegarAba();
    const adultos = Number(p.adultos) || 0;
    const criancas = Number(p.criancas) || 0;
    const linha = [
      new Date(),
      limpar(p.nome),
      p.vai === "Sim" ? "Sim" : "Não",
      adultos,
      criancas,
      adultos + criancas,
      limpar(p.acompanhantes),
      limpar(p.telefone),
      limpar(p.mensagem),
    ];

    // Se a mesma pessoa reenviar (ex.: "Corrigir resposta"), atualiza a linha dela
    const chave = linha[1].toLowerCase();
    const nomes = aba.getRange(2, 2, Math.max(aba.getLastRow() - 1, 1), 1).getValues();
    const idx = nomes.findIndex((r) => String(r[0]).trim().toLowerCase() === chave);
    if (idx >= 0) {
      aba.getRange(idx + 2, 1, 1, linha.length).setValues([linha]);
    } else {
      aba.appendRow(linha);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function pegarAba() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(CABECALHO);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight("bold").setBackground("#ede9fe");
    aba.setFrozenRows(1);
    // Totais ao lado da tabela
    aba.getRange("K1:K4").setValues([["Resumo"], ["Adultos"], ["Crianças"], ["Total confirmado"]]);
    aba.getRange("L2:L4").setFormulas([
      ['=SUMIF(C:C,"Sim",D:D)'],
      ['=SUMIF(C:C,"Sim",E:E)'],
      ['=SUMIF(C:C,"Sim",F:F)'],
    ]);
    aba.getRange("K1:K4").setFontWeight("bold");
  }
  return aba;
}

// Evita que alguém injete fórmulas na planilha (ex.: "=IMPORTXML(...)")
function limpar(v) {
  const s = String(v || "").trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
