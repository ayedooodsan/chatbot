import { saveAs } from 'file-saver';

export const downloadZIP = ({ zip, fileName }) => {
  const linkSource = `data:application/zip;base64,${zip}`;
  saveAs(linkSource, fileName);
};

export const downloadPDF = ({ pdf, fileName }) => {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  saveAs(linkSource, fileName);
};
