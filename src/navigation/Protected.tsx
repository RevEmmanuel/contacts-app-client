import React from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";

interface IProps {
  children: React.ReactElement;
}

function Protected(props: IProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login"/>
  }

  return props.children;
}

export default Protected;
