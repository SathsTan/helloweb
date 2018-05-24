function displayFinancialItem(mess, fftype){
	refreshMesage("fe");
	updateMessageDiv(mess,"fe");
			
	document.getElementById('fe_contentplaceholder1').style.display = 'none';
		
	var finType = dijit.byId('feDropDown').get('value');
	

	console.log(' fftype = ' + fftype);
	
	if ( fftype !== '' && fftype !== null && fftype > '') {
		finType = fftype; 	
		dijit.byId('feDropDown').set("value",fftype);
	}			
	
	console.log(' FT = ' + finType);
	
	if ( finType == '' || finType == null ) {		
		alert(' Financial Type is required ');
		return; 
	}	
		
	var appItem = dijit.byId('appItem').get('value'); 	
	
	console.log(' appitem = ' + appItem);
	
	var date1 = dijit.byId('date1').get('value');
	var date2 = dijit.byId('date2').get('value');
	
	console.log(date1); console.log(date2);
	
	var fmtdate1 = ""; 
	var fmtdate2 = "";
	var compdate1 = ""; 
	var compdate2 = ""; 	
	
	if ( date1 != null) {
		fmtdate1 = date1.toISOString().slice(0,10);
		compdate1 = date1.toISOString().slice(0,4) + date1.toISOString().slice(5,7) + date1.toISOString().slice(8,10); 
	} 
	
	if (date2 != null) {
		fmtdate2 = date2.toISOString().slice(0,10);
		compdate2 = date2.toISOString().slice(0,4) + date2.toISOString().slice(5,7) + date2.toISOString().slice(8,10); 
	} 
			
	console.log(fmtdate1); console.log(fmtdate2);
	console.log(compdate1); console.log(compdate2);
	
	if ( date1 != null  && date2 != null  && compdate1 > compdate2 ) {
		alert(' Effective From Date is greater than Effective To Date');
		return; 
	}	
	
	if (typeof Object.assign != 'function') {
		  Object.assign = function(target) {
		    'use strict';
		    if (target == null) {
		      throw new TypeError('Cannot convert undefined or null to object');
		    }

		    target = Object(target);
		    for (var index = 1; index < arguments.length; index++) {
		      var source = arguments[index];
		      if (source != null) {
		        for (var key in source) {
		          if (Object.prototype.hasOwnProperty.call(source, key)) {
		            target[key] = source[key];
		          }
		        }
		      }
		    }
		    return target;
		  };
		}
	
	dojo.xhrGet({
		
	    // The URL of the request
	    url: "/datamart/fe/" + "action=clickDisplayFIGrid",
	    handleAs: "json",
	    content:{
	    	financialType: "" + finType,
	    	date1: "" + fmtdate1,
	    	date2: "" + fmtdate2,
	    	approveItem: "" + appItem},
	    // The success callback with result from server
	    load: function(newContent) {
	    	
	    	var gridData = newContent;	    	
	    	    		    	
	    	require(["dojox/grid/EnhancedGrid",
	    	         "dojo/data/ItemFileWriteStore",	
	    	         "dijit/registry",
	                 "dojo/domReady!"
	        ], function(EnhancedGrid, ItemFileWriteStore, registry){
	    		
	    			var data = {
	    					identifier: "EFF_STRT_DT",
	    					items: gridData
	    			};
	        		var gridStore = new ItemFileWriteStore({data: data});
	        		
	        		var obj = gridData.reduce(function(current, next){
	  	    		  return Object.assign({}, current, next);
	  	    		}, {})

	  	    		console.log("object => ", obj); 
	  	    	
	        		var arrayText = []; 

	        		for (var i = 1 ; i < 18  ; i++)	{
	        			var item = "FNTRY_PARM_TX" + i; 
	        			if (obj[item] != null) {arrayText.push(obj[item]);}
	        		};
	  	    	
	        		console.log("array = " + arrayText);
	        		
	        		var loopctr = arrayText.length + 1; 
	        		console.log("loopctr = " + loopctr);
	        		   	    		        		
	        		var gridLayout = [];
	        		
	        		gridLayout.push({ name: "Action", formatter: function(value, index) {
                							var actionLinks = " ";
                							actionLinks += "<a href='javascript:displayEditItemDialog();'>" + "Edit" + "</a>";
                							actionLinks += "&nbsp;|&nbsp;<a href='javascript:displayApproveDialog();'>" + "Approve" + "</a>";
                							return actionLinks; }, 
                					  field: "Edit,Approve", width: "10%", align: "center" });
	        		gridLayout.push({ name: "Financial Item", field: "FNTRY_TX", width: "10%" , align:"center"} ); 
	        		gridLayout.push({ name: "Effective Date", field: "EFF_STRT_DT", width: "10%" , align:"center" } );  
	        		gridLayout.push({ name: "Last Action", field: "NTRY_STAT_CD", width: "10%" , align:"center" } ); 		        		
	        		gridLayout.push({ name: "User ID", field: "UPDT_USR_ID", width: "10%" , align:"center" } ); 
	        		gridLayout.push({ name: "Last Updated Date", field: "UPDT_TS", width: "10%" , align:"center" } ); 
	        		gridLayout.push({ name: "Type Code", field: "FNTRY_TY_CD", width: "10%" , align:"center", hidden:true } ); 
	        			        		
	        		for (var i = 1 ; i < loopctr  ; i++)	{
	        			var k = i - 1; 	        				        			
	        			gridLayout.push({ name: arrayText[k] , field: "MAN_NTRY_AM" +i, width: "10%" , align:"center" } ); 	        			
	        		 	gridLayout.push({ name: "Parm Code", field: "FNTRY_PARM_TY_CD" +i , width: "5%" , align:"center", hidden:true } ); 
	        		 	gridLayout.push({ name: "Parm Text", field: "FNTRY_PARM_TX" +i , width: "5%" , align:"center", hidden:true } ); 
	        		}; 
	        		
	        		gridLayout.push({ name: "Comment", field: "CMNT_TX", width: "10%" , align:"center" } ); 
	        		
	        		var pgrid = registry.byId('itemGrid'); console.log("pgrid = " + pgrid);
	                if (pgrid) {
	                	console.log("destroy pgrid <=> ");
	                	/*pgrid.destroyRecursive();*/
	                    pgrid.destroy();
	                }
	        		
	                var pp2 = registry.byId('itemGrid'); console.log("pp2 = " + pp2);
	                
	    	        grid = new dojox.grid.EnhancedGrid({
	    	        	id: "itemGrid",
	    	        	width: "80%",
	    	            store: gridStore,
	    	            structure: gridLayout,  
	    	        });
	        		
	    	        var qq = dijit.byId('itemGridDiv');console.log("qq = " + qq);
	    	        
	                /*if (qq) {
	                	require(["dojo/dom"], function(dom){
	            			dojo.forEach(dijit.findWidgets(dom.byId('itemGridDiv')), function(w) {
	            		        w.destroyRecursive();
	            		        });
	            		});
	                }	        			
	    	        
	                var qq2 = dijit.byId('itemGridDiv');console.log("qq2 = " + qq2);*/
	                
	        		grid.placeAt("itemGridDiv");
	        		
	        		console.log("one = " );
	        		
	    	        grid.startup();
	    	        
	    	        console.log("two = " );
	        		
	      });
	    },
	    // The error handler
	    error: function() {
	        alert("error occurred during display financial item !!!!!!!!!!!");
	    }
	});
}

