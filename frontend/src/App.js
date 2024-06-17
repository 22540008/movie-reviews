// 22540008
import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Switch được thay thế bởi Routes từ ES6.0
import { BrowserRouter as Router } from "react-router-dom"; // mandatory nếu có "Link"
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// 22540008 //Navbar expand="lg" className="bg-body-tertiary"
function App() {
  const [user, setUser] = React.useState(null);
  async function login(user = null) { // Mặc định user = null
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
  return (
    <Router>
      <div className="App">
        <Navbar expand="lg" className="bg-body-tertiary"> 
            <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <Link to="/movies">Movies</Link>
                </Nav.Link>
                <Nav.Link>
                  { user ? (
                  <Link to={"/"} onClick={logout}>Logout User</Link>
                  ):(
                  <Link to={"/login"} onClick={login} >Login</Link>
                  )}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        <Routes>
          {/* Từ React Router 6.0, Route không sử dụng render và components để render compnent. Thay vào đó, nó sử dụng 'element' prop và truyền vào một JSX element */}
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies" element={<MoviesList />} />
          <Route path="movies/:id/review" element={<AddReview user={user} />} />
          <Route path="/movies/:id/" element={<Movie user={user} />} />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

{/* 
<Route exact path={["/", "/movies"]}
  component={MoviesList}>
</Route>
<Route path="movies/:id/review" render={(props) =>
  <AddReview {...props} user={user} />
  } >
</Route>
<Route path="/movies/:id/" render={(props) =>{
  console.log(props.match.params.id);
  <Movie {...props} user={user} />
}}>
</Route>
<Route path="/login" render={(props) =>
  <Login {...props} login={login} />
  }>
</Route> 
*/}
