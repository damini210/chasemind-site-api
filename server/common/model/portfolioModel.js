const ModelBase = require("./modelBase");
const CONFIG = require("../../config");
const _ = require("lodash");
const { ObjectID } = require("mongodb");

class PortfolioModel extends ModelBase {
  constructor() {
    super(CONFIG.DB.MONGO.DB_NAME, "Portfolio", {
      title: { type: String, allowNullEmpty: false },
      // slug: { type: String, allowNullEmpty: false },
      shortDesc: { type: String, allowNullEmpty: false },
      Image: { type: String, allowNullEmpty: true },
      status: {
        type: Number,
        allowNullEmpty: false,
        enum: { 1: "active", 2: "inactive" },
      },
      type: {
        type: Number,
        allowNullEmpty: false,
        enum: { 1: "web", 2: "mobile" },
      },
      createdAt: { type: Object, allowNullEmpty: false },
      updatedAt: { type: Object, allowNullEmpty: false },
    });
  }

  /**
   * @description create Always return an unique id after inserting new user
   * @param {*} data
   * @param {*} cb
   */
  create(data, cb) {
    let err = this.validate(data);
    if (err) {
      return cb(err);
    }
    let self = this;
    if (!data.type) data.type = 1;
    data.status = 1;
    data.createdAt = new Date();
    self.insert(data, function (err, user) {
      if (err) {
        return cb(err);
      }
      delete user.ops[0].pwd;

      cb(null, user.ops[0]);
    });
  }

  updateOne(query, data, cb) {
    this.getModel(function (err, model) {
        if (err) {
            return cb(err);
        }
        model.updateOne(query, data, cb);
    });
}
}

module.exports = PortfolioModel;
