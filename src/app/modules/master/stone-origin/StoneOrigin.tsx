/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneOriginRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneOrigin} from './model/StoneOriginModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneOriginWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneOrigin[] = useSelector<RootState>(
    ({stoneOrigin}) => stoneOrigin.data
  ) as IStoneOrigin[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_origin'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneOrigin())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_origin_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.GRADE'})}
      ),
      sort: true,
    },
    {
      dataField: 'stone_origin_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'STONE.GRADE'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneOrigin, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_origin'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneOrigin(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneOrigin(values))
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
          data={data.map((datum: IStoneOrigin) => {
            return {
              stone_origin_code: datum.stone_origin_code,
              stone_origin_name: datum.stone_origin_name,
            }
          })}
          keyField='stone_origin_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneOriginWidget}
