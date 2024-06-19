import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { useNavigate } from "react-router-dom";
// 22540008
const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: "",
    rated: "",
    reviews: [],
  });
  // 22540008
  const { id } = useParams();
  const navigate = useNavigate();
  const getMovie = (id) => {
    console.log(id);
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getMovie(id);
  }, [id]);
  // 22540008
  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, props.user.id)
      .then((response) => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1);
          return { ...prevState };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // 22540008
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster + "/100px250"} fluid />
          </Col>
          <Col>
            <Card>
              <Card.Header as="h5">{movie.title}</Card.Header>
              <Card.Body>
                <Card.Text>{movie.plot}</Card.Text>
                {props.user && (
                  <Link to={"/movies/" + id + "/review"}>Add Review</Link>
                )}
              </Card.Body>
            </Card>
            <br />
            <h2>Reviews</h2>
            <br />
            {movie.reviews.map((review, index) => {
              return (
                // 22540008: Media component is deprecated, use Card instead
                <Card key={index} border="0">
                  <Card.Body>
                    <h5>
                      {review.name + " reviewed on "}
                      {moment(review.date).format("Do MMMM YYYY")}
                    </h5>
                    <p>{review.review}</p>
                    {props.user && props.user.id === review.user_id && (
                      <Row>
                        <Col>
                          {/* Từ React Router v6.0. Link chỉ dùng để tạo các liên kết đơn giản giữa các trang, không hỗ trợ truyền state như một prop. useNavigate là hook cho phép điều hướng thay thế cho useHistory, cho phép truyền dữ liệu qua trạng thái (state, để truyền dữ liệu mà không hiển thị trên URL) */}
                          <Button
                            variant="link"
                            onClick={() =>
                              navigate(`/movies/${id}/review`, {
                                state: {
                                  currentReview: review,
                                  user: props.user,
                                },
                              })
                            }
                          >
                            Edit
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            variant="link"
                            onClick={() => deleteReview(review._id, index)}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Movie;
