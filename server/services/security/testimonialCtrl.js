let testimonialCtrl = {};
const AdminUserModel = new (require("../../common/model/adminUserModel"))
const HttpRespose = require("../../common/httpResponse");
const AppCode = require("../../common/constant/appCods");
const testimonialModel = new (require("../../common/model/testimonialModel"));
const _ = require("lodash");

//create testimonial 

testimonialCtrl.create = (req, res) => {
    var response = new HttpRespose()
    var data = req.body;
    console.log(data);
    testimonialModel.create(data, (err, testimonial) => {
        if (err) {
            console.log(err)
            response.setError(AppCode.Fail);
        } else {
            response.setData(AppCode.Success);
            response.send(res);
        }
    });
};

/* testimonial Data List */
testimonialCtrl.testimonialDataList = (req, res) => {
    const response = new HttpRespose();

    try {
        let query = [

            {
                $project: {
                    _id: 1,
                    clientName: 1,
                    countryName: 1,
                    review: 1,
                    status: 1,
                    createdAt: 1,
                }
            }
        ];
        console.log(query)

        testimonialModel.advancedAggregate(query, {}, (err, subUnitData) => {
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

module.exports = testimonialCtrl;
