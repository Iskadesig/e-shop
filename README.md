# E-Shop: Online Store

A simple online store built with Laravel, Inertia.js, React, Tailwind CSS, and SQLite.

## Features

- Product catalog with categories and subcategories
- Shopping cart (session-based)
- Checkout with order saving and stock decrement
- Inventory management (admin)
- Admin CRUD for products, categories, subcategories
- Registration, login, password reset, and profile management
- SQLite database (default)

## Getting Started

### 1. Clone the repository

```
git clone <your-repo-url>
cd e-shop
```

### 2. Install PHP dependencies

```
composer install
```

### 3. Install Node.js dependencies

```
npm install
```

### 4. Copy and configure environment file

```
cp .env.example .env
```

Edit `.env` if needed (default uses SQLite at `database/database.sqlite`).

### 5. Generate application key

```
php artisan key:generate
```

### 6. Run migrations and seeders

```
php artisan migrate --seed
```

### 7. Build frontend assets (for development)

```
npm run dev
```

### 8. Start the Laravel development server

```
php artisan serve
```

Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Admin Access

- Register a new user or use the seeded test user:
    - Email: `test@example.com`
    - Password: `password`
- Access the admin dashboard at `/dashboard` (after login)

## Project Structure

- `app/Models` — Eloquent models
- `app/Http/Controllers` — Laravel controllers (including Inertia endpoints)
- `app/Http/Requests/Admin` — FormRequest validation
- `database/migrations` — Database schema
- `database/seeders` — Demo data
- `resources/js/pages` — React pages (Inertia)
- `resources/js/pages/admin` — Admin React pages

## License

MIT
