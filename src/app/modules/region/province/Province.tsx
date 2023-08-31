/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as provinceRedux from './redux/ProvinceRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IProvince} from './model/ProvinceModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const ProvinceWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IProvince[] = useSelector<RootState>(({province}) => province.data) as IProvince[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_province'))
    dispatch(provinceRedux.actions.fetchAllProvince())
  }, [dispatch])
  const intl =useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_negara',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'COUNTRY'})}
      ),
      sort: true,
    },
    {
      dataField: 'nama_provinsi',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'PROVINCE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IProvince, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_province'
            handleDelete={() => {
              dispatch(provinceRedux.actions.deleteProvince(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(provinceRedux.actions.setEditProvince(values))
            }}
          />
        )
      },
    },
  ]

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <GlobalTable
          columns={columns}
          data={data.map((datum: IProvince) => {
            return {
              _id: datum._id,
              nama_negara: datum.nama_negara,
              nama_provinsi: datum.nama_provinsi,
            }
          })}
          keyField='_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {ProvinceWidget}
