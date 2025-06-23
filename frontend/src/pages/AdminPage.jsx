// src/pages/AdminPage.jsx
import { useState, useEffect } from 'react';

function AdminPage() {
  // --- STATE'LER ---
  const [posts, setPosts] = useState([]); // Tüm yazıları tutar
  const [title, setTitle] = useState(''); // Formdaki başlık alanı
  const [content, setContent] = useState(''); // Formdaki içerik alanı
  const [editingPostId, setEditingPostId] = useState(null); // Düzenleme modunda mıyız? Hangi yazıyı?

  // --- EFFECT'LER ---
  // Sayfa yüklendiğinde tüm yazıları çek
  useEffect(() => {
    fetchPosts();
  }, []);

  // --- FONKSİYONLAR ---
  const fetchPosts = async () => {
    const response = await fetch('http://localhost:3000/api/posts');
    const data = await response.json();
    setPosts(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, content, author: 'Admin' };

    // Düzenleme modunda mıyız?
    if (editingPostId) {
      // EVET -> PUT isteği at
      await fetch(`http://localhost:3000/api/posts/${editingPostId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
    } else {
      // HAYIR -> POST isteği at
      await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
    }

    // Formu temizle ve listeyi yenile
    resetForm();
    fetchPosts();
  };

  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) {
      await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
      });
      fetchPosts(); // Listeyi yenile
    }
  };

  const resetForm = () => {
    setEditingPostId(null);
    setTitle('');
    setContent('');
  };

  // --- JSX (GÖRÜNÜM) ---
  return (
    <div>
      <h2>Admin Paneli</h2>
      
      {/* Yazı Ekleme/Düzenleme Formu */}
      <form onSubmit={handleSubmit} className="post-card" style={{ marginBottom: '2rem' }}>
        <h3>{editingPostId ? 'Yazıyı Düzenle' : 'Yeni Yazı Oluştur'}</h3>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="8"
          style={{ width: '95%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit">{editingPostId ? 'Güncelle' : 'Oluştur'}</button>
        {editingPostId && <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>İptal</button>}
      </form>

      {/* Mevcut Yazılar Listesi */}
      <h3>Mevcut Yazılar</h3>
      {posts.map(post => (
        <div key={post._id} className="post-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{post.title}</span>
          <div>
            <button onClick={() => handleEdit(post)} style={{ marginRight: '10px' }}>Düzenle</button>
            <button onClick={() => handleDelete(post._id)}>Sil</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;