BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Doctor] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [specialty] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Doctor_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Doctor_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Patient] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [age] INT NOT NULL,
    [gender] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Patient_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Patient_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Nurse] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [department] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Nurse_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Nurse_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- CreateTable
CREATE TABLE [dbo].[Appointment] (
    [id] INT NOT NULL IDENTITY(1,1),
    [date] DATETIME2 NOT NULL,
    [doctorId] INT NOT NULL,
    [patientId] INT NOT NULL,
    [nurseId] INT,
    CONSTRAINT [Appointment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Doctor] ADD CONSTRAINT [Doctor_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Nurse] ADD CONSTRAINT [Nurse_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_doctorId_fkey] FOREIGN KEY ([doctorId]) REFERENCES [dbo].[Doctor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_nurseId_fkey] FOREIGN KEY ([nurseId]) REFERENCES [dbo].[Nurse]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
