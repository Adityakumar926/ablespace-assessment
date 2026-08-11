# AbleSpace NestJS Backend REST API

**Tech Stack**: NestJS (TypeScript) + ValidationPipe + Express CORS + File-Backed Data Persistence  
**Port**: `4000` (Base URL: `http://localhost:4000/api`)  

---

## REST API Endpoints

### 1. `POST /api/auth/guest`
Generates a Guest Educator session token.

### 2. `GET /api/tasks`
Fetches tasks list.
- **Query Params**:
  - `status`: `TODO` | `IN_PROGRESS` | `UNDER_REVIEW` | `COMPLETED`
  - `priority`: `LOW` | `MEDIUM` | `HIGH` | `URGENT`
  - `search`: Filter text across title, description, or category.

### 3. `POST /api/tasks`
Creates a new task. Validated via `CreateTaskDto`.

### 4. `PATCH /api/tasks/:id`
Updates task attributes (status, priority, title, description, assignee).

### 5. `DELETE /api/tasks/:id`
Removes a task record.

### 6. `GET /api/themes` & `POST /api/themes`
Gets or saves persistent user theme preference (`light`, `dark`, `emerald`, `purple`).

---

## Local Development Setup

```bash
# Install dependencies
npm install

# Run backend in development mode
npm run dev

# Run build
npm run build
```
