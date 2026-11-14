/**
 * @typedef {Object} Produto
 * @property {string} id         Identificador único
 * @property {string} nome
 * @property {string} categoria  Roupas, Calçados, Acessórios ou Bolsas
 * @property {string} marca
 * @property {string} cor
 * @property {number} estoque    Inteiro >= 0 (0 = esgotado)
 * @property {number} preco      Em reais, >= 0
 * @property {string} descricao
 * @property {string} imagem     Foto em texto (passo 15) ou "" se não houver
 */

const CHAVE_STORAGE = "fashiontrends:produtos";

const PRODUTOS_INICIAIS = [
    {
        id: "p1",
        nome: "Vestido Midi Floral",
        categoria: "Roupas",
        marca: "Maison Lume",
        cor: "Rosa",
        estoque: 12,
        preco: 189.9,
        descricao: "Vestido midi com estampa floral.",
        imagem: ""
    },
    {
        id: "p2",
        nome: "Tênis Urbano Branco",
        categoria: "Calçados",
        marca: "Urbana",
        cor: "Branco",
        estoque: 8,
        preco: 249.9,
        descricao: "Tênis casual para o dia a dia.",
        imagem: ""
    },
    {
        id: "p3",
        nome: "Bolsa Tiracolo Couro",
        categoria: "Bolsas",
        marca: "Maison Lume",
        cor: "Caramelo",
        estoque: 0,
        preco: 329,
        descricao: "Bolsa tiracolo em couro legítimo.",
        imagem: ""
    },
    {
        id: "p4",
        nome: "Colar Aço Dourado",
        categoria: "Acessórios",
        marca: "Urbana",
        cor: "Dourado",
        estoque: 25,
        preco: 59.9,
        descricao: "Colar em aço inoxidável com banho dourado.",
        imagem: ""
    }
];

/**
 * Lê a lista de produtos salva no navegador.
 * @returns {Produto[]}
 */
function carregarProdutos() {
    const texto = localStorage.getItem(CHAVE_STORAGE);

    if (texto === null) {
        return [];
    }

    try {
        const dados = JSON.parse(texto);

        if (Array.isArray(dados)) {
            return dados;
        }

        return [];
    } catch (erro) {
        console.error("Não foi possível ler os produtos salvos:", erro);
        return [];
    }
}

/**
 * Grava a lista de produtos no navegador, substituindo a anterior.
 * @param {Produto[]} produtos
 */
function salvarProdutos(produtos) {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(produtos));
}

/**
 * Gera um id único para um novo produto.
 * @returns {string}
 */
function gerarId() {
    return crypto.randomUUID();
}

/**
 * Na primeira visita (nada salvo ainda), grava os produtos iniciais.
 */
function iniciarDados() {
    if (localStorage.getItem(CHAVE_STORAGE) === null) {
        salvarProdutos(PRODUTOS_INICIAIS);
    }
}

iniciarDados();

const corpoTabela = document.getElementById('corpo-tabela');
const rodapeTabela = document.getElementById('rodape-tabela');

function formatarPreco(valor){
    return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarCelulaProduto(produto) {
    const td = document.createElement("td");

    const divProduto = document.createElement("div");
    divProduto.className = "produto";

    const foto = document.createElement("span");
    foto.className = "produto__foto";

    const nome = document.createElement("span");
    nome.className = "produto__nome";
    nome.textContent = produto.nome;

    divProduto.appendChild(foto);
    divProduto.appendChild(nome);
    td.appendChild(divProduto);

    return td;
}

function criarCelulaEstoque(produto) {
    const td = document.createElement("td");
    const status = document.createElement("span");

    if (produto.estoque === 0) {
        status.className = "status status--esgotado";
        status.textContent = "Esgotado";
    } else {
        status.className = "status status--disponivel";
        status.textContent = produto.estoque;
    }

    td.appendChild(status);
    return td;
}

function criarCelulaPreco(produto) {
    const td = criarCelula(formatarPreco(produto.preco));
    td.className = "celula--fixa";
    return td;
}

function criarCelulaAcoes() {
    const td = document.createElement("td");
    td.className = "celula--fixa";

    const botaoEditar = document.createElement("button");
    botaoEditar.type = "button";
    botaoEditar.className = "acao";
    botaoEditar.textContent = "Editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.className = "acao acao--perigo";
    botaoExcluir.textContent = "Excluir";

    td.appendChild(botaoEditar);
    td.appendChild(botaoExcluir);
    return td;
}

function criarLinha(produto) {
    const tr = document.createElement("tr");
    tr.dataset.id = produto.id;

    tr.appendChild(criarCelulaProduto(produto));
    tr.appendChild(criarCelula(produto.categoria));
    tr.appendChild(criarCelula(produto.marca));
    tr.appendChild(criarCelula(produto.cor));
    tr.appendChild(criarCelulaEstoque(produto));
    tr.appendChild(criarCelulaPreco(produto));
    tr.appendChild(criarCelulaAcoes());

    return tr;
}

function criarLinhaVazia() {
    const tr = document.createElement("tr");

    const td = document.createElement("td");
    td.colSpan = 7;
    td.className = "tabela__vazio";
    td.textContent = "Nenhum produto cadastrado.";

    tr.appendChild(td);
    return tr;
}

function renderizarTabela() {
    const produtos = carregarProdutos();

    corpoTabela.replaceChildren();

    if (produtos.length === 0) {
        corpoTabela.appendChild(criarLinhaVazia());
    }

    for (const produto of produtos) {
        corpoTabela.appendChild(criarLinha(produto));
    }

    rodapeTabela.textContent =
        "Mostrando " + produtos.length + " de " + produtos.length + " produtos";
}

// ===== Passo 6: telas e formulário =====

const CATEGORIAS = ["Roupas", "Calçados", "Acessórios", "Bolsas"];

const telaLista = document.getElementById("tela-lista");
const telaFormulario = document.getElementById("tela-formulario");
const tituloFormulario = document.getElementById("titulo-formulario");
const formulario = document.getElementById("formulario-produto");
const botaoNovo = document.getElementById("botao-novo");
const botaoCancelar = document.getElementById("botao-cancelar");
const linkProdutos = document.getElementById("link-produtos");

function preencherOpcoes(select, opcoes, textoPadrao) {
    select.replaceChildren();

    const padrao = document.createElement("option");
    padrao.value = "";
    padrao.textContent = textoPadrao;
    select.appendChild(padrao);

    for (const opcao of opcoes) {
        const item = document.createElement("option");
        item.value = opcao;
        item.textContent = opcao;
        select.appendChild(item);
    }
}

function mostrarTela(nome) {
    telaLista.hidden = nome !== "lista";
    telaFormulario.hidden = nome !== "formulario";
}

function abrirFormularioNovo() {
    formulario.reset();
    tituloFormulario.textContent = "Novo produto";
    mostrarTela("formulario");
    document.getElementById("campo-nome").focus();
}

function voltarParaLista() {
    mostrarTela("lista");
}

botaoNovo.addEventListener("click", abrirFormularioNovo);
botaoCancelar.addEventListener("click", voltarParaLista);

linkProdutos.addEventListener("click", function (evento) {
    evento.preventDefault();
    voltarParaLista();
});

// Temporário: o Passo 7 troca este bloco pelo envio de verdade.
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
});

// ===== Início do programa (mantenha sempre no final do arquivo) =====

preencherOpcoes(document.getElementById("campo-categoria"), CATEGORIAS, "Selecione...");
renderizarTabela();
