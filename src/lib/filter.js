/**
 * @typedef {Object} Geo
 * @property {string} lat - User Address Latitude.
 * @property {string} lng - User Address Longitude.
 */

/**
 * @typedef {Object} Address
 * @property {string} street - Street Name.
 * @property {string} suite - Number of Suite or Unit.
 * @property {string} city - User City.
 * @property {string} zipcode - User Zip Kode.
 * @property {Geo} geo - Location User Coordinates.
 */

/**
 * @typedef {Object} Company
 * @property {string} name - Company Name of User.
 * @property {string} catchPhrase - Company Slogan.
 * @property {string} bs - Business Field Company.
 */

/**
 * @typedef {Object} User
 * @property {number} id - ID User.
 * @property {string} name - Fullname User
 * @property {string} username - Username User.
 * @property {string} email - Email User.
 * @property {Address} address - User Address Data.
 * @property {string} phone - User Telephone number.
 * @property {string} website - Website User.
 * @property {Company} company - User Company Data.
 * 
 */

/**
 * Filter user data based on name.
 * @param {User[]} array - Array source data users.
 * @param {string} userName - contains input from the user.
 * @returns {User[]} - search result data .
 */
export default function filter(array, userName) {
  if (!userName.trim()) {
    return array;
  }

  return array.filter((user) =>
    user.name.toLowerCase().includes(userName.toLowerCase())
  );
}