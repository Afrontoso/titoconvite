// ============================================================
//  Tudo que você precisa editar no convite está aqui.
//  Os itens marcados com  TODO  ainda são exemplos — troque!
// ============================================================
window.CONVITE = {
  nome: "Tito",
  idade: 6,

  // Data da festa (AAAA-MM-DD)
  data: "2026-12-20",
  // Horário (ex.: "15:00", horário de Brasília). Vazio = "horário a confirmar"
  hora: "09:00",
  // Aparece junto do horário (ex.: "almoço às 11h"). Pode deixar vazio.
  obsHora: "almoço às 11h",
  // Duração em horas (usada no "Adicionar à agenda" quando tiver horário)
  duracaoHoras: 5,

  // Local da festa
  localNome: "Residencial Santos Dumont",
  localEndereco: "QRI 26, Casa 11 - Santa Maria, DF",

  // Prazo para confirmar presença
  prazo: "30 de novembro",

  // WhatsApp que recebe as confirmações (DDI + DDD + número, só dígitos)
  whatsapp: "5561993493393",

  // TODO: sugestões de presentes
  presentes: [
    "Roupa tamanho 8 anos",
    "Calçado tamanho 30", // TODO: conferir o número
    "Brinquedos de super-heróis",
    "Carrinhos e caminhões",
    "Livros e gibis",
    "Jogos de tabuleiro",
  ],

  // URL do Google Apps Script que salva as respostas na planilha.
  // Veja o passo a passo no README.md. Enquanto estiver vazio,
  // a confirmação só abre o WhatsApp.
  planilhaUrl: "",
};
