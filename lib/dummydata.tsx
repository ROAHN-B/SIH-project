export type DummyMarketPrice = {
  city: string;
  crop: string;
  currentPrice: string;
  wholesale: string;
  retail: string;
};

export const dummyMarketData: DummyMarketPrice[] = [
  // --- Solapur Data ---
  {
    city: "Solapur",
    crop: "Pomegranate",
    currentPrice: "40 /kg",
    wholesale: "4000 Quintal",
    retail: "60 /kg",
  },
  {
    city: "Solapur",
    crop: "Jowar (Sorghum)",
    currentPrice: "31.36 /kg",
    wholesale: "3136.05 Quintal",
    retail: "56 /kg",
  },
  {
    city: "Solapur",
    crop: "Sugarcane",
    currentPrice: "3.5 /kg",
    wholesale: "350 quintal",
    retail: "50 /kg",
  },
  {
    city: "Solapur",
    crop: "Tur Dal",
    currentPrice: "107 /kg",
    wholesale: "10700 Quintal",
    retail: "142 /kg",
  },

  // --- Punjab (Amritsar) Data ---
  {
    city: "Amritsar",
    crop: "Wheat",
    currentPrice: "24",
    wholesale: "22",
    retail: "27",
  },
  {
    city: "Amritsar",
    crop: "Basmati Rice",
    currentPrice: "95",
    wholesale: "90",
    retail: "105",
  },
  {
    city: "Amritsar",
    crop: "Mustard",
    currentPrice: "58",
    wholesale: "55",
    retail: "62",
  },
  {
    city: "Amritsar",
    crop: "Potato",
    currentPrice: "18",
    wholesale: "15",
    retail: "22",
  },
];