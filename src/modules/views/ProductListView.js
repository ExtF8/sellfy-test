export default class ProductListView {
    constructor(mountNode, handlers) {
        this.root = mountNode;
        this.handlers = handlers;
    }

    showLoading() {
        this.root.innerHTML = `<div class="state"><div class="spinner"></div>Loading…</div>`;
    }

    showError(errorMessage, onRetry) {
        this.root.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.className = 'state';

        const messageElement = document.createElement('div');
        messageElement.textContent = errorMessage;

        const retry = document.createElement('button');
        retry.className = 'button';
        retry.textContent = 'Try again';
        retry.addEventListener('click', onRetry);

        wrapper.append(messageElement, retry);
        this.root.appendChild(wrapper);
    }

    render(products) {
        this.root.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'wrapper';

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `
      <tr>
        <th>Product</th>
        <th>Category</th>
        <th>Price</th>
        <th></th>
      </tr>`;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        products.forEach(p => tbody.appendChild(this._row(p)));
        table.appendChild(tbody);

        wrapper.appendChild(table);
        this.root.appendChild(wrapper);

        // close dropdowns on outside click
        document.addEventListener(
            'click',
            event => {
                const open = this.root.querySelector('.dropdown.open');
                if (!open) return;
                if (
                    !open.contains(event.target) &&
                    !open.previousElementSibling?.contains(event.target)
                ) {
                    open.classList.remove('open');
                }
            },
            { once: true, capture: true }
        );
    }

    // Table Row
    _row(product) {
        const tableRow = document.createElement('tr');

        // product cell
        const tableDataMain = document.createElement('td');
        const row = document.createElement('div');
        row.className = 'row';

        const image = document.createElement('img');
        image.className = 'thumb';
        image.alt = product.name;
        image.src = product.imageUrl;

        const text = document.createElement('div');
        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = product.name;

        const desc = document.createElement('div');
        desc.className = 'desc';
        desc.textContent = product.description;

        text.append(name, desc);
        row.append(image, text);
        tableDataMain.appendChild(row);

        // category
        const tableDataCategory = document.createElement('td');
        const category = document.createElement('div');
        category.className = 'category';
        category.textContent = product.category;
        tableDataCategory.appendChild(category);

        // price
        const tableDataPrice = document.createElement('td');
        const price = document.createElement('div');
        price.className = 'price';
        price.textContent = product.formatPrice();
        tableDataPrice.appendChild(price);

        // actions
        const tableDataActions = document.createElement('td');
        const menu = document.createElement('div');
        menu.className = 'menu';

        const button = document.createElement('button');
        button.className = 'icon';
        button.setAttribute('aria-label', 'More');
        button.textContent = '⋮';

        const dropDown = document.createElement('div');
        dropDown.className = 'dropdown';

        const share = document.createElement('button');
        share.className = 'item';
        share.textContent = '🔗 Share';
        share.addEventListener('click', () => {
            dropDown.classList.remove('open');
            this.handlers.onShare(product);
        });

        const del = document.createElement('button');
        del.className = 'item danger';
        del.textContent = '🗑 Delete';
        del.addEventListener('click', () => {
            dropDown.classList.remove('open');
            this.handlers.onDelete(product);
        });

        dropDown.append(share, del);
        button.addEventListener('click', event => {
            event.stopPropagation();
            this.root
                .querySelectorAll('.dropdown.open')
                .forEach(element => element.classList.remove('open'));
            dropDown.classList.toggle('open');
        });

        menu.append(button, dropDown);
        tableDataActions.appendChild(menu);

        tableRow.append(tableDataMain, tableDataCategory, tableDataPrice, tableDataActions);

        return tableRow;
    }
}
