# [e-commerce-website](https://e-commerce-website-omega-two.vercel.app/)
This is a full-stack application for an e-commerce website!

<img width="1440" alt="Captura de Tela 2023-10-03 às 15 08 42" src="https://github.com/felipeJJ/e-commerce-admin/assets/43899843/2191667b-f267-4931-a97c-2cf8f146abe5">

## About this Project

The idea of this app is to:

Put into practice all the programming knowledge I've gained so far and create a functional product.

## Functionalities

-  Login and register
  - Create a new account
  - login with email/password
  - Login with Google
  - Token validation

- Product Catalog
  - Search for a product by name
  - Select a product category
  - Sort by new products
  - Sort by pricee
  - Pagination for products

- Cart Management
  -Add a product to the cart or increase the quantity of an existing product by clicking the cart icon
  - View all products in the shopping cart
  - View a summary of the products
  - Remove specific products from the cart
  - You can delete a specific product
  - Calculate shipping to your destination and choose from available options
  - Place the order and proceed to the checkout page
    
- Checkout Process
  - View a summary of the products
  - Complete three steps to checkout:
      - 1: Select or edit the delivery address
      - 2: Add credit cards and select one for payment (future feature to delete cards or checkout without saving them)
      - 3:  Calculate shipping and choose the preferred option
        
- Order Management
  - Orders are saved in the database linked to the user's ID
 
## Getting Started

### Prerequisites

To run this project in development mode, you'll need a basic environment to run a Next.js app.

Also, create a `.env` file containing your MongoDB URI (used in `database/lib/mongoose.ts` as `mongoUri`), your S3 Client access information (used in `pages/api/upload.ts` as `accessKeyId` and `secretAccessKey`), Cielo API credentials (`MERCHANT_ID` and `MERCHANT_KEY` used in `api/cieloApi/route.ts`), NextAuth credentials (`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` used in `api/auth/[...nextauth]/route.ts`), and `CRYPTO_SECRET_KEY` for encryption and decryption (used in `api/cieloApi/route.ts` and `api/creditCardApi/route.ts`).

**Cloning the Repository**

```
$ git clone https://github.com/felipeJJ/e-commerce-admin.git

$ cd e-commerce-admin
```

**Installing dependencies**

```
$ yarn install
```

_or_

```
$ npm install
```

### Running

With all dependencies installed and the environment properly configured, you can now run the app:

```
$ npm run dev
```

## Built With

- [Next JS](https://nextjs.org) - Front-end framework 
- [typescript](https://www.typescriptlang.org) - Add types to JS
- [tailwindcss](https://tailwindcss.com) - Create all the stylization
- [axios](https://axios-http.com) - Used to make HTTP requests
- [mongodb](https://www.mongodb.com) - Data base
- [mongoose](https://mongoosejs.com) - Create schema-based solution to model your application data
- [multiparty](https://github.com/pillarjs/multiparty) - Parse http requests with content-type
- [sweetalert2](https://sweetalert2.github.io) - Show warning pop ups on screen
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js applications
- [React Hook Form](https://react-hook-form.com/) - Performant, flexible, and extensible forms with easy-to-use validation
- [Yup](https://github.com/jquense/yup) - JavaScript schema builder for value parsing and validation
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) - Library to hash passwords
- [Dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from a .env file into process.env
- [DaisyUI](https://daisyui.com/) - Tailwind CSS components
- [@types/react] - Type definitions for React
- [@types/bcryptjs](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for bcrypt.js
- [@types/node](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for Node.js
- [@types/react-credit-cards](https://github.com/DefinitelyTyped/DefinitelyTyped) - Type definitions for react-credit-cards


## Support tools
- [Melhor Envio API](https://docs.melhorenvio.com.br/) - Calculate shipping costs and delivery times
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service
- [IBGE API](https://servicodados.ibge.gov.br/api/docs/localidades) - Returns all cities in Brazil
- [Cielo API Sandbox](https://developercielo.github.io/) - Process payments via credit card and other methods, with a sandbox for testing
### Some Observations about this App

This is an MVP and lacks features that will be implemented in the future:
- Delete saved credit cards
- Make a purchase without saving the credit card
- User profile page to edit personal information and view past purchases

