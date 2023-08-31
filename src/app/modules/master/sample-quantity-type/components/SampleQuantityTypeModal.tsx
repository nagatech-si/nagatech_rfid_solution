/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {ISampleQuantityType} from '../model/SampleQuantityTypeModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/SampleQuantityTypeRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const sampleQuantityTypeSchema = Yup.object().shape({
  qty_code: Yup.string().required('Required Sample Quantity Type Code'),
  qty_name: Yup.string().required('Required Sample Quantity Type Name'),
})

const SampleQuantityTypeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: ISampleQuantityType | null = useSelector<RootState>(
    ({sampleQuantityType}) => sampleQuantityType.payload
  ) as ISampleQuantityType | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const formik = useFormik<ISampleQuantityType>({
    enableReinitialize: true,
    initialValues: {
      qty_code: createMode ? '' : prevData?.qty_code ?? '',
      qty_name: createMode ? '' : prevData?.qty_name ?? '',
    },
    validationSchema: sampleQuantityTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postSampleQuantityType(values))
        } else {
          dispatch(sampleTypeRedux.actions.editSampleQuantityType(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_sample_quantity_type' aria-hidden='true'>
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
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15'>
              <div className='text-center mb-13'>
                <h1 className='mb-3'>
                  {!createMode ? 'Edit Sample Quantity Type' : 'Add Sample Quantity Type'}
                </h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'qty_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Sample Quantity Code'
                    {...formik.getFieldProps('qty_code')}
                  />
                  {formik.touched.qty_code && formik.errors.qty_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.qty_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'SAMPLE.QUANTITY_TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'qty_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Sample Quantity Name'
                    {...formik.getFieldProps('qty_name')}
                  />
                  {formik.touched.qty_name && formik.errors.qty_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.qty_name}</div>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>Item Code</label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'item_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Item Code'
                    {...formik.getFieldProps('item_code')}
                  />
                  {formik.touched.item_code && formik.errors.item_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.item_code}</div>
                    </div>
                  )}
                </div>
              </div> */}

              <button
                type='submit'
                className='btn btn-light-primary fw-bolder w-100 mb-8'
                disabled={loading}
              >
                {!loading && 'Save Changes'}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export {SampleQuantityTypeModal}
