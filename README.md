## Cloud technology project 
The project sets up a forum application for a sample company utilizing Kubernetes and Docker. The application is divided into three main components: a frontend, a backend, and a MongoDB database. Each of these components is containerized with Docker and orchestrated using Kubernetes deployments, services, and persistent volume claims. To ensure scalability based on resource demand, horizontal pod autoscalers are implemented for both the frontend and backend. The entire infrastructure is described using YAML configuration files, with a Docker Compose file provided for local development.

Reference ```main.pdf``` file for further details on architecture.
