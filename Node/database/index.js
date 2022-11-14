var fs = require("fs");

var DEV_DB = "./database/DB.dev.json";
var TEST_DB = "./database/DB.test.json";

var DB_URL = process.env.NODE_ENV == "test" ? TEST_DB : DEV_DB;
var default_schema = {
    beer_feedback: [],
    logs: []
};

const BUILD_SCHEMA = (schema) => {
    fs.readFile(DB_URL, "utf8", function readFileCallback(err, data){
        if (err){
            console.log(err);
            return false;
        } else {    
            json = JSON.stringify(schema || default_schema); //convert it back to json
            
            fs.writeFile(DB_URL, json, "utf8", function wrtieFileCallback(err, data) {
                console.log({ err, data });
            }); // write it back 

            return true;
        }
    });

    return true
}

const GET_RECORDS = (table_name) => {
    const text = fs.readFileSync(DB_URL, "utf8");
    const data = JSON.parse(text);

    return data[table_name];
}

const save_feedack = (feedback) => {
    fs.readFile(DB_URL, "utf8", function readFileCallback(err, data){
        if (err) {
            console.log(err);
            return false;
        } else {
            const DB = data ? JSON.parse(data) : default_schema; //now it an object
            const stored_index = DB.beer_feedback.findIndex(f => f.id == feedback.id);
            if(stored_index >= 0) DB.beer_feedback[stored_index] = feedback;
            else DB.beer_feedback.push(feedback);
            json = JSON.stringify(DB); //convert it back to json
            
            fs.writeFile(DB_URL, json, "utf8", function wrtieFileCallback(err, data) {
                console.log({ err, data });
            }); // write it back 

            return true;
        }
    });

    return true;
}

const save_log = (log) => {
    fs.readFile(DB_URL, "utf8",function readFileCallback(err, data){
        if (err){
            console.log(err);
            return false;
        } else {
            const DB = data ? JSON.parse(data) : default_schema; //now it an object
            DB.logs.push(log)
            json = JSON.stringify(DB); //convert it back to json
            
            fs.writeFile(DB_URL, json, "utf8", function wrtieFileCallback(err, data) {
                console.log({ err, data });
            }); // write it back 

            return true;
        }
    });

    return true
}

module.exports = { BUILD_SCHEMA, save_feedack, save_log, GET_RECORDS };