// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard'; // Dikkat: yol değişti ../
import { Link } from 'react-router-dom'; // Link bileşenini import ediyoruz

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Veri çekerken hata oluştu:', error));
  }, []);

  return (
    <div className="posts-container">
      {posts.map(post => (
        // PostCard'ı Link bileşeni ile sarmalıyoruz
        <Link key={post._id} to={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}

export default HomePage;