import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import firebase from "./Config/firebaseConfig";

import NavBar from "./Components/NavBar";
import UserFeedback from "./Components/UserFeedback";
import Form from "./Components/Form";
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const feedbackRef = firebase.database().ref(`feedbacks/`);
    feedbackRef.on("value", (response) => {
      const data = response.val();
      if (data) {
        setData(data);
      }
    });
  }, []);
  return (
    <>
      <NavBar />
      <ToastContainer />

      <div className="container mb-5">
        <div className="row">
          <div className="col-md-5">
            <Form />
          </div>
          <div className="col-md-7">
            <UserFeedback data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
