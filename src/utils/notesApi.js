import axios from "axios";

const apiUrl = process.env.API_URL;
const baseURL = `${apiUrl}/api/notes/`;

const getAllNotes = async (setNotes) => {
  try {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    if (token) {
      const response = await axios.get(baseURL, {
        headers: { Authorization: token },
      });
      setNotes(response.data.notes);
      const name = response.data.userName;
      return name;
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

const addNote = async (data, reset, setNotes) => {
  try {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    await axios.post(
      baseURL,
      { ...data },
      {
        headers: { Authorization: token },
      }
    );
    reset();
    await getAllNotes(setNotes);
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

const updateNote = async (id, setNotes, editValue, setEditValue) => {
  try {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    await axios.put(
      `${baseURL}${id}`,
      { ...editValue },
      {
        headers: { Authorization: token },
      }
    );
    await getAllNotes(setNotes);
    setEditValue({
      title: "",
      content: "",
    });
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

const deleteNote = async (id, setNotes) => {
  try {
    const token = localStorage.getItem("token"); // Fetch token from localStorage
    await axios.delete(`${baseURL}${id}`, {
      headers: { Authorization: token },
    });
    await getAllNotes(setNotes);
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

export { getAllNotes, addNote, deleteNote, updateNote };