function refreshMesage(obj){
	require(["dojo/dom", 
				"dojo/domReady!" ], function(dom) {
			var resultDiv = dom.byId("message"+obj);
			resultDiv.innerHTML = "";
	});		
}

function updateMessageDiv(mess,obj){
	require(["dojo/dom", 
				"dojo/domReady!" ], function(dom) {
	var resultDiv = dom.byId("message"+obj);
	if(mess=="OK"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/info.gif"></td>'; 
		myhtml += '<td > <b>   Data Saved Successfully  !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;	
	}
	else if(mess=="ERROR"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/stop.gif"></td>'; 
		myhtml += '<td > <b>  Data Save Error   !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;		
	}
	else if(mess=="ERROR1"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/stop.gif"></td>'; 
		myhtml += '<td > <b>  Data Save Error - Duplicate Key  !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;		
	}
	else if(mess=="DOK"){		
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/info.gif"></td>'; 
		myhtml += '<td > <b>  Data Deleted Successfully   !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;		
	}
	else if(mess=="DKO"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/stop.gif"></td>'; 
		myhtml += '<td > <b>  Data Delete Error  !!!!  </b></td>';
		resultDiv.innerHTML+=myhtml;		
	}
	else if(mess=="ADD"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/info.gif"></td>'; 
		myhtml += '<td > <b>   Data Added Successfully  !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;
	}
	else if(mess=="APR"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/info.gif"></td>'; 
		myhtml += '<td > <b>   Data Approved/Rejected Successfully  !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;
	}
	else if(mess=="U"){
		var myhtml="";
		myhtml += '<table> <tr ><td ><img src="/datamart/resources/img/info.gif"></td>'; 
		myhtml += '<td > <b>   Data Updated Successfully  !!!!   </b></td>';
		resultDiv.innerHTML+=myhtml;
	}
	});	
}

