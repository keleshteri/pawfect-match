/*
  Warnings:

  - You are about to drop the column `isNeutered` on the `Puppy` table. All the data in the column will be lost.
  - You are about to drop the column `isVaccinated` on the `Puppy` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Puppy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "breedId" INTEGER,
    "photoUrl" TEXT NOT NULL,
    CONSTRAINT "Puppy_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Puppy" ("age", "breedId", "gender", "id", "name", "photoUrl", "size") SELECT "age", "breedId", "gender", "id", "name", "photoUrl", "size" FROM "Puppy";
DROP TABLE "Puppy";
ALTER TABLE "new_Puppy" RENAME TO "Puppy";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
