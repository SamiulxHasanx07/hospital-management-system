/*
  Warnings:

  - You are about to drop the column `nurseId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `disease` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduleId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Appointment] DROP CONSTRAINT [Appointment_nurseId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Appointment] DROP COLUMN [nurseId];
ALTER TABLE [dbo].[Appointment] ADD [disease] NVARCHAR(1000) NOT NULL,
[remarks] NVARCHAR(1000),
[scheduleId] INT NOT NULL,
[slotId] INT NOT NULL,
[status] NVARCHAR(1000) NOT NULL CONSTRAINT [Appointment_status_df] DEFAULT 'booked';

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
