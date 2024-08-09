-- Migration number: 0000 	 2024-08-09T01:35:26.110Z
-- Crear tabla de formularios
CREATE TABLE forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
);

-- Crear tabla de disponibilidad
CREATE TABLE availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form_id INTEGER NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    day_of_week INTEGER NOT NULL, -- 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    start_time DATE NOT NULL,
    end_time DATE NOT NULL,
    email TEXT NOT NULL,
    FOREIGN KEY (form_id) REFERENCES forms(id)
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_availability_form_id ON availability(form_id);
CREATE INDEX idx_availability_day_of_week ON availability(day_of_week);
CREATE INDEX idx_availability_email ON availability(email);
