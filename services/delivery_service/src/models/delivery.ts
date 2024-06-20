import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

interface IDelivery extends Document {
  ID_Delivery: number;
  ID_Client: number;
  ID_Restaurant: number;
  ID_DeliveryMan: number;
  latitude: number;
  longitude: number;
  // price: number;
  // articles: number[]; // Champ pour stocker les IDs des articles
  // state: string;
}

const deliverySchema: Schema = new Schema({
  ID_Delivery: {
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
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  }
  // price: {
  //   type: Number,
  // },
  // articles: [{
  //   type: Number,
  // }],
  // state: {
  //   type: String,
  // }
});

deliverySchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Delivery' });

const Delivery = model<IDelivery>('Delivery', deliverySchema);
export default Delivery;
