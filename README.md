# Farm Connects

Farm Connects is a one-stop platform for farmers to **rent**, **buy**, and **sell** agricultural machinery. Whether you're looking to rent a tractor, buy a second-hand machine, or explore the latest models, Farm Connects makes it easy for you to connect with others in the farming community.

---

## 🚀 Features

### 🌟 **Tractor Services**
  - **New Tractor Inquiry** – Explore and inquire about the latest tractor models with specifications and pricing.  
  - **Sell and Buy Old Tractors** – List, browse, and purchase pre-owned tractors and machinery.  
  - **Rent Service Hiring** – Rent or offer tractors and equipment for short or long-term use.  

### 🔍 **Comparison & Management**
  - **Tractor Comparison** – Compare models by features, specifications, and pricing.  
  - **Leads Management** – Track and manage all inquiries and leads from the app.  
  - **User Profile & Account Management** – Manage listings, inquiries, and account preferences.  

### 🛠 **Smart Features**
  - **Categorized Search & Filters** – Search and filter tractors by brand, type, or purpose.  
  - **Real-Time Notifications** – Receive alerts for inquiries, bookings, and updates via **Firebase Cloud Messaging**.  
  - **Secure Authentication** – Supports **Google OAuth** for seamless login.  

### 📍 **Enhanced User Experience**
  - **Location Services** – Uses **Geolocator** to fetch the user's current location for better recommendations.  
  - **Cloud Storage** – **Cloudinary** is used for storing and managing tractor images efficiently.  

---
## 🏗 Tech Stack

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### **Frontend**
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Google OAuth](https://img.shields.io/badge/Google%20OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Geolocator](https://img.shields.io/badge/Geolocator-FF5722?style=for-the-badge)

---

## 🛠 Installation & Setup

### **Prerequisites**

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Flutter](https://flutter.dev/)
- [MongoDB](https://www.mongodb.com/)

### **Clone the Repository**

```sh
# Clone the frontend repository
git clone https://github.com/Ramdev-Lodhi/farm_connects.git

# Clone the backend repository
git clone https://github.com/Ramdev-Lodhi/farmconnects_backend.git
```

### **Backend Setup**

```sh
cd farmconnects_backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev  # Start the backend server
```

### **Frontend Setup**

```sh
cd farm_connects
flutter pub get
flutter run  # Run the app
```

---

## 🔥 API Endpoints

| Method                    | Endpoint                                  | Description                          |
| ------------------------- | ----------------------------------------- | ------------------------------------ |
| **Tractors**              |                                           |                                      |
| GET                       | `/tractors`                               | Get list of all tractors             |
| POST                      | `/tractors`                               | Add a new tractor                    |
| GET                       | `/tractors/:id`                           | Get tractor details                  |
| PUT                       | `/tractors/:id`                           | Update tractor details               |
| DELETE                    | `/tractors/:id`                           | Delete a tractor listing             |
| **Authentication**        |                                           |                                      |
| POST                      | `/auth/register`                          | Register a new user                  |
| POST                      | `/auth/login`                             | Login user                           |
| POST                      | `/auth/google`                            | Google OAuth login                   |
| **Favorites**             |                                           |                                      |
| POST                      | `/favorites`                              | Change favorite status               |
| **Profile**               |                                           |                                      |
| GET                       | `/profile`                                | Get user profile                     |
| PUT                       | `/update-profile`                         | Update user profile                  |
| **Categories & Products** |                                           |                                      |
| GET                       | `/categories`                             | Get product categories               |
| GET                       | `/products/search`                        | Search for products                  |
| **Notifications**         |                                           |                                      |
| POST                      | `/notification/send-notification`         | Send a general notification          |
| POST                      | `/notification/send-contact-notification` | Send a contact-specific notification |

---

## 🚀 Deployment

### **Backend Deployment**

The backend can be deployed on **Render, Railway, or AWS**.

### **Frontend Deployment**

The Flutter app can be deployed on **Google Play Store** or as a **PWA**.

---

## 🤝 Contributions

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m "Add new feature"`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Create a Pull Request**

---

## 📸 App Screenshots

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

### **📎 GitHub Repository**

📂 **Frontend**: [GitHub Link](https://github.com/Ramdev-Lodhi/farm_connects)

📂 **Backend**: [GitHub Link](https://github.com/Ramdev-Lodhi/farmconnects_backend)

📂 **Farm Connects APK**: [Download Here](https://docs.google.com/forms/d/e/1FAIpQLSfqpjZAHjZEYyYvotbreM3s2CrIUesmcwIgPFIlT3aRQ6vtQQ/viewform)

---

## 📞 Contact

📧 **Email**: [ramdevlodhi9399@gmail.com](mailto:ramdevlodhi9399@gmail.com)

💼 **LinkedIn**: [Ramdev Lodhi](https://www.linkedin.com/in/ramdev-lodhi/)

---

🚀 **Happy Farming!** 🌱🚜

