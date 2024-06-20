import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

interface ICart extends Document {
  ID_Cart: number;
  ID_Client: number;
  ID_Restaurant: number;
  price: number;
  articles: number[]; // Champ pour stocker les IDs des articles
  menus: number[]; // Champ pour stocker les IDs des articles
}

const cartSchema: Schema = new Schema({
    ID_Cart: {
    type: Number,
    unique: true
  },
  ID_Client: {
    type: Number,
  },
  ID_Restaurant: {
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
  }]
});

cartSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Cart' });

const Cart = model<ICart>('Cart', cartSchema);
export default Cart;
