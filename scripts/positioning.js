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
	$( ".xs-td-row-2" ).wrapAll( "<tr id='xs-tr-2' />");
	$( ".xs-td-row-4" ).wrapAll( "<tr id='xs-tr-4' />");
	$( "#xs-tr-2" ).insertAfter( $( "#xs-tr-1" ) );
	$( "#xs-tr-4" ).insertAfter( $( "#xs-tr-3" ) );
	$( ".td-colspanned" ).attr( "colspan", "2" );
	$("#mainTable  > tr > td").css({
		width:"30%"
	});
}

function setLandscape(){
	$( "#xs-tr-2" ).insertAfter( $( "#td-3" ) );
	$( "#xs-tr-4" ).insertAfter( $( "#td-9" ) );
	$( "#td-4" ).unwrap();
	$( "#td-10" ).unwrap();
	$( ".td-colspanned" ).attr( "colspan", "5" );
	$("#mainTable > tr > td").css({
		width:"15%"
	});
}

function setTableHeight(){
	$("table#mainTable").css({
		height:$(window).height()*0.90 + "px", /* height:90% */
	 	marginTop:$(window).height()/20 + "px", /* margin-top:5% */
	});
}


