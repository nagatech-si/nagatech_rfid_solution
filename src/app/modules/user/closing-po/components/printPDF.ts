import {jsPDF} from 'jspdf'
import {IProfile} from '../../../accounts/model/ProfileModel'
import {IClosingPO} from '../model/ClosingPOModel'
import autoTable from 'jspdf-autotable'

export const printPDF = (
  logo: string,
  profile: IProfile,
  closingPO: IClosingPO,
  images: string[]
) => {
  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jsPDF('landscape')

  doc.addImage(logo, 'PNG', 10, 5, 25, 25)
  doc.setFontSize(18)
  doc.text(`Laporan ${closingPO.no_po}`, 40, 10)
  doc.setFontSize(11)
  doc.text(profile.nama_perusahaan, 40, 18)
  doc.text(profile.alamat, 40, 25)
  doc.line(10, 38, 277, 38)
  doc.text(`Nama Customer : ${closingPO.nama_customer}`, 10, 50)
  doc.text(`Tanggal PO : ${closingPO.tgl_po.split('T')[0]}`, 10, 55)
  doc.text(`Nomor PO : ${closingPO.no_po}`, 10, 60)
  autoTable(doc, {
    startY: 65,
    head: [
      [
        {
          content: 'Foto Barang',
          styles: {halign: 'left', cellWidth: 35},
        },
        {
          content: 'Kode Barang',
          styles: {halign: 'left'},
        },
        {
          content: 'Nama Barang',
          styles: {halign: 'left'},
        },
        {
          content: 'Kadar Barang',
          styles: {halign: 'left'},
        },
        {
          content: 'Qty',
          styles: {halign: 'right', cellWidth: 15},
        },
        {
          content: 'Total Berat Barang',
          styles: {halign: 'right', cellWidth: 30},
        },
        {
          content: 'Total Price',
          styles: {halign: 'right', cellWidth: 20},
        },
        {
          content: 'Total Tukaran',
          styles: {halign: 'right', cellWidth: 20},
        },
        {
          content: 'Notes',
          styles: {halign: 'left'},
        },
      ],
    ],
    theme: 'plain',
    rowPageBreak: 'avoid',
    showHead: 'firstPage',
    body: [
      ...closingPO.itemdetail.map((value) => {
        return [
          {
            content: '',
            styles: {halign: 'left'},
          },
          {
            content: value.code_item,
            styles: {halign: 'left'},
          },
          {
            content: value.item_name,
            styles: {halign: 'left'},
          },
          {
            content: value.metal_title_code,
            styles: {halign: 'left'},
          },
          {
            content: value.qty_po.toString(),
            styles: {halign: 'right'},
          },
          {
            content: value.total_nett_weight.toString(),
            styles: {halign: 'right'},
          },
          {
            content: value.sub_total_price.toString(),
            styles: {halign: 'right'},
          },
          {
            content: value.sub_total_kadar.toString(),
            styles: {halign: 'right'},
          },
          {
            content: value.notes,
            styles: {halign: 'left'},
          },
        ]
      }),
    ] as any,
    didDrawCell: function (data: any) {
      if (data.column.index === 0 && data.cell.section === 'body') {
        var textPos = data.cell

        doc.addImage(images[0], textPos.x + 3, textPos.y + 3, 25, 25)
      }
    },
    headStyles: {
      fillColor: [255, 255, 255], // Warna latar belakang header (misalnya abu-abu muda)
      lineColor: [0, 0, 0], // Warna border (hitam)
      lineWidth: 0.2, // Ketebalan garis
      halign: 'center', // Teks rata tengah
      valign: 'middle', // Teks di tengah vertikal sel
    },
  })
  doc.autoPrint()
  doc.setProperties({
    title: 'LAPORAN PO',
  })
  // doc.save(`PenerimaanSUpplier.pdf`);
  var string = doc.output('datauristring')
  var x: any = window.open()
  x.document.open()
  x.document.write(
    "<html><head><title>LAPORAN PO CUSTOMER</title></head><body style='margin:0 !important'><embed width='100%' height='100%'  src=" +
      string +
      '></embed></body></html>'
  )
}

export function getDataUri(url: string, cb: (dataUri: string) => void): void {
  const image = new Image()
  image.setAttribute('crossOrigin', 'anonymous') //getting images from external domain

  image.onload = function (this: any): void {
    const canvas = document.createElement('canvas')
    canvas.width = this.naturalWidth
    canvas.height = this.naturalHeight

    //next three lines for white background in case png has a transparent background
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#fff' /// set white fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(this, 0, 0)

      cb(canvas.toDataURL('image/jpeg'))
    }
  }

  image.src = url
}
