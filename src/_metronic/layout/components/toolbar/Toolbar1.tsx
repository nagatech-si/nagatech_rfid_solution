/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, {FC} from 'react'

import {useLayout} from '../../core'
import {DefaultTitle} from '../header/page-title/DefaultTitle'
import {RootState} from '../../../../setup'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import * as toolbarRedux from './ToolbarRedux'
import {useIntl} from 'react-intl'

const Toolbar1: FC = () => {
  const {classes} = useLayout()
  const dispatch = useDispatch()
  const modalName: string = useSelector<RootState>(
    ({toolbar}) => toolbar.modalName,
    shallowEqual
  ) as string
  const focusName: string = useSelector<RootState>(
    ({toolbar}) => toolbar.focusName,
    shallowEqual
  ) as string
  const intl = useIntl()
  return (
    <div className='toolbar' id='kt_toolbar'>
      {/* begin::Container */}
      <div
        id='kt_toolbar_container'
        className={clsx(classes.toolbarContainer.join(' '), 'd-flex flex-stack')}
      >
        <DefaultTitle />

        {/* begin::Actions */}
        {modalName === 'EMPTY' ? null : (
          <div className='d-flex align-items-center py-1'>
            {/* begin::Wrapper */}

            <a
              href='#'
              className='btn btn-sm btn-primary'
              data-bs-toggle='modal'
              data-bs-target={`#${modalName}`}
              id='kt_toolbar_primary_button'
              onClick={() => {
                if (focusName != null) {
                  setTimeout(() => {
                    document.getElementsByName(focusName)[0].focus()
                  }, 500)
                }
                dispatch(toolbarRedux.actions.SetCreateModalActive(true))
              }}
            >
              {intl.formatMessage({id: 'CREATE'})}
            </a>
            {/* end::Button */}
          </div>
        )}
        {/* end::Actions */}
      </div>
      {/* end::Container */}
    </div>
  )
}

export {Toolbar1}
