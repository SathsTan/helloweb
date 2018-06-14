<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<html>

<head>
<title>Journal Allocation</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge"/>
       

		
		<link rel="stylesheet" href="https://qa-www.pllcfiles.inautix.com/dojo/1.10.6.1/dijit/themes/soria/soria.css"/>
		<link rel="stylesheet" href="https://qa-www.pllcfiles.inautix.com/dojo/1.10.6.1/dojox/grid/resources/soriaGrid.css"/>		
		<link rel="stylesheet" href="https://qa-www.pllcfiles.inautix.com/dojo/1.10.6.1/dojox/grid/enhanced/resources/EnhancedGrid_rtl.css"/>				
		
		<link rel="stylesheet" href="resources/css/JMAllocation.css"/> 		
		<script src="resources/js/JMAllocation.js" data-dojo-config="async: true"></script>
			
		<script>dojoConfig = {parseOnLoad: true, isDebug: true};</script>
		<script src="https://qa-www.pllcfiles.inautix.com/dojo/1.10.6.1/dojo/dojo.js" data-dojo-config="async: true"></script>	
				
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
<br />
<div id="messagefe"  align="left" style="padding-left: 2em;"></div>
	<br/>
<div id="fe_header" class="header">
	<div>
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
			<div class="dialogElement" style="padding-right: 0em;">
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
			<div style="float: left; padding-right: 2em;" id="search2">
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
			id="displayFeButton" onclick="displayFinancialItem()">Display</button>	
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
	<div id="add_button" style="padding-left: 2em;">
		
					<button data-dojo-type="dijit/form/Button" type="button"
						id="addButton" onclick="addFinancialItemDialog()">Add New Allocation</button>
			
	</div>
</div>	
<br/>
<div id="fe_header2" class="header" >
	<div>
		Allocation Details
	</div>
</div>
<div id="fe_contentplaceholder1" class="contentplaceholder">
	<div>
		Allocation Update Details
	</div>
</div>
<br/>
<div id="itemGridDiv"  class="grid">
</div>
<br />
<div style="height: 5%; width: 55%; float: left">
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv1" title="Add Financial Manual Entry" class="dialog" id="itemDialogDiv1">
	<div class="dijitDialogPaneContentArea" padding-left="2em">
    	<div >
			<div class="dialogLabel">Funding Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="fundAcct" id="fundAcct" data-dojo-id="fundAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    <br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Trading Account :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" maxlength="9" name="tradeAcct" id="tradeAcct" data-dojo-id="tradeAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    
    <br/>
    <div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Allocation Percentage :</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/TextBox" name="percent" id="percent" data-dojo-id="tradeAcct" class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
    <br/>
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

</div>
</body>
</html>
