import axios from 'axios'

const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data.products;
};

export { getProducts };