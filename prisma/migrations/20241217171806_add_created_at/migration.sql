-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,
    "inventoryType" TEXT NOT NULL,
    CONSTRAINT "Inventory_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("id", "inventoryType", "ownerId") SELECT "id", "inventoryType", "ownerId" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "standardPrice" INTEGER NOT NULL,
    "rarity" INTEGER NOT NULL
);
INSERT INTO "new_Item" ("createdAt", "description", "id", "image", "name", "rarity", "standardPrice") SELECT "createdAt", "description", "id", "image", "name", "rarity", "standardPrice" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE TABLE "new_ItemInstance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "itemId" INTEGER NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "lotId" INTEGER,
    "offerId" INTEGER,
    CONSTRAINT "ItemInstance_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemInstance_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ItemInstance_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ItemInstance_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ItemInstance" ("createdAt", "id", "inventoryId", "itemId", "lotId", "offerId") SELECT "createdAt", "id", "inventoryId", "itemId", "lotId", "offerId" FROM "ItemInstance";
DROP TABLE "ItemInstance";
ALTER TABLE "new_ItemInstance" RENAME TO "ItemInstance";
CREATE TABLE "new_Lot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL,
    CONSTRAINT "Lot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lot" ("coins", "createdAt", "id", "userId") SELECT "coins", "createdAt", "id", "userId" FROM "Lot";
DROP TABLE "Lot";
ALTER TABLE "new_Lot" RENAME TO "Lot";
CREATE TABLE "new_Offer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "lotId" INTEGER NOT NULL,
    "coins" INTEGER NOT NULL,
    CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Offer_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("coins", "createdAt", "id", "lotId", "userId") SELECT "coins", "createdAt", "id", "lotId", "userId" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "externalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "bankedCoins" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("bankedCoins", "coins", "createdAt", "email", "externalId", "id", "name") SELECT "bankedCoins", "coins", "createdAt", "email", "externalId", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
