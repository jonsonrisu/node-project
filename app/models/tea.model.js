const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

module.exports = (mongoose, mongoosePaginate) => {
    var teaSchema = mongoose.Schema({
        name: { type: String, required: true },
        image: String,
        description: String,
        keywords: String,
        origin: String,
        brew_time: Number,
        temperature: Number,
        comments: [{ text: String, date: { type: String, default: new Date() }, user: String }]
    });
    teaSchema.set('timestamps', true);
    teaSchema.plugin(mongoosePaginate);
    
    teaSchema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Tea = mongoose.model("Tea", teaSchema);
    return Tea;
}
