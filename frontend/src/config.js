/* eslint-disable no-undef */
const isProd = process.env.NODE_ENV === 'production'

const config = {
    apiPrefix: isProd ? '/api' : "http://localhost:6455/api",
    authPrefix: isProd ? '/auth' : "http://localhost:6455/auth",
    fileApiPrefix: isProd ? '/' : "http://localhost:6455",
}

export default config