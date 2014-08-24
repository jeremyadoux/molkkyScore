/*globals*/
var warnings = {
	playerName:{
		empty:"Please provide a valid player name",
		unique:"Player name already in use",
		tooFew:"At least 2 player names are required"
	}
};

var lightColor = '#FFFFFF';
var alertColor = '#D82A25';
var darkColor = '#020000';
var accentColor = '#2DBDE1';

function warn(alertElement,warning){
	alertElement.text(warning);
	alertElement.show();
}

function initializeMainTable(){
	$('#mainTable').fadeIn(1000,function(){
		$('#mainTable #scoreTable td:first').css({backgroundColor:accentColor});
	});
}