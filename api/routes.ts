import { Express } from "express";
import userRoutes from "./routers/userRoutes";

function setup(app: Express): void {
  app.use("/api/users", userRoutes);
}

export default setup;
