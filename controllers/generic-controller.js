const CatchAsync = require("../utils/catch-async");
const QueryMethod = require("../utils/query");

exports.getAll = (Model) =>
  CatchAsync(async (req, res) => {
    console.log("generic-controller/exports.getAll/begin")
    /*let filter = req.params.tourId ? { tourRef: req.params.tourId } : {};
    const features = new QueryMethod(Model.find(filter), req.query)*/
    //console.log("req.query",req)
    let filter ={}
    const features = new QueryMethod(Model.find(filter), req.query)
      .sort()
      .limit()
      .paginate()
      .filter();

    const docs = await features.query;
    res.status(200).json({
      status: "success",
      results: docs.length,
      data: docs,
    });
    console.log("generic-controller/exports.getAll/end")
  });
