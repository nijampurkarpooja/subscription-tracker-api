import { Router } from "express";

import {
  cancelSubscription,
  createSubscription,
  deleteSubscription,
  getSubscription,
  getUserSubscriptions,
  reactivateSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

// /api/v1/subscriptions
const subscriptionRouter = Router();

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put(":id/cancel", authorize, cancelSubscription);

subscriptionRouter.put(":id/reactivate", authorize, reactivateSubscription);

export default subscriptionRouter;
