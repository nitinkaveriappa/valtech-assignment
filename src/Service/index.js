import axios from 'axios';

const URL = process.env.REACT_APP_API;

const getItems = async (cancelToken) => {
  let URI = URL.concat(`/items`);
  try {
    const { data } = await axios.get(URI, { cancelToken });
    return data;
  } catch (error) {
    return error;
  }
};

export { getItems };
