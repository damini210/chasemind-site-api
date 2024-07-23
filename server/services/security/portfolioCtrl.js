let portfolioCtrl = {};
const HttpRespose = require("../../common/httpResponse");
const AppCode = require("../../common/constant/appCods");
const _ = require("lodash");
const portfolioModel = new (require("../../common/model/portfolioModel"))();
const ObjectID = require("mongodb").ObjectID;

/* Create Portfolio Data */
portfolioCtrl.createOrUpdate = (req, res) => {
  console.log(req.body);
  if (req.body._id) {
    const response = new HttpRespose();
    let query = { _id: ObjectID(req.body._id) };
    const data = req.body;
    if (req.files.Image) {
      data.Image = req.files.Image[0].filename;
    }
    data.updatedAt = new Date();
    delete data._id;
    portfolioModel.updateOne(query, { $set: data }, function (err, portfolio) {
      if (err) {
        AppCode.Fail.error = err.message;
        response.setError(AppCode.Fail);
        response.send(res);
      } else {
        response.setData(AppCode.PortfolioUpdateeSuc, portfolio);
        response.send(res);
      }
    });
  } else {
    let response = new HttpRespose();
    let data = req.body;
    delete data._id;
    if (req.files.Image) {
      data.Image = req.files.Image[0].filename;
    }
    portfolioModel.create(data, (err, portfolio) => {
      if (err) {
        console.log(err);
        response.setError(AppCode.Fail);
      } else {
        response.setData(AppCode.PortfolioSaveSuc, portfolio);
        response.send(res);
      }
    });
  }
};

/* portfolio Data List */
portfolioCtrl.portfolioDataList = (req, res) => {
  const response = new HttpRespose();

  try {
    let query = [
      {
        $project: {
          _id: 1,
          title: 1,
          type: 1,
          shortDesc: 1,
          status: 1,
          createdAt: 1,
        },
      },
    ];
    console.log(query);

    portfolioModel.advancedAggregate(query, {}, (err, subUnitData) => {
      if (err) {
        throw err;
      } else if (_.isEmpty(subUnitData)) {
        response.setError(AppCode.NotFound);
        response.send(res);
      } else {
        response.setData(AppCode.Success, subUnitData);
        response.send(res);
      }
    });
  } catch (exception) {
    response.setError(AppCode.InternalServerError);
    response.send(res);
  }
};

/* portfolio Details By Id For Admin */
portfolioCtrl.portfolioDetailsByIdForAdmin = (req, res) => {
  const response = new HttpRespose();
  try {
    let query = [
      {
        $match: {
          _id: ObjectID(req.query._id),
        },
      },
    ];
    portfolioModel.aggregate(query, (err, portfolio) => {
      if (err) {
        throw err;
      } else if (_.isEmpty(portfolio)) {
        response.setError(AppCode.NotFound);
        response.send(res);
      } else {
        response.setData(AppCode.Success, portfolio[0]);
        response.send(res);
      }
    });
  } catch (exception) {
    response.setError(AppCode.InternalServerError);
    response.send(res);
  }
};

portfolioCtrl.portfolioActiveDeactive = (req, res) => {
  const response = new HttpRespose();
  let query = { _id: ObjectID(req.body._id) };
  portfolioModel.updateOne(
    query,
    { $set: { status: req.body.status } },
    function (err, product) {
      if (err) {
        AppCode.Fail.error = err.message;
        response.setError(AppCode.Fail);
        response.send(res);
      } else {
        response.setData(AppCode.Success, product);
        response.send(res);
      }
    }
  );
};

/* portfolio List For front layout */
portfolioCtrl.portfolioFrontList = (req, res) => {
  const response = new HttpRespose();
  try {
      let query = [
          {
              $match: { status: 1 }
          },
          { $sort: { createdAt: -1 } },
      ];
      portfolioModel.advancedAggregate(query, {}, (err, portfolio) => {
          if (err) {
              console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", err)
              throw err;
          } else if (_.isEmpty(portfolio)) {
              response.setError(AppCode.NotFound);
              response.send(res);
          } else {
              response.setData(AppCode.Success, portfolio);
              response.send(res);
          }
      });
  } catch (exception) {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", exception)
      response.setError(AppCode.InternalServerError);
      response.send(res);
  }
}

module.exports = portfolioCtrl;
