-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('PENDING', 'RUNNING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "BatchSchedule" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "status" "BatchStatus" NOT NULL DEFAULT 'PENDING',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "executedAt" TIMESTAMP(3),
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchSchedule_pkey" PRIMARY KEY ("id")
);
