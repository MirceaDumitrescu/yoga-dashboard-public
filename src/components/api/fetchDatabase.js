/**
 *
 * This is a function that is used to fetch data from the Local MongoDB
 *
 */

const fetchDatabase = async (url, method, body) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { error: 'Invalid Token' };
  } else {
    try {
      const response = await fetch(url, {
        method: method,
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error 1318 ocurred');
      console.error('No Local MongoDB found');
    }
  }
};

export default fetchDatabase;
