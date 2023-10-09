import mongoose from "mongoose";

const ClientShema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
});

export const Client = mongoose.model("Client", ClientShema);
