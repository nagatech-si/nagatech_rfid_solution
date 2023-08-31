/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as cityRedux from './redux/AreaRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IArea} from './model/AreaModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const AreaWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IArea[] = useSelector<RootState>(({area}) => area.data) as IArea[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_area'))
    dispatch(cityRedux.actions.fetchAllArea())
  }, [dispatch])
  const intl =useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_kota',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'CITY'})}
      ),
      sort: true,
    },
    {
      dataField: 'nama_area',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'CITY'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IArea, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_area'
            handleDelete={() => {
              dispatch(cityRedux.actions.deleteArea(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(cityRedux.actions.setEditArea(values))
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
          data={data.map((datum: IArea) => {
            return {
              _id: datum._id,
              nama_kota: datum.nama_kota,
              nama_area: datum.nama_area,
            }
          })}
          keyField='_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {AreaWidget}
