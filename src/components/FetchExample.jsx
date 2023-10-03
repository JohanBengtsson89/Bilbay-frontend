import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const User = () => {


  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => { axios.get(`${apiUrl}/api/test/users`)
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
    </div>
  );
};

export default User;