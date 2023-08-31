/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/FindingRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {IFinding} from './model/FindingModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const FindingWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IFinding[] = useSelector<RootState>(({finding}) => finding.data) as IFinding[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_finding'))
    dispatch(sampleTypeRedux.actions.fetchAllFinding())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'specify_finding_code',
      text: intl.formatMessage({id: 'BASE.CODE'}, {name: intl.formatMessage({id: 'FINDING'})}),
      sort: true,
    },
    {
      dataField: 'specify_finding_name',
      text: intl.formatMessage({id: 'BASE.NAME'}, {name: intl.formatMessage({id: 'FINDING'})}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IFinding, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_finding'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteFinding(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditFinding(values))
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
          data={data.map((datum: IFinding) => {
            return {
              specify_finding_code: datum.specify_finding_code,
              specify_finding_name: datum.specify_finding_name,
            }
          })}
          keyField='specify_finding_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {FindingWidget}
