<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>

<head>
<title>Journal Allocation</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
       
<style type="text/css">
		
		@import "https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dijit/themes/soria/soria.css";
		@import "https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dojox/grid/resources/soriaGrid.css";
		
	
</style>		
	<!-- <link rel="stylesheet" href="https://${cdnLoc}/dojo/${dojoVersion}/dijit/themes/soria/soria.css"/>
		<link rel="stylesheet" href="https://${cdnLoc}/dojo/${dojoVersion}/dojox/grid/resources/soriaGrid.css"/> --> 
		<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dojox/grid/enhanced/resources/EnhancedGrid.css"/>				
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>		
		<link rel="stylesheet" href="resources/css/JMAllocation.css"/> 		
		<script src="resources/js/JMAllocation.js" data-dojo-config="async: true"></script>
			
		<script>dojoConfig = {parseOnLoad: true, isDebug: true};</script>
		<script src="https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dojo/dojo.js" data-dojo-config="async: true"></script>	
				
		<script>			
	      		
			require(["dojo/dom", "dojo/parser", "dijit/ConfirmDialog",
					"dijit/form/FilteringSelect", "dijit/form/Form",
					"dojo/store/Memory", "dojox/widget/Standby",
					"dijit/Dialog", "dijit/form/Button",
					"dojo/dom-form","dojo/json","dijit/Tooltip",
					"dijit/form/FilteringSelect", "dijit/form/TextBox","dijit/form/RadioButton",
					"dijit/layout/TabContainer", "dojo/data/ItemFileReadStore", "dojo/data/ItemFileWriteStore",
					"dojo/data/ObjectStore", "dojo/json", "dojo/on", "dijit/form/DateTextBox",
					"dojox/grid/DataGrid", "dojox/layout/ContentPane",
					"dojo/domReady!"]);
		</script>	
	

<script type="text/javascript" defer="defer">


	

</script>
</head>
<body style="width:100%" class="soria">	
<div >
	<div align="center">
		<h2 style="font-family: Verdana; font-weight: bold; font-color: #000066;"> <font color="#000066"> Journal Machine </font></h2> 
	</div>	
<div id="fe_header" class="header">
	<div style="font-family: verdana; font-size: 10pt; font-weight: bold;">
		Search Criteria
	</div>
</div>
<br />
<table style="padding-left: 2em;">
	<tr>
	
		<td>
			<div id="app_item" class="itemLabel" >Search By       </div>
		</td>
		<td>
			<div class="dialogElement" style="padding-right: 0em; font-weight: normal;">
	 			<select data-dojo-type="dijit/form/FilteringSelect" id="selItem" name="selItem" onchange="changeFilter();">
				    <option value="ACCT" selected="selected"> Account </option>
				    <option value="OFFC"> IBD-Office-IP </option>				    
				</select>
			</div>
		</td>		
		
		<td>
			<div style="float: left; padding-right: 0em;" id="search1">
				<input type="text" name="Acct" id="Acct" data-dojo-type="dijit/form/TextBox" />
			</div>
		</td>
		<td>
			<div style="float: left;" id="search2">
				<input type="text" maxlength="3" size="4" name="ibd" id="ibd" data-dojo-type="dijit/form/TextBox" style="display: none; width: 50px;"/>
				<span id="id1" style="display: none;">-</span><input type="text" maxlength="3" size="4" name="ofc" id="ofc" data-dojo-type="dijit/form/TextBox" style="display: none; width: 50px; "/>
				<span id="id2" style="display: none;">-</span><input type="text" maxlength="3" size="4" name="ips" id="ips" data-dojo-type="dijit/form/TextBox" style="display: none; width: 50px;"/>
			</div>
		</td>		
	</tr>
	<tr>
		<td colspan="6"></td>
		<td colspan="2">
			<button data-dojo-type="dijit/form/Button" type="button"
			id="displayFeButton" onclick="displayFundingItem()">Display</button>	
			<button data-dojo-type="dijit/form/Button" type="button"
			id="clearAllFeButton" onclick="clearAllFinancialItem()">Clear All</button>	
		</td>
		<td>
		</td>
	</tr>
