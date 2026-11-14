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

const CATEGORIAS =["Roupas", "Calçados", "Acessórios", "Bolsas"];

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
    limparErros();
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

const CAMPOS = ["nome", "categoria", "marca", "cor", "estoque", "preco", "descricao"];

function lerFormulario() {
    return Object.fromEntries(new FormData(formulario));
}

function textoVazio(texto) {
    return texto.trim() === "";
}

function validarProduto(dados) {
    const erros = {};

    if (textoVazio(dados.nome)) {
        erros.nome = "Informe o nome do produto.";
    }

    if (!CATEGORIAS.includes(dados.categoria)) {
        erros.categoria = "Escolha uma categoria.";
    }

    if (textoVazio(dados.marca)) {
        erros.marca = "Informe a marca.";
    }

    if (textoVazio(dados.estoque)) {
        erros.estoque = "Informe o estoque.";
    } else {
        const estoque = Number(dados.estoque);
        if (!Number.isInteger(estoque) || estoque < 0) {
            erros.estoque = "O estoque deve ser um número inteiro maior ou igual a 0.";
        }
    }

    if (textoVazio(dados.preco)) {
        erros.preco = "Informe o preço.";
    } else {
        const preco = Number(dados.preco);
        if (!Number.isFinite(preco) || preco < 0) {
            erros.preco = "O preço deve ser um número maior ou igual a 0.";
        }
    }

    return erros;
}

function limparErros() {
    for (const campo of CAMPOS) {
        const entrada = document.getElementById("campo-" + campo);
        document.getElementById("erro-" + campo).textContent = "";
        entrada.classList.remove("campo--invalido");
        entrada.removeAttribute("aria-invalid");
    }
}

function mostrarErros(erros) {
    for (const campo of Object.keys(erros)) {
        const entrada = document.getElementById("campo-" + campo);
        document.getElementById("erro-" + campo).textContent = erros[campo];
        entrada.classList.add("campo--invalido");
        entrada.setAttribute("aria-invalid", "true");
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErros();

    const dados = lerFormulario();
    const erros = validarProduto(dados);
    const camposComErro = Object.keys(erros);

    if (camposComErro.length > 0) {
        mostrarErros(erros);
        document.getElementById("campo-" + camposComErro[0]).focus();
        return;
    }

    console.log("Dados válidos (o Passo 8 vai salvar):", dados);
});

preencherOpcoes(document.getElementById("campo-categoria"), CATEGORIAS, "Selecione...");
renderizarTabela();

