-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "preferredBreedId" INTEGER,
    "preferredAgeRange" TEXT,
    "hasOtherPets" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "User_preferredBreedId_fkey" FOREIGN KEY ("preferredBreedId") REFERENCES "Breed" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AdoptionApplication" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "puppyId" INTEGER NOT NULL,
    "applicationDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "AdoptionApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdoptionApplication_puppyId_fkey" FOREIGN KEY ("puppyId") REFERENCES "Puppy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
