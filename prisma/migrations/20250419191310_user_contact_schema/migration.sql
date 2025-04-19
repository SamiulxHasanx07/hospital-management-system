BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Contact] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] INT NOT NULL,
    [phone] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [house] NVARCHAR(1000),
    [village] NVARCHAR(1000),
    [postOffice] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [division] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    CONSTRAINT [Contact_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Contact_userId_key] UNIQUE NONCLUSTERED ([userId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
