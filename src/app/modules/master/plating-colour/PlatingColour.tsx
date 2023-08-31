/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/PlatingColourRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IPlatingColour} from './model/PlatingColourModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const PlatingColourWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IPlatingColour[] = useSelector<RootState>(
    ({platingColour}) => platingColour.data
  ) as IPlatingColour[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_plating_colour'))
    dispatch(sampleTypeRedux.actions.fetchAllPlatingColour())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'plating_colour_code',
      text:  intl.formatMessage(
          {id: 'BASE.CODE'},
          {name: intl.formatMessage({id: 'PLATING.COLOUR'})}
        ),
      sort: true,
    },
    {
      dataField: 'plating_colour_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'PLATING.COLOUR'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IPlatingColour, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_plating_colour'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deletePlatingColour(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditPlatingColour(values))
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
          data={data.map((datum: IPlatingColour) => {
            return {
              plating_colour_code: datum.plating_colour_code,
              plating_colour_name: datum.plating_colour_name,
            }
          })}
          keyField='plating_colour_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {PlatingColourWidget}
