/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as toolbar from '../../../../_metronic/layout/components/toolbar/ToolbarRedux'
import * as sliderRedux from './redux/SliderRedux'
import {RootState} from '../../../../setup'
import {ISlider} from './model/SliderModal'
import {KTSVG} from '../../../../_metronic/helpers'
import Swal from 'sweetalert2'

type Props = {
  className: string
}

const SliderWidget: React.FC<Props> = ({className}) => {
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const data: ISlider[] = useSelector<RootState>(({slider}) => slider.data) as ISlider[]
  useEffect(() => {
    dispatch(toolbar.actions.SetModalToolbarName('kt_modal_slider'))
    dispatch(sliderRedux.actions.fetchAllSlider())
  }, [dispatch])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-10'>
        {/* begin::Table container */}
        <div className='row gy-5'>
          {data.map((value: ISlider) => (
            <div className='col-lg-4'>
              <div className='card card-custom overlay overflow-hidden '>
                <div className='card-body p-0'>
                  <div className='overlay-wrapper'>
                    <img src={value.lokasi_gambar} alt='' className='w-100 rounded' />
                  </div>
                  <div className='overlay-layer bg-dark bg-opacity-10'>
                    <button
                      onClick={() => {
                        setloading(true)
                        Swal.fire({
                          title: 'Are you sure?',
                          text: "You won't be able to revert this!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          heightAuto: false,
                          confirmButtonText: 'Yes, delete it!',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(sliderRedux.actions.deleteSlider(value))
                          }
                        })
                        setloading(false)
                      }}
                      className='btn btn-light-danger btn-shadow ms-2'
                    >
                      <span className='svg-icon svg-icon-1'>
                        <KTSVG
                          path='/media/icons/duotune/files/fil007.svg'
                          className='svg-icon-muted svg-icon-1'
                        />
                      </span>
                      {!loading && 'Delete'}
                      {loading && (
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
          ))}
        </div>
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {SliderWidget}
