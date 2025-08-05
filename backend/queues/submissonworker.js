import { Queue, Worker, Job } from "bullmq";
import { redisCredentials } from "./queues.js";

const worker = new Worker(
  "submission",
  async (job) => {
    console.log("\n================= 🛠️ New Job Received =================");
    console.log(`🆔 Job ID        : ${job.id}`);
    console.log(`📦 Queue Name   : ${job.queueName}`);
    console.log("📄 Job Data     :");
    console.log(JSON.stringify(job.data, null, 2));
    console.log("========================================================\n");
  },
  {
    connection: redisCredentials,
  }
);
