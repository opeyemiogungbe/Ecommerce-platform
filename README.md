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
6. [Cloud Deployment](#cloud-deployment)

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
    .github/
    ├── workflows/
    │   ├── backend-ci.yml    # Build/test backend
    │   ├── frontend-ci.yml   # Build/test frontend
    │   └── deploy.yml        # Deploy to AWS (ECS/EC2/Lambda)
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

### Task 1: Backend Api Setup
1. We initialize a Git repository and add it to our project structure. We are also going to create Github/workflows directory in our repository for github actions.
2. In the home directory, we are going to create two directory/folder which is the API (for our backend) 
3. We are going to install Node.js projects to install all dependencies listed in the package.json file.

```
mkkdir Api
cd api
npm install
npm run dev  # Starts server on port 3000
npm test     # Run unit tests
```

### Task 2: Frontend webapp Setup
1. From the home directory, we are going to create the webapp directoryand navigate to it
2. We will install React

```
mkdir webapp
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
name: Frontend CI/CD

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
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Cache Node.js dependencies   # Caching dependencies step
      uses: actions/cache@v3
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-

    - name: Install dependencies
      run: npm install
      working-directory: ./webapp

    - name: Run tests
      run: npm test
      working-directory: ./webapp

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
      run: docker build -t frontend:latest -f webapp/Dockerfile ./webapp

    - name: Tag Docker image
      run: docker tag frontend:latest 381491862732.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/frontend-repo:latest

    - name: Push Docker image to ECR
      run: docker push 381491862732.dkr.ecr.${{ secrets.AWS_REGION }}.amazonaws.com/frontend-repo:latest
```

The above GitHub Actions YAML file defines a CI/CD pipeline for a frontend application. It automates the process of building, testing, and deploying the frontend to AWS Elastic Container Registry (ECR).

**Deployment.yml**

We decided to separate our deployment because we believe it's the best for, modularity, security, reuse, easy maintenance, clear trigger, and troubleshooting. it's always best practice to separate CI from CD. We also want to use Amazon ECS for our deployment. ECS is a great choice for containerized applications, and it can handle both our backend (Node.js/Express) and frontend (React) seamlessly. 
Here's how you can set it up:



```
name: ECS Deployment

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
    - name: Checkout code
      uses: actions/checkout@v4

    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ${{ secrets.AWS_REGION }}

    - name: Deploy Backend to ECS
      run: |
        aws ecs update-service \
          --cluster ecommerce-cluster \
          --service backend-service \
          --force-new-deployment \
          --region ${{ secrets.AWS_REGION }}

    - name: Deploy Frontend to ECS
      run: |
        aws ecs update-service \
          --cluster ecommerce-cluster \
          --service frontend-service \
          --force-new-deployment \
          --region ${{ secrets.AWS_REGION }}
```

This project successfully implements a modern e-commerce platform with a fully automated CI/CD pipeline, demonstrating industry best practices in DevOps, cloud deployment, and infrastructure management. Key achievements include:

1. Automated Workflows:

2. GitHub Actions pipelines for building, testing, and deploying backend (Node.js) and frontend (React) components.

3. Docker containerization for consistent environments across development and production.

4. Cloud Integration:

5 Seamless deployment to AWS using ECR (Elastic Container Registry) and ECS (Elastic Container Service).

6. Scalable architecture ready for traffic spikes and global distribution.

7.  Security & Reliability:

8. Secure credential management via GitHub Secrets.

9. Unit testing (Jest) and dependency caching for code quality and performance.

10. Flexibility:

11. Modular workflow design for easy maintenance and future scaling.

Future Enhancements includes.
Add monitoring (CloudWatch, Prometheus/Grafana), Implement blue/green deployments for zero-downtime updates, and Extend to multi-environment deployments (staging/production).

This project provides a robust foundation for modern e-commerce applications, balancing agility, scalability, and reliability. Leveraging automation and cloud-native tools ensures rapid iteration cycles while maintaining production-grade stability.
