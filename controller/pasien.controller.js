const mysql = require('mysql2/promise');
const helper = require('../helper');
const db = require('../database/database')

async function getMultiple() {
    const rows = await db.query("SELECT * FROM pasien")
    const data = helper.emptyOrRows(rows)

    return data
}

async function createPasien(req) {
    const result = await db.query(
        `INSERT INTO pasien (norm, no_pendaftaran, tgl_kunjungan, tgl_selesai_kunjungan, poliklinik_id, dokter_id, penjamin, status)'+
        VALUES
        (${req.norm}, ${req.no_pendaftaran}, ${req.tgl_kunjungan}, NULL, ${req.poliklinik_id}, ${req.dokter_id}, ${req.penjamin}, ${req.status}`
    );
    let res = {
        message: 'Error creating',
        data: null
    }
    const newData = await db.query(
        `SELECT norm, no_pendaftaran, tgl_kunjungan FROM pendaftaran WHERE id = (id) VALUES ${result[0].id}`
    )
    if(result.affectedRows){
        res = {
            message: 'success',
            data: newData
        }
    }
    return res
}

module.exports = {
    getMultiple,
    createPasien
}