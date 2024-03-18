import React, { memo } from "react";
import Note from "./Note";
import Masonry from "react-masonry-css";

const NotesContainer = ({ notes, setNotes }) => {
  console.log("NotesContainer");

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        1430: 4,
        1150: 3,
        860: 2,
        570: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {notes.map((item) => (
        <MemoizedNote
          key={item._id}
          id={item._id}
          item={item}
          setNotes={setNotes}
        />
      ))}
    </Masonry>
  );
};
const MemoizedNote = memo(Note);
export default NotesContainer;
