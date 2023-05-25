import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_BLOG } from '../../graphql/queries';
import { UPDATE_BLOG } from '../../graphql/mutations';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { IBlog } from '../../interfaces';
import moment from "moment";
import styles from "./EditBlog.module.scss";

function EditBlog() {


  // const paramss = useParams();
  // console.log(paramss);

  const getBlogId = useParams().blogId;
  


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');




  const { loading, error, data, refetch } = useQuery<{ getBlog: IBlog }>(GET_BLOG, {
    variables: {
      getBlogId,
    },
  });

  const [updateBlog, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_BLOG);


  const onSubmit = (event: any) => {
    event.preventDefault();

    if (data?.getBlog) {
      updateBlog({
        variables: {
          blogId: getBlogId,
          data: {
            name: name,
            description: description,
          },
        },
      }).then(() => refetch());
    }
  };

  
  useEffect(() => {
    if (data?.getBlog) {
      setName(data.getBlog.name);
      setDescription(data.getBlog.description);
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
    <div>
      <h1 className={styles.editBlogTitle}>Edition du blog</h1>
      <form onSubmit={onSubmit} className={styles.card}>
        <div className={styles.cardContent}>
          <input className={styles.blogName} name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={styles.blogDescription} name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <img
            src={data.getBlog.picture.link}
            alt={data.getBlog.name}
          />
          <p className={`${styles.dateline} ${styles.createdDate}`}>
            Created: {moment(data.getBlog.created_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
          </p>
          <p className={`${styles.dateline} ${styles.updatedDate}`}>
            Last updated: {moment(data.getBlog.updated_at).locale('fr').format('dddd D MMMM YYYY [à] HH[h]mm')}
          </p>
          <button type="submit">Update Blog</button>
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
