import EditModal from "../../components/memberModal/EditMemberModal";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const { id, edit } = useParams();
    const [showEditMember, setShowEditMember] = useState(true);
    const navigate = useNavigate();

    const handleCloseEdit = () => {
        setShowEditMember(false);
        edit ? navigate("/") : navigate(-1);

    };

    if (!id) {
        navigate("/");
    }

    useEffect(() => {
        if (!showEditMember) {
            return;
        }
    } , [])

    return (
        <EditModal show={showEditMember} handleClose={handleCloseEdit} editMemberID={id} />
    );

}


export default UserProfile;
