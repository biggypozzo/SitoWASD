import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const requestedPort = Number(process.env.PORT) || 3000;
  const maxAttempts = 20;

  const listen = (port: number, attempt = 0) => {
    const handleError = (error: NodeJS.ErrnoException) => {
      server.removeListener("error", handleError);
      if (error.code === "EADDRINUSE" && attempt < maxAttempts) {
        listen(port + 1, attempt + 1);
        return;
      }
      throw error;
    };

    server.once("error", handleError);
    server.listen(port, () => {
      server.removeListener("error", handleError);
      console.log(`Server running on http://localhost:${port}/`);
      if (port !== requestedPort) {
        console.log(`Port ${requestedPort} was already in use; using ${port} instead.`);
      }
    });
  };

  listen(requestedPort);
}

startServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
