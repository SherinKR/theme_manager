frappe.ui.form.on('Sales Order', {
	onload(frm) {
		if(frm.doc.workflow_state!='Demand Request Approved'){
		    frm.remove_custom_button('Sales Invoice','Create');
        }
	},
	workflow_state(frm) {
		if(frm.doc.workflow_state!='Demand Request Approved'){
		    frm.remove_custom_button('Sales Invoice','Create');
        }
	}
});
