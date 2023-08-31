/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect} from 'react'
import {ColumnDescription} from 'react-bootstrap-table-next'
import {useDispatch, useSelector} from 'react-redux'
import * as customerVerificationRedux from './redux/CustomerVerificationRedux'
import {RootState} from '../../../../setup'
import {GlobalTable} from '../../../component/GlobalTable'
import {ICustomer} from '../customer-active/model/CustomerActiveModel'
import Swal, {SweetAlertResult} from 'sweetalert2'
import {useIntl} from 'react-intl'

type Props = {
  className: string
}

const CustomerVerificationWidget: React.FC<Props> = ({className}) => {
  const dispatch = useDispatch()
  const data: ICustomer[] = useSelector<RootState>(
    ({customerVerification}) => customerVerification.data
  ) as ICustomer[]
  useEffect(() => {
    dispatch(customerVerificationRedux.actions.fetchAllCustomer())
  }, [dispatch])
  const intl = useIntl()
  const columns: ColumnDescription[] = [
    {
      dataField: 'nama_customer',
      text: intl.formatMessage({id: 'CUSTOMER.NAME'}),
      sort: true,
    },
    {
      dataField: 'username',
      text: intl.formatMessage({id: 'USERNAME'}),
      sort: true,
    },
    {
      dataField: 'negara',
      text: intl.formatMessage({id: 'COUNTRY'}),
      sort: true,
    },
    {
      dataField: 'alamat',
      text: intl.formatMessage({id: 'ADDRESS'}),
      sort: true,
    },
    {
      dataField: 'kontak',
      text: intl.formatMessage({id: 'CONTACT'}),
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Actions',
      align: 'right',
      headerAlign: 'right',
      formatter: (_: any, values: ICustomer, index: number) => {
        return (
          <a
            className='btn btn-primary'
            onClick={() => {
              Swal.fire({
                title: 'Are you sure?',
                icon: 'question',
                text: 'User will be active, please consider your decision',
                heightAuto: false,
                showCancelButton: true,
              }).then((value: SweetAlertResult) => {
                if (value.isConfirmed) {
                  dispatch(customerVerificationRedux.actions.activateCustomer(values.kode_customer))
                }
              })
            }}
          >
            <i className='fa fa-toggle-on fs-4 me-2'></i> {intl.formatMessage({id: 'ACTIVATE'})}
          </a>
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
          data={data.map((datum: ICustomer) => {
            return {
              _id: datum._id,
              user: datum.user,
              kode_customer: datum.kode_customer,
              nama_customer: datum.nama_customer,
              username: datum.user.length > 0 ? datum.user[0].nama_user ?? '-' : '-',
              negara: `${datum.negara}, ${datum.provinsi}, ${datum.kota}, ${datum.area}`,
              alamat: datum.alamat,
              kontak: datum.kontak,
              isactive: datum.isactive,
            }
          })}
          keyField='_id'
        />
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {CustomerVerificationWidget}
