import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderItemSchema = new mongoose.Schema({
  name: { type: Schema.Types.String, required: true },
  createdAt: Schema.Types.Date,
  price: { type: Schema.Types.Number, require: true },
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

orderItemSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

orderItemSchema.path('price').set(function(num) {
  return num * 100;
});

export default OrderItem;
