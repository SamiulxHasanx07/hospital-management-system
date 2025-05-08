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


--display tables
SELECT * FROM [User];
SELECT * FROM Doctor;
SELECT * FROM Patient;
SELECT * FROM Nurse;
SELECT * FROM Contact;
SELECT * FROM Bed;
SELECT * FROM EmergencyAdmission;
SELECT * FROM Appointment;
SELECT * FROM DoctorScheduleSlot;
SELECT * FROM DoctorSchedule;

--Appoinments with doctor and patients with name, date, status
SELECT 
    a.id AS AppointmentID,
    a.date,
    a.disease,
    a.status,
    d.specialty AS DoctorSpecialty,
    u1.name AS DoctorName,
    u2.name AS PatientName
FROM Appointment a
JOIN Doctor d ON a.doctorId = d.id
JOIN Patient p ON a.patientId = p.id
JOIN [User] u1 ON d.userId = u1.id
JOIN [User] u2 ON p.userId = u2.id;

--count number of appointment per doctor
SELECT 
    u.name AS DoctorName,
    COUNT(a.id) AS AppointmentCount
FROM Doctor d
JOIN [User] u ON d.userId = u.id
LEFT JOIN Appointment a ON a.doctorId = d.id
GROUP BY u.name;


--get available beds
SELECT 
    department,
    COUNT(*) AS AvailableBeds
FROM Bed
WHERE available = 1
GROUP BY department;

--doctor without appointment
SELECT 
    u.name AS DoctorName,
    d.specialty
FROM Doctor d
JOIN [User] u ON d.userId = u.id
LEFT JOIN Appointment a ON a.doctorId = d.id
WHERE a.id IS NULL;


SELECT name, specialty FROM Doctor
JOIN [User] ON Doctor.userId = [User].id
WHERE specialty = 'Cardiology';