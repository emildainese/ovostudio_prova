const mongoose = require("mongoose");

const cuponSchema = mongoose.Schema(
  {
    shopDiscountCode: {
      type: String,
      required: [true, "Campo Obbligatorio"],
    },
    commerceDiscountCode: {
      type: String,
      required: [true, "Campo Obbligatorio"],
    },
    expireAt: {
      type: Date,
    },
    isExpire: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

//---------------------------------------------------------
cuponSchema.pre("save", function (next) {
  this.expireAt = new Date(2020, new Date().getMonth(), 31);
  if (this.isExpired()) {
    this.isExpire = true;
    throw new Error(
      `L'offerta è scaduta il ${this.expireAt.toString().substring(0, 10)}`
    );
  }
  next();
});

//---------------------------------------------------------
cuponSchema.methods = {
  isExpired: function () {
    return Date.now() >= new Date(this.expireAt).getTime();
  },
};

const Cupon = mongoose.model("Cupon", cuponSchema);

module.exports = { Cupon, cuponSchema };
