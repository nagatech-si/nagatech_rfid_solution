import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {Step1} from './steps/Step1'
import {Step2} from './steps/Step2'
import {Step3} from './steps/Step3'
import {Step4} from './steps/Step4'
import {Step5} from './steps/Step5'
import {StepperComponent} from '../../../../_metronic/assets/ts/components'
import {Formik, Form, FormikValues} from 'formik'
import {ICreateAccount, createAccountSchemas, inits} from './CreateAccountWizardHelper'

const Vertical: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(createAccountSchemas[0])
  const [initValues] = useState<ICreateAccount>(inits)

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex - 1])
  }

  const submitStep = (values: ICreateAccount, actions: FormikValues) => {
    if (!stepper.current) {
      return
    }

    setCurrentSchema(createAccountSchemas[stepper.current.currentStepIndex])

    if (stepper.current.currentStepIndex !== stepper.current.totatStepsNumber) {
      stepper.current.goNext()
    } else {
      stepper.current.goto(1)
      actions.resetForm()
    }
  }

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div
      ref={stepperRef}
      className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid'
      id='kt_create_account_stepper'
    >
      <div className='d-flex justify-content-center bg-white rounded justify-content-xl-start flex-row-auto w-50 w-xl-100px w-xxl-300px me-9'>
        <div className='px-6 px-lg-10 px-xxl-15 py-10'>
          <div className='stepper-nav'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>1</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Check Sample Code</h3>

                <div className='stepper-desc fw-bold'>Check Your Sample Code First</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>2</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Image</h3>

                <div className='stepper-desc fw-bold'>Upload Image Item</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>3</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Image 360</h3>
                <div className='stepper-desc fw-bold'>Upload 360 Image Item</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>4</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Pricing</h3>
                <div className='stepper-desc fw-bold'>Specifing Pricing</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>5</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Aloy Of Gold</h3>
                <div className='stepper-desc fw-bold'>Specify What Kind Of Gold</div>
              </div>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>6</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Categories</h3>
                <div className='stepper-desc fw-bold'>Categories about the item</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>7</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Optimization</h3>
                <div className='stepper-desc fw-bold'>Optimize Metadata item</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>8</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Dimension</h3>
                <div className='stepper-desc fw-bold'>Specify Dimension Item</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>9</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Finish</h3>
                <div className='stepper-desc fw-bold'>Specify Finish Type</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>10</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Chain</h3>
                <div className='stepper-desc fw-bold'>Specify Chain Type</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>11</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Finding</h3>
                <div className='stepper-desc fw-bold'>Specify Finding Type</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>12</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Stone</h3>
                <div className='stepper-desc fw-bold'>Is This Gold Contain Stone</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>13</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Plating</h3>
                <div className='stepper-desc fw-bold'>Specify Plating Type</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>14</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Material & Size</h3>
                <div className='stepper-desc fw-bold'>Specify Material and Size</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>15</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Price</h3>
                <div className='stepper-desc fw-bold'>Specify Price</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>16</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Detail</h3>
                <div className='stepper-desc fw-bold'>Detail</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>17</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Privacy</h3>
                <div className='stepper-desc fw-bold'>Who can see this item ?</div>
              </div>
            </div>
            <div className='stepper-item' data-kt-stepper-element='nav'>
              <div className='stepper-line w-40px'></div>

              <div className='stepper-icon w-40px h-40px'>
                <i className='stepper-check fas fa-check'></i>
                <span className='stepper-number'>18</span>
              </div>

              <div className='stepper-label'>
                <h3 className='stepper-title'>Preview</h3>
                <div className='stepper-desc fw-bold'>Check your data again</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-row-fluid flex-start bg-white rounded'>
        <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
          {() => (
            <Form className='py-10 px-10' noValidate id='kt_create_account_form'>
              <div className='current' data-kt-stepper-element='content'>
                <Step1 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step2 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step3 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step4 />
              </div>

              <div data-kt-stepper-element='content'>
                <Step5 />
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
                    Back
                  </button>
                </div>

                <div>
                  <button type='submit' className='btn btn-lg btn-primary me-3'>
                    <span className='indicator-label'>
                      {stepper.current?.currentStepIndex !==
                        stepper.current?.totatStepsNumber! - 1 && 'Continue'}
                      {stepper.current?.currentStepIndex ===
                        stepper.current?.totatStepsNumber! - 1 && 'Submit'}
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
      </div>
    </div>
  )
}

export {Vertical}
