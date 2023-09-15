import React from 'react'

import {KTSVG} from '../../../helpers'

interface IListCustomerWidget {
  title: string
  subtitle: string
  value: string
}

type Props = {
  className: string
  color: string
  name?: string
  title?: string
  valueTitle?: string
  datas?: IListCustomerWidget[]
}

const MixedWidget1: React.FC<Props> = ({className, color, title, valueTitle, datas, name}) => {
  return (
    <div className={`card ${className} shadow`}>
      {/* begin::Body */}
      <div className='card-body p-0'>
        {/* begin::Header */}
        <div className={`px-9 pt-7 card-rounded h-250px w-100 bg-${color}`}>
          {/* begin::Balance */}
          <div className='d-flex text-center flex-column text-white pt-8'>
            <span className='fw-bold fs-7'>{title}</span>
            <span className='fw-bolder fs-2x pt-1'>{valueTitle}</span>
          </div>
          {/* end::Balance */}
        </div>
        {/* end::Header */}
        {/* begin::Items */}
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-white'
          style={{marginTop: '-100px'}}
        >
          {datas?.map((value) => {
            return (
              <div className='d-flex align-items-center mb-6'>
                {/* begin::Symbol */}
                <div className='symbol symbol-50px w-50px me-5'>
                  <span className='symbol-label bg-lighten'>
                    <KTSVG path='/media/icons/duotune/general/gen026.svg' className='svg-icon-1' />
                  </span>
                </div>
                {/* end::Symbol */}
                {/* begin::Description */}
                <div className='d-flex align-items-center flex-wrap w-100'>
                  {/* begin::Title */}
                  <div className='mb-1 pe-3 flex-grow-1'>
                    <p className='fs-5 text-gray-800 text-hover-primary fw-bolder'>{value.title}</p>
                    <div className='text-gray-400 fw-bold fs-7'>{value.subtitle}</div>
                  </div>
                  {/* end::Title */}
                  {/* begin::Label */}
                  <div className='d-flex align-items-center'>
                    <div className='fw-bolder fs-5 text-gray-800 pe-1'>{value.value}</div>
                  </div>
                  {/* end::Label */}
                </div>
                {/* end::Description */}
              </div>
            )
          })}
        </div>
        {/* end::Items */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {MixedWidget1}
