import axios from 'axios'

const createOrder = async (productId) => {
  let headers = sessionStorage.getItem("credentials")
  headers = JSON.parse(headers)
  headers = {
    ...headers,
    "Content-type": "application/json",
    Accept: "application/json"
  }

  try {
    const response = await axios.post("/orders", {
      product: productId
    }, {
      headers: headers
    });

    return response.data
  } catch(error) {
    console.log(error.response)
  }
};

export { createOrder };