import { useState, useEffect } from "react";
import { doc, collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../../../shared/Auth/services/firebaseConfig";

interface Club {
  clubType: string;
  clubModel: string;
  brand: string;
  setConfiguration: {
    clubNumber: string;
    carryDistance: number | null;
    totalDistance: number | null;
    lastUpdated: string | null;
  }[];
}

const useFetchClubs = () => {
  const [userClubs, setUserClubs] = useState<Club[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchClubs = async () => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const clubsRef = collection(userRef, "golfClubs");
          const clubsSnapshot = await getDocs(clubsRef);

          if (!clubsSnapshot.empty) {
            const fetchedClubs: Club[] = [];

            clubsSnapshot.forEach((doc) => {
              const clubData = doc.data();

              if (clubData && clubData.name && clubData.setConfiguration) {
                fetchedClubs.push({
                  clubType: doc.id,
                  clubModel: clubData.name,
                  brand: clubData.brand || "",
                  setConfiguration: clubData.setConfiguration,
                });
              }
            });

            setUserClubs(fetchedClubs);
          }
        } catch (error) {
          console.error("Error fetching clubs data:", error);
        }
      }
    };

    fetchClubs();
  }, [user]);

  return userClubs;
};

export default useFetchClubs;