function displayEditItemDialog(){
	
	refreshMesage("fe");	
		
	var selected_index = grid.focus.rowIndex;
	var selected_item = grid.getItem(selected_index);
	
	var editcode = grid.store.getValue(selected_item, "NTRY_STAT_CD"); 
	console.log("editcode = " + editcode);	
	
	dijit.byId("editDg3").set('disabled', false);
	dijit.byId("commentDg3").set('disabled', false);
	
	if ( editcode == 'Approved' ) {
		dijit.byId("editDg3").set('disabled', true);	
		dijit.byId("commentDg3").set('disabled', true);	
	}	
			
	dijit.byId("feType3").set('value', grid.store.getValue(selected_item, "FNTRY_TX"));
	dijit.byId("dateDg3").set('value', grid.store.getValue(selected_item, "EFF_STRT_DT"));  
	
	dijit.byId("feType3").set('disabled', true);
	dijit.byId("dateDg3").set('disabled', true);
		
	dijit.byId("hidKey").set('value', grid.store.getValue(selected_item, "FNTRY_TY_CD"));  	
	dijit.byId("commentDg3").set('value', grid.store.getValue(selected_item, "CMNT_TX"));
	
	
	
	
	for (var i = 1 ; i < 18  ; i++)	{
		if (grid.store.getValue(selected_item, "FNTRY_PARM_TX"+i) > ' ') {
			var vartext2 = "FNTRY_PARM_TX"+i; 
			var varamt2 = "MAN_NTRY_AM"+i; 
			var varcode2 = "FNTRY_PARM_TY_CD"+i; 
			console.log("varcode2 = " + varcode2);
						
			if (dijit.byId("manNtryAm"+i) != null ) {
				var v5grid = dijit.byId("manNtryAm"+i); console.log("v5grid = " + v5grid);
				if (v5grid) {
					v5grid.destroy();
				}
			}							
						
			var x = document.createElement("LABEL");
		    var t = document.createTextNode(grid.store.getValue(selected_item, "FNTRY_PARM_TX"+i));
		    x.appendChild(t);  
		    x.setAttribute("class", "dialogLabel"); 
		    x.setAttribute("id", "fntryParmTx"+i); 
		    document.getElementById("varpara").appendChild(x);
		    		    
		    var y = document.createElement("INPUT");
		    y.setAttribute("data-dojo-type", "dijit/form/ValidationTextBox");
		    y.setAttribute("data-dojo-props", "regExp: '[[0-9]+(\.[0-9]{1,2})?]', invalidMessage: 'The value entered must be numeric with 2 digits after decimal.'" );
		    /*y.setAttribute("type", "text");*/
		    y.setAttribute("value", grid.store.getValue(selected_item, "MAN_NTRY_AM"+i).trim().replace(/\,/g,''));
		    y.setAttribute("class", "ruleElement"); 
		    y.setAttribute("id", "manNtryAm"+i); 
		    y.setAttribute("disabled", "false");
		    if ( editcode == 'Approved' ) {
		    	 y.setAttribute("disabled", "true");
			}			    
		    document.getElementById("varpara").appendChild(y); 			      
		    
		    var h = document.createElement("INPUT");
		    h.setAttribute("type", "hidden");
		    h.setAttribute("value", grid.store.getValue(selected_item, "FNTRY_PARM_TY_CD"+i));
		    h.setAttribute("id", "fntryParmTyCd"+i); 
		    document.getElementById("varpara").appendChild(h); 		    
		    
			}
	};
	
	require(["dojo/parser"], function(parser){
    	parser.parse("varpara");
    	});	
    	
		
	itemDialogDiv3.show();	
	
}

