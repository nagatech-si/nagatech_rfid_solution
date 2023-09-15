import React, {FC} from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import {formatGram} from '../../../../../_metronic/helpers/numberHelpers'
import {IResponseReportOpname} from '../model/reportOpnameModel'

type Props = {
  data: IResponseReportOpname[]
  startDate: string
  endDate: string
}

const ReportOpnameExcel: FC<Props> = ({data, startDate, endDate}) => {
  let grand_total_system = 0
  let grand_total_qty_system = 0
  let grand_total_fisik = 0
  let grand_total_qty_fisik = 0
  let grand_total_selisih = 0
  let grand_total_qty_selisih = 0
  return (
    <>
      <ReactHTMLTableToExcel
        id='test-table-xls-button'
        className='btn btn-success btn-block w-100'
        table='table-to-xls'
        filename='Laporan Stock Opname'
        sheet='Laporan Stock Opname'
        buttonText='Export Excel'
      />
      <table key='kode_toko' id='table-to-xls' style={{display: 'none'}}>
        <thead>
          <tr key={'headOpname1'}>
            <th colSpan={7}> Laporan Stock Opname </th>
          </tr>
          <tr key={'headOpname2'}>
            <th colSpan={7}> Periode </th>
          </tr>
          <tr key={'headOpname3'}>
            <th colSpan={7}>
              {startDate} s/d {endDate}
            </th>
          </tr>
          <tr key={'headOpname4'}>
            <th colSpan={7}></th>
          </tr>
          <tr key={'headOpname5'}>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}} rowSpan={2}>
              BAKI
            </th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}} colSpan={2}>
              SYSTEM
            </th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}} colSpan={2}>
              FISIK
            </th>
            <th style={{backgroundColor: '#E8E5E5', color: '#000'}} colSpan={2}>
              SELISIH
            </th>
          </tr>
          <tr key={'headOpname6'}>
            <th
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              QTY
            </th>
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
              QTY
            </th>
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
              QTY
            </th>
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
            grand_total_fisik += row.berat_fisik
            grand_total_selisih += row.berat_selisih
            grand_total_system += row.berat_system
            grand_total_qty_system += row.qty_system
            grand_total_qty_selisih += row.qty_selisih
            grand_total_qty_fisik += row.qty_fisik
            return (
              <tr key={'bodyOpname' + index}>
                <td>{row.kode_toko}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{row.qty_system}</td>
                <td style={{textAlign: 'right'}}>&nbsp;{row.berat_system}</td>
                <td style={{textAlign: 'right'}}> &nbsp;{row.qty_fisik}</td>
                <td style={{textAlign: 'right'}}> &nbsp;{row.berat_fisik}</td>
                <td style={{textAlign: 'right'}}> &nbsp;{row.qty_selisih}</td>
                <td style={{textAlign: 'right'}}> &nbsp;{row.berat_selisih}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr key={'tfootOpname'}>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              GRAND TOTAL
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {grand_total_qty_system}
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {formatGram(grand_total_system, 3)}
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {grand_total_qty_fisik}
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {formatGram(grand_total_fisik, 3)}
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {grand_total_qty_selisih}
            </td>
            <td
              style={{
                backgroundColor: '#E8E5E5',
                color: '#000',
                textAlign: 'right',
              }}
            >
              &nbsp;
              {formatGram(grand_total_selisih, 3)}
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default ReportOpnameExcel
