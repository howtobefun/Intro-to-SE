import userController from "../controllers/userController.js";

export default async function handler(req, res) {
  if (req.originalUrl.startsWith("/api/user")) {
    switch (req.method) {
      case "GET":
        return userController.getUser(req, res);
      case "POST":
        return userController.createUser(req, res);
      case "PUT":
        return userController.updateUser(req, res);
      case "DELETE":
        return userController.deleteUser(req, res);
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}

