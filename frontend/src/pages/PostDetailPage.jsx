// src/pages/PostDetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL'deki parametreleri almak için

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const { postId } = useParams(); // URL'deki :postId'yi yakalar

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Yazı detayı çekerken hata:', error));
  }, [postId]); // postId değiştiğinde bu effect yeniden çalışır

  // Veri henüz gelmediyse bir yükleniyor mesajı göster
  if (!post) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="post-card">
      <h1>{post.title}</h1>
      <p><small>Yazar: {post.author} | Tarih: {new Date(post.createdAt).toLocaleDateString()}</small></p>
      <div style={{ marginTop: '2rem', lineHeight: '1.8' }}>
        {post.content}
      </div>
    </div>
  );
}

export default PostDetailPage;