# Simple Express App with Cloudinary

This is a simple Express application that demonstrates how to upload images to Cloudinary and manage products with basic API endpoints.

## To illustrate how image uploads work with Cloudinary

![Example Image](./image.png)

## Features

-   **GET /api/v1/products**: Retrieve a list of products.
-   **POST /api/v1/products**: Add a new product.
-   **POST /uploads**: Upload images to Cloudinary.

## Prerequisites

-   Node.js and npm installed on your machine.
-   A Cloudinary account with your API credentials.

## Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/amrrdev/file-upload.git
    cd file-upload
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure Cloudinary:

    Create a `.env` file in the root directory and add your Cloudinary credentials:

    ```plaintext
    CLOUDINARY_CLOUD_NAME=your-cloud-name
    CLOUDINARY_API_KEY=your-api-key
    CLOUDINARY_API_SECRET=your-api-secret
    ```

4. Run the application:

    ```bash
    node app.js
    ```

## Endpoints

Here are the available API endpoints:

### GET /api/v1/products

Retrieve a list of products.

### POST /api/v1/products

Add a new product. The request should include the product name and image URL in JSON format.

### POST /uploads

Upload an image to Cloudinary using multipart/form-data.
