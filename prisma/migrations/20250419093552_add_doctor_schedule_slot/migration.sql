BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DoctorScheduleSlot] (
    [id] INT NOT NULL IDENTITY(1,1),
    [startTime] NVARCHAR(1000) NOT NULL,
    [endTime] NVARCHAR(1000) NOT NULL,
    [maxPatients] INT NOT NULL CONSTRAINT [DoctorScheduleSlot_maxPatients_df] DEFAULT 25,
    [available] BIT NOT NULL CONSTRAINT [DoctorScheduleSlot_available_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [DoctorScheduleSlot_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [DoctorScheduleSlot_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
