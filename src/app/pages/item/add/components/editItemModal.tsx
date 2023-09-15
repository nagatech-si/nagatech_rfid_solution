/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {FormikProps} from 'formik'
import {IItem} from '../model/ItemModel'
import {useSelector} from 'react-redux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicInputFormik} from '../../../../modules/Formik/Component/basicInput'

type Props = {
  formik: FormikProps<IItem>
}

const EditItemModal: FC<Props> = ({formik}) => {
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const intl = useIntl()

  return (
    <div className='modal fade' id='kt_modal_edit_item' aria-hidden='true'>
      <div className='modal-dialog mw-750px'>
        <div className='modal-content'>
          <div className='modal-header pb-0 border-0 justify-content-end'>
            <div
              className='btn btn-sm btn-icon btn-active-color-primary'
              id='close-modal'
              data-bs-dismiss='modal'
            >
              <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
            </div>
          </div>
          <div className='modal-body mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-5'>
              <h1 className='mb-3'>
                {!createMode
                  ? intl.formatMessage(
                      {id: 'PREFIX.EDIT'},
                      {name: intl.formatMessage({id: 'ITEM'})}
                    )
                  : intl.formatMessage(
                      {id: 'PREFIX.ADD'},
                      {name: intl.formatMessage({id: 'ITEM'})}
                    )}
              </h1>

              <div className='text-muted fw-bold fs-5'>
                Please fill all field below and then click save
              </div>
            </div>

            <BasicInputFormik
              disabled={true}
              label={intl.formatMessage(
                {id: 'BASE.CODE'},
                {name: intl.formatMessage({id: 'ITEM'})}
              )}
              name='kode_barang'
            />
            <BasicInputFormik
              disabled={!createMode}
              label={intl.formatMessage(
                {id: 'BASE.NAME'},
                {name: intl.formatMessage({id: 'ITEM'})}
              )}
              name='nama_barang'
            />
            <BasicInputFormik label={intl.formatMessage({id: 'RATE'})} type='number' name='kadar' />
            <BasicInputFormik label={intl.formatMessage({id: 'PRINT.RATE'})} name='kadar_cetak' />
            <BasicInputFormik
              label={intl.formatMessage({id: 'INTERNAL.CODE'})}
              name='kode_intern'
            />

            <button type='submit' className='btn btn-light-primary fw-bolder w-100 mb-8'>
              {intl.formatMessage({id: 'SAVE.DATA'})}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {EditItemModal}
