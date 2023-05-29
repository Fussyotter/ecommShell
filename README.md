# [Ecommerce Platform]

This shell is an ecommerce platform built using Next.js, Material UI, Stripe API for the frontend, and Django for the backend. This is designed to be a launchpad for your next ecommerce project.  This repo is the frontend only.  The backend is located at https://github.com/Fussyotter/backend_ecomm_shell. 

## Features

- Comprehensive product search and browse capabilities
- Detailed product views
- Shopping cart functionality
- Secure checkout process powered by Stripe API
- Responsive design with Material UI
- Admin dashboard for managing products, orders, and customers
- User authentication and authorization

## Built With
Next.js 
Material-UI - UI library
Stripe API - Payment processing

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and Python installed in your local development environment. You also need to have an account with Stripe to use their API.

### Installation

1. Clone the repository:

2. Install the dependencies:
```bash
npm install
```

3. Create a .env file in the root directory of the project and add the following environment variables:
```bash
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLIC_KEY=your-stripe-public-key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
NEXT_PUBLIC_STRIPE_SUCCESS_URL=http://localhost:3000/success
NEXT_PUBLIC_STRIPE_CANCEL_URL=http://localhost:3000/cancel
```
4. Run the development server:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
