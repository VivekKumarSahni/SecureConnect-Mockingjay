import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import FirebaseContext from "../Context/FirebaseContext";

function Navbar1() {
  const { signUpWithGoogle, logoutFromGoogle, user } = useContext(FirebaseContext);

  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "transparent", // Inline CSS for transparent background
        boxShadow: "none", // Removes any shadow if applied by default
      }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> {/* Aligns to the left by default */}
            <NavDropdown
              title="Agency"
              id="agency-nav-dropdown"
              style={{
                fontSize:"18px",
                marginRight: "20px", // Optional: Adds some space between the dropdowns
              }}
            >
              <NavDropdown.Item href="/registerAgency">Register</NavDropdown.Item>
              <NavDropdown.Item href="/loginAgency">Login</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={user ? `${user.displayName}` : "User"}
              id="user-nav-dropdown"
              style={{
                fontSize:"18px",
                marginRight: "20px", // Optional: Adds some space between the dropdowns
              }}
            >
              {!user && (
                <>
                  <NavDropdown.Item href="/registerUser">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/loginUser">Login</NavDropdown.Item>
                  <NavDropdown.Item onClick={signUpWithGoogle}>
                    Sign up With Google
                  </NavDropdown.Item>
                </>
              )}
              {user && (
                <NavDropdown.Item onClick={logoutFromGoogle}>
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar1;
