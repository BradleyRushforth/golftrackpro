import React from 'react';

export const useSortClubs = (clubs: any[]) => {
  const clubOrder = ["Driver", "Wood", "Iron", "Wedge", "Putter"];

  return [...clubs].sort((a, b) => {
    // Sort by club type first
    const typeComparison = clubOrder.indexOf(a.clubType) - clubOrder.indexOf(b.clubType);
    if (typeComparison !== 0) return typeComparison;

    // Now, we handle sorting by club number for "Iron" and "Wedge"
    if (a.clubType === "Iron" || a.clubType === "Wedge") {
      const getClubNumber = (club: any) => {
        const clubNumber = club.setConfiguration[0]?.clubNumber;
        if (!clubNumber) return 0;

        // Extract numeric value (handle both for "PW", "SW", etc.)
        if (clubNumber === "PW" || clubNumber === "SW") {
          return 100;  // Putter and Wedges will have a higher value to be placed last
        }

        // Extract the number from the club (e.g., "5i", "6i", "3i" etc.)
        const match = clubNumber.match(/(\d+)/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const aClubNumber = getClubNumber(a);
      const bClubNumber = getClubNumber(b);

      // Sort by the numeric club number for Iron and Wedge clubs
      return aClubNumber - bClubNumber;
    }

    // If it's not an Iron or Wedge, no need to sort by number (Driver, Wood, Putter)
    return 0;
  });
};
