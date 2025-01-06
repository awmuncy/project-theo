-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShopItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "shopId" INTEGER NOT NULL,
    "shopSize" INTEGER NOT NULL DEFAULT 10,
    CONSTRAINT "ShopItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ShopItem_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "Shop" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ShopItem" ("createdAt", "id", "itemId", "price", "shopId", "updatedAt") SELECT "createdAt", "id", "itemId", "price", "shopId", "updatedAt" FROM "ShopItem";
DROP TABLE "ShopItem";
ALTER TABLE "new_ShopItem" RENAME TO "ShopItem";
CREATE UNIQUE INDEX "ShopItem_itemId_key" ON "ShopItem"("itemId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
