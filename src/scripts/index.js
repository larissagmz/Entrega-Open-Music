/* Desenvolva sua lógica aqui ... */
let body = document.body;

function renderHeader() {
    let header = document.createElement("header");
    let container = document.createElement("div");
    let titleHeader = document.createElement("h1");
    let buttonDarkMode = document.createElement("button");
    let figure = document.createElement("figure");
    let img = document.createElement("img");

    titleHeader.innerText = "open music";
    buttonDarkMode.className = "button-dark-mode";
    img.src = "./src/assets/img/moon.svg";
    figure.className = "image-dark-mode";
    container.className = "container";

    document.body.insertBefore(header, body.children[0]);
    header.append(container);
    container.append(titleHeader, buttonDarkMode);
    buttonDarkMode.append(figure);
    figure.append(img);
}

function renderMain(list) {
    let main = document.createElement("main");
    main.className = "container";
    document.body.insertBefore(main, body.children[1]);
    let div = renderFilterMusic(list, categories);
    main.append(div);
}

// function renderFilterMusic() {
//     let maxPrice = products.reduce(
//         (max, product) => Math.max(max, product.price),
//         0
//     );
//     let minPrice = products.reduce(
//         (min, product) => Math.min(min, product.price),
//         Infinity
//     );

//     let div = document.createElement("div");
//     let divTitleFilter = document.createElement("div");
//     let h2 = document.createElement("h2");
//     let divButtonsFilter = document.createElement("div");
//     let divDefinePrice = document.createElement("div");
//     let textDefinePrice = document.createElement("p");
//     let valueInput = document.createElement("p");
//     let output = document.createElement("output");
//     let input = document.createElement("input");

//     div.append(divTitleFilter, divDefinePrice, input);
//     divTitleFilter.append(h2, divButtonsFilter);
//     divDefinePrice.append(textDefinePrice, valueInput);
//     valueInput.append(output);

//     div.className = "div-all-filter";
//     divTitleFilter.className = "div-title-filter";
//     divDefinePrice.className = "div-define-price";

//     input.id = "filter";
//     input.type = "range";
//     input.min = minPrice;
//     input.max = maxPrice;
//     input.step = "any";

//     output.id = "value-filter";
//     output.innerText = "R$ 0,00";
//     valueInput.innerText = "Valor: ";

//     input.min = categories.forEach((element) => {
//         let button = document.createElement("button");
//         let titleButton = document.createElement("p");

//         button.className = "categorie-button";
//         titleButton.innerText = element;

//         divButtonsFilter.append(button);
//         button.append(titleButton);
//     });

//     return div;
// }

function renderFilterMusic(products, categories) {
    let div = document.createElement("div");
    let divTitleFilter = document.createElement("div");
    let h2 = document.createElement("h2");
    let divButtonsFilter = document.createElement("div");
    let divDefinePrice = document.createElement("div");
    let textDefinePrice = document.createElement("p");
    let valueInput = document.createElement("p");
    let output = document.createElement("output");
    let input = document.createElement("input");

    let maxPrice = products.reduce(
        (max, product) => Math.max(max, product.price),
        0
    );
    let minPrice = products.reduce(
        (min, product) => Math.min(min, product.price),
        Infinity
    );

    div.className = "div-all-filter";
    divTitleFilter.className = "div-title-filter";
    divDefinePrice.className = "div-define-price";

    h2.innerText = "Filtro de Música";

    input.id = "filter";
    input.type = "range";
    input.min = minPrice;
    input.max = maxPrice;
    input.step = "any";

    output.id = "value-filter";
    output.innerText = "R$ 0,00";
    valueInput.innerText = "Valor: ";

    textDefinePrice.innerText = "Definir preço";
    divDefinePrice.append(textDefinePrice, valueInput);
    valueInput.append(output);

    div.append(divTitleFilter, divDefinePrice, input);
    divTitleFilter.append(h2, divButtonsFilter);

    categories.forEach((element) => {
        let button = document.createElement("button");
        let titleButton = document.createElement("p");

        button.className = "categorie-button";
        titleButton.innerText = element;

        button.append(titleButton);
        divButtonsFilter.append(button);
    });

    input.addEventListener("input", function () {
        output.innerText = formatToBRL(parseFloat(this.value));
    });

    output.innerText = formatToBRL(parseFloat(input.value));

    return div;
}

// Função para formatar o valor em reais
function formatToBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

renderHeader();

renderMain(products);
