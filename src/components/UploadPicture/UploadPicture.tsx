import { useEffect, useState } from "react";
import uploadStyles from "./uploadPicture.module.scss";
import { IPicture } from "../../interfaces";

type uploadPictureProps = {
  setPictureInForm: (pictureInfo: any) => void;
  picture?: IPicture
};

const UploadPicture = ({ setPictureInForm, picture }: uploadPictureProps) => {

  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (picture) {
      setPreviewSource(picture.link)
    }
  }, [picture])

  const handleInputChange = (e: any) => {
    const file = e.target.files?.[0];
    setIsSending(true);
    if (file) {
      previewFile(file);
      setFileInputState(e.target.value);
      setPictureInForm(file);
      setIsSending(false);
    }
  };

  const previewFile = (file: File) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <div className={uploadStyles.description_box}>
      {!previewSource ? (
        <div className={uploadStyles.uploaded_preview}>
          <img src="/default-card-img.png" alt="Exemple" />
        </div>
      ) : (
        <div className={uploadStyles.uploaded_preview}>
          <img src={previewSource} alt="chosen" />
        </div>
      )}

      <div className={uploadStyles.buttonBox}>
        <input
          placeholder="Choisissez une photo"
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleInputChange}
          value={fileInputState}
          disabled={isSending}
        />
      </div>
    </div>
  );
};

export default UploadPicture;
