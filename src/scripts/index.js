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
    main.className = "main";
    main.className = "container";
    document.body.insertBefore(main, body.children[1]);
    renderFilterMusic(list, categories);
    renderMusic(list);
}

function renderFilterMusic(products, categories) {
    let main = document.querySelector("main");

    let div = document.createElement("div");
    let divTitleFilter = document.createElement("div");
    let h2 = document.createElement("h2");
    let divButtonsFilter = document.createElement("div");
    let divDefineFilter = document.createElement("div");
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

    h2.innerText = "Genero musical";

    input.id = "filter";
    input.type = "range";
    input.min = minPrice;
    input.max = maxPrice;
    input.step = "any";

    output.id = "value-filter";
    output.innerText = "R$ 0,00";
    valueInput.innerText = "Até ";

    divDefineFilter.className = "div-define-filter";
    textDefinePrice.innerText = "Definir preço";
    textDefinePrice.className = "text-define-price";
    divDefinePrice.append(textDefinePrice, valueInput);
    valueInput.append(output);

    div.append(divTitleFilter, divDefinePrice, divDefineFilter);
    divTitleFilter.append(h2, divButtonsFilter);
    divDefineFilter.append(divDefinePrice, input);
    categories.map((element, index) => {
        let button = document.createElement("button");
        let titleButton = document.createElement("p");

        button.setAttribute("data-id", index);

        button.className = "categorie-button";
        titleButton.innerText = element;

        button.append(titleButton);
        divButtonsFilter.append(button);
        return button;
    });

    input.addEventListener("input", function () {
        output.innerText = formatToBRL(parseFloat(this.value));
    });

    output.innerText = formatToBRL(parseFloat(input.value));
    function updateRangeBackground() {
        const value = input.value;
        const min = input.min ? input.min : 0;
        const max = input.max ? input.max : 100;

        const percentage = ((value - min) / (max - min)) * 100;
        input.style.background = `linear-gradient(to right, var(--color-brand-1) ${percentage}%, var(--color-grey-5) ${percentage}%)`;
    }
    updateRangeBackground();
    input.addEventListener("input", updateRangeBackground);

    main.append(div);
}

function filterMusic(list) {
    let listbuttons = document.querySelectorAll(".categorie-button");

    console.log(listbuttons);
    function removeDivMusics() {
        let divMusics = document.querySelector(".div-musics");

        divMusics.remove();
    }
    listbuttons.forEach((element) => {
        element.addEventListener("click", (e) => {
            let id = Number(element.getAttribute("data-id"));
            if (id === 0) {
                removeDivMusics();
                renderMusic(list);
                return;
            }
            let listFiltred = products.filter((x) => x.category === id);
            removeDivMusics();
            renderMusic(listFiltred);
        });
    });
}

function formatToBRL(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

function renderMusic(list) {
    let main = document.querySelector("main");

    let divMusics = document.createElement("div");
    let h1 = document.createElement("h1");
    let ul = document.createElement("ul");

    h1.innerText = "Albuns Encontrados";
    divMusics.className = "div-musics";
    ul.className = "list-musics";

    divMusics.append(h1, ul);
    list.forEach((element) => {
        let priceFormated = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(element.price);

        let liMusic = document.createElement("li");
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let divInformations = document.createElement("div");
        let divSinger = document.createElement("div");
        let singerName = document.createElement("p");
        let year = document.createElement("p");
        let nameMusic = document.createElement("h3");
        let divPrice = document.createElement("div");
        let price = document.createElement("strong");
        let buttonBuy = document.createElement("button");
        let divAllInformations = document.createElement("div");

        figure.className = "music-image";
        img.src = element.img;
        divInformations.className = "div-information-music";
        divSinger.className = "div-singer";
        singerName.innerText = element.band;
        year.innerText = element.year;
        nameMusic.className = "name-music";
        nameMusic.innerText = element.title;
        divPrice.className = "div-price-music";
        price.innerText = priceFormated;
        buttonBuy.innerText = "Comprar";
        divAllInformations.className = "div-all-informationa";

        liMusic.append(figure, divAllInformations);
        divAllInformations.append(divSinger, nameMusic, divPrice);
        figure.append(img);
        divSinger.append(singerName, year);
        divPrice.append(price, buttonBuy);
        ul.append(liMusic);
    });
    main.append(divMusics);
}

renderHeader();

renderMain(products);
filterMusic(products);
