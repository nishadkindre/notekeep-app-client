import React, { useEffect, useState, Suspense } from "react";
import useLocalStorage from "use-local-storage";
import "../styles/App.css";
import { getAllNotes } from "../utils/notesApi";
import { Header, NoteForm, Fallback } from "../components";
import withAuth from "../utils/withAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NoteArea = React.lazy(() => import("../components/NotesContainer"));

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [userName, setUserName] = useState("");
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

  useEffect(() => {
    const fetchData = async () => {
      const name = await getAllNotes(setNotes);
      setUserName(name);
    };
    fetchData();
  }, [setNotes]);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <div>
        <ToastContainer position="top-center" />
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          userName={userName}
          notes={notes}
        />
        <NoteForm setNotes={setNotes} />
        <div className="message">{!notes.length && "Add Some Notes ..."}</div>
        <Suspense
          fallback={<Fallback notesLength={notes?.length} isDark={isDark} />}
        >
          <NoteArea notes={notes} setNotes={setNotes} />
        </Suspense>
      </div>
    </div>
  );
};

export default withAuth(Notes);
