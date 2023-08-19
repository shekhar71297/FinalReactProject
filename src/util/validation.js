export const isValidName = (name) => /^[a-zA-Z]{5,10}$/.test(name);
export const isValidEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
export const isValidContact =(contact) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(contact);