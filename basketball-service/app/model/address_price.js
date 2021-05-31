'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const AddressPriceSchema = new Schema({
    address: {
      type: String,
    },
    // 全场价格
    fullPrice: {
      type: Number,
    },
    // 半场价格
    halfPrice: {
      type: Number,
    },
  });
  return mongoose.model('address_price', AddressPriceSchema);
};
