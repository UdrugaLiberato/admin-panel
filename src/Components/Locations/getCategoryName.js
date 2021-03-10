export const getCategoryName = (categoryID) => {
  switch (categoryID) {
    case "46b9d65f-1768-41bd-a356-3ea2f372d10d":
      return "Zdravstvo";
    case "47e9102a-0d1a-432c-a328-13d532bcc060":
      return "Javne ustanove";
    case "4cd1046c-a62f-4b19-a367-9b7abe56cda6":
      return "Ostalo";
    case "54b89778-2e17-4e67-b966-e9d1b04e6de7":
      return "Obrazovanje";
    case "a1ca0e08-6bd6-4554-8a44-2d4a8a80ed0c":
      return "Sport";

    case "c6f04a72-422d-4f64-8176-fa9e2d87c702":
      return "Kultura";
    case "c9282ce0-b27c-449c-a41e-d2cc3464930b":
      return "Parking";
    case "f61fe32d-4450-4b1b-bc6a-249a5feb257d":
      return "Hrana i pice";
    default:
      return "Unknown";
  }
};