function editDialog3(){
	
	refreshMesage("fe");
	
	var finType3 = dijit.byId('feType3').get('value');
	var dateDg3 = dijit.byId('dateDg3').get('value');
	var commentDg3 = dijit.byId('commentDg3').get('value');
	var hidKey3 = dijit.byId('hidKey').get('value');	
	
	console.log("finType3 = " + finType3);
	console.log("dateDg3 = " + dateDg3);
	console.log("commentDg3 = " + commentDg3);
	console.log("hidKey3 = " + hidKey3);
	
	updtUsrId = " ";  
	/*tempEndDt = "2099-12-31";*/ 	
	
	var editAmount = getEditAmount();	
	
	for (var i = 1 ; i < 18  ; i++)	{
		var vartext3 = "fntryParmTx"+i; 
		var varamt3 = "manNtryAm"+i; 
		var varcode3 = "fntryParmTyCd"+i; 		
						
		if (dijit.byId("manNtryAm"+i) != null ) {
			var fntryParmTx = document.getElementById("fntryParmTx"+ i).value;
			var manNtryAm = dijit.byId("manNtryAm"+i).value;
			var fntryParmTyCd = document.getElementById("fntryParmTyCd"+i).value;
			console.log("fntryParmTx = " + fntryParmTx);
			console.log("manNtryAm = " + manNtryAm);
			console.log("fntryParmTyCd = " + fntryParmTyCd);			
		}
				
	};		    
			
	dojo.xhrGet({
		
	    // The URL of the request
	    url: "/datamart/fe/" + "action=clickEditFI",
	    handleAs: "text",
	    content:{
	    	fntryTyCd: "" + hidKey3,
	    	effStrtDt: "" + dateDg3,
	    	effEndDt: "" + dateDg3, 
	    	cmntTx: "" + commentDg3, 
	    	updtUsrId: "" + updtUsrId,	    	
	    	codeValue: "" + editAmount	 	    	
	    },
	    // The success callback with result from server
	    load: function(newContent) {
	    	
	    	var myNode = document.getElementById("varpara");
	    	while (myNode.firstChild) {
	    	    myNode.removeChild(myNode.firstChild);
	    	}
	    	console.log(' newContent => ' + newContent); 		    	
	    	console.log(' edit return call - ft ' + hidKey3); 
	    	
	    	displayFinancialItem(newContent, hidKey3);	
	    	    	
	    	itemDialogDiv3.hide();
	    },
	    // The error handler
	    error: function() {
	        alert("error occured during edit the financial manual entry !!!!!!!!!!!");
	    }
	});    
}

