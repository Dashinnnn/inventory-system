# **Part 2 — Organization / Workspace Module**

## **Overview**

The Organization module manages the **workspace lifecycle**.

After login, the system checks if the user has workspace access:

* If **yes** → Redirect to **Home/Dashboard** → proceed to modules (e.g., User Management)
* If **no** → User must choose:

  * Create a workspace
  * Join via invite
  * Search and request access

---

## **Flow Summary**

* Login Successful
* Check: **Has Workspace Access?**

  * **YES** → Redirect to Dashboard
  * **NO** → Choose:

    * Create Workspace
    * Join via Invite
    * Search & Request Access

---

## **File Structure**

```bash id="org1"
src/
├── models/
│   ├── Organization.ts
│   └── Membership.ts
├── middlewares/
│   └── workspace.middleware.ts
└── modules/
    └── organizationModules/
        ├── organization.repository.ts
        ├── organization.service.ts
        ├── organization.controller.ts
        ├── organization.validators.ts
        └── organization.routes.ts
```

---

## **Register in `index.ts`**

```ts id="org2"
import organizationRoutes from "./modules/organizationModules/organization.routes.js";

app.use("/api/organizations", organizationRoutes);
```

---

## **API Endpoints**

### **GET `/api/organizations/my`**

Checks if the logged-in user has active workspace memberships.
Called immediately after login.

**Response — has access:**

```json id="org3"
{
  "status": "success",
  "hasAccess": true,
  "workspaces": [
    {
      "membershipId": "...",
      "role": "Admin",
      "organization": {
        "name": "My Company"
      }
    }
  ]
}
```

**Response — no access:**

```json id="org4"
{
  "status": "success",
  "hasAccess": false,
  "workspaces": []
}
```

---

### **POST `/api/organizations`**

Create a new workspace.

* The creator automatically becomes:

  * **Admin**
  * With **active membership**

**Request body:**

```json id="org5"
{
  "name": "My Company",
  "timezone": "Asia/Manila",
  "currency": "PHP",
  "country": "Philippines",
  "business_type": "Retail"
}
```

---

### **GET `/api/organizations/search?name=xxx`**

Search for existing workspaces by name.

* Returns **public information only**

**Example:**

```
GET /api/organizations/search?name=My Company
```

---

### **POST `/api/organizations/:id/request-access`**

Request to join a workspace.

* No request body needed

* Uses `req.user.id` from JWT

* Creates a membership with:

  * `status: "pending"`

* Admin will review via **access requests endpoint**

---

### **GET `/api/organizations/:id/access-requests`**

View all pending access requests for a workspace.

* **Admin only**

---

### **PUT `/api/organizations/:id/access-requests/:requestId`**

Approve or deny a pending access request.

* **Admin only**

**Request body:**

```json id="org6"
{ "status": "active" }   // approve
```

```json id="org7"
{ "status": "denied" }   // deny
```

---

### **POST `/api/organizations/:id/join`**

Join a workspace using an invite token.

* Token is sent via email by Admin

**Request body:**

```json id="org8"
{
  "invite_token": "abc123..."
}
```

---

## **Permission Matrix (Readable Form)**

### Admin

* Full access to all endpoints
* Can approve/deny access requests

### Manager

* Can:

  * GET `/my`
  * POST `/`
  * GET `/search`
  * POST `/:id/request-access`
  * POST `/:id/join`
* Cannot:

  * View access requests
  * Approve/deny requests

### Staff

* Same permissions as Manager:

  * Can join, create, search, and request access
* Cannot:

  * Manage access requests

---