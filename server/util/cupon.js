const offerExpires = (target) => {
  let daysFromToday;
  const now = new Date();
  const dayNames = [
    "Lunedi",
    "Martedi",
    "Mercoledi",
    "Giovedi",
    "Venerdi",
    "Sabato",
    "Domenica",
  ];
  const monthName = [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ];
  if (typeof target === "string") {
    const match = target.match(/^(\d+)(m|w|g|)$/);
    if (!match) throw new Error("Ivalid Format");
    const suffix = match[2];
    const value = +match[1];
    switch (suffix) {
      case "m":
        daysFromToday = new Date(
          now.getTime() + getTotalDays(value) * 24 * 60 * 60 * 1000
        );
        break;
      case "w":
        daysFromToday = new Date(
          now.getTime() + 7 * value * 24 * 60 * 60 * 1000
        );
        break;
      case "g":
        daysFromToday = new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
        break;
      default:
        throw new Error("Invalid Format");
    }
  } else if (typeof target === "number") {
    daysFromToday = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  }
  const day = dayNames[daysFromToday.getDay()];
  const date = daysFromToday.getDate();
  const month = monthName[daysFromToday.getMonth()];
  const year = daysFromToday.getFullYear();
  return day + " " + date + " " + month + " " + year;
};

const getDaysInMonth = (month) => {
  return new Date(new Date().getFullYear(), month + 1, 0).getDate();
};

const getTotalDays = (numMonts) => {
  let total = 0;
  for (let i = 0; i < numMonts; ++i) {
    total += getDaysInMonth(new Date().getMonth() + i);
  }
  return total;
};

const isExpire = (day, month, year) => {
  return Date.now() >= new Date(new Date(year, month - 1, day + 1)).getTime();
};

module.exports = {
  offerExpires,
  isExpire,
};
