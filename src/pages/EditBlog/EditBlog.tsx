import React from 'react';
import { useQuery } from "@apollo/client";

import { GET_BLOG } from '../../graphql/queries';

import { useParams } from 'react-router-dom';
import { IBlog } from '../../interfaces';

function EditBlog() {
  const getBlogId = useParams().blogid;

  console.log(getBlogId);


  const { loading, error, data, refetch } = useQuery<{ getBlog: IBlog }>(GET_BLOG, {
    variables: {
      getBlogId,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error fetching blog data</div>;
  }

  const blog: IBlog | undefined = data?.getBlog;
  if (!blog) {
    return <div>No blog data found</div>;
  }



  return (
    <div>
      <h1>{blog.name}</h1>
      <p>{blog.description}</p>
      <p>Last updated: {blog.updated_at}</p>
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
