import React from 'react';
import ContactForm from "../../components/contactForm";
import Container from "../../components/Container";
import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import contactService from "../../services/contact.service";

interface IProps {
}

function EditContactPage(props: IProps) {
  const {id} = useParams<{ id: string }>();
  const {
    isLoading,
    isLoadingError,
    data
  } = useQuery(["contact", id], () => contactService.getContact(Number(id)));

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
    <Container>
      <div
        className="w-full max-w-lg border border-slate-200 shadow-2xl px-6 py-8 rounded-xl mx-auto mt-20">
        <h1 className="text-blue-600 mb-2">Edit Contact</h1>
        <p className="text-muted">Update contact information</p>

        <ContactForm type="EDIT" value={data}/>
      </div>
    </Container>
  );
}

export default EditContactPage;
