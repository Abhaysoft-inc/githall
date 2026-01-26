import { Queue } from "bullmq";
import { redis } from "../core/config/redis";

export const emailQueue = new Queue("email-queue", {
    connection: redis
});
