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

const postItem = async (item, cancelToken) => {
  let URI = URL.concat(`/items`);
  try {
    const { data } = await axios.post(URI, item, { cancelToken });
    return data;
  } catch (error) {
    return error;
  }
};

const putItem = async (id, item, cancelToken) => {
  let URI = URL.concat(`/items/${id}`);
  try {
    const { data } = await axios.put(URI, item, { cancelToken });
    return data;
  } catch (error) {
    return error;
  }
};

const deleteItem = async (id, cancelToken) => {
  let URI = URL.concat(`/items/${id}`);
  try {
    const { data } = await axios.delete(URI, { cancelToken });
    return data;
  } catch (error) {
    return error;
  }
};

export { getItems, postItem, putItem, deleteItem };
