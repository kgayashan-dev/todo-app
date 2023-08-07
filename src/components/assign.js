import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  //   deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
// import { Router } from "react-router-dom";

const PersonList = () => {
  const [persons, setPersons] = useState([]);
  const [assignedPersonId, setAssignedPersonId] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "persons"), (snapshot) => {
      const updatedPersons = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPersons(updatedPersons);
    });

    return () => unsubscribe();
  }, []);

  const handleAssignPerson = async (e) => {
    e.preventDefault();

    // Update the assigned person's document in Firebase
    await updateDoc(doc(db, "persons", selectedPersonId), {
      assignedTo: assignedPersonId,
    });

    // Clear the selected values
    setAssignedPersonId("");
    setSelectedPersonId("");
  };
  const handleUnassignPerson = async (personId) => {
    // Update the person's document in Firebase to remove the assigned value
    await updateDoc(doc(db, "persons", personId), {
      assignedTo: null, // Set it to null or any other appropriate value
    });
  };

  return (
    <div className="float  p-4 bg-slate-100 w-[72vh] h-[70vh] m-auto rounded-lg ">
      <h2 className="text-xl">Person List</h2>
      <ul className="bg-white ">
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} - Assigned To: {person.assignedTo}
            <button
              type="submit"
              onClick={() => handleUnassignPerson(person.id)}
              className="bg-blue-500 py-1 px-2 ml-4 rounded-lg"
            >
              Unassign
            </button>
          </li>
        ))}
      </ul>

      <h3 className="text-xl">Assign Person</h3>
      <div className="flex justify-between items-center">
        <form onSubmit={handleAssignPerson}>
          <div className="flex justify-center items-center gap-4">
            <label>
              Select a Person:
              <select
                className="p-2 ml-4"
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
              >
                <option value="">Select...</option>
                {persons.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Assign To:
              <input
                className="p-2 ml-4"
                type="text"
                value={assignedPersonId}
                onChange={(e) => setAssignedPersonId(e.target.value)}
                required
              />
            </label>
          </div>

          <button type="submit" className="bg-blue-500 p-2">
            Assign
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonList;
