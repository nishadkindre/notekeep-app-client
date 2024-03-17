import React, { useEffect, useState, Suspense } from "react";
import "../styles/App.css";
import useLocalStorage from "use-local-storage";
import { getAllNotes } from "../utils/notesApi";
import Header from "../components/Header";
import CreateArea from "../components/NoteForm";
import Variants from "../components/Fallback";
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
  });

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <div>
        <ToastContainer position="top-center" />
        <MemoizedHeader
          isDark={isDark}
          setIsDark={setIsDark}
          userName={userName}
          notes={notes}
        />
        <MemoizedCreateArea setNotes={setNotes} />
        <div className="message">{!notes.length && "Add Some Notes ..."}</div>
        <Suspense
          fallback={<Variants notesLength={notes.length} isDark={isDark} />}
        >
          <NoteArea notes={notes} setNotes={setNotes} />
        </Suspense>
      </div>
    </div>
  );
};
const MemoizedHeader = React.memo(Header);
const MemoizedCreateArea = React.memo(CreateArea);

export default withAuth(Notes);
