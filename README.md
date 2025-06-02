# Hypervisor Cluster HA & LM Manager - Frontend

**⚠️ Warning:** This code is an academic project and is not intended for production use.

This application provides a web interface for managing high availability (HA) and live migration (LM) features in a cluster of hypervisors. It is built with Vue.js and integrates with backend services via WebSockets and an API.

## Main Features

- **Multi-user Support**  
  Multiple users can use the application simultaneously for multiple cluster management.

- **Management of HA Groups**  
  Create, view, and delete High Availability groups for organizing cluster nodes.

- **Adding and Removing VMs from HA Groups**  
  Assign virtual machines (VMs) to HA groups or remove them as needed to control their availability and failover behavior.

- **Live Migration**  
  Initiate live migration of VMs between nodes in the cluster, ensuring minimal downtime.

- **Fault Tolerance**  
  Add or remove VMs from the Fault Tolerance service to provide continuous availability in case of node failures.



## Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/rodrigo-gom3s/ess-frontend
   cd ess-frontend
   ```

2. **Install dependencies**
    ```sh
    npm install
    ```


3. **Run the development server**
    ```sh
    npm run dev
    ```


4. **Open your browser**

    Visit http://localhost:5173 (or the port shown in your terminal).

## Project Structure

 - `src/components/cluster/` — HA group management
 - `src/components/vms/` — VM management in HA groups
 - `src/components/live-migration/` — Live migration interface
 - `src/components/fault-tolerance/` — Fault tolerance management

## Requirements
 - Node.js (v16+ recommended)
 - npm