</table>
<br />
<table>		
	
	
</table>			
<br/>
<div>
<table>
<tr>
	<td>
		<div id="add_button" style="padding-left: 2em;">
		
					<button data-dojo-type="dijit/form/Button" type="button"
						id="addButton" onclick="addFinancialItemDialog()" style="font-weight: bold;" >Add New Allocation</button>
			
		</div>
	</td>
	<td>
		<div id="add_button" style="padding-left: 2em;">
		
					<button data-dojo-type="dijit/form/Button" type="button"
						id="updateButton" onclick="UpdateAllocation()" style="font-weight: bold;">Update All</button>
			
		</div>
	</td>
	</tr>
</table>
</div>	
<div id="messagefe"  align="left" style="padding-left: 2em;" class="status"></div>
<div id="fe_header2" class="header" >
	<div id="gridCaption" style="font-family: verdana; font-size: 10pt; font-weight: bold;">
		Allocation Details
	</div>
</div>
<div id="fe_contentplaceholder1" class="contentplaceholder">
	<div>
		Allocation Update Details
	</div>
</div>
<br/>
<div data-dojo-type="dojox.grid.DataGrid" id="itemGridDiv" data-dojo-id="itemGridDiv" class="grid">
</div>
<br />
<div style="height: 5%; width: 55%; float: left">
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv1" title="Add Financial Manual Entry" class="dialog" id="itemDialogDiv1">
	
	<div class="dijitDialogPaneContentArea" padding-left="2em">
    	<div >
			<div class="dialogLabel">Funding Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="fundAcct" id="fundAcct" data-dojo-id="fundAcct" class="filteringSelect" disabled/>	    
			</div>				
		</div>		
    </div>
    <br/><br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Trading Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="tradeAcct" id="tradeAcct" data-dojo-id="tradeAcct" class="filteringSelect" data-dojo-props="required:true"/>	    
			</div>				
		</div>		
    </div>
    
    <br/><br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Allocation Percentage :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" name="percent" id="percent" data-dojo-id="tradeAcct" class="filteringSelect" data-dojo-props="required:true"/>	    
			</div>				
		</div>		
    </div>
    <br/> <br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Account Title : </div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" name="AcctTitle" id="AcctTitle" data-dojo-id="tradeAcct" class="filteringSelect" disabled="disabled"/>	    
			</div>				
		</div>		
    </div>
    <br/><br/><br/><br/>
	
    <div class="dijitDialogPaneActionBar" >
        <button data-dojo-type="dijit/form/Button" type="button" onClick="addDialog1()"
                id="addDg1">Add</button>       
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog1()"
                id="cancelDg1">Cancel</button>                               
    </div>
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv3" title="Edit Allocation Entry " class="dialog" id="itemDialogDiv3" oncancel="cancelDialog3()">
<form data-dojo-type="dijit/form/Form" id="financialEntryEditForm" data-dojo-id="financialEntryEditForm" action="" method="get">
<div class="dijitDialogPaneContentArea" padding-left="2em">
    	<div >
			<div class="dialogLabel">Funding Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="fundAcctE" id="fundAcctE" data-dojo-id="fundAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    <br/><br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Trading Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="tradeAcctE" id="tradeAcctE" data-dojo-id="tradeAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    
    <br/> <br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Allocation Percentage :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" name="percentE" id="percentE" data-dojo-id="tradeAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    <br/> <br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Account Title : </div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" name="AcctTitleE" id="AcctTitleE" data-dojo-id="tradeAcct" class="filteringSelect" disabled="disabled"/>	    
			</div>				
		</div>		
    </div>
    <br/><br/>
    <div class="dialogElement">
	     	<input type="hidden" data-dojo-type="dijit/form/TextBox" name="hidKey" id="hidKey" >	   
	</div> 
	
	<br/>
	<br/>
	<br/> 
         	
    <div class="dijitDialogPaneActionBar" >
 		<button data-dojo-type="dijit/form/Button" type="button" data-dojo-id="editDg3" onClick="EditDialogSave()">Save </button>
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog3()"
                id="cancelDg3">Cancel</button>                               
    </div>
</form>
</div>



</div>
</body>
</html>
