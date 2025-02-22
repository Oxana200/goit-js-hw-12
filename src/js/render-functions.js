import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let lightbox;

export function renderGallery(images) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    const markup = images
        .map(
            ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<a href="${largeImageURL}" class="gallery-item">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p><span class="label">Likes</span><span class="value">${likes}</span></p>
                <p><span class="label">Views</span><span class="value">${views}</span></p>
                <p><span class="label">Comments</span><span class="value">${comments}</span></p>
                <p><span class="label">Downloads</span><span class="value">${downloads}</span></p>
            </div>
        </a>`
        )
        .join('');

    gallery.insertAdjacentHTML("beforeend", markup);

    if (!lightbox) {
        lightbox = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: `alt`,
            captionDelay: 250,
        })
    }

    setTimeout(() => {
        lightbox.refresh();
    }, 100);
}
