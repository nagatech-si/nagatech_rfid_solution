import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'

import {ScrollTopComponent, StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues, FormikProps} from 'formik'
import {CheckSampleCode} from './components/CheckSampleCode'
import {UploadImageWidget} from './components/UploadImage'
import {UploadImage360Widget} from './components/UploadImage360'
import {IRequestUploadItem, createUploadNew, initUploadNew} from './model/UploadNewHelper'
import {useDispatch, useSelector} from 'react-redux'
import * as masterRedux from '../../master/MasterRedux'
import * as regionRedux from '../../region/RegionRedux'
import * as customerRedux from '../../user/customer-active/redux/CustomerActiveRedux'
import {MetalColourWidget} from './components/MetalColourWidget'
import {PricingWidget} from './components/Pricing'
import {SampleWidget} from './components/Sample'
import {OptimizationWidget} from './components/Optimization'
import {DimensionWidget} from './components/Dimension'
import {FinishWidget} from './components/Finish'
import {ChainWidget} from './components/Chain'
import {FindingWidget} from './components/Finding'
import {StoneWidget} from './components/Stone'
import {PlatingWidget} from './components/Plating'
import {MaterialAndSizeWidget} from './components/MaterialAndSize'
import {PriceWidget} from './components/Price'
import {DetailWidget} from './components/Detail'
import {PrivacyWidget} from './components/Privacy'
import {ReviewWidget} from './components/Review'
import {IResponseSampleCode} from './model/SampleCode'
import {RootState} from '../../../../setup'
import * as uploadRedux from './redux/UploadNewRedux'
import generateAlphanumeric from '../../../../_metronic/helpers/Generator'
import {useIntl} from 'react-intl'

