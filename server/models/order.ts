import * as mongoose from 'mongoose';
import OrderItem from './orderItem';

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
  name: { type: Schema.Types.String, required: true },
  createdAt: Schema.Types.Date,
  modifiedAt: Schema.Types.Date,
  completedAt: Schema.Types.Date,
  deliveryCost: Schema.Types.Number,
  paymentMethod: { type: Schema.Types.String, default: 'Gotówka' },
  status: { type: Schema.Types.String, default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }]
});

orderSchema.methods.createItem = (fields, user) => {
  const orderItemModel = new OrderItem(Object.assign(fields, {
    user: user._id,
    order: this._id
  }));
  return orderItemModel.save();
};

orderSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = new Date;
  } else {
    this.modifiedAt = new Date;
  }
  next();
});

orderSchema.path('deliveryCost').get(function(num) {
  if (isNaN(num)) {
    return null;
  }
  return (num / 100).toFixed(2);
});

orderSchema.path('deliveryCost').set(function(num) {
  return num * 100;
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
