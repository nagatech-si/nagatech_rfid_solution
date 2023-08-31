/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/GroupRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IGroup} from './model/GroupModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'
import {GroupModal} from './components/GroupModal'
import {KTSVG} from '../../../../_metronic/helpers'

type Props = {
  className: string
}

const GroupWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IGroup[] = useSelector<RootState>(({group}) => group.data) as IGroup[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_group'))
    dispatch(sampleTypeRedux.actions.fetchAllGroup())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'kode_group',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'GROUP'})}),
      sort: true,
    },
    {
      dataField: 'nama_group',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'GROUP'})}),
      sort: true,
    },
    {
      dataField: 'harga',
      text: intl.formatMessage({id: 'PRICE'}),
      sort: true,
    },
    {
      dataField: 'harga_modal',
      text: intl.formatMessage({id: 'CAPITAL.PRICE'}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IGroup, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_group'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteGroup(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditGroup(values))
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
        <GlobalTable columns={columns} data={data} keyField='kode_group' />
      </div>

      {/* begin::Body */}
    </div>
  )
}

export {GroupWidget}
