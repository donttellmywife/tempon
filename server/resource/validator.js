export const atleastOne = array => array.length > 0

// any chras till @ any chars till dot any chars after
export const emailValidation = (email) => /^.+[@].+\..+$/.test(email)
