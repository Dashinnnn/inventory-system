# **Part 1 — User Management Module**

## **Overview**

The User Management module handles listing, viewing, editing, inviting, and removing users within the IMS platform.

* **Admin**: Full control
* **Manager**: Read-only access for operations

---

## **File Structure**

```bash
src/modules/userManagement/
  ├── role.middleware.ts
  ├── userManagement.validators.ts
  ├── userManagement.repository.ts
  ├── userManagement.service.ts
  ├── userManagement.controller.ts
  └── userManagement.routes.ts
```

---

## **Register in `index.ts`**

```ts
import userRoutes from "./modules/userManagement/userManagement.routes.js";

app.use("/api/users", userRoutes);
```

---

## **Role Middleware**

### `requireRole("Admin")`

* Exact match
* Only **Admin** passes
* **Manager** and **Staff** are blocked

### `requireMinRole("Manager")`

* Minimum level access
* **Manager** and **Admin** pass
* **Staff** is blocked

---

## **API Endpoints**

### **GET `/api/users/overview`**

Returns user counts grouped by role for the dashboard.

* **Method**: GET
* **Access**: Admin, Manager
* **Auth**: Bearer Token required

**Response example:**

```json
{
  "status": "success",
  "overview": {
    "Admin":   { "count": 1,  "activeNow": 1 },
    "Manager": { "count": 10, "activeNow": 10 },
    "Staff":   { "count": 20, "activeNow": 20 }
  }
}
```

---

### **GET `/api/users`**

List all users with optional filtering and pagination.

**Query Parameters:**

* `role` → `Staff | Manager | Admin` (filter by role)
* `status` → `active | inactive` (filter by account status)
* `search` → string (search by name or email)
* `page` → number (default: 1)
* `limit` → number (default: 10, max: 100)

---

### **POST `/api/users/invite`**

Invite a new user (**Admin only**).
Creates account with a temporary password.

**Request body:**

```json
{
  "name": "LeBron James",
  "email": "lbj23@gmail.com",
  "role": "Staff",
  "temporaryPassword": "Temp@1234"
}
```

**Password Rules:**

* Must include:

  * Uppercase
  * Lowercase
  * Number
  * Special character

---

### **GET `/api/users/:id`**

Get a specific user's profile.

* **Admin / Manager** → Can view any user
* **Staff** → Can only view their own profile

---

### **PUT `/api/users/:id`**

Edit user details (**Admin only**).

* At least one field is required
* Admin **cannot change their own role**
* Email must be **unique across the system**

---

### **DELETE `/api/users/:id`**

Soft-delete a user (**Admin only**).

* Uses `deleted_at`
* Admin **cannot delete their own account**

---

## **Permission Matrix**

### Admin

* Can access all endpoints

### Manager

* Can:

  * GET `/overview`
  * GET `/`
  * GET `/:id`
* Cannot:

  * Invite users
  * Edit users
  * Delete users

### Staff

* Can:

  * GET `/:id` (own profile only)
* Cannot:

  * Access overview
  * List users
  * Invite, edit, or delete users

---

## **Figma Ellipsis Menu → Endpoint Mapping**

* **See Profile** → `GET /api/users/:id`
* **Edit Details** → `PUT /api/users/:id`
* **View Logs** → `GET /api/audit-logs?actorId=:id` *(future)*
* **Remove User** → `DELETE /api/users/:id`
