# IDP-PWeb

### Team structure

- [Balasoiu Cristina-Ioana 344C5](https://github.com/ioana01)
- [Popa Stefan-Andrei 344C5](https://github.com/stefanp0pa)
- [Popovici Andrei 344C3](https://github.com/AndreiP97)

### Prototype and Wireframes

Prototype and wireframes were made using [Figma](https://www.figma.com/file/6AE7SQ7qbxziPBOEj16Dgg/PWeb-IDP---Balasoiu-Ioana%2C-Popa-Stefan%2C-Popovici-Andrei).

### Documentation

- [User-Stories](documentation/User-stories.pdf)
- [Macro architecture document](documentation/Document-cu-arhitectura-macro.pdf)
- [Micro architecture document](documentation/Document-cu-arhitectura-micro.pdf)

### Docker

During development, we worked on the Docker side from two different machines, one that uses **Intel x86 architecture**, and one that uses **ARM**. We have noticed that the Docker images compiled on one machine are not compatible with the other one during testing. Since our Docker images were not cross-architecture, we developed one different set of images for each architecture.

- [Portainer stack agent](portainer-agent-stack.yml)
- [Docker stack for ARM architecture](docker-stack-react-arm.yml)
- [Docker stack for Intel architecture](docker-stack-react-x86.yml)

For our stack we employ the following images:
- **React** for the client application
- **Flask** for the backend application
- **MongoDB** for data persistence
- **RabbitMQ** for message queue
- **Python** for the worker application that receives messages
- **Kong** for reverse proxy
- **Prometheus** for logs monitoring
- **Grafana** for logs dashboard
- **Portainer** for managing the stack


