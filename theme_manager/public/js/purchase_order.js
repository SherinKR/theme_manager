// var company,company_is_group,company_internal_supplier,company_external_supplier;
// frappe.ui.form.on('Purchase Order', {
//   onload: function(frm){
//     setTimeout(() => {
//       frm.remove_custom_button("Product Bundle",'Get Items From');
//       frm.remove_custom_button("Supplier Quotation",'Get Items From');
//       frm.remove_custom_button("Update Rate as per Last Purchase",'Tools');
//       frm.remove_custom_button("Link to Material Request",'Tools');
//     },5);
//   },
//   refresh: function(frm) {
// 			set_supplier(frm);
//       check_company(frm);
// 			frm.get_field("items").grid.set_multiple_add("item_code", "qty");
// 			setTimeout(() => {
//         frm.remove_custom_button('Payment Request', 'Create');
//         }, 10);
// 			if(frm.doc.docstatus == 0){
// 				set_new_medicine_button(frm);
// 			}
// 			check_company(frm);
//     },
//     order_type: function(frm){
//         check_order_type(frm);
// 				check_company(frm);
//     },
//     company: function(frm){
// 				check_company(frm);
//     }
// });
// var check_company = function(frm){
//   frappe.call({
// 	   "method": "frappe.client.get",
// 		 "args": {
// 		     "doctype": "Company",
// 				 "filters": {"company_name": frm.doc.company }
//   },
// 	callback: function(r){
// 	   if(r){
// 				var company_is_group =r.message.is_group;
//         if(!company_is_group){
//             set_item_filter(frm);
//             frm.set_df_property('order_type', 'read_only', false);
//             frm.refresh_field("order_type");
//         }
//         else {
//           set_item_filter_central(frm);
//           frm.set_df_property('order_type', 'read_only', true);
//           frm.set_value("order_type","External");
//           frm.refresh_field("order_type");
//         }
//       }
//     }
// 	});
// };
// var set_item_filter = function(frm){
// 	frm.set_query("item_code", "items", function() {
// 			return {
// 					query: "erpnext.controllers.queries.item_query",
// 					filters: {'purchase_type': frm.doc.order_type}
// 			};
// 	});
// };
// var set_item_filter_central = function(frm){
// 	frm.set_query("item_code", "items", function() {
// 			return {
// 					query: "erpnext.controllers.queries.item_query",
// 					filters: {'purchase_type': "Internal"}
// 			};
// 	});
// };
// var set_supplier = function(frm) {
// 	frappe.call({
// 					"method": "frappe.client.get",
// 					"args": {
// 							"doctype": "Company",
// 							"filters": {"company_name": frm.doc.company }
// 					},
// 					callback: function(r){
// 					if(r){
// 							company_is_group =r.message.is_group;
// 							company_external_supplier = r.message.external_supplier;
// 							company_internal_supplier = r.message.internal_supplier;
// 							check_order_type(frm);
// 					}
// 					else{
// 							return false;
// 					}
// 			}
// 	});
// };

// var set_new_medicine_button = function(frm) {
// 	var new_item=[];
// 	frm.add_custom_button(__('Get New Products'), function() {
// 		frappe.call({
// 			"method": "erpnext.controllers.queries.get_new_medicines",
// 			"args": {
// 				"company": frm.doc.company, "purchase_type": frm.doc.order_type
// 			},
// 			callback: function(ret){
// 				console.log(ret);
// 				if(ret && ret.message){
// 					new_items_popup(frm, ret.message);
// 				}
// 			}
// 		});
// 	});
// };

// function check_order_type(frm){
//     if(!company_is_group){
//         if(frm.doc.order_type=='Internal'){
//             frm.set_value("supplier",company_internal_supplier);
//         }
//         if(frm.doc.order_type=='External'){
//             frm.set_value("supplier",company_external_supplier);
//         }
//         frm.set_df_property('supplier', 'read_only', true);
//     }
//     else{
//         frm.set_df_property('supplier', 'read_only', false);
//     }
// };

// var new_items_popup = function(frm, new_items) {
//     var d = new frappe.ui.Dialog({
//         title:__("New Medicine"),
// 				width: 1000,
//         fields:[
//             {
//                 "fieldtype": "HTML",
//                 "fieldname": "items_html"
//             }
//         ],
//         primary_action_label: 'Add Items',
//         primary_action() {
//             var opts = d.item_check_list.get_item();
//             var me = d.item_check_list;
//             var items = "";
//             if(!opts.checked_items.length){
//                 return;
//             }
//             else{
//                 opts.checked_items.forEach((item, i) => {
//                     // let item_table = frappe.model.add_child(frm.doc, 'Items', 'items');
//                     // frappe.model.set_value(item_table.doctype, item_table.name, 'item_code', item);
// 										let row = frm.add_child('items', {
// 											item_code: item
// 										});
// 										frm.script_manager.trigger("item_code", row.doctype, row.name);
// 										frm.refresh_field("items");
//                 });
//                 frm.refresh_field('items');
//                 frm.refresh_fields();
//                 frm.trigger("validate");
//             }
//             d.hide();
//     }
//     });
//     d.show();
//     d.get_primary_btn().attr('disabled', false);
//     d.fields_dict.items_html.$wrapper.html("");
//     var items_area = $('<div class="col-md-12 col-sm-12" style="min-height: 10px;">').appendTo(d.fields_dict.items_html.wrapper);
//     d.item_check_list = new frappe.ItemsCheckList(items_area, frm, 0, d, new_items);
// };

// frappe.ItemsCheckList = Class.extend({
//     init: function(wrapper, frm, disable, d, new_items) {
//         var me = this;
//         this.frm = frm;
//         this.wrapper = wrapper;
//         this.disable = disable;
//         $(wrapper).html('<div class="help">' + __("Loading") + '...</div>');
//         me.items = new_items;
//         me.show_items(frm, d);
//     },
//     show_items: function(frm, d) {
//         var me = this;
//         var i;
//         var table_row = '';
//         $(this.wrapper).empty();
//         var table_head = '';
//         if(this.items){
//             $.each(this.items, function(i, item) {
// 								var drug_content = item.drug_content ? item.drug_content : '';
//                 var item_check_field = repl('<div class="item" \
//                 data-item-id="%(item_id)s">\
//                 <input type="checkbox" class="box"> \
//                 </input>',
//                 {item_id: item.item_code});
//                 table_row += "<tr><td>"+item_check_field+"</td><td>"+__(item.item_name)+"</td><td>"+drug_content+"</td></tr>";
//             });
//         }
//         var table_html = `
//             <table widht="100%"><tr>
// 								<th></th>
//                 <th>Product</th>
//                 <th>Drug Content</th>
//             </tr>
//         `;
//         if (table_row){
//             table_html += table_row;
//         }
//         table_html += '</table>';
//         $(me.wrapper).append(table_html);
//     },
//     show: function() {
//         var me = this;
//         // uncheck all items
//         $(this.wrapper).find('input[type="checkbox"]')
//             .each(function(i, checkbox) {
//                 checkbox.checked = false;
//         });
//     },
//     get_item: function() {
//         var checked_items = [];
//         var unchecked_items = [];
//         $(this.wrapper).find('[data-item-id]').each(function() {
//             if($(this).find('input[type="checkbox"]:checked').length) {
//                 checked_items.push($(this).attr('data-item-id'));
//             } else {
//                 unchecked_items.push($(this).attr('data-item-id'));
//             }
//         });
//         return {
//             checked_items: checked_items,
//             unchecked_items: unchecked_items
//         };
//     }
// });
