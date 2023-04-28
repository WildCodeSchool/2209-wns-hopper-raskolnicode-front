import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { CREATE_PICTURE } from "../../graphql/mutations";

const UploadPicture = () => {
  const [previewSource, setPreviewSource] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [image, setImage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [doCreatePictureMutation] = useMutation(CREATE_PICTURE);

  const cloudName = "felicie";
  const uploadPreset = "starblog";

  const handleInputChange = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      previewFile(file);
      setFileInputState(e.target.value);
      setImage(file);
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
    formData.append("tags", "test-uploads");
    formData.append("file", image);
    try {
      const result = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const image = await result.json();
      console.log(image.secure_url);
      await doCreatePictureMutation({
        variables: {
          data: {
            name: image.secure_url,
            link: image.secure_url,
          },
        },
      });

      setFileInputState("");
      setPreviewSource("");
      setIsSending(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <div>
          <div>
            {!previewSource ? (
              <div>
                <p>Upload Files</p>
              </div>
            ) : (
              <div>
                <img
                  src={previewSource}
                  alt="chosen"
                  style={{ height: "300px" }}
                />
              </div>
            )}

            <div>
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
          </div>
        </div>

        <div>
          <button disabled={isSending}>Créer</button>
        </div>
      </form>
    </main>
  );
};

export default UploadPicture;
