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
    'POST /member/picture/:member_id': 'MemberController.change_picture',
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
    'GET /loan': 'TblLoanController.list_per_ao',
    'GET /loan/detail/:id': 'TblLoanController.view_per_loan_id',
    'GET /loan/member/:id_member': 'TblLoanController.view_per_member',
    'GET /loan/pending': 'TblLoanController.view_pending_loan',
    'GET /loan/status/:id_koperasi/:id_ao': 'TblLoanController.view_member_status',
    'GET /loan/collection/:id_loan': 'TblLoanController.view_collection',


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
};

module.exports = privateRoutes;
