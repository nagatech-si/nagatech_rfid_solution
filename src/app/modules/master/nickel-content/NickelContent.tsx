/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sampleTypeRedux from './redux/NickelContentRedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {DropdownAction} from '../../../../_metronic/layout/components/ActionDropdown'
import {RootState} from '../../../../setup'
import {INickelContent} from './model/NickelContentModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const NickelContentWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: INickelContent[] = useSelector<RootState>(
    ({nickelContent}) => nickelContent.data
  ) as INickelContent[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_nickel_content'))
    dispatch(sampleTypeRedux.actions.fetchAllNickelContent())
  }, [dispatch])
  const intl=  useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nickel_content_code',
      text: intl.formatMessage(
        {id: 'BASE.CODE'},
        {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
      ),
      sort: true,
    },
    {
      dataField: 'nickel_content_name',
      text: intl.formatMessage(
        {id: 'BASE.NAME'},
        {name: intl.formatMessage({id: 'METAL.NICKEL_CONTENT'})}
      ),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: INickelContent, index: number) => {
        return (
          <DropdownAction
            modalName='kt_modal_nickel_content'
            handleDelete={() => {
              dispatch(sampleTypeRedux.actions.deleteNickelContent(values))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(sampleTypeRedux.actions.setEditNickelContent(values))
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
          data={data.map((datum: INickelContent) => {
            return {
              nickel_content_code: datum.nickel_content_code,
              nickel_content_name: datum.nickel_content_name,
            }
          })}
          keyField='nickel_content_code'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {NickelContentWidget}
