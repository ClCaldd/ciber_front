const input = document.getElementById("input_procurar")
const button = document.getElementById("botao_input")
const lista_card = document.getElementById("lista_card")

let pesquisa = ""


button.addEventListener("click", () => {

    pesquisa = input.value
    getData()

})


const getData = async() => {
    const response = await(await(fetch(`https://openlibrary.org/search.json?title=${pesquisa.replace(/ /g, "+")}`))).json()
    console.log(response)

    const docs = response.docs

    lista_card.innerHTML = ""
    docs.forEach(livro => {

        let cover
        if(livro.cover_i !== undefined)
        {
            cover = `https://covers.openlibrary.org/b/id/${livro.cover_i}-M.jpg`
        }
        else {
            cover = "../../global/images/book.png"
        }

        const div = document.createElement("div")
        div.className = "card"
        div.innerHTML = `
            <img class="imagem_card" src="${cover}" alt="uau">
            <div class="texto_card">${livro.title}</div>
        `
        lista_card.appendChild(div)
    });

}