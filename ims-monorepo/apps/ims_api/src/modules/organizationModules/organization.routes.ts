import { Router } from "express";
import {
  createOrg,
  getMyWorkspaces,
  searchOrgs,
  requestAccess,
  getAccessRequests,
  resolveRequest,
  joinWithToken,
} from "./organization.controller";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { apiLimiter } from "../../middlewares/rateLimiter.middleware.js";
import { requireRole } from "../userManagement/role.middleware.js";
import {
  createWorkspaceSchema,
  searchWorkspaceSchema,
  orgIdParamSchema,
  resolveRequestSchema,
  joinWithTokenSchema,
} from "./organization.validators";

const router = Router();

router.use(authenticate);
router.use(apiLimiter);

router.get("/my", getMyWorkspaces);
router.get("/search", validate(searchWorkspaceSchema), searchOrgs);
router.post("/", validate(createWorkspaceSchema), createOrg);
router.post(
  "/:id/request-access",
  validate(orgIdParamSchema),
  requestAccess
);

router.get(
  "/:id/access-requests",
  requireRole("Admin"),
  validate(orgIdParamSchema),
  getAccessRequests
);
router.put(
  "/:id/access-requests/:requestId",
  requireRole("Admin"),
  validate(resolveRequestSchema),
  resolveRequest
);
router.post(
  "/:id/join",
  validate(joinWithTokenSchema),
  joinWithToken
);

export default router;
