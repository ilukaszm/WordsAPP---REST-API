# Migration `20201105172928-added-new-model---user`

This migration has been generated by Łukasz Michalak at 11/5/2020, 6:29:28 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "avatarURL" TEXT NOT NULL,
    "gameSound" BOOLEAN NOT NULL,
    "gamePoints" INTEGER NOT NULL,
    "numberOfLevels" INTEGER NOT NULL
)

CREATE UNIQUE INDEX "User.email_unique" ON "User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201031171659-initial-migration-of-word..20201105172928-added-new-model---user
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
@@ -13,5 +13,14 @@
 model Word {
   id Int @id @default(autoincrement())
   word String
   translation String
+}
+
+model User {
+  id Int @id @default(autoincrement())
+  email String @unique
+  avatarURL String
+  gameSound Boolean
+  gamePoints Int
+  numberOfLevels Int
 }
```


