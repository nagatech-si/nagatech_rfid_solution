/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {FormikProps} from 'formik'
import {useSelector} from 'react-redux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicSelectFormik} from '../../../../modules/Formik/Component/basicInput'
import {IRequestSaveShetter} from '../model/shetterModel'
import {IItemCondition} from '../../../master/item_condition/model/ItemConditionModel'

type Props = {
  formik: FormikProps<IRequestSaveShetter>
}

const ShetterModal: FC<Props> = ({formik}) => {
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const itemConditionData: IItemCondition[] = useSelector<RootState>(
    ({itemCondition}) => itemCondition.data
  ) as IItemCondition[]
  const intl = useIntl()

  return (
    <div className='modal fade' id='kt_modal_shetter_item' aria-hidden='true'>
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

            <BasicSelectFormik
              label={intl.formatMessage({id: 'ITEM.CONDITION'})}
              name='kondisi_barang'
              options={itemConditionData.map((value) => {
                return {
                  value: value.kondisi_barang,
                  label: value.kondisi_barang,
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

export {ShetterModal}
