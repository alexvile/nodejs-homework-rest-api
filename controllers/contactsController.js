
const { getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../services/contactsServices')

const getContactsController = async (req, res) => { 
    const contacts = await getContacts();
    res.status(200).json({ data: contacts});
}

const getContactByIdController = async (req, res) => {
    const { contactId } = req.params
    
    const foundContact = await getContactById(contactId);
      if (!foundContact) {
         return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ data: foundContact });
}

const addContactController = async (req, res ) => {
    const newContact = await addContact(req.body);
    return res.status(201).json({ data: newContact });
}

const removeContactController = async (req, res) => {
    const { contactId } = req.params

    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted" }); 
    }
    return res.status(404).json({ message: "Not found" });
}

const updateContactController = async (req, res) => {
    const {contactId} = req.params
    const { name, email, phone, favorite } = req.body

    const updatedContact = await updateContact(contactId, {name, email, phone, favorite})
    if (updatedContact) {
        return res.status(200).json({ data: updatedContact }); 
    }
    return res.status(404).json({ message: "Not found" });
}

const updateStatusContactController = async (req, res) => { 
    const { contactId } = req.params;
    const { favorite } = req.body
    
    const updatedContact = await updateStatusContact(contactId, { favorite });
    if (updatedContact) {
        return res.status(200).json({ data: updatedContact });
    }
    return res.status(404).json({ message: "Not found" });
}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
    updateStatusContactController
}