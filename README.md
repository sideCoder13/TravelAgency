This is a Travel Agency Booking System.

Step to use the project:
1. git clone
2. npm install
3. cd backend -> npm install
4. npm run
5. Setup your MONGODB_URL in backend
6. Setup your REACT_APP_BACKEND_URL as backend url (ex: http://localhost:4000/api/v1)

And you are reday to use the application!

- API Endpoints:
 1. GET /packages: Retrieve all tour packages.
 2. GET /packages/:id: Retrieve details of a specific package.
 3. POST /bookings: Submit a package booking.
 4. Admin:
 - POST /admin/login: Admin Login
 - GET /admin/users: Get all user information
 - POST /admin/packages: Add a new package.
 - PUT /admin/packages/:id: Update an existing package.
 - DELETE /admin/packages/:id: Delete a package.

   Implemented Features:
   1. Tour Packages Page
   2. Package Booking
   3. Admin Panel
   4. Add/Update/Delete Tours (can only be accessed by admin)
   5. Admin get detailed description of all the users
   6. Authetication for Admin
   7. Protected Routes for Admin
   8. Invoice after selecting tour
   9. Downloadable invoice PDF
   10. JWT Tokens for Admin authentication
  
   Admin Credentials-
   Username- admin
   Password- admin123
  
   Technical Stack:
   1. Frontend: React.js
   2. Backend: Node.js and Express.js
   3. Database: MongoDB
