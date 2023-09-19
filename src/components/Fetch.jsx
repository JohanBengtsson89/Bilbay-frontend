import {useState, useEffect} from "react";

const initProfile = {
    id: null,
    publicRepos: null,
    website: null,
};

const Fetch = () => {
    // initialize state varibles
    const [profile, setProfile] = useState(initProfile);

    // function to get data from api
    const getData = async () => {
        const response = await fetch(import.meta.env.VITE_REACT_URL);
        const json = await response.json();

        setProfile({
            id: json.id,
            publicRepos: json.public_repos,
            website: json.blog,
        })
        
    }

    // Load data when page mounts
    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h1>Fetch data with useEffect</h1>
            <h3>{`Id: ${profile.id}`}</h3>
            <h3>{`Public repositories: ${profile.publicRepos}`}</h3>
            <h3>{`Website: ${profile.website}`}</h3>
        </div>
    )
}

export default Fetch