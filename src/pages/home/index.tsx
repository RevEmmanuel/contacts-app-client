import React from 'react';
import Container from "../../components/Container";
import ContactListItem from "../../components/ContactListItem";
import Button from "../../components/Button";
import {IconPlus} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import contactService from "../../services/contact.service";

interface IProps {
}

function HomePage(props: IProps) {
  const {isLoading, isLoadingError, data} = useQuery("contacts", contactService.getAllContact);

  return (
    <Container className="py-8">
      <div className="flex items-center justify-between gap-4">
        <h2>All Contacts {!!data && `(${data.count})`}</h2>
        <Link to="/contact/new">
          <Button variant="PRIMARY"><IconPlus/> Create new</Button>
        </Link>
      </div>

      <div className="grid gap-2 mt-6">
        {
          isLoading ? (
              <div className="h-80 flex items-center justify-center flex-col px-5 py-8">
                <h6>Loading...</h6>
              </div>
            ) :
            isLoadingError ? (
                <div className="h-80 flex items-center justify-center flex-col px-5 py-8">
                  <h6 className="text-red-500">A error occurred</h6>
                </div>
              ) :
              data?.rows.map((contact, index) => (
                <ContactListItem key={`contact-${contact.id}`} data={contact}/>
              ))
        }
      </div>
    </Container>
  );
}

export default HomePage;
