# E-Commerce Platform with Automated CI/CD Pipeline

An e-commerce platform is a software application that enables businesses to sell products or services online. It typically consists of:

1. Backend: Manages product listings, user accounts, orders, and payments.
2. Frontend: Provides a user interface for customers to browse products, add items to a cart, and complete purchases. E-commerce platforms are essential for businesses to reach a global audience, streamline operations, and provide a seamless shopping experience.

An automated CI/CD (Continuous Integration/Continuous Deployment) pipeline significantly improves the development, testing, and deployment processes for an e-commerce platform. It also ensures 

- Faster Time-to-Market: New features and updates are delivered to customers quickly.
- Improved Customer Experience: Reliable deployments and fewer bugs lead to a smoother shopping experience.
- Competitive Advantage: The ability to iterate and innovate faster than competitors.

By automating the development lifecycle, businesses can focus on growth and customer satisfaction while maintaining a robust and scalable platform.
 


## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Local Development Setup](#local-development-setup)
5. [GitHub Actions Workflow](#github-actions-workflow)
6. [Docker Integration](#docker-integration)
7. [Cloud Deployment](#cloud-deployment)
8. [Security Measures](#security-measures)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview <a name="project-overview"></a>
### Introduction
This project implements a modern e-commerce platform with a fully automated CI/CD pipeline, designed to streamline development, testing, and deployment processes. The platform consists of two core components:

- Backend API: A Node.js/Express service for product management, user authentication, and order processing.
- Frontend Web Application: A React-based UI for users to interact with products, accounts, and orders.

The infrastructure leverages GitHub Actions for continuous integration/delivery, Docker for containerization, and cloud deployment (AWS/Azure/GCP) for scalability.

## Features <a name="features"></a>
**Backend (API)**: We made use of Node.js/Express as our backend for:

- Product listing management
- User authentication
- Order processing
- Unit tests with Jest

**Frontend (Webapp)**: we made use of React as our frontend for

- Product browsing
- User account management
- Order placement interface
- Responsive React UI

## Project Structure <a name="project-structure"></a>

```
└── ecommerce-platform/
    
    ├── .github/
    │   └── workflows/
    │       ├── backend.yml    # CI/CD for Node.js API (Backend)
    │       ├── frontend.yml   # CI/CD for React app (Frontend)
    │       
    ├── api/
    │   ├── src/
    │   │   ├── controllers/   # Business logic
    │   │   ├── models/        # Database schemas
    │   │   ├── routes/        # API endpoints
    │   │   └── utils/         # Helper functions
    │   ├── test/              # Jest unit tests
    │   ├── Dockerfile         # Containerization
    │   ├── package.json
    │   └── index.js           # Entry point
    ├── webapp/
    │   ├── public/            # Static assets
    │   ├── src/
    │   │   ├── components/    # React UI
    │   │   ├── services/      # API calls
    │   │   ├── contexts/      # State management
    │   │   └── App.js         # Main component
    │   ├── Dockerfile
    │   └── package.json
    ├── LICENSE
    └── README.md              # Project documentation
```

---

## Local Development Setup <a name="local-development-setup"></a>

### Prerequisites
- Node.js v16+
- Docker
- Git

### Backend Setup
```
cd api
npm install
npm run dev  # Starts server on port 3000
npm test     # Run unit tests
```
### Frontend Setup
```
cd webapp
npm install
npm start    # Starts app on port 3001
```

Below is a picture of our test result;

![Image](https://github.com/user-attachments/assets/73d20dd5-039c-481c-9a73-529d02f6ab2f)


## GitHub Actions Workflow <a name="github-actions-workflow"></a>

### Workflow Configuration
GitHub Actions workflow files

**Backend.yml**:
```
name: Backend CI/CD

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
    - name: Checkout code
      uses: actions/checkout@v4  # Update to the latest version
      with:
        token: ${{ secrets.ACCESS_TOKEN }}

    - name: Set up Node.js
      uses: actions/setup-node@v4  # Update to the latest version
      with:
        node-version: '20'  # Specify the latest supported Node.js version

    - name: Cache Node.js dependencies   # Caching dependencies step
      uses: actions/cache@v4  # Update to the latest version
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-

    - name: Install dependencies
      run: npm install
      working-directory: ./api

    - name: Set Jest executable permissions
      run: chmod +x node_modules/.bin/jest
      working-directory: ./api

    - name: Run tests
      run: npx jest
      working-directory: ./api

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v3
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}

    - name: Log in to Amazon ECR
      id: login-ecr
      run: |
        aws ecr get-login-password --region ${{ secrets.AWS_REGION }} | \
        docker login --username AWS --password-stdin 381491862732.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com

    - name: Build Docker image
      run: docker build -t backend:latest -f api/Dockerfile ./api

    - name: Tag Docker image
      run: docker tag backend:latest 381491862732.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/backend-repo:latest

    - name: Push Docker image to ECR
      run: docker push 381491862732.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/backend-repo:latest
```

Purpose:
The above yaml files automate testing, Docker image creation, and deployment of the Node.js backend to AWS ECR. Ensures code quality and enables seamless updates to cloud infrastructure.


**Frontend.yml**:
```

React build process

Lighthouse audit

Artifact upload
