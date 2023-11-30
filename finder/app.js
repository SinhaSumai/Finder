const access = "pwmSC_1HxKjcxzjoS3FdWA69I7ebUz7h3SDw-Jev9s8";

const formEL = document.querySelector("form");
const inpEL = document.querySelector("input");
const searchResults = document.querySelector(".search__results");
const showmoreEL = document.getElementById("show__more"); // Use getElementById for IDs
let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inpEL.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${access}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if (page === 1) {
        searchResults.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search__result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if (page > 1) {
        showmoreEL.style.display = "block";
    }
}

formEL.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmoreEL.addEventListener("click", () => {
    searchImages();
});
