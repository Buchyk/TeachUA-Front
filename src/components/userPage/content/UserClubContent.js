import React, {useContext, useState} from "react";
import ClubList from "../../clubList/ClubList";
import {SearchContext} from "../../../context/SearchContext";


const UserClubContent  = () => {

    const {clubs, setClubs} = useContext(SearchContext);
    const [loading, setLoading] = useState(false);

    return (
        <div className="user-club-content">
                <ClubList loading={loading} load={setLoading} clubs={clubs} setClubs={setClubs}/>
        </div>
    )
};

export default UserClubContent;
