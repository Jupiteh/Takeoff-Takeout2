import mongoose, { Schema, Document } from 'mongoose';

interface IMenuArticle extends Document {
  ID_Menu: number;
  ID_Article: number;
}

const menuArticleSchema: Schema = new Schema({
  ID_Menu: {
    type: Number,
    required: true
  },
  ID_Article: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IMenuArticle>('MenuArticle', menuArticleSchema);
