// ============================================================
//  Tudo que você precisa editar no convite está aqui.
// ============================================================
window.CONVITE = {
  nome: "Tito",
  idade: 6,

  // Data da festa (AAAA-MM-DD)
  data: "2026-12-20",
  // Horário (ex.: "15:00", horário de Brasília). Vazio = "horário a confirmar"
  hora: "11:00",
  // Aparece junto do horário (ex.: "almoço"). Pode deixar vazio.
  obsHora: "almoço",
  // Duração em horas (usada no "Adicionar à agenda" quando tiver horário)
  duracaoHoras: 4,

  // Local da festa
  localNome: "Residencial Santos Dumont",
  localEndereco: "QRI 26, Casa 11 - Santa Maria, DF",
  // Link do Google Maps com o ponto exato. Vazio = busca pelo endereço acima
  mapaUrl: "https://maps.app.goo.gl/Sb72pdzL8qiAp8en9",

  // Prazo para confirmar presença
  prazo: "30 de novembro",

  // WhatsApp que recebe as confirmações (DDI + DDD + número, só dígitos)
  whatsapp: "5561993493393",

  // Sugestões de presentes
  presentes: [
    "Roupa tamanho 8 anos",
    "Calçado tamanho 33/34",
    "Brinquedos de super-heróis",
    "Carrinhos e caminhões",
    "Livros e gibis",
    "Jogos de tabuleiro",
    "Quebra-cabeça",
  ],

  // URL do Google Apps Script que salva as respostas na planilha.
  // Veja o passo a passo no README.md. Enquanto estiver vazio,
  // a confirmação só abre o WhatsApp.
  planilhaUrl: "https://script.google.com/macros/s/AKfycbylJ56p2HZJG2ToOzN8ECjsCY0wBbk-5PcuuL035zdIw2QkAUWVh40SOTbZBnb3B2wz/exec",
};
