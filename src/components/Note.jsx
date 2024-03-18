import React, { useState } from "react";
import styles from "../styles/Note.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteNote, updateNote } from "../utils/notesApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Note = ({ item, id, setNotes }) => {
  const { register, handleSubmit } = useForm();

  const [showSave, setShowSave] = useState(false);
  const [editValue, setEditValue] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditValue(() => {
      return {
        ...editValue,
        [name]: value,
      };
    });
  };

  const handleFocus = (fname) => {
    if (editValue[fname] === "") {
      setEditValue((prevValue) => ({
        ...prevValue,
        [fname]: item[fname],
      }));
    }
  };

  const saveEdit = () => {
    if (editValue.title !== "" && editValue.content !== "") {
      updateNote(id, setNotes, editValue, setEditValue);
      setShowSave(!showSave);
    } else {
      toast.warning("Please Enter Both Fields !", {
        autoClose: 1000,
      });
    }
  };

  const handleDelete = () => {
    deleteNote(id, setNotes);
    toast.success("Deleted", {
      autoClose: 1000,
    });
  };
  console.log("Note");

  return (
    <div className={styles.note}>
      {showSave ? (
        <form onSubmit={handleSubmit(saveEdit)}>
          <input
            {...register("title")}
            value={editValue.title}
            placeholder={item.title}
            onChange={handleChange}
            onFocus={() => handleFocus("title")}
          />

          <textarea
            {...register("content")}
            value={editValue.content}
            placeholder={item.content}
            onChange={handleChange}
            onFocus={() => handleFocus("content")}
            rows="6"
          />

          <button type="submit" className={styles.savebutton}>
            Save
          </button>
        </form>
      ) : (
        <div>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      )}
      <button className={styles.btnhover} title="Delete" onClick={handleDelete}>
        <DeleteIcon />
      </button>
      <button
        className={styles.btnhover}
        title="Edit"
        onClick={() => setShowSave(!showSave)}
      >
        <EditIcon />
      </button>
    </div>
  );
};

export default Note;
