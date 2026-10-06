(function () {
  const C = window.CONVITE;
  const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const SEMANA = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

  // Data no fuso de Brasília (-03:00), independente do fuso de quem abre.
  // Sem horário definido, a contagem vai até o início do dia.
  const temHora = Boolean(C.hora);
  const inicio = new Date(`${C.data}T${temHora ? C.hora : "00:00"}:00-03:00`);
  const [ano, mes, dia] = C.data.split("-").map(Number);
  const diaSemana = SEMANA[new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay()];
  // "11:00" -> "11h", "15:30" -> "15h30"
  const [hh, mm] = (C.hora || "0:00").split(":");
  const horaCurta = `${Number(hh)}h${mm === "00" ? "" : mm}`;

  const valores = {
    nome: C.nome,
    idade: C.idade,
    dia: String(dia),
    mesExtenso: "de " + MESES[mes - 1],
    diaSemana,
    hora: temHora ? horaCurta : "A definir",
    horaLegenda: temHora ? C.obsHora || "horas" : "horário",
    horaHero: temHora ? "às " + horaCurta + (C.obsHora ? " · " + C.obsHora : "") : "horário a confirmar",
    horaRodape: temHora ? horaCurta : "horário a confirmar",
    localNome: C.localNome,
    localEndereco: C.localEndereco,
    prazo: C.prazo,
  };

  document.querySelectorAll("[data-cfg]").forEach((el) => {
    const v = valores[el.dataset.cfg];
    if (v !== undefined) el.textContent = v;
  });

  // ---------- Links ----------
  const mapa = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.localNome + " " + C.localEndereco);

  const pad = (n) => String(n).padStart(2, "0");
  const fmtCal = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
  const fmtDia = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  // Sem horário: evento de dia inteiro
  const datas = temHora
    ? fmtCal(inicio) + "/" + fmtCal(new Date(inicio.getTime() + C.duracaoHoras * 3600e3))
    : fmtDia(new Date(Date.UTC(ano, mes - 1, dia))) + "/" + fmtDia(new Date(Date.UTC(ano, mes - 1, dia + 1)));
  const agenda =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent(`Aniversário do ${C.nome} (${C.idade} anos)`) +
    "&dates=" + datas +
    "&details=" + encodeURIComponent("Wakanda Forever! Você está convidado.") +
    "&location=" + encodeURIComponent(C.localNome + ", " + C.localEndereco);

  const links = { mapa, agenda };
  document.querySelectorAll("[data-href]").forEach((el) => (el.href = links[el.dataset.href]));

  // ---------- Presentes ----------
  const ul = document.getElementById("lista-presentes");
  C.presentes.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = '<span class="garrinha" aria-hidden="true"></span>';
    li.append(document.createTextNode(p));
    ul.append(li);
  });

  if (!temHora) document.getElementById("info-hora").classList.add("info__destaque--texto");

  // ---------- Partículas de vibranium ----------
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const caixa = document.getElementById("particulas");
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("span");
      const tam = 2 + Math.random() * 3;
      p.style.cssText = `left:${Math.random() * 100}%;width:${tam}px;height:${tam}px;` +
        `animation-duration:${10 + Math.random() * 14}s;animation-delay:${-Math.random() * 20}s`;
      caixa.append(p);
    }
  }

  // ---------- Tito espiando pelos cantos ----------
  const espiao = document.getElementById("espiao");
  const fala = espiao.querySelector(".espiao__fala");
  const FALAS = ["Wakanda Forever!", "Vem pra minha festa!", "Já confirmou? 🐾", `Te vejo dia ${dia}!`, "Rawr! 🐾", "Psiu! Aqui!"];
  const LADOS = ["esquerda", "direita", "baixo", "canto-esq", "canto-dir"];
  const sortear = (min, max) => min + Math.random() * (max - min);
  const item = (lista) => lista[Math.floor(Math.random() * lista.length)];

  function aparecer() {
    // não atrapalha quem está preenchendo o formulário
    if (document.hidden || form.contains(document.activeElement)) return agendarEspiao();

    // Começa fora da tela e entra o bastante para mostrar a cabeça e o peito,
    // sempre em pé, só inclinado para dentro da tela.
    const W = innerWidth, H = innerHeight, w = espiao.offsetWidth, h = espiao.offsetHeight;
    const lado = item(LADOS);
    const inclina = sortear(-6, 6);
    let x, y, dx = 0, dy = 0, rot = 0;
    if (lado === "esquerda") { x = -w; y = sortear(0.1 * H, H - h * 0.9); dx = w * 0.72; rot = 14 + inclina; }
    if (lado === "direita") { x = W; y = sortear(0.1 * H, H - h * 0.9); dx = -w * 0.72; rot = -14 + inclina; }
    if (lado === "baixo") { x = sortear(0.05 * W, 0.95 * W - w); y = H; dy = -h * 0.78; rot = inclina; }
    if (lado === "canto-esq") { x = -w; y = H; dx = w * 0.7; dy = -h * 0.72; rot = 22; }
    if (lado === "canto-dir") { x = W; y = H; dx = -w * 0.7; dy = -h * 0.72; rot = -22; }

    // posiciona escondido fora da tela, sem animar
    espiao.style.transition = "none";
    espiao.style.left = x + "px";
    espiao.style.top = y + "px";
    espiao.style.transform = "translate(0, 0)";
    espiao.style.setProperty("--rot", rot + "deg");
    espiao.dataset.lado = lado;
    fala.textContent = Math.random() < 0.6 ? item(FALAS) : "";
    espiao.offsetWidth; // força o navegador a aplicar a posição antes de animar

    espiao.style.transition = "";
    espiao.style.transform = `translate(${dx}px, ${dy}px)`;
    espiao.classList.add("mostrar");
    setTimeout(esconder, sortear(1800, 3500));
  }

  function esconder() {
    espiao.classList.remove("mostrar");
    espiao.style.transform = "translate(0, 0)";
    agendarEspiao();
  }

  function agendarEspiao(primeira) {
    setTimeout(aparecer, primeira ? sortear(2000, 4000) : sortear(3000, 10000));
  }

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) espiao.remove();
  else agendarEspiao(true);

  // ---------- Contagem regressiva ----------
  const nums = {};
  document.querySelectorAll("[data-un]").forEach((el) => (nums[el.dataset.un] = el));
  function tick() {
    let diff = Math.max(0, inicio - Date.now());
    if (diff === 0) {
      document.getElementById("contagem").hidden = true;
      document.getElementById("contagem-fim").hidden = false;
      return;
    }
    const s = Math.floor(diff / 1000);
    nums.d.textContent = Math.floor(s / 86400);
    nums.h.textContent = pad(Math.floor((s % 86400) / 3600));
    nums.m.textContent = pad(Math.floor((s % 3600) / 60));
    nums.s.textContent = pad(s % 60);
    setTimeout(tick, 1000);
  }
  tick();

  // ---------- Animação de entrada ----------
  const io = new IntersectionObserver(
    (entradas) => entradas.forEach((e) => e.isIntersecting && (e.target.classList.add("visivel"), io.unobserve(e.target))),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ---------- Formulário de confirmação ----------
  const form = document.getElementById("form-rsvp");
  const grupoQtd = document.getElementById("grupo-qtd");
  const erro = document.getElementById("form-erro");
  const btn = document.getElementById("btn-enviar");
  const sucesso = document.getElementById("sucesso");

  form.querySelectorAll(".contador").forEach((box) => {
    const input = box.querySelector("input");
    box.querySelectorAll("button").forEach((b) =>
      b.addEventListener("click", () => {
        const v = (parseInt(input.value, 10) || 0) + Number(b.dataset.passo);
        input.value = Math.min(20, Math.max(0, v));
      })
    );
  });

  // Máscara do telefone: (61) 99999-9999 ou (61) 3333-4444
  const tel = document.getElementById("f-tel");
  tel.addEventListener("input", () => {
    let d = tel.value.replace(/\D/g, "");
    if (d.length > 11 && d.startsWith("55")) d = d.slice(2); // colou com +55
    d = d.slice(0, 11);
    let v = d;
    if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 6) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length === 11 ? 7 : 6)}-${d.slice(d.length === 11 ? 7 : 6)}`;
    tel.value = v;
  });

  form.addEventListener("change", (e) => {
    if (e.target.name === "vai") grupoQtd.hidden = e.target.value !== "Sim";
  });

  function mostrarErro(msg) {
    erro.textContent = msg;
    erro.hidden = !msg;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    mostrarErro("");

    const fd = new FormData(form);
    const dados = {
      nome: (fd.get("nome") || "").trim(),
      vai: fd.get("vai"),
      adultos: parseInt(fd.get("adultos"), 10) || 0,
      criancas: parseInt(fd.get("criancas"), 10) || 0,
      acompanhantes: (fd.get("acompanhantes") || "").trim(),
      telefone: (fd.get("telefone") || "").trim(),
      mensagem: (fd.get("mensagem") || "").trim(),
    };
    if (dados.vai !== "Sim") {
      dados.adultos = 0;
      dados.criancas = 0;
      dados.acompanhantes = "";
    }

    if (!dados.nome) {
      mostrarErro("Coloca seu nome pra gente saber quem é 🙂");
      form.nome.focus();
      return;
    }
    if (dados.vai === "Sim" && dados.adultos + dados.criancas === 0) {
      mostrarErro("Quantas pessoas vêm? Coloca pelo menos 1.");
      return;
    }

    btn.disabled = true;
    btn.textContent = "Enviando…";

    try {
      if (C.planilhaUrl) {
        // no-cors: o Apps Script recebe normalmente, só não conseguimos ler a resposta
        await fetch(C.planilhaUrl, { method: "POST", mode: "no-cors", body: new URLSearchParams(dados) });
      }
      mostrarSucesso(dados);
    } catch (err) {
      mostrarErro("Não consegui enviar. Verifique a internet e tente de novo, ou confirme pelo WhatsApp.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Confirmar presença";
    }
  });

  function mostrarSucesso(d) {
    const total = d.adultos + d.criancas;
    const partes = [];
    if (d.adultos) partes.push(`${d.adultos} adulto${d.adultos > 1 ? "s" : ""}`);
    if (d.criancas) partes.push(`${d.criancas} criança${d.criancas > 1 ? "s" : ""}`);

    let msg;
    if (d.vai === "Sim") {
      document.getElementById("sucesso-titulo").textContent = "Presença confirmada! 🐾";
      document.getElementById("sucesso-texto").textContent =
        `Obrigado, ${d.nome}! Anotamos ${total} pessoa${total > 1 ? "s" : ""} (${partes.join(" e ")}). Te esperamos em Wakanda!`;
      msg = `Olá! Aqui é ${d.nome}. Confirmo presença no aniversário do ${C.nome} (${valores.dia} ${valores.mesExtenso}): ${partes.join(" e ")}.`;
      if (d.acompanhantes) msg += ` Quem vai: ${d.acompanhantes}.`;
    } else {
      document.getElementById("sucesso-titulo").textContent = "Que pena! 💜";
      document.getElementById("sucesso-texto").textContent = `Obrigado por avisar, ${d.nome}. Vamos sentir sua falta!`;
      msg = `Olá! Aqui é ${d.nome}. Infelizmente não vou poder ir ao aniversário do ${C.nome}.`;
    }
    if (d.mensagem) msg += ` Recado: ${d.mensagem}`;

    document.getElementById("btn-zap").href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;
    form.hidden = true;
    sucesso.hidden = false;
    sucesso.scrollIntoView({ behavior: "smooth", block: "center" });

    // Sem planilha configurada, o WhatsApp é o único jeito de avisar
    if (!C.planilhaUrl) window.open(document.getElementById("btn-zap").href, "_blank");
  }

  document.getElementById("btn-editar").addEventListener("click", () => {
    sucesso.hidden = true;
    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
