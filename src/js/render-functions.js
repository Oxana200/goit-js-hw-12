import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderGallery(images, append = false) {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    if (!append) {
        gallery.innerHTML = "";
    }

    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" />
            <div class="info">
                <p><span class="label">Likes:</span> ${likes}</p>
                <p><span class="label">Views:</span> ${views}</p>
                <p><span class="label">Comments:</span> ${comments}</p>
                <p><span class="label">Downloads:</span> ${downloads}</p>
            </div>
        </a>`
    ).join('');

    gallery.insertAdjacentHTML("beforeend", markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox(".gallery a", {
            captions: true,
            captionsData: "alt",
            captionDelay: 250,
        });
    }
    lightbox.refresh();
}