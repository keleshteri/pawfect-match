-- CreateTable
CREATE TABLE "Vaccine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "HealthRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "puppyId" INTEGER NOT NULL,
    "neuteredStatus" BOOLEAN NOT NULL,
    "medicalNotes" TEXT,
    CONSTRAINT "HealthRecord_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vaccination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "healthRecordId" INTEGER NOT NULL,
    "vaccineId" INTEGER NOT NULL,
    "vaccinatedOn" DATETIME NOT NULL,
    "nextDueDate" DATETIME,
    CONSTRAINT "Vaccination_healthRecordId_fkey" FOREIGN KEY ("healthRecordId") REFERENCES "HealthRecord" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vaccination_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vaccine_name_key" ON "Vaccine"("name");
