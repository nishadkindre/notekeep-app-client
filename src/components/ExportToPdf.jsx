import React from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { jsPDF } from "jspdf";

const exportToPDF = (notes, userName) => {
  const doc = new jsPDF();
  let yOffset = 10;
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(`${userName}'s Notes`, 10, yOffset);
  yOffset += 15;

  notes.forEach((note) => {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(note.title, 10, yOffset);
    yOffset += 7;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const marginLeft = 15;
    const contentWidth = doc.internal.pageSize.getWidth() - marginLeft - 10;

    const contentLines = doc.splitTextToSize(note.content, contentWidth);
    contentLines.forEach((line) => {
      if (yOffset + 10 > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        yOffset = 10;
      }
      doc.text(line, marginLeft, yOffset);
      yOffset += 6;
    });

    yOffset += 5;
  });

  doc.save(`${userName}_notes.pdf`);
};

const ExportToPDFButton = ({ notes, userName, styleClass }) => {
  console.log("ExportToPdf");

  return (
    <div
      className={styleClass}
      title="Export to PDF"
      onClick={() => exportToPDF(notes, userName)}
    >
      <PictureAsPdfIcon />
    </div>
  );
};

export default ExportToPDFButton;
