var isLandscape = true;
var wasLandscape = true;

$(document).ready(function() {
	setTableHeight();
	isLandscape = ($(window).height() < $(window).width());
	wasLandscape = isLandscape;
	if(!isLandscape){ /* default layout is landscape */
		setPortrait();
	}
});

$( window ).resize(function() {
	setTableHeight();
	isLandscape = ($(window).height() < $(window).width());
	if(isLandscape !== wasLandscape){
		wasLandscape = isLandscape;
		positionTable();
	}
});

function positionTable(){
	if(isLandscape){
		setLandscape();
	}
	else{
		setPortrait();
	}
}

function setPortrait(){
	$("<tr id='xs-tr-2' />").insertAfter("#xs-tr-1");
	$("<tr id='xs-tr-4' />").insertAfter("#xs-tr-3");
	$("#xs-tr-2").append( $(".xs-td-row-2"));
	$("#xs-tr-4").append( $(".xs-td-row-4"));
	$( ".td-colspanned" ).attr( "colspan", "2" );
	$("#mainTable  tr td").css({
		width:"30%"
	});
}

function setLandscape(){
	$("#xs-tr-1").append( $(".xs-td-row-2") );
	$("#xs-tr-3").append( $(".xs-td-row-4") );
	$("#xs-tr-2").remove();
	$("#xs-tr-4").remove();
	$( ".td-colspanned" ).attr( "colspan", "5" );
	$("#mainTable tr td").css({
		width:"15%"
	});
}

function setTableHeight(){
	$("table#mainTable").css({
		height:$(window).height()*0.90 + "px", /* height:90% */
	 	marginTop:$(window).height()/20 + "px", /* margin-top:5% */
	});
}


