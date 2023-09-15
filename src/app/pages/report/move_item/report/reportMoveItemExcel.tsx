import React, {FC} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {IResponseReportItem} from '../../../item/add/model/ItemModel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'

type Props = {
  data: IResponseReportItem[]
  startDate: string
  endDate: string
}

const ReportMoveItemExcel: FC<Props> = ({data, startDate, endDate}) => {
  let grand_total_berat = 0
  return (
    <>
      <ReactHTMLTableToExcel
        id='test-table-xls-button'
        className='btn btn-success btn-block w-100'
        table='table-to-xls'
        filename='Laporan Pindah Barang'
        sheet='Laporan Pindah Barang'
        buttonText='Export Excel'
      />
      <table key='kode_barcode' id='table-to-xls' style={{display: 'none'}}>
        <thead>
          <tr key={'headItem1'}>
            <th colSpan={8}> Laporan Pindah Barang </th>
          </tr>
          <tr key={'headItem2'}>
            <th colSpan={8}> Periode </th>
          </tr>
          <tr key={'headItem3'}>
            <th colSpan={8}>
              {startDate} s/d {endDate}
            </th>
          </tr>

          <tr key={'headItem6'}>
            <th colSpan={8}></th>
          </tr>
          <tr key={'headItem7'}>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NO</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>GUDANG ASAL</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>BAKI ASAL</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>GUDANG TUJUAN</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>BAKI TUJUAN</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BARCODE</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NAMA BARANG</th>
            <th
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              BERAT
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            grand_total_berat += row.berat
            return (
              <tr key={'bodyItem' + index}>
                <td>&nbsp;{index + 1}</td>
                <td>&nbsp;{row.kode_gudang_asal}</td>
                <td>&nbsp;{row.kode_baki_asal}</td>
                <td>&nbsp;{row.kode_gudang}</td>
                <td>&nbsp;{row.kode_baki}</td>
                <td>&nbsp;{row.kode_barcode}</td>
                <td> {row.nama_barang}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.berat, 3)}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr key={'tfootItem1'}>
            <td
              colSpan={7}
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              Total
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {formatGram(grand_total_berat, 3)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default ReportMoveItemExcel
