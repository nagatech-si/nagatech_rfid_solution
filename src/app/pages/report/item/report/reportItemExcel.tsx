import React, {FC} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {IResponseReportItem} from '../../../item/add/model/ItemModel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'

type Props = {
  data: IResponseReportItem[]
  startDate: string
  endDate: string
}

const ReportItemExcel: FC<Props> = ({data, startDate, endDate}) => {
  let grand_total_berat = 0
  return (
    <>
      <ReactHTMLTableToExcel
        id='test-table-xls-button'
        className='btn btn-success btn-block w-100'
        table='table-to-xls'
        filename='Laporan Barang'
        sheet='Laporan Barang'
        buttonText='Export Excel'
      />
      <table key='kode_barcode' id='table-to-xls' style={{display: 'none'}}>
        <thead>
          <tr key={'headItem1'}>
            <th colSpan={13}> Laporan Barang </th>
          </tr>
          <tr key={'headItem2'}>
            <th colSpan={13}> Periode </th>
          </tr>
          <tr key={'headItem3'}>
            <th colSpan={13}>
              {startDate} s/d {endDate}
            </th>
          </tr>
          <tr key={'headItem4'}>
            <th colSpan={13}></th>
          </tr>
          <tr key={'headItem5'}>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NO</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BARCODE</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>TAG ID</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE GUDANG</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE INTERN</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BAKI</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE GROUP</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE JENIS</th>
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
            <th
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              KADAR
            </th>
            <th
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              KADAR CETAK
            </th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>INPUT BY</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            grand_total_berat += row.berat
            return (
              <tr key={'bodyItem' + index}>
                <td>&nbsp;{index + 1}</td>
                <td>&nbsp;{row.kode_barcode}</td>
                <td>{row.tag_id}</td>
                <td>{row.kode_gudang}</td>
                <td> {row.kode_intern}</td>
                <td> {row.kode_toko}</td>
                <td> {row.kode_group}</td>
                <td> {row.kode_dept}</td>
                <td> {row.nama_barang}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.berat, 3)}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.kadar, 3)}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{row.kadar_cetak}</td>
                <td> {row.input_by}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr key={'tfootItem1'}>
            <td
              colSpan={9}
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
            <td
              colSpan={3}
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            ></td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default ReportItemExcel
