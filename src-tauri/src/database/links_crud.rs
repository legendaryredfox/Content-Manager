use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Link {
    pub id: i64,
    pub url: String,
    pub observacoes: Option<String>,
    pub visitado: bool,
}

#[derive(Deserialize)]
pub struct NewLink {
    pub url: String,
    pub observacoes: Option<String>,
}

pub fn insert_link(conn: &Connection, new_link: NewLink) -> Result<i64> {
    conn.execute(
        "INSERT INTO links (url, observacoes) VALUES (?, ?)",
        params![new_link.url, new_link.observacoes],
    )?;
    Ok(conn.last_insert_rowid())
}

pub fn get_links(conn: &Connection) -> Result<Vec<Link>> {
    let mut stmt = conn.prepare("SELECT id, url, observacoes, visitado FROM links")?;
    let links = stmt
        .query_map([], |row| {
            Ok(Link {
                id: row.get(0)?,
                url: row.get(1)?,
                observacoes: row.get(2)?,
                visitado: row.get::<_, i64>(3)? != 0,
            })
        })?
        .collect::<Result<Vec<_>>>()?;
    Ok(links)
}

pub fn toggle_visitado(conn: &Connection, id: i64) -> Result<()> {
    conn.execute(
        "UPDATE links SET visitado = NOT visitado WHERE id = ?",
        params![id],
    )?;
    Ok(())
}
