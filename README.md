# FashionTrends — Gestão de Produtos

Sistema web de gestão de produtos (CRUD) da loja de moda **FashionTrends**, feito com **HTML, CSS e JavaScript puros**, sem frameworks, sem build e sem backend. Os dados ficam no `localStorage` do navegador.

Projeto acadêmico — Sistemas de Informação, Universidade Tiradentes (UNIT).
Autor: Vinícius Carregosa Andrade.

## Funcionalidades

- **Cadastrar** produto com validação (nome, categoria, marca, estoque, preço) e foto.
- **Listar** em tabela, com **busca por nome** (ignora maiúsculas e acentos).
- **Filtrar** por categoria e marca (os filtros se combinam com a busca).
- **Paginar** a lista (5 produtos por página).
- **Editar** o produto no mesmo formulário (o `id` é mantido).
- **Excluir** com confirmação.
- **Esgotado:** produtos com estoque 0 aparecem como indisponíveis.
- **Resumo do estoque:** quantidade de produtos, unidades, esgotados e valor em estoque.
- **Layout responsivo**, com menu recolhível no celular.

## Regras de negócio

- Nome não vazio (após remover os espaços das pontas).
- Preço: número maior ou igual a 0.
- Estoque: número inteiro maior ou igual a 0.
- Id único por produto.
- Estoque 0 é exibido como **Esgotado**.
- Editar atualiza o mesmo id; excluir exige confirmação.

## Como executar

Não é preciso instalar nada.

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (ou use a extensão *Live Server* do VS Code).

Para voltar aos produtos de exemplo, abra o Console do navegador (`F12`) e execute:

```js
localStorage.removeItem(CHAVE_STORAGE)
```

Depois, recarregue a página.

## Estrutura do projeto

```
fashionTrends/
├── index.html    estrutura das duas telas (lista e formulário)
├── style.css     identidade visual, layout e versão para celular
├── script.js     dados, validação, CRUD, filtros, paginação, foto e menu
├── assets/       logotipo
└── README.md
```

## Decisões técnicas

- **Uma página, duas telas:** `mostrarTela()` alterna o atributo `hidden` entre a lista e o formulário.
- **Uma fonte de verdade:** a lista de produtos mora só no `localStorage`; a tabela é sempre redesenhada por `renderizarTabela()` a partir dos dados, dos filtros e da página atual.
- **Segurança:** a tabela é construída com `createElement` e `textContent` (nunca `innerHTML` com texto do usuário), o que evita XSS.
- **Eventos:** os botões Editar/Excluir usam delegação de eventos em um único ouvinte no `<tbody>`.
- **Fotos:** guardadas como *data URL* e reduzidas (máx. 400 px, JPEG) antes de gravar, por causa do limite do `localStorage`.
- **Paleta e fontes:** variáveis CSS com as cores e fontes do estudo de caso (Playfair Display e Montserrat).

## Limitações

- Os dados ficam somente no navegador usado (não são compartilhados).
- O `localStorage` tem cerca de 5 MB; por isso as fotos são reduzidas.
- Não há autenticação.
- Marcas são comparadas de forma exata (`Urbana` e `urbana` são diferentes).
- A confirmação de exclusão usa o `confirm` nativo do navegador.
