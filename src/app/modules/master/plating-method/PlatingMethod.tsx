/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/PlatingMethodRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IPlatingMethod} from './model/PlatingMethodModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const PlatingMethodWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IPlatingMethod[] = useSelector<RootState>(
    ({platingMethod}) => platingMethod.data
  ) as IPlatingMethod[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_plating_method'))
    dispatch(sampleTypeRedux.actions.fetchAllPlatingMethod())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'plating_method_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'PLATING.METHOD'})}
      ),
      sort: true,
    },
    {
      dataField: 'plating_method_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'PLATING.METHOD'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IPlatingMethod, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_plating_method'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deletePlatingMethod(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditPlatingMethod(values))
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
          data={data.map((datum: IPlatingMethod) => {
            return {
              plating_method_code: datum.plating_method_code,
              plating_method_name: datum.plating_method_name,
            }
          })}
          keyField='plating_method_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {PlatingMethodWidget}
