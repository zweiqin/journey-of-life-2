import request2 from '@/utils/request2'
export const api = {
  partnerPage: '/communityTJ/partnerPage',
  getArea: '/cityManageArea/getTreeOne',
  selectCommunity: '/cityCommunity/selectCommunity',
  apponitComunity: '/cityCommunity/appoint',
  partnerOrder: 'communityTJ/partnerOrder',
  cancellationWrite: 'communityTJ/write',
  parOneTnerOrder: '/communityTJ/parOneTnerOrder',
  userDetails:'/communityTJ/userDetails',
  revoke: "/cityCommunity/revoke"
};

/**
 * 获取会员订单列表
 */
// 订单详情
export function partnerPage(data) {
  return request2({
    url: api.partnerPage,
    method: 'POST',
    data
  })
}

// communityTJ/partnerOrder 查询499订单
export function getPartnerOrder(data) {
  return request2({
    url: api.partnerOrder,
    method: 'POST',
    data
  })
}

// communityTJ/partnerOrder 核销499订单
export function cancellationWrite(data) {
  return request2({
    url: api.cancellationWrite,
    method: 'POST',
    data
  })
}

// 查询区域列表
export function getAreaList(params) {
  return request2({
    url: api.getArea,
    method: 'GET',
    params
  })
}

// 查询所有2小区列表
export function selectCommunity(params) {
  return request2({
    url: api.selectCommunity,
    method: 'GET',
    params
  })
}

// 指定
export function apponitComunity(data) {
  return request2({
    url: api.apponitComunity,
    method: 'POST',
    data
  })
}


// 获取详情
export function getApponitInfo(params){
  return request2({
    url: api.userDetails,
    method: 'GET',
    params
  })
}

// 撤销
export function revoke(params){
  return request2({
    url: api.revoke,
    method: 'GET',
    params
  })
}
