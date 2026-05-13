# Troubleshooting Guide - Employee Management System

## Common Issues and Solutions

---

## 🔴 BACKEND ISSUES

### Issue 1: Backend won't start - "Cannot connect to database"

**Symptoms:**
```
java.sql.SQLException: Access denied for user 'root'@'localhost'
or
Unable to determine a JDBC Driver for connecting to...
```

**Solutions:**

1. **Verify MySQL is running:**
   ```bash
   # Windows
   Get-Process mysqld
   
   # Linux
   sudo service mysql status
   
   # Mac
   brew services list | grep mysql
   ```

2. **Start MySQL if not running:**
   ```bash
   # Windows - Start from Services
   # or use MySQL Installer
   
   # Linux
   sudo service mysql start
   
   # Mac
   brew services start mysql-server
   ```

3. **Check database credentials in `application.properties`:**
   ```properties
   spring.datasource.username=root
   spring.datasource.password=root
   ```

4. **Verify database exists:**
   ```bash
   mysql -u root -p
   SHOW DATABASES;
   USE employee_management;
   SHOW TABLES;
   ```

5. **Create database if missing:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

---

### Issue 2: "Port 8080 already in use"

**Symptoms:**
```
Address already in use: bind
Port 8080 is already in use
```

**Solutions:**

1. **Find process using port 8080:**
   ```bash
   # Windows
   netstat -ano | findstr :8080
   # Note the PID
   
   # Linux/Mac
   lsof -i :8080
   ```

2. **Kill the process:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # Linux/Mac
   kill -9 <PID>
   ```

3. **Or change port in `application.properties`:**
   ```properties
   server.port=8081
   ```

4. **Then update frontend `.env` file:**
   ```
   VITE_API_URL=http://localhost:8081/api
   ```

---

### Issue 3: "Cannot find Maven"

**Symptoms:**
```
'mvn' is not recognized as an internal or external command
```

**Solutions:**

1. **Install Maven:**
   - Download from: https://maven.apache.org/download.cgi
   - Extract to a folder (e.g., `C:\apache-maven-3.9.0`)

2. **Add Maven to PATH:**
   ```bash
   # Windows - Set environment variable
   MAVEN_HOME = C:\apache-maven-3.9.0
   Add to PATH: %MAVEN_HOME%\bin
   
   # Linux/Mac - Edit ~/.bashrc or ~/.zshrc
   export MAVEN_HOME=/usr/local/apache-maven-3.9.0
   export PATH=$MAVEN_HOME/bin:$PATH
   ```

3. **Verify installation:**
   ```bash
   mvn -version
   ```

---

### Issue 4: "Java version incompatible"

**Symptoms:**
```
Unsupported class version (higher version than 17)
or
Java language level was set to X but...
```

**Solutions:**

1. **Check Java version:**
   ```bash
   java -version
   ```

2. **Install Java 17 or higher:**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Or: https://adoptium.net/

3. **Set JAVA_HOME:**
   ```bash
   # Windows
   JAVA_HOME = C:\Program Files\Java\jdk-17
   
   # Linux/Mac
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
   ```

4. **Verify:**
   ```bash
   java -version
   ```

---

### Issue 5: Build fails with "Cannot resolve dependencies"

**Symptoms:**
```
[ERROR] 'dependencies.dependency.version' for ... is missing
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin
```

**Solutions:**

1. **Clean and rebuild:**
   ```bash
   mvn clean install -U
   ```
   The `-U` flag forces update of dependencies

2. **Check internet connection:**
   - Ensure you have internet connection
   - Proxy issues? Configure Maven settings.xml

3. **Check Maven settings:**
   - Look for `~/.m2/settings.xml`
   - Or Maven installation directory

4. **Try alternate Maven repository:**
   - Edit `pom.xml`
   - Add repository configuration

---

### Issue 6: Application starts but no logs appear

**Symptoms:**
- Application seems to start silently
- No error messages shown
- Can't tell if it's working

**Solutions:**

1. **Enable verbose logging in `application.properties`:**
   ```properties
   logging.level.root=DEBUG
   logging.level.com.employeeapp=DEBUG
   logging.level.org.springframework=INFO
   ```

2. **Check console output carefully:**
   - Look for "Employee Management API Started"
   - Check for error messages

3. **Test if server is running:**
   ```bash
   curl http://localhost:8080/api/employees
   ```

4. **Check firewall:**
   - Windows Firewall might block port 8080
   - Add exception for Java/port 8080

---

### Issue 7: "Hibernate dialect not found"

**Symptoms:**
```
Unknown MySQL server version for jdbc driver
No valid JDBC driver
```

**Solutions:**

1. **Update `application.properties`:**
   ```properties
   spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
   ```

2. **Verify MySQL version:**
   ```bash
   mysql --version
   # Should be 5.7+ or 8.0+
   ```

3. **Check pom.xml for MySQL driver:**
   ```xml
   <dependency>
       <groupId>com.mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>8.0.33</version>
   </dependency>
   ```

---

## 🟠 FRONTEND ISSUES

### Issue 8: Frontend won't start - "npm: command not found"

**Symptoms:**
```
'npm' is not recognized
bash: npm: command not found
```

**Solutions:**

1. **Install Node.js:**
   - Download from: https://nodejs.org/
   - Choose LTS version (v18 or higher)
   - Run installer

2. **Restart terminal:**
   - Close and reopen terminal/command prompt

3. **Verify installation:**
   ```bash
   node -v
   npm -v
   ```

4. **Check PATH:**
   ```bash
   # Windows - Check if nodejs is in PATH
   # Linux/Mac - Run: which npm
   ```

---

### Issue 9: "Port 3000 already in use"

**Symptoms:**
```
Port 3000 is in use
EADDRINUSE: address already in use
```

**Solutions:**

1. **Find process using port 3000:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   
   # Linux/Mac
   lsof -i :3000
   ```

