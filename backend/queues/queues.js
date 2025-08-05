import { Queue } from "bullmq";
import { createClient, RedisClientType } from "redis";

const connection = {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
}

export const redisCredentials =createClient({
    url: `redis://${connection.username}:${connection.password}@${connection.host}:${connection.port}`,
})

await redisCredentials.connect()

export const queue = new Queue('submission',{
    connection:redisCredentials,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:60000
        }
    }
})
