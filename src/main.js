import { fetchImages } from "./js/pixabay-api.js";
import { renderGallery } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "css-loader";

import crossIcon from "./img/cross.png";
import closeIcon from "./img/close.png";

const form = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();

    if (!query) {
        iziToast.warning({ title: "Warning", message: "Please enter a search term!" });
        return;
    }

    gallery.innerHTML = "";
    loader.classList.remove("hidden");

    const { hits, totalHits } = await fetchImages(query);
    loader.classList.add("hidden");

    if (hits.length === 0) {
        iziToast.error({
            message: "Sorry, there are no images matching your search query. Please, try again!",
            position: "topRight",
            backgroundColor: "#ef4040",
            titleColor: "#ffffff",
            messageColor: "#ffffff",
            timeout: 5000,
            iconUrl: crossIcon,
            close: false,
            buttons: [
                [
                    `<button class="toast-close-btn">
                <img src="${closeIcon}" style="width: 12px; height: 12px;">
            </button>`,
                    function (instance, toast) {
                        instance.hide({ transitionOut: "fadeOut" }, toast);
                    },
                ],
            ],
        });
        return;
    }

    renderGallery(hits);
    form.reset();
});