2. **Kill the process:**
   ```bash
   # Windows
   taskkill /PID <PID> /F
   
   # Linux/Mac
   kill -9 <PID>
   ```

3. **Or use different port:**
   - Vite will automatically try next available port
   - Or configure in `vite.config.js`

4. **Check vite.config.js:**
   ```javascript
   server: {
     port: 3001  // Change port here
   }
   ```

---

### Issue 10: "Cannot connect to backend API"

**Symptoms:**
```
Network Error
Failed to fetch
CORS error in console
```

**Solutions:**

1. **Verify backend is running:**
   ```bash
   # Test backend
   curl http://localhost:8080/api/employees
   
   # Or check browser: http://localhost:8080/api/employees
   ```

2. **Check `.env` file:**
   ```bash
   # Ensure .env exists and has:
   VITE_API_URL=http://localhost:8080/api
   ```

3. **Verify CORS configuration:**
   - Backend should have CORS enabled
   - Check `EmployeeManagementApplication.java`
   - Should allow `http://localhost:3000`

4. **Check browser console:**
   - Press F12 to open DevTools
   - Check Console tab for errors
   - Check Network tab for failed requests

5. **Clear browser cache:**
   ```bash
   # Close browser and clear cache
   # Or use incognito/private window
   ```

6. **Restart both frontend and backend:**
   - Kill frontend process
   - Kill backend process
   - Restart backend first
   - Then restart frontend

---

### Issue 11: "Cannot resolve module"

**Symptoms:**
```
Module not found: Can't resolve 'react'
Module not found: Can't resolve 'axios'
```

**Solutions:**

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Check package.json:**
   - Verify all required packages are listed
   - Compare with provided package.json

3. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Verify correct directory:**
   - Make sure you're in the `frontend` directory
   - Check with `pwd` command

---

### Issue 12: Form validation not working

**Symptoms:**
- Invalid data gets submitted
- Validation errors not showing
- API rejects but no error message

**Solutions:**

1. **Check browser console:**
   - F12 → Console tab
   - Look for JavaScript errors

2. **Verify React DevTools:**
   - Install React DevTools extension
   - Check component state

3. **Review `EmployeeForm.jsx`:**
   - Check `validateForm()` function
   - Verify error state updates
   - Check error display logic

4. **Check API response:**
   - Network tab → XHR/Fetch
   - Look for error messages from backend

---

### Issue 13: "Dependencies conflict"

