import Client from "./client.model.js"

export const getAllClients = async (req, res) => {
    try {
        const clients = await Client.find()
        res.json(clients)
    } catch (error) {
        res.status(500).json({ message: "Error fetching clients", error: error.message })
    }
}

export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id)
        if (!client) {
            return res.status(404).json({ message: "Client not found" })
        }
        res.json(client)
    } catch (error) {
        res.status(500).json({ message: "Error fetching client", error: error.message })
    }
}

export const createClient = async (req, res) => {
    try {
        const newClient = new Client(req.body)
        await newClient.save();
        res.status(201).json(newClient)
    } catch (error) {
        res.status(400).json({ message: "Error creating client", error: error.message })
    }
}

export const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedClient) {
            return res.status(404).json({ message: "Client not found" })
        }
        res.json(updatedClient)
    } catch (error) {
        res.status(400).json({ message: "Error updating client", error: error.message })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id)
        if (!deletedClient) {
            return res.status(404).json({ message: "Client not found" })
        }
        res.json({ message: "Client deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting client", error: error.message })
    }
};
