import React from "react";
import Loading from "../../components/common/alert/Loading";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../redux/action/authAction";

const ProfileLandingPage = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!auth?.user) {
            navigate('/auth/login');
        }
    }, []);

    const path = window.location.pathname;
    const fields = path.split('/').reverse();

    const profileId = fields[0];
    const isEditing = profileId === 'edit';

    if (isEditing) {
        profileId = fields[1];
    }

    const userId = auth?.user?.id;

    let ProfilePage = () => {
        return (
            <div>
                <h1>Profile Page</h1>
            </div>
        )
    }

    React.useEffect(() => {
        setIsLoading(true);
        const isOwner = userId === profileId;
        if (isOwner) {
            ProfilePage = () => {
                return (
                    <div>
                        <h1>Owner Profile Page</h1>
                    </div>
                )
            }
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {
                isLoading && <Loading />
            }
            {!isLoading && < ProfilePage />}
        </>
    )
}

export default ProfileLandingPage;