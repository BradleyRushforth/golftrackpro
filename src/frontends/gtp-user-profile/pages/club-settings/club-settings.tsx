import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../../shared/Auth/services/firebaseConfig";

const ClubSettings: React.FC = () => {
  const [clubs, setClubs] = useState({
    driver: "",
    wood3: "",
    wood5: "",
    irons: "",
    wedges: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClubs({ ...clubs, [name]: value });
  };

  const handleSaveClubs = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("No authenticated user found");
      }

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { clubs });
      alert("Clubs updated successfully!");
    } catch (error) {
      console.error("Error updating clubs:", error);
    }
  };

  useEffect(() => {
    const fetchClubs = async () => {
      const user = auth.currentUser;

      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setClubs(data.clubs || {});
      }
    };

    fetchClubs();
  }, []);

  return (
    <div>
      <h2>Customize Your Golf Bag</h2>
      <form>
        <label>
          Driver:
          <select name="driver" value={clubs.driver} onChange={handleInputChange}>
            <option value="">Select Driver</option>
            <option value="Driver A">Driver A</option>
            <option value="Driver B">Driver B</option>
          </select>
        </label>
        <label>
          3 Wood:
          <select name="wood3" value={clubs.wood3} onChange={handleInputChange}>
            <option value="">Select 3 Wood</option>
            <option value="3 Wood A">3 Wood A</option>
            <option value="3 Wood B">3 Wood B</option>
          </select>
        </label>
        <label>
          5 Wood:
          <select name="wood5" value={clubs.wood5} onChange={handleInputChange}>
            <option value="">Select 5 Wood</option>
            <option value="5 Wood A">5 Wood A</option>
            <option value="5 Wood B">5 Wood B</option>
          </select>
        </label>
        <label>
          Irons:
          <select name="irons" value={clubs.irons} onChange={handleInputChange}>
            <option value="">Select Irons</option>
            <option value="Irons Set A">Irons Set A</option>
            <option value="Irons Set B">Irons Set B</option>
          </select>
        </label>
        <label>
          Wedges:
          <select name="wedges" value={clubs.wedges} onChange={handleInputChange}>
            <option value="">Select Wedges</option>
            <option value="Wedge A">Wedge A</option>
            <option value="Wedge B">Wedge B</option>
          </select>
        </label>
        <button type="button" onClick={handleSaveClubs}>
          Save Clubs
        </button>
      </form>
    </div>
  );
};

export default ClubSettings;
