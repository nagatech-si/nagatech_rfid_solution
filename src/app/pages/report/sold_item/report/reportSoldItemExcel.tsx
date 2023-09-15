import React, {FC} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {IResponseReportItem} from '../../../item/add/model/ItemModel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'
import {formatDateWithTime} from '../../../../../_metronic/helpers/dateHelper'

type Props = {
  data: IResponseReportItem[]
  startDate: string
  endDate: string
  kode_baki: string
}

const ReportSoldItemExcel: FC<Props> = ({data, startDate, endDate, kode_baki}) => {
  let grand_total_berat = 0
  return (
    <>
      <ReactHTMLTableToExcel
        id='test-table-xls-button'
        className='btn btn-success btn-block w-100'
        table='table-to-xls'
        filename='Laporan Barang Terjual'
        sheet='Laporan Barang Terjual'
        buttonText='Export Excel'
      />
      <table key='kode_barcode' id='table-to-xls' style={{display: 'none'}}>
        <thead>
          <tr key={'headItem1'}>
            <th colSpan={9}> Laporan Barang Terjual </th>
          </tr>
          <tr key={'headItem2'}>
            <th colSpan={9}> Periode </th>
          </tr>
          <tr key={'headItem3'}>
            <th colSpan={9}>
              {startDate} s/d {endDate}
            </th>
          </tr>
          <tr key={'headItem4'}>
            <th colSpan={9}> Baki </th>
          </tr>
          <tr key={'headItem5'}>
            <th colSpan={9}>{kode_baki}</th>
          </tr>
          <tr key={'headItem6'}>
            <th colSpan={9}></th>
          </tr>
          <tr key={'headItem7'}>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NO</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>TANGGAL</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BARCODE</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>TAG ID</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NAMA BARANG</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BAKI</th>
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
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE INTERN</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            grand_total_berat += row.berat
            return (
              <tr key={'bodyItem' + index}>
                <td>&nbsp;{index + 1}</td>
                <td>&nbsp;{formatDateWithTime(row.input_date ?? new Date().toISOString())}</td>
                <td>&nbsp;{row.kode_barcode}</td>
                <td>{row.tag_id}</td>
                <td> {row.nama_barang}</td>
                <td> {row.kode_toko}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.berat, 3)}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{row.kadar}</td>
                <td> {row.kode_intern}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr key={'tfootItem1'}>
            <td
              colSpan={6}
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
              colSpan={2}
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
export default ReportSoldItemExcel
