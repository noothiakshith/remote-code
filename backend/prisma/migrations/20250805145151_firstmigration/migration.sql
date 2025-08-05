-- CreateEnum
CREATE TYPE "public"."SubmissionStatus" AS ENUM ('Queued', 'Successful', 'Error');

-- CreateTable
CREATE TABLE "public"."Language" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "compileCommand" TEXT NOT NULL DEFAULT '',
    "executionCommand" TEXT NOT NULL DEFAULT '',
    "testCommand" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Submission" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "source_code" TEXT NOT NULL,
    "mainFuncName" TEXT NOT NULL DEFAULT 'main',
    "stdin" TEXT[] DEFAULT ARRAY['']::TEXT[],
    "stdout" TEXT NOT NULL DEFAULT '',
    "language_id" INTEGER NOT NULL,
    "executionContainerId" TEXT NOT NULL DEFAULT '',
    "status" "public"."SubmissionStatus" NOT NULL DEFAULT 'Queued',
    "testCasesPassed" TEXT[],
    "runtime" DOUBLE PRECISION,
    "memoryUsage" DOUBLE PRECISION,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Submission" ADD CONSTRAINT "Submission_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
