const { save_log } = require("../database")

let email_regex = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");

const middleware = async (req, res, next) => {
    const user = req.headers["x-user"];

    if(email_regex.test(user)) {
        await save_log({
            time: Date.now(),
            user,
            path: req.path,
            headers: req.headers,
            query: req.query,
            param: req.param,
            body: req.body
        });
        await next();
    } else res.status(401).send("Invalid User");
}

module.exports = middleware