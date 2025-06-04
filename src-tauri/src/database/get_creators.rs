use rusqlite::{Connection, Result};
use serde::Serialize;

#[derive(Serialize)]
pub struct Creator {
    pub id: i64,
    pub title: String,
    pub url: String,
}

pub fn get_creators(conn: &Connection) -> Result<Vec<Creator>> {
    let mut stmt = conn.prepare("SELECT id, title, url FROM creators ORDER BY title")?;
    
    let creators = stmt.query_map([], |row| {
        Ok(Creator {
            id: row.get(0)?,
            title: row.get(1)?,
            url: row.get(2)?,
        })
    })?
    .collect::<Result<Vec<_>>>()?;
    
    Ok(creators)
}
