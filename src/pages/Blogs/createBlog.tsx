import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations";
import styles from "../../components/FormSign/formSign.module.scss";
import uploadStyles from "./createBlog.module.scss"
import { preview } from "@cloudinary/url-gen/actions/videoEdit";



interface FileInputChangeEvent extends Event {
  target: HTMLInputElement & EventTarget
}


function CreateBlog() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewSource, setPreviewSource] = useState("");


  const handleInputChange = (e: FileInputChangeEvent | any) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      previewFile(file);
    }

  }


  const previewFile = (file: File) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      setPreviewSource(reader.result);
    };
  };



  const [doCreateBlogMutation, { data, loading, error }] =
    useMutation(CREATE_BLOG);

  async function doCreateBlog(e: any) {
    e.preventDefault()

    console.log('blog', { name, description })
    try {
      await doCreateBlogMutation({
        variables: {
          data: {
            name,
            description,
          },
        },
      });
      setName("");
      setDescription("");
    } catch { }

    if (!previewSource) return;
    else {
      const uploadImage = async (base64EncodedImage: string) => {
        console.log(base64EncodedImage);
        try {
          await fetch("/api/upload", {
            method: "POST",
            body: JSON.stringify({data: base64EncodedImage}),
            headers: {'Content-type': 'application/json'}
          })
        } catch(error) {
          console.error(error)
        }
      }
      uploadImage(previewSource);
    }

  }



  // const handleSubmitFile = (e) => {
  //   e.preventDefault();
  //   if(!selectedFile) return;
  //   uploadImage(previewSource);

  // }

  // const uploadImage = (base64EncodedImage): any =>  {
  //   console.log(base64EncodedImage);
  // }


  return (
    <main className={styles.main} >
      <form onSubmit={e => doCreateBlog(e)} className={styles.form}>

        <h3>Créez votre blog</h3>


        <input
          disabled={loading}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du blog"
        />
        <textarea
          disabled={loading}
          // type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        {error && (
          <p style={{ color: "red" }}>Quelque chose s'est mal passé</p>
        )}

        <div className={uploadStyles.upload_container}>
          <div className={uploadStyles.description_box}>


            {!previewSource ? (
              <div className={uploadStyles.img_box}>
                <img src="/assets/images/icons/picturecon.png" alt="download indication" /><h2>Image</h2>
              </div>
            ) :
              <div className={uploadStyles.uploaded_preview}>
                <img src={previewSource} alt="chosen"
                  style={{ height: "300px" }} />
              </div>
            }





            <div className={uploadStyles.buttonBox}>
              <input
                type="file"
                id="Telecharher"
                name="telecharger"
                accept=".jpg, .jpeg, .png"
                onChange={handleInputChange}
                value={fileInputState}
              />


            </div>
          </div>

          <div className={uploadStyles.box_actualiser_img}>
            <img src="/assets/images/defaults/defaultuploaded.jpg" alt="uploaded file" />

          </div>

        </div>


        <div className={styles.buttonBox}>
          <button disabled={loading}>Créer</button>
        </div>


      </form>
    </main>
  );
}

export default CreateBlog;
