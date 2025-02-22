import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery } from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector("#load-more");
const loader = document.querySelector(".loader");

let query = "";
let page = 1;
const perPage = 40;
let lastItemBeforeLoad = null;

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    query = event.target.elements.searchQuery.value.trim();

    if (!query) {
        iziToast.warning({ title: "Warning", message: "Please enter a search term!" });
        return;
    }

    page = 1;
    gallery.innerHTML = "";
    loadMoreBtn.classList.add("hidden");
    loader.classList.remove("hidden");

    const { hits, totalHits } = await fetchImages(query, page, perPage);
    loader.classList.add("hidden");

    if (hits.length === 0) {
        iziToast.error({ message: "No images found. Try again!" });
        return;
    }

    renderGallery(hits);

    if (perPage < totalHits) {
        loadMoreBtn.classList.remove("hidden");
    }
});

loadMoreBtn.addEventListener("click", async () => {
    lastItemBeforeLoad = document.querySelector(".gallery-item:last-of-type");

    page += 1;
    loader.classList.remove("hidden");

    const { hits, totalHits } = await fetchImages(query, page, perPage);
    loader.classList.add("hidden");

    renderGallery(hits, true);

    setTimeout(() => {
        if (lastItemBeforeLoad) {
            const firstNewItem = lastItemBeforeLoad.nextElementSibling;
            if (firstNewItem) {
                firstNewItem.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, 300);

    if (page * perPage >= totalHits) {
        loadMoreBtn.classList.add("hidden");
        iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
    }
});