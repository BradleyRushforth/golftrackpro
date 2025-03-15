export const getClubAbbreviation = (clubNumber: string): string => {

  if (clubNumber.toLowerCase() === "driver") return "DR";

  if (clubNumber.includes("Wood")) return `${clubNumber[0]}W`;

  if (clubNumber.includes("Hybrid")) return `${clubNumber[0]}H`;

  if (clubNumber.endsWith("i")) return clubNumber;

  const wedgeMapping: { [key: string]: string } = {
    "46°": "PW", "48°": "PW",
    "50°": "GW", "52°": "GW",
    "54°": "AW", "56°": "AW",
    "58°": "LW", "60°": "LW", "62°": "LW", "64°": "LW", "68°": "LW",
  };

  return wedgeMapping[clubNumber] || clubNumber;
};