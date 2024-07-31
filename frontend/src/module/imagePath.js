import config from "../config"

const imagePath = (id) => {
    return `${config.fileApiPrefix}${id}`
}

export default imagePath