**Symptoms:**
```
npm ERR! peer dep missing
npm ERR! could not resolve dependency
```

**Solutions:**

1. **Check Node and npm versions:**
   ```bash
   node -v  # Should be v18+
   npm -v   # Should be 9+
   ```

2. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

3. **Force install dependencies:**
   ```bash
   npm install --force
   ```

4. **Use npm ci instead:**
   ```bash
   npm ci
   ```
   This uses exact versions from package-lock.json

---

### Issue 14: Build is very slow

**Symptoms:**
- `npm run build` takes too long
- `npm install` downloads very slowly

**Solutions:**

1. **Check internet speed:**
   - Test download speed
   - Check proxy settings

2. **Use npm cache:**
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Update npm registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

4. **Try yarn instead (if installed):**
   ```bash
   yarn install
   yarn build
   ```

---

## 🔵 DATABASE ISSUES

### Issue 15: "Cannot connect to MySQL"

**Symptoms:**
```
Access denied for user 'root'@'localhost'
Can't connect to MySQL server on 'localhost'
```

**Solutions:**

1. **Check MySQL server status:**
   ```bash
   # Windows
   Services.msc → Look for MySQL
   
   # Linux
   sudo systemctl status mysql
   
   # Mac
   brew services list | grep mysql
   ```

2. **Start MySQL:**
   ```bash
   # Windows - Start from Services
   # Linux: sudo systemctl start mysql
   # Mac: brew services start mysql-server
   ```

3. **Test connection:**
   ```bash
   mysql -u root -p
   # Enter password
   ```

4. **Reset password if forgotten:**
   ```bash
   # Windows (Start without password)
   mysqld.exe --skip-grant-tables
   # Then update password
   
   # Linux
   sudo mysql -u root
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
   ```

---

### Issue 16: "Database doesn't exist"

**Symptoms:**
```
Unknown database 'employee_management'
Could not create connection to database...
```

**Solutions:**

1. **Create database manually:**
   ```bash
   mysql -u root -p
   CREATE DATABASE employee_management;
   USE employee_management;
   SOURCE /path/to/database/schema.sql;
   ```

2. **Or run schema script:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

3. **Verify database creation:**
   ```bash
   mysql -u root -p
   SHOW DATABASES;
   USE employee_management;
   SHOW TABLES;
   SELECT COUNT(*) FROM employee;
   ```

---

### Issue 17: "Table doesn't exist or structure is wrong"

**Symptoms:**
```
Table 'employee_management.employee' doesn't exist
Unknown column 'first_name'
```

**Solutions:**

1. **Check table structure:**
   ```bash
   mysql -u root -p employee_management
   DESCRIBE employee;
   ```

2. **Recreate table:**
   ```bash
   # Drop and recreate
   DROP TABLE IF EXISTS employee;
   # Then run schema.sql again
   mysql -u root -p employee_management < database/schema.sql
   ```

3. **Verify column names match entity:**
   - Database uses: `first_name`, `last_name`
   - Entity uses: `firstName`, `lastName` (camelCase)
   - Check JPA mapping with `@Column` annotations

---

### Issue 18: "Data won't save to database"

**Symptoms:**
- Form submits successfully
- No error messages
- Data doesn't appear in database
- Data disappears after refresh

**Solutions:**

1. **Check database connection:**
   ```bash
   mysql -u root -p
   USE employee_management;
   SELECT * FROM employee;
   ```

2. **Check Hibernate logging:**
   ```properties
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.format_sql=true
   ```

3. **Verify transaction is committing:**
   - Check `@Transactional` annotation on service methods
   - Look at backend logs

4. **Check for validation errors:**
   - Look at browser Network tab
   - Check backend console for errors
   - Review API response

---

## 🟡 GENERAL ISSUES

### Issue 19: Application works but very slow

**Symptoms:**
- Page loads slowly
- API responses take too long
- Frequent timeouts

**Solutions:**

1. **Check system resources:**
   - CPU, RAM, Disk usage
   - Close unnecessary applications

2. **Check database queries:**
   - Enable query logging
   - Look for slow queries
   - Add database indexes

3. **Optimize frontend:**
   - Check Network tab for large files
   - Look for blocking requests
   - Use Chrome DevTools Performance tab

