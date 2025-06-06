use rusqlite::{params, Connection, Result};
use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct Link {
    pub id: i64,
    pub url: String,
    pub observacoes: Option<String>,
    pub visitado: bool,
}

pub fn link_query(conn: &Connection, url: &str) -> Result<Option<Link>> {
    let mut stmt =
        conn.prepare("SELECT id, url, observacoes, visitado FROM links WHERE url = ?1 LIMIT 1")?;

    let mut rows = stmt.query(params![url])?;

    if let Some(row) = rows.next()? {
        Ok(Some(Link {
            id: row.get(0)?,
            url: row.get(1)?,
            observacoes: row.get(2)?,
            visitado: row.get(3)?,
        }))
    } else {
        Ok(None)
    }
}
