var express = require("express");
var router = express.Router();

const moment = require("moment");
var bbsVO = require("../models/bbsModel");

router.get("/list", function (req, res) {
  bbsVO.find().then(function (bbsList) {
    res.render("bbsList", { bbsList });
  });
});

router.get("/write", function (req, res) {
  let data = new bbsVO();
  res.render("bbsWrite", { bbsVO: data });
});

router.post("/write", function (req, res) {
  req.body.b_date = moment(new Date()).format("YYYY-MM-DD");
  req.body.b_time = moment(new Date()).format("HH:mm:ss");

  let data = new bbsVO(req.body);

  data
    .save()
    .then(function (bbsVO) {
      res.redirect("/bbs/list");
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/view/:id", function (req, res) {
  let id = req.params.id;

  bbsVO
    .findOne({ _id: id })
    .then(function (result) {
      res.render("bbsView", { bbsVO: result });
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  bbsVO
    .findOneAndDelete({ _id: id })
    .then(function (result) {
      res.redirect("/bbs/list");
    })
    .catch(function (error) {
      console.error(error);
    });
});

router.get("/update/:id", function (req, res) {
  let id = req.params.id;
  bbsVO.findOne({ _id: id }).then(function (result) {
    res.render("bbsWrite", { bbsVO: result });
  });
});

router.post("/update/:id", function (req, res) {
  let id = req.params.id;
  req.body._id = id;

  bbsVO
    .updateOne(
      { _id: id },
      {
        b_title: req.body.b_title,
        b_write: req.body.b_write,
        b_text: req.body.b_text,
      }
    )
    .then(function (result) {
      res.redirect("/bbs/list");
    });
});
module.exports = router;
