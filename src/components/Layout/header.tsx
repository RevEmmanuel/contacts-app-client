import React from 'react';
import Container from "../Container";
import {useQuery} from "react-query";
import {IUser} from "../../types/auth";
import Button from "../Button";
import authService from "../../services/auth.service";
import {Link} from "react-router-dom";

interface IProps {
}

function Header(props: IProps) {
  const {data} = useQuery<IUser>("userDetails");

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-xl">
      <Container className="flex items-stretch h-16">
        <div>
          <Link to="/" className="h-full flex items-center px-3">
            Home
          </Link>
        </div>
        <div className="ml-auto">
          <div className="flex items-center h-full">
            <p>Welcome {data?.username}</p>
          </div>
        </div>

        <div>
          <div className="h-full flex items-center">
            <Button variant="DANGER" size="SMALL" onClick={authService.logout}>
              Logout
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