function getEditAmount(){	
		
	var amountList = "";
	
	for (var i = 0 ; i < 18  ; i++){
		
		if (document.getElementById("fntryParmTyCd"+i) != null) {
								
			if (amountList == ""){
				amountList += document.getElementById("fntryParmTyCd"+i).value.trim() + ";" + dijit.byId("manNtryAm"+i).value.trim();				
			}
			else{
				amountList += "/" + document.getElementById("fntryParmTyCd"+i).value.trim() + ";" + dijit.byId("manNtryAm"+i).value.trim();		
			}
		}	
	}
	console.log(amountList); 
	return amountList;
}

function displayApproveDialog(){
	
	refreshMesage("fe");
	
	/*var item_grid = dijit.byId("itemGrid");*/
	
	var selected_index = grid.focus.rowIndex;
	var selected_item = grid.getItem(selected_index);
	
	var appcode = grid.store.getValue(selected_item, "NTRY_STAT_CD"); 
	console.log("appcode = " + appcode);
	
	dijit.byId("approveDg4").set('disabled', false);
	dijit.byId("rejectDg4").set('disabled', false);
	
	if ( appcode == 'Approved' ) {
		dijit.byId("approveDg4").set('disabled', true);
		dijit.byId("rejectDg4").set('disabled', true);
		/*alert(' This Approved item cannot approve again');
		return; */
	}	
			
	dijit.byId("feType4").set('value', grid.store.getValue(selected_item, "FNTRY_TX"));
	dijit.byId("dateDg4").set('value', grid.store.getValue(selected_item, "EFF_STRT_DT"));  	
	dijit.byId("hidKey4").set('value', grid.store.getValue(selected_item, "FNTRY_TY_CD"));  	
	dijit.byId("commentDg4").set('value', grid.store.getValue(selected_item, "CMNT_TX"));
	
	dijit.byId("feType4").set('disabled', true);
	dijit.byId("dateDg4").set('disabled', true);
	dijit.byId("commentDg4").set('disabled', true);
		
	for (var i = 1 ; i < 18  ; i++)	{
		if (grid.store.getValue(selected_item, "FNTRY_PARM_TX"+i) > ' ') {
			
			if (dijit.byId("manNtryAm"+i) != null ) {
				var v6grid = dijit.byId("manNtryAm"+i); console.log("v6grid = " + v6grid);
				if (v6grid) {
					v6grid.destroy();
				}
			}	
			
			var x4 = document.createElement("LABEL");
		    var t4 = document.createTextNode(grid.store.getValue(selected_item, "FNTRY_PARM_TX"+i));
		    x4.appendChild(t4);  
		    x4.setAttribute("class", "dialogLabel"); 
		    x4.setAttribute("id", "fntryParmTx"+i); 
		    document.getElementById("var4para").appendChild(x4);
		    		    
		    var y4 = document.createElement("INPUT");
		    /*y4.setAttribute("type", "text");*/
		    y4.setAttribute("data-dojo-type", "dijit/form/TextBox");
		    y4.setAttribute("value", grid.store.getValue(selected_item, "MAN_NTRY_AM"+i).trim());
		    y4.setAttribute("class", "ruleElement"); 
		    y4.setAttribute("id", "manNtryAm"+i); 
		    y4.setAttribute("disabled","disabled");
		    document.getElementById("var4para").appendChild(y4); 	
		    
		    var h4 = document.createElement("INPUT");
		    h4.setAttribute("type", "hidden");
		    h4.setAttribute("value", grid.store.getValue(selected_item, "FNTRY_PARM_TY_CD"+i));
		    h4.setAttribute("id", "fntryParmTyCd"+i); 
		    document.getElementById("var4para").appendChild(h4); 		    
		    
			}
	};
	
	require(["dojo/parser"], function(parser){
    	parser.parse("var4para");
    	});	
		
	itemDialogDiv4.show();		
}


