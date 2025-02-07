# Next.js Marketplace Project

A full-featured marketplace website built with **Next.js** (TypeScript), **Tailwind CSS**, and **NextAuth.js** for authentication. The project includes product listing, shopping cart, product management, user authentication, and more. This project leverages the FakeAPI from Platzi for data.

## Features

- **Homepage**: Displays a grid of products fetched from [FakeAPI](https://fakestoreapi.com/products) with category filtering.
- **Product Details**: Detailed view of individual products with an "Add to Cart" button.
- **Shopping Cart**: Allows users to add, update, and remove items from their cart.
- **Admin Panel**: Admin users can manage products by adding or deleting them.
- **User Authentication**: Login and registration system using **NextAuth.js** for authentication.
- **Checkout**: Users can proceed to a checkout page after reviewing their cart.
- **Responsive Design**: Fully responsive layout using **Tailwind CSS**.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or later)
- **npm** or **yarn**

## Setup

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/marketplace-project.git
```

2.Navigate to the project folder:
```bash
cd marketplace-project
```

3.Install dependencies:
```bash
npm install
# or
yarn install
```

4.Set up your environment variables: <br>
Create a .env.local file in the root of the project and add the following:
```bash
NEXTAUTH_SECRET=your-secret-key
```
Replace your-secret-key with a secure random string for NextAuth.js.

## Available Pages

/  (Homepage) <br>
    - Displays a list of products with category filtering options.

/product/[id] <br>
    -Displays detailed information about a selected product.

/cart <br>
    - Users can view and manage their shopping cart.

/checkout<br>
    -Displays the checkout page after cart review.

/login<Br>
    -Custom login page for users to sign in.

/admin<br>
    -Admin panel for managing products (add and delete products).

/register<br>
    User registration page (if implemented).

## Development

To start the development server, run:
```bash
npm run dev
# or
yarn dev
```
This will start the Next.js development server on http://localhost:3000.

### Admin Authentication

 - Use the login credentials:
    - Email: admin@example.com
    - Password: password

- Regular users can log in using the login form.

### Cart Functionality

- Add to Cart: Clicking the "Add to Cart" button on the product page will add the product to the cart.
- View Cart: Users can view and manage their cart by clicking the cart icon in the navigation.

### Admin Panel

- Admin users can add new products via the admin panel at /admin.
- Admin users can also delete products from the list.

### Technologies Used

- Next.js - React framework for building server-side rendered (SSR) web applications.
- TypeScript - Superset of JavaScript that adds type safety.
- Tailwind CSS - Utility-first CSS framework for building custom designs.
- NextAuth.js - Authentication solution for Next.js apps.
- LocalStorage - For storing product data and cart items.

### Contributing 
Feel free to fork this project and create a pull request if you would like to contribute!

### Admin Account
```bash
account : admin
password : admin123
```

### Demo Link
```bash
http
```
