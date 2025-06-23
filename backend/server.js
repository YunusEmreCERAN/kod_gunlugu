require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose'); // Mongoose'u dahil ettik
const cors = require('cors'); // 1. CORS'u dahil et

// 2. Express uygulamasını oluşturuyoruz. Bu 'app' değişkeni bizim sunucumuzun kalbi olacak.
const app = express();
app.use(express.json()); // Gelen isteklerin body'sindeki JSON verisini ayrıştırır.
app.use(cors()); // 2. CORS'u bir middleware olarak kullan. Bu satır app.get'lerden önce olmalı.
// 3. Sunucumuzun çalışacağı portu belirliyoruz. Port, bilgisayardaki bir kapı numarası gibidir.
const PORT = 3000;
// MongoDB'ye bağlanma
// BURAYI KENDİ BİLGİLERİNİZLE GÜNCELLEYİN!
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB veritabanına başarıyla bağlanıldı.'))
  .catch(err => console.error('MongoDB bağlantı hatası:', err));



// 1. Blog Yazısı Şemasını (Blueprint) Oluşturma
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { 
    type: Date, 
    default: Date.now // Bir yazı oluşturulduğunda otomatik olarak o anın tarihini ata
  }
});

// 2. Şemadan Modeli (Müteahhit) Oluşturma
// 'Post' adında bir model oluşturuyoruz. Mongoose arka planda bunu 'posts'
// adında bir koleksiyona (veritabanındaki tablo gibi düşünebilirsiniz) dönüştürecek.
const Post = mongoose.model('Post', postSchema);




// Tüm yazıları veritabanından çeken API endpoint'i
app.get('/api/posts', async (req, res) => {
  try {
    // Post modelini kullanarak veritabanındaki TÜM yazıları bul.
    const allPosts = await Post.find(); 
    // Bulunan yazıları JSON olarak istemciye (tarayıcıya) gönder.
    res.json(allPosts);
  } catch (err) {
    // Bir hata olursa, hatayı terminale yazdır ve istemciye bir hata mesajı gönder.
    console.error('Yazıları çekerken hata:', err);
    res.status(500).json({ message: 'Sunucu hatası oluştu.' });
  }
});
// Sadece test için, veritabanına veri eklemek için geçici bir rota
app.get('/seed', async (req, res) => {
  try {
    // Başlamadan önce koleksiyonu temizleyelim ki her seferinde aynı veriler eklenmesin.
    await Post.deleteMany({}); 
    
    // Test verilerini oluştur.
    await Post.create([
       { title: 'MongoDB Harika!', content: 'Verilerimiz artık kalıcı! Bu yazı veritabanından geliyor.', author: 'Ben' },
       { title: 'Mongoose Nedir?', content: 'Mongoose, MongoDB ile Node.js arasında bir köprü görevi görür.', author: 'Yine Ben' }
    ]);
    res.send('Veritabanı başlangıç verileriyle dolduruldu!');
  } catch (err) {
    res.status(500).send('Veri eklenirken hata oluştu.');
  }
});

// Tek bir yazıyı id'sine göre getiren endpoint
app.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Yazı bulunamadı' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});
// YENİ ROTALAR

// 1. YENİ BİR YAZI OLUŞTURMA (CREATE)
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author || 'Admin' // Yazar belirtilmemişse varsayılan
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost); // 201: Created
  } catch (err) {
    res.status(400).json({ message: 'Hatalı veri' }); // 400: Bad Request
  }
});

// 2. MEVCUT BİR YAZIYI GÜNCELLEME (UPDATE)
app.put('/api/posts/:id', async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Bu seçenek, güncellenmiş dökümanı geri döndürür
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: 'Hatalı veri' });
  }
});

// 3. BİR YAZIYI SİLME (DELETE)
app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Yazı başarıyla silindi.' });
  } catch (err) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});
// 5. Sunucuyu belirlediğimiz portta dinlemeye başlatıyoruz.
app.listen(PORT, () => {
  // Sunucu başarıyla başladığında terminale bu mesajı yazdır.
  console.log(`Sunucu http://localhost:${PORT} adresinde başarıyla başlatıldı.`);
});