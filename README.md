# Convite do Tito · 6 anos · Wakanda Forever

Site estático (HTML + CSS + JS, sem build). As confirmações de presença são salvas numa planilha do Google.

## Editar as informações

Tudo fica em [`config.js`](config.js): data/hora, local, prazo, WhatsApp, lista de presentes e a URL da planilha.

## Ver localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

## Salvar as confirmações numa planilha do Google

1. Crie uma planilha nova em https://sheets.new (ex.: "Convidados Tito").
2. No menu, vá em **Extensões → Apps Script**.
3. Apague o que tiver lá e cole o conteúdo de [`apps-script/Code.gs`](apps-script/Code.gs). Salve.
4. Clique em **Implantar → Nova implantação**:
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso (pode aparecer "app não verificado" → *Avançado → Acessar*; é o seu próprio script).
6. Copie a **URL do app da Web** (termina em `/exec`) e cole em `planilhaUrl` no `config.js`.

A aba **Confirmações** é criada sozinha na primeira resposta, com o resumo de adultos, crianças e total ao lado.
Se a mesma pessoa reenviar com o mesmo nome, a linha dela é atualizada em vez de duplicar.

> Se mudar o `Code.gs` depois, use **Implantar → Gerenciar implantações → editar → Nova versão** para manter a mesma URL.

## Publicar na Vercel

```bash
npx vercel        # primeira vez (escolha as opções padrão)
npx vercel --prod # publicar
```

Ou importe o repositório em https://vercel.com/new — não precisa configurar nada.
