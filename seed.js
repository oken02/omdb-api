const db = require("./config/db");

try {
  async () => {
    await db.sync({ force: true });
  };
} catch {}
