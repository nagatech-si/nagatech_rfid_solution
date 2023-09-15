/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as typeRedux from './redux/WarehouseRedux'
import * as groupRedux from '../group/redux/GroupRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IWarehouse} from './model/WarehouseModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {WarehouseModal} from './components/WarehouseModal'
import useNotification from '../../../../setup/notification/Notification'

type Props = {
  className: string
}

const WarehouseWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IWarehouse[] = useSelector<RootState>(({warehouse}) => warehouse.data) as IWarehouse[]
  const notification = useNotification()
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_warehouse'))
    dispatch(toolbar.actions.SetFocusName('kode_gudang'))
    dispatch(typeRedux.actions.fetchAllWarehouse())
    dispatch(groupRedux.actions.setNotification(notification))
    // eslint-disable-next-line
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'kode_gudang',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'WAREHOUSE'})}),
      sort: true,
    },
    {
      dataField: 'nama_gudang',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'WAREHOUSE'})}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IWarehouse, index: number) => {
        return (
          <DropdownAction
            DeleteName={intl.formatMessage({id: 'WAREHOUSE'}) + ' ' + values.kode_gudang}
            modalName='kt_modal_warehouse'
            handleDelete={() => {
              dispatch(typeRedux.actions.deleteWarehouse(values))
            }}
            handleUpdate={() => {
              setTimeout(() => {
                document.getElementsByName('nama_gudang')[0].focus()
              }, 500)
              dispatch(toolbar.actions.SetCreateModalActive(false))
              dispatch(typeRedux.actions.setEditWarehouse(values))
            }}
          />
        )
      },
    },
  ]

  return (
    <div className={`card ${className} shadow`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <GlobalTable columns={columns} data={data} keyField='kode_gudang' />
      </div>
      <WarehouseModal />
      {/* begin::Body */}
    </div>
  )
}

export {WarehouseWidget}
