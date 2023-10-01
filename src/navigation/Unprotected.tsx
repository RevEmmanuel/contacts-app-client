import React from 'react';
import {useAppSelector} from "../redux/hooks";
import {Navigate} from "react-router-dom";

interface IProps {
  children: React.ReactElement;
}

function Unprotected(props: IProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/"/>
  }

  return props.children;
}

export default Unprotected;
