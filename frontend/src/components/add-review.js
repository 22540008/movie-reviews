import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// 22540008
const AddReview = (props) => {
  console.log(props);
  const location = useLocation();
  console.log(location.state ? location.state.currentReview : "No currentReview");
  let editing = false;
  let initialReviewState = "";
  const [review, setReview] = useState(initialReviewState);
  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.review;
  }
  // 22540008 keeps track if review is submitted
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams(); // get movie id derect from url
  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };
  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      // movie_id: props.match.params.id, // unavailable since React Router v6
      movie_id: id, // thay thế cho props.match.params.id
    };
    // 22540008
    console.log("Editing status:", editing);
    if (editing) {
      // get existing review id
      data.review_id = location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      {submitted ? (
        <div>
          <h4>Review submitted successfully</h4>
          <Link to={"/movies/" + id}>Back to Movie</Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>
              {editing ? "Edit" : "Create"}
              Review
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={review}
              onChange={onChangeReview}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveReview}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};
export default AddReview;
