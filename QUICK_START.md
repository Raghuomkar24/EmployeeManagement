# 🚀 Quick Start Checklist

## Pre-Setup Requirements

- [ ] Java 17+ installed (`java -version`)
- [ ] Maven 3.6+ installed (`mvn -version`)
- [ ] Node.js 18+ installed (`node -v`)
- [ ] npm 9+ installed (`npm -v`)
- [ ] MySQL 8.0+ installed and running

---

## Database Setup (5 minutes)

- [ ] Open terminal/command prompt
- [ ] Navigate to project directory
- [ ] Run: `mysql -u root -p < database/schema.sql`
- [ ] Enter MySQL password when prompted
- [ ] Verify database created:
  ```bash
  mysql -u root -p
  SHOW DATABASES;
  USE employee_management;
  SHOW TABLES;
  SELECT * FROM employee;
  exit;
  ```

**Time: ~5 minutes**

---

## Backend Setup (5-10 minutes)

### Option 1: Maven Command

```bash
# Navigate to backend
cd backend

# Update database password in application.properties if needed

# Build and run
mvn clean install
mvn spring-boot:run
```

### Option 2: IDE (IntelliJ/VS Code)

```bash
# Open the backend folder in IDE
# Run EmployeeManagementApplication.java
```

**Expected Output:**
```
======================================
Employee Management API Started
Server: http://localhost:8080
API Base URL: http://localhost:8080/api
======================================
```

**Time: ~5-10 minutes**

---

## Frontend Setup (5 minutes)

```bash
# Navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

**Expected Output:**
```
VITE v5.0.8 ready in 123 ms

➜  Local:   http://localhost:3000/
```

**Time: ~5 minutes**

---

## Verification (5 minutes)

### Backend Verification

- [ ] Backend running on http://localhost:8080
- [ ] No errors in backend console
- [ ] Test API: `curl http://localhost:8080/api/employees`
- [ ] Should return array of employees (or empty array)

### Frontend Verification

- [ ] Frontend running on http://localhost:3000
- [ ] Page loads without errors
- [ ] Navbar visible
- [ ] Logo clickable
- [ ] No errors in browser console (F12)

### Application Verification

- [ ] Home page shows employee count
- [ ] "All Employees" page shows table
- [ ] Can navigate between pages
- [ ] Add Employee button visible

**Time: ~5 minutes**

---

## Feature Testing (10 minutes)

### Create Employee

- [ ] Click "Add Employee" button
- [ ] Fill in form fields:
  - First Name: "John"
  - Last Name: "Doe"
  - Email: "john@example.com"
  - Department: "IT"
  - Salary: "50000"
- [ ] Click "Create Employee"
- [ ] See success message
- [ ] Redirected to employee list
- [ ] New employee appears in list

### View Employees

- [ ] Go to "All Employees"
- [ ] Table shows all employees (including new one)
- [ ] Can see: ID, Name, Email, Department, Salary
- [ ] Total count updated

### Search Employees

- [ ] In employee list, type in search box
- [ ] Search for "John"
- [ ] Only matching employees appear
- [ ] Clear search to see all

### View Details

- [ ] Click eye icon on an employee
- [ ] See full employee details
- [ ] See employee profile
- [ ] See Edit and Delete buttons

### Edit Employee

- [ ] Click "Edit" button on employee details
- [ ] Change "Department" to "HR"
- [ ] Change "Salary" to "60000"
- [ ] Click "Update Employee"
- [ ] See success message
- [ ] Details updated in list

### Delete Employee

- [ ] Click "Delete" on employee
- [ ] Confirm deletion
- [ ] See success message
- [ ] Employee removed from list

---

## Common Issues & Quick Fixes

| Issue | Fix | Status |
|-------|-----|--------|
| "Port 8080 in use" | Change port in application.properties | [ ] |
| "Port 3000 in use" | Vite auto-switches ports | [ ] |
| "Cannot connect to DB" | Check MySQL running, verify credentials | [ ] |
| "npm not found" | Install Node.js | [ ] |
| "API not accessible" | Check backend running, verify URL | [ ] |
| "CORS error" | Ensure CORS configured in backend | [ ] |

---

## Startup Order (IMPORTANT)

```
1. Start MySQL Server
   ↓
2. Start Backend (Terminal 1)
   mvn spring-boot:run
   ↓
3. Start Frontend (Terminal 2)
   npm run dev
   ↓
4. Open Browser
   http://localhost:3000
   ↓
5. Test Application
```

---

## Files to Refer

| Task | File |
|------|------|
| Need setup help | SETUP_INSTRUCTIONS.md |
| Need API examples | API_DOCUMENTATION.md |
| Need code explanation | PROJECT_OVERVIEW.md |
| Having issues | TROUBLESHOOTING.md |
| Need file listing | FILE_MANIFEST.md |
| Want overview | README.md |

---

## Timeline Estimate

| Phase | Time |
|-------|------|
| Prerequisites Check | 5 min |
| Database Setup | 5 min |
| Backend Setup | 5-10 min |
| Frontend Setup | 5 min |
| Verification | 5 min |
| Feature Testing | 10 min |
| **Total** | **~40-50 min** |

---

## Success Indicators

When everything is working correctly:

✅ Backend console shows startup message  
✅ Frontend page loads on localhost:3000  
✅ Employee table displays  
✅ Can create employee without errors  
✅ Can view, edit, delete employees  
✅ No red errors in browser console  
✅ No red errors in backend console  
✅ Search functionality works  
✅ Success messages appear  
✅ Navigation works  

