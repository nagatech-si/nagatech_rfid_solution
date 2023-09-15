/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as trayRedux from './redux/TrayRedux'
import * as warehouseRedux from '../warehouse/redux/WarehouseRedux'
import * as groupRedux from '../group/redux/GroupRedux'
import * as priceTagRedux from '../price_tag/redux/PriceTagRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {ITray} from './model/TrayModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {TrayModal} from './components/TrayModal'
import useNotification from '../../../../setup/notification/Notification'

type Props = {
  className: string
}

const TrayWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]

  const notification = useNotification()
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_tray'))
    dispatch(toolbar.actions.SetFocusName('kode_baki'))
    dispatch(trayRedux.actions.fetchAllTray())
    dispatch(warehouseRedux.actions.fetchAllWarehouse())
    dispatch(priceTagRedux.actions.fetchAllPriceTag())
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
      dataField: 'kode_baki',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TRAY'})}),
      sort: true,
    },
    {
      dataField: 'nama_baki',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'TRAY'})}),
      sort: true,
    },
    {
      dataField: 'berat_baki',
      text: intl.formatMessage({id: 'WEIGHT.TRAY'}),
      sort: true,
    },
    {
      dataField: 'berat_bandrol',
      text: intl.formatMessage({id: 'WEIGHT.PRICE.TAG'}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ITray, index: number) => {
        return (
          <DropdownAction
            DeleteName={intl.formatMessage({id: 'TRAY'}) + ' ' + values.kode_baki}
            modalName='kt_modal_tray'
            handleDelete={() => {
              dispatch(trayRedux.actions.deleteTray(values))
            }}
            handleUpdate={() => {
              setTimeout(() => {
                document.getElementsByName('nama_baki')[0].focus()
              }, 500)
              dispatch(toolbar.actions.SetCreateModalActive(false))
              dispatch(trayRedux.actions.setEditTray(values))
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
      <TrayModal />
      {/* begin::Body */}
    </div>
  )
}

export {TrayWidget}
