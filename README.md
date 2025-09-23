# Product List App

A simple product listing app built with vanilla JavaScript.
It fetches product data from a remote JSON file, displays them in a table,
and provides share and delete actions.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ExtF8/sellfy-test.git
cd your-repo-name
```

### 2. Open in a local server

    Since the app uses fetch() to load JSON, you need to serve it with a local web server.

    Start live server using VS Code Live Server
    Then open http://127.0.0.1:5500.

---

## Project Structure

    src/
        modules/
            entities/
                Product.js
            services/
                ProductApiService.js
            views/
                ProductListView.js
                ShareModalView.js
    index.html
    index.js
    style.css
    README.md

---

## Features

-   Fetches products from a JSON API.

-   Renders products in a responsive table.

-   Share product via modal.

-   Delete product from the list.
