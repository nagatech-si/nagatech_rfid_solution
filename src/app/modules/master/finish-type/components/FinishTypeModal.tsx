/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IFinishType} from '../model/FinishTypeModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/FinishTypeRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const finishTypeSchema = Yup.object().shape({
  item_code: Yup.string().required('Required Item Code').default('-'),
  finish_type_code: Yup.string().required('Required Finish Type Code'),
  finish_type_name: Yup.string().required('Required Finish Type Name'),
})

const FinishTypeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IFinishType | null = useSelector<RootState>(
    ({finishType}) => finishType.payload
  ) as IFinishType | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const formik = useFormik<IFinishType>({
    enableReinitialize: true,
    initialValues: {
      item_code: createMode ? '' : prevData?.item_code ?? '-',
      finish_type_code: createMode ? '' : prevData?.finish_type_code ?? '',
      finish_type_name: createMode ? '' : prevData?.finish_type_name ?? '',
    },
    validationSchema: finishTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postFinishType(values))
        } else {
          dispatch(sampleTypeRedux.actions.editFinishType(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_finish_type' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Finish Type' : 'Add Finish Type'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'FINISH.TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'finish_type_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Finish Type Code'
                    {...formik.getFieldProps('finish_type_code')}
                  />
                  {formik.touched.finish_type_code && formik.errors.finish_type_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.finish_type_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'FINISH.TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'finish_type_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Finish Type Name'
                    {...formik.getFieldProps('finish_type_name')}
                  />
                  {formik.touched.finish_type_name && formik.errors.finish_type_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.finish_type_name}</div>
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

export {FinishTypeModal}
