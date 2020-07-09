import mongoose from "mongoose";

const gradeScheema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error("value cannot be less than zero");
    },
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const gradeModel = mongoose.model("Grade", gradeScheema);

export default gradeModel;
