import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG } from '../../graphql/queries';
import { UPDATE_BLOG } from '../../graphql/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { uploadCloudinary } from '../../components/UploadPicture/uploadCloudinary';
import UploadPicture from '../../components/UploadPicture/UploadPicture';


import { IBlog, IPicture } from '../../interfaces';
import moment from "moment";
import styles from "./EditBlog.module.scss";

function EditBlog() {


  // const paramss = useParams();
  // console.log(paramss);

  const getBlogId = useParams().blogId;

  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [picture, setPicture] = useState<IPicture | undefined>(undefined);
  const [pictureInForm, setPictureInForm] = useState<any>(picture);


  const { loading, error, data, refetch } = useQuery<{ getBlog: IBlog }>(GET_BLOG, {
    variables: {
      getBlogId,
    },
  });


  const [doUpdateBlogMutation, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BLOG);

  async function doUpdateBlog(e: any) {
    e.preventDefault();
    let cloudinaryPicture = null
    if (pictureInForm) {
      cloudinaryPicture = await uploadCloudinary(pictureInForm);
    }
    if (data?.getBlog) {
      await doUpdateBlogMutation({
        variables: {
          blogId: getBlogId,
          data: {
            name: name,
            description: description,
            picture: cloudinaryPicture
              ? {
                  name: cloudinaryPicture?.original_filename,
                  link: cloudinaryPicture?.secure_url,
                }
              : {
                  // exclude __typename from picture data
                  link: data.getBlog.picture.link,
                  name: data.getBlog.picture.name,
                }, // If no new picture is selected, use the existing picture
          },
        },
      }).then(res => {
        navigate(`/blog/${getBlogId}/`)
      })
    }
  };


  useEffect(() => {
    if (data?.getBlog) {
      setName(data.getBlog.name);
      setDescription(data.getBlog.description);
      setPicture(data.getBlog.picture)

    }
  }, [data]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error fetching blog data</div>;
  }

  const blog: IBlog | undefined = data?.getBlog;
  if (!data?.getBlog) {
    return <div>No blog data found</div>;
  }



  return (
    <div className={styles.pageEditBlog}>
      <h1 className={styles.editBlogTitle}>Edition du blog</h1>
      <form onSubmit={doUpdateBlog} className={styles.form}>
        <div className={styles.cardContent}>

          <UploadPicture setPictureInForm={setPictureInForm} picture={picture} />

          <input className={styles.blogName} name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea className={styles.blogDescription} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className={styles.dateBox}>
            <p className={`${styles.dateline} ${styles.createdDate}`}>
              Créer le: {moment(data.getBlog.created_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
            </p>
            <p className={`${styles.dateline} ${styles.updatedDate}`}>
              Dernière édition: {moment(data.getBlog.updated_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
            </p>
          </div>
          <button className={styles.submitButton} type="submit">Mettre à jour</button>
        </div>
      </form>


      {/* {blog.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <p>Last updated: {post.updated_at}</p>
          {post.picture && (
            <img src={post.picture.link} alt={post.picture.name} />
          )}
          <div>{post.content}</div>
        </div>
      ))} */}
    </div>
  );

}

export default EditBlog;
