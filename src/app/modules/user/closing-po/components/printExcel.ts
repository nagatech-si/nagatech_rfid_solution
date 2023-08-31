import ExcelJS from 'exceljs'
import {IClosingPO} from '../model/ClosingPOModel'
import {IProfile} from '../../../accounts/model/ProfileModel'

export const createExcel = (closePO: IClosingPO, profile: IProfile) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Pre Order')
  const welcomeCell = sheet.getCell('A1')
  welcomeCell.value = 'LAPORAN ' + closePO.no_po
  sheet.mergeCells('A1:I1')
  welcomeCell.style = {font: {bold: true, size: 14}}
  welcomeCell.alignment = {horizontal: 'center', vertical: 'middle'}
  const perusahaan = sheet.getCell('A2')
  perusahaan.value = profile.nama_perusahaan
  sheet.mergeCells('A2:I2')
  perusahaan.style = {font: {bold: true, size: 12}}
  perusahaan.alignment = {horizontal: 'center', vertical: 'middle'}
  const alamat = sheet.getCell('A3')
  alamat.value = profile.alamat
  sheet.mergeCells('A3:I3')
  alamat.style = {font: {bold: true, size: 12}}
  alamat.alignment = {horizontal: 'center', vertical: 'middle'}
  sheet.getCell('A4')
  const customer = sheet.getCell('A5')
  customer.value = 'Nama Customer : ' + closePO.nama_customer
  sheet.mergeCells('A5:I5')
  customer.style = {font: {bold: true, size: 11}}
  customer.alignment = {horizontal: 'left', vertical: 'middle'}
  const tanggal = sheet.getCell('A6')
  tanggal.value = 'Tanggal Customer : ' + new Date(closePO.tgl_po).toISOString().split('T')[0]
  sheet.mergeCells('A6:I6')
  tanggal.style = {font: {bold: true, size: 11}}
  tanggal.alignment = {horizontal: 'left', vertical: 'middle'}
  const noPO = sheet.getCell('A7')
  noPO.value = 'Nomor PO : ' + closePO.no_po
  sheet.mergeCells('A7:I7')
  noPO.style = {font: {bold: true, size: 11}}
  noPO.alignment = {horizontal: 'left', vertical: 'middle'}
  sheet.getCell('A8')
  const headers = [
    'Kode Barang',
    'Nama Barang',
    'Kadar Barang',
    'Qty',
    'Total Berta Barang',
    'Total Price',
    'Total Tukaran',
    'Notes',
    'Foto Barang',
  ]
  sheet.addRow(headers)
  sheet.columns = [
    {key: 'code_item', width: 20, alignment: {horizontal: 'center', vertical: 'middle'}},
    {
      key: 'item_name',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'metal_title_code',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'qty_po',
      width: 7,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'total_nett_weight',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'sub_total_price',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'sub_total_kadar',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'notes',
      width: 20,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
    {
      key: 'lokasi_gambar',
      width: 30,
      alignment: {horizontal: 'fill', vertical: 'middle'},
    },
  ]
  const promise = Promise.all(
    closePO?.itemdetail?.map(async (product, index) => {
      const rowNumber = index + 9
      sheet.addRow({
        code_item: product?.code_item,
        item_name: product?.item_name,
        metal_title_code: product?.metal_title_code,
        qty_po: product?.qty_po,
        total_nett_weight: product?.total_nett_weight,
        sub_total_price: product?.sub_total_price,
        sub_total_kadar: product?.sub_total_kadar,
        notes: product?.notes,
      })
      const row = sheet.getRow(rowNumber + 1)
      row.height = 100
      row.alignment = {horizontal: 'center', vertical: 'middle'}
      const result: any = await toDataURL(product?.lokasi_gambar)

      const imageId2 = workbook.addImage({
        base64: result.base64Url,
        extension: 'png',
      })

      sheet.addImage(imageId2, {
        tl: {col: 8.8, row: rowNumber + 0.1},
        ext: {height: 130, width: 130},
      })
    })
  )
  promise.then(() => {
    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'download.xlsx'
      anchor.click()
      window.URL.revokeObjectURL(url)
    })
  })
}

const toDataURL = (url: string): Promise<{base64Url: string | ArrayBuffer | null}> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.readAsDataURL(xhr.response)
      reader.onloadend = function () {
        resolve({base64Url: reader.result})
      }
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
