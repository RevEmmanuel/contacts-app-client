import React from 'react';
import Container from "../../components/Container";
import ContactForm from "../../components/contactForm";

interface IProps {
}

function CreateContactPage(props: IProps) {
  return (
    <Container>
      <div
        className="w-full max-w-lg border border-slate-200 shadow-2xl px-6 py-8 rounded-xl mx-auto mt-20">
        <h1 className="text-blue-600 mb-2">New Contact</h1>
        <p className="text-muted">Add a new contact</p>

        <ContactForm/>
      </div>
    </Container>
  );
}

export default CreateContactPage;
