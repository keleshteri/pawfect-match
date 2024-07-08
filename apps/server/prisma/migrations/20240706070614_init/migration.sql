-- CreateTable
CREATE TABLE "Breed" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Puppy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "isVaccinated" BOOLEAN NOT NULL,
    "isNeutered" BOOLEAN NOT NULL,
    "size" TEXT NOT NULL,
    "breedId" INTEGER,
    "photoUrl" TEXT NOT NULL,
    CONSTRAINT "Puppy_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PuppyTrait" (
    "puppyId" INTEGER NOT NULL,
    "traitId" INTEGER NOT NULL,

    PRIMARY KEY ("puppyId", "traitId"),
    CONSTRAINT "PuppyTrait_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PuppyTrait_traitId_fkey" FOREIGN KEY ("traitId") REFERENCES "Trait" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trait_description_key" ON "Trait"("description");
