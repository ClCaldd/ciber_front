const input_search = document.getElementById("search_input")
const lista_livros = document.getElementById("lista_livros")
let valor_pesquisa = ""
let data = {}

input_search.addEventListener("input", () => {
    valor_pesquisa = input_search.value;
    console.log(valor_pesquisa)
    getBooks()
})

const getBooks = async () => {
    
    let response 
    if (!valor_pesquisa) 
        response = await(await (fetch(`https://openlibrary.org/search.json`))).json();
    else
        response = await(await (fetch(`https://openlibrary.org/search.json?title=${valor_pesquisa.replace(/ /g, "+")}`))).json()
    
    data = response
    atualizarLivros()
}

const atualizarLivros = () => {
    let livros = data.docs

    lista_livros.innerHTML = ""
    livros.forEach(livro => {

        let coverUrl 
        if(livro.cover_i === undefined)
            coverUrl = "../../global/images/books.png"
        else
            coverUrl = `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`

        const div = document.createElement("div")
        div.className = "livro"
        div.innerHTML =  `
            <div class="secao_livro_imagem">
                <img class="livro_imagem" src="${coverUrl}" alt="${livro.title}">
            </div>
            <div class="livro_titulo">${livro.title}</div>
        `
        lista_livros.appendChild(div);
    });
}