# API Documentation - Employee Management System

## Base URL

```
http://localhost:8080/api
```

## Authentication

Currently, the API doesn't require authentication. All endpoints are publicly accessible.
(Authentication can be implemented using JWT in future versions)

---

## Endpoints

### 1. Get All Employees

**Request:**
```
GET /employees
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 75000.00,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "department": "HR",
    "salary": 65000.00,
    "createdAt": "2024-01-14T14:20:00",
    "updatedAt": "2024-01-14T14:20:00"
  }
]
```

**Status Code:** `200 OK`

---

### 2. Get Employee by ID

**Request:**
```
GET /employees/{id}
```

**Example:**
```
GET /employees/1
```

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "department": "IT",
  "salary": 75000.00,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

**Status Codes:**
- `200 OK` - Employee found
- `400 Bad Request` - Employee not found

**Error Response (404):**
```json
{
  "error": "Employee not found with ID: 999"
}
```

---

### 3. Search Employees by Name

**Request:**
```
GET /employees/search/name?searchTerm={searchTerm}
```

**Example:**
```
GET /employees/search/name?searchTerm=john
```

**Query Parameters:**
- `searchTerm` (required): String to search in first name or last name

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 75000.00,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  }
]
```

**Status Code:** `200 OK`

---

### 4. Get Employees by Department

**Request:**
```
GET /employees/department/{department}
```

**Example:**
```
GET /employees/department/IT
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "IT",
    "salary": 75000.00,
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-15T10:30:00"
  },
  {
    "id": 4,
    "firstName": "Sarah",
    "lastName": "Williams",
    "email": "sarah@example.com",
    "department": "IT",
    "salary": 72000.00,
    "createdAt": "2024-01-16T09:15:00",
    "updatedAt": "2024-01-16T09:15:00"
  }
]
```

**Status Code:** `200 OK`

---

### 5. Create Employee

**Request:**
```
POST /employees
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@example.com",
  "department": "Finance",
  "salary": 70000.00
}
```

**Response:**
```json
{
  "id": 7,
  "firstName": "Alice",
  "lastName": "Johnson",
  "email": "alice@example.com",
  "department": "Finance",
  "salary": 70000.00,
  "createdAt": "2024-01-20T11:45:00",
  "updatedAt": "2024-01-20T11:45:00"
}
```

**Status Code:** `201 Created`

**Required Fields:**
- `firstName` (string, min 2 chars)
- `lastName` (string, min 2 chars)
- `email` (string, valid email format, must be unique)
- `department` (string)
- `salary` (number, >= 0)

**Error Response (400):**
```json
{
  "error": "Email already exists: alice@example.com"
}
```

---

### 6. Update Employee

**Request:**
```
PUT /employees/{id}
Content-Type: application/json
```

**Example:**
```
PUT /employees/1
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "IT",
  "salary": 80000.00
}
```

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "IT",
  "salary": 80000.00,
  "createdAt": "2024-01-15T10:30:00",
  "updatedAt": "2024-01-20T15:30:00"
}
```

**Status Codes:**
- `200 OK` - Employee updated successfully
- `400 Bad Request` - Validation error

**Notes:**
- All fields are required
- Email must be unique or same as before
- Salary must be non-negative

---

### 7. Delete Employee

**Request:**
```
DELETE /employees/{id}
```

**Example:**
```
DELETE /employees/1
```

**Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

**Status Codes:**
- `200 OK` - Employee deleted successfully
- `400 Bad Request` - Employee not found

**Error Response:**
```json
{
  "error": "Employee not found with ID: 999"
}
```

---

### 8. Get Total Employee Count

**Request:**
```
GET /employees/stats/count
```

**Response:**
```json
{
  "totalEmployees": 6
}
```

**Status Code:** `200 OK`

---

## Employee Object Structure

```json
{
  "id": "integer - Unique identifier",
  "firstName": "string - Employee's first name",
  "lastName": "string - Employee's last name",
  "email": "string - Unique email address",
  "department": "string - Department name",
  "salary": "number - Annual salary (2 decimal places)",
  "createdAt": "ISO 8601 timestamp - Record creation time",
  "updatedAt": "ISO 8601 timestamp - Last update time"
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | GET request successful |
| 201 | Created | Employee created successfully |
| 400 | Bad Request | Validation error or employee not found |
| 500 | Internal Server Error | Server error |

### Error Response Format

All error responses follow this format:

```json
{
  "error": "Description of the error"
}
```

### Common Validation Errors

| Error | Cause |
|-------|-------|
| "First name is required" | firstName field is empty |
| "Invalid email format" | Email doesn't match pattern |
| "Email already exists" | Email is already used by another employee |
| "Salary must be a positive number" | Salary is negative or not a number |
| "Employee not found with ID: X" | Employee with ID X doesn't exist |

---

## CORS Configuration

CORS is enabled for the following origins:
- http://localhost:3000
- http://localhost:5173
- http://127.0.0.1:3000

Allowed methods: GET, POST, PUT, DELETE, OPTIONS

---

## Rate Limiting

Currently, there is no rate limiting. In production, consider implementing:
- Request throttling
- API key authentication
- Rate limits per IP/user

---

## Example Requests with cURL

### Get All Employees
```bash
curl -X GET http://localhost:8080/api/employees
```

### Get Specific Employee
```bash
curl -X GET http://localhost:8080/api/employees/1
```

### Create Employee
```bash
curl -X POST http://localhost:8080/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bob",
    "lastName": "Wilson",
    "email": "bob@example.com",
    "department": "Sales",
    "salary": 55000
  }'
```

### Update Employee
```bash
curl -X PUT http://localhost:8080/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Robert",
    "lastName": "Wilson",
    "email": "robert@example.com",
    "department": "Sales",
    "salary": 60000
  }'
```

### Delete Employee
```bash
curl -X DELETE http://localhost:8080/api/employees/1
```

### Search Employees
```bash
curl -X GET "http://localhost:8080/api/employees/search/name?searchTerm=john"
```

### Get by Department
```bash
curl -X GET http://localhost:8080/api/employees/department/IT
```

### Get Employee Count
```bash
curl -X GET http://localhost:8080/api/employees/stats/count
```

---

## Testing with Postman

1. **Import Collection:**
   - Create a new collection in Postman
   - Add the endpoints as requests

2. **Environment Variables:**
   - Set `base_url` to `http://localhost:8080/api`

3. **Test Requests:**
   - Use Pre-request Script for setup
   - Use Tests tab for assertions

---

## Response Times

Expected response times (on local machine):
- GET requests: < 50ms
- POST/PUT requests: < 100ms
- DELETE requests: < 50ms

---

## Future Enhancements

- [ ] Pagination support
- [ ] Sorting options
- [ ] Advanced filtering
- [ ] JWT authentication
- [ ] Role-based access control
- [ ] API versioning
- [ ] Rate limiting
- [ ] Request logging
- [ ] Caching strategies

---

## Support

For API-related issues:
1. Check error messages carefully
2. Verify request format
3. Review validation rules
4. Check server logs
5. Verify database connectivity

---

**API Version:** 1.0.0
**Last Updated:** January 2024
