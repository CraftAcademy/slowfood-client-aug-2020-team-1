import axios from 'axios';

const signIn = async (email, password) => {
  let authResponse
  try {
    const response = await axios.post("/auth/sign_in", {
      email: email,
      password: password
    });
    authResponse = {data: response.data.data, authenticated: true}
    await storeAuthCredentials(response);

  } catch(error) {

    authResponse = {data: error.response.data.errors[0], authenticated: false}
  } finally {
    return authResponse
  }
};


const storeAuthCredentials = ({ headers }) => {
  const credentials = {
    uid: headers["uid"],
    client: headers["client"],
    access_token: headers["access-token"],
    expiry: headers["expiry"],
    token_type: "Bearer",
  };
  sessionStorage.setItem("credentials", JSON.stringify(credentials));
};

export { signIn };