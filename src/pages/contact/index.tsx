import React, {useCallback} from 'react';
import Container from "../../components/Container";
import Avvvatars from "avvvatars-react";
import Button from "../../components/Button";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {Link, useNavigate, useParams} from "react-router-dom";
import contactService from "../../services/contact.service";
import {useQuery, useQueryClient} from "react-query";
import utils from "../../utils/utils";

interface IProps {
}

function ContactPage(props: IProps) {
  const {id} = useParams<{ id: string }>();
  const {
    isLoading,
    isLoadingError,
    data
  } = useQuery(["contact", id], () => contactService.getContact(Number(id)));
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    contactService.deleteContact(data?.id!)
      .then(async res => {
        if (res) {
          await queryClient.invalidateQueries("contacts");
          navigate("/", {replace: true});
        }
      })
      .catch(err => utils.handleRequestError(err));
  }, [navigate, queryClient, data?.id]);

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
    <Container className="py-8">
      <div className="flex items-start gap-5">
        <Avvvatars
          style="character"
          value={`${data?.firstname} ${data?.lastname}`}
          size={120}
          border
          borderColor="#24292e22"
          borderSize={1}
        />
        <div className="flex-1">
          <h1>{data?.firstname} {data?.lastname}</h1>
          <p className="text-muted">{data?.phoneNumber}</p>

          <div className="flex items-center gap-4 mt-4">
            <Link to={`/contact/${data?.id}/edit`}>
              <Button variant="PRIMARY" outline>
                <IconPencil/> Edit
              </Button>
            </Link>

            <Button
              variant="DANGER"
              onClick={handleDelete}
              outline
            >
              <IconTrash/> Delete
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ContactPage;
