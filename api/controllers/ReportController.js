const sequelize = require('../../config/database')

const ReportController = () => {

    const lampiran = async (req,res)=> {
        const { body } = req;

        try{
            // const query = `SELECT 
            // ROW_NUMBER() OVER (Order by collection.id) AS row_number,
            // week(collection.createdAt,1) as week_number,
            // sum(sw.simpanan_wajib) as simpanan_wajib, sum(sk.simpanan_sukarela) as simpanan_sukarela, sum(collection.dana_jpk) as dana_jpk,
            // min(collection.createdAt) as from_date,
            // max(collection.createdAt) as to_date
            // FROM peers_db_v2.tblloan_collection as collection
            // join peers_db_v2.tbl_simpanan_wajib as sw on sw.id_collection=collection.id and sw.id_koperasi=collection.id_koperasi
            // join peers_db_v2.tbl_simpanan_sukarela as sk on sk.id_collection=collection.id and sk.id_koperasi=collection.id_koperasi
            // where collection.id_koperasi = ${body.koperasi_id} and
            // collection.createdAt >= '${body.from_date ? body.from_date : 'DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 2 MONTH)), INTERVAL 1 DAY)'}' and
            // collection.createdAt <= '${body.to_date ? body.to_date : 'DATE_SUB(NOW(), INTERVAL 1 MONTH'}'
            // group by week_number`;

            const query = `SELECT 
            concat('Week ',week(collection.createdAt)) as WeekNumber,
            sum(sw.simpanan_wajib) as simpanan_wajib_simpan, sum(sk.simpanan_sukarela) as simpanan_sukarela_simpan, sum(collection.dana_jpk) as dana_jpk_simpan,
            sum(sw_min.simpanan_wajib) as simpanan_wajib_tarik, sum(sk_min.simpanan_sukarela) as simpanan_sukarela_tarik,
            max(sw_total.total_simpanan) as simpanan_wajib_jumlah,max(sk_total.total_simpanan) as simpanan_sukarela_jumlah,
            min(collection.createdAt) as from_date,
            max(collection.createdAt) as to_date
            FROM peers_db_v2.tblloan_collection as collection
            left join peers_db_v2.tbl_simpanan_wajib as sw on sw.id_collection=collection.id and sw.id_koperasi=collection.id_koperasi
            left join peers_db_v2.tbl_simpanan_sukarela as sk on sk.id_collection=collection.id and sk.id_koperasi=collection.id_koperasi
            left join peers_db_v2.tbl_simpanan_wajib as sw_min on sw_min.id_collection=collection.id and sw_min.id_koperasi=collection.id_koperasi and sw_min.desc != "Setoran"
            left join peers_db_v2.tbl_simpanan_sukarela as sk_min on sk_min.id_collection=collection.id and sk_min.id_koperasi=collection.id_koperasi and sk_min.desc != "Setoran"
            left join peers_db_v2.tbl_simpanan_wajib as sw_total on sw_total.id_collection=collection.id and sw_total.id_koperasi=collection.id_koperasi and sw_total.id = ( select max(sp.id) from peers_db_v2.tbl_simpanan_wajib sp where sp.id_koperasi = sw_total.id_koperasi and sp.id_collection = sw_total.id_collection and sp.createdAt >= '${body.from_date ? body.from_date : 'DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 2 MONTH)), INTERVAL 1 DAY)'}' and sp.createdAt <= '${body.to_date ? body.to_date : 'DATE_SUB(NOW(), INTERVAL 1 MONTH'}')
            left join peers_db_v2.tbl_simpanan_sukarela as sk_total on sk_total.id_collection=collection.id and sk_total.id_koperasi=collection.id_koperasi and sk_total.id = ( select max(sp.id) from peers_db_v2.tbl_simpanan_sukarela sp where sp.id_koperasi = sk_total.id_koperasi and sp.id_collection = sk_total.id_collection and sp.createdAt >= '${body.from_date ? body.from_date : 'DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 2 MONTH)), INTERVAL 1 DAY)'}' and sp.createdAt <= '${body.to_date ? body.to_date : 'DATE_SUB(NOW(), INTERVAL 1 MONTH'}')
            where collection.id_koperasi = ${body.koperasi_id} and
            collection.createdAt >= '${body.from_date ? body.from_date : 'DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL 2 MONTH)), INTERVAL 1 DAY)'}' and
            collection.createdAt <= '${body.to_date ? body.to_date : 'DATE_SUB(NOW(), INTERVAL 1 MONTH'}'
            group by WeekNumber`

            const [results, metadata] = await sequelize.query(query);

            return res.status(200).json({
                status:200,
                data:results,
                message:"Success retrieve data"
            })

        }catch (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Internal server error' });
        }
    }

    return {
        lampiran
    };
};

module.exports = ReportController;
