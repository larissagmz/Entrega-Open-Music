/* Desenvolva sua lógica aqui ... */
let body = document.body;
let darkMode1 = false;
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
    img.className = "img-moon";
    figure.className = "image-dark-mode";
    container.className = "container div-header";

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

    const activeCategoryId = localStorage.getItem("activeCategoryId") || 0;
    renderHeader();
    renderFilterMusic(list, categories, activeCategoryId);
    renderMusic(list);

    if (localStorage.getItem("darkMode") === "true") {
        darkMode1 = true;
        body.classList.add("dark-mode");
        document.querySelector(".img-moon").src = "./src/assets/sun.png";
    }
}

function renderFilterMusic(products, categories, activeCategoryId) {
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
    input.value = maxPrice;
    div.className = "div-all-filter";
    divTitleFilter.className = "div-title-filter";
    divDefinePrice.className = "div-define-price";

    h2.innerText = "Genero musical";
    h2.className = "title-filter";

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

        if (index == activeCategoryId) {
            button.classList.add("active");
        }
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
    const listButtons = document.querySelectorAll(".categorie-button");
    const input = document.querySelector("#filter");

    function removeDivMusics() {
        const divMusics = document.querySelector(".div-musics");
        if (divMusics) {
            divMusics.remove();
        }
    }

    function updateMusicDisplay() {
        const categoryId =
            Number(
                document
                    .querySelector(".categorie-button.active")
                    .getAttribute("data-id")
            ) || 0;
        let filteredList;

        if (categoryId === 0) {
            filteredList = list;
        } else {
            filteredList = list.filter(
                (music) => music.category === categoryId
            );
        }

        const maxPrice = input.value;

        filteredList = filteredList.filter((music) => music.price <= maxPrice);
        localStorage.setItem("activeCategoryId", categoryId);
        listButtons[categoryId].classList.add("categorie-button-active");
        removeDivMusics();
        renderMusic(filteredList);
    }

    updateMusicDisplay();
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            listButtons.forEach((btn) => {
                btn.classList.remove("active"),
                    btn.classList.remove("button-dark-mode-active");
                btn.classList.remove("categorie-button-active");
            });
            button.classList.add("active");

            updateMusicDisplay();
        });
    });

    input.addEventListener("input", updateMusicDisplay);
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
    h1.className = "title-div-music";
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

        img.src = element.img;
        singerName.innerText = element.band;
        year.innerText = element.year;
        nameMusic.innerText = element.title;
        price.innerText = priceFormated;
        buttonBuy.innerText = "Comprar";

        figure.className = "music-image";
        divInformations.className = "div-information-music";
        divSinger.className = "div-singer";
        nameMusic.className = "name-music";
        divPrice.className = "div-price-music";
        price.className = "price-music";
        buttonBuy.className = "button-buy";
        divAllInformations.className = "div-all-informationa";
        liMusic.className = "li-music";

        liMusic.append(figure, divAllInformations);
        divAllInformations.append(divSinger, nameMusic, divPrice);
        figure.append(img);
        divSinger.append(singerName, year);
        divPrice.append(price, buttonBuy);
        ul.append(liMusic);
    });
    main.append(divMusics);

    if (darkMode1) {
        applyDarkModeClasses(ul);
    }
}

function applyDarkModeClasses(ul) {
    const buttons = document.querySelectorAll(".categorie-button");
    const titleFilter = document.querySelector(".title-filter");
    const divDefinePrice = document.querySelector(".div-define-price");
    const titleDivMusic = document.querySelector(".title-div-music");
    const music = document.querySelectorAll(".li-music");
    const nameMusic = document.querySelectorAll(".name-music");
    const priceMusic = document.querySelectorAll(".price-music");
    const buttonBuy = document.querySelectorAll(".button-buy");
    const divSinger = document.querySelectorAll(".div-singer");
    const header = document.querySelector(".div-header");

    const activeCategoryId = localStorage.getItem("activeCategoryId");

    header.children[0].classList.add("dark-mode-4");
    header.children[1].classList.add("buttons-dark-mode");

    buttons.forEach((button) => {
        button.classList.remove("categorie-button-active");
        button.classList.remove("button-dark-mode-active");
        button.className = `buttons-dark-mode ${button.className}`;
    });

    titleFilter.classList.add("dark-mode-1");
    divDefinePrice.children[0].classList.add("dark-mode-1");
    divDefinePrice.children[1].classList.add("dark-mode-2");
    titleDivMusic.classList.add("dark-mode-1");
    buttons[activeCategoryId].classList.add("button-dark-mode-active");

    buttonBuy.forEach((button) => {
        button.classList.add("dark-mode-button-buy");
    });
    divSinger.forEach((singer) => {
        singer.classList.add("dark-mode-2");
    });
    priceMusic.forEach((price) => {
        price.classList.add("dark-mode-4");
    });
    nameMusic.forEach((musicName) => {
        musicName.classList.add("dark-mode-4");
    });
    music.forEach((music) => {
        music.classList.add("dark-mode-3");
    });
}
function renderDarkMode(list) {
    const header = document.querySelector(".div-header");

    const buttons = document.querySelectorAll(".categorie-button");
    const titleFilter = document.querySelector(".title-filter");
    const divDefinePrice = document.querySelector(".div-define-price");
    const titleDivMusic = document.querySelector(".title-div-music");
    const music = document.querySelectorAll(".li-music");
    const nameMusic = document.querySelectorAll(".name-music");
    const priceMusic = document.querySelectorAll(".price-music");
    const buttonBuy = document.querySelectorAll(".button-buy");
    const divSinger = document.querySelectorAll(".div-singer");
    const img = document.querySelector(".img-moon");
    const activeCategoryId = localStorage.getItem("activeCategoryId");

    darkMode1 = !darkMode1;

    localStorage.setItem("darkMode", darkMode1);

    body.classList.toggle("dark-mode");
    header.children[0].classList.toggle("dark-mode-4");
    header.children[1].classList.toggle("buttons-dark-mode");
    titleFilter.classList.toggle("dark-mode-1");
    divDefinePrice.children[0].classList.toggle("dark-mode-1");
    divDefinePrice.children[1].classList.toggle("dark-mode-2");
    titleDivMusic.classList.toggle("dark-mode-1");

    if (darkMode1) {
        img.src = "./src/assets/sun.png";
    } else {
        img.src = "./src/assets/img/moon.svg";
    }

    buttonBuy.forEach((button) => {
        button.classList.toggle("dark-mode-button-buy");
    });
    divSinger.forEach((singer) => {
        singer.classList.toggle("dark-mode-2");
    });
    priceMusic.forEach((price) => {
        price.classList.toggle("dark-mode-4");
    });
    nameMusic.forEach((musicName) => {
        musicName.classList.toggle("dark-mode-4");
    });
    music.forEach((music) => {
        music.classList.toggle("dark-mode-3");
    });
    buttons.forEach((button) => {
        button.classList.toggle("buttons-dark-mode");
        buttons[activeCategoryId].classList.add("button-dark-mode-active");
    });
}

function darkMode() {
    const buttonDarkMode = document.querySelector(".button-dark-mode");
    buttonDarkMode.addEventListener("click", renderDarkMode);
}

renderMain(products);
filterMusic(products);
darkMode();
