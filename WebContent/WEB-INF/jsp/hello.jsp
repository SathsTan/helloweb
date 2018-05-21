
<!DOCTYPE html>
<html lang="en">
<head>
<title>hellloweb</title>

<style type="text/css">	
    
     @import "http://ajax.googleapis.com/ajax/libs/dojo/1.4/dijit/themes/soria/soria.css"; 
	@import "http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojox/grid/resources/soriaGrid.css"; 

	<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.4/dojo/dojo.js" data-dojo-config="async: true"></scrip>
	<link rel="stylesheet" href="/helloweb/resources/sample.css"/>
</style>	
	
	
<script type="text/javascript">




</script>	
	
	
</head>
<body style="width:100%;">

<br />
<div id="messagefe"  align="left"></div>
	<br/>
<div id="fe_header" class="header">
	<div>
		Search Criteria
	</div>
</div>
<br />

<table>
	<tr>
		<td>
			<div id="fe_lable" class="itemLabel" >
				Financial Entry Type:
			</div>
		</td>
		<td>
			<div id="div_fe_id3" class="dialogElement" style="float: left; padding-right: 2em;">
			  	<input data-dojo-type="dijit/form/FilteringSelect"
			    data-dojo-props="store:financialTypesStore, searchAttr:'fntryTx'"
			    name="feDropDown"
			    id="feDropDown"
			    data-dojo-id="feDropDown"
			    />	    
			</div>	
		</td>
		<td>
			<div class="itemLabel" >Approved Item: </div>
		</td>
		<td>
			<div class="dialogElement">
	 			<select data-dojo-type="dijit/form/FilteringSelect" id="appItem" name="appItem">
				    <option value="" selected> ALL </option>
				    <option value="P"> Pending </option>
				    <option value="A"> Approved </option>
				    <option value="R"> Rejected </option>
				</select>
			</div>
		</td>				
	</tr>
</table>
<br />
<table>		
	<tr>
		<td>
			<div class="itemLabel" >Effective Date From: </div>
		</td>
		<td>
			<div style="float: left; padding-right: 2em;">
				<input type="text" name="date1" id="date1"
				data-dojo-type="dijit/form/DateTextBox" />
			</div>
		</td>
		<td>
			<div class="itemLabel" >Effective Date To:</div>
		</td>
		<td>
			<div style="float: left;">
				<input type="text" name="date2" id="date2"
				data-dojo-type="dijit/form/DateTextBox" />
			</div>
		</td>		
	</tr>	
	<tr>
		<td colspan="6"></td>
		<td colspan="2">
			<button data-dojo-type="dijit/form/Button" type="button"
			id="displayFeButton" onClick="displayFinancialItem()">Display</button>	
			<button data-dojo-type="dijit/form/Button" type="button"
			id="clearAllFeButton" onClick="clearAllFinancialItem()">Clear All</button>	
		</td>
		<td>
		</td>
	</tr>
</table>			

<br/>

<div>
	<div id="add_button" >
		<button data-dojo-type="dijit/form/Button" type="button"
			id="addButton" onClick="addFinancialItemDialog()">Add New Financial Item</button>
	</div>
</div>	

<br/>
<br/>
<br/>

<div id="fe_header2" class="header">
	<div>
		Financial Items
	</div>
</div>

<div id="fe_contentplaceholder1" class="contentplaceholder">
	<div>
		Select Financial Entry Type to display Financial Items
	</div>
</div>

<br/>

<div id="itemGridDiv" data-dojo-id="itemGridDiv"  class="grid">
</div>

<br />

