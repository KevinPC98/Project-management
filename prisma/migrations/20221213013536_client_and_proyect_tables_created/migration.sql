-- CreateTable
CREATE TABLE "projects" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "techs" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tech_in_projects" (
    "uuid" UUID NOT NULL,
    "project_uuid" TEXT NOT NULL,
    "tech_uuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_uuid_key" ON "projects"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "techs_uuid_key" ON "techs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_in_projects_uuid_key" ON "tech_in_projects"("uuid");

-- AddForeignKey
ALTER TABLE "tech_in_projects" ADD CONSTRAINT "tech_in_projects_project_uuid_fkey" FOREIGN KEY ("project_uuid") REFERENCES "projects"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_in_projects" ADD CONSTRAINT "tech_in_projects_tech_uuid_fkey" FOREIGN KEY ("tech_uuid") REFERENCES "techs"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
