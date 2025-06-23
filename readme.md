# Kod Günlüğü - Full-Stack Blog Projesi

Bu proje,sıfırdan zirveye web geliştirme eğitimi kapsamında oluşturulmuş, MERN yığınını (MongoDB, Express.js, React, Node.js) kullanan tam donanımlı bir blog uygulamasıdır.

## Özellikler

-   Kullanıcılar tüm blog yazılarını ana sayfada görebilir.
-   Kullanıcılar bir yazıya tıklayarak o yazının detay sayfasına gidebilir.
-   `/admin` adresi üzerinden erişilebilen bir yönetim paneli bulunur.
-   Admin panelinden yeni yazılar oluşturulabilir (Create).
-   Mevcut yazılar okunabilir (Read).
-   Mevcut yazılar düzenlenebilir (Update).
-   Mevcut yazılar silinebilir (Delete).

## Kullanılan Teknolojiler

-   **Frontend:** React, React Router, Vite
-   **Backend:** Node.js, Express.js
-   **Veritabanı:** MongoDB (MongoDB Atlas ile)
-   **MongoDB & Node.js Bağlantısı:** Mongoose

## Projeyi Yerel Makinede Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### Gereksinimler

-   [Node.js](https://nodejs.org/) (v18 veya üstü)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hesabı

### Kurulum Adımları

1.  **Projeyi klonlayın:**
    ```bash
    git clone [PROJENİZİN_GITHUB_LİNKİ]
    cd Kod-Gunlugu-Projem
    ```

2.  **Backend'i Kurun ve Çalıştırın:**
    ```bash
    cd backend
    npm install
    ```
    `backend` klasörünün içine `.env` adında bir dosya oluşturun ve içine MongoDB Atlas'tan aldığınız bağlantı adresini yapıştırın:
    ```
    MONGO_URI=mongodb+srv://kullaniciadiniz:sifreniz@...
    ```
    Sunucuyu başlatın:
    ```bash
    node server.js
    ```
    Sunucu `http://localhost:3000` adresinde çalışmaya başlayacaktır.

3.  **Frontend'i Kurun ve Çalıştırın:**
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```
    Uygulama `http://localhost:5173` (veya terminalde belirtilen başka bir port) adresinde açılacaktır.