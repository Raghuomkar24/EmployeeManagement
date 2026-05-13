# Employee Management CRUD Web Application

A full-stack web application for managing employees with Create, Read, Update, and Delete operations.

## Tech Stack

- **Frontend**: React.js, React Router, Axios, Bootstrap
- **Backend**: Spring Boot, Spring Data JPA, Hibernate
- **Database**: MySQL

## Project Structure

```
EmployeeManagement/
├── frontend/              # React.js application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/employeeapp/
│   │   │   │       ├── controller/
│   │   │   │       ├── service/
│   │   │   │       ├── repository/
│   │   │   │       ├── entity/
│   │   │   │       └── EmployeeManagementApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── pom.xml
│   └── mvnw/mvnw.cmd
└── database/            # Database setup scripts
    └── schema.sql
```

## Setup Instructions

### Prerequisites

- Node.js and npm (for frontend)
- Java JDK 11 or higher (for backend)
- MySQL Server 8.0 or higher
- Maven 3.6 or higher

### Database Setup

1. Open MySQL command line or MySQL Workbench
2. Create the database and table using the SQL script in `database/schema.sql`
3. Update the database credentials in `backend/src/main/resources/application.properties`

### Backend Setup (Spring Boot)

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Update `application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

3. Build the project:
   ```bash
   mvn clean install
   ```

4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   Or run the JAR file:
   ```bash
   java -jar target/employee-management-1.0.0.jar
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup (React)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will start on `http://localhost:3000` (or as shown in the terminal)

## API Endpoints

### Employees

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/{id}` - Update an employee
- `DELETE /api/employees/{id}` - Delete an employee

## Features

✅ Add Employee - Create new employee records
✅ View All Employees - Display employee list in a table
✅ View Employee Details - Click to view full employee information
✅ Edit Employee - Update employee information
✅ Delete Employee - Remove employees from the system
✅ Form Validation - Client-side and server-side validation
✅ Success/Error Messages - User feedback for all operations
✅ Responsive Design - Works on desktop and mobile devices

## Running the Application

1. Start MySQL Server
2. Create the database using the SQL script
3. Start the Backend: `mvn spring-boot:run` in the backend folder
4. Start the Frontend: `npm run dev` in the frontend folder
5. Open browser and go to `http://localhost:3000` (or the port shown)

## Testing the Application

### Using the UI:
- Navigate to the application
- Click "Add Employee" to create a new employee
- View the list of employees
- Click on an employee to view details
- Click "Edit" to update information
- Click "Delete" to remove an employee

### Using API (with curl or Postman):

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Get employee by ID
curl http://localhost:8080/api/employees/1

# Create employee
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","department":"IT","salary":50000}'

# Update employee
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com","department":"HR","salary":55000}'

# Delete employee
curl -X DELETE http://localhost:8080/api/employees/1
```

## Troubleshooting

### Backend won't start:
- Check if MySQL server is running
- Verify database credentials in `application.properties`
- Check if port 8080 is available
- Look for error messages in the console

### Frontend won't load API:
- Ensure backend is running on port 8080
- Check CORS configuration in backend
- Verify API URL in `.env` file
- Open browser DevTools to see network requests

### Database connection error:
- Verify MySQL server is running
- Check username and password
- Ensure database exists
- Try connecting to MySQL directly: `mysql -u root -p`

## Additional Notes

- The application uses JWT for future authentication (can be extended)
- CORS is enabled to allow communication between frontend and backend
- All passwords should be changed from defaults in production
- Database user should have limited permissions in production

## Author
Generated Employee Management Application

## License
MIT License
