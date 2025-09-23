// Modal view
export default class ShareModalView {
    constructor() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop';
        this.backdrop.addEventListener('click', event => {
            if (event.target === this.backdrop) {
                this.close();
            }
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                this.close();
            }
        });
        document.body.appendChild(this.backdrop);
    }

    // Open modal
    open(product) {
        this.backdrop.innerHTML = '';
        this.backdrop.appendChild(this.#buildModal(product));
        this.backdrop.classList.add('open');
    }

    // Close modal
    close() {
        this.backdrop.classList.remove('open');
    }

    // Build modal - private
    #buildModal(product) {
        const modal = document.createElement('div');
        modal.className = 'modal';

        // header
        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        const closeButton = document.createElement('button');

        h3.textContent = 'Share your product!';
        closeButton.className = 'icon';
        closeButton.setAttribute('area-lable', 'Close');
        closeButton.textContent = 'x';
        closeButton.addEventListener('click', () => this.close());
        header.append(h3, closeButton);

        // body
        const body = document.createElement('div');
        const preview = document.createElement('div');
        const image = document.createElement('img');
        const title = document.createElement('div');
        const info = document.createElement('div');
        const modalDescription = document.createElement('div');

        body.className = 'body';
        preview.className = 'preview';
        image.src = product.imageUrl;
        image.alt = product.name;
        title.className = 'title';
        title.textContent = product.name;
        modalDescription.className = 'modalDecription';
        modalDescription.textContent = product.description;

        info.append(title, modalDescription);
        preview.append(image, info);
        body.append(preview);

        // footer
        const footer = document.createElement('footer');
        const copyButton = document.createElement('button');
        copyButton.className = 'button';
        copyButton.textContent = 'Copy link';
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(product.url);
                alert('Link copied!');
            } catch {
                alert(product.url);
            }
        });

        // tweet
        const tweetButton = document.createElement('button');
        tweetButton.className = 'button';
        tweetButton.textContent = 'Tweet';
        tweetButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(product.url);
                alert('product tweeted!');
            } catch {
                alert(product.url);
            }
            this.close();
        });

        // share
        const shareButton = document.createElement('button');
        shareButton.className = 'button primary';
        shareButton.textContent = 'Share';
        shareButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(product.url);
                alert('Product shared!');
            } catch {
                alert(product.url);
            }

            this.close();
        });

        footer.append(copyButton, tweetButton, shareButton);

        modal.append(header, body, footer);
        return modal;
    }
}
