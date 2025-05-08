use [hospital-management-system];

-- User Table
CREATE TABLE [User] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    role NVARCHAR(50) NOT NULL
);

-- Doctor Table
CREATE TABLE Doctor (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    specialty NVARCHAR(255) NOT NULL,
    experience INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- Patient Table
CREATE TABLE Patient (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    age INT NOT NULL,
    gender NVARCHAR(10) NOT NULL,
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- Nurse Table
CREATE TABLE Nurse (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    department NVARCHAR(100) NOT NULL,
    shift NVARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- Contact Table
CREATE TABLE Contact (
    id INT IDENTITY(1,1) PRIMARY KEY,
    userId INT UNIQUE NOT NULL,
    phone NVARCHAR(50) NOT NULL,
    email NVARCHAR(255),
    house NVARCHAR(255),
    village NVARCHAR(255),
    postOffice NVARCHAR(255),
    city NVARCHAR(255),
    division NVARCHAR(255),
    country NVARCHAR(255),
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- Bed Table
CREATE TABLE Bed (
    id INT IDENTITY(1,1) PRIMARY KEY,
    department NVARCHAR(100) NOT NULL,
    roomNumber NVARCHAR(50) NOT NULL,
    bedNumber NVARCHAR(50) NOT NULL,
    available BIT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- DoctorScheduleSlot Table
CREATE TABLE DoctorScheduleSlot (
    id INT IDENTITY(1,1) PRIMARY KEY,
    startTime NVARCHAR(20) NOT NULL,
    endTime NVARCHAR(20) NOT NULL,
    maxPatients INT NOT NULL DEFAULT 25,
    available BIT NOT NULL DEFAULT 1,
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);

-- DoctorSchedule Table
CREATE TABLE DoctorSchedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    doctorId INT NOT NULL,
    date DATETIME NOT NULL,
    visitFee INT NOT NULL,
    branch NVARCHAR(255),
    floorNumber NVARCHAR(50) NOT NULL,
    roomNumber NVARCHAR(50) NOT NULL,
    location NVARCHAR(255) NOT NULL,
    remarks NVARCHAR(MAX),
    status NVARCHAR(50) NOT NULL DEFAULT 'active',
    slotId INT UNIQUE NOT NULL,
    FOREIGN KEY (doctorId) REFERENCES Doctor(id),
    FOREIGN KEY (slotId) REFERENCES DoctorScheduleSlot(id)
);

-- Appointment Table
CREATE TABLE Appointment (
    id INT IDENTITY(1,1) PRIMARY KEY,
    date DATETIME NOT NULL,
    doctorId INT NOT NULL,
    patientId INT NOT NULL,
    scheduleId INT NOT NULL,
    slotId INT NOT NULL,
    disease NVARCHAR(255) NOT NULL,
    status NVARCHAR(50) NOT NULL DEFAULT 'booked',
    remarks NVARCHAR(MAX),
    FOREIGN KEY (doctorId) REFERENCES Doctor(id),
    FOREIGN KEY (patientId) REFERENCES Patient(id)
);

-- EmergencyAdmission Table
CREATE TABLE EmergencyAdmission (
    id INT IDENTITY(1,1) PRIMARY KEY,
    patientId INT,
    name NVARCHAR(255) NOT NULL,
    age INT,
    gender NVARCHAR(10),
    admittedById INT,
    condition NVARCHAR(255) NOT NULL,
    department NVARCHAR(100) NOT NULL,
    bedId INT,
    admissionTime DATETIME NOT NULL DEFAULT GETDATE(),
    status NVARCHAR(50) NOT NULL DEFAULT 'admitted',
    remarks NVARCHAR(MAX),
    FOREIGN KEY (patientId) REFERENCES Patient(id),
    FOREIGN KEY (admittedById) REFERENCES [User](id),
    FOREIGN KEY (bedId) REFERENCES Bed(id)
);
