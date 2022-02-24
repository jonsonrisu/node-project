const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbConfig = require("../config/db.config");

const mongoosePaginate = require('mongoose-paginate-v2');
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url
db.user = require("./user.model");
db.role = require("./role.model");
db.post = require("./post.model")(mongoose, mongoosePaginate);
db.tea = require("./tea.model");


db.ROLES = ["user", "admin", "moderator"];

module.exports = db;

