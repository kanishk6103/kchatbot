/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `chatId` on the `singleMessage` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Chat";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_singleMessage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sentBy" TEXT NOT NULL,
    "feeback" BOOLEAN,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_singleMessage" ("content", "createdAt", "feeback", "id", "sentBy") SELECT "content", "createdAt", "feeback", "id", "sentBy" FROM "singleMessage";
DROP TABLE "singleMessage";
ALTER TABLE "new_singleMessage" RENAME TO "singleMessage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
