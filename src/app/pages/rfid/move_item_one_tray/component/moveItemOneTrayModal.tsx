/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {FormikProps} from 'formik'
import {useSelector} from 'react-redux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicSelectFormik} from '../../../../modules/Formik/Component/basicInput'
import {ITray} from '../../../master/tray/model/TrayModel'
import {IRequestSaveMoveItem} from '../../move_item/model/moveItemModel'

type Props = {
  formik: FormikProps<IRequestSaveMoveItem>
}

const MoveItemModal: FC<Props> = ({formik}) => {
  const trayDatas: ITray[] = useSelector<RootState>(({tray}) => tray.data) as ITray[]
  const intl = useIntl()

  return (
    <div className='modal fade' id='kt_modal_move_item' aria-hidden='true'>
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
          <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
            <div className='text-center mb-10'>
              <h1 className='mb-3'>{intl.formatMessage({id: 'MOVE.ITEM'})}</h1>
            </div>
            <BasicSelectFormik
              label={intl.formatMessage(
                {id: 'BASE.CODE'},
                {name: intl.formatMessage({id: 'TRAY'})}
              )}
              name='kode_baki'
              options={trayDatas.map((value) => {
                return {
                  value: value.kode_baki,
                  label: value.kode_baki,
                }
              })}
            />

            <button
              type='submit'
              className='btn btn-light-primary fw-bolder w-100 mb-8'
              onClick={() => formik.submitForm()}
              disabled={formik.isSubmitting}
            >
              {!formik.isSubmitting && intl.formatMessage({id: 'SAVE.DATA'})}
              {formik.isSubmitting && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export {MoveItemModal}
