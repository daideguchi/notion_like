//認証用のAPIファイル

const { default: axiosClient } = require("./axiosClient");

const authApi = {
 register: (params) => axiosClient.post("auth/register", params)}

export default authApi;