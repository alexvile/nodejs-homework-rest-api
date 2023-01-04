const { Contact } = require('../db/contactModel');
const { NotFoundError } = require('../helpers/errors');


const getContacts = async (searchOptions, skip, limit) => { 

    const contacts = await Contact.find(searchOptions, { __v: 0 }, {skip, limit}).populate("owner", "_id email");
    return contacts;
}

const getContactById = async (contactId, userId) => { 
    // const foundContact = await Contact.findById(contactId);
    const foundContact = await Contact.findOne({_id: contactId, owner: userId}, {__v: 0}).populate("owner", "_id email");

    if (!foundContact) {
         throw new NotFoundError("Not found");
    }
    return foundContact;
}

const addContact = async ({ name, email, phone, favorite }, userId) => { 
    const newContact = new Contact({ name, email, phone, favorite, owner: userId });
    await newContact.save();
    return newContact;
}

const removeContact = async (contactId, userId) => { 
    // const deletedContact = await Contact.findByIdAndDelete(String(id));
    const deletedContact = await Contact.findOneAndDelete({_id: contactId, owner: userId});

    if (!deletedContact) {
         throw new NotFoundError("Not found");
    }
    return deletedContact;
}

const updateContact = async (contactId, userId, {name, email, phone, favorite }) => { 
    // const updatedContact = await Contact.findByIdAndUpdate(String(id), { name, email, phone, favorite }, { new: true });
    const updatedContact = await Contact.findOneAndUpdate({_id: contactId, owner: userId}, { name, email, phone, favorite }, { new: true });
    if (!updatedContact) {
         throw new NotFoundError("Not found");
    }
    return updatedContact;
}

const updateStatusContact = async (contactId, userId, { favorite }) => { 
    // const updatedContact = await Contact.findByIdAndUpdate(String(id), { $set: { favorite } }, { new: true });
    const updatedContact = await Contact.findOneAndUpdate({_id: contactId, owner: userId}, { $set: { favorite } }, { new: true });

    if (!updatedContact) {
         throw new NotFoundError("Not found");
    }
    return updatedContact;
}
module.exports = {
    getContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact
}