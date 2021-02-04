var mongoose = require("mongoose");

var schema = mongoose.Schema;

var bbsVO = new schema({
  b_date: String,
  b_time: String,
  b_title: String,
  b_write: String,
  b_text: String,
  b_count: Number,
});
module.exports = mongoose.model("tbl_bbs", bbsVO);
