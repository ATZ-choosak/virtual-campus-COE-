import config from '../config'

const login = async (data) => {
  try {

    let res = await fetch(`${config.authPrefix}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    let token = await res.json()

    if (token.access_token) {
      localStorage.setItem("access_token", token.access_token)
    }

    return token;

  } catch (error) {

    return error.errors;
  }
}

const getAllRooms = async () => {

  try {

    let res = await fetch(`${config.apiPrefix}/room`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    return await res.json();

  } catch (error) {
    return error.errors;
  }
}

export { getAllRooms, login }