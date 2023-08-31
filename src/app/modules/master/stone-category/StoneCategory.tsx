/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneCategoryRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneCategory} from './model/StoneCategoryModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneCategoryWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneCategory[] = useSelector<RootState>(
    ({stoneCategory}) => stoneCategory.data
  ) as IStoneCategory[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_category'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneCategory())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_category_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.CATEGORY'})}
      ),
      sort: true,
    },
    {
      dataField: 'stone_category_name',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.CATEGORY'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IStoneCategory, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_category'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneCategory(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneCategory(values))
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
          data={data.map((datum: IStoneCategory) => {
            return {
              stone_category_code: datum.stone_category_code,
              stone_category_name: datum.stone_category_name,
            }
          })}
          keyField='stone_category_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneCategoryWidget}