const UploadNewWidget: FC = () => {
  const dispatch = useDispatch()
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createUploadNew[0])
  const [initValues, setInitValues] = useState<IRequestUploadItem>(initUploadNew)
  const sampleCodeData: IResponseSampleCode[] = useSelector<RootState>(
    ({uploadNew}) => uploadNew.data
  ) as IResponseSampleCode[]
  const [prevData, setPrevData] = useState<IRequestUploadItem | null>(null)
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  useEffect(() => {
    dispatch(masterRedux.MetalColourTypeRedux.actions.fetchAllMetalColourType())
    dispatch(masterRedux.NickelContentRedux.actions.fetchAllNickelContent())
    dispatch(masterRedux.MaterialTypeRedux.actions.fetchAllMaterialType())
    dispatch(masterRedux.SampleTypeRedux.actions.fetchAllSampleType())
    dispatch(masterRedux.SampleCategoryRedux.actions.fetchAllSampleCategory())
    dispatch(masterRedux.SampleQuantityRedux.actions.fetchAllSampleQuantityType())
    dispatch(masterRedux.FinishTypeRedux.actions.fetchAllFinishType())
    dispatch(masterRedux.ChainRedux.actions.fetchAllChainType())
    dispatch(masterRedux.StoneCategoryRedux.actions.fetchAllStoneCategory())
    dispatch(masterRedux.StoneColourRedux.actions.fetchAllStoneColour())
    dispatch(masterRedux.StoneCutRedux.actions.fetchAllStoneCut())
    dispatch(masterRedux.StoneGradeRedux.actions.fetchAllStoneGrade())
    dispatch(masterRedux.StoneOriginRedux.actions.fetchAllStoneOrigin())
    dispatch(masterRedux.StoneShapeRedux.actions.fetchAllStoneShape())
    dispatch(masterRedux.StoneTypeRedux.actions.fetchAllStoneType())
    dispatch(masterRedux.PlatingColourRedux.actions.fetchAllPlatingColour())
    dispatch(masterRedux.PlatingMetalRedux.actions.fetchAllPlatingMetal())
    dispatch(masterRedux.PlatingMethodRedux.actions.fetchAllPlatingMethod())
    dispatch(regionRedux.countryRedux.actions.fetchAllCountry())
    dispatch(customerRedux.actions.fetchAllCustomer())
    checkPrevUploadData()
  }, [dispatch])

  const checkPrevUploadData = () => {
    let rawPrevData = localStorage.getItem('prevUpload')
    if (rawPrevData !== null) {
      const prevData = JSON.parse(rawPrevData)
      setPrevData(prevData)
      setShowConfirmation(true)
    } else {
      setShowConfirmation(false)
    }
  }

  const resetData = () => {
    localStorage.removeItem('prevUploadPosition')
    localStorage.removeItem('prevUpload')
    setShowConfirmation(false)
    setInitValues(initUploadNew)
    setTimeout(() => {
      if (!stepper.current) {
        return
      }
      stepper.current.goto(1)
      loadStepper()
    }, 100)
  }

  const continuePrevData = () => {
    let lastPosition = Number(localStorage.getItem('prevUploadPosition'))
    setInitValues(prevData!)
    setShowConfirmation(false)

    setTimeout(() => {
      if (!stepper.current) {
        return
      }
      stepper.current.goto(lastPosition)
      setCurrentSchema(createUploadNew[lastPosition - 1])
      loadStepper()
    }, 100)
  }

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }
    localStorage.setItem('prevUploadPosition', (stepper.current.currentStepIndex - 1).toString())
    stepper.current.goPrev()

    setCurrentSchema(createUploadNew[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: IRequestUploadItem, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    if (stepper.current.currentStepIndex === 1) {
      values.code_item = sampleCodeData[0].code_item
      values.item_name = sampleCodeData[0].item_name
    }
    localStorage.setItem('prevUpload', JSON.stringify(values))

    if (stepper.current.currentStepIndex === 5) {
      values.gambar360 =
        values.gambar360.length === 0
          ? [{gambar_id: generateAlphanumeric(5), kode_gambar: '-', lokasi_gambar: '-'}]
          : values.gambar360
    }

    if (stepper.current.currentStepIndex === 5) {
      values.metalcolour = values.metalcolour.filter((value) => value.colour_type_code !== '')
    }

    if (stepper.current.currentStepIndex === 9) {
      values.finishtype = values.finishtype.filter((value) => value.finish_type_code !== '')
    }

    if (stepper.current.currentStepIndex === 10) {
      values.chaintype = values.chaintype.filter((value) => value.chain_type_code !== '')
    }

    if (stepper.current.currentStepIndex === 11) {
      values.finding = values.finding.filter((value) => value.specify_finding_code !== '')
    }
    if (stepper.current.currentStepIndex === 12) {
      values.stone = values.stone.filter((value) => value.stone_category_code !== '')
    }
    if (stepper.current.currentStepIndex === 13) {
      values.plating = values.plating.filter((value) => value.plating_metal_code !== '')
    }
    if (stepper.current.currentStepIndex === 14) {
      values.material = values.material.filter((value) => value.metal_title_code !== '')
    }

    setCurrentSchema(createUploadNew[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      localStorage.setItem('prevUploadPosition', (stepper.current.currentStepIndex + 1).toString())
      stepper.current.goNext()
    } else {
      let isEdit = localStorage.getItem('uploadType') === 'EDIT'
      console.log(isEdit)
      console.log(localStorage.getItem('uploadType'))

      if (isEdit) {
        dispatch(uploadRedux.actions.editUploadNew(values))
        stepper.current.goto(1)
        actions.resetForm()
      } else {
        dispatch(uploadRedux.actions.postUploadNew(values))
        stepper.current.goto(1)
        actions.resetForm()
      }
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  const intl = useIntl()
  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-50 w-xl-300px w-xxl-300px me-9'>
        <div className='px-6 px-lg-10 px-xxl-15 py-10'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.1'})}</h3>

                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.1-1'})}</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.2'})}</h3>

                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.2-1'})}</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.3'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.3-1'})}</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>4</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.4'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.4-1'})}</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>5</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.5'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.5-1'})}</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>6</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.6'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.6-1'})}</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>7</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.7'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.7-1'})}</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>8</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.8'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.8-1'})}</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>9</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'> {intl.formatMessage({id: 'UPLOAD.9'})}</h3>
                <div className='stepper-desc fw-bold'>{intl.formatMessage({id: 'UPLOAD.9-1'})}</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>10</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.10'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.10-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>11</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.11'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.11-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>12</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.12'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.12-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>13</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.13'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.13-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>14</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.14'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.14-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>15</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.15'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.15-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>16</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.16'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.16-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>17</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.17'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.17-1'})}
                </div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px' />

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check' />
                <span className='stepper-number'>18</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>{intl.formatMessage({id: 'UPLOAD.18'})}</h3>
                <div className='stepper-desc fw-bold'>
                  {intl.formatMessage({id: 'UPLOAD.18-1'})}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-row-fluid flex-start bg-white rounded'>
        {showConfirmation ? (
          <div className='py-10 px-10 w-100'>
            <h3>{intl.formatMessage({id: 'PREV.DATA.FOUNDED'})}</h3>
            <h5 className='fw-light text-primary mb-10'>
              {intl.formatMessage({id: 'CONFIRMATION.CONTINUE'})}
            </h5>
            <div className='row justify-content-between '>
              <button type='button' className='btn btn-primary mb-5' onClick={continuePrevData}>
                {intl.formatMessage({id: 'CONTINUE'})}
              </button>

              <button type='button' className='btn btn-light-warning' onClick={resetData}>
                {intl.formatMessage({id: 'CREATE.NEW'})}
              </button>
            </div>
          </div>
        ) : (
          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {(formik: FormikProps<IRequestUploadItem>) => (
              <Form className='py-10 px-10 w-100' noValidate id='kt_create_account_form'>
                <div className='current' data-kt-stepper-element='content' id='stepper-content'>
                  <CheckSampleCode formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <UploadImageWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <UploadImage360Widget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <PricingWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <MetalColourWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <SampleWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <OptimizationWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <DimensionWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <FinishWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <ChainWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <FindingWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <StoneWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <PlatingWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <MaterialAndSizeWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <PriceWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <DetailWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <PrivacyWidget formik={formik} />
                </div>
                <div data-kt-stepper-element='content' id='stepper-content'>
                  <ReviewWidget formik={formik} />
                </div>

                <div className='d-flex flex-stack pt-10'>
                  <div className='mr-2'>
                    <button
                      onClick={prevStep}
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      data-kt-stepper-action='previous'
                    >
                      <KTSVG
                        path='/media/icons/duotune/arrows/arr063.svg'
                        className='svg-icon-4 me-1'
                      />
                      {intl.formatMessage({id: 'BACK'})}
                    </button>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='btn btn-lg btn-primary me-3'
                      disabled={sampleCodeData.length === 0}
                      onClick={() => {
                        ScrollTopComponent.goTop()
                      }}
                    >
                      <span className='indicator-label'>
                        {stepper.current?.currentStepIndex !==
                          stepper.current?.totatStepsNumber! - 1 &&
                          intl.formatMessage({id: 'CONTINUE'})}
                        {stepper.current?.currentStepIndex ===
                          stepper.current?.totatStepsNumber! - 1 &&
                          intl.formatMessage({id: 'SUBMIT'})}
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr064.svg'
                          className='svg-icon-3 ms-2 me-0'
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  )
}

export {UploadNewWidget}
