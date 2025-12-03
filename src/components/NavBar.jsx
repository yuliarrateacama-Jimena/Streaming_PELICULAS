import { useState } from 'react';
import { Navbar, Container, Form, FormControl } from 'react-bootstrap';

const NavBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">Movie Streaming</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Form className="d-flex" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;