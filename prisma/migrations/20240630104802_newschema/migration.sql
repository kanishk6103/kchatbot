/*
  Warnings:

  - You are about to drop the column `feeback` on the `singleMessage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_singleMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentBy" TEXT NOT NULL,
    "feedback" BOOLEAN,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_singleMessage" ("content", "createdAt", "id", "sentBy") SELECT "content", "createdAt", "id", "sentBy" FROM "singleMessage";
DROP TABLE "singleMessage";
ALTER TABLE "new_singleMessage" RENAME TO "singleMessage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
