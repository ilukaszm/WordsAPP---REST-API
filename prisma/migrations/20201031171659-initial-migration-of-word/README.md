# Migration `20201031171659-initial-migration-of-word`

This migration has been generated by lukasz.michalak at 10/31/2020, 6:16:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201031171659-initial-migration-of-word
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Word {
+  id Int @id @default(autoincrement())
+  word String
+  translation String
+}
```

