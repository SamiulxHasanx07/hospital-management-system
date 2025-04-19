BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[DoctorSchedule] (
    [id] INT NOT NULL IDENTITY(1,1),
    [doctorId] INT NOT NULL,
    [date] DATETIME2 NOT NULL,
    [visitFee] INT NOT NULL,
    [branch] NVARCHAR(1000),
    [floorNumber] NVARCHAR(1000) NOT NULL,
    [roomNumber] NVARCHAR(1000) NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [remarks] NVARCHAR(1000),
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [DoctorSchedule_status_df] DEFAULT 'active',
    CONSTRAINT [DoctorSchedule_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [DoctorSchedule_doctorId_date_key] UNIQUE NONCLUSTERED ([doctorId],[date])
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
