/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Form, Formik, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import {IItemCondition} from '../model/ItemConditionModel'
import {useDispatch, useSelector} from 'react-redux'
import * as itemConditionRedux from '../redux/ItemConditionRedux'

import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'
import {BasicInputFormik} from '../../../../modules/Formik/Component/basicInput'
import {alfaNumerikOnly} from '../../../../../_metronic/helpers/YupCustomMiddleware'

const ItemConditionModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IItemCondition | null = useSelector<RootState>(
    ({itemCondition}) => itemCondition.payload
  ) as IItemCondition | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)
  const intl = useIntl()

  const itemConditionSchema = Yup.object().shape({
    kondisi_barang: alfaNumerikOnly(intl.formatMessage({id: 'ONLY.ALFA.NUMERIC'})).required(
      intl.formatMessage({id: 'CANT.BE.EMPTY'})
    ),
  })

  const handleSubmit = (values: any, actions: FormikHelpers<IItemCondition>) => {
    setLoading(true)
    if (createMode) {
      dispatch(itemConditionRedux.actions.postItemCondition(values))
    } else {
      dispatch(itemConditionRedux.actions.editItemCondition(values))
    }
    setLoading(false)
    actions.resetForm()
  }
  return (
    <div className='modal fade' id='kt_modal_item_condition' aria-hidden='true'>
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
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              _id: createMode ? '' : prevData?._id ?? '',
              kondisi_barang: createMode ? '' : prevData?.kondisi_barang ?? '',
            }}
            validationSchema={itemConditionSchema}
            enableReinitialize
          >
            {(props) => (
              <Form>
                <div className='modal-body  mx-5 mx-xl-18 pt-0 pb-15'>
                  <div className='text-center mb-13'>
                    <h1 className='mb-3'>
                      {' '}
                      {!createMode
                        ? intl.formatMessage(
                            {id: 'PREFIX.EDIT'},
                            {name: intl.formatMessage({id: 'ITEM.CONDITION'})}
                          )
                        : intl.formatMessage(
                            {id: 'PREFIX.ADD'},
                            {name: intl.formatMessage({id: 'ITEM.CONDITION'})}
                          )}
                    </h1>

                    <div className='text-muted fw-bold fs-5'>
                      Please fill all field below and then click save
                    </div>
                  </div>
                  <BasicInputFormik
                    label={intl.formatMessage(
                      {id: 'BASE.CODE'},
                      {name: intl.formatMessage({id: 'ITEM.CONDITION'})}
                    )}
                    name='kondisi_barang'
                  />
                  <button
                    type='submit'
                    className='btn btn-light-primary fw-bolder w-100 mb-8'
                    disabled={loading}
                  >
                    {!loading && intl.formatMessage({id: 'SAVE.DATA'})}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export {ItemConditionModal}
