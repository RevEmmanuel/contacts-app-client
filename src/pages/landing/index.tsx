import React from 'react';
import Container from "../../components/Container";
import Button from "../../components/Button";
import {Link} from "react-router-dom";

interface IProps {
}

function LandingPage(props: IProps) {
  return (
    <Container>
      <h1 className="text-3xl">Landing Page</h1>
      <div>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </Container>
  );
}

export default LandingPage;
