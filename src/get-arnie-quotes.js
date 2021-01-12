const { httpGet } = require('./mock-http-interface');

/**
 * Gets Arnie quotes from a list of URLs 
 * @param {string[]} urls - The list of URLs to process
 * @return {Promise} Promise resolving to array of objects containing the quotes
 */
const getArnieQuotes = async (urls) => {

  // For each URL, create a promise to process it
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

  // Process promises concurrently and collect the results of each into an array
  return await Promise.all(promises);
};

module.exports = {
  getArnieQuotes,
};
