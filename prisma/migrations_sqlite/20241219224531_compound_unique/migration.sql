/*
  Warnings:

  - You are about to drop the column `shopSize` on the `ShopItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "till" INTEGER NOT NULL DEFAULT 0,
    "shopSize" INTEGER NOT NULL DEFAULT 10,
    CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shop" ("createdAt", "id", "till", "updatedAt", "userId") SELECT "createdAt", "id", "till", "updatedAt", "userId" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
CREATE TABLE "new_ShopItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    CONSTRAINT "ShopItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShopItem" ("createdAt", "id", "itemId", "price", "shopId", "updatedAt") SELECT "createdAt", "id", "itemId", "price", "shopId", "updatedAt" FROM "ShopItem";
DROP TABLE "ShopItem";
ALTER TABLE "new_ShopItem" RENAME TO "ShopItem";
CREATE UNIQUE INDEX "ShopItem_itemId_shopId_key" ON "ShopItem"("itemId", "shopId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