function approveItem(ppstatus){
	
	refreshMesage("fe");
	
	var finType4 = dijit.byId('feType4').get('value');
	var dateDg4 = dijit.byId('dateDg4').get('value');
	var hidKey4 = dijit.byId('hidKey4').get('value');	
	
	console.log("finType4 = " + finType4);
	console.log("dateDg4 = " + dateDg4);
	console.log("hidKey4 = " + hidKey4);
	console.log("ppstatus = " + ppstatus);		
	
	/*var check = confirm("Are you sure you want to approve this Financial Item?");*/	
	
	var updtUsrId = dijit.byId('hidUsrid4').get('value');  
	console.log("updtUsrId = " + updtUsrId);	

		
	dojo.xhrGet({
					
	    // The URL of the request
	    url: "/datamart/fe/" + "action=clickApproveFI",
	    handleAs: "text",
	    content:{
	    	fntryTyCd: "" + hidKey4,
	    	effStrtDt: "" + dateDg4,
	    	ntryStatCd: "" + ppstatus, 
	    	updtUsrId: "" + updtUsrId	 
	    },
	    // The success callback with result from server
	    load: function(newContent) {
	    	
	    	var myNode = document.getElementById("var4para");
	    	while (myNode.firstChild) {
	    	    myNode.removeChild(myNode.firstChild);
	    	}
   		
	    	console.log(" return call - hidKey4 = " + hidKey4);
	    	displayFinancialItem(newContent, hidKey4);
	    	 	    	
	    },
	       // The error handler
	       error: function() {
	           alert("error occured during approve/reject financial manual entry !!!!!");
	       }
		});
	
	itemDialogDiv4.hide();	
}

function deleteItem(){
	
	refreshMesage("fe");
	
	var selected_index = grid.focus.rowIndex;
	var selected_item = grid.getItem(selected_index);
	
	var itemGridDel = dijit.byId("itemGrid");
	
	var check = confirm("Are you sure you want to delete this Financial Item?");
	
	if (selected_index >= 0 && check){
		
		var fntryTyCd = itemGridDel.store.getValue(selected_item, 'FNTRY_TY_CD');
		var effStrtDt = itemGridDel.store.getValue(selected_item, 'EFF_STRT_DT');
		
		for (var i = 1 ; i < 18  ; i++)	{
			if ( fntryParmTyCd(i) !=null ) {
				var fntryParmTyCd = itemGridDel.store.getValue(selected_item, 'FNTRY_PARM_TY_CD' + i );
				
				dojo.xhrGet({
					
				    // The URL of the request
				    url: "/datamart/fe/" + "action=clickDeleteFI",
				    handleAs: "text",
				    content:{
				    	fntryTyCd: "" + fntryTyCd,
				    	effStrtDt: "" + effStrtDt,
				    	fntryParmTyCd: "" + fntryParmTyCd,		    	
				    },
				    // The success callback with result from server
				    load: function(newContent) {
				    	if(newContent=="OK"){
							newContent="DOK";
						}else{
							newContent="DKO";
						}				    	
				    },
			        // The error handler
			        error: function() {
			            alert("error js-di5 !!!!!!!!!!");
			        }
			    });				
			}; 
		}; 
		
		grid.store.deleteItem(selected_item);
		
	}
}


function cancelDialog1(){
	
	itemDialogDiv1.hide();
}

