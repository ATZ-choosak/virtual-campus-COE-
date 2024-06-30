import config from '../config'

const login = async (data) => {
  try {

    let res = await fetch(`${config.authPrefix}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: data
    });

    return await res.json();

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