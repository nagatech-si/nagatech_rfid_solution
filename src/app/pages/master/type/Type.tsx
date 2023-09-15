/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as typeRedux from './redux/TypeRedux'
import * as groupRedux from '../group/redux/GroupRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IType} from './model/TypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {TypeModal} from './components/TypeModal'
import useNotification from '../../../../setup/notification/Notification'

type Props = {
  className: string
}

const TypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IType[] = useSelector<RootState>(({type}) => type.data) as IType[]
  const notifications = useNotification()
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_type'))
    dispatch(toolbar.actions.SetFocusName('kode_jenis'))
    dispatch(typeRedux.actions.fetchAllType())
    dispatch(groupRedux.actions.fetchAllGroup())
    dispatch(groupRedux.actions.setNotification(notifications))
    // eslint-disable-next-line
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'kode_jenis',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'TYPE'})}),
      sort: true,
    },
    {
      dataField: 'kode_group',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})}),
      sort: true,
    },
    {
      dataField: 'nama_jenis',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'TYPE'})}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IType, index: number) => {
        return (
          <DropdownAction
            DeleteName={intl.formatMessage({id: 'TYPE'}) + ' ' + values.kode_jenis}
            modalName='kt_modal_type'
            handleDelete={() => {
              dispatch(typeRedux.actions.deleteType(values))
            }}
            handleUpdate={() => {
              setTimeout(() => {
                document.getElementsByName('nama_jenis')[0].focus()
              }, 500)
              dispatch(toolbar.actions.SetCreateModalActive(false))
              dispatch(typeRedux.actions.setEditType(values))
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
        <GlobalTable columns={columns} data={data} keyField='kode_jenis' />
      </div>
      <TypeModal />
      {/* begin::Body */}
    </div>
  )
}

export {TypeWidget}
