BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Bed] (
    [id] INT NOT NULL IDENTITY(1,1),
    [department] NVARCHAR(1000) NOT NULL,
    [roomNumber] NVARCHAR(1000) NOT NULL,
    [bedNumber] NVARCHAR(1000) NOT NULL,
    [available] BIT NOT NULL CONSTRAINT [Bed_available_df] DEFAULT 1,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Bed_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Bed_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[EmergencyAdmission] (
    [id] INT NOT NULL IDENTITY(1,1),
    [patientId] INT,
    [name] NVARCHAR(1000) NOT NULL,
    [age] INT,
    [gender] NVARCHAR(1000),
    [admittedById] INT,
    [condition] NVARCHAR(1000) NOT NULL,
    [department] NVARCHAR(1000) NOT NULL,
    [bedId] INT,
    [admissionTime] DATETIME2 NOT NULL CONSTRAINT [EmergencyAdmission_admissionTime_df] DEFAULT CURRENT_TIMESTAMP,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [EmergencyAdmission_status_df] DEFAULT 'admitted',
    [remarks] NVARCHAR(1000),
    CONSTRAINT [EmergencyAdmission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[EmergencyAdmission] ADD CONSTRAINT [EmergencyAdmission_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EmergencyAdmission] ADD CONSTRAINT [EmergencyAdmission_admittedById_fkey] FOREIGN KEY ([admittedById]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EmergencyAdmission] ADD CONSTRAINT [EmergencyAdmission_bedId_fkey] FOREIGN KEY ([bedId]) REFERENCES [dbo].[Bed]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
