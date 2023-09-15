import React, {FC} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {IResponseReportItem} from '../../../item/add/model/ItemModel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'
import {formatDateWithTime} from '../../../../../_metronic/helpers/dateHelper'

type Props = {
  data: IResponseReportItem[]
  startDate: string
  endDate: string
}

const ReportShatterItemExcel: FC<Props> = ({data, startDate, endDate}) => {
  let grand_total_berat = 0
  let grand_total_berat_asli = 0
  return (
    <>
      <ReactHTMLTableToExcel
        id='test-table-xls-button'
        className='btn btn-success btn-block w-100'
        table='table-to-xls'
        filename='Laporan Hancur Barang'
        sheet='Laporan Hancur Barang'
        buttonText='Export Excel'
      />
      <table key='kode_barcode' id='table-to-xls' style={{display: 'none'}}>
        <thead>
          <tr key={'headItem1'}>
            <th colSpan={9}> Laporan Hancur Barang </th>
          </tr>
          <tr key={'headItem2'}>
            <th colSpan={9}> Periode </th>
          </tr>
          <tr key={'headItem3'}>
            <th colSpan={9}>
              {startDate} s/d {endDate}
            </th>
          </tr>

          <tr key={'headItem6'}>
            <th colSpan={9}></th>
          </tr>
          <tr key={'headItem7'}>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE GUDANG</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BAKI</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KODE BARCODE</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>INTERN</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>NAMA BARANG</th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>KONDISI BARANG</th>
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
              BERAT ASLI
            </th>

            <th style={{backgroundColor: '#E8E5E5', color: '#000'}}>TANGGAL HANCUR</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            grand_total_berat += row.berat
            grand_total_berat_asli += row.berat_asli
            return (
              <tr key={'bodyItem' + index}>
                <td>&nbsp;{row.kode_gudang}</td>
                <td>&nbsp;{row.kode_baki}</td>
                <td>&nbsp;{row.kode_barcode}</td>
                <td>&nbsp;{row.kode_intern}</td>
                <td> {row.nama_barang}</td>
                <td> {row.kondisi_barang}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.berat, 3)}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{formatGram(row.berat_asli, 3)}</td>
                <td>&nbsp;{formatDateWithTime(row.input_date ?? new Date().toISOString())}</td>
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
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {formatGram(grand_total_berat_asli, 3)}
            </td>
            <td
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
export default ReportShatterItemExcel