function cancelDialog2(){
	require(["dojo/dom"], function(dom){
		dojo.forEach(dijit.findWidgets(dom.byId('varlabelhtml')), function(w) {
	        w.destroyRecursive();
	        });
	});
		
	var v2grid = dijit.byId("labelctr"); 
	if (v2grid) {
		v2grid.destroy();
	}
	
	for (var i = 0 ; i < 18  ; i++)	{
		if (dijit.byId("parmid"+i) != null ) {
			var v2agrid = dijit.byId("parmid"+i); console.log("v2agrid = " + v2agrid);
			if (v2agrid) { v2agrid.destroy(); }
		}
		if (dijit.byId("parmtext"+i) != null ) {
			var v2bgrid = dijit.byId("parmtext"+i); console.log("v2bgrid = " + v2bgrid);
			if (v2bgrid) { v2bgrid.destroy(); }
		}
		if (dijit.byId("parmty"+i) != null ) {
			var v2cgrid = dijit.byId("parmty"+i); console.log("v2cgrid = " + v2cgrid);
			if (v2cgrid) { v2cgrid.destroy(); }
		}	
	}
		
	itemDialogDiv2.hide();
}

function cancelDialog3(){
	require(["dojo/dom"], function(dom){
		dojo.forEach(dijit.findWidgets(dom.byId('varlabelhtml')), function(w) {
	        w.destroyRecursive();
	        });
	});
	
	var myNode = document.getElementById("varpara");
	while (myNode.firstChild) {
	  	    myNode.removeChild(myNode.firstChild);
	}
	
	for (var i = 1 ; i < 18  ; i++)	{
		if (dijit.byId("manNtryAm"+i) != null ) {
			var v3grid = dijit.byId("manNtryAm"+i); console.log("v3grid = " + v3grid);
			if (v3grid) {
				v3grid.destroy();
			}
		}	
	}
		
	itemDialogDiv3.hide();
}

function cancelDialog4(){
	require(["dojo/dom"], function(dom){
		dojo.forEach(dijit.findWidgets(dom.byId('varlabelhtml')), function(w) {
	        w.destroyRecursive();
	        });
	});
	
	var myNode = document.getElementById("var4para");
	while (myNode.firstChild) {
	  	    myNode.removeChild(myNode.firstChild);
	}
	
	for (var i = 1 ; i < 18  ; i++)	{
		if (dijit.byId("manNtryAm"+i) != null ) {
			var v4grid = dijit.byId("manNtryAm"+i); console.log("v4grid = " + v4grid);
			if (v4grid) {
				v4grid.destroy();
			}
		}	
	}
	    
	itemDialogDiv4.hide();
}

function addFinancialItemDialog(){
		
	itemDialogDiv1.show();
}

function addDialog1(){
	
	require(["dojo/dom"], function(dom){
		dojo.forEach(dijit.findWidgets(dom.byId('varlabelhtml')), function(w) {
	        w.destroyRecursive();
	        });
	});
		
	var v0grid = dijit.byId("varlabelhtml"); 
	if (v0grid) {
		v0grid.destroy();
	}
	
	var v1grid = dijit.byId("labelctr"); 
	if (v1grid) {
		v1grid.destroy();
	}
	
	for (var i = 0 ; i < 18  ; i++)	{
		if (dijit.byId("parmid"+i) != null ) {
			var v1agrid = dijit.byId("parmid"+i); console.log("v1agrid = " + v1agrid);
			if (v1agrid) { v1agrid.destroy(); }
		}
		if (dijit.byId("parmtext"+i) != null ) {
			var v1bgrid = dijit.byId("parmtext"+i); console.log("v1bgrid = " + v1bgrid);
			if (v1bgrid) { v1bgrid.destroy(); }
		}
		if (dijit.byId("parmty"+i) != null ) {
			var v1cgrid = dijit.byId("parmty"+i); console.log("v1cgrid = " + v1cgrid);
			if (v1cgrid) { v1cgrid.destroy(); }
		}	
	}
	
	var myNode = document.getElementById("varlabelhtml");
	while (myNode.firstChild) {
	  	    myNode.removeChild(myNode.firstChild);
	}
	
	var finType11 = dijit.byId('feDropDownDg').get('value');
	
	console.log("fin11 = " + finType11);
	
	var finType12 = dijit.byId('feDropDownDg').get('displayedValue');
	
	console.log("fin12 = " +finType12);
	
	dojo.byId("fecode1").value = finType11; 	
	dojo.byId("fetype1").value = finType12; 
	
	dojo.xhrGet({
		
		url: "/datamart/fe/" + "action=clickDisplayFIParm",
	    handleAs: "text",
	    content:{
	    	financialType: "" + finType11 }, 
	   	   
	    // The success callback with result from server
	    load: function(newContent) {
	    	
	    console.log(newContent);	
	    console.log(JSON.stringify(newContent));
	    
	    dojo.byId("varlabelhtml").innerHTML = newContent; 
	    
	    require(["dojo/parser"], function(parser){
	    	parser.parse("varlabelhtml");
	    	});   
	    },
	    // The error handler
	    error: function() {
	        alert("error occurred during display new financial manual parm entry !!!!!!!!!!!");
	    }
	});
			
	itemDialogDiv2.show();
	
}

