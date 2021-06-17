import { toast } from "react-toastify";
import { useState } from "react";
import firebase from "../Config/firebaseConfig";

const Form = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [feedback, setFeedback] = useState("");
  const [gender, setGender] = useState("");

  const reset = () => {
    setFname("");
    setLname("");
    setFeedback("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fname && lname && feedback && gender) {
      const today = new Date();
      await firebase
        .database()
        .ref(`feedbacks/${Date.now()}`)
        .set({
          Name: `${fname} ${lname}`,
          Feedback: feedback,
          Like: false,
          Gender: gender,
          Time: `${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()}`,
        });

      reset();
    } else {
      toast("Please fill all details", { type: "error" });
    }
  };
  return (
    <div>
      <form>
        <div className="mb-3">
          <div className="row">
            <div className="col form-fname">
              <label htmlFor="fname" className="form-fname">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                aria-label="First name"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="col">
              <label htmlFor="lname" className="form-lname">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                aria-label="Last name"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Suggestion
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="male"
            onClick={() => {
              setGender("M");
            }}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Male
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="female"
            onClick={() => {
              setGender("F");
            }}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Female
          </label>
        </div>
        <p></p>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
