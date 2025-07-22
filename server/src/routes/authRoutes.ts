import express, { Router} from "express";
import { loginUserController } from "../controllers/authController";

const router = Router();


router.post('/login', loginUserController);


export default router;