import config from '../config'

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

  export {getAllRooms}