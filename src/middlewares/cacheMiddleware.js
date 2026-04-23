import client from "../config/redis.js";

export async function cache(req, res, next) {
  const key = req.originalUrl;

  const cached = await client.get(key);
  if (cached) return res.json(JSON.parse(cached));

  const original = res.json.bind(res);

  res.json = (data) => {
    client.setEx(key, 60, JSON.stringify(data));
    return original(data);
  };

  next();
}