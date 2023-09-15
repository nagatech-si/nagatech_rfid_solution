import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import {IResponseReportItem} from '../../../item/add/model/ItemModel'
import {getLocalUser} from '../../../../../_metronic/helpers/localHelpers'

// define a generatePDF function that accepts a tickets argument
const ReportItemPDF = (data: IResponseReportItem[] = [], tgl_awal: string, tgl_akhir: string) => {
  // initialize jsPDF
  const doc: any = new jsPDF('l', 'mm', [297, 210])
  //   let data = JSON.parse(localStorage.getItem("tt_pengeluaran_barang")) || [];
  let tableRows: any = []
  let finalY = 30

  let grand_tot_berat = 0

  doc.setFontSize(15)
  doc.text('LAPORAN KIRIM BARANG', 14, 15)
  doc.setFontSize(10)
  doc.setProperties({
    title: 'LAPORAN BARANG',
  })

  doc.text(`PERIODE : ${tgl_awal} s/d ${tgl_akhir}`, 14, 22)
  let tableColumn: any = [
    [
      {
        content: `NO`,
      },

      {
        content: `KODE BARCODE`,
      },
      {
        content: 'TAG ID',
      },
      {
        content: `KODE GUDANG`,
      },
      {
        content: `KODE INTERN`,
      },
      {
        content: `KODE BAKI`,
      },
      {
        content: `KODE GROUP`,
      },
      {
        content: `KODE JENIS`,
      },
      {
        content: `NAMA BARANG`,
      },
      {
        content: `BERAT`,
        styles: {
          halign: 'right',
        },
      },
      {
        content: `KADAR`,
        styles: {
          halign: 'right',
        },
      },
      {
        content: `KADAR CETAK`,
        styles: {
          halign: 'right',
        },
      },
      {
        content: `INPUT BY`,
      },
    ],
  ]

  data.forEach((row, no) => {
    let rows = [
      no + 1,
      row.kode_barcode,
      row.tag_id,
      row.kode_gudang,
      row.kode_intern,
      row.kode_toko,
      row.kode_group,
      row.kode_dept,
      row.nama_barang,
      {
        content: row.berat,
        styles: {
          halign: 'right',
        },
      },
      {
        content: row.kadar,
        styles: {
          halign: 'right',
        },
      },
      {
        content: row.kadar_cetak,
        styles: {
          halign: 'right',
        },
      },
      row.input_by,
    ]
    grand_tot_berat += row.berat
    tableRows.push(rows)
  })

  let total = [
    {
      content: `TOTAL`,
      colSpan: 9,
      styles: {
        halign: 'left',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },

    {
      content: grand_tot_berat.toFixed(3),
      styles: {
        halign: 'right',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    {
      content: ``,
      colSpan: 3,
      styles: {
        halign: 'left',
        fillColor: '#E8E5E5',
        textColor: '#000',
      },
    },
    // `${sub_qty}`,
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
    "<html><head><title>Laporan KIRIM BARANG</title></head><body style='margin:0 !important'><embed width='100%' height='100%'  src=" +
      string +
      '></embed></body></html>'
  )
}

export default ReportItemPDF
