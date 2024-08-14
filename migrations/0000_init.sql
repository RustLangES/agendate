-- Migration number: 0000 	 2024-08-09T01:35:26.110Z
-- Crear tabla de formularios
CREATE TABLE forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT,
    description TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 45
);

-- Crear tabla de disponibilidad
CREATE TABLE availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL, -- 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    start_time TEXT NOT NULL, -- Formato HH:MM:SS
    end_time TEXT NOT NULL, -- Formato HH:MM:SS
    email TEXT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id)
);

-- Crear tabla de citas programadas
CREATE TABLE appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id INTEGER NOT NULL,
    availability_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    time TEXT NOT NULL, -- Formato HH:MM:SS
    -- status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled'
    FOREIGN KEY (form_id) REFERENCES forms(id),
    FOREIGN KEY (availability_id) REFERENCES availability(id)
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_availability_form_id ON availability(form_id);
CREATE INDEX idx_availability_day_of_week ON availability(day_of_week);
CREATE INDEX idx_availability_email ON availability(email);
CREATE INDEX idx_appointments_form_id ON appointments(form_id);
CREATE INDEX idx_appointments_availability_id ON appointments(availability_id);
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
-- CREATE INDEX idx_appointments_status ON appointments(status);
