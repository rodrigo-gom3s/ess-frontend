# Mikrotik Controller on Vue.js

> ⚠️ **Warning**: This project is an **academic project** and is intended for educational purposes only. It may not cover all edge cases or advanced Mikrotik configurations.

This project is an **academic project** developed to manage Mikrotik routers using a Vue.js-based interface. It provides an intuitive and user-friendly way to interact with Mikrotik devices, allowing users to configure interfaces, manage peers, and monitor network settings.

## Main Functionalities

- **Manage Multiple Devices**: Control more than one Mikrotik device using the same application.
- **Interface Management**:
  - List all interfaces of the device.
  - List only wireless interfaces.
- **Bridge Management**:
  - List, create, edit, and delete bridge interfaces and their associated ports.
- **Wireless Security Profiles**:
  - Create, edit, and delete security profiles for use in wireless networks.
- **Wireless Network Management**:
  - Enable, disable, and configure wireless networks.
- **Static Routes**:
  - List, create, edit, and delete static routes.
- **IP Address Management**:
  - List, create, edit, and delete IP addresses.
- **DHCP Servers**:
  - List, create, edit, and delete DHCP servers.
- **DNS Server Management**:
  - Enable, disable, and configure the DNS server.

## Prerequisites

This project requires a Python backend to function properly. Make sure to set up and run the backend before using this application. The backend handles communication with Mikrotik devices and provides the necessary APIs for the Vue.js frontend.

### Backend Setup

1. Clone the Python backend repository:
   ```sh
   git clone https://github.com/iuricarras/lti-mikrotik-python.git
   cd lti-mikrotik-python
   ```

2. Follow the instructions in the backend's `README.md` file to set it up and start the server.

3. Ensure the backend is running and accessible before starting the Vue.js frontend.


## Project Setup (Frontend)

Follow these steps to set up the Vue.js frontend:

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/iuricarras/lti-mikrotik.git
   cd lti-mikrotik
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Project

#### Compile and Hot-Reload for Development
To start the development server with hot-reloading:
```sh
npm run dev
```

#### Compile and Minify for Production
To build the project for production:
```sh
npm run build
```

### Deployment
After building the project, the production-ready files will be available in the `dist` folder. You can deploy these files to any static hosting service.

## Notes

This project is intended for academic purposes and may not cover all edge cases or advanced Mikrotik configurations. Use it as a learning tool or as a starting point for more complex projects.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
