/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IFinding} from '../model/FindingModel'
import {useDispatch, useSelector} from 'react-redux'
import * as sampleTypeRedux from '../redux/FindingRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const findingSchema = Yup.object().shape({
  item_code: Yup.string().required('Required Item Code').default('-'),
  specify_finding_code: Yup.string().required('Required Finding Code'),
  specify_finding_name: Yup.string().required('Required Finding Name'),
})

const FindingModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IFinding | null = useSelector<RootState>(
    ({finding}) => finding.payload
  ) as IFinding | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const formik = useFormik<IFinding>({
    enableReinitialize: true,
    initialValues: {
      item_code: createMode ? '' : prevData?.item_code ?? '-',
      specify_finding_code: createMode ? '' : prevData?.specify_finding_code ?? '',
      specify_finding_name: createMode ? '' : prevData?.specify_finding_name ?? '',
    },
    validationSchema: findingSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(sampleTypeRedux.actions.postFinding(values))
        } else {
          dispatch(sampleTypeRedux.actions.editFinding(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()

  return (
    <div className='modal fade' id='kt_modal_finding' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Finding' : 'Add Finding'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'FINDING'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'specify_finding_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Finding Code'
                    {...formik.getFieldProps('specify_finding_code')}
                  />
                  {formik.touched.specify_finding_code && formik.errors.specify_finding_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.specify_finding_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'FINDING'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'specify_finding_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Finding Name'
                    {...formik.getFieldProps('specify_finding_name')}
                  />
                  {formik.touched.specify_finding_name && formik.errors.specify_finding_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.specify_finding_name}</div>
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

export {FindingModal}
