const { Contact } = require('../db/contactModel');

const getContacts = async () => { 
    const contacts = await Contact.find({});
    return contacts
}

const getContactById = async (id) => { 
    const foundContact = await Contact.findById(String(id));
    return foundContact;
}

const addContact = async (body) => { 
    const newContact = new Contact(body);
    await newContact.save();
    return newContact;
}

const removeContact = async (id) => { 
    const deletedContact = await Contact.findByIdAndDelete(String(id));
    return deletedContact;
}

const updateContact = async (id, {name, email, phone, favorite }) => { 
    const updatedContact = await Contact.findByIdAndUpdate(String(id), { name, email, phone, favorite }, { new: true });
    return updatedContact;
}

const updateStatusContact = async (id, { favorite }) => { 
    const updatedContact = await Contact.findByIdAndUpdate(String(id), { $set: { favorite } }, { new: true })
    return updatedContact;
}
module.exports = {
    getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact
}