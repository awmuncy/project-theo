/*
  Warnings:

  - You are about to drop the column `name` on the `ItemInstance` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `ItemInstance` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `ItemInstance` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ItemInstance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "itemId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    CONSTRAINT "ItemInstance_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemInstance_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ItemInstance" ("id", "inventoryId") SELECT "id", "inventoryId" FROM "ItemInstance";
DROP TABLE "ItemInstance";
ALTER TABLE "new_ItemInstance" RENAME TO "ItemInstance";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
