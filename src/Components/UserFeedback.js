import firebase from "../Config/firebaseConfig";

const UserFeedback = ({ data }) => {
  let updaedFeedbacks = [];
  if (data) {
    for (let i in data) {
      updaedFeedbacks = [...updaedFeedbacks, i];
    }
  }
  const handleLike = async (feedback) => {
    const today = new Date();

    await firebase
      .database()
      .ref(`feedbacks/${feedback}`)
      .set({
        Name: data[feedback].Name,
        Feedback: data[feedback].Feedback,
        Like: !data[feedback].Like,
        Gender: data[feedback].Gender,
        Time: `${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}`,
      });
  };
  return (
    <div>
      {data ? (
        <>
          {updaedFeedbacks.map((feedback) => (
            <div className="card mb-2">
              <div className="card-header">
                {data[feedback].Gender === "M" ? "Mr. " : "Ms. "}
                {data[feedback]?.Name}{" "}
                <i
                  className={
                    !data[feedback].Like ? "far fa-heart" : "fas fa-heart"
                  }
                  onClick={() => {
                    handleLike(feedback);
                  }}
                  style={{ cursor: "pointer", color: "#FF2768" }}
                ></i>
                <small className="text-muted" style={{ float: "right" }}>
                  <i className="fas fa-clock"></i> {data[feedback]?.Time}
                </small>
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{data[feedback]?.Feedback}</p>
                  <footer className="blockquote-footer">
                    <cite title="Source Title">{data[feedback]?.Name}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default UserFeedback;
