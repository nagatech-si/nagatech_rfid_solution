import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {IResponseReportOpname} from '../model/reportOpnameModel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'
import {getLocalUser} from '../../../../../_metronic/helpers/localHelpers'

// define a generatePDF function that accepts a tickets argument
const ReportItemPDF = (data: IResponseReportOpname[] = [], tgl_awal: string, tgl_akhir: string) => {
  // initialize jsPDF
  const doc: any = new jsPDF('l', 'mm', [297, 210])
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows: any = []
  let finalY = 30

  let grand_total_system = 0
  let grand_total_qty_system = 0
  let grand_total_fisik = 0
  let grand_total_qty_fisik = 0
  let grand_total_selisih = 0
  let grand_total_qty_selisih = 0

  doc.setFontSize(15)
  doc.text('LAPORAN STOCK OPNAME', 14, 15)
  doc.setFontSize(10)
  doc.setProperties({
    title: 'LAPORAN STOCK OPNAME',
  })

  doc.text(`PERIODE : ${tgl_awal} s/d ${tgl_akhir}`, 14, 22)
  let tableColumn: any = []
  let head = [
    {
      content: `BAKI`,
      rowSpan: 2,
      styles: {
        halign: 'center',
        valign: 'center',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `SYSTEM`,
      colSpan: 2,
      styles: {
        halign: 'center',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `FISIK`,
      colSpan: 2,
      styles: {
        halign: 'center',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `SELISIH`,
      colSpan: 2,
      styles: {
        halign: 'center',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
  ]
  tableColumn.push(head)
  let head2 = [
    {
      content: `QTY`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `BERAT`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `QTY`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `BERAT`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `QTY`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
    {
      content: `BERAT`,
      styles: {
        halign: 'right',
        lineWidth: 0.1,
        fontSize: 8,
      },
    },
  ]
  tableColumn.push(head2)

  data.forEach((row, no) => {
    let rows = [
      row.kode_toko,
      {
        content: row.qty_system,
        styles: {
          halign: 'right',
        },
      },
      {
        content: formatGram(row.berat_system, 3),
        styles: {
          halign: 'right',
        },
      },
      {
        content: row.qty_fisik,
        styles: {
          halign: 'right',
        },
      },
      {
        content: formatGram(row.berat_fisik, 3),
        styles: {
          halign: 'right',
        },
      },
      {
        content: row.qty_selisih,
        styles: {
          halign: 'right',
        },
      },
      {
        content: formatGram(row.berat_selisih, 3),
        styles: {
          halign: 'right',
        },
      },
    ]
    tableRows.push(rows)
    grand_total_system += row.berat_system
    grand_total_qty_system += row.qty_system
    grand_total_fisik += row.berat_fisik
    grand_total_qty_fisik += row.qty_fisik
    grand_total_selisih += row.berat_selisih
    grand_total_qty_selisih += row.qty_selisih
  })

  let total = [
    {
      content: `GRAND TOTAL`,
      styles: {
        halign: 'left',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_qty_system,
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_system.toFixed(3),
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_qty_fisik,
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_fisik.toFixed(3),
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_qty_selisih,
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: grand_total_selisih.toFixed(3),
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
  ]
  tableRows.push(total)

  let printed = [
    {
      colSpan: 9,
      content: `Printed By ${getLocalUser().user_id}`,
      styles: {
        // lineWidth: 0.1,
        fontStyle: 'italic',
        textColor: '#000',
        // fillColor: "#E8E5E5"
      },
    },
  ]
  tableRows.push(printed)
  autoTable(doc, {
    head: tableColumn,
    body: tableRows,
    // foot: footRows,
    startY: finalY,
    theme: 'plain',
    rowPageBreak: 'avoid',
    // pageBreak: "avoid",
    margin: {top: 10},
    footStyles: {
      // lineWidth: 0.02,
      // lineColor: "#000",
      fontSize: 8,
    },
    bodyStyles: {
      // lineWidth: 0.02,
      // lineColor: "#000",
      fontSize: 8,
    },
    headStyles: {
      fontSize: 8,
      // lineWidth: 0.02,
      // lineColor: "#000",

      fillColor: '#E8E5E5',
      textColor: '#000',
    },
  })
  finalY = doc.lastAutoTable.finalY + 3
  tableRows = []

  const pages = doc.internal.getNumberOfPages()
  const pageWidth = doc.internal.pageSize.width //Optional
  const pageHeight = doc.internal.pageSize.height //Optional
  doc.setFontSize(10) //Optional
  for (let j = 1; j < pages + 1; j++) {
    let horizontalPos = pageWidth / 2 //Can be fixed number
    let verticalPos = pageHeight - 10 //Can be fixed number
    doc.setPage(j)
    doc.text(`${j} of ${pages}`, horizontalPos, verticalPos, {
      align: 'center',
    })
  }
  var string = doc.output('datauristring')
  var x: any = window.open()
  x.document.open()
  x.document.write(
    "<html><head><title>Laporan Stock Opname</title></head><body style='margin:0 !important'><embed width='100%' height='100%'  src=" +
      string +
      '></embed></body></html>'
  )
}

export default ReportItemPDF
