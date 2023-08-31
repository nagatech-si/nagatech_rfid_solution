/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as finishTypeRedux from './redux/FinishTypeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IFinishType} from './model/FinishTypeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const FinishTypeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IFinishType[] = useSelector<RootState>(
    ({finishType}) => finishType.data
  ) as IFinishType[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_finish_type'))

    dispatch(finishTypeRedux.actions.fetchAllFinishType())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'finish_type_code',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'FINISH.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'finish_type_name',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'FINISH.TYPE'})}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IFinishType, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_finish_type'
            handleDelete={() => {
              dispatch(finishTypeRedux.actions.deleteFinishType(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(finishTypeRedux.actions.setEditFinishType(values))
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
          data={data.map((datum: IFinishType) => {
            return {
              finish_type_code: datum.finish_type_code,
              finish_type_name: datum.finish_type_name,
            }
          })}
          keyField='finish_type_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {FinishTypeWidget}
