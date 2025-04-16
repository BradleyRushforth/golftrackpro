import React from "react";

export const useSortClubs = (clubs: any[]) => {
  const clubOrder = ["Driver", "Wood", "Hybrid", "Iron", "Wedge", "Putter"];

  return [...clubs].sort((a, b) => {
    const aClubType = a.clubType.charAt(0).toUpperCase() + a.clubType.slice(1);
    const bClubType = b.clubType.charAt(0).toUpperCase() + b.clubType.slice(1);

    const typeComparison =
      clubOrder.indexOf(aClubType) - clubOrder.indexOf(bClubType);
    if (typeComparison !== 0) return typeComparison;

    if (aClubType === "Iron" || aClubType === "Wedge") {
      const getClubNumber = (club: any) => {
        const clubNumber = club.setConfiguration[0]?.clubNumber;
        if (!clubNumber) return 0;

        if (clubNumber === "PW" || clubNumber === "SW") {
          return 100;
        }

        const match = clubNumber.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const aClubNumber = getClubNumber(a);
      const bClubNumber = getClubNumber(b);

      return aClubNumber - bClubNumber;
    }

    return 0;
  });
};
