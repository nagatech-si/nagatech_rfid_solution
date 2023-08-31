/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneColourRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneColour} from './model/StoneColourModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneColourWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneColour[] = useSelector<RootState>(
    ({stoneColour}) => stoneColour.data
  ) as IStoneColour[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_colour'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneColour())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_colour_code',
      text:  intl.formatMessage(
          {id: 'BASE.CODE'},
          {name: intl.formatMessage({id: 'STONE.COLOUR'})}
        ),
      sort: true,
    },
    {
      dataField: 'stone_colour_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'STONE.COLOUR'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneColour, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_colour'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneColour(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneColour(values))
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
          data={data.map((datum: IStoneColour) => {
            return {
              stone_colour_code: datum.stone_colour_code,
              stone_colour_name: datum.stone_colour_name,
            }
          })}
          keyField='stone_colour_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneColourWidget}