<div style="height: 5%; width: 55%; float: left">
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv1" title="Add Financial Manual Entry" class="dialog" id="itemDialogDiv1">
	<div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Financial Entry Type:</div>
			<div class="dialogElement">
			  	<input data-dojo-type="dijit/form/FilteringSelect"
			    data-dojo-props="store:financialTypesStore, searchAttr:'fntryTx'"
			    name="feDropDownDg"
			    id="feDropDownDg"
			    data-dojo-id="feDropDownDg"
			    class="filteringSelect" />	    
			</div>				
		</div>		
    </div>
        
    <br><br><br><br><br><br><br>
	
    <div class="dijitDialogPaneActionBar" >
        <button data-dojo-type="dijit/form/Button" type="button" onClick="addDialog1()"
                id="addDg1">Add</button>       
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog1()"
                id="cancelDg1">Cancel</button>                               
    </div>
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv2" title="Add Financial Manual Entry " class="dialog" id="itemDialogDiv2">
	<div class="dijitDialogPaneContentArea" >
    	<div >
			<div class="dialogLabel">Financial Entry Type:</div>
			<div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/TextBox" name="fetype1" id="fetype1" >
	        </div>	
	        <div class="dialogElement">
	        	<input type="hidden" data-dojo-type="dijit/form/TextBox" name="fecode1" id="fecode1" >
	        </div>		
		</div>
		 <br/>
		 
		<div >
	        <div class="dialogLabel">Effective Date: </div>
	        <div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/DateTextBox" value="now" name="dateDg" id="dateDg" >
	        </div>		          	
	    </div> 
	     <br/>
	     
	    <div id="varlabelhtml">
        </div> 
         <br/>
                   
        <div >
	        <div class="dialogLabel">Comment: </div>
	        <div class="dialogElement">
	        	<input data-dojo-type="dijit/form/TextBox" name="commentDg" id="commentDg" >
	        </div>
        </div>
         <br/>
         
    </div>
    
    <br><br><br><br><br><br><br>
	
    <div class="dijitDialogPaneActionBar" >
        <button data-dojo-type="dijit/form/Button" type="button" onClick="addDialog2()"
                id="addDg2">Add</button>
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog2()"
                id="cancelDg2">Cancel</button>                               
    </div>
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv3" title="Edit Financial Manual Entry " class="dialog" id="itemDialogDiv3">
	<div class="dijitDialogPaneContentArea" >
    	<div class="gridtable">
			<div class="dialogLabel">Financial Entry Type:</div>
			<div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/TextBox" name="feType3" id="feType3" >
	        </div>			
		</div>
		<br/>
		
		<div class="gridtable">
	        <div class="dialogLabel">Effective Date: </div>
	        <div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/TextBox" name="dateDg3" id="dateDg3" >
	        </div>		          	
	    </div> 
	    <br/>
	    
	    <div id="varpara" class="gridtable"> 
		</div>	    
        <br/>
            
        <div class="gridtable" >
	        <div class="dialogLabel">Comment: </div>
	        <div class="dialogElement">
	        	<input data-dojo-type="dijit/form/TextBox" name="commentDg3" id="commentDg3" >
	        </div>
        </div>
        <br/>
        
    </div> 
    
    <div class="dialogElement">
	     	<input type="hidden" data-dojo-type="dijit/form/TextBox" name="hidKey" id="hidKey" >	   
	</div> 
	
	<br/>
	<br/>
	<br/> 
         	
    <div class="dijitDialogPaneActionBar" >
        <button data-dojo-type="dijit/form/Button" type="button" onClick="editDialog3()"
                id="editDg3">Save</button>
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog3()"
                id="cancelDg3">Cancel</button>                               
    </div>
</div>

<div data-dojo-type="dijit/Dialog" data-dojo-id="itemDialogDiv4" title="Approve Financial Manual Entry" class="dialog" id="itemDialogDiv4">
	<div class="dijitDialogPaneContentArea" >
    	<div class="gridtable">
			<div class="dialogLabel">Financial Entry Type:</div>
			<div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/TextBox" name="feType4" id="feType4" >
	        </div>			
		</div>
		<br/>
		
		<div class="gridtable">
	        <div class="dialogLabel">Effective Date: </div>
	        <div class="dialogElement">
	        	<input type="text" data-dojo-type="dijit/form/TextBox" name="dateDg4" id="dateDg4" >
	        </div>		          	
	    </div> 
	    <br/>
	    
	    <div id="var4para" class="gridtable"> 
		</div>	    
        <br/>
            
        <div class="gridtable" >
	        <div class="dialogLabel">Comment: </div>
	        <div class="dialogElement">
	        	<input data-dojo-type="dijit/form/TextBox" name="commentDg4" id="commentDg4" >
	        </div>
        </div>
        <br/>
        
    </div> 
    
    <div class="dialogElement">
	     	<input type="hidden" data-dojo-type="dijit/form/TextBox" name="hidKey4" id="hidKey4" >	     	
	</div>  
	
	<br/>
	<br/>
	<br/>
         	
    <div class="dijitDialogPaneActionBar" >
        <button data-dojo-type="dijit/form/Button" type="button" onClick="approveItem('A')"
                id="approveDg4">Approve</button>
        <button data-dojo-type="dijit/form/Button" type="button" onClick="approveItem('R')"
                id="rejectDg4">Reject</button>        
        <button data-dojo-type="dijit/form/Button" type="button" onClick="cancelDialog4()"
                id="cancelDg4">Cancel</button>                               
    </div>
</div>

</body>
</html>