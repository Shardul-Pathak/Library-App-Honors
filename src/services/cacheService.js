import client from "../config/redis.js";

export async function getCache(key) {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key, value, ttl = 60) {
  await client.setEx(key, ttl, JSON.stringify(value));
}