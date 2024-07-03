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

const getAllUsers = async () => {

  try {

    let res = await fetch(`${config.apiPrefix}/user`, {
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

const addRoom = async (data) => {

  try {

    let token = window.localStorage.getItem("access_token")

    let res = await fetch(`${config.apiPrefix}/room`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    return await res.json();

  } catch (error) {
    return error.errors;
  }
}

const addUser = async (data) => {

  try {

    let token = window.localStorage.getItem("access_token")

    let res = await fetch(`${config.apiPrefix}/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });

    return await res.json();

  } catch (error) {
    return error.errors;
  }
}

const deleteRoom = async (id) => {

  try {

    let token = window.localStorage.getItem("access_token")

    let res = await fetch(`${config.apiPrefix}/room/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });

    return await res.json();

  } catch (error) {
    return error.errors;
  }
}

const logout = () => {
  window.localStorage.removeItem("access_token")
  window.location.href = "/"
}

export { getAllRooms, getAllUsers, login, addRoom, logout, deleteRoom, addUser }