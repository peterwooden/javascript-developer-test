const { httpGet } = require('./mock-http-interface');

/**
 * Gets Arnie quotes from a list of URLs 
 * @param {string[]} urls - The list of URLs to process
 * @return {Promise} Promise resolving to array of objects containing the quotes
 */
const getArnieQuotes = async (urls) => {

  // For each URL, create a promise to process it concurrently
  const promises = urls.map(async (url) => {

    // Execute GET request, and map errors into results
    const { status, body } = await httpGet(url).catch(error => error);

    // Parse body and extract message
    const { message } = JSON.parse(body);

    // Depending on the status code, return an object containing the message
    if (status === 200) {
      return { 'Arnie Quote': message };
    } else {
      return { 'FAILURE': message };
    }
  });

  // Return a promise resolving to an array of all the results
  return Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
