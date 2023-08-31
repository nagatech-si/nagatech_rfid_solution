/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useState} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IMaterialType} from '../model/MaterialTypeModel'
import {useDispatch, useSelector} from 'react-redux'
import * as materialTypeRedux from '../redux/MaterialTypeRedux'
import {RootState} from '../../../../../setup'
import {useIntl} from 'react-intl'

const materialTypeSchema = Yup.object().shape({
  item_code: Yup.string().required('Required Item Code').default('-'),
  material_type_code: Yup.string().required('Required Material Type Code'),
  material_type_name: Yup.string().required('Required Sample Type Name'),
})

const MaterialTypeModal: FC = () => {
  const dispatch = useDispatch()
  const prevData: IMaterialType | null = useSelector<RootState>(
    ({materialType}) => materialType.payload
  ) as IMaterialType | null
  const createMode: boolean = useSelector<RootState>(({toolbar}) => toolbar.createMode) as boolean
  const [loading, setLoading] = useState(false)

  const formik = useFormik<IMaterialType>({
    enableReinitialize: true,
    initialValues: {
      item_code: createMode ? '' : prevData?.item_code ?? '-',
      material_type_code: createMode ? '' : prevData?.material_type_code ?? '',
      material_type_name: createMode ? '' : prevData?.material_type_name ?? '',
    },
    validationSchema: materialTypeSchema,
    onSubmit: (values) => {
      setLoading(true)
      setTimeout(() => {
        if (createMode) {
          dispatch(materialTypeRedux.actions.postMaterialType(values))
        } else {
          dispatch(materialTypeRedux.actions.editMaterialType(values))
        }
        setLoading(false)
        formik.resetForm()
      }, 1000)
    },
  })
  const intl = useIntl()
  return (
    <div className='modal fade' id='kt_modal_material_type' aria-hidden='true'>
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
                <h1 className='mb-3'>{!createMode ? 'Edit Material Type' : 'Add Material Type'}</h1>

                <div className='text-muted fw-bold fs-5'>
                  Please fill all field below and then click save
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.CODE'},
                    {name: intl.formatMessage({id: 'MATERIAL.TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    disabled={!createMode}
                    key={'material_type_code'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Material Type Code'
                    {...formik.getFieldProps('material_type_code')}
                  />
                  {formik.touched.material_type_code && formik.errors.material_type_code && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.material_type_code}</div>
                    </div>
                  )}
                </div>
              </div>
              <div className='row mb-6'>
                <label className='col-lg-5 col-form-label required fw-bold fs-6'>
                  {intl.formatMessage(
                    {id: 'BASE.NAME'},
                    {name: intl.formatMessage({id: 'MATERIAL.TYPE'})}
                  )}
                </label>

                <div className='col-lg-7 fv-row'>
                  <input
                    type='text'
                    key={'material_type_name'}
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Material Type Name'
                    {...formik.getFieldProps('material_type_name')}
                  />
                  {formik.touched.material_type_name && formik.errors.material_type_name && (
                    <div className='fv-plugins-message-container'>
                      <div className='text-danger'>{formik.errors.material_type_name}</div>
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

export {MaterialTypeModal}
