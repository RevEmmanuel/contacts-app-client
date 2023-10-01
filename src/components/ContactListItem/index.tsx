import React, {useCallback} from 'react';
import Avvvatars from "avvvatars-react";
import Button from "../Button";
import {IconPencil, IconTrash} from "@tabler/icons-react";
import {IContact} from "../../types/contact";
import {Link} from "react-router-dom";
import {useQueryClient} from "react-query";
import contactService from "../../services/contact.service";
import utils from "../../utils/utils";

interface IProps {
  data: IContact;
}

function ContactListItem({data}: IProps) {
  const queryClient = useQueryClient();

  const handleDelete = useCallback(() => {
    contactService.deleteContact(data.id!)
      .then(async res => {
        if (res) {
          await queryClient.invalidateQueries("contacts");
        }
      })
      .catch(err => utils.handleRequestError(err));
  }, [data.id, queryClient]);

  return (
    <div
      className="flex px-4 py-3 items-center gap-4 hover:bg-slate-100 apply-transition border border-slate-200 rounded-lg">
      <div>
        <Avvvatars
          style="character"
          value={`${data?.firstname} ${data?.lastname}`}
          size={40}
          border
          borderColor="#24292e22"
          borderSize={1}
        />
      </div>
      <div className="flex-1">
        <p className="font-semibold truncate">{data?.firstname} {data?.lastname}</p>
        <p className="text-muted text-sm truncate">{data.phoneNumber}</p>
      </div>
      <div>
        <div className="flex items-center gap-3">
          <Link to={`/contact/${data.id}`}>
            <Button size="SMALL" outline>
              <IconPencil size={16}/>
            </Button>
          </Link>
          <Button size="SMALL" variant="DANGER" onClick={handleDelete} outline>
            <IconTrash size={16}/>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactListItem;
