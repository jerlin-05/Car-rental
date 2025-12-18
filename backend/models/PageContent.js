import mongoose from "mongoose";

const pageContentSchema = new mongoose.Schema({
  key: String,
  content: String,
});

export default mongoose.model("PageContent", pageContentSchema);
