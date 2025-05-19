import { Router } from "express";

// /api/v1/auth
const authRouter = Router();

authRouter.post("/sign-up", (req, res) => res.send({ title: "Sign up" }));

authRouter.post("/sign-in", (req, res) => res.send({ title: "Sign in" }));

authRouter.post("/sign-out", (req, res) => res.send({ title: "Sign out" }));

export default authRouter;
