# 🏐 VolleyFralda

Site simples de confirmação de presença para hospedar gratuitamente no GitHub Pages.

## 1. Configure o evento

Abra `script.js` e altere apenas o bloco `CONFIG` no começo do arquivo:

```js
const CONFIG = {
  nomeBebe: "Nome da bebê",
  data: "10/10/2026",
  horario: "16:00",
  local: "Nome do local",
  emailDestino: "seuemail@gmail.com"
};
```

## 2. Como o e-mail funciona

O formulário usa FormSubmit. Você não precisa colocar senha de e-mail no código.

Na PRIMEIRA resposta enviada pelo site, o FormSubmit poderá mandar um e-mail de ativação para o endereço configurado. Abra esse e-mail e confirme/ative o formulário. Depois disso, as próximas respostas serão encaminhadas normalmente.

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `volleyfralda`.
2. Envie `index.html`, `style.css` e `script.js` para a raiz do repositório.
3. Abra Settings > Pages.
4. Em "Build and deployment", selecione "Deploy from a branch".
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve.

Depois de alguns instantes o GitHub exibirá o endereço público do site.

## Arquivos

- `index.html`: estrutura da página.
- `style.css`: visual.
- `script.js`: configurações e envio das respostas.
