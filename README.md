HRMS Lite – Full Stack Application
Project Overview

HRMS Lite is a lightweight Human Resource Management System designed to manage employee records and track daily attendance.

This application demonstrates end-to-end full stack development using a Python backend with MongoDB and a React TypeScript frontend. The system focuses on clean architecture, proper validation, production-ready UI, and stable API integration.

The goal of this project is to simulate a simple internal HR tool with essential HR operations while maintaining professional UI standards and backend reliability.

Tech Stack
Frontend

React (with TypeScript)

Tailwind CSS

Framer Motion (animations)

Axios (API communication)

React Hot Toast (notifications)

Backend

Python

FastAPI

MongoDB (Motor async driver)

Pydantic (validation)

Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

Database: MongoDB Atlas

Features
Employee Management

Add a new employee

View all employees

Delete employee

Unique employee ID enforcement

Email format validation

Duplicate employee prevention

Cascade delete of attendance when employee is deleted

Attendance Management

Mark attendance (Present / Absent)

Prevent duplicate attendance for same date

Prevent future date attendance

View attendance per employee

Filter attendance by date

Summary of total present and absent days

Validation and Error Handling

Required field validation

Email format validation

Proper HTTP status codes

Meaningful backend error messages

Frontend toast notifications for errors and success states

Loading and empty states handled properly

API Endpoints
Employee APIs

GET /employees
Returns all employees

POST /employees
Creates a new employee

DELETE /employees/{id}
Deletes an employee and associated attendance

Attendance APIs

POST /attendance
Marks attendance

GET /attendance/{employee_id}
Returns attendance records

GET /attendance/{employee_id}?date=YYYY-MM-DD
Filters attendance by date

GET /attendance/summary/{employee_id}
Returns total present and absent days

Database Design
Employee Collection

employee_id (unique)

full_name

email

department

Unique index enforced at database level on employee_id.

Attendance Collection

employee_id (reference)

date

status (Present / Absent)

Compound uniqueness enforced for employee_id + date.

Project Structure
Backend

hrmsbackend/

app/

main.py

database.py

schemas.py

routes/

employees.py

attendance.py

requirements.txt

Frontend

hrmsfrontend/

src/

pages/

Employees.tsx

Attendance.tsx

components/

services/

types/

Running the Project Locally
Backend Setup

Navigate to backend folder

cd hrmsbackend


Create virtual environment

python -m venv venv


Activate virtual environment

Windows:

venv\Scripts\Activate.ps1


Install dependencies

pip install -r requirements.txt


Run server

uvicorn app.main:app --reload


Backend runs at:
http://127.0.0.1:8000

API documentation available at:
http://127.0.0.1:8000/docs

Frontend Setup

Navigate to frontend folder

cd hrmsfrontend


Install dependencies

npm install


Run development server

npm run dev


Frontend runs at:
http://localhost:5173

Deployment Notes

MongoDB Atlas used for production database.

Backend deployed on Render / Railway.

Frontend deployed on Vercel / Netlify.

CORS configured properly to allow frontend-backend communication.

Environment variables used for MongoDB connection string.

Assumptions

Single admin user (no authentication implemented).

Leave management and payroll are out of scope.

Only core HR operations included.

Date validation handled at backend level.

Future dates are restricted for attendance marking.

Design Considerations

Clean and responsive UI using Tailwind CSS.

Glass-style card layouts.

Animated transitions for better user experience.

Toast-based error and success messaging.

Structured separation between attendance marking and attendance viewing sections.

Proper empty state and loading indicators.

Possible Improvements

Add authentication and role-based access

Replace native date input with custom calendar component

Add pagination for large employee lists

Add edit employee functionality

Implement dashboard analytics

Add search and sorting

Conclusion

HRMS Lite demonstrates practical full stack development skills including:

RESTful API design

Database modeling

Data validation

Error handling

Responsive UI development

Frontend and backend integration

Production deployment readiness

The system is stable, modular, and ready for extension into a more comprehensive HR platform.