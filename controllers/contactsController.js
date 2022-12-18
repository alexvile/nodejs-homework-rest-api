
const { getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../services/contactsServices')

const getContactsController = async (req, res) => { 
    const { _id: userId } = req.user
    const { page = 1, limit = 10, favorite = null } = req.query

    const searchOptions = { owner: userId }
      if (favorite !== null) {
          searchOptions.favorite = favorite;
    }

    const skip = (page - 1) * limit;

    const contacts = await getContacts(searchOptions, skip, Number(limit));
    res.status(200).json({ data: contacts});
}

const getContactByIdController = async (req, res) => {
    const { _id: userId } = req.user
    const { contactId } = req.params
    
    const foundContact = await getContactById(contactId, userId);

    return res.status(200).json({ data: foundContact });
}

const addContactController = async (req, res) => {
    const { _id: userId } = req.user;

    const newContact = await addContact(req.body, userId);
    const { name, email, phone, favorite, _id} = newContact;
    return res.status(201).json({ data: { name, email, phone, favorite, _id } });
}

const removeContactController = async (req, res) => {
    const { _id: userId } = req.user
    const { contactId } = req.params

    await removeContact(contactId, userId);
    return res.status(200).json({ message: "Contact deleted" }); 
}

const updateContactController = async (req, res) => {
    const { _id: userId } = req.user
    const { contactId } = req.params

    const updatedContact = await updateContact(contactId, userId, req.body);
    const { name, email, phone, favorite, _id } = updatedContact;

    return res.status(200).json({ data: { name, email, phone, favorite, _id } }); 
}

const updateStatusContactController = async (req, res) => { 
    const { _id: userId } = req.user
    const { contactId } = req.params
    
    const updatedContact = await updateStatusContact(contactId, userId, req.body);
    const { name, email, phone, favorite, _id } = updatedContact;

    return res.status(200).json({ data: { name, email, phone, favorite, _id} });

}

module.exports = {
    getContactsController,
    getContactByIdController,
    addContactController,
    removeContactController,
    updateContactController,
    updateStatusContactController
}