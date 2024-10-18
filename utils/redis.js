import { createClient, TimeSeriesAggregationType } from "redis";
import { promisify } from "util";


class RedisClient {
	constructor() {
		this.redisClient = createClient();
		this.redisClient.on("error", (error) => {
			console.log(error);
		})
		this.connected = false;
		this.redisClient.on("connect", () => {
			this.connected = true;
		});
	}

	isAlive() {
		return this.connected;
	}

	async get(key) {
		let promise_get = promisify(this.redisClient.get).bind(this.redisClient);
		return await promise_get(key);
	}

	async set(key, value, expr) {
		let promise_set = promisify(this.redisClient.setEx).bind(this.redisClient);
		await promise_set(key, expr, String(value));
	}

	async del(key) {
		let promise_del = promisify(this.redisClient.del).bind(this.redisClient);
		await promise_del(key);
	}
}

const redisClient = new RedisClient();

export default redisClient;
