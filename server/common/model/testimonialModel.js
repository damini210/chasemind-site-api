const ModelBase = require("./modelBase");
const CONFIG = require("../../config");
const _ = require("lodash");
class testimonialModel extends ModelBase {
  constructor() {
    super(CONFIG.DB.MONGO.DB_NAME, "testimonial", {
      clientName: { type: String, allowNullEmpty: false },
      review: { type: String, allowNullEmpty: false },
      countryName: { type: String, allowNullEmpty: false },
      status: {
        type: Number,
        allowNullEmpty: false,
        enum: { 1: "active", 2: "inactive" },
      },
      createdAt: { type: Object, allowNullEmpty: false },
      updatedAt: { type: Object, allowNullEmpty: true },
    });
  }

  create(data, res) {
    var err = this.validate(data);
    if (err) {
      return res(err);
    }
    var self = this;
    data.status = 1;
    data.createdAt = new Date();
    self.insert(data, function (err, testimonial) {
      if (err) {
          return res(err);
      }
      res(null, testimonial.ops[0]);
  });
  }
}

module.exports = testimonialModel;
