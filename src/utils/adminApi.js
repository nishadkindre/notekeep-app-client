import axios from "axios";

const baseURL = "https://notekeep-app-server.onrender.com/api/admin/";

const getUsers = async (setUsers) => {
  try {
    const admin_token = localStorage.getItem("admin_token");
    if (admin_token) {
      const userList = await axios.get(`${baseURL}/users`, {
        headers: { Authorization: admin_token },
      });
      setUsers(userList.data.users);
    }
  } catch (error) {
    console.error("Error getting Users: ", error);
  }
};

const deleteUser = async (id, setUsers) => {
  try {
    const admin_token = localStorage.getItem("admin_token");
    if (admin_token) {
      await axios.delete(`${baseURL}user/${id}`, {
        headers: { Authorization: admin_token },
      });
      getUsers(setUsers);
    }
  } catch (error) {
    console.error("Error deleting Users: ", error);
  }
};

export { getUsers, deleteUser };
