import config from "../config"

const imagePath = (id) => {
    return `${config.apiPrefix}/uploads/${id}`
}

export default imagePath