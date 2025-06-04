use rusqlite::{params, Connection, Result};

pub fn delete_creator_by_id(conn: &Connection, id: i64) -> Result<()> {
    let affected = conn.execute("DELETE FROM creators WHERE id = ?", params![id])?;
    if affected == 0 {
        Err(rusqlite::Error::QueryReturnedNoRows)
    } else {
        Ok(())
    }
}
