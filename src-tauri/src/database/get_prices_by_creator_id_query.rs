use rusqlite::{Connection, Result};
use serde::Serialize;

#[derive(Serialize)]
pub struct PriceHistory {
    pub id: i64,
    pub date: String,
    pub price: f64,
    pub creator_id: i64,
    pub notes: Option<String>,
}

pub fn get_prices_by_creator_id_query(
    conn: &Connection,
    creator_id: i64,
) -> Result<Vec<PriceHistory>> {
    let mut stmt = conn.prepare(
        "SELECT id, date, price, creator_id, notes
         FROM price_history
         WHERE creator_id = ?
         ORDER BY date DESC",
    )?;

    let prices = stmt
        .query_map([creator_id], |row| {
            Ok(PriceHistory {
                id: row.get(0)?,
                date: row.get(1)?,
                price: row.get(2)?,
                creator_id: row.get(3)?,
                notes: row.get(4)?,
            })
        })?
        .collect::<Result<Vec<_>>>()?;

    Ok(prices)
}
