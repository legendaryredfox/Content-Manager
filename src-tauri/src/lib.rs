mod database;

use database::create_database::setup_database;
use database::delete_creator::delete_creator_by_id;
use database::get_creators::{get_creators, Creator};
use database::get_prices_by_creator_id_query::{get_prices_by_creator_id_query, PriceHistory};
use database::link_query;
use database::links_crud::{get_links, insert_link, toggle_visitado, Link, NewLink};
use database::new_creator::{insert_creator, NewCreator};
use database::new_price::{insert_price, NewPriceHistory};
use tauri::State;

pub struct AppState {
    db_path: String,
}

#[tauri::command]
fn insert_link_command(state: State<'_, AppState>, link: NewLink) -> Result<i64, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    insert_link(&conn, link).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_links_command(state: State<'_, AppState>) -> Result<Vec<Link>, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    get_links(&conn).map_err(|e| e.to_string())
}

#[tauri::command]
fn toggle_visitado_command(state: State<'_, AppState>, id: i64) -> Result<(), String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    toggle_visitado(&conn, id).map_err(|e| e.to_string())
}

#[tauri::command]
fn link_query_command(
    state: tauri::State<AppState>,
    url: String,
) -> Result<Option<link_query::Link>, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    link_query::link_query(&conn, &url).map_err(|e| e.to_string())
}

#[tauri::command]
fn delete_creator_command(state: State<'_, AppState>, id: i64) -> Result<(), String> {
    println!("⏳ Solicitando exclusão do creator com ID = {}", id);

    let conn = rusqlite::Connection::open(&state.db_path)
        .map_err(|e| format!("Erro ao abrir conexão com o banco: {}", e))?;

    match delete_creator_by_id(&conn, id) {
        Ok(_) => {
            println!("✅ Creator com ID {} excluído com sucesso.", id);
            Ok(())
        }
        Err(err) => {
            eprintln!("❌ Erro ao excluir creator: {}", err);
            Err(format!("Erro ao excluir creator: {}", err))
        }
    }
}

#[tauri::command]
fn new_creator_command(state: State<'_, AppState>, creator: NewCreator) -> Result<i64, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    insert_creator(&conn, &creator).map_err(|e| e.to_string())
}

#[tauri::command]
fn insert_price_command(state: State<'_, AppState>, price: NewPriceHistory) -> Result<i64, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    insert_price(&conn, &price).map_err(|e| e.to_string())
}

#[tauri::command]
fn get_prices_by_creator_id_command(
    state: State<'_, AppState>,
    creator_id: i64,
) -> Result<Vec<PriceHistory>, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    get_prices_by_creator_id_query(&conn, creator_id).map_err(|e| e.to_string())
}

#[tauri::command]
fn init_database(state: State<'_, AppState>) -> Result<String, String> {
    Ok(state.db_path.clone())
}

#[tauri::command]
fn get_creators_command(state: State<'_, AppState>) -> Result<Vec<Creator>, String> {
    let conn = rusqlite::Connection::open(&state.db_path).map_err(|e| e.to_string())?;
    get_creators(&conn).map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_path = setup_database()
        .map_err(|e| {
            eprintln!("Failed to set up database: {}", e);
            e
        })
        .expect("Failed to set up database")
        .to_string_lossy()
        .into_owned();

    tauri::Builder::default()
        .manage(AppState { db_path })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            init_database,
            get_creators_command,
            new_creator_command,
            insert_price_command,
            get_prices_by_creator_id_command,
            delete_creator_command,
            toggle_visitado_command,
            get_links_command,
            insert_link_command,
            link_query_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
