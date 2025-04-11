/*
  Warnings:

  - Added the required column `experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Doctor] ADD [experience] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Nurse] ADD [shift] NVARCHAR(1000) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
