/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as closingPORedux from './redux/ClosingPORedux'
import * as toolbarRedux from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import {RootState} from '../../../../setup'
import {IClosingPO} from './model/ClosingPOModel'
import {GlobalTable} from '../../../component/GlobalTable'
import {DropdownPOAction} from '../../../../_metronic/layout/components/ActionDropdownPO'
import {ConfirmPOModal} from './components/ClosingPOModal'
import {ReviewItemPOModal} from './components/ReviewItemPOModal'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const ClosingPOWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: IClosingPO[] = useSelector<RootState>(({closePO}) => closePO.data) as IClosingPO[]
  const closedData: IClosingPO[] = useSelector<RootState>(
    ({closePO}) => closePO.closedData
  ) as IClosingPO[]
  const finishData: IClosingPO[] = useSelector<RootState>(
    ({closePO}) => closePO.finishData
  ) as IClosingPO[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('EMPTY'))
    dispatch(closingPORedux.actions.fetchAllOpenPO())
    dispatch(closingPORedux.actions.fetchAllClosedPO('2023-08-15', '2023-08-16'))
    dispatch(closingPORedux.actions.fetchAllFinishedPO('2023-08-15', '2023-08-16'))
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'no_po',
      text: intl.formatMessage({id: 'NO.PO'}),
      sort: true,
    },
    {
      dataField: 'nama_customer',
      text: intl.formatMessage({id: 'CUSTOMER.NAME'}),
      sort: true,
    },
    {
      dataField: 'itemdetail',
      text: intl.formatMessage({id: 'ITEM.DETAIL'}),
      sort: true,
      formatter: (values: IClosingPO, datas, index) => {
        return (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#kt_modal_review_item_po`}
            className='btn btn-light-primary'
            onClick={() => {
              dispatch(closingPORedux.actions.setEditManageUser(datas))
            }}
          >
            {intl.formatMessage({id: 'SEE.DETAIL'})}
          </button>
        )
      },
    },
    {
      dataField: 'total_kadar',
      text: intl.formatMessage({id: 'TOTAL.EXCHANGE'}),
      sort: true,
    },
    {
      dataField: 'total_price',
      text: intl.formatMessage({id: 'TOTAL.PRICE'}),
      sort: true,
    },
    {
      dataField: 'status_po',
      text: intl.formatMessage({id: 'STATUS'}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IClosingPO, index: number) => {
        return (
          <DropdownPOAction
            modalName='kt_modal_confirm_po'
            handleDelete={() => {
              dispatch(closingPORedux.actions.putDeletePO(values.no_po))
            }}
            handleUpdate={() => {
              dispatch(toolbarRedux.actions.SetCreateModalActive(false))
              dispatch(closingPORedux.actions.setEditManageUser(values))
            }}
          />
        )
      },
    },
  ]

  const columnsProcess: ColumnDescription[] = [
    {
      dataField: 'no_po',
      text: intl.formatMessage({id: 'NO.PO'}),
      sort: true,
    },
    {
      dataField: 'tgl_po',
      text: intl.formatMessage({id: 'PO.DATE'}),
      sort: true,
      formatter: (value) => {
        let date = new Date(value)
        return date.toLocaleDateString()
      },
    },
    {
      dataField: 'nama_customer',
      text: intl.formatMessage({id: 'CUSTOMER.NAME'}),
      sort: true,
    },
    {
      dataField: 'itemdetail',
      text: intl.formatMessage({id: 'ITEM.DETAIL'}),
      sort: true,
      formatter: (values: IClosingPO, datas, index) => {
        return (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#kt_modal_review_item_po`}
            className='btn btn-light-primary'
            onClick={() => {
              dispatch(closingPORedux.actions.setEditManageUser(datas))
            }}
          >
            {intl.formatMessage({id: 'SEE.DETAIL'})}
          </button>
        )
      },
    },
    {
      dataField: 'total_kadar',
      text: intl.formatMessage({id: 'TOTAL.EXCHANGE'}),
      sort: true,
    },
    {
      dataField: 'total_price',
      text: intl.formatMessage({id: 'TOTAL.PRICE'}),
      sort: true,
    },
    {
      dataField: 'status_po',
      text: intl.formatMessage({id: 'STATUS'}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IClosingPO, index: number) => {
        return (
          <button
            type='button'
            className='btn btn-success'
            onClick={() => {
              dispatch(closingPORedux.actions.putFinishPO(values.no_po))
            }}
          >
            {intl.formatMessage({id: 'FINISH'})}
          </button>
        )
      },
    },
  ]

  const columnsFinish: ColumnDescription[] = [
    {
      dataField: 'no_po',
      text: intl.formatMessage({id: 'NO.PO'}),
      sort: true,
    },
    {
      dataField: 'tgl_po',
      text: intl.formatMessage({id: 'PO.DATE'}),
      sort: true,
      formatter: (value) => {
        let date = new Date(value)
        return date.toLocaleDateString()
      },
    },
    {
      dataField: 'nama_customer',
      text: intl.formatMessage({id: 'CUSTOMER.NAME'}),
      sort: true,
    },
    {
      dataField: 'itemdetail',
      text: intl.formatMessage({id: 'ITEM.DETAIL'}),
      sort: true,
      formatter: (values: IClosingPO, datas, index) => {
        return (
          <button
            type='button'
            data-bs-toggle='modal'
            data-bs-target={`#kt_modal_review_item_po`}
            className='btn btn-light-primary'
            onClick={() => {
              dispatch(closingPORedux.actions.setEditManageUser(datas))
            }}
          >
            {intl.formatMessage({id: 'SEE.DETAIL'})}
          </button>
        )
      },
    },
    {
      dataField: 'total_kadar',
      text: intl.formatMessage({id: 'TOTAL.EXCHANGE'}),
      sort: true,
    },
    {
      dataField: 'total_price',
      text: intl.formatMessage({id: 'TOTAL.PRICE'}),
      sort: true,
    },
    {
      dataField: 'status_po',
      text: intl.formatMessage({id: 'STATUS'}),
      sort: true,
    },

    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: IClosingPO, index: number) => {
        return (
          <button
            type='button'
            className='btn btn-warning'
            onClick={() => {
              dispatch(closingPORedux.actions.putCancelPO(values.no_po))
            }}
          >
            {intl.formatMessage({id: 'CANCEL'})}
          </button>
        )
      },
    },
  ]

  return (
    <>
      <div className={`card ${className}`}>
        <div className='card-header border-0 mt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder text-dark'>
              {intl.formatMessage({id: 'CLOSING.PO'})}
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>Confirm all PO Order from customer</span>
          </h3>
        </div>
        {/* begin::Body */}
        <div className='card-body '>
          {/* begin::Table container */}
          <GlobalTable columns={columns} data={data ?? []} keyField='no_po' />
        </div>
        {/* begin::Body */}
      </div>
      <div className={`card ${className}`}>
        <div className='card-header border-0 mt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder text-dark'>
              {intl.formatMessage({id: 'HISTORY.PO'})}({intl.formatMessage({id: 'PROCESS'})})
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>See all history PO order customer</span>
          </h3>
        </div>
        {/* begin::Body */}
        <div className='card-body '>
          {/* begin::Table container */}
          <GlobalTable columns={columnsProcess} data={closedData ?? []} keyField='no_po' />
        </div>
        {/* begin::Body */}
      </div>
      <div className={`card ${className}`}>
        <div className='card-header border-0 mt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bolder text-dark'>
              {intl.formatMessage({id: 'HISTORY.PO'})} ({intl.formatMessage({id: 'FINISH'})})
            </span>
            <span className='text-muted mt-1 fw-bold fs-7'>
              See all history PO order customer finished
            </span>
          </h3>
        </div>
        {/* begin::Body */}
        <div className='card-body '>
          {/* begin::Table container */}
          <GlobalTable columns={columnsFinish} data={finishData || []} keyField='no_po' />
        </div>
        {/* begin::Body */}
      </div>
      <ConfirmPOModal />
      <ReviewItemPOModal />
    </>
  )
}

export {ClosingPOWidget}
