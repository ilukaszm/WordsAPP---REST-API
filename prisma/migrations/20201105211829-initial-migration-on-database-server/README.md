# Migration `20201105211829-initial-migration-on-database-server`

This migration has been generated by Łukasz Michalak at 11/5/2020, 10:18:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Word" (
"id" SERIAL,
"word" text   NOT NULL ,
"translation" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"password" text   ,
"email" text   NOT NULL ,
"avatarURL" text   DEFAULT E'',
"gameSound" boolean   DEFAULT false,
"gamePoints" integer   DEFAULT 0,
"numberOfLevels" integer   DEFAULT 5,
"googleID" text   DEFAULT E'',
"facebookID" text   DEFAULT E'',
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201105195458-update-default-vaules-in-user-model..20201105211829-initial-migration-on-database-server
--- datamodel.dml
+++ datamodel.dml
@@ -1,10 +1,10 @@
 // This is your Prisma schema file,
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgres"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
```