---

## Troubleshooting Quick Checks

If something doesn't work:

1. **Check all three are running:**
   - MySQL service
   - Backend on :8080
   - Frontend on :3000

2. **Check console for errors:**
   - Browser console (F12)
   - Backend terminal
   - Check TROUBLESHOOTING.md

3. **Verify configuration:**
   - Check .env file in frontend
   - Check application.properties in backend
   - Check database credentials

4. **Try restarting:**
   - Stop all services
   - Restart MySQL
   - Restart backend
   - Restart frontend

5. **Check firewall:**
   - Ports 3000, 8080, 3306
   - Allow Java and Node processes

---

## Next Steps After Setup

### Learn & Understand
- [ ] Read PROJECT_OVERVIEW.md
- [ ] Study architecture
- [ ] Review code structure
- [ ] Understand data flow

### Extend Features
- [ ] Add new employee fields
- [ ] Add department statistics
- [ ] Add salary range filter
- [ ] Add bulk operations

### Improve Security
- [ ] Add authentication
- [ ] Add authorization
- [ ] Add input sanitization
- [ ] Add rate limiting

### Deploy to Production
- [ ] Build backend JAR
- [ ] Build frontend dist
- [ ] Deploy to cloud
- [ ] Configure CI/CD

---

## Testing Commands

```bash
# Test backend API
curl http://localhost:8080/api/employees

# Test database connection
mysql -u root -p -e "SELECT * FROM employee_management.employee;"

# Test frontend loading
curl http://localhost:3000

# Check ports in use
# Windows: netstat -ano | findstr :3000 or :8080
# Linux/Mac: lsof -i :3000 or :8080
```

---

## Configuration Verification

### Backend (application.properties)
- [ ] Database URL: `jdbc:mysql://localhost:3306/employee_management`
- [ ] Username: `root`
- [ ] Password: (your MySQL password)
- [ ] Server port: `8080`

### Frontend (.env)
- [ ] API URL: `http://localhost:8080/api`

### Database (MySQL)
- [ ] Database name: `employee_management`
- [ ] Table name: `employee`
- [ ] User: `root`

---

## Performance Baseline

After setup, you should see:
- **Backend startup:** < 10 seconds
- **Frontend load:** < 3 seconds
- **API response:** < 100ms
- **Database query:** < 50ms

---

## Support Resources

| Resource | Link |
|----------|------|
| Setup Guide | SETUP_INSTRUCTIONS.md |
| API Docs | API_DOCUMENTATION.md |
| Project Overview | PROJECT_OVERVIEW.md |
| Troubleshooting | TROUBLESHOOTING.md |
| File List | FILE_MANIFEST.md |

---

## Final Checklist

Before declaring setup complete:

- [ ] All prerequisites installed
- [ ] Database created with sample data
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8080/api
- [ ] Home page shows statistics
- [ ] Can create employee
- [ ] Can view employees
- [ ] Can edit employee
- [ ] Can delete employee
- [ ] No errors in console
- [ ] Search works
- [ ] Form validation works
- [ ] Navigation works

---

## Emergency Restart

If something goes wrong:

```bash
# Kill all Node processes
ps aux | grep node
kill -9 <PID>

# Kill backend
ps aux | grep java
kill -9 <PID>

# Restart MySQL
sudo systemctl restart mysql  # Linux
# or use Services app (Windows)
# or brew services restart mysql-server (Mac)

# Restart backend
cd backend
mvn clean spring-boot:run

# Restart frontend
cd frontend
npm run dev
```

---

## Success! 🎉

If you've checked all the boxes above, **your Employee Management CRUD application is fully set up and running!**

### You can now:
- ✅ Create employees
- ✅ View employees
- ✅ Edit employees
- ✅ Delete employees
- ✅ Search employees
- ✅ View statistics
- ✅ Explore the code
- ✅ Learn full-stack development

---

## What's Next?

1. **Explore the code** - Read through the files
2. **Understand the flow** - Follow how data moves
3. **Experiment** - Try modifying things
4. **Learn** - Study the architecture
5. **Extend** - Add new features
6. **Deploy** - Put it on the cloud

---

## Time Investment

- **Setup Time:** 30-50 minutes
- **Learning Time:** 2-4 hours
- **Modification Time:** Varies
- **Deployment Time:** 1-2 hours

---

## Contact & Support

For issues:
1. Check TROUBLESHOOTING.md
2. Review error messages carefully
3. Check browser console (F12)
4. Check backend logs
5. Refer to documentation files

---

## Key Reminder

**Start Backend BEFORE Frontend!**

The frontend needs the backend API to be running.

```
Start Backend (Terminal 1)
Wait for "API Started" message
THEN Start Frontend (Terminal 2)
```

---

## Completion Status

- [x] Database setup instructions
- [x] Backend setup instructions
- [x] Frontend setup instructions
- [x] Verification checklist
- [x] Feature testing checklist
- [x] Troubleshooting guide
- [x] Support resources
- [x] Next steps guide

---

**You're all set! Start with the database setup and follow the checklist. It should take about 40-50 minutes to get everything running. Happy coding! 🚀**

---

**Quick Command Summary:**
```bash
# Terminal 1: Database
mysql -u root -p < database/schema.sql

# Terminal 2: Backend
cd backend && mvn spring-boot:run

# Terminal 3: Frontend
cd frontend && npm install && npm run dev

# Browser
http://localhost:3000
```

**That's it! You're ready to go!** ✨
