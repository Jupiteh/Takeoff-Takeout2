import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

interface IOrder extends Document {
  ID_Order: number;
  ID_Client: number;
  ID_Restaurant: number;
  ID_DeliveryMan: number;
  price: number;
  articles: number[]; // Champ pour stocker les IDs des articles
  menus: number[];
  state: string;
  validation_Code: string;
}

const orderSchema: Schema = new Schema({
  ID_Order: {
    type: Number,
    unique: true
  },
  ID_Client: {
    type: Number,
  },
  ID_Restaurant: {
    type: Number,
  },
  ID_DeliveryMan: {
    type: Number,
  },
  price: {
    type: Number,
  },
  articles: [{
    type: Number,
  }],
  menus: [{
    type: Number,
  }],
  state: {
    type: String,
  },
  validation_Code: {
    type: String,
  }
});

orderSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Order' });

const Order = model<IOrder>('Order', orderSchema);
export default Order;
