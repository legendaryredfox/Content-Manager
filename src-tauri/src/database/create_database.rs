use dirs;
use rusqlite::{Connection, Result};
use std::fs;
use std::path::PathBuf;

pub fn get_database_path() -> Result<PathBuf, String> {
    let home_dir = dirs::home_dir().ok_or("Não foi possível obter o diretório HOME")?;
    let db_dir = home_dir.join(".content_manager");

    if !db_dir.exists() {
        fs::create_dir_all(&db_dir).map_err(|e| format!("Erro ao criar diretório: {}", e))?;
    }

    Ok(db_dir.join("links.db"))
}

pub fn setup_database() -> Result<PathBuf, String> {
    let db_path = get_database_path()?;
    let conn =
        Connection::open(&db_path).map_err(|e| format!("Erro ao abrir banco de dados: {}", e))?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS creators (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            url TEXT NOT NULL UNIQUE
        )",
        [],
    )
    .map_err(|e| format!("Erro ao criar tabela creators: {}", e))?;

    conn.execute(
        " CREATE TABLE IF NOT EXISTS price_history (
                    id INTEGER PRIMARY KEY,
                    date TIMESTAMP NOT NULL DEFAULT (datetime('now', 'localtime')),
                    price REAL NOT NULL,
                    creator_id INTEGER NOT NULL,
                    notes TEXT,
                    FOREIGN KEY (creator_id) REFERENCES creators(id) ON DELETE CASCADE
                )",
        [],
    )
    .map_err(|e| format!("Erro ao criar tabela prices: {}", e))?;

    Ok(db_path)
}
