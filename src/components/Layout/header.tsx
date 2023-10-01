import React from 'react';
import Container from "../Container";
import {useQuery} from "react-query";
import {IUser} from "../../types/auth";

interface IProps {
}

function Header(props: IProps) {
  const {data} = useQuery<IUser>("userDetails");

  return (
    <div className="w-full bg-white border-b border-slate-200 shadow-2xl">
      <Container className="flex items-stretch h-16">
        <div className="ml-auto">
          <div className="flex items-center h-full">
            <p>Welcome {data?.username}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
