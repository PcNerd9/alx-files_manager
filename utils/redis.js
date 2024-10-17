import { createClient, TimeSeriesAggregationType } from "redis";


class RedisClient {
	constructor() {
		this.redisClient = createClient();
		this.redisClient.on("error", (error) => {
			console.log(error);
		})
		this.redisClient.connect();
	}

	isAlive() {
		if (this.redisClient.on("connect", () => {
			return true;
		})) {
			return true;
		} else {
			return false;
		};
	}

	async get(key) {
		let value = await this.redisClient.get(key);
		return value;
	}

	async set(key, value, expr) {
		await this.redisClient.setEx(key, expr, String(value));
	}

	async del(key) {
		await this.redisClient.del(key);
	}
}

const redisClient = new RedisClient();

export default redisClient;
