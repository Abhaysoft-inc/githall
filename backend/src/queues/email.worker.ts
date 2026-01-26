import { Worker } from "bullmq";
import { redis } from "../core/config/redis";
// import { sendVerificationEmail } from "../utils/mailer";

new Worker(
    "email-queue",
    async (job) => {
        const { email, token } = job.data;
        await console.log(email, token);
    },
    {
        connection: redis,
        concurrency: 5,
    }
);
