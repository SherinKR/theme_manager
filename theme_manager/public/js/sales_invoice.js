// frappe.ui.form.on('Sales Invoice', {
// 	onload: function(frm){
// 	  estimate_print(frm);
// 		if(frm.doc.customer){
// 			console.log("refreshed");
// 			frm.refresh_field('customer');
// 			// frm.trigger('customer');
// 			// frm.refresh_field('taxes_and_charges');
// 			// frm.trigger('taxes_and_charges');
// 			// frm.refresh_field('taxes');
// 		}
// 		frm.remove_custom_button('Fetch Timesheet');
// 		setTimeout(() => {
// 	    frm.remove_custom_button("Maintenance Schedule",'Create');
// 			frm.remove_custom_button("Subscription",'Create');
// 			frm.remove_custom_button("Invoice Discounting",'Create');
// 			frm.remove_custom_button("E-Way Bill JSON",'Create');
// 			frm.remove_custom_button("Quotation",'Get Items From');
// 			frm.remove_custom_button('Fetch Timesheet');
// 	  },10);
// 	},
// 	refresh: function(frm){
// 	    estimate_print(frm);
// 		setTimeout(() => {
// 	    frm.remove_custom_button("Maintenance Schedule",'Create');
// 			frm.remove_custom_button("Subscription",'Create');
// 			frm.remove_custom_button("Invoice Discounting",'Create');
// 			frm.remove_custom_button("E-Way Bill JSON",'Create');
// 			frm.remove_custom_button("Quotation",'Get Items From');
// 			frm.remove_custom_button('Fetch Timesheet');
// 	  },10);
// 		frm.get_field("items").grid.set_multiple_add("item_code", "qty");
// 	},
//   validate: function(frm){
//     $.each(frm.doc.items || [], function(i, v) {
//       var batch_no = v.batch_no;
//       console.log(batch_no);
//       frappe.call({
//         method: 'frappe.client.get',
//         args: {
//           'doctype': 'Batch',
//           'filters': {'batch_id': batch_no}
//         },
//         callback: function(r){
//             frappe.model.set_value(v.doctype, v.name,"expiry_date", r.message.expiry_date);
//         }
//       });
//     });
//   }
// });

// frappe.ui.form.on('Sales Invoice Item', {
// 	item_code: function(frm, cdt, cdn){
// // 	  check_drug_class_restrictions(frm, cdt, cdn);
// 	},
// 	qty: function(frm, cdt, cdn){
// // 	  check_drug_class_restrictions(frm, cdt, cdn);
// 	},
//   refresh: function(frm, cdt, cdn){
//     //add_expiry_date(frm, cdt, cdn);
//   }
// });

// var check_drug_class_restrictions = function(frm, cdt, cdn){
//     var child = locals[cdt][cdn];
//     console.log(child.item_code);
//     frappe.call({
//        method: 'frappe.client.get',
//        args: {
//            'doctype': 'Drug Prescription Class',
//            'filters': {'name': child.drug_prescription_class}
//        },
//        callback: function(r){
//            console.log(r.message);
//        }
//     });
// };

// var add_expiry_date = function(frm, cdt, cdn){
//   var child = locals[cdt][cdn];
//   frappe.call({
//        method: 'frappe.client.get',
//        args: {
//            'doctype': 'Batch',
//            'filters': {'batch_id': child.batch_no}
//        },
//        callback: function(r){
//           frappe.model.set_value(cdt, cdn,"expiry_date", r.message.expiry_date);
//        }
//     });
// };
// function estimate_print(frm){
//     if(frm.doc.status=="Draft" && !frm.is_new()){
//         frm.add_custom_button(__("Estimate Print"), function() {
//         frm.print_doc();
//     });
//     }
// }
