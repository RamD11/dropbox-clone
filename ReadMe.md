# Dropbox Clone

## Overview

Dropbox Clone is a lightweight, full-stack file storage application inspired by Dropbox. It enables users to upload, list, download, and view files through a simple, user-friendly interface. Built with a Django backend, React frontend, and MySQL database, the project is fully containerized using Docker for seamless development and deployment.

---

## Features

- **File Upload**: Upload files with a restricted set of extensions (`.jpeg`, `.jpg`, `.png`, `.pdf`, `.docx`, `.txt`, `.doc`, `.xls`, `.xlsx`).
- **File List**: Displays a table of uploaded files with columns: Name (clickable to view in nw tab), Size (human-readable), Time Uploaded, and aDownload button.
- **File Download**: Download files via a button in the table.
- **File Viewing**: View file contents in a new tab by clicking the file name (best for text files; other types end up downloading instead of viewing).
- **UI Design**: Features a header and a gray-bordered table, styled with Material-UI.
- **State Management**: Uses React Context for centralized file data and actions.
- **Persistent Storage**: Stores file metadata in MySQL and files in the filesystem.

---

## Technologies

- **Backend**:
  - Django (Python)
  - Django-REST-Framework
  - MySQL
- **Frontend**:
  - React (JavaScript)
  - Material-UI
  - Axios
  - React Context
- **Container**:
  - Docker
  - Docker Compose

---


## Setup Instructions

### Prerequisites
- Docker Desktop (includes Docker and Docker Compose)
- Windows PowerShell (or another terminal)
- Git (optional, for cloning)

### Note:
- ensure line endings is LF for "dropbox-clone\backend\wait_for_mysql.sh" and not CRLF

### Steps
1. **Clone the Repository**:
   ```powershell
   git clone https://github.com/RamD11/dropbox-clone.git
   cd dropbox-clone

2. **Build and Run**:
docker-compose up --build
- Wait for the backend to initialize MySQL and apply migrations.

3. **Opening the App**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/files/
- Django Admin: http://localhost:8000/admin/

4. **(Optional if needed) Creating the Admin User**:
docker exec -it dropbox-clone-backend-1 bash
Inside the container:
python manage.py createsuperuser
exit

5. **To Stop the App**:
docker-compose down

6. **Resetting the Data (if needed)**:
docker-compose down
docker volume rm dropbox-clone_mysql-data
Remove-Item -Path backend\media\uploads\* -Recurse -Force
docker-compose up --build

### Implementation Details

**Backend**
- Framework: Django with REST Framework for API endpoints.
- Model: File with fields: {name, file (FileField), and uploaded_at}.
- APIs implemented in /files/views.py:
  - GET /api/files/list/: to list all files with metadata.
  - POST /api/files/upload/: To upload the files, restricting only allowed extensions.
  - GET /api/files/download/<pk>/: For downloading or viewing files (?view=true).
- File Restrictions: Validates extensions in "FileUpload" view.

**Frontend**
- Structure: Home.js for UI, FileContext.js for state.
- UI: Dark blue header (#1976d2), gray-bordered table (#bdbdbd), Material-UI components.
- File Handling: Restricts uploads file extensions via accept attribute; displays errors via alerts.

**Docker**
- Services: backend, frontend, mysql.
- Volumes: mysql-data for database, media for files.
- Sync: wait-for-mysql.sh ensures MySQL readiness.

**Usage**

1. Cmd to Run the App:
docker-compose up --build

2. Upload Files:
- Click on "Upload File" at http://localhost:3000.
- Only the allowed extensions (.jpeg, .jpg, .png, .pdf, .docx, .txt, .doc, .xls, .xlsx) are accepted.

3. View/Download:
- Click a file name to view in a new tab.
- Click on the download icon to save the file.

4. Stop:
docker-compose down

**Notes**
- File Types: Restricted to .jpeg, .jpg, .png, .pdf, .docx, .txt, .doc, .xls, .xlsx
- implemented a shell script: "dropbox-clone\backend\wait_for_mysql.sh" so that backend building is put on hold to let the db come up first
