const privateRoutes = {
    'POST /login': 'UserController.login',
    'POST /forgot_password': 'UserController.forgot_password',

    'GET /users': 'UserController.getAll',
    'POST /users/change_password': 'UserController.change_password',

    'POST /koperasi': 'KoperasiController.add',
    'GET /koperasi': 'KoperasiController.list',
    'GET /koperasi/:id': 'KoperasiController.view_by_id',
    'PUT /koperasi/:id': 'KoperasiController.edit_by_id',

    /*'PUT /koperasi/approval/:kop_id': 'KoperasiController.edit_approval',
    'GET /koperasi/approval/:kop_id': 'KoperasiController.view_approval',

    'PUT /koperasi/cutoff/:kop_id': 'KoperasiController.edit_cutoff',
    'GET /koperasi/cutoff/:kop_id': 'KoperasiController.view_cutoff',*/

    'POST /ao': 'UserController.add_ao',
    'GET /ao': 'UserController.list_ao',
    'GET /ao/:id': 'UserController.view_ao',
    'GET /ao/admin_koperasi/:akId': 'UserController.view_ao_by_akId',
    'PUT /ao/:id': 'UserController.edit_ao',


    'POST /member': 'MemberController.add',
    'GET /member': 'MemberController.list',
    'GET /member/:member_id': 'MemberController.view',
    'PUT /member/:member_id': 'MemberController.edit',
    'GET /member/phone/:mobile_phone': 'MemberController.view_by_phone',
    'POST /member/picture': 'MemberController.upload_files',
    'GET /member/picture/:member_id': 'MemberController.get_picture',
    'POST /member/miscall': 'MemberController.miscall',

    'POST /member_config': 'MemberConfigController.insert',
    'GET /member_config': 'MemberConfigController.list',
    'GET /member_config/:kop_id': 'MemberConfigController.view',

    // 'POST /loan/formula': 'LoanFormulaConfigController.add',
    // 'GET /loan/formula': 'LoanFormulaConfigController.list',
    // 'GET /loan/formula/:kop_id': 'LoanFormulaConfigController.view',
    // 'GET /loan/other_fee/:frm_id': 'LoanFormulaConfigController.list_other_fee',

    // 'POST /loan': 'LoanController.add',
    // 'GET /loan': 'LoanController.list',
    // 'GET /loan/:id': 'LoanController.view',

    // 'GET /loan_approval/:loan_id/:is_approved': 'LoanController.loan_approval',

    // 'POST /collection': 'CollectionController.add',
    // 'GET /collection': 'CollectionController.list',
    // 'GET /collection/:id': 'CollectionController.view',

    'POST /config': 'ConfigController.add',
    'GET /config': 'ConfigController.list',
    'GET /config/:id': 'ConfigController.view',
    'PUT /config/:id': 'ConfigController.edit',


    /*------------------------------------- Phase 2 -----------------------------------*/

    //MASTER
    'GET /master/cicilan_sebagian': 'MasterDataController.cicilan_sebagian',
    'GET /master/dasar_denda': 'MasterDataController.dasar_denda',
    'GET /master/dasar_pelunasan': 'MasterDataController.dasar_pelunasan',
    'GET /master/dasar_simpanan': 'MasterDataController.dasar_simpanan',
    'GET /master/loan/status': 'MasterDataController.status_list',


    //LOAN
    'POST /loan/add': 'TblLoanController.add',
    'PUT /loan/status': 'TblLoanController.update_loan_status',
    'GET /loan': 'TblLoanController.list_loan_to_disburse_per_ao',
    'GET /loan/detail/:id': 'TblLoanController.view_per_loan_id',
    'GET /loan/member/:id_member': 'TblLoanController.view_per_member',
    'GET /loan/pending': 'TblLoanController.view_pending_loan',
    'GET /loan/status/:id_koperasi/:id_ao': 'TblLoanController.view_member_status',
    'GET /loan/collection/:id_loan': 'TblLoanController.view_collection_per_loan',
    'POST /loan/member/picture/:member_id': 'MemberController.disburse_picture',


    //PARAMETER
    'GET /parameter': 'LoanParameterController.view',
    'POST /parameter': 'LoanParameterController.add',


    //PRODUCT
    'POST /product': 'LoanProductController.add',
    'PUT /product': 'LoanProductController.edit',
    'PUT /product/status': 'LoanProductController.update_status',
    'GET /product': 'LoanProductController.list',
    'GET /product/active': 'LoanProductController.list_active',
    'GET /product/:id_product': 'LoanProductController.per_product',


    //MEMBER
    'GET /member/nik/:nik': 'MemberController.view_by_nik',


    //ACCOUNT MANAGEMENT
    'POST /account': 'UserController.add_account',
    'GET /account': 'UserController.list_account',
    'GET /account/:id': 'UserController.account_per_id',
    'PUT /account': 'UserController.edit_account',
    'PUT /account/:id/status': 'UserController.edit_ao_status',


    //COLLECTION
    'POST /collection/member': 'TblLoanCollectionController.view_member_collection',
    'POST /collection/add': 'TblLoanCollectionController.add',
    'GET /collection': 'TblLoanCollectionController.list', //https://balsamiq.cloud/s1ni7o4/pl3yqi7/rFA01 LIST PEMBAYARAN CICILAN

    //SIMPANAN
    'GET /loan/simpanan_wajib/:id_member/:id_loan/total': 'TblSimpananController.view_sum_simpanan_wajib',
    'GET /loan/simpanan_wajib/:id_member/:id_loan/detail': 'TblSimpananController.view_detail_simpanan_wajib',
    'POST /loan/simpanan_wajib/penarikan': 'TblSimpananController.withdraw_simpanan_wajib',
    'GET /loan/simpanan_pokok/:id_member/:id_loan/total': 'TblSimpananController.view_sum_simpanan_pokok',
    'GET /loan/simpanan_pokok/:id_member/:id_loan/detail': 'TblSimpananController.view_detail_simpanan_pokok',
    'POST /loan/simpanan_pokok/penarikan': 'TblSimpananController.withdraw_simpanan_pokok',
    'GET /loan/simpanan_sukarela/:id_member/:id_loan/total': 'TblSimpananController.view_sum_simpanan_sukarela',
    'GET /loan/simpanan_sukarela/:id_member/:id_loan/detail': 'TblSimpananController.view_detail_simpanan_sukarela',
    'POST /loan/simpanan_sukarela/penarikan': 'TblSimpananController.withdraw_simpanan_sukarela',
    'GET /loan/simpanan/:id_member/total': 'TblSimpananController.view_sum_all_simpanan',


    //KINERJA KOPERASI
    'GET /graph/member': 'KinerjaKoperasiController.view_count_anggota',
    'GET /graph/disburse': 'KinerjaKoperasiController.view_sum_penyaluran_pinjaman',
    'GET /graph/repayment': 'KinerjaKoperasiController.view_sum_pembayaran_angsuran',
    'GET /graph/loan': 'KinerjaKoperasiController.view_count_pinjaman_berjalan',
    'GET /graph': 'KinerjaKoperasiController.view_all_graph',

    //CUSTOMER
    'POST /customer/login': 'UserController.cust_login',
    'GET /customer/loan/list': 'CustomerController.view_customer_loan',
    'GET /customer/loan/detail/:id_loan': 'CustomerController.view_customer_loan_collection',
    'GET /customer/loan/simpanan': 'CustomerController.view_customer_loan_simpanan',
    'POST /customer/change_password': 'CustomerController.view_customer_change_pass',

    //REMBUG & KELOMPOK
    'POST /rembug/add': 'TblRembugController.add_rembug',
    'PUT /rembug/edit': 'TblRembugController.edit_rembug',
    'GET /rembug/view': 'TblRembugController.view_rembug',
    'POST /kelompok/add': 'TblKelompokController.add_kelompok',
    'PUT /kelompok/edit': 'TblKelompokController.edit_kelompok',
    'GET /kelompok/view/:id_rembug': 'TblKelompokController.view_kelompok',

    // REPORT
    'POST /report/lampiran': 'ReportController.lampiran',
};

module.exports = privateRoutes;