4. **Optimize backend:**
   - Check memory usage
   - Look for N+1 query problems
   - Enable connection pooling

---

### Issue 20: Application works on localhost but not on network

**Symptoms:**
- Works on http://localhost:3000
- Doesn't work on http://192.168.x.x:3000
- CORS errors when accessing from other machines

**Solutions:**

1. **Update CORS configuration:**
   ```java
   registry.addMapping("/employees/**")
       .allowedOrigins("http://192.168.x.x:3000")
       .allowedMethods("GET", "POST", "PUT", "DELETE")
   ```

2. **Update frontend API URL:**
   ```bash
   # In .env or in code
   VITE_API_URL=http://192.168.x.x:8080/api
   ```

3. **Check firewall:**
   - Allow port 3000 and 8080
   - Check router settings
   - Check network policies

4. **Update Vite config:**
   ```javascript
   server: {
     host: '0.0.0.0',  // Listen on all interfaces
     port: 3000
   }
   ```

---

### Issue 21: Git clone gives error

**Symptoms:**
```
fatal: Not a git repository
or
Permission denied
```

**Solutions:**

1. **Initialize git (if needed):**
   ```bash
   git init
   ```

2. **Configure git credentials:**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

3. **Check SSH keys (for GitHub):**
   ```bash
   ssh -T git@github.com
   ```

---

### Issue 22: Files seem to have wrong permissions

**Symptoms:**
```
Permission denied
Cannot execute file
Cannot write to directory
```

**Solutions:**

1. **Fix file permissions (Linux/Mac):**
   ```bash
   chmod +x ./backend/mvnw
   chmod 755 ./backend
   ```

2. **Run as administrator (Windows):**
   - Right-click terminal
   - Select "Run as administrator"

3. **Check directory ownership:**
   ```bash
   ls -la  # Check ownership
   chown -R $USER:$USER .  # Fix ownership
   ```

---

## ✅ VERIFICATION CHECKLIST

Before declaring an issue solved, verify:

- [ ] Application starts without errors
- [ ] No red errors in browser console
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:8080/api/employees
- [ ] Database has sample employees
- [ ] Can create new employee
- [ ] Can view employee list
- [ ] Can edit employee
- [ ] Can delete employee
- [ ] Form validation works
- [ ] Success messages appear
- [ ] Navigation works correctly

---

## 🆘 GETTING HELP

### Steps to troubleshoot systematically:

1. **Read the error message carefully**
   - Most errors clearly state the problem
   - Search for the error message online

2. **Check logs:**
   - Browser console (F12)
   - Backend terminal logs
   - Database logs

3. **Verify prerequisites:**
   - Java 17+ installed
   - Node.js v18+ installed
   - MySQL running
   - Ports available

4. **Review configuration:**
   - Check all .properties files
   - Check all .env files
   - Verify URLs and paths

5. **Try basic solutions:**
   - Restart services
   - Clear cache
   - Rebuild project
   - Reinstall dependencies

6. **Test individual components:**
   - Test database connection
   - Test API endpoint
   - Test frontend component

---

## 📞 SUPPORT RESOURCES

### Documentation Files
- README.md - Overview
- SETUP_INSTRUCTIONS.md - Detailed setup
- API_DOCUMENTATION.md - API reference
- PROJECT_OVERVIEW.md - Architecture

### Official Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [React Docs](https://react.dev/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Node.js Docs](https://nodejs.org/docs/)

### Community Resources
- Stack Overflow
- GitHub Issues
- Official Forums

---

## 🎯 QUICK FIX SUMMARY

| Issue | Quick Fix |
|-------|-----------|
| Port in use | Change port in config |
| MySQL not running | Start MySQL service |
| npm not found | Install Node.js |
| API not accessible | Verify CORS config |
| Database not created | Run schema.sql |
| Module not found | npm install |
| Validation failing | Check console for errors |
| Slow performance | Check system resources |
| CORS error | Update allowed origins |
| Build fails | mvn clean install -U |

---

**Last Updated:** January 2024
**Version:** 1.0.0

**Remember: Read error messages carefully and check logs first! 99% of issues have clear error messages.**
