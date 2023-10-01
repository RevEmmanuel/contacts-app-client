import React from 'react';
import {Outlet} from "react-router-dom";
import {useQuery} from "react-query";
import authService from "../../services/auth.service";
import Header from "./header";

interface IProps {
}

function Layout(props: IProps) {
  const {isLoading, isLoadingError} = useQuery("userDetails", authService.getUserDetails);

  if (isLoading) {
    return (
      <div className="h-80 flex items-center justify-center flex-col px-5 py-8">
        <h6>Loading...</h6>
      </div>
    )
  }

  if (isLoadingError) {
    return (
      <div className="h-80 flex items-center justify-center flex-col px-5 py-8">
        <h6 className="text-red-500">A error occurred</h6>
      </div>
    )
  }

  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default Layout;
