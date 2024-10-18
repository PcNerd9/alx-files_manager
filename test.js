import redisClient from "./utils/redis.js";

console.log(redisClient.get("myKey"));