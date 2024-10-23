
![Logo](https://i.imgur.com/IMr43ye.png)


# ClassHub - Learning Management System

ClassHub is designed to address the limitations of existing learning management systems by providing a streamlined, user-friendly platform that integrates essential educational tools in one place. The ClassHub app simplifies the educational process, making learning more interactive, organized, and accessible for everyone involved.


## Features

- Registration/Login
- Manage students, subjects, classes, quizzes, feedbacks and notes
- Details performance and academic statistics
- Responsive UI
- Session authentication and authorization
- Password hashing
- SQLi safe and XSS safe


## Run Locally

Clone the project

```bash
  git clone https://github.com/gauravmehraa/ClassHub
```

Go to the project directory

```bash
  cd ClassHub
```

Install dependencies

```bash
  cd frontend && npm install && cd ../backend && npm install
```

Setup environment variables

```bash
  touch .env
```

Start the server

```bash
  npm run dev
```

Start the frontend

```bash
  cd ../frontend && npm run start
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in /backend/

`PORT` - Specify server port

`MONGODB_URL` - MongoDB connection string

`SECRET_PHRASE` - Pre-defined secret phrase for registration

`JWT_TEACHER_SECRET` - Generated session secret

`JWT_STUDENT_SECRET` - Generated session secret

`S3_BUCKET_REGION` - AWS S3 Bucket Region

`AWS_ACCESS_KEY` - AWS Credentials

`AWS_SECRET_ACCESS_KEY` - AWS Credentials

`NODE_ENV` - `dev` or `production`


## Tech Stack


**Client:** React, TailwindCSS, DaisyUI

**Server:** Node, Express

**Database:** MongoDB

**Storage:** AWS S3

**Authentication:** JSON Web Token, bcryptjs

**API:** REST
