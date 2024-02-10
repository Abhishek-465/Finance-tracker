import { useState, useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { FiDelete } from "react-icons/fi";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const iconSize = "1.2rem";
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newbill, setNewbill] = useState(0);
  const [updatebill, setUpdatebill] = useState(0);
  const [refresh, setRefresh] = useState(false); // State to trigger refresh

  const [bill, setBill] = useState([]);
  const usersCollectionRef = collection(db, "bill");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Month: newMonth,
      Amount: Number(newbill),
      Year: newYear,
    });
    setRefresh(!refresh); // Toggle refresh
    resetFields(); // Reset input fields after adding new month
  };

  const updateUser = async (id, Amount) => {
    const userDoc = doc(db, "bill", id);
    const newFields = { Amount: Number(Number(Amount) + Number(updatebill)) };
    await updateDoc(userDoc, newFields);
    setRefresh(!refresh); // Toggle refresh
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "bill", id);
    await deleteDoc(userDoc);
    setRefresh(!refresh); // Toggle refresh
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setBill(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [refresh]); // Add refresh as a dependency

  const resetFields = () => {
    setNewMonth("");
    setNewYear("");
    setNewbill(0);
  };

  return (
    <div className="App">
      <div className="heading">
        <h1>Finance Tracker</h1>
        <p style={{ color: "whitesmoke" }}>Your favorite Expense Tracker</p>
      </div>
      <div className="container">
        {bill.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="del">
                <button
                  className="btn1"
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  {" "}
                  <FiDelete size={iconSize} />
                </button>
              </div>{" "}
              <div className="txt">
                <h1>Month: {user.Month}</h1>
                <h3>Year: {user.Year}</h3>
                <h1>Amount: Rs {user.Amount}</h1>
              </div>
              <div className="update">
                <input
                  type="number"
                  className="field"
                  placeholder="Add the bills..."
                  onChange={(event) => {
                    setUpdatebill(event.target.value);
                  }}
                />
                <button
                  className="btn"
                  onClick={() => {
                    updateUser(user.id, user.Amount);
                  }}
                >
                  {" "}
                  <MdAddCircleOutline size={iconSize} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-more">
        <p>Add New Month</p>
        <input
          className="field1"
          placeholder="Month..."
          value={newMonth}
          onChange={(event) => {
            setNewMonth(event.target.value);
          }}
        />
        <input
          placeholder="Year..."
          className="field1"
          value={newYear}
          onChange={(event) => {
            setNewYear(event.target.value);
          }}
        />
        <input
          type="number"
          className="field1"
          placeholder="Bill..."
          value={newbill === 0 ? "" : newbill}
          onChange={(event) => {
            setNewbill(event.target.value);
          }}
        />

        <button className="btn2" onClick={createUser}>
          {" "}
          New Month
        </button>
      </div>
      <p>Made by Abhishek</p>
    </div>
  );
}

export default App;
