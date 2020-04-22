import { saveAs } from 'file-saver';

const downloadBase64 = ({ stream, filename, mimetype }) => {
  const linkSource = `data:${mimetype};base64,${stream}`;
  saveAs(linkSource, filename);
};

export default downloadBase64;
