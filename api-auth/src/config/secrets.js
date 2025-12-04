import dotenv from "dotenv";
dotenv.config();

export const SEGREDO_JWT = process.env.JWT_SECRET || "senha-padrao";
