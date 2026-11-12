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
