use rusqlite::{Connection, Result};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct NewPriceHistory {
    pub price: f64,
    pub creator_id: i64,
    pub notes: Option<String>,
}

pub fn insert_price(conn: &Connection, price: &NewPriceHistory) -> Result<i64> {
    conn.execute(
        "INSERT INTO price_history (price, creator_id, notes) VALUES (?1, ?2, ?3)",
        (&price.price, &price.creator_id, &price.notes),
    )?;

    Ok(conn.last_insert_rowid())
}
