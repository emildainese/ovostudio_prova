const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      trim: true,
      required: [true, "Il nome è un campo obbligatorio"],
      min: [4, "Lunghezza minima 3 caratteri"],
      max: [32, "Lunghezza massima 30 caratteri"],
    },
    cognome: {
      type: String,
      trim: true,
      required: [true, "Il cognome è un campo obbligatorio"],
      min: [4, "Lunghezza minima 3 caratteri"],
      max: [32, "Lunghezza massima 30 caratteri"],
    },
    email: {
      type: String,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email non valida."],
      trim: true,
      required: [true, "Campo obbligatorio"],
      unique: [true, "Questa email è già stata utilizzata"],
    },
    citta: {
      type: String,
      required: [true, "La città è un campo obbligatorio"],
    },
    accettato: {
      type: Boolean,
      required: [true, "Sottoscrivi ai termini di servizio prima di procedere"],
    },
    cupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cupon",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      getters: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

//--------------------------------------------
userSchema.pre("save", function () {
  if (!this.accettato) {
    throw new Error("Sottoscrivi ai termini di servizio prima di procedere");
  }
});

//--------------------------------------------
userSchema
  .virtual("domain")
  .set(function (email) {
    this.domain = email.slice(email.indexOf("@") + 1);
  })
  .get(function () {
    return this.email.slice(this.email.indexOf("@") + 1);
  });

//---------------------------------------------
userSchema.methods = {
  isValidDomain: function (enteredDomain) {
    return this.domain === enteredDomain;
  },
};

const User = mongoose.model("User", userSchema);

module.exports = User;
