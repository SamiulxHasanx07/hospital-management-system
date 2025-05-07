/*
  Warnings:

  - A unique constraint covering the columns `[slotId]` on the table `DoctorSchedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slotId` to the `DoctorSchedule` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DoctorSchedule] ADD [slotId] INT NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[DoctorSchedule] ADD CONSTRAINT [DoctorSchedule_slotId_key] UNIQUE NONCLUSTERED ([slotId]);

-- AddForeignKey
ALTER TABLE [dbo].[DoctorSchedule] ADD CONSTRAINT [DoctorSchedule_slotId_fkey] FOREIGN KEY ([slotId]) REFERENCES [dbo].[DoctorScheduleSlot]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
