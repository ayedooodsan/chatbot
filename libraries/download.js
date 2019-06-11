export const downloadZIP = ({ zip, fileName }) => {
  const linkSource = `data:application/zip;base64,${zip}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};

export const downloadPDF = ({ pdf, fileName }) => {
  const linkSource = `data:application/zip;base64,${pdf}`;
  const downloadLink = document.createElement('a');

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
};
