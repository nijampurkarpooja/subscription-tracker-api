import { Router } from "express";

// /api/v1/users
const useRouter = Router();

useRouter.get("/", (req, res) => res.send({ title: "GET all users" }));

useRouter.get("/:id", (req, res) => res.send({ title: "GET user details" }));

useRouter.post("/", (req, res) => res.send({ title: "CREATE new user" }));

useRouter.put("/:id", (req, res) => res.send({ title: "UPDATE user" }));

useRouter.delete("/:id", (req, res) => res.send({ title: "DELETE user" }));

export default useRouter;
