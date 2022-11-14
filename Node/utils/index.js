var axios = require("axios");

const fetch_api = async ({url, method, data, params, headers}) => {
    try {
        const result = await axios({
            url,
            method,
            headers,
            params,
            data
        })
    
        return result.data;
    } catch (error) {
        console.log("fetch api error", error);
    }
}

module.exports = { fetch_api }