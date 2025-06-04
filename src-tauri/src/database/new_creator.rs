use rusqlite::{Connection, Result};
use serde::{Deserialize};

#[derive(Deserialize)]
pub struct NewCreator {
    pub title: String,
    pub url: String,
}

pub fn insert_creator(conn: &Connection, creator: &NewCreator) -> Result<i64> {
    conn.execute(
        "INSERT INTO creators (title, url) VALUES (?1, ?2)",
        [&creator.title, &creator.url],
    )?;
    
    Ok(conn.last_insert_rowid())
}
