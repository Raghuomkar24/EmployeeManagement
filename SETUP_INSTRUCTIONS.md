# Employee Management CRUD Web Application - Setup Instructions

## Quick Start Summary

```bash
# 1. Create database (MySQL)
mysql -u root -p < database/schema.sql

# 2. Start Backend (Terminal 1)
cd backend
mvn spring-boot:run

# 3. Start Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

---

## Detailed Setup Instructions

### Prerequisites

**Required Software:**
1. **Java JDK 17 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify: `java -version`

2. **Maven 3.6 or higher**
   - Download from: https://maven.apache.org/download.cgi
   - Verify: `mvn -version`

3. **Node.js and npm (v18+)**
   - Download from: https://nodejs.org/
   - Verify: `node -v` and `npm -v`

4. **MySQL Server 8.0 or higher**
   - Download from: https://www.mysql.com/downloads/
   - Verify: `mysql --version`

---

## Backend Setup (Spring Boot)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Configure Database Connection

Open `src/main/resources/application.properties` and update:

```properties
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/employee_management?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root          # Your MySQL username
spring.datasource.password=root          # Your MySQL password
```

### Step 3: Create Database

**Using MySQL Command Line:**

```bash
mysql -u root -p < ../database/schema.sql
```

Or manually execute the SQL script in MySQL Workbench:

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `database/schema.sql`
4. Execute the script (Ctrl+Shift+Enter)

**Verify Database Creation:**

```bash
mysql -u root -p
USE employee_management;
SHOW TABLES;
SELECT * FROM employee;
```

### Step 4: Build the Project

```bash
mvn clean install
```

This command:
- Downloads all dependencies
- Compiles the Java code
- Runs tests (if any)
- Creates a JAR file in `target/` directory

### Step 5: Run the Backend Server

**Option 1: Using Maven**

```bash
mvn spring-boot:run
```

**Option 2: Using Java JAR**

```bash
java -jar target/employee-management-1.0.0.jar
```

**Expected Output:**

```
======================================
Employee Management API Started
Server: http://localhost:8080
API Base URL: http://localhost:8080/api
======================================
```

### Step 6: Test Backend (Optional)

```bash
# Get all employees
curl http://localhost:8080/api/employees

# Get employee count
curl http://localhost:8080/api/employees/stats/count
```

---

## Frontend Setup (React.js)

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages:
- React and React Router
- Axios for API calls
- Bootstrap for styling
- Vite for development

### Step 3: Create Environment Configuration

Create `.env` file in the frontend directory:

```bash
# Copy from example
cp .env.example .env
```

Or manually create `.env`:

```
VITE_API_URL=http://localhost:8080/api
```

### Step 4: Start Development Server

```bash
npm run dev
```

**Expected Output:**

```
VITE v5.0.8 ready in 123 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

### Step 5: Access Application

Open your browser and go to: **http://localhost:3000**

---

## Complete Startup Commands

**Terminal 1 - Backend:**

```bash
cd EmployeeManagement/backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**

```bash
cd EmployeeManagement/frontend
npm install  # Only on first run
npm run dev
```

**Terminal 3 - MySQL (Optional, if not running as service):**

```bash
mysql -u root -p
```

---

## API Endpoints Reference

### Employee Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/{id}` | Get employee by ID |
| GET | `/api/employees/search/name?searchTerm=xyz` | Search employees by name |
| GET | `/api/employees/department/{dept}` | Get employees by department |
| GET | `/api/employees/stats/count` | Get total employee count |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |

### Sample API Requests

**Create Employee:**
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 75000
  }'
```

**Update Employee:**
```bash
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "department": "HR",
    "salary": 80000
  }'
```

**Delete Employee:**
```bash
curl -X DELETE http://localhost:8080/api/employees/1
```

---

## Frontend Pages and Features

### Home Page (`/`)
- Welcome message
- Quick statistics (Total employees)
- Feature overview
- Quick start guide

### All Employees (`/employees`)
- View all employees in a table
- Search by name, email, or department
- View employee count
- Action buttons: View, Edit, Delete

### Add Employee (`/add-employee`)
- Form to create new employee
- Real-time form validation
- Success/error messages
- Auto-redirect on success

### Edit Employee (`/edit-employee/:id`)
- Pre-filled form with employee data
- Update employee information
- Form validation
- Confirmation before update

### Employee Details (`/employee-details/:id`)
- Full employee information display
- Formatted creation and update timestamps
- Edit and delete buttons
- Back to list navigation

---

## Troubleshooting

### Backend Issues

**Problem: "Cannot connect to database"**

Solution:
```bash
# Check MySQL server is running
# Windows:
Get-Process mysqld

# Linux/Mac:
ps aux | grep mysql

# Start MySQL if not running
# Windows: Start MySQL from Services
# Linux: sudo service mysql start
# Mac: brew services start mysql-server
```

**Problem: "Port 8080 already in use"**

Solution:
```bash
# Find process using port 8080 and kill it
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :8080
kill -9 <PID>
```

**Problem: "Maven command not found"**

Solution:
- Install Maven: https://maven.apache.org/download.cgi
- Add Maven to PATH environment variable

### Frontend Issues

**Problem: "npm: command not found"**

Solution:
- Install Node.js from: https://nodejs.org/
- Restart terminal after installation

**Problem: "Cannot connect to backend API"**

Solution:
- Check `.env` file has correct `VITE_API_URL`
- Verify backend is running on port 8080
- Check CORS is enabled in backend
- Look at browser console for errors

**Problem: "Port 3000 already in use"**

Solution:
```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :3000
kill -9 <PID>
```

### Database Issues

**Problem: "Access denied for user 'root'@'localhost'"**

Solution:
```bash
# Reset MySQL root password
# Windows:
mysql -u root
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';

# Update in application.properties:
spring.datasource.password=new_password
```

**Problem: "Database 'employee_management' doesn't exist"**

Solution:
```bash
# Run the SQL schema script
mysql -u root -p < database/schema.sql

# Or manually create:
mysql -u root -p
mysql> CREATE DATABASE employee_management;
mysql> USE employee_management;
mysql> SOURCE database/schema.sql;
```

---

## Production Build

### Build Backend JAR

```bash
cd backend
mvn clean package
java -jar target/employee-management-1.0.0.jar
```

### Build Frontend for Production

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

---

## Project Structure

```
EmployeeManagement/
├── backend/
│   ├── src/main/java/com/employeeapp/
│   │   ├── controller/EmployeeController.java
│   │   ├── service/EmployeeService.java
│   │   ├── repository/EmployeeRepository.java
│   │   ├── entity/Employee.java
│   │   └── EmployeeManagementApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   └── EmployeeDetails.jsx
│   │   ├── components/Navbar.jsx
│   │   ├── services/employeeAPI.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .gitignore
├── database/
│   └── schema.sql
└── README.md
```

---

## Next Steps

1. ✅ Set up database
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Open application in browser
5. ✅ Create first employee using Add Employee form
6. ✅ Test all CRUD operations
7. ✅ Customize and extend as needed

---

## Additional Resources

- **Spring Boot Documentation:** https://spring.io/projects/spring-boot
- **React Documentation:** https://react.dev/
- **MySQL Documentation:** https://dev.mysql.com/doc/
- **Bootstrap Documentation:** https://getbootstrap.com/docs/
- **Axios Documentation:** https://axios-http.com/

---

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review console logs and error messages
3. Verify all prerequisites are installed
4. Check official documentation links

---

**Congratulations! Your Employee Management System is ready to use! 🎉**