function addDialog2(){
	
	var fecode1 = dijit.byId('fecode1').get('value');
	console.log(fecode1); 
		
	var datedg = dijit.byId('dateDg').get('value');
	console.log(datedg); 
	
	var fmtdatedg = " "; 
	fmtdatedg = datedg.toISOString().slice(0,10);
	console.log(fmtdatedg);
		
	var commentdg = dijit.byId('commentDg').get('value');
	console.log(commentdg);
	
	updtUsrId = " ";  
	/*tempEndDt = "2099-12-31"; */
	
	var codeValue = getCodeValues();	
			
	dojo.xhrGet({
		
		url: "/datamart/fe/" + "action=clickAddFIParm",
	    handleAs: "text",
	    content:{
	    	fntryTyCd: "" + fecode1,
	    	effStrtDt: "" + fmtdatedg,
	    	effEndDt: "" + fmtdatedg, 
	    	cmntTx: "" + commentdg, 
	    	updtUsrId: "" + updtUsrId,	    	
	    	codeValue: "" + codeValue	    	
	    	}, 
	   	   
	    // The success callback with result from server
	    load: function(newContent) {
	    	console.log(' newContent => ' + newContent); 						
	    	console.log(' return call - ft ' + fecode1); 
	    	displayFinancialItem(newContent, fecode1);	    		    	
	    	/*console.log(JSON.stringify(newContent));*/
	    
	    },
	    // The error handler
	    error: function(e) {
	    	console.log(' e => ' + e); 	    	 
	        alert("error occurred when adding new financial manual entry !!!!!!!!!!!");
	    }
	});
	
	dijit.byId('dateDg').set("value", null);
	dijit.byId('commentDg').set("value","");
	
	itemDialogDiv1.hide();
	itemDialogDiv2.hide();
}


function getCodeValues(){
	
	var counter = dijit.byId('labelctr').get('value'); 
	console.log("labelctr = " + counter); 
		
	var parmlist = "";
	
	for (var i = 0 ; i < counter  ; i++){
		
		var pcode = "parmty" + i; 
		var pvalue = "parmtext" + i; 
		console.log(pcode);console.log(pvalue);  
		
		if (parmlist == ""){
			parmlist += dijit.byId(pcode).get('value').trim() + ";" + dijit.byId(pvalue).get('value').trim();				
		}
		else{
			parmlist += "/" + dijit.byId(pcode).get('value').trim() + ";" + dijit.byId(pvalue).get('value').trim();		
		}
	}
	console.log(parmlist); 
	
	return parmlist;
}

function clearAllFinancialItem(){	

	dijit.byId('feDropDown').set("value", null);
	dijit.byId('appItem').reset();
	dijit.byId('date1').set("value", null);
	dijit.byId('date2').set("value", null);
	
	refreshMesage("fe");
	
	require(["dijit/registry"], function(registry){
		var pcgrid = registry.byId('itemGrid'); console.log("pcgrid = " + pcgrid);
        if (pcgrid) {
        	console.log("destroy pcgrid <=> ");        	
            pcgrid.destroy();
        }		
	});
	
}
