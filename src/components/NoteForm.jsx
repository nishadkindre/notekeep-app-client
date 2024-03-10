import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/NoteForm.module.css";
import AddIcon from "@mui/icons-material/Add";
import { addNote } from "../utils/notesApi";

const NoteForm = ({ setNotes }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addNote(data, reset, setNotes);
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input {...register("title", { required: true })} placeholder="Title" />
        {errors.title && <span className={styles.err}>Title is required</span>}

        <textarea
          {...register("content", { required: true })}
          placeholder="Take a Note ..."
          rows="3"
        />
        {errors.content && (
          <span className={styles.err}>Content is required</span>
        )}

        <button title="Add Note" type="submit">
          <AddIcon fontSize="medium" />
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
