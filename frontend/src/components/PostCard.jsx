// src/components/PostCard.jsx

import React from 'react';

// Bu bileşen, 'post' adında bir prop alıyor.
// { post } yazımı, gelen props nesnesinden post özelliğini direkt almamızı sağlar.
function PostCard({ post }) {
  return (
    <div className="post-card">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p><small>Yazar: {post.author}</small></p>
    </div>
  );
}

export default PostCard;