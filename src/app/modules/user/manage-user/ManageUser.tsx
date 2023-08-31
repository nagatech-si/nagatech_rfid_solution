/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/ManageUserRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IManageUser} from './model/ManageUserModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const ManageUserWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IManageUser[] = useSelector<RootState>(
    ({manageUser}) => manageUser.data
  ) as IManageUser[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_manage_user'))
    dispatch(sampleTypeRedux.actions.fetchAllManageUser())
  }, [dispatch])
  const intl =useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'user_id',
      text: intl.formatMessage(
          {id: 'USER.ID'}),
      sort: true,
    },
    {
      dataField: 'nama_lkp',
      text: intl.formatMessage(
        {id: 'FULL.NAME'}),
      sort: true,
    },
    {
      dataField: 'type',
      text: intl.formatMessage(
        {id: 'TYPE'}),
      sort: true,
    },
    {
      dataField: 'input_by',
      text: intl.formatMessage(
        {id: 'INPUT.BY'}),
      sort: true,
    },
    {
      dataField: 'input_date',
      text: intl.formatMessage(
        {id: 'INPUT.DATE'}),
      sort: true,
      formatter: (_: any, values: IManageUser, index: number) => {
        let date = new Date(values.input_date)
        return date.toLocaleDateString()
      },
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IManageUser, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_manage_user'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteManageUser(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditManageUser(values))
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
          data={data.map((datum: IManageUser) => {
            return {
              user_id: datum.user_id,
              nama_lkp: datum.nama_lkp,
              type: datum.type,
              input_date: datum.input_date,
              input_by: datum.input_by,
            }
          })}
          keyField='user_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {ManageUserWidget}
