# Farm Connects

Farm Connects is a one-stop platform for farmers to rent hiring services, buy, and sell agricultural machinery. Whether you're looking to rent a tractor or implement, buy a second-hand machine, or explore the latest models, Farm Connects makes it easy for you to connect with others in the farming community.

## Features

- **New Tractor Inquiry**: Explore and inquire about the latest tractor models with specifications and pricing.
- **Sell and Buy Old Tractors**: List, browse, and purchase pre-owned tractors and machinery.
- **Rent Service Hiring**: Rent or offer tractors and equipment for short or long-term use.
- **Tractor Comparison**: Compare models by features, specifications, and pricing.
- **Leads Management**: Track and manage all inquiries and leads from the app.
- **User Profile and Account Management**: Manage listings, inquiries, and account preferences.
- **Categorized Search and Filters**: Search and filter tractors by brand, type, or purpose.
- **Real-Time Notifications**: Receive alerts for inquiries, bookings, and updates.

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript, MongoDB
- **Frontend**: Flutter

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Flutter](https://flutter.dev/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```sh
# Clone the frontend repository
git clone https://github.com/Ramdev-Lodhi/farm_connects.git

# Clone the backend repository
git clone https://github.com/Ramdev-Lodhi/farmconnects_backend.git
```

### Backend Setup
```sh
cd farmconnects_backend
npm install
cp .env.example .env # Configure environment variables
npm run dev # Start the backend server
```

### Frontend Setup
```sh
cd farm_connects
flutter pub get
flutter run # Run the app
```

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/tractors` | Get list of all tractors |
| POST | `/tractors` | Add a new tractor |
| GET | `/tractors/:id` | Get tractor details |
| PUT | `/tractors/:id` | Update tractor details |
| DELETE | `/tractors/:id` | Delete a tractor listing |
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |
| POST | `/favorites` | Change favorite status |
| GET | `/profile` | Get user profile |
| PUT | `/update-profile` | Update user profile |
| GET | `/categories` | Get product categories |
| GET | `/products/search` | Search for products |
| POST | `/notification/send-notification` | Send a general notification |
| POST | `/notification/send-contact-notification` | Send a contact-specific notification |


## Deployment

### Backend Deployment
The backend can be deployed on **Render, Railway, or AWS**.

### Frontend Deployment
The Flutter app can be deployed on **Google Play Store** or as a **PWA**.

## Contributions
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

---
### GitHub Repository
- **Frontend**: [GitHub Link](https://github.com/Ramdev-Lodhi/farm_connects)
- **Backend**: [GitHub Link](https://github.com/Ramdev-Lodhi/farmconnects_backend)
- **Farm Connects**: [APK Link](https://docs.google.com/forms/d/e/1FAIpQLSfqpjZAHjZEYyYvotbreM3s2CrIUesmcwIgPFIlT3aRQ6vtQQ/viewform)

---

## Contact
For any queries, feel free to reach out:
📧 Email: ramdevlodhi9399@Gmail.com
💬 LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/ramdev-lodhi/)
