/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'MASTER'})}
          </span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/master'
        title={intl.formatMessage({id: 'MASTER.LIST'})}
        icon='/media/icons/duotune/general/gen008.svg'
        fontIcon='bi-person'
      >
        <AsideMenuItem
          to='/master/group'
          title={intl.formatMessage({id: 'MASTER.GROUP'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/master/type'
          title={intl.formatMessage({id: 'MASTER.TYPE'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/master/warehouse'
          title={intl.formatMessage({id: 'MASTER.WAREHOUSE'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/master/tray'
          title={intl.formatMessage({id: 'MASTER.TRAY'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/master/price-tag'
          title={intl.formatMessage({id: 'MASTER.PRICE.TAG'})}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'ITEM'})}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to='/manage/user/user-data'
        title={intl.formatMessage({id: 'ADD.ITEM'})}
        icon='/media/icons/duotune/communication/com006.svg'
      />
      <AsideMenuItem
        to='/manage/user/customer-active'
        title={intl.formatMessage({id: 'DATA.ITEM'})}
        icon='/media/icons/duotune/abstract/abs049.svg'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'RFID'})}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to='/manage/user/user-data'
        title={intl.formatMessage({id: 'STOCK.OPNAME'})}
        icon='/media/icons/duotune/communication/com006.svg'
      />
      <AsideMenuItem
        to='/manage/user/customer-active'
        title={intl.formatMessage({id: 'STOCK.LOCATOR'})}
        icon='/media/icons/duotune/abstract/abs049.svg'
      />
      <AsideMenuItem
        to='/manage/user/customer-active'
        title={intl.formatMessage({id: 'STOCK.SOLD'})}
        icon='/media/icons/duotune/abstract/abs049.svg'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>
            {intl.formatMessage({id: 'REPORT'})}
          </span>
        </div>
      </div>
      <AsideMenuItem
        to='/manage/user/user-data'
        title={intl.formatMessage({id: 'REPORT.ITEM'})}
        icon='/media/icons/duotune/communication/com006.svg'
      />
      <AsideMenuItem
        to='/manage/user/customer-active'
        title={intl.formatMessage({id: 'REPORT.STOCK.SOLD'})}
        icon='/media/icons/duotune/abstract/abs049.svg'
      />
      <AsideMenuItem
        to='/manage/user/customer-active'
        title={intl.formatMessage({id: 'REPORT.STOCK.OPNAME'})}
        icon='/media/icons/duotune/abstract/abs049.svg'
      />
    </>
  )
}
