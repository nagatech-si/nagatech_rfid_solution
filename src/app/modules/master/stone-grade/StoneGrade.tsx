/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/StoneGradeRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IStoneGrade} from './model/StoneGradeModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const StoneGradeWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IStoneGrade[] = useSelector<RootState>(
    ({stoneGrade}) => stoneGrade.data
  ) as IStoneGrade[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_stone_grade'))
    dispatch(sampleTypeRedux.actions.fetchAllStoneGrade())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'stone_grade_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'STONE.GRADE'})}
      ),
      sort: true,
    },
    {
      dataField: 'stone_grade_name',
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
      formatter: (_: any, values: IStoneGrade, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_stone_grade'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteStoneGrade(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditStoneGrade(values))
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
          data={data.map((datum: IStoneGrade) => {
            return {
              stone_grade_code: datum.stone_grade_code,
              stone_grade_name: datum.stone_grade_name,
            }
          })}
          keyField='stone_grade_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {StoneGradeWidget}
