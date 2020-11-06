# Migration `20201105173653-update-user-model--password--google-id--facebook-id`

This migration has been generated by Łukasz Michalak at 11/5/2020, 6:36:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "password" TEXT,
    "email" TEXT NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "gameSound" BOOLEAN NOT NULL,
    "gamePoints" INTEGER NOT NULL,
    "numberOfLevels" INTEGER NOT NULL,
    "googleID" TEXT NOT NULL,
    "facebookID" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "email", "avatarURL", "gameSound", "gamePoints", "numberOfLevels") SELECT "id", "email", "avatarURL", "gameSound", "gamePoints", "numberOfLevels" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105172928-added-new-model---user..20201105173653-update-user-model--password--google-id--facebook-id
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -17,10 +17,13 @@
 }
 model User {
   id Int @id @default(autoincrement())
+  password String?
   email String @unique
   avatarURL String
   gameSound Boolean
   gamePoints Int
   numberOfLevels Int
+  googleID String
+  facebookID String
 }
```

