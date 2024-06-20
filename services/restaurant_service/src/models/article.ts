import mongoose, { Schema, Document, model } from 'mongoose';
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

interface IArticle extends Document {
  ID_Article: number;
  ID_Restaurant: number;
  article_Name: string;
  image: string; // Ajouter un champ pour stocker l'image
}

const articleSchema: Schema = new Schema({
  ID_Article: {
    type: Number,
    unique: true
  },
  ID_Restaurant: {
    type: Number,
    unique: true
  },
  article_Name: {
    type: String,
    required: true
  },
  image: {
    type: String, // Stocker le chemin de l'image
    required: false
  },
  price: {
    type: Number,
  }
});

articleSchema.plugin(AutoIncrementFactory, { inc_field: 'ID_Article' });

const Article = model<IArticle>('Article', articleSchema);

export default Article;
