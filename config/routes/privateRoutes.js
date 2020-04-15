const privateRoutes = {
        'POST /login': 'UserController.login',

        'GET /users': 'UserController.getAll',
        'POST /users/change_password': 'UserController.change_password',

        'POST /koperasi': 'KoperasiController.add',
        'GET /koperasi': 'KoperasiController.list',

        'PUT /koperasi/approval/:kop_id': 'KoperasiController.edit_approval',
        'GET /koperasi/approval/:kop_id': 'KoperasiController.view_approval',

        'PUT /koperasi/cutoff/:kop_id': 'KoperasiController.edit_cutoff',
        'GET /koperasi/cutoff/:kop_id': 'KoperasiController.view_cutoff',

        'POST /ao': 'UserController.add_ao',
        'GET /ao': 'UserController.list_ao',
        'GET /ao/:id': 'UserController.view_ao',
        'GET /ao/admin_koperasi/:akId': 'UserController.view_ao_by_akId',
        'PUT /ao/:id': 'UserController.edit_ao',
        'PUT /ao/:id/status': 'UserController.edit_ao_status',

        'POST /member': 'MemberController.add',
        'GET /member': 'MemberController.list',
        'GET /member/:member_id': 'MemberController.view',
        'PUT /member/:member_id': 'MemberController.edit',
        'GET /member/phone/:mobile_phone': 'MemberController.view_by_phone',
        'POST /member/picture/:member_id': 'MemberController.change_picture',

        'POST /member_config': 'MemberConfigController.insert',
        'GET /member_config': 'MemberConfigController.list',
        'GET /member_config/:kop_id': 'MemberConfigController.view',

        'POST /loan/formula': 'LoanFormulaConfigController.add',
        'GET /loan/formula': 'LoanFormulaConfigController.list',
        'GET /loan/formula/:kop_id': 'LoanFormulaConfigController.view',
        'GET /loan/other_fee/:frm_id': 'LoanFormulaConfigController.list_other_fee',

        'POST /loan': 'LoanController.add',
        'GET /loan': 'LoanController.list',
        'GET /loan/:id': 'LoanController.view',
        'GET /loan_member/:member_id': 'LoanController.view_by_member_id',
        'GET /loan_koperasi/:kop_id': 'LoanController.view_by_kop_id',

        'GET /loan_approval/:member_id/:is_approved': 'LoanController.loan_approval',

        'GET /loan/disbursed/:kop_id': 'LoanController.list_disbursed_by_kop_id'

};

module.exports = privateRoutes;
