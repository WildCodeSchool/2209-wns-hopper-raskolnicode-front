import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { CREATE_PICTURE } from "../../graphql/mutations";
import { GET_LOGGED_USER } from "../../graphql/queries";
import uploadStyles from "./uploadPicture.module.scss";

type uploadPictureProps = {
  setPictureInForm: (string: string) => void;
};

const UploadPicture = ({ setPictureInForm }: uploadPictureProps) => {
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [picture, setPicture] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [doCreatePictureMutation] = useMutation(CREATE_PICTURE);
  const { data } = useQuery(GET_LOGGED_USER);

  const cloudName = "felicie";
  const uploadPreset = "starblog";

  const handleInputChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      previewFile(file);
      setFileInputState(e.target.value);
      setPicture(file);
    }
  };
  const previewFile = (file: File) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      setPreviewSource(reader.result);
    };
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();

    formData.append("upload_preset", uploadPreset);
    formData.append("tags", data?.loggedUser.pseudo);
    formData.append("file", picture);
    try {
      const result = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const pictureInfo = await result.json();
      await doCreatePictureMutation({
        variables: {
          data: {
            name: pictureInfo.original_filename,
            link: pictureInfo.secure_url,
          },
        },
      });
      setFileInputState("");
      setPreviewSource("");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className={uploadStyles.upload_container}>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div className={uploadStyles.description_box}>
          {!previewSource ? (
            <div>
              <p>Ajouter une photo</p>
            </div>
          ) : (
            <div className={uploadStyles.uploaded_preview}>
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            </div>
          )}

          <div className={uploadStyles.buttonBox}>
            <input
              type="file"
              id="upload"
              name="upload"
              accept=".jpg, .jpeg, .png"
              onChange={handleInputChange}
              value={fileInputState}
              disabled={isSending}
            />
          </div>

          <div className={uploadStyles.buttonBox}>
            <button disabled={isSending}>Créer</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default UploadPicture;
