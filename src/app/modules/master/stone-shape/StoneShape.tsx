/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneShapeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneShape} from './model/StoneShapeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneShapeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneShape[] = useSelector<RootState>(
    ({stoneShape}) => stoneShape.data
  ) as IStoneShape[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_shape'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneShape())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_shape_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.SHAPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'stone_shape_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'STONE.SHAPE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneShape, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_shape'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneShape(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneShape(values))
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
          data={data.map((datum: IStoneShape) => {
            return {
              stone_shape_code: datum.stone_shape_code,
              stone_shape_name: datum.stone_shape_name,
            }
          })}
          keyField='stone_shape_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneShapeWidget}
