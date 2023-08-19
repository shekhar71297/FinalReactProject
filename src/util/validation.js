export const isValidName = (name) => /^[a-zA-Z ]{5,20}$/.test(name);
export const isValidEmail = (email) => /^[a-z0-9._%+-]+@([a-z0-9.-]{5})+\.[a-z]{2,4}$/.test(email);
export const isValidContact = (contact) => /^[0-9]{10}$/.test(contact);
export const isValidQue = (que) => /^[a-zA-Z0-9 ]{5,100}$/.test(que);