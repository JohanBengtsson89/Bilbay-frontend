import { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const url = "http://localhost:8080/api/test/users";

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios.get(url)
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
      })
      .catch((error) => {
        setError(error); // Set the error state
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default User;