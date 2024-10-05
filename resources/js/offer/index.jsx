import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { ADMIN_OFFER_ONE, ADMIN_OFFER_DELETE, ADMIN_OFFER_UPDATE } from "@//graphql/offer/index.js";
import { useToast } from "@//components/ui/use-toast";
import useConfirmDialog from "@//components/delete-modal/index.jsx";

export default function AllOffer() {
  const { confirm, DialogComponent } = useConfirmDialog();
  const { toast } = useToast();
  const [offer, setOffer] = useState(null); 
  const { id } = useParams(); 

  // Fetch single offer data using offer ID from params
  const { data, loading, error, refetch: refetchOffer } = useQuery(ADMIN_OFFER_ONE, {
    variables: { id },
    onCompleted: (data) => {
      setOffer(data?.offer); 
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Failed to fetch the offer.",
      });
    }
  });

  useEffect(() => {
    if (data?.offer) {
      setOffer(data?.offer);
    }
  }, [data]);

  // Handle offer deletion
  const [deleteOffer] = useMutation(ADMIN_OFFER_DELETE, {
    onCompleted: () => {
      refetchOffer();
      toast({
        title: "Success",
        description: "Offer has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Failed to delete offer, try again.",
      });
    }
  });

  const handleDelete = async (id) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteOffer({ variables: { id } });
    }
  };

  // Handle offer update programmatically
  const [updateOffer] = useMutation(ADMIN_OFFER_UPDATE, {
    onCompleted: () => {
      refetchOffer();
      toast({
        title: "Success",
        description: "Offer has been updated successfully.",
      });
    },
    onError: (error) => {
      console.log(error.message);
      toast({
        title: "Error",
        description: "Failed to update offer, try again.",
      });
    }
  });

  const handleUpdate = (id, updatedData) => {
    updateOffer({
      variables: { id, ...updatedData }
    });
  };

 
  return (
    <>
      {/* Render the single offer details */}
      <DialogComponent />

      {offer && (
        <div key={offer.id}>
          <h3>{offer.name}</h3>
          <p>{offer.description}</p>
          <button onClick={() => handleUpdate(offer.id, { name: "Updated Offer Name", description: "Updated description" })}>Update</button>
          <button onClick={() => handleDelete(offer.id)}>Delete</button>
        </div>
      )}
    </>
  );
}
