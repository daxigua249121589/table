/**
 * Created by Hao on 2015/3/31.
 */

/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
        '<td>Full name:</td>'+
        '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Extension number:</td>'+
        '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Extra info:</td>'+
        '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
        '</table>';
}

$(document).ready(function() {
    var table = $('#example').DataTable( {
        "ajax": "/web/data_files/object",
        "columns": [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '',
                "width": "10%"
            },
            { "data": "name",
               "width": "25%"
            },
            { "data": "position",
                "orderable":      false,
                "width": "25%"
            },
            { "data": "office",
                "orderable":      false,
                "width": "25%"},
            { "data": "salary",
                "orderable":      false,
                "width": "15%"}
        ],
        "order": [[1, 'asc']],

        //"scrollY": "640px",
        "dom": '<"top"f>rt<"bottom"ip><"clear">',
        "deferRender": true
        //"createdRow": function ( row, data, index ) {
        //    if ( data[3].replace(/[\$,]/g, '') * 1 > 150000 ) {
        //        $('td', row).eq(1).addClass('highlight');
        //    }
        //}
    } );
//    new $.fn.dataTable.KeyTable( table );

//    new $.fn.dataTable.FixedHeader( table );

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
    var lastIdx = null;
    var table = $('#example').DataTable();

    $('#example tbody')
        .on( 'mouseover', 'td', function () {
            var colIdx = table.cell(this).index().column;

            if ( colIdx !== lastIdx ) {
                $( table.cells().nodes() ).removeClass( 'highlight' );
                //$( table.column( colIdx ).nodes() ).addClass( 'highlight' );
            }
        } )
        .on( 'mouseleave', function () {
            $( table.cells().nodes() ).removeClass( 'highlight' );
        } );
} );