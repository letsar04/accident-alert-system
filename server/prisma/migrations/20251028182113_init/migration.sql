-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "gps_lat" DOUBLE PRECISION NOT NULL,
    "gps_long" DOUBLE PRECISION NